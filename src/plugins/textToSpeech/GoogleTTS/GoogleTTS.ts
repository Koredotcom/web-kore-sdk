import { CancellationDetails, CancellationReason, PhraseListGrammar, ResultReason, SpeechConfig, SpeechRecognizer, SpeechSynthesizer } from 'microsoft-cognitiveservices-speech-sdk';
import $ from 'jquery'
import BaseTTS from '../BaseTTS';
declare const window: any;

export interface GoogleVoiceConfig {
    languageCode:string;
    name:string;
    ssmlGender: string;
}
export interface GoogleAudioConfig {
    audioEncoding:string;
}

export interface GoogleTTSConfig {
    key: string;
    region: string;
    voice:GoogleVoiceConfig;
    audioConfig:GoogleAudioConfig;
}


class GoogleTTS extends BaseTTS {
    name = 'GoogleTTS';

    config: GoogleTTSConfig;
    _txtToSpeak: string = '';
    isPlaying:boolean = false;
    audioInterval:any;
    currentAudio:any;

    constructor(mainconfig: GoogleTTSConfig) {
        super();
        this.config = mainconfig;



    }
    onHostCreate() {
        this.hostInstance.on("viewInit", (chatWindowEle: any) => {
            this.onInit();
        });

    }
    onInit() {
        this.installTextToSpeechTemplate();
    }


    /* @arr array you want to listen to
 @callback function that will be called on any change inside array
*/
    listenChangesinArray(arr:any, callback:any) {
        // Add more methods here if you want to listen to them
        [ 'push'].forEach((m:any) => {
            arr[m] = function () {
                var res = Array.prototype[m].apply(arr, arguments);  // call normal behaviour
                callback.apply(arr,  arguments);  // finally call the callback supplied
                return res;
            }
        });
    }

    OnSpeakerButtonClick() {
        let audioList: any = [];

        this.listenChangesinArray(audioList, async (changes:any, index:any)=>{
          this.audioInterval =   setInterval(e=>{
                if(this.isPlaying){
                    return;
                }
                this.currentAudio = audioList.splice(0,1)[0];
                if(this.currentAudio){
                    this.currentAudio.audio.play();
                }
                         clearInterval(this.audioInterval);

            }, 500)
         
        });


        if (!$('.ttspeakerDiv').hasClass('ttsOff')) {
            // var synth = window.speechSynthesis;
            // synth.pause();
            this.stop();
            $('.ttspeakerDiv').addClass('ttsOff');
        } else {
            $('.ttspeakerDiv').removeClass('ttsOff');

            if(this.isPlaying && this.currentAudio){
                this.currentAudio.audio.play();
            }
        
            this.hostInstance.on("afterRenderMessage", async (chatWindowData: { msgData: any; }) => {
                var msgData = chatWindowData.msgData;
                if (msgData?.type === "bot_response" && !this.hostInstance.minimized && !this.hostInstance.historyLoading) {
                    if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.type === "template") {
                        this._txtToSpeak = '';
                    } else if (typeof (msgData.message[0] && msgData.message[0].component && msgData.message[0].component) == 'string') {
                        this._txtToSpeak = msgData.message[0] && msgData.message[0].component && msgData.message[0].component;
                    }
                    else {
                        try {
                            this._txtToSpeak = msgData.message[0].component.payload.text ? msgData.message[0].component.payload.text.replace(/\r?\n/g, ". .") : "";
                            this._txtToSpeak = this.hostInstance.helpers.checkMarkdowns(this._txtToSpeak);
                            // replacing extra new line or line characters
                            this._txtToSpeak = this._txtToSpeak.replace('___', '<hr/>');
                            this._txtToSpeak = this._txtToSpeak.replace('---', '<hr/>');
                        } catch (e) {
                            this._txtToSpeak = '';
                        }
                    }
                    if (msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.speech_hint) {
                        this._txtToSpeak = msgData.message[0].component.payload.speech_hint;
                    }

  
                    const audio: any = await this.textToSpeech(this._txtToSpeak).then(a => a.json());

                    const audioObj: any = document.createElement('audio');
                    if (!audio.audioContent) {
                        return;
                    }
                    audioObj.setAttribute('src', 'data:audio/wav;base64,' + audio.audioContent);


                    audioObj.addEventListener('ended', async (e: any) => {
                        this.isPlaying = false;
                    });

                    audioObj.addEventListener('playing', async (e: any) => {
                        this.isPlaying = true;
     
                    });
                    audioList.push({ base64: audio.audioContent, audio: audioObj });
                }
            });
        }

    }

    stop() {

        clearInterval(this.audioInterval);
        if(this.isPlaying && this.currentAudio){
            this.currentAudio.audio.pause();
        }

    }


    textToSpeech(text: string) {

        return fetch('https://texttospeech.googleapis.com/v1/text:synthesize/?key=' + this.config.key, {
            body: JSON.stringify({
                'input': {
                    'text': text
                },
                "voice":  this.config.voice,
                "audioConfig": this.config.audioConfig
            }),
            headers: {
                // Authorization: 'Bearer ' + this.config.key,
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'POST'
        })
    }

    setCaretEnd(_this: any) {


    }

}

export default GoogleTTS;


