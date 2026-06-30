// Browser-side secure channel client: ECDH + AES-GCM via window.crypto.subtle,
// wire-compatible with koreserver/services/SecureChannel/.

const PROTOCOL_VERSION = 'rtm-ecdh-v1';
const NONCE_BYTES = 16;
const IV_BYTES = 12;
const TAG_BYTES = 16;
const AES_KEY_BITS = 256;
const EC_RAW_PUBKEY_BYTES = 65;

const STATE = {
    INIT: 'INIT',
    AWAITING_RESPONSE: 'AWAITING_RESPONSE',
    AWAITING_ACK: 'AWAITING_ACK',
    SECURE: 'SECURE',
    FAILED: 'FAILED',
};

const MSG = {
    INIT: 'key_exchange_init',
    RESPONSE: 'key_exchange_response',
    COMPLETE: 'key_exchange_complete',
    ACK: 'key_exchange_ack',
    ENVELOPE: 'secure_envelope',
    REKEY_SIGNAL: 'rekey_signal',
    REKEY_ACK: 'rekey_ack',
    CAPABILITIES: 'protocol_capabilities',
};

const HANDSHAKE_TOKEN_C2S = 'rtm-handshake-ok';
const HANDSHAKE_TOKEN_S2C = 'rtm-handshake-server-ok';

// ---------- encoding helpers ----------
function b64encode(buf) {
    const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
    let s = '';
    for (let i = 0; i < bytes.length; i += 1) s += String.fromCharCode(bytes[i]);
    return btoa(s);
}
function b64decode(s) {
    const bin = atob(s);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
    return out;
}
function concatBytes(...arrays) {
    const total = arrays.reduce((acc, a) => acc + a.length, 0);
    const out = new Uint8Array(total);
    let off = 0;
    for (const a of arrays) { out.set(a, off); off += a.length; }
    return out;
}
function utf8encode(s) { return new TextEncoder().encode(s); }
function utf8decode(b) { return new TextDecoder().decode(b); }

// ---------- IV (counter-based) ----------
function ivFromCounter(counter /* BigInt */) {
    if (counter < 0n || counter >= (1n << 63n)) {
        throw new Error('counter_overflow_force_rekey');
    }
    const iv = new Uint8Array(IV_BYTES);
    const view = new DataView(iv.buffer);
    // 4 leading zero bytes already set; write counter as BE uint64 at offset 4
    const hi = Number((counter >> 32n) & 0xffffffffn);
    const lo = Number(counter & 0xffffffffn);
    view.setUint32(IV_BYTES - 8, hi, false);
    view.setUint32(IV_BYTES - 4, lo, false);
    return iv;
}

// ---------- subtle helpers ----------
async function importAesGcmKey(rawBytes) {
    return window.crypto.subtle.importKey(
        'raw', rawBytes,
        { name: 'AES-GCM' },
        false, ['encrypt', 'decrypt'],
    );
}
async function aesGcmEncrypt(aesKey, iv, plainBuf) {
    const out = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        aesKey, plainBuf,
    );
    // SubtleCrypto AES-GCM returns ciphertext || tag. Split.
    const total = new Uint8Array(out);
    const tag = total.slice(total.length - TAG_BYTES);
    const ct = total.slice(0, total.length - TAG_BYTES);
    return { ct, tag };
}
async function aesGcmDecrypt(aesKey, iv, ct, tag) {
    const combined = concatBytes(ct, tag);
    const plain = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        aesKey, combined,
    );
    return new Uint8Array(plain);
}
async function hkdfDerive(sharedSecret, salt, info, lengthBytes) {
    const ikm = await window.crypto.subtle.importKey(
        'raw', sharedSecret,
        { name: 'HKDF' },
        false, ['deriveBits'],
    );
    const bits = await window.crypto.subtle.deriveBits(
        { name: 'HKDF', hash: 'SHA-256', salt, info: utf8encode(info) },
        ikm, lengthBytes * 8,
    );
    return new Uint8Array(bits);
}

