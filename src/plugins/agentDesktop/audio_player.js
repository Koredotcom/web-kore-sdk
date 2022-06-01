'use strict';
/*
 * Download & decode sound from site
 * Generate sound by pattern (ring-tone, busy-tone, special, DTMF, ...)
 * Play sound to speaker or to stream
 *
 * For modern browsers only and for secure connection.
 * Used AudioContext API.
 * Can be used in Chrome, Firefox, Safari, iOS Safari
 *  
 * Igor Kolosov AudioCodes Ltd 2020
 */
class AudioPlayer {
    constructor(createCtx = true) {
        this.logger = console.log; // by default.
        this.audioCtx = null;
        this.sounds = {};
        this.source = null;
        this.resolve = null;
        this.gain = null;
        this.streamDestination = null;
        this.dtmfTones = {
            '1': [{ f: [697, 1209], t: 0.2 }],
            '2': [{ f: [697, 1336], t: 0.2 }],
            '3': [{ f: [697, 1477], t: 0.2 }],
            '4': [{ f: [770, 1209], t: 0.2 }],
            '5': [{ f: [770, 1336], t: 0.2 }],
            '6': [{ f: [770, 1477], t: 0.2 }],
            '7': [{ f: [852, 1209], t: 0.2 }],
            '8': [{ f: [852, 1336], t: 0.2 }],
            '9': [{ f: [852, 1477], t: 0.2 }],
            '*': [{ f: [941, 1209], t: 0.2 }],
            '0': [{ f: [941, 1336], t: 0.2 }],
            '#': [{ f: [941, 1477], t: 0.2 }]
        };

        this.browser = this._browser();
        this.encodings = {
            chrome: ['mp3', 'aac', 'ogg'],
            firefox: ['mp3', 'aac', 'ogg'],
            safari: ['mp3', 'aac'],
            ios_safari: ['mp3', 'aac'],
            other: ['mp3', 'aac', 'ogg']
        }[this.browser];

        if (createCtx) {
            this.createCtx();
            if (this.isDisabled()) {
                console.log('AudioPlayer: AudioContext is suspended [Autoplay Policy]');
            }
        }
    }

    _browser() {
        if (/iPad|iPhone|iPod/.test(navigator.userAgent))
            return 'ios_safari'; 
        if (navigator.mozGetUserMedia)
            return 'firefox';
        if (navigator.webkitGetUserMedia) // Work only for secure connection
            return 'chrome';
        if (window.safari)
            return 'safari';
        return 'other';
    }

    createCtx() {
        try {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            this.logger('AudioPlayer: cannot create audioContext', e);
        }
    }

    init(logger, audioCtx = undefined) {
        this.logger = logger;
        this.logger(`AudioPlayer: init  (${this.browser})`);

        if (audioCtx !== undefined)
            this.audioCtx = audioCtx;

        if (this.browser === 'safari' || this.browser === 'ios_safari')
            this._setDecodeAudioDataShim(this.audioCtx);
    }

    // for Safari
    _setDecodeAudioDataShim(audioCtx) {
        let origDecodeAudioData = audioCtx.decodeAudioData;
        audioCtx.decodeAudioData = (data) => new Promise((resolve, reject) => {
            origDecodeAudioData.call(audioCtx, data, (d) => resolve(d), (e) => reject(e))
        });
    }

    // for Safari
    _setStartRenderingShim(offlineCtx) {
        let origStartRendering = offlineCtx.startRendering;
        offlineCtx.startRendering = () => new Promise((resolve) => {
            offlineCtx.oncomplete = (e) => { resolve(e.renderedBuffer); }
            origStartRendering.call(offlineCtx);
        });
    }

    // Check if context is disabled by audio auto-play policy.
    // Chrome implementation of audio auto-play policy is not compatible with Firefox,
    // where audio context after creation is also suspended during short time.
    isDisabled() {
        switch (this.browser) {
            case 'chrome':
            case 'safari':
            case 'ios_safari':
                return this.isSuspended();
            default:
                return false;
        }
    }

    enable() {
        switch (this.browser) {
            case 'chrome':
            case 'safari':
            case 'ios_safari':
                return this.resume();
            default:
                return Promise.resolve();
        }
    }

    isSuspended() {
        return this.audioCtx.state === 'suspended';
    }

    resume() {
        return this.audioCtx.resume();
    }

    suspend() {
        return this.audioCtx.suspend();
    }

