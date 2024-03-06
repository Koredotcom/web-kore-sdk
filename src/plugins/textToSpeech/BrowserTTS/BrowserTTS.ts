import BaseTTS  from "../BaseTTS";
declare  const window:any;

/**
 *  Browser TTSPlugin class
 *
 * @decorator Class
 */
class BrowserTTS extends BaseTTS {
    name = 'BrowserTTS';
    _ttsConnection:any;
    onHostCreate() {
        let me: any = this;
        let cwInstance = me.hostInstance;
        cwInstance.on("viewInit", (chatWindowEle: any) => {
            me.onInit();
        });
    }
    onInit() {
        let me = this;
        me.installTextToSpeechTemplate();
        //  To stop speaking long messages on refresh/reload
        window.addEventListener("beforeunload", (event: any) => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        });
    }

    OnSpeakerButtonClick(){
        let me: any = this;
        let $ = me.hostInstance.$;
        let cwInstance = me.hostInstance;
        if (me.hostInstance.config.UI.version == 'v2') {
            if(!$('.ttspeakerDiv').hasClass('ttsOff')){
                var synth = window.speechSynthesis;
                synth.pause();
                $('.ttspeakerDiv').addClass('ttsOff');
            } else {
                $('.ttspeakerDiv').removeClass('ttsOff');
                cwInstance.on("afterRenderMessage", (chatWindowData: { msgData: any; }) => {
                    var msgData= chatWindowData.msgData;
                    if (msgData?.type === "bot_response" && !me.hostInstance.minimized && !me.hostInstance.historyLoading) {
                        if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.type === "template") {
                            (<any> this)._txtToSpeak = '';
                        }
                        else {
                            try {
                                (<any> this)._txtToSpeak = msgData.message[0].component.payload.text ? msgData.message[0].component.payload.text.replace(/\r?\n/g, ". .") : "";
                                (<any> this)._txtToSpeak = me.hostInstance.helpers.checkMarkdowns((<any> this)._txtToSpeak);
                                // replacing extra new line or line characters
                                (<any> this)._txtToSpeak = (<any> this)._txtToSpeak.replace('___', '<hr/>');
                                (<any> this)._txtToSpeak = (<any> this)._txtToSpeak.replace('---', '<hr/>');
                            } catch (e) {
                                (<any> this)._txtToSpeak = '';
                            }
                        }
                        if (msgData.message[0].component && msgData.message[0].component.payload.speech_hint) {
                            (<any> this)._txtToSpeak = msgData.message[0].component.payload.speech_hint;
                        }
                        this._ttsConnection = me.speakWithWebAPI((<any> this)._txtToSpeak);
                    }
                });
            }
        } else {
            cwInstance.on("afterRenderMessage", (chatWindowData: { msgData: any; }) => {
                var msgData = chatWindowData.msgData;
                if (msgData?.type === "bot_response" && me.isSpeakerOn && !me.hostInstance.historyLoading) {
                    if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.type === "template") {
                        (<any>this)._txtToSpeak = '';
                    }
                    else {
                        try {
                            (<any>this)._txtToSpeak = msgData.message[0].component.payload.text ? msgData.message[0].component.payload.text.replace(/\r?\n/g, ". .") : "";
                            (<any>this)._txtToSpeak = me.hostInstance.helpers.checkMarkdowns((<any>this)._txtToSpeak);
                            // replacing extra new line or line characters
                            (<any>this)._txtToSpeak = (<any>this)._txtToSpeak.replace('___', '<hr/>');
                            (<any>this)._txtToSpeak = (<any>this)._txtToSpeak.replace('---', '<hr/>');
                        } catch (e) {
                            (<any>this)._txtToSpeak = '';
                        }
                    }
                    if (msgData.message[0].component && msgData.message[0].component.payload.speech_hint) {
                        (<any>this)._txtToSpeak = msgData.message[0].component.payload.speech_hint;
                    }
                    this._ttsConnection = me.speakWithWebAPI((<any>this)._txtToSpeak);
                }
            });
    }
        
    }

    speakWithWebAPI= function(_txtToSpeak: string | undefined) {
        if(!_txtToSpeak){
            return false;
        }
        if('speechSynthesis' in window){
            window.speechSynthesis.cancel();
            // Create a new instance of SpeechSynthesisUtterance.
            var msg = new SpeechSynthesisUtterance();
            msg.text =_txtToSpeak;
            window.speechSynthesis.speak(msg);
       }else{
           console.warn("KORE:Your browser doesn't support TTS(Speech Synthesiser)")
       }
    }
}
export default BrowserTTS;