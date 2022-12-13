import { CancellationDetails, CancellationReason, PhraseListGrammar, ResultReason, SpeechConfig, SpeechRecognizer, SpeechSynthesizer } from 'microsoft-cognitiveservices-speech-sdk';
import $ from 'jquery'
import BaseTTS from '../BaseTTS';

export interface AzureTTSConfig {
    key:string;
    region:string;
}


class AzureTTS extends BaseTTS {
    name = 'AzureTTS';
    private speechConfig:any;
    private speechRecognizer:any ;
    private speechSynthesizer:any;
    config:AzureTTSConfig;
    _txtToSpeak:string ='';
  
    constructor(mainconfig:AzureTTSConfig) {
        super();
        this.config = mainconfig;

        this.speechConfig = SpeechConfig.fromSubscription(this.config.key, this.config.region);
    
        this.speechSynthesizer = new SpeechSynthesizer(this.speechConfig);

    }
    onHostCreate() {
        this.hostInstance.on("viewInit", (chatWindowEle: any) => {
            this.onInit();
        });

    }
    onInit() {
        this.installTextToSpeechTemplate();
    }
    
    OnSpeakerButtonClick() {
       
        if(!$('.ttspeakerDiv').hasClass('ttsOff')){
            // var synth = window.speechSynthesis;
            // synth.pause();
            $('.ttspeakerDiv').addClass('ttsOff');
        } else {
            $('.ttspeakerDiv').removeClass('ttsOff');
            this.hostInstance.on("afterRenderMessage", (chatWindowData: { msgData: any; }) => {
                var msgData= chatWindowData.msgData;
                if (msgData?.type === "bot_response" && !this.hostInstance.minimized && !this.hostInstance.historyLoading) {
                    if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.type === "template") {
                        this._txtToSpeak = '';
                    }else if(typeof (msgData.message[0] && msgData.message[0].component && msgData.message[0].component) == 'string'){
                        this._txtToSpeak  = msgData.message[0] && msgData.message[0].component && msgData.message[0].component;
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
                    if (msgData.message[0].component && msgData.message[0].component.payload &&  msgData.message[0].component.payload.speech_hint) {
                        this._txtToSpeak = msgData.message[0].component.payload.speech_hint;
                    }
                    this.textToSpeech(this._txtToSpeak);
                }
            });
        }

    }

    stop(){

        $('.recordingMicrophone').css('display', 'none');
        $('.notRecordingMicrophone').css('display', 'block');

    }

  
    public textToSpeech(text: string) {
      this.speechSynthesizer.speakTextAsync(text);
    }

    setCaretEnd(_this:any) {

    }

}

export default AzureTTS;