    /**
     * Play sound
     * @param options
     *   name  sound clip name (must be set)
     *
     *   volume = 0..1.0   (1.0 by default)
     *
     *   Loop options:
     *     loop = true/false (false by default) Endless loop
     *     repeat =  repeat N times (undefined by default) Set automatically loop=true
     *
     *     duration seconds (undefined by default) Can be used with or without loop=true
     *
     *   If we want use part of downloaded sound, can be used:
     *
     *   clipStart (undefined by default)
     *   clipEnd  (undefined by default)
     *
     *   streamDestination (undefined by default), value mediaStreamDestination.
     *   Assign output to audio stream (dest.stream) instead of speaker.
     *
     *   startDelay  (0 by default).
     *   Before start delay some time.
     *
     * dropDisabled returns immediately when audioContext is suspended.
     * @returns Promise to check when playing is finished.
     */
    play(options) {
        if (!this.audioCtx)
            return Promise.reject('No audio context');

        if (this.isDisabled() && options.dropDisabled) { // To prevent sound defect after enabling.
            return Promise.resolve('drop sound for disabled');
        }

        return new Promise((resolve, reject) => {
            this.stop();
            this.resolve = resolve;
            try {
                let buf = this.sounds[options.name];
                if (!buf) {
                    this.logger('AudioPlayer: no sound: ' + options.name);
                    reject('No sound');
                    return;
                }
                this.logger('AudioPlayer: play:', options);
                this.source = this.audioCtx.createBufferSource();
                this.source.buffer = buf;

                this.source.onended = (e) => {
                    this.logger('AudioPlayer: onended ' + options.name);
                    resolve(true);
                }
                this.source.onerror = (e) => {
                    this.logger('AudioPlayer: onerror callback', e);
                    this._releaseResources();
                    reject('onerror callback');
                }

                this.gain = this.audioCtx.createGain();
                let volume = options.volume ? options.volume : 1.0;
                this.gain.gain.setValueAtTime(volume, this.audioCtx.currentTime);
                this.source.connect(this.gain);
                if (options.streamDestination) {
                    this.streamDestination = options.streamDestination;
                    this.gain.connect(this.streamDestination);
                } else {
                    this.streamDestination = null;
                    this.gain.connect(this.audioCtx.destination);
                }

                let clipStart = options.clipStart ? options.clipStart : 0;
                let clipEnd = options.clipEnd ? options.clipEnd : null;
                if (options.loop === true || options.repeat) {
                    this.source.loop = true;
                    this.source.loopStart = clipStart;
                    if (clipEnd)
                        this.source.loopEnd = clipEnd;
                }

                let duration = null;
                if (options.duration) {
                    duration = options.duration;
                } else if (options.repeat) {
                    if (clipEnd === null) clipEnd = this.source.buffer.duration;
                    duration = (clipEnd - clipStart) * options.repeat;
                } else if (clipEnd !== null) {
                    duration = clipEnd - clipStart;
                }

                let startDelay = 0;
                if (options.startDelay) {
                    startDelay = this.audioCtx.currentTime + options.startDelay;
                    if (duration)
                        duration += options.startDelay;
                }
                this.source.start(startDelay, clipStart);
                if (duration)
                    this.source.stop(this.audioCtx.currentTime + duration);
            } catch (e) {
                this.logger('AudioPlayer: play error', e);
                reject(e);
            }
        });
    }

    _releaseResources() {
        if (this.source)
            this.logger('AudioPlayer: release resources');

        try {
            this.source && this.source.stop();
        } catch (e) {
        }

        try {
            this.gain && this.gain.disconnect();
            this.source && this.source.disconnect();
            this.streamDestination && this.streamDestination.disconnect();
            this.gain = null;
            this.source = null;
            this.streamDestination = null;
        } catch (e) {
            this.logger('AudioPlayer: release resources error', e);
        }
    }

    /**
     * Stop playing (if was)
     */
    stop() {
        this._releaseResources();
        // Chrome bug workaround: source.stop does not lead to a call "onended"
        if (this.resolve) {
            this.resolve('stopped externally');
            this.resolve = null;
        }
    }

    /*
        Download set of sounds & decoding

        The same sound should be saved in site in different encodings: mp3, ogg, acc.

        For each browser set preferred encoding sequence:
        for Chrome, Firefox used ['mp3', 'acc', 'ogg'],
        for Safari used ['mp3', 'acc']
        At the first the function try to download and decode mp3 format,
        if there no such file or encoding error occured, will be used next encoding from the list.

        For modern browsers, it is enough to use MP3 sound encoding,
        without backup encoding formats.
        Usage example: download('sounds/', ['ring', 'bell'])
                       download('sounds/', [{ring: 'ring2'}, 'bell'])

        The download of sound stop after successull decoding, to check all encodings formats
        in some browser let use test=true
    */
    async downloadSounds(path, soundList, encodings = this.encodings, test = false) {
        this.logger('AudioPlayer: downloadSounds', soundList);
        for (let sound of soundList) {
            await this.downloadSound(path, sound, encodings, test);
        }
    }

