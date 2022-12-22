self["webpackHotUpdatekore_web_sdk"]("esm",{

/***/ "./src/plugins/textToSpeech/KoreAWSPolly/kore-aws-polly.ts":
/*!*****************************************************************!*\
  !*** ./src/plugins/textToSpeech/KoreAWSPolly/kore-aws-polly.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseTTS__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseTTS */ "./src/plugins/textToSpeech/BaseTTS.ts");
/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aws-sdk */ "./node_modules/aws-sdk/lib/browser.js");
/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_0__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var SpeakTextWithAWSPolly = /** @class */ (function (_super) {
    __extends(SpeakTextWithAWSPolly, _super);
    function SpeakTextWithAWSPolly(mainConfig) {
        var _this = _super.call(this) || this;
        _this.name = 'speakTextWithAWSPollyClass';
        if (!mainConfig.identityCredentials) {
            console.error('Please configure the AWS Identity credentials');
        }
        _this.config = {
            'AWS.config.region': mainConfig.region || 'ap-south-1',
            'AWS.config.credentials': new aws_sdk__WEBPACK_IMPORTED_MODULE_0__.CognitoIdentityCredentials(mainConfig.identityCredentials)
        };
        return _this;
    }
    SpeakTextWithAWSPolly.prototype.onHostCreate = function () {
        var me = this;
        var cwInstance = me.hostInstance;
        cwInstance.on("viewInit", function (chatWindowEle) {
            me.onInit();
        });
    };
    SpeakTextWithAWSPolly.prototype.onInit = function () {
        var me = this;
        me.installTextToSpeechTemplate();
        setInterval(function () {
            me.checkForQueue();
        }, 300);
        me.initAudioContext();
    };
    SpeakTextWithAWSPolly.prototype.checkForQueue = function () {
        var me = this;
        if (this.queue && this.queue.length && this.audioStatus === 'idle') {
            var currentUtterance = this.queue.shift();
            me.speakTextReq(currentUtterance);
        }
    };
    SpeakTextWithAWSPolly.prototype.speakTextReq = function (textToSpeak) {
        var me = this;
        this.audioStatus = 'busy';
        // Create the JSON parameters for getSynthesizeSpeechUrl
        var speechParams = {
            OutputFormat: "mp3",
            SampleRate: "16000",
            Text: "",
            TextType: "text",
            VoiceId: "Joanna" //Salli | Joanna | Ivy | Kendra | Kimberly | Matthew | Justin |Joey
        };
        speechParams.Text = textToSpeak; //document.getElementById("textEntry").value;
        // Create the Polly service object and presigner object
        var polly = new aws_sdk__WEBPACK_IMPORTED_MODULE_0__.Polly({ apiVersion: '2016-06-10' });
        var signer = new aws_sdk__WEBPACK_IMPORTED_MODULE_0__.Polly.Presigner(speechParams, polly);
        // Create presigned URL of synthesized speech file
        signer.getSynthesizeSpeechUrl(speechParams, function (error, url) {
            if (error) {
                document.getElementById('result').innerHTML = error;
            }
            else {
                me.playFromUrl(url);
            }
        });
    };
    SpeakTextWithAWSPolly.prototype.initAudioContext = function () {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        window.audioContext = new AudioContext();
        window.gainNode = window.audioContext.createGain();
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (stream) {
            window.audioContext.resume().then(function (res) {
            });
        })
            .catch(function (err) {
            console.log('Audio permissions denied by user');
        });
    };
    SpeakTextWithAWSPolly.prototype.playFromUrl = function (URL) {
        var me = this;
        var request = new XMLHttpRequest();
        request.open('GET', URL, true);
        request.responseType = 'arraybuffer';
        request.onload = function onLoad() {
            var Data = request.response;
            me.process(Data);
        };
        request.send();
    };
    SpeakTextWithAWSPolly.prototype.process = function (Data) {
        var source = window.audioContext.createBufferSource();
        window.audioContext.decodeAudioData(Data, function (buffer) {
            source.buffer = buffer;
            window.gainNode.connect(window.audioContext.destination);
            // now instead of connecting to aCtx.destination, connect to the gainNode
            source.connect(window.gainNode);
            source.start(window.audioContext.currentTime);
            source.onended = function () {
                this.audioStatus = 'idle';
                console.log('Your audio has finished playing');
            };
        });
    };
    SpeakTextWithAWSPolly.prototype.speakTextWithAWSPolly = function (textToSpeak) {
        this.queue.push(textToSpeak);
        this.checkForQueue();
    };
    SpeakTextWithAWSPolly.prototype.OnSpeakerButtonClick = function () {
        var _this = this;
        var me = this;
        var $ = me.hostInstance.$;
        var cwInstance = me.hostInstance;
        if (!$('.ttspeakerDiv').hasClass('ttsOff')) {
            var synth = window.speechSynthesis;
            synth.pause();
            $('.ttspeakerDiv').addClass('ttsOff');
        }
        else {
            $('.ttspeakerDiv').removeClass('ttsOff');
            cwInstance.on("afterRenderMessage", function (chatWindowData) {
                var msgData = chatWindowData.msgData;
                if ((msgData === null || msgData === void 0 ? void 0 : msgData.type) === "bot_response" && !me.hostInstance.minimized && !me.hostInstance.historyLoading) {
                    if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.type === "template") {
                        _this._txtToSpeak = '';
                    }
                    else {
                        try {
                            _this._txtToSpeak = msgData.message[0].component.payload.text ? msgData.message[0].component.payload.text.replace(/\r?\n/g, ". .") : "";
                            _this._txtToSpeak = me.hostInstance.helpers.checkMarkdowns(_this._txtToSpeak);
                            // replacing extra new line or line characters
                            _this._txtToSpeak = _this._txtToSpeak.replace('___', '<hr/>');
                            _this._txtToSpeak = _this._txtToSpeak.replace('---', '<hr/>');
                        }
                        catch (e) {
                            _this._txtToSpeak = '';
                        }
                    }
                    if (msgData.message[0].component && msgData.message[0].component.payload.speech_hint) {
                        _this._txtToSpeak = msgData.message[0].component.payload.speech_hint;
                    }
                    me.speakTextWithAWSPolly(_this._txtToSpeakToSpeak);
                }
            });
        }
    };
    return SpeakTextWithAWSPolly;
}(_BaseTTS__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SpeakTextWithAWSPolly);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("9e9318e426082f6bdb22")
/******/ })();
/******/ 
/******/ }
)
//# sourceMappingURL=hot-update.js.map