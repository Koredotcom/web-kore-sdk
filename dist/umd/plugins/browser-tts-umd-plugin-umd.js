(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["BrowserTTSPluginSDK"] = factory();
	else
		root["BrowserTTSPluginSDK"] = factory();
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
  "BrowserTTS": () => (/* reexport */ BrowserTTSPlugin)
});

;// CONCATENATED MODULE: ./src/plugins/TTSPlugins/BaseTTS.ts
var BaseTTS = /** @class */ (function () {
    function BaseTTS() {
    }
    BaseTTS.prototype.appendPickerHTMLtoChatWindowFooter = function (pickerHTML) {
        var me = this;
        var chatWindowInstance = me.hostInstance;
        var _chatContainer = chatWindowInstance.chatEle;
        _chatContainer.find('.kore-chat-footer .footerContainer').append(pickerHTML);
    };
    BaseTTS.prototype.installTextToSpeechTemplate = function () {
        var me = this;
        var $ = me.hostInstance.$;
        me.pickerHTML = $(me.getTextToSpeechTemplateString());
        me.appendPickerHTMLtoChatWindowFooter(me.pickerHTML);
        me.bindEvents();
    };
    BaseTTS.prototype.getTextToSpeechTemplateString = function () {
        var textToSpeechTemplate = '<div class="sdkFooterIcon ttspeakerDiv ttsOff"> \
        <button class="ttspeaker" title="Talk to speak"> \
            <span class="ttsSpeakerEnable"></span> \
            <span class="ttsSpeakerDisable"></span> \
            <span style="display:none;"><audio id="ttspeaker" controls="" autoplay="" name="media"><source src="" type="audio/wav"></audio></span>\
        </button> \
    </div> ';
        return textToSpeechTemplate;
    };
    BaseTTS.prototype.bindEvents = function () {
        var me = this;
        var $ = me.hostInstance.$;
        $(me.pickerHTML).on('click', '.ttspeaker', function (event) {
            if (me.OnSpeakerButtonClick) {
                me.OnSpeakerButtonClick();
            }
        });
    };
    return BaseTTS;
}());
/* harmony default export */ const TTSPlugins_BaseTTS = (BaseTTS);

;// CONCATENATED MODULE: ./src/plugins/TTSPlugins/BrowserTTSPlugin/BrowserTTSPlugin.ts
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

var BrowserTTS = /** @class */ (function (_super) {
    __extends(BrowserTTS, _super);
    function BrowserTTS() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'BrowserTTS';
        _this.speakWithWebAPI = function (_txtToSpeak) {
            if (!_txtToSpeak) {
                return false;
            }
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                // Create a new instance of SpeechSynthesisUtterance.
                var msg = new SpeechSynthesisUtterance();
                msg.text = _txtToSpeak;
                window.speechSynthesis.speak(msg);
            }
            else {
                console.warn("KORE:Your browser doesn't support TTS(Speech Synthesiser)");
            }
        };
        return _this;
    }
    BrowserTTS.prototype.onHostCreate = function () {
        var me = this;
        var cwInstance = me.hostInstance;
        cwInstance.on("viewInit", function (chatWindowEle) {
            me.onInit();
        });
    };
    BrowserTTS.prototype.onInit = function () {
        var me = this;
        me.installTextToSpeechTemplate();
    };
    BrowserTTS.prototype.OnSpeakerButtonClick = function () {
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
                    _this._ttsConnection = me.speakWithWebAPI(_this._txtToSpeak);
                }
            });
        }
    };
    return BrowserTTS;
}(TTSPlugins_BaseTTS));
/* harmony default export */ const BrowserTTSPlugin = (BrowserTTS);

;// CONCATENATED MODULE: ./src/index_plugins/BrowserTTS_umd.ts



/******/ 	return __webpack_exports__;
/******/ })()
;
});