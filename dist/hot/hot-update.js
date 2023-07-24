self["webpackHotUpdatekore_web_sdk"]("esm",{

/***/ "./src/plugins/textToSpeech/BaseTTS.ts":
/*!*********************************************!*\
  !*** ./src/plugins/textToSpeech/BaseTTS.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BaseTTS);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("3b64199de54790bcf14b")
/******/ })();
/******/ 
/******/ }
)
//# sourceMappingURL=hot-update.js.map