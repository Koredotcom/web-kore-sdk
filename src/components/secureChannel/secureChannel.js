// Browser-side secure channel client: ECDH + AES-GCM via window.crypto.subtle

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

function ivFromCounter(counter) {
    if (counter < 0n || counter >= (1n << 63n)) {
        throw new Error('counter_overflow_force_rekey');
    }
    const iv = new Uint8Array(IV_BYTES);
    const view = new DataView(iv.buffer);
    const hi = Number((counter >> 32n) & 0xffffffffn);
    const lo = Number(counter & 0xffffffffn);
    view.setUint32(IV_BYTES - 8, hi, false);
    view.setUint32(IV_BYTES - 4, lo, false);
    return iv;
}

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
    //decode base64 to DER bytes
    const b64 = pemPublicKey.replace(/-----BEGIN [^-]+-----|-----END [^-]+-----|\s+/g, '');
    const der = b64decode(b64);
    return window.crypto.subtle.importKey(
        'spki', der,
        { name: 'ECDSA', namedCurve: 'P-256' },
        false, ['verify'],
    );
}

function derToJoseEcdsaP256(derBytes) {
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
    if (r[0] === 0x00 && r.length === 33) r = r.slice(1);
    if (s[0] === 0x00 && s.length === 33) s = s.slice(1);
    const rOut = new Uint8Array(32); rOut.set(r, 32 - r.length);
    const sOut = new Uint8Array(32); sOut.set(s, 32 - s.length);
    return concatBytes(rOut, sOut);
}

// Secure channel
class SecureChannel {
    constructor({ pinnedPublicKeyPem, sessionId, expectedSigningKeyId } = {}) {
        if (!pinnedPublicKeyPem) {
            throw new Error('SecureChannel: pinnedPublicKeyPem is required');
        }
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

        this.outboundLock = Promise.resolve();
        this.inboundLock = Promise.resolve();
    }

    async initiateHandshake() {
        if (this.state !== STATE.INIT) throw new Error('handshake_state_invalid');
        const kp = await window.crypto.subtle.generateKey(
            { name: 'ECDH', namedCurve: 'P-256' },
            false,
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

        // verify the server signature
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
        await this.installGeneration(0);

        // build the encrypted complete message
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
        if (!buffersEqual(iv, expectedIv)) throw new Error('ack_iv_mismatch');
        const plainBuf = await aesGcmDecrypt(this.k_s2c, iv, ct, tag);
        const plain = utf8decode(plainBuf);
        if (plain !== HANDSHAKE_TOKEN_S2C) throw new Error('ack_token_mismatch');
        this.s2cSeq += 1n;
        this.state = STATE.SECURE;
    }

    encryptOutgoing(plainObj) {
        const result = this.outboundLock.then(async () => {
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
        this.outboundLock = result.catch(() => undefined);
        return result;
    }

    decryptIncoming(envelope) {
        const result = this.inboundLock.then(async () => {
            if (this.state !== STATE.SECURE) throw new Error('channel_not_secure');
            if (!envelope || envelope.type !== MSG.ENVELOPE) throw new Error('expected_envelope');
            if (envelope.gen !== this.generation) {
                throw new Error('generation_mismatch expected=' + this.generation + ' got=' + envelope.gen);
            }
            const iv = b64decode(envelope.iv);
            const ct = b64decode(envelope.ciphertext);
            const tag = b64decode(envelope.tag);
            const expectedIv = ivFromCounter(this.s2cSeq);
            if (!buffersEqual(iv, expectedIv)) throw new Error('iv_sequence_mismatch');
            const plainBuf = await aesGcmDecrypt(this.k_s2c, iv, ct, tag);
            this.s2cSeq += 1n;
            return JSON.parse(utf8decode(plainBuf));
        });
        this.inboundLock = result.catch(() => undefined);
        return result;
    }

    // Handle a server-initiated rekey. The server sends {__control:rekey_signal,newGen}
    // encrypted on the CURRENT generation; decryptIncoming() has already unwrapped it and
    // passes the control object here. We install the new generation (fresh k_c2s/k_s2c,
    // counters reset to 0) and return a rekey_ack envelope encrypted on the NEW generation
    // (client->server key). Mirrors koreserver SecureChannelManager.handleRekeySignal.
    //
    // Serialized on the outbound lock so the generation swap + ack encrypt cannot interleave
    // with a concurrent outgoing encrypt (which would read a half-swapped key/counter).
    handleRekeySignal(controlMsg) {
        const result = this.outboundLock.then(async () => {
            if (this.state !== STATE.SECURE) throw new Error('channel_not_secure');
            const newGen = controlMsg && controlMsg.newGen;
            if (typeof newGen !== 'number' || newGen !== this.generation + 1) {
                throw new Error('rekey_invalid_generation');
            }
            await this.installGeneration(newGen); // derives new keys, resets c2sSeq/s2cSeq
            const iv = ivFromCounter(this.c2sSeq);
            const plainBuf = utf8encode(JSON.stringify({ __control: MSG.REKEY_ACK, acceptedGen: newGen }));
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
        this.outboundLock = result.catch(() => undefined);
        return result;
    }

    isSecure() { return this.state === STATE.SECURE; }
    isFailed() { return this.state === STATE.FAILED; }

    async installGeneration(gen) {
        const k_c2s_raw = await hkdfDerive(this.sharedSecret, this.salt, 'c2s|gen' + gen, 32);
        const k_s2c_raw = await hkdfDerive(this.sharedSecret, this.salt, 's2c|gen' + gen, 32);
        this.k_c2s = await importAesGcmKey(k_c2s_raw);
        this.k_s2c = await importAesGcmKey(k_s2c_raw);
        this.generation = gen;
        this.c2sSeq = 0n;
        this.s2cSeq = 0n;
    }
}

function buffersEqual(a, b) {
    if (a.length !== b.length) return false;
    let r = 0;
    for (let i = 0; i < a.length; i += 1) r |= a[i] ^ b[i];
    return r === 0;
}

export { SecureChannel, STATE, MSG };
export default SecureChannel;
