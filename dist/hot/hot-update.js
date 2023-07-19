self["webpackHotUpdatekore_web_sdk"]("esm",{

/***/ "./src/templatemanager/templates/v3/message/message.tsx":
/*!**************************************************************!*\
  !*** ./src/templatemanager/templates/v3/message/message.tsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Message": () => (/* binding */ Message),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _message_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./message.scss */ "./src/templatemanager/templates/v3/message/message.scss");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _baseChatTemplate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../baseChatTemplate */ "./src/templatemanager/templates/v3/baseChatTemplate.ts");
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../utils/helpers */ "./src/utils/helpers.js");
/* harmony import */ var _base_iconsManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../base/iconsManager */ "./src/templatemanager/base/iconsManager.js");
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






function Message(props) {
    var msgData = props.msgData;
    var hostInstance = props.hostInstance;
    var iconHelper = new _base_iconsManager__WEBPACK_IMPORTED_MODULE_3__["default"]();
    var _a = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useState)(hostInstance.config.branding), brandingInfo = _a[0], updateBrandingInfo = _a[1];
    hostInstance.on('onBrandingUpdate', function (event) {
        updateBrandingInfo(__assign({}, event.brandingData));
    });
    var helpers = _utils_helpers__WEBPACK_IMPORTED_MODULE_4__["default"].helpers;
    var cbStyle = {
        rounded: 'bot-bubble-content hover-show-copy',
        balloon: 'bot-bubble-content chat-bubble-style-1 hover-show-copy',
        rectange: 'bot-bubble-content chat-bubble-style-2 hover-show-copy'
    };
    var ubStyle = {
        rounded: 'agent-bubble-content hover-show-copy',
        balloon: 'agent-bubble-content chat-bubble-style-1 hover-show-copy',
        rectange: 'agent-bubble-content chat-bubble-style-2 hover-show-copy'
    };
    var botStyle = cbStyle[brandingInfo.body.bubble_style];
    var userStyle = ubStyle[brandingInfo.body.bubble_style];
    if (brandingInfo.body.time_stamp.show_type == 'hover') {
        botStyle = botStyle + ' time-stamp-show-hover';
        userStyle = userStyle + ' time-stamp-show-hover';
    }
    if (msgData.message) {
        return ((0,preact__WEBPACK_IMPORTED_MODULE_1__.h)(preact__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, msgData.message.map(function (msgItem) {
            if (msgItem.cInfo && msgItem.type === 'text') {
                return (msgData.type === 'bot_response' ? (msgItem.component && msgItem.component.type === 'error' ? ('') : ((0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("div", { className: "bot-bubble-comp if-animation-bubble", id: msgData.messageId },
                    (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("div", { className: botStyle },
                        brandingInfo.body.time_stamp.show && brandingInfo.body.time_stamp.position == 'top' && (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("div", { className: "top-info" },
                            (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("div", { className: "you-text" }, "Kore.ai Bot"),
                            (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("div", { className: "time-tamp" },
                                (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("time", null, helpers.formatAMPMDay(msgData.createdOn))),
                            (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("span", { className: "copied-text" }, "Copied")),
                        (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("div", { className: "bubble-msg-with-img" },
                            (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("div", { className: "bubble-msg" }, msgItem.cInfo.body),
                            (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("div", { className: "bot-img" },
                                (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("figure", null,
                                    (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("img", { src: iconHelper.getIcon('avatar_bot'), alt: 'avatr img' }))),
                            (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("div", { className: "copy-bubble" },
                                (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("i", { className: "sdkv3-copy" }))),
                        brandingInfo.body.time_stamp.show && brandingInfo.body.time_stamp.position == 'bottom' && (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("div", { className: "bottom-info" },
                            (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("div", { className: "you-text" }, "Kore.ai Bot"),
                            (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("div", { className: "time-tamp" },
                                (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("time", null, helpers.formatAMPMDay(msgData.createdOn)))))))) : ((0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("div", { className: "agent-bubble-comp if-animation-bubble", id: msgData.messageId },
                    (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("div", { className: userStyle },
                        brandingInfo.body.time_stamp.show && brandingInfo.body.time_stamp.position == 'top' && (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("div", { className: "top-info" },
                            (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("div", { className: "time-tamp" },
                                (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("time", null, helpers.formatAMPMDay(msgData.createdOn))),
                            (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("div", { className: "you-text" }, "You"),
                            (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("span", { className: "copied-text" }, "Copied")),
                        (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("div", { className: "bubble-msg-with-img" },
                            (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("div", { className: "bubble-msg" }, msgItem.cInfo.renderMsg && msgItem.cInfo.renderMsg !== '' ? msgItem.cInfo.renderMsg : msgItem.cInfo.body),
                            (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("div", { className: "agent-img" },
                                (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("figure", null,
                                    (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("img", { src: "/images/avatar-bot.svg", alt: 'avatr img' }))),
                            (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("div", { className: "copy-bubble" },
                                (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("i", { className: "sdkv3-copy" }))),
                        brandingInfo.body.time_stamp.show && brandingInfo.body.time_stamp.position == 'bottom' && (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("div", { className: "bottom-info" },
                            (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("div", { className: "time-tamp" },
                                (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("time", null, helpers.formatAMPMDay(msgData.createdOn))),
                            (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("div", { className: "you-text" }, "You"))))));
            }
        })));
    }
    else {
        return null;
    }
}
var MessageTemplate = /** @class */ (function (_super) {
    __extends(MessageTemplate, _super);
    function MessageTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hostInstance = _this;
        return _this;
    }
    MessageTemplate.prototype.renderMessage = function (msgData) {
        return this.getHTMLFromPreact(Message, msgData, this.hostInstance);
    };
    return MessageTemplate;
}(_baseChatTemplate__WEBPACK_IMPORTED_MODULE_5__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MessageTemplate);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("97bb65749d5f7d84ee83")
/******/ })();
/******/ 
/******/ }
)
//# sourceMappingURL=hot-update.js.map