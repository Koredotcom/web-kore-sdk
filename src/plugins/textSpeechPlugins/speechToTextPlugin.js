import recorderWorkerPath from '/libs/recorderWorker.js';
class SpeechToTextPlugin {
    name = 'SpeechToTextPlugin';
    config = {
        isSpeechEnabled: true,
        allowGoogleSpeech: true
    };
    pickerHTML;
    ttsAudioSource = null;
    recognition = null;
    isRecordingStarted = false;
    final_transcript = '';
    recognizing = false;
    prevStr = "";
    prevRange;
    navigator = window.navigator;
    isListening = false;
    mediaStream;
    mediaStreamSource;
    rec;
    _connection;
    intervalKey;
    context;
    _permission = false;
    sidToken;
     two_line = /\n\n/g;
     one_line = /\n/g;
     speechPrefixURL = ""
     userIdentity ;
     bearerToken;
     assertionToken;
    constructor(config) {
        config = config || {};
        this.config = {
            ...this.config,
            ...config
        }
    }
    onHostCreate() {
        let me = this;
        let cwInstance = me.hostInstance;
        this.speechPrefixURL = me.hostInstance.config.botOptions.koreSpeechAPIUrl;
        this.userIdentity = me.hostInstance.config.botOptions.userIdentity;
        this.bearerToken = me.hostInstance.config.botOptions.bearer;
        cwInstance.on("viewInit", (chatWindowEle) => {
            me.onInit();
        });

    }
    onInit() {
        let me = this;
        me.installSpeechToTextTemplate();
    }
    appendPickerHTMLtoChatWindowFooter(pickerHTML) {
        let me = this;
        let chatWindowInstance = me.hostInstance;
        const _chatContainer = chatWindowInstance.chatEle;
        _chatContainer.find('.kore-chat-footer .footerContainer').append(pickerHTML);
    }
    installSpeechToTextTemplate() {
        let me = this;
        let $ = me.hostInstance.$;
        me.pickerHTML = $(me.getSpeechToTextTemplateString());
        me.appendPickerHTMLtoChatWindowFooter(me.pickerHTML);
        me.bindEvents();
    }
    getSpeechToTextTemplateString() {
        var speechToTextTemplate = '<div class="sdkFooterIcon microphoneBtn"> \
        <button class="notRecordingMicrophone" title="Microphone On"> \
            <i class="microphone"></i> \
        </button> \
        <button class="recordingMicrophone" title="Microphone Off" > \
            <i class="microphone"></i> \
            <span class="recordingGif"></span> \
        </button> \
        <div id="textFromServer"></div> \
    </div>';
        return speechToTextTemplate
    }
    bindEvents() {
        let me = this;
        let $ = me.hostInstance.$;
        $(me.pickerHTML).off('click', '.notRecordingMicrophone').on('click', '.notRecordingMicrophone', function (event) {
            if (this.ttsAudioSource) {
                this.ttsAudioSource.stop();
            }
            if (me.config.isSpeechEnabled) {
                me.getSIDToken();
            }
        });
        $(me.pickerHTML).off('click', '.recordingMicrophone').on('click', '.recordingMicrophone', function (event) {
            stop();
            setTimeout(function () {
                me.setCaretEnd(document.getElementsByClassName("chatInputBox"));
            }, 350);
        });
    }
    getSIDToken() {
        let me = this;
        let $ = me.hostInstance.$;
        // this.speechPrefixURL = me.hostInstance.config.botOptions.koreAPIUrl;
        this.userIdentity = me.hostInstance.config.botOptions.userIdentity;
        this.bearerToken = me.hostInstance.config.botOptions.bearer;
        me.getSpeechToText();
        if (me.config.allowGoogleSpeech) {
            if (this.recognition) { // using webkit speech recognition
                me.startGoogleWebKitRecognization();
            }
            else { // using google cloud speech API
            me.micEnable();
            }
        }
        else {
            if (!this.speechPrefixURL) {
                console.warn("Please provide speech socket url");
                return false;
            }
            $.ajax({
                url: this.speechPrefixURL + "asr/wss/start?email=" + this.userIdentity,
                type: 'post',
                headers: { "Authorization": (this.bearerToken) ? this.bearerToken : this.assertionToken },
                dataType: 'json',
                success: function (data) {
                    this.sidToken = data.link;
                    me.micEnable();
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }
    }
    getSpeechToText() {
        let me = this;
        let $ = me.hostInstance.$;
        if ('webkitSpeechRecognition' in window && me.isChrome()) {
            this.recognition = new window.webkitSpeechRecognition;
            this.final_transcript = '';
            this.recognition.continuous = true;
            this.recognition.interimResults = true;

            this.recognition.onstart = function () {
                this.prevStr = "";
                this.recognizing = true;
                $('.recordingMicrophone').css('display', 'block');
                $('.notRecordingMicrophone').css('display', 'none');
            };

            this.recognition.onerror = function (event) {
                console.log(event.error);
                $('.recordingMicrophone').trigger('click');
                $('.recordingMicrophone').css('display', 'none');
                $('.notRecordingMicrophone').css('display', 'block');
            };

            this.recognition.onend = function () {
                this.recognizing = false;
                $('.recordingMicrophone').trigger('click');
                $('.recordingMicrophone').css('display', 'none');
                $('.notRecordingMicrophone').css('display', 'block');
            };

            this.recognition.onresult = function (event) {
                this.final_transcript = '';
                var interim_transcript = '';
                for (var i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        this.final_transcript += event.results[i][0].transcript;
                    } else {
                        interim_transcript += event.results[i][0].transcript;
                    }
                }
                this.final_transcript = me.capitalize(this.final_transcript);
                this.final_transcript = me.linebreak(this.final_transcript);
                interim_transcript = me.linebreak(interim_transcript);
                if (this.final_transcript !== "") {
                    this.prevStr += this.final_transcript;
                }
                //console.log('Interm: ',interim_transcript);
                //console.log('final: ',final_transcript);
                if (this.recognizing) {
                    $('.chatInputBox').html(this.prevStr + "" + interim_transcript);
                    $('.sendButton').removeClass('disabled');
                }

                setTimeout(function () {
                    me.setCaretEnd(document.getElementsByClassName("chatInputBox"));
                    document.getElementsByClassName('chatInputBox')[0].scrollTop = document.getElementsByClassName('chatInputBox')[0].scrollHeight;
                }, 350);
            };
        }
    }
    startGoogleWebKitRecognization() {
        if (this.recognizing) {
            this.recognition.stop();
            return;
        }
        this.final_transcript = '';
        this.recognition.lang = 'en-US';
        this.recognition.start();
    }
    micEnable() {
        let me = this;
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
            }, me.success, function (e) {
                this.isRecordingStarted = false;
                alert('Please enable the microphone permission for this page');
                return;
            });
        } else {
            this.isRecordingStarted = false;
            alert('getUserMedia is not supported in this browser.');
        }
    }
    setCaretEnd(_this) {
        var sel;
        if (_this && _this.item(0) && _this.item(0).innerText.length) {
            var range = document.createRange();
            range.selectNodeContents(_this[0]);
            range.collapse(false);
            var sel1 = window.getSelection();
            sel1.removeAllRanges();
            sel1.addRange(range);
            this.prevRange = range;
        } else {
            this.prevRange = false;
            if (_this && _this[0]) {
                _this[0].focus();
            }
        }
    }
    isChrome() {
        var isChromium = window.chrome,
            winNav = window.navigator,
            vendorName = winNav.vendor,
            isOpera = winNav.userAgent.indexOf("OPR") > -1,
            isIEedge = winNav.userAgent.indexOf("Edge") > -1,
            isIOSChrome = winNav.userAgent.match("CriOS");

        if (isIOSChrome) {
            return true;
        } else if (
            isChromium !== null &&
            typeof isChromium !== "undefined" &&
            vendorName === "Google Inc." &&
            isOpera === false &&
            isIEedge === false
        ) {
            return true;
        } else {
            return false;
        }
    }
    success(e) {
        this.isListening = true;
        this.mediaStream = e;
        if (!this.context) {
            var Context = window.AudioContext || window.webkitAudioContext;
            this.context = new Context();
        }
        this.mediaStreamSource = this.context.createMediaStreamSource(this.mediaStream);
        window.userSpeechAnalyser = this.context.createAnalyser();
        this.mediaStreamSource.connect(window.userSpeechAnalyser);
        console.log('Mediastream created');
        if (this._connection) {
            this._connection.close();
            this._connection = null;
        }
        if (this.rec) {
            this.rec.stop();
            this.rec.clear();
            //rec.destroy();
            this.rec = null;
        }
        this.rec = new Recorder(this.mediaStreamSource, {
            workerPath: recorderWorkerPath
        });
        console.log('Recorder Initialized');
        this._permission = true;
        if (!me.config.allowGoogleSpeech) {
            me.afterMicEnable();
        }
        else {
            me.startGoogleSpeech();
        }
        setTimeout(function () {
            me.setCaretEnd(document.getElementsByClassName("chatInputBox"));
        }, 600);
    }
    startGoogleSpeech() {
        if (this.rec) {
            this.rec.record();
            $('.recordingMicrophone').css('display', 'block');
            $('.notRecordingMicrophone').css('display', 'none');
            console.log('recording...');
            this.intervalKey = setInterval(function () {
                this.rec.export16kMono(function (blob) {
                    console.log(new Date());
                    if (me.config.allowGoogleSpeech) {
                        sendBlobToSpeech(blob, 'LINEAR16', 16000);
                    }
                    else {
                        socketSend(blob);
                    }
                    this.rec.clear();
                }, 'audio/x-raw');
            }, 1000);
        }
    }
    afterMicEnable() {
        let me = this;
        if (navigator.getUserMedia) {
            if (!this.rec) {
                this.isRecordingStarted = false;
                console.error("Recorder undefined");
                return;
            }
            if (this._connection) {
                me.cancel();
            }
            try {
                this._connection = me.createSocket();
            } catch (e) {
                this.isRecordingStarted = false;
                console.log(e);
                console.error('Web socket not supported in the browser');
            }
        }
    }
    cancel() {
        let $ = me.hostInstance.$;
        // Stop the regular sending of audio (if present) and disconnect microphone
        // clearInterval(this.intervalKey);
        this.isRecordingStarted = false;
        if ($('.recordingMicrophone')) {
            $('.recordingMicrophone').css('display', 'none');
        }
        if ($('.notRecordingMicrophone')) {
            $('.notRecordingMicrophone').css('display', 'block');
        }
        if (this.mediaStream !== null && this.mediaStream && this.mediaStream.getTracks()[0].enabled) {
            var track = this.mediaStream.getTracks()[0];
            track.stop();
        }
        if (this._connection) {
            this._connection.close();
            this._connection = null;
        }
        if (this.rec) {
            this.rec.stop();
            this.rec.clear();
        }
        this.sidToken = "";
    }

    socketSend(item) {
        let me = this;
        if (this._connection) {
            var state = this._connection.readyState;
            if (state === 1) {
                if (item instanceof Blob) {
                    if (item.size > 0) {
                        this._connection.send(item);
                        //console.log('Send: blob: ' + item.type + ', ' + item.size);
                    } else {
                        //console.log('Send: blob: ' + item.type + ', ' + item.size);
                    }
                } else {
                    console.log(item);
                    this._connection.send(item);
                    //console.log('send tag: '+ item);
                }
            } else {
                this.isRecordingStarted = false;
                console.error('Web Socket readyState != 1: ', state, 'failed to send :' + item.type + ', ' + item.size);
                me.cancel();
            }
        } else {
            this.isRecordingStarted = false;
            console.error('No web socket connection: failed to send: ', item);
        }
    }
     linebreak(s) {
        return s.replace(this.two_line, '<p></p>').replace(this.one_line, '<br>');
    }
     capitalize(s) {
        return s.replace(s.substr(0, 1), function (m) { return m.toUpperCase(); });
    }


    createSocket() {
        window.ENABLE_MICROPHONE = true;
        window.SPEECH_SERVER_SOCKET_URL = this.sidToken;
        var serv_url = window.SPEECH_SERVER_SOCKET_URL;
        var userEmail = this.userIdentity;
        window.WebSocket = window.WebSocket || window.MozWebSocket;
        var url = serv_url + '&' + CONTENT_TYPE + '&email=' + userEmail;
        var _connection = new WebSocket(url);
        // User is connected to server
        _connection.onopen = function (e) {
            let me = this;
            let $ = me.hostInstance.$;
            console.log('User connected');
            _user_connection = true;
            this.rec.record();
            $('.recordingMicrophone').css('display', 'block');
            $('.notRecordingMicrophone').css('display', 'none');
            console.log('recording...');
            this.prevStr = "";
            this.intervalKey = setInterval(function () {
                this.rec.export16kMono(function (blob) {
                    socketSend(blob);
                    this.rec.clear();
                }, 'audio/x-raw');
            }, INTERVAL);
        };
        // On receving message from server
        _connection.onmessage = function (msg) {
            var me = this;
            var $ = me.hostInstance.$;
            var data = msg.data;
            var interim_transcript = '';
            //console.log(data);
            if (data instanceof Object && !(data instanceof Blob)) {
                console.log('Got object that is not a blob');
            } else if (data instanceof Blob) {
                console.log('Got Blob');
            } else {
                var res = JSON.parse(data);
                if (this.isListening && res.status === 0) {
                    interim_transcript = res.result.hypotheses[0].transcript;
                    if (res.result.final) {
                        this.prevStr += res.result.hypotheses[0].transcript + " ";
                        interim_transcript = "";
                    }

                    console.log('Interm: ', interim_transcript);
                    console.log('final: ', this.prevStr);
                    $('.chatInputBox').html(this.prevStr + "" + interim_transcript);
                    setTimeout(function () {
                        me.setCaretEnd(document.getElementsByClassName("chatInputBox"));
                        document.getElementsByClassName('chatInputBox')[0].scrollTop = document.getElementsByClassName('chatInputBox')[0].scrollHeight;
                    }, 350);
                    /*if (res.result.final) {
                        var final_result = res.result.hypotheses[0].transcript;
                        $('.chatInputBox').html($('.chatInputBox').html() + ' ' + final_result);
                        setTimeout(function () {
                            setCaretEnd(document.getElementsByClassName("chatInputBox"));
                            document.getElementsByClassName('chatInputBox')[0].scrollTop = document.getElementsByClassName('chatInputBox')[0].scrollHeight;
                        }, 350);
                    } else {
                        //$('.chatInputBox').html($('.chatInputBox').html() + ' '+ res.result.hypotheses[0].transcript);
                        console.log('Not final: ', res.result.hypotheses[0].transcript);
                    }*/
                } else {
                    console.log('Server error : ', res.status);
                }
            }
        };
        // If server is closed
        _connection.onclose = function (e) {
            let me = this;
            let $ = me.hostInstance.$;
            if ($('.chatInputBox').text() !== '' && me.hostInstance.config.autoEnableSpeechAndTTS) {
                var chatConfig = window.chatContainerConfig;
                chatConfig.sendMessage($('.chatInputBox'));
            }
            this.isRecordingStarted = false;
            console.log('Server is closed');
            console.log(e);
            me.cancel();
        };
        // If there is an error while sending or receving data
        _connection.onerror = function (e) {
            console.log("Error : ", e);
        };
        return _connection;
    }

    stop() {
        let me = this;
        let $ = me.hostInstance.$;
        if ($('.chatInputBox').text() !== '' && me.hostInstance.config.autoEnableSpeechAndTTS) {
            var chatConfig = window.chatContainerConfig;
            chatConfig.sendMessage($('.chatInputBox'));
        }
        // clearInterval(this.intervalKey);
        $('.recordingMicrophone').css('display', 'none');
        $('.notRecordingMicrophone').css('display', 'block');
        if (this.rec) {
            this.rec.stop();
            this.isListening = false;
            console.log('stopped recording..');
            setTimeout(function () {
                if (this._connection) {
                    this._connection.close();
                    this._connection = null;
                }
            }, 1000); // waiting to send and receive last message

            this.rec.export16kMono(function (blob) {
                socketSend(blob);
                this.rec.clear();
                if (this._connection) {
                    this._connection.close();
                }
                var track = this.mediaStream.getTracks()[0];
                track.stop();
                this.rec.destroy();
                this.isRecordingStarted = false;
            }, 'audio/x-raw');
        } else {
            console.error('Recorder undefined');
        }
        if (this.recognizing) {
            this.recognition.stop();
            this.recognizing = false;
        }
    };

}
export default SpeechToTextPlugin;