    /*
       Download & decode sound. 
       Mostly used mp3 encoding, may be used also aac and ogg.
       Argument sound define sound file and corresponding sound name.
       Defined as string, if used the same name for file and sound.
          E.g. 'ring' Download file ring.mp3 and save as sound 'ring'
       Defined as object, if used diffrent names for file and sound.
          E.g. {ring: 'ring2'} Download file ring2.mp3 and save as sound 'ring'
     */
    async downloadSound(path, sound, encodings = this.encodings, test = false) {
        let decodedData = null;
        let soundName, fileName;
        if (sound instanceof Object) {
            soundName = Object.keys(sound)[0];
            fileName = sound[soundName];
        } else {
            soundName = fileName = sound;
        }
        for (let ext of encodings) {
            let file = fileName + '.' + ext;
            let data = null;
            let downloadStart = Date.now();
            try {
                let response = await fetch(path + file, { credentials: 'same-origin' });
                data = await response.arrayBuffer();
            } catch (e) {
                continue;
            }

            let decodingStart = Date.now();
            try {
                decodedData = await this.audioCtx.decodeAudioData(data);
                if (!test)
                    break;
                let decodingEnd = Date.now();
                this.logger('AudioPlayer [test] ' + file + ' is downloaded (%s) and decoded (%s)',
                    ((decodingStart - downloadStart) / 1000).toFixed(3), ((decodingEnd - decodingStart) / 1000).toFixed(3));
            } catch (e) {
                this.logger('AudioPlayer: decoding error: ' + fileName, e);
                continue;
            }
        }
        if (decodedData !== null) {
            this.sounds[soundName] = decodedData;
        } else {
            this.logger('AudioPlayer: Cannot download & decode: ' + fileName);
        }
        return decodedData;
    }

    /*  Phone ringing, busy and other tones vary in different countries, see:
     *  https://www.itu.int/ITU-T/inr/forms/files/tones-0203.pdf
     *
     *  Most can be easily generated, other can be downloaded as recorded sound.
     *
     *  France:
     *           Ringing tone - 440 1.5 on 3.5 off
     *           Busy tone - 440 0.5 on 0.5 off
     *
     *  Germany:
     *           Ringing tone - 425 1.0 on 4.0 off
     *           Busy tone - 425 0.48 on 0.48 off
     *           Special information tone - 900/1400/1800 3x0.33 on 1.0 off
     *
     *  Great Britain
     *          Ringing tone - 400+450  0.4 on 0.2 off 0.4 on 2.0 off  (simplified)
     *          Busy tone -  400 0.375 on 0.375 off
     *
     *  toneDefinition argument describe tone generation, as sequence of steps:
     *  here f - frequency, t - time.
     *
     *  Germany ringing [{f:425, t:1.0},  {t:4.0}]
     *  Germany busy    [{f:425, t:0.48}, {t:0.48}]
     *  Germany special [{f:900, t:0.33}, {f:1400, t:0.33}, {f:1800, t:0.33}, {t:1.0}]
     *  DTMF for '#'    [{f:[941, 1477], 0.2}]
     *  Great Britain ringing [{f:[400,450], t:0.4}, {t:0.2}, {f:[400, 450], t:0.4}, {t:2.0}]
     */
    generateTone(toneName, toneDefinition) {
        function getArray(e) {
            if (e === undefined) return [];
            if (Array.isArray(e)) return e;
            return [e];
        }

        try {
            let duration = 0;
            let oscillatorNumber = 0;
            for (let step of toneDefinition) {
                duration += step.t;
                oscillatorNumber = Math.max(oscillatorNumber, getArray(step.f).length);
            }
            let channels = 1;
            let sampleRate = this.audioCtx.sampleRate;
            let frameCount = sampleRate * duration;
            let offlineCtx = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(channels, frameCount, sampleRate);
            if (this.browser === 'safari' || this.browser === 'ios_safari')
                this._setStartRenderingShim(offlineCtx);

            let oscillators = new Array(oscillatorNumber);
            for (let i = 0; i < oscillators.length; i++) {
                oscillators[i] = offlineCtx.createOscillator();
                oscillators[i].connect(offlineCtx.destination);
            }

            let time = 0;
            for (let i = 0, num = toneDefinition.length; i < num; i++) {
                let step = toneDefinition[i];
                let frequencies = getArray(step.f);
                for (let j = 0; j < oscillators.length; j++) {
                    let f = (j < frequencies.length) ? frequencies[j] : 0;
                    oscillators[j].frequency.setValueAtTime(f, offlineCtx.currentTime + time);
                }
                time += step.t;
            }

            for (let o of oscillators) {
                o.start(0);
                o.stop(offlineCtx.currentTime + duration);
            }

            return offlineCtx.startRendering()
                .then(renderedBuffer => {
                    for (let o of oscillators)
                        o.disconnect();
                    this.sounds[toneName] = renderedBuffer;
                });
        } catch (e) {
            this.logger('AudioPlayer: cannot generate tone', e);
            return Promise.reject(e);
        }
    }

    async generateTonesSuite(suite) {
        for (const tone in suite) {
            await this.generateTone(tone, suite[tone]);
        }
    }

    generateTones(ringingTone, busyTone) {
        return this.generateTonesSuite(Object.assign({ 'ringingTone': ringingTone, 'busyTone': busyTone }, this.dtmfSuite));
    }
}