// SubjectPublicKeyInfo prefix for an uncompressed P-256 EC raw point.
const SPKI_PREFIX_P256 = new Uint8Array([
    0x30, 0x59, 0x30, 0x13, 0x06, 0x07, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x02, 0x01,
    0x06, 0x08, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x03, 0x01, 0x07, 0x03, 0x42, 0x00,
]);

async function importEcdhPubFromRaw(rawBytes) {
    return window.crypto.subtle.importKey(
        'spki', concatBytes(SPKI_PREFIX_P256, rawBytes),
        { name: 'ECDH', namedCurve: 'P-256' },
        false, [],
    );
}

async function exportRawPubFromKey(publicKey) {
    const spki = new Uint8Array(await window.crypto.subtle.exportKey('spki', publicKey));
    return spki.slice(spki.length - EC_RAW_PUBKEY_BYTES);
}

async function ecdhDeriveSharedSecret(privateKey, peerRawPub) {
    const peerKey = await importEcdhPubFromRaw(peerRawPub);
    const bits = await window.crypto.subtle.deriveBits(
        { name: 'ECDH', public: peerKey },
        privateKey, 256,
    );
    return new Uint8Array(bits);
}

async function importEcdsaVerifyKey(pemPublicKey) {
    // Strip PEM headers; decode base64 to DER bytes
    const b64 = pemPublicKey.replace(/-----BEGIN [^-]+-----|-----END [^-]+-----|\s+/g, '');
    const der = b64decode(b64);
    return window.crypto.subtle.importKey(
        'spki', der,
        { name: 'ECDSA', namedCurve: 'P-256' },
        false, ['verify'],
    );
}

// ECDSA signatures from Node's crypto come in DER format. Web Crypto wants
// raw r||s (64 bytes for P-256). Convert.
function derToJoseEcdsaP256(derBytes) {
    // DER: 0x30 len 0x02 lenR R 0x02 lenS S
    const view = new Uint8Array(derBytes);
    if (view[0] !== 0x30) throw new Error('bad_der_signature');
    let offset = 2;
    if (view[1] & 0x80) offset = 2 + (view[1] & 0x7f);
    if (view[offset] !== 0x02) throw new Error('bad_der_signature_r');
    const rLen = view[offset + 1];
    let r = view.slice(offset + 2, offset + 2 + rLen);
    offset = offset + 2 + rLen;
    if (view[offset] !== 0x02) throw new Error('bad_der_signature_s');
    const sLen = view[offset + 1];
    let s = view.slice(offset + 2, offset + 2 + sLen);
    // Strip leading zeros and left-pad to 32 bytes
    if (r[0] === 0x00 && r.length === 33) r = r.slice(1);
    if (s[0] === 0x00 && s.length === 33) s = s.slice(1);
    const rOut = new Uint8Array(32); rOut.set(r, 32 - r.length);
    const sOut = new Uint8Array(32); sOut.set(s, 32 - s.length);
    return concatBytes(rOut, sOut);
}

// ---------- main class ----------
class SecureChannel {
    constructor({ pinnedPublicKeyPem, sessionId, expectedSigningKeyId } = {}) {
        if (!pinnedPublicKeyPem) {
            throw new Error('SecureChannel: pinnedPublicKeyPem is required');
        }
        // Fail fast on malformed PEM so callers see a clear error at
        // construction time rather than an opaque importKey() rejection
        // mid-handshake (which kills the channel after a network round-trip).
        if (typeof pinnedPublicKeyPem !== 'string'
            || !/-----BEGIN [A-Z ]*PUBLIC KEY-----/.test(pinnedPublicKeyPem)
            || !/-----END [A-Z ]*PUBLIC KEY-----/.test(pinnedPublicKeyPem)) {
            throw new Error('SecureChannel: pinnedPublicKeyPem is not a valid PEM SPKI public key');
        }
        this.pinnedPublicKeyPem = pinnedPublicKeyPem;
        this.expectedSigningKeyId = expectedSigningKeyId || null;
        this.sessionId = sessionId || self.crypto.randomUUID();

        this.state = STATE.INIT;
        this.privateKey = null;
        this.publicKeyRaw = null;
        this.c2sNonce = null;
        this.s2cNonce = null;
        this.sharedSecret = null;
        this.salt = null;
        this.generation = 0;
        this.k_c2s = null;     // CryptoKey (AES-GCM)
        this.k_s2c = null;     // CryptoKey (AES-GCM)
        this.c2sSeq = 0n;
        this.s2cSeq = 0n;

        // Serialization locks. SubtleCrypto operations yield to the event
        // loop, so without these the counters can be read by two concurrent
        // callers before either has incremented — causing IV reuse on encrypt
        // (catastrophic for AES-GCM) and counter desync on decrypt.
        this._outboundLock = Promise.resolve();
        this._inboundLock = Promise.resolve();
    }

