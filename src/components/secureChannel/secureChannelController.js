// Secure-channel controller — lives at the RTM transport chokepoint.
//
// One instance is created by chatWindow (which has the pinned-key config) and
// injected into the KoreRTMClient as `rtmClient._secureChannel`. The RTM client
// calls this controller at exactly two places:
//   - send()           -> processOutgoing(frame)  (encrypt before ws.send)
//   - handleWsMessage() -> processIncoming(frame)  (decrypt after JSON.parse, before emit)
// and on socket teardown:
//   - handleWsClose()  -> reset()                  (drop keys so reconnect re-handshakes)
//
// Putting encrypt/decrypt here (instead of in a chatWindow sendMessage wrapper)
// means EVERY frame — user messages, delivery acks, agentDesktop sends — is
// encrypted uniformly and encrypted AFTER enrichment; and every inbound frame is
// decrypted ONCE and the plaintext reaches all bot.on('message') listeners.
//
// Handshake frames (key_exchange_*) and rekey control frames are driven here and
// are never themselves encrypted; they go out via the injected rawSend (the RTM
// client's plaintext write path).

import SecureChannel, { MSG } from './secureChannel.js';

const HANDSHAKE_TIMEOUT_MS = 10000;

class SecureChannelController {
    // config: { pinnedPublicKeyPem, expectedSigningKeyId }
    // rawSend: (frameObj) => void   — writes a plaintext frame straight to the socket
    // logger:  (msg) => void        — optional debug sink
    constructor({ config, rawSend, logger } = {}) {
        this.config = config || {};
        this.rawSend = typeof rawSend === 'function' ? rawSend : function () {};
        this.logger = typeof logger === 'function' ? logger : function () {};
        this.channel = null;
        this.handshakeTimer = null;
        // Serializes inbound handling so a rekey generation-install completes
        // before the next frame is decrypted (a new-gen envelope must not race
        // the install and trip generation_mismatch).
        this._inbound = Promise.resolve();
        // Outbound frames requested while the handshake is mid-flight are held
        // here and flushed (encrypted) once SECURE — this closes the plaintext
        // window during (re)handshake instead of leaking them in the clear.
        this._outboundQueue = [];
    }

    isSecure() { return !!(this.channel && this.channel.isSecure()); }

    // Is this an inbound frame the secure channel owns? Used by the RTM client
    // to decide whether to route the frame through processIncoming.
    isRelevant(message) {
        if (!message || typeof message !== 'object') return false;
        const t = message.type;
        return t === MSG.CAPABILITIES || t === MSG.RESPONSE || t === MSG.ACK
            || t === MSG.INIT || t === MSG.COMPLETE || t === MSG.ENVELOPE;
    }

    // --- lifecycle ---------------------------------------------------------

    // Drop the channel and fail any queued sends. Called on ws close so the
    // NEXT connection performs a fresh handshake instead of reusing dead keys.
    reset(reason) {
        this._clearTimer();
        this.channel = null;
        const queued = this._outboundQueue;
        this._outboundQueue = [];
        const err = new Error('secure_channel_reset' + (reason ? ':' + reason : ''));
        queued.forEach((item) => { try { item.reject(err); } catch (e) { /* noop */ } });
    }

    _clearTimer() {
        if (this.handshakeTimer) { clearTimeout(this.handshakeTimer); this.handshakeTimer = null; }
    }

    _armTimer() {
        this._clearTimer();
        this.handshakeTimer = setTimeout(() => {
            if (this.channel && !this.channel.isSecure()) {
                this.logger('[secureChannel] handshake timed out — resetting');
                this.reset('handshake_timeout');
            }
        }, HANDSHAKE_TIMEOUT_MS);
    }

    // --- outbound ----------------------------------------------------------

    // Returns a Promise resolving to the frame that should actually be written.
    // - SECURE + normal frame -> encrypted envelope
    // - SECURE + handshake/control frame -> unchanged (already an envelope/plaintext handshake)
    // - handshaking -> queued, resolves with the envelope after SECURE
    // - not engaged -> unchanged (server has not required encryption)
    processOutgoing(frame) {
        if (this.isSecure()) {
            if (this._isProtocolFrame(frame)) return Promise.resolve(frame);
            return this.channel.encryptOutgoing(frame);
        }
        if (this.channel) {
            // handshake in progress — never leak plaintext; hold until SECURE
            return new Promise((resolve, reject) => {
                this._outboundQueue.push({ frame, resolve, reject });
            });
        }
        return Promise.resolve(frame);
    }

