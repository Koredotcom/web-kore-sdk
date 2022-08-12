(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["WebKitSTTPluginSDK"] = factory();
	else
		root["WebKitSTTPluginSDK"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "WebKitSTT": () => (/* reexport */ WebKitSTTPlugin)
});

;// CONCATENATED MODULE: ./src/plugins/STTPlugins/BaseSTT.ts
var BaseSTT = /** @class */ (function () {
    function BaseSTT() {
    }
    BaseSTT.prototype.appendPickerHTMLtoChatWindowFooter = function (pickerHTML) {
        var me = this;
        var chatWindowInstance = me.hostInstance;
        var _chatContainer = chatWindowInstance.chatEle;
        _chatContainer.find('.kore-chat-footer .footerContainer').append(pickerHTML);
    };
    BaseSTT.prototype.installSpeechToTextTemplate = function () {
        var me = this;
        var $ = me.hostInstance.$;
        me.pickerHTML = $(me.getSpeechToTextTemplateString());
        me.appendPickerHTMLtoChatWindowFooter(me.pickerHTML);
        me.bindEvents();
    };
    BaseSTT.prototype.getSpeechToTextTemplateString = function () {
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
        return speechToTextTemplate;
    };
    BaseSTT.prototype.bindEvents = function () {
        var me = this;
        var $ = me.hostInstance.$;
        $(me.pickerHTML).on('click', '.notRecordingMicrophone', function (event) {
            if (me.onRecordButtonClick) {
                me.onRecordButtonClick();
            }
        });
        $(me.pickerHTML).on('click', '.recordingMicrophone', function (event) {
            me.stop();
            setTimeout(function () {
                me.setCaretEnd(document.getElementsByClassName("chatInputBox"));
            }, 350);
        });
    };
    return BaseSTT;
}());
/* harmony default export */ const STTPlugins_BaseSTT = (BaseSTT);

;// CONCATENATED MODULE: ./src/plugins/STTPlugins/WebKitSTTPlugin/WebKitSTTPlugin.ts
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
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var WebKitSTT = /** @class */ (function (_super) {
    __extends(WebKitSTT, _super);
    function WebKitSTT(mainconfig) {
        var _this_1 = 
        // config = config || {};
        // this.config = {
        //     ...this.config,
        // }
        _super.call(this) || this;
        _this_1.name = 'WebKitSTT';
        _this_1.config = {
            lang: 'en-US'
        };
        _this_1.two_line = /\n\n/g;
        _this_1.one_line = /\n/g;
        _this_1.config = __assign(__assign({}, _this_1.config), mainconfig);
        return _this_1;
    }
    WebKitSTT.prototype.onHostCreate = function () {
        var me = this;
        var cwInstance = me.hostInstance;
        cwInstance.on("viewInit", function (chatWindowEle) {
            me.onInit();
        });
    };
    WebKitSTT.prototype.onInit = function () {
        var me = this;
        me.installSpeechToTextTemplate();
    };
    WebKitSTT.prototype.onRecordButtonClick = function () {
        var me = this;
        me.initializeWebKitSpeechRecognition();
        me.startWebKitRecognization();
    };
    WebKitSTT.prototype.initializeWebKitSpeechRecognition = function () {
        var me = this;
        var $ = me.hostInstance.$;
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
            this.recognition.onerror = function (event) {
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
            this.recognition.onresult = function (event) {
                this.final_transcript = '';
                var interim_transcript = '';
                for (var i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        this.final_transcript += event.results[i][0].transcript;
                    }
                    else {
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
    };
    WebKitSTT.prototype.startWebKitRecognization = function () {
        if (this.recognizing) {
            this.recognition.stop();
            return;
        }
        this.final_transcript = '';
        this.recognition.lang = this.config.lang || 'en-US';
        this.recognition.start();
    };
    WebKitSTT.prototype.isChrome = function () {
        var isChromium = window.chrome, winNav = window.navigator, vendorName = winNav.vendor, isOpera = winNav.userAgent.indexOf("OPR") > -1, isIEedge = winNav.userAgent.indexOf("Edge") > -1, isIOSChrome = winNav.userAgent.match("CriOS");
        if (isIOSChrome) {
            return true;
        }
        else if (isChromium !== null &&
            typeof isChromium !== "undefined" &&
            vendorName === "Google Inc." &&
            isOpera === false &&
            isIEedge === false) {
            return true;
        }
        else {
            return false;
        }
    };
    WebKitSTT.prototype.linebreak = function (s) {
        return s.replace(this.two_line, '<p></p>').replace(this.one_line, '<br>');
    };
    WebKitSTT.prototype.capitalize = function (s) {
        return s.replace(s.substr(0, 1), function (m) { return m.toUpperCase(); });
    };
    WebKitSTT.prototype.setCaretEnd = function (_this) {
        var sel;
        if (_this && _this.item(0) && _this.item(0).innerText.length) {
            var range = document.createRange();
            range.selectNodeContents(_this[0]);
            range.collapse(false);
            var sel1 = window.getSelection();
            sel1.removeAllRanges();
            sel1.addRange(range);
            this.prevRange = range;
        }
        else {
            this.prevRange = false;
            if (_this && _this[0]) {
                _this[0].focus();
            }
        }
    };
    WebKitSTT.prototype.stop = function () {
        var me = this;
        var $ = me.hostInstance.$;
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
    ;
    return WebKitSTT;
}(STTPlugins_BaseSTT));
/* harmony default export */ const WebKitSTTPlugin = (WebKitSTT);

;// CONCATENATED MODULE: ./src/index_plugins/WebKitSTT_umd.ts



/******/ 	return __webpack_exports__;
/******/ })()
;
});