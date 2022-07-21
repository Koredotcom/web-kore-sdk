self["webpackHotUpdatekore_web_sdk"]("esm",{

/***/ "./src/templatemanager/templateManager.ts":
/*!************************************************!*\
  !*** ./src/templatemanager/templateManager.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _templates_button_buttonTemplate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./templates/button/buttonTemplate */ "./src/templatemanager/templates/button/buttonTemplate.ts");
/* harmony import */ var _templates_listTemplate_listTemplate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./templates/listTemplate/listTemplate */ "./src/templatemanager/templates/listTemplate/listTemplate.ts");
/* harmony import */ var _templates_quickReplyTemplate_quickReplyTemplate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./templates/quickReplyTemplate/quickReplyTemplate */ "./src/templatemanager/templates/quickReplyTemplate/quickReplyTemplate.ts");
/* harmony import */ var _templates_templateAttachment_templateAttachment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./templates/templateAttachment/templateAttachment */ "./src/templatemanager/templates/templateAttachment/templateAttachment.ts");
/* harmony import */ var _templates_tableTemplate_tableTemplate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./templates/tableTemplate/tableTemplate */ "./src/templatemanager/templates/tableTemplate/tableTemplate.ts");
/* harmony import */ var _templates_checkBoxesTemplate_checkBoxesTemplate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./templates/checkBoxesTemplate/checkBoxesTemplate */ "./src/templatemanager/templates/checkBoxesTemplate/checkBoxesTemplate.ts");
/* harmony import */ var _templates_dropdownTemplate_dropdownTemplate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./templates/dropdownTemplate/dropdownTemplate */ "./src/templatemanager/templates/dropdownTemplate/dropdownTemplate.ts");
/* harmony import */ var _templates_likeDislikeTemplate_likeDislikeTemplate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./templates/likeDislikeTemplate/likeDislikeTemplate */ "./src/templatemanager/templates/likeDislikeTemplate/likeDislikeTemplate.ts");
/* harmony import */ var _templates_formTemplate_formTemplate__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./templates/formTemplate/formTemplate */ "./src/templatemanager/templates/formTemplate/formTemplate.ts");
/* harmony import */ var _templates_advancedMultiSelect_advancedMultiSelect__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./templates/advancedMultiSelect/advancedMultiSelect */ "./src/templatemanager/templates/advancedMultiSelect/advancedMultiSelect.ts");
/* harmony import */ var _templates_tableListTemplate_tableListTemplate__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./templates/tableListTemplate/tableListTemplate */ "./src/templatemanager/templates/tableListTemplate/tableListTemplate.ts");
/* harmony import */ var _templates_ratingTemplate_ratingTemplate__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./templates/ratingTemplate/ratingTemplate */ "./src/templatemanager/templates/ratingTemplate/ratingTemplate.ts");
/* harmony import */ var _templates_listWidgetTemplate_listWidgetTemplate__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./templates/listWidgetTemplate/listWidgetTemplate */ "./src/templatemanager/templates/listWidgetTemplate/listWidgetTemplate.ts");
/* harmony import */ var _templates_miniTableTemplate_miniTableTemplate__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./templates/miniTableTemplate/miniTableTemplate */ "./src/templatemanager/templates/miniTableTemplate/miniTableTemplate.ts");
/* harmony import */ var _templates_carouselTemplate_carouselTemplate__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./templates/carouselTemplate/carouselTemplate */ "./src/templatemanager/templates/carouselTemplate/carouselTemplate.ts");
/* harmony import */ var _templates_listViewTemplate_listViewTemplate__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./templates/listViewTemplate/listViewTemplate */ "./src/templatemanager/templates/listViewTemplate/listViewTemplate.ts");
/* harmony import */ var _templates_iframeTemplate_iframeTemplate__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./templates/iframeTemplate/iframeTemplate */ "./src/templatemanager/templates/iframeTemplate/iframeTemplate.ts");
/* harmony import */ var _templates_systemTemplate_systemTemplate__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./templates/systemTemplate/systemTemplate */ "./src/templatemanager/templates/systemTemplate/systemTemplate.ts");
/* harmony import */ var _templates_advancedListTemplate_advancedListTemplate__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./templates/advancedListTemplate/advancedListTemplate */ "./src/templatemanager/templates/advancedListTemplate/advancedListTemplate.ts");
/* harmony import */ var _templates_cardTemplate_cardTemplate__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./templates/cardTemplate/cardTemplate */ "./src/templatemanager/templates/cardTemplate/cardTemplate.ts");




