    _isProtocolFrame(frame) {
        const t = frame && frame.type;
        return t === MSG.INIT || t === MSG.COMPLETE || t === MSG.ACK
            || t === MSG.ENVELOPE || t === MSG.REKEY_SIGNAL || t === MSG.REKEY_ACK;
    }

    _flushOutbound() {
        const queued = this._outboundQueue;
        this._outboundQueue = [];
        queued.forEach((item) => {
            this.channel.encryptOutgoing(item.frame).then(item.resolve).catch(item.reject);
        });
    }

    // --- inbound -----------------------------------------------------------

    // Returns Promise<{ handled: boolean, plaintext?: object }>.
    //   handled=true               -> protocol frame consumed; do not emit
    //   handled=false, plaintext   -> emit the decrypted object to listeners
    //   handled=false (no plain)   -> not ours; caller emits the original frame
    processIncoming(frame) {
        const run = this._inbound.then(() => this._handleIncoming(frame));
        this._inbound = run.catch(() => undefined);
        return run;
    }

    async _handleIncoming(frame) {
        const t = frame && frame.type;

        // Server advertises "encryption required" -> start the handshake.
        if (t === MSG.CAPABILITIES) {
            // #3 re-entry guard: a duplicate capabilities frame (e.g. after a
            // reconnect race) must NOT tear down a live channel and reopen a
            // plaintext window. Ignore it while a channel already exists.
            if (this.channel) { this.logger('[secureChannel] duplicate capabilities ignored'); return { handled: true }; }
            if (frame.encryption !== 'required') return { handled: true };
            const pem = this.config.pinnedPublicKeyPem;
            if (!pem) { this.logger('[secureChannel] capabilities received but no pinnedPublicKeyPem configured'); return { handled: true }; }
            try {
                this.channel = new SecureChannel({
                    pinnedPublicKeyPem: pem,
                    expectedSigningKeyId: this.config.expectedSigningKeyId,
                });
                this._armTimer();
                const init = await this.channel.initiateHandshake();
                this.rawSend(init);
            } catch (e) {
                this.logger('[secureChannel] handshake init failed: ' + (e && e.message));
                this.reset('init_failed');
            }
            return { handled: true };
        }

        // key_exchange_response -> reply with key_exchange_complete.
        if (t === MSG.RESPONSE) {
            if (!this.channel || this.channel.isSecure()) { return { handled: true }; }
            try {
                const complete = await this.channel.handleResponse(frame);
                this.rawSend(complete);
            } catch (e) {
                this.logger('[secureChannel] handleResponse failed: ' + (e && e.message));
                this.reset('response_failed');
            }
            return { handled: true };
        }

        // key_exchange_ack -> channel becomes SECURE.
        if (t === MSG.ACK) {
            if (!this.channel) return { handled: true };
            // #2 guard: a duplicate/redelivered ack after we are already SECURE
            // must be ignored, NOT reset to plaintext.
            if (this.channel.isSecure()) { this.logger('[secureChannel] duplicate ack ignored'); return { handled: true }; }
            try {
                await this.channel.handleAck(frame);
                this._clearTimer();
                this._flushOutbound();
                this.logger('[secureChannel] channel SECURE');
            } catch (e) {
                this.logger('[secureChannel] handleAck failed: ' + (e && e.message));
                this.reset('ack_failed');
            }
            return { handled: true };
        }

        // secure_envelope -> decrypt (control frames handled here, chat surfaced).
        if (t === MSG.ENVELOPE) {
            if (!this.channel || !this.channel.isSecure()) {
                this.logger('[secureChannel] envelope before SECURE — dropping');
                return { handled: true };
            }
            let plain;
            try {
                plain = await this.channel.decryptIncoming(frame);
            } catch (e) {
                this.logger('[secureChannel] decrypt failed: ' + (e && e.message));
                return { handled: true };
            }
            if (plain && plain.__control === MSG.REKEY_SIGNAL) {
                try {
                    const ack = await this.channel.handleRekeySignal(plain);
                    this.rawSend(ack);
                    this.logger('[secureChannel] rekeyed to gen ' + plain.newGen);
                } catch (e) {
                    this.logger('[secureChannel] rekey failed: ' + (e && e.message));
                    this.reset('rekey_failed');
                }
                return { handled: true };
            }
            if (plain && plain.__control === MSG.REKEY_ACK) {
                return { handled: true };
            }
            return { handled: false, plaintext: plain };
        }

        return { handled: false };
    }
}

export default SecureChannelController;
export { SecureChannelController };
