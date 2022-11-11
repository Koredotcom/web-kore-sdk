import BaseSTT from "../BaseSTT";
declare  const window:any;

/**
 *  WekKitSTT Plugin class
 *
 * @decorator Class
 */
class WebKitSTT extends BaseSTT {
    name = 'WebKitSTT';
    config = {
        lang: 'en-US'
    };
    recognition: any;
    final_transcript: string | undefined;
    recognizing: any;
    two_line = /\n\n/g;
    one_line = /\n/g;
    prevRange: any;
    hostInstance: any;
    constructor(mainconfig: any) {
        // config = config || {};
        // this.config = {
        //     ...this.config,
        // }
        super();
        this.config = {
            ...this.config,
            ...mainconfig
        }

    }
    onHostCreate() {
        let me: any = this;
        let cwInstance = me.hostInstance;
        cwInstance.on("viewInit", (chatWindowEle: any) => {
            me.onInit();
        });
    }

    onInit() {
        let me = this;
        me.installSpeechToTextTemplate();
    }

    onRecordButtonClick() {
        let me: any = this;
        me.initializeWebKitSpeechRecognition()
        me.startWebKitRecognization();
    }

    initializeWebKitSpeechRecognition() {
        let me: any = this;
        let $ = me.hostInstance.$;
        if ('webkitSpeechRecognition' in window && me.isChrome()) {
            this.recognition = new window.webkitSpeechRecognition;
            this.final_transcript = '';
            this.recognition.continuous = true;
            this.recognition.interimResults = true;

            this.recognition.onstart = function () {
                this.prevStr = "";
                me.recognizing = true;
                $('.recordingMicrophone').css('display', 'block');
                $('.notRecordingMicrophone').css('display', 'none');
            };

            this.recognition.onerror = function (event: { error: any; }) {
                console.log(event.error);
                // $('.recordingMicrophone').trigger('click');
                $('.recordingMicrophone').css('display', 'none');
                $('.notRecordingMicrophone').css('display', 'block');
            };

            this.recognition.onend = function () {
                me.recognizing = false;
                $('.recordingMicrophone').trigger('click');
                $('.recordingMicrophone').css('display', 'none');
                $('.notRecordingMicrophone').css('display', 'block');
            };

            this.recognition.onresult = function (event: { resultIndex: any; results: string | any[]; }) {
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
                if (me.recognizing) {
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

    startWebKitRecognization() {
        if (this.recognizing) {
            this.recognition.stop();
            return;
        }
        this.final_transcript = '';
        this.recognition.lang = this.config.lang || 'en-US';
        this.recognition.start();
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

    linebreak(s: string) {
        return s.replace(this.two_line, '<p></p>').replace(this.one_line, '<br>');
    }

    capitalize(s: string) {
        return s.replace(s.substr(0, 1), function (m: string) { return m.toUpperCase(); });
    }

    setCaretEnd(_this: any) {
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
        if (me.recognizing) {
            me.recognition.stop();
            me.recognizing = false;
        }
    };
}
export default WebKitSTT;