    async initiateHandshake() {
        if (this.state !== STATE.INIT) throw new Error('handshake_state_invalid');
        const kp = await window.crypto.subtle.generateKey(
            { name: 'ECDH', namedCurve: 'P-256' },
            false, // not extractable — keeps private key inside SubtleCrypto
            ['deriveBits'],
        );
        this.privateKey = kp.privateKey;
        this.publicKeyRaw = await exportRawPubFromKey(kp.publicKey);
        this.c2sNonce = window.crypto.getRandomValues(new Uint8Array(NONCE_BYTES));

        this.state = STATE.AWAITING_RESPONSE;
        return {
            type: MSG.INIT,
            version: PROTOCOL_VERSION,
            clientPublicKey: b64encode(this.publicKeyRaw),
            c2sNonce: b64encode(this.c2sNonce),
            sessionId: this.sessionId,
        };
    }

    async handleResponse(msg) {
        if (this.state !== STATE.AWAITING_RESPONSE) throw new Error('handshake_state_invalid');
        if (!msg || msg.type !== MSG.RESPONSE) throw new Error('expected_key_exchange_response');
        if (this.expectedSigningKeyId && msg.signingKeyId !== this.expectedSigningKeyId) {
            throw new Error('signing_key_id_mismatch');
        }
        const serverPubBuf = b64decode(msg.serverPublicKey);
        if (serverPubBuf.length !== EC_RAW_PUBKEY_BYTES) throw new Error('server_pub_wrong_size');
        const s2cNonce = b64decode(msg.s2cNonce);
        const sigDer = b64decode(msg.sig);

        // Verify the server signature
        const verifyKey = await importEcdsaVerifyKey(this.pinnedPublicKeyPem);
        const sigInput = concatBytes(
            this.publicKeyRaw, serverPubBuf,
            this.c2sNonce, s2cNonce,
            utf8encode(msg.sessionId),
        );
        const sigJose = derToJoseEcdsaP256(sigDer);
        const ok = await window.crypto.subtle.verify(
            { name: 'ECDSA', hash: 'SHA-256' },
            verifyKey, sigJose, sigInput,
        );
        if (!ok) throw new Error('server_signature_invalid');

        // ECDH + key derivation
        this.sharedSecret = await ecdhDeriveSharedSecret(this.privateKey, serverPubBuf);
        this.salt = concatBytes(this.c2sNonce, s2cNonce);
        this.s2cNonce = s2cNonce;
        this.sessionId = msg.sessionId;
        await this._installGeneration(0);

        // Build the encrypted complete message
        const iv = ivFromCounter(this.c2sSeq);
        const plainBuf = utf8encode(HANDSHAKE_TOKEN_C2S);
        const { ct, tag } = await aesGcmEncrypt(this.k_c2s, iv, plainBuf);
        this.c2sSeq += 1n;

        this.state = STATE.AWAITING_ACK;
        return {
            type: MSG.COMPLETE,
            iv: b64encode(iv),
            ciphertext: b64encode(ct),
            tag: b64encode(tag),
        };
    }

    async handleAck(msg) {
        if (this.state !== STATE.AWAITING_ACK) throw new Error('handshake_state_invalid');
        if (!msg || msg.type !== MSG.ACK) throw new Error('expected_key_exchange_ack');
        const iv = b64decode(msg.iv);
        const ct = b64decode(msg.ciphertext);
        const tag = b64decode(msg.tag);
        const expectedIv = ivFromCounter(this.s2cSeq);
        if (!_buffersEqual(iv, expectedIv)) throw new Error('ack_iv_mismatch');
        const plainBuf = await aesGcmDecrypt(this.k_s2c, iv, ct, tag);
        const plain = utf8decode(plainBuf);
        if (plain !== HANDSHAKE_TOKEN_S2C) throw new Error('ack_token_mismatch');
        this.s2cSeq += 1n;
        this.state = STATE.SECURE;
    }

    // Serialized via _outboundLock: each call awaits the previous one. This
    // guarantees one outbound encrypt is in-flight at a time, so c2sSeq is
    // never read by two parallel callers — preventing AES-GCM IV reuse, the
    // forbidden-attack condition for confidentiality.
    encryptOutgoing(plainObj) {
        const result = this._outboundLock.then(async () => {
            if (this.state !== STATE.SECURE) throw new Error('channel_not_secure');
            const iv = ivFromCounter(this.c2sSeq);
            const plainBuf = utf8encode(JSON.stringify(plainObj));
            const { ct, tag } = await aesGcmEncrypt(this.k_c2s, iv, plainBuf);
            this.c2sSeq += 1n;
            return {
                type: MSG.ENVELOPE,
                gen: this.generation,
                iv: b64encode(iv),
                ciphertext: b64encode(ct),
                tag: b64encode(tag),
            };
        });
        // Chain regardless of outcome so the queue keeps moving on failure.
        this._outboundLock = result.catch(() => undefined);
        return result;
    }

    // Serialized via _inboundLock. WebSocket delivers frames in order, but
    // when the message handler is async, the JS event loop can dispatch the
    // next frame before the previous decrypt completes. Without this lock the
    // second decrypt would read a stale s2cSeq, fail iv_sequence_mismatch,
    // and permanently desync the channel.
    decryptIncoming(envelope) {
        const result = this._inboundLock.then(async () => {
            if (this.state !== STATE.SECURE) throw new Error('channel_not_secure');
            if (!envelope || envelope.type !== MSG.ENVELOPE) throw new Error('expected_envelope');
            if (envelope.gen !== this.generation) {
                throw new Error('generation_mismatch expected=' + this.generation + ' got=' + envelope.gen);
            }
            const iv = b64decode(envelope.iv);
            const ct = b64decode(envelope.ciphertext);
            const tag = b64decode(envelope.tag);
            const expectedIv = ivFromCounter(this.s2cSeq);
            if (!_buffersEqual(iv, expectedIv)) throw new Error('iv_sequence_mismatch');
            const plainBuf = await aesGcmDecrypt(this.k_s2c, iv, ct, tag);
            this.s2cSeq += 1n;
            return JSON.parse(utf8decode(plainBuf));
        });
        this._inboundLock = result.catch(() => undefined);
        return result;
    }

    isSecure() { return this.state === STATE.SECURE; }
    isFailed() { return this.state === STATE.FAILED; }

    async _installGeneration(gen) {
        const k_c2s_raw = await hkdfDerive(this.sharedSecret, this.salt, 'c2s|gen' + gen, 32);
        const k_s2c_raw = await hkdfDerive(this.sharedSecret, this.salt, 's2c|gen' + gen, 32);
        this.k_c2s = await importAesGcmKey(k_c2s_raw);
        this.k_s2c = await importAesGcmKey(k_s2c_raw);
        this.generation = gen;
        this.c2sSeq = 0n;
        this.s2cSeq = 0n;
    }
}

function _buffersEqual(a, b) {
    if (a.length !== b.length) return false;
    let r = 0;
    for (let i = 0; i < a.length; i += 1) r |= a[i] ^ b[i];
    return r === 0;
}

export { SecureChannel, STATE, MSG };
export default SecureChannel;
