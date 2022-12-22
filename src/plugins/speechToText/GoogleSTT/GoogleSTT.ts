import BaseSTT from "../BaseSTT";

import korejquery from '../../../libs/korejquery';
import Recorder from './recorder';
// declare const Recorder:any;
declare const window: any;
declare const navigator: any;
let $: any;


export interface GoogleSTTConfig {
    key: string;
    languageCode: string;

}


class GoogleSTT extends BaseSTT {
    name = 'GoogleSTT';

    gapiLoaded: boolean = true;
    isRecordingStarted: boolean = false;
    intervalKey: any;
    config: GoogleSTTConfig;
    constructor(mainconfig: GoogleSTTConfig) {

        super();
        this.config = mainconfig;

        if(!this.config.key){
            console.error('Please configure the Google STT API-KEY');
        }
        if(!this.config.languageCode){
            this.config.languageCode = 'en';

        }
    }
    onHostCreate() {
        $ = korejquery;
        this.hostInstance.on("viewInit", (chatWindowEle: any) => {
            this.onInit();
        });

    }
    onInit() {
        this.installSpeechToTextTemplate();
    }


    /**
 * Callback used to update sample UI when transcription completes.
 *
 * @param r The data from the API call containing an array of transcription
 *          results.
 */
    setCaretEnd(_this: any) {
        var sel;
        var prevRange;
        if (_this && _this.item(0) && _this.item(0).innerText.length) {
            var range = document.createRange();
            range.selectNodeContents(_this[0]);
            range.collapse(false);
            let sel1: any = window.getSelection();
            sel1.removeAllRanges();
            sel1.addRange(range);
            prevRange = range;
        } else {
            prevRange = false;
            if (_this && _this[0]) {
                _this[0].focus();
            }
        }
    }


    uiCallback(r: any) {
        if (r.results && r.results[0]) {
            $('.chatInputBox').html($('.chatInputBox').html() + ' ' + r.results[0].alternatives[0].transcript);
            setTimeout(() => {
                this.setCaretEnd((document as any).getElementsByClassName("chatInputBox"));
                document.getElementsByClassName('chatInputBox')[0].scrollTop = document.getElementsByClassName('chatInputBox')[0].scrollHeight;
            }, 350);
        }
        else if (r.code === 403) {
            this.gapiLoaded = false;
            if ($('.recordingMicrophone').is(':visible')) {
                $('.recordingMicrophone').trigger('click');
            }
            alert(r.message || 'Please provide valid Google speech API key');
        }
    }
    stop() {
        this.isRecordingStarted = false;

        clearInterval(this.intervalKey);
        $('.recordingMicrophone').css('display', 'none');
        $('.notRecordingMicrophone').css('display', 'block');
    }

    /**
 * Sends a file blob to the speech API endpoint.
 *
 * @param blob the Blob to send.
 * @param encoding the encoding type (e.g. 'flac' or 'LINEAR16').
 * @param rate the encoding rate, ideally 16000.
 */
    sendBlobToSpeech(blob: any, encoding: any, rate: any) {
        if (!this.gapiLoaded) {
            if ($('.recordingMicrophone').is(':visible')) {
                $('.recordingMicrophone').trigger('click');
            }
            alert('Please provide valid Google speech API key');
            return;
        }
        var speechSender: any = new FileReader();
        speechSender.addEventListener('loadend', () => {
            this.sendBytesToSpeech(btoa(speechSender.result), encoding, rate, this.uiCallback);
        });
        speechSender.readAsBinaryString(blob);
    }

    /**
     * Sends post data to the speech API endpoint.
     *
     * @param bytes The raw data to send.
     * @param encoding The encoding for the data transcribe.
     * @param rate The rate that the data is encoded at.
     * @param callback A function to send result data to.
     */
    sendBytesToSpeech(bytes: any, encoding: any, rate: any, callback: any) {
        // var $=jQuery || (window.KoreSDK && window.KoreSDK.dependencies && window.KoreSDK.dependencies.jQuery);
        // if(gapi.client && gapi.client.speech) {
        var _params = {
            audio: {
                content: bytes,
            },
            config: {
                encoding: encoding,
                languageCode: this.config.languageCode,
                sampleRateHertz: rate,
            },
        };

        fetch('https://content-speech.googleapis.com/v1/speech:recognize?alt=json&key=' + this.config.key, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_params)
        }).then(data => {
            return data.json();
        }).then(data => {
            console.log(data);
            callback(data);
        });


        // }
        // else {
        //   this.gapiLoaded = false;
        //   if ($('.recordingMicrophone').is(':visible')) {
        //       $('.recordingMicrophone').trigger('click');
        //   }
        //   alert('Please provide valid Google speech API key');
        // }
    }

    startGoogleSpeech(rec: any) {
        if (rec) {
            rec.record();
            $('.recordingMicrophone').css('display', 'block');
            $('.notRecordingMicrophone').css('display', 'none');
            console.log('recording...');
            this.intervalKey = setInterval(() => {
                rec.export16kMono((blob: any) => {
                    // if (chatInitialize.config.stt.vendor === 'google') {
                    this.sendBlobToSpeech(blob, 'LINEAR16', 16000);
                    // }
                    // else {
                    //     socketSend(blob);
                    // }
                    rec.clear();
                }, 'audio/x-raw');
            }, 1000);
        }
    }

    successAudioCallback(e: any) {
        // isListening = true;
        let mediaStream = e;
        // if (!context) {
        var Context = window.AudioContext || window.webkitAudioContext;
        let context = new Context();
        // }
        let mediaStreamSource = context.createMediaStreamSource(mediaStream);
        window.userSpeechAnalyser = context.createAnalyser();
        mediaStreamSource.connect(window.userSpeechAnalyser);
        console.log('Mediastream created');
        // if (_connection) {
        //     _connection.close();
        //     _connection = null;
        // }
        // if (rec) {
        //     rec.stop();
        //     rec.clear();
        //     //rec.destroy();
        //     rec = null;
        // }
        let rec = new Recorder(mediaStreamSource, {

        });
        console.log('Recorder Initialized');
        // _permission = true;

        this.startGoogleSpeech(rec);

        setTimeout(() => {
            this.setCaretEnd(document.getElementsByClassName("chatInputBox"));
        }, 600);
    }


    micEnable() {
        if (this.isRecordingStarted) {
            return;
        }
        if (!navigator.getUserMedia) {
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        }
        if (navigator.getUserMedia) {
            this.isRecordingStarted = true;
            navigator.getUserMedia({
                audio: true
            }, this.successAudioCallback.bind(this), (e: any) => {
                this.isRecordingStarted = false;
                alert('Please enable the microphone permission for this page');
                return;
            });
        } else {
            this.isRecordingStarted = false;
            alert('getUserMedia is not supported in this browser.');
        }
    }

    initializeSTTSpeechRecognition() {

        this.micEnable();
    }


    startSTTRecognization() {

    }


    onRecordButtonClick() {
        this.initializeSTTSpeechRecognition()
       // this.startSTTRecognization();
    }

}
export default GoogleSTT;