// import './customTemplate.css';
// import '../../../libs/purejscarousel.css';
//(function($){
var TemplateManager = /** @class */ (function () {
    function TemplateManager(hostInstance) {
        this.hostInstance = hostInstance; //chatwindowInstance|SearchSDK Instance|WidgetSDK Instanse
        // this.helpers = null;
        // this.extension = null;
        this.templates = [];
        this.installDefaultTemplates();
    }
    TemplateManager.prototype.installTemplate = function (template) {
        this.templates.push(template);
        template.hostInstance = this.hostInstance;
    };
    ;
    TemplateManager.prototype.installDefaultTemplates = function () {
        this.installTemplate(new _templates_button_buttonTemplate__WEBPACK_IMPORTED_MODULE_0__["default"]());
        this.installTemplate(new _templates_listTemplate_listTemplate__WEBPACK_IMPORTED_MODULE_1__["default"]());
        this.installTemplate(new _templates_quickReplyTemplate_quickReplyTemplate__WEBPACK_IMPORTED_MODULE_2__["default"]());
        this.installTemplate(new _templates_templateAttachment_templateAttachment__WEBPACK_IMPORTED_MODULE_3__["default"]());
        this.installTemplate(new _templates_tableTemplate_tableTemplate__WEBPACK_IMPORTED_MODULE_4__["default"]());
        this.installTemplate(new _templates_checkBoxesTemplate_checkBoxesTemplate__WEBPACK_IMPORTED_MODULE_5__["default"]());
        this.installTemplate(new _templates_dropdownTemplate_dropdownTemplate__WEBPACK_IMPORTED_MODULE_6__["default"]());
        this.installTemplate(new _templates_likeDislikeTemplate_likeDislikeTemplate__WEBPACK_IMPORTED_MODULE_7__["default"]());
        this.installTemplate(new _templates_formTemplate_formTemplate__WEBPACK_IMPORTED_MODULE_8__["default"]());
        this.installTemplate(new _templates_advancedMultiSelect_advancedMultiSelect__WEBPACK_IMPORTED_MODULE_9__["default"]());
        this.installTemplate(new _templates_tableListTemplate_tableListTemplate__WEBPACK_IMPORTED_MODULE_10__["default"]());
        this.installTemplate(new _templates_ratingTemplate_ratingTemplate__WEBPACK_IMPORTED_MODULE_11__["default"]());
        this.installTemplate(new _templates_listWidgetTemplate_listWidgetTemplate__WEBPACK_IMPORTED_MODULE_12__["default"]());
        this.installTemplate(new _templates_carouselTemplate_carouselTemplate__WEBPACK_IMPORTED_MODULE_13__["default"]());
        this.installTemplate(new _templates_miniTableTemplate_miniTableTemplate__WEBPACK_IMPORTED_MODULE_14__["default"]());
        this.installTemplate(new _templates_listViewTemplate_listViewTemplate__WEBPACK_IMPORTED_MODULE_15__["default"]());
        this.installTemplate(new _templates_systemTemplate_systemTemplate__WEBPACK_IMPORTED_MODULE_16__["default"]());
        this.installTemplate(new _templates_advancedListTemplate_advancedListTemplate__WEBPACK_IMPORTED_MODULE_17__["default"]());
        this.installTemplate(new _templates_cardTemplate_cardTemplate__WEBPACK_IMPORTED_MODULE_18__["default"]());
        this.installTemplate(new _templates_iframeTemplate_iframeTemplate__WEBPACK_IMPORTED_MODULE_19__["default"]());
    };
    TemplateManager.prototype.renderMessage = function (msgData) {
        var messageHtml = '';
        var me = this;
        var templatesIndex = 0;
        if (me.templates.length) {
            while (!messageHtml && templatesIndex < me.templates.length) {
                var template = me.templates[templatesIndex];
                if (template.renderMessage) {
                    messageHtml = template.renderMessage.call(template, msgData);
                }
                templatesIndex++;
            }
            if (messageHtml) {
                return messageHtml;
            }
        }
        return messageHtml;
    };
    return TemplateManager;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TemplateManager);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("3d3c5391a28739edeadd")
/******/ })();
/******/ 
/******/ }
)
//# sourceMappingURL=hot-update.js.map