import BaseTTS  from "../BaseTTS";
declare  const window:any;

/**
 *  Browser TTSPlugin class
 *
 * @decorator Class
 */
class BrowserTTS extends BaseTTS {
    name = 'BrowserTTS';
    speechSyn: any;
    audioMsgs: any[] = [];
    audioPlaying: boolean = false;
    onHostCreate() {
        let me: any = this;
        let cwInstance = me.hostInstance;
        cwInstance.on("viewInit", (chatWindowEle: any) => {
            me.onInit();
        });

        cwInstance.on('onKeyDown', (el: any) => {
            if (el && el.event.keyCode == 13) {
                me.stop();
            }
        });

        cwInstance.on('beforeViewInit', (el: any) => {
            el.chatEle.find('.close-btn')?.on('click', () => {
                me.stop();
            });
            el.chatEle.find('.reload-btn')?.on('click', () => {
                me.stop();
            });
            el.chatEle.find('.minimize-btn')?.on('click', () => {
                me.stop();
            });
        });
    }
    onInit() {
        let me = this;
        me.installTextToSpeechTemplate();
        //  To stop speaking long messages on refresh/reload
        window.addEventListener("beforeunload", (event: any) => {
            me.stop();
        });
    }

    OnSpeakerButtonClick(){
        let me: any = this;
        let $ = me.hostInstance.$;
        let cwInstance = me.hostInstance;
        if(!$('.ttspeakerDiv').hasClass('ttsOff')){
            var synth = window.speechSynthesis;
            synth.pause();
            $('.ttspeakerDiv').addClass('ttsOff');
        } else {
            $('.ttspeakerDiv').removeClass('ttsOff');
            cwInstance.on("afterRenderMessage", (chatWindowData: { msgData: any; }) => {
                var msgData= chatWindowData.msgData;
                if (msgData?.type === "bot_response" && !me.hostInstance.minimized && !me.hostInstance.historyLoading && !msgData.fromHistorySync) {
                    if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type === "live_agent" && msgData.message[0].component.payload.text) {
                        (<any>this)._txtToSpeak = msgData.message[0].component.payload.text;
                    } else if (msgData.message[0] && msgData.message[0].component && typeof msgData.message[0].component != 'object') { // agent transfer waiting message speaking
                        (<any>this)._txtToSpeak = msgData.message[0].component;
                    } else if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.type === "template") {
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
                    this.speakWithWebAPI((<any> this)._txtToSpeak);
                }
            });
        }
        
    }

    speakWithWebAPI(_txtToSpeak: string | undefined) {
        if(!_txtToSpeak){
            return false;
        }
        if('speechSynthesis' in window){
            // window.speechSynthesis.cancel();
            // Create a new instance of SpeechSynthesisUtterance.
            // var msg = new SpeechSynthesisUtterance();
            // msg.text =_txtToSpeak;
            // window.speechSynthesis.speak(msg);
            this.audioMsgs.push(_txtToSpeak);
            this.playMessageSequence();
       }else{
           console.warn("KORE:Your browser doesn't support TTS(Speech Synthesiser)")
       }
    }

    playMessageSequence() {
        let me: any = this;
        if (!this.speechSyn) {
            this.speechSyn = new SpeechSynthesisUtterance();
        }

        if (this.audioMsgs.length > 0 && !this.audioPlaying) {
            this.audioPlaying = true;
            this.speechSyn.text = this.audioMsgs.shift();
            window.speechSynthesis.speak(this.speechSyn);
            this.speechSyn.onend = function () {
                me.audioPlaying = false;
                me.playMessageSequence();
            }    
        }
    }

    stop() {
        if ('speechSynthesis' in window) {
            this.audioMsgs = [];
            this.audioPlaying = false
            window.speechSynthesis.cancel();
        }
    }
}
export default BrowserTTS;