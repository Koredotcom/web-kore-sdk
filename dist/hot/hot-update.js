self["webpackHotUpdatekore_web_sdk"]("esm",{

/***/ "./src/preact/templates/base/chatContainer/chatContainer.tsx":
/*!*******************************************************************!*\
  !*** ./src/preact/templates/base/chatContainer/chatContainer.tsx ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _chatContainer_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chatContainer.scss */ "./src/preact/templates/base/chatContainer/chatContainer.scss");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_render_to_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! preact-render-to-string */ "./node_modules/preact-render-to-string/dist/index.module.js");
/* harmony import */ var _welcomeScreeContainer_welcomeScreeContainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../welcomeScreeContainer/welcomeScreeContainer */ "./src/preact/templates/base/welcomeScreeContainer/welcomeScreeContainer.tsx");
/* harmony import */ var _avatarComponent_avatarComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../avatarComponent/avatarComponent */ "./src/preact/templates/base/avatarComponent/avatarComponent.tsx");
/* harmony import */ var _chatWidget_chatWidget__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../chatWidget/chatWidget */ "./src/preact/templates/base/chatWidget/chatWidget.tsx");
/* harmony import */ var _chatWidgetHeader_chatWidgetHeader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../chatWidgetHeader/chatWidgetHeader */ "./src/preact/templates/base/chatWidgetHeader/chatWidgetHeader.tsx");
/* harmony import */ var _chatWidgetBody_chatWidgetBody__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../chatWidgetBody/chatWidgetBody */ "./src/preact/templates/base/chatWidgetBody/chatWidgetBody.tsx");
/* harmony import */ var _chatWidgetComposeBar_chatWidgetComposeBar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../chatWidgetComposeBar/chatWidgetComposeBar */ "./src/preact/templates/base/chatWidgetComposeBar/chatWidgetComposeBar.tsx");









var ChatContainer = /** @class */ (function () {
    function ChatContainer(hostInstance) {
        this.hostInstance = hostInstance;
        this.welcomeCompponent = new _welcomeScreeContainer_welcomeScreeContainer__WEBPACK_IMPORTED_MODULE_3__["default"](this.hostInstance).FunctionalComponent;
        this.avatarComponentRef = new _avatarComponent_avatarComponent__WEBPACK_IMPORTED_MODULE_4__["default"](this.hostInstance).FunctionalComponent;
        this.chatWidgetRef = new _chatWidget_chatWidget__WEBPACK_IMPORTED_MODULE_5__["default"](this.hostInstance).FunctionalComponent;
        this.chatWidgetHeaderRef = new _chatWidgetHeader_chatWidgetHeader__WEBPACK_IMPORTED_MODULE_6__["default"](this.hostInstance).FunctionalComponent;
        this.chatWidgetBodyRef = new _chatWidgetBody_chatWidgetBody__WEBPACK_IMPORTED_MODULE_7__["default"](this.hostInstance).FunctionalComponent;
        this.chatWidgetComposeBarRef = new _chatWidgetComposeBar_chatWidgetComposeBar__WEBPACK_IMPORTED_MODULE_8__["default"](this.hostInstance).FunctionalComponent;
    }
    ChatContainer.prototype.FunctionalComponent = function (props) {
        var handleClick = function () {
            console.log('Button clicked!');
        };
        return ((0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("div", { className: 'chat-window-main-section', "aria-label": 'chat-window-section' },
            (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("div", { className: 'chat-widgetwrapper-main-container' },
                (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)(this.chatWidgetHeaderRef, null),
                (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)(this.chatWidgetBodyRef, null),
                (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)(this.chatWidgetComposeBarRef, null))));
    };
    ChatContainer.prototype.getHTML = function () {
        var me = this;
        me.element = document.createElement("div");
        me.element.className = "chat-container";
        me.element = (0,preact_render_to_string__WEBPACK_IMPORTED_MODULE_2__["default"])(this.FunctionalComponent({ hostInsance: this.hostInstance }), me.element);
        return me.element;
    };
    return ChatContainer;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChatContainer);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("4285bd22f72746c0791b")
/******/ })();
/******/ 
/******/ }
)
//# sourceMappingURL=hot-update.js.map