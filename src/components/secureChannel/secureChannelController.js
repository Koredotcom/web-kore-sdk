// Secure-channel controller — encrypt/decrypt at the RTM transport chokepoint.
import SecureChannel, { MSG } from './secureChannel.js';

const HANDSHAKE_TIMEOUT_MS = 10000;

class SecureChannelController {
    constructor({ config, rawSend } = {}) {
        this.config = config || {};
        this.rawSend = typeof rawSend === 'function' ? rawSend : function () {};
        this.channel = null;
        this.handshakeTimer = null;
        this._inbound = Promise.resolve();
        this._outboundQueue = [];
    }

    isSecure() { return !!(this.channel && this.channel.isSecure()); }

    isRelevant(message) {
        if (!message || typeof message !== 'object') return false;
        const t = message.type;
        return t === MSG.CAPABILITIES || t === MSG.RESPONSE || t === MSG.ACK
            || t === MSG.INIT || t === MSG.COMPLETE || t === MSG.ENVELOPE;
    }

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
                this.reset('handshake_timeout');
            }
        }, HANDSHAKE_TIMEOUT_MS);
    }

    processOutgoing(frame) {
        if (this.isSecure()) {
            if (this._isProtocolFrame(frame)) return Promise.resolve(frame);
            return this.channel.encryptOutgoing(frame);
        }
        if (this.channel) {
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

    processIncoming(frame) {
        const run = this._inbound.then(() => this._handleIncoming(frame));
        this._inbound = run.catch(() => undefined);
        return run;
    }

    async _handleIncoming(frame) {
        const t = frame && frame.type;

        if (t === MSG.CAPABILITIES) {
            if (this.channel) return { handled: true };
            if (frame.encryption !== 'required') return { handled: true };
            const pem = this.config.pinnedPublicKeyPem;
            if (!pem) return { handled: true };
            try {
                this.channel = new SecureChannel({
                    pinnedPublicKeyPem: pem,
                    expectedSigningKeyId: this.config.expectedSigningKeyId,
                });
                this._armTimer();
                const init = await this.channel.initiateHandshake();
                this.rawSend(init);
            } catch (e) {
                this.reset('init_failed');
            }
            return { handled: true };
        }

        if (t === MSG.RESPONSE) {
            if (!this.channel || this.channel.isSecure()) return { handled: true };
            try {
                const complete = await this.channel.handleResponse(frame);
                this.rawSend(complete);
            } catch (e) {
                this.reset('response_failed');
            }
            return { handled: true };
        }

        if (t === MSG.ACK) {
            if (!this.channel) return { handled: true };
            if (this.channel.isSecure()) return { handled: true };
            try {
                await this.channel.handleAck(frame);
                this._clearTimer();
                this._flushOutbound();
            } catch (e) {
                this.reset('ack_failed');
            }
            return { handled: true };
        }

        if (t === MSG.ENVELOPE) {
            if (!this.channel || !this.channel.isSecure()) return { handled: true };
            let plain;
            try {
                plain = await this.channel.decryptIncoming(frame);
            } catch (e) {
                return { handled: true };
            }
            if (plain && plain.__control === MSG.REKEY_SIGNAL) {
                try {
                    const ack = await this.channel.handleRekeySignal(plain);
                    this.rawSend(ack);
                } catch (e) {
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
