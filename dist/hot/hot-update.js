self["webpackHotUpdatekore_web_sdk"]("esm",{

/***/ "./src/preact/templates/base/welcomeScreeContainer/welcomeScreeContainer.tsx":
/*!***********************************************************************************!*\
  !*** ./src/preact/templates/base/welcomeScreeContainer/welcomeScreeContainer.tsx ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _welcomeScreeContainer_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./welcomeScreeContainer.scss */ "./src/preact/templates/base/welcomeScreeContainer/welcomeScreeContainer.scss");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_render_to_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! preact-render-to-string */ "./node_modules/preact-render-to-string/dist/index.module.js");



var welcomeScreeContainer = /** @class */ (function () {
    function welcomeScreeContainer(hostInstance) {
        this.hostInstance = hostInstance;
    }
    welcomeScreeContainer.prototype.FunctionalComponent = function (props) {
        var handleClick = function () {
            console.log('Button clicked!');
        };
        return ((0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("div", { className: 'test' },
            (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("h1", null, "Welcome Screen"),
            (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("button", { onClick: handleClick }, "click"),
            (0,preact__WEBPACK_IMPORTED_MODULE_1__.h)("p", null, "some thing")));
    };
    welcomeScreeContainer.prototype.getHTML = function () {
        var me = this;
        me.element = document.createElement("div");
        me.element.className = "chat-container";
        me.element = (0,preact_render_to_string__WEBPACK_IMPORTED_MODULE_2__["default"])(this.FunctionalComponent({ hostInsance: this.hostInstance }), me.element);
        return me.element;
    };
    return welcomeScreeContainer;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (welcomeScreeContainer);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("7426037f349010ba152d")
/******/ })();
/******/ 
/******/ }
)
//# sourceMappingURL=hot-update.js.map