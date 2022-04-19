
import speakTextWithAWSPollyClass from './kore-aws-polly';
// import audioPlayer from '../plugins/audio_player';
class TtsSpeechPlugin {
    name = 'TtsSpeechPlugin';
    config = {
        isTTSEnabled: true,			// set true, to hide speaker icon
        ttsInterface: 'awspolly',
    };
    ttsAudioSource;
    _ttsConnection;
    ttsServerUrl;
    userIdentity;
    constructor(mainconfig) {
        // config = config || {};
        // this.config = {
        //     ...this.config,
        // }
        this.config = {
            ...this.config,
            ...mainconfig
        }
        this.ttsSpeech= new speakTextWithAWSPollyClass();
    }
    onHostCreate() {
        let me = this;
        let cwInstance = me.hostInstance;
        cwInstance.on("viewInit", (chatWindowEle) => {
            me.onInit();
        });

    }
    onInit() {
        let me = this;
        me.installTextToSpeechTemplate();
    }
    appendPickerHTMLtoChatWindowFooter(pickerHTML) {
        let me = this;
        let chatWindowInstance = me.hostInstance;
        const _chatContainer = chatWindowInstance.chatEle;
        _chatContainer.find('.kore-chat-footer .footerContainer').append(pickerHTML);
    }
    installTextToSpeechTemplate() {
        let me = this;
        let $ = me.hostInstance.$;
        me.pickerHTML = $(me.getTextToSpeechTemplateString());
        me.appendPickerHTMLtoChatWindowFooter(me.pickerHTML);
        me.bindEvents();
        me.initTTSAudioContext();
        let cwInstance = me.hostInstance;
        cwInstance.on("afterRenderMessage", (chatWindowData) => {
            var msgData= chatWindowData.msgData;
            if (msgData.type === "bot_response" && me.hostInstance.isTTSOn && me.config.isTTSEnabled && !me.hostInstance.minimized && !me.hostInstance.historyLoading) {
                if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.type === "template") {
                    this._txtToSpeak = '';
                }
                else {
                    try {
                        this._txtToSpeak = msgData.message[0].component.payload.text ? msgData.message[0].component.payload.text.replace(/\r?\n/g, ". .") : "";
                        this._txtToSpeak = me.hostInstance.helpers.checkMarkdowns(this._txtToSpeak);
                        // replacing extra new line or line characters
                        this._txtToSpeak = this._txtToSpeak.replace('___', '<hr/>');
                        this._txtToSpeak = this._txtToSpeak.replace('---', '<hr/>');
                    } catch (e) {
                        this._txtToSpeak = '';
                    }
                }
                if (msgData.message[0].component && msgData.message[0].component.payload.speech_hint) {
                    this._txtToSpeak = msgData.message[0].component.payload.speech_hint;
                }
                if (me.config.ttsInterface&&me.config.ttsInterface==="webapi") {
                    this._ttsConnection = me.speakWithWebAPI(this._txtToSpeak);
                }else if(me.config.ttsInterface && me.config.ttsInterface==="awspolly"){
                    // if(!window.speakTextWithAWSPolly){
                    //     console.warn("Please uncomment amazon polly files 'plugins/aws-sdk-2.668.0.min.js' and'plugins/kore-aws-polly.js' in index.html");
                    // }else{
                        this.ttsSpeech.speakTextWithAWSPolly(this._txtToSpeak);
                        // this.ttsSpeech.checkForQueue();
                    // }

                }else if (!this._ttsConnection || (this._ttsConnection.readyState && this._ttsConnection.readyState !== 1)) {
                    try {
                        this._ttsConnection = me.createSocketForTTS();
                    } catch (e) {
                        console.log(e);
                    }
                }
                else {
                    me.socketSendTTSMessage(this._txtToSpeak);
                }
            }
        });
    }
    getTextToSpeechTemplateString() {
        var textToSpeechTemplate = '<div class="sdkFooterIcon ttspeakerDiv ttsOff"> \
        <button class="ttspeaker" title="Talk to speak"> \
            <span class="ttsSpeakerEnable"></span> \
            <span class="ttsSpeakerDisable"></span> \
            <span style="display:none;"><audio id="ttspeaker" controls="" autoplay="" name="media"><source src="" type="audio/wav"></audio></span>\
        </button> \
    </div> ';
        return textToSpeechTemplate
    }
    bindEvents(){
        let me = this;
        let $ = me.hostInstance.$;
        $(me.pickerHTML).off('click', '.ttspeaker').on('click', '.ttspeaker', function (event) {
            // me.installPlugin(new speakTextWithAWSPolly());
            if (me.config.isTTSEnabled) {
                if (me.hostInstance.isTTSOn) {
                    if (this.ttsAudioSource) {
                        this.ttsAudioSource.stop();
                    }
                    me.cancelTTSConnection();
                    me.hostInstance.isTTSOn = false;
                    $('#ttspeaker')[0].pause();
                    if(me.config.ttsInterface && me.config.ttsInterface ==="webapi"){
                        var synth = window.speechSynthesis;
                        synth.pause();
                     }else if (me.config.ttsInterface === 'awspolly') {
                        if (me.hostInstance.isTTSOn ===false) {
                            // isTTSOn = false;
                            gainNode.gain.value = 0; // 10 %
                            $('.ttspeakerDiv').addClass('ttsOff');
                        }
                    }
                    $('.ttspeakerDiv').addClass('ttsOff');
                } 
                else {
                    if(me.config.ttsInterface && me.config.ttsInterface==="webapi"){
                        this._ttsConnection = me.speakWithWebAPI();

                    }else if(me.config.ttsInterface &&me.config.ttsInterface === 'awspolly'){
                        gainNode.gain.value = 1
                    }else{
                        this._ttsConnection = createSocketForTTS();
                    }
                    me.hostInstance.isTTSOn = true;
                    $('.ttspeakerDiv').removeClass('ttsOff');
                }
            }
        });
    }
    speakWithWebAPI= function(_txtToSpeak) {
        if(!_txtToSpeak){
            return false;
        }
        if('speechSynthesis' in window){
            window.speechSynthesis.cancel();
            // Create a new instance of SpeechSynthesisUtterance.
            var msg = new SpeechSynthesisUtterance();
            msg.text =_txtToSpeak;
           //  msg.voice = speechSynthesis.getVoices().filter(function(voice) {        
           //      return voice.default===true;
           //     })[0];
           // Queue this utterance.
            window.speechSynthesis.speak(msg);
       }else{
           console.warn("KORE:Your browser doesn't support TTS(Speech Synthesiser)")
       }
    }
     createSocketForTTS() {
        let me = this;
        let $ = me.hostInstance.$;
        this.userIdentity = me.hostInstance.config.botOptions.userIdentity;
        if(!this.ttsServerUrl){
            console.warn("Please provide tts socket url");
            return false;
        }
        window.TTS_SOCKET_URL = this.ttsServerUrl;
        var serv_url = window.TTS_SOCKET_URL;
        var userEmail = this.userIdentity;
        window.WebSocket = window.WebSocket || window.MozWebSocket;
        var _ttsConnection = new WebSocket(serv_url);
        _ttsConnection.binaryType = 'arraybuffer';
        // User is connected to server
        _ttsConnection.onopen = function (e) {
            me.socketSendTTSMessage(this._txtToSpeak);
        };
        // On receving message from server
        _ttsConnection.onmessage = function (msg) {
            _txtToSpeak = "";
            if (typeof msg.data === 'string') {
                // do nothing
            } else {
                var _data = msg.data
                if (me.isTTSOn) {
                    me.playsound(_data);
                }
            }
        };
        // If server is closed
        _ttsConnection.onclose = function (e) {
            //tts socket closed
        };
        // If there is an error while sending or receving data
        _ttsConnection.onerror = function (e) {
            console.log("Error : ", e);
        };
        return _ttsConnection;
    }
     socketSendTTSMessage(item) {
        if (this._ttsConnection) {
            var state = this._ttsConnection.readyState;
            if (state === 1) {
                var auth = (bearerToken) ? bearerToken : assertionToken;
                var _message = {
                    message: item,
                    'user': _botInfo.name,
                    'authorization': auth
                };
                this._ttsConnection.send(JSON.stringify(_message));
            } else {
                console.error('Web Socket readyState != 1: ', state);
                me.cancelTTSConnection();
            }
        } else {
            console.error('No web socket connection: failed to send');
        }
    }
     initTTSAudioContext() {
        if (!this._ttsContext) {
            if (!window.AudioContext) {
                if (!window.webkitAudioContext) {
                    console.error("Your browser does not support any AudioContext and cannot play back this audio.");
                    return;
                }
                window.AudioContext = window.webkitAudioContext;
            }
           this._ttsContext = new AudioContext();
        }
    }

     playsound(raw) {
         let me = this;
        this._ttsContext.decodeAudioData(raw, function (buffer) {
            if (!buffer) {
                console.error("failed to decode:", "buffer null");
                return;
            }
            try {
                if (this.ttsAudioSource) {
                    this.ttsAudioSource.stop();
                }
                this.ttsAudioSource = this._ttsContext.createBufferSource();
                this.ttsAudioSource.buffer = buffer;
                this.ttsAudioSource.connect(_ttsContext.destination);
                this.ttsAudioSource.start(0);
                this.ttsAudioSource.addEventListener('ended', function () {
                    setTimeout(function () {
                        if (me.isTTSOn && me.hostInstance.config.autoEnableSpeechAndTTS) {
                            $('.notRecordingMicrophone').trigger('click');
                        }
                    }, 350);
                });
            } catch (e) {
            }
        }, function (error) {
            console.error("failed to decode:", error);
        });
    }
     cancelTTSConnection() {
        if (this._ttsConnection) {
            this._ttsConnection.close();
            this._ttsConnection = null;
        }
    }
}
export default TtsSpeechPlugin;
