self["webpackHotUpdatekore_web_sdk"]("esm",{

/***/ "./src/templatemanager/templates/tableTemplate/tableTemplate.ts":
/*!**********************************************************************!*\
  !*** ./src/templatemanager/templates/tableTemplate/tableTemplate.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/helpers */ "./src/utils/helpers.js");
/* harmony import */ var _tableTemplate_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tableTemplate.scss */ "./src/templatemanager/templates/tableTemplate/tableTemplate.scss");


var TableChartTemplate = /** @class */ (function () {
    function TableChartTemplate() {
    }
    TableChartTemplate.prototype.renderMessage = function (msgData) {
        var _a, _b, _c, _d;
        var me = this;
        var $ = me.hostInstance.$;
        var helpersObj = _utils_helpers__WEBPACK_IMPORTED_MODULE_1__["default"];
        if (((_d = (_c = (_b = (_a = msgData === null || msgData === void 0 ? void 0 : msgData.message) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.component) === null || _c === void 0 ? void 0 : _c.payload) === null || _d === void 0 ? void 0 : _d.template_type) === "table") {
            me.messageHtml = $(me.getTemplateString()).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers
            });
            me.bindEvents();
            return me.messageHtml;
        }
    };
    TableChartTemplate.prototype.bindEvents = function () {
        var me = this;
        var $ = me.hostInstance.$;
        setTimeout(function () {
            var acc = document.getElementsByClassName('accordionRow');
            for (var i = 0; i < acc.length; i++) {
                var accordian = acc[i];
                accordian.onclick = function (e) {
                    var selectedAcc = e.currentTarget;
                    selectedAcc.classList.toggle('open');
                };
            }
            var showFullTableModal = document.getElementsByClassName('showMore');
            for (var j = 0; j < showFullTableModal.length; j++) {
                var element = showFullTableModal[j];
                element.onclick = function (e) {
                    var selectedTarget = e.currentTarget;
                    var parentli = selectedTarget.parentElement;
                    // const tableChartDiv =  $(parentli).closest('.tableChart'); can be uncommented if using tableChartDiv
                    $('#dialog').empty();
                    $('#dialog').html($(parentli).find('.tablechartDiv').html());
                    $('.hello').clone().appendTo('.goodbye');
                    var modal = document.getElementById('myPreviewModal');
                    $('.largePreviewContent').empty();
                    // $(".largePreviewContent").html($(parentli).find('.tablechartDiv').html());
                    console.log($(parentli).find('.tablechartDiv'));
                    $(parentli).clone().appendTo('.largePreviewContent');
                    modal.style.display = 'block';
                    // Get the <span> element that closes the modal
                    var span = document.getElementsByClassName('closeElePreview')[0];
                    // When the user clicks on <span> (x), close the modal
                    span.onclick = function () {
                        modal.style.display = 'none';
                        $('.largePreviewContent').removeClass('addheight');
                    };
                };
            }
        }, 350);
    };
    TableChartTemplate.prototype.getTemplateString = function () {
        var tableChartTemplate = '<script id="chat_table_tmpl" type="text/x-jqury-tmpl"> \
        {{if msgData.message}} \
            <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}"\
                class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon tablechart"> \
                {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                {{if msgData.icon}}<div aria-live="off" class="profile-photo extraBottom"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                {{if msgData.message[0].component.payload.text}}<div class="messageBubble tableChart">\
                    <span>{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}}</span>\
                </div>{{/if}}\
                <div class="tablechartDiv {{if msgData.message[0].component.payload.table_design && msgData.message[0].component.payload.table_design == "regular"}}regular{{else}}hide{{/if}}">\
                    <div style="overflow-x:auto; padding: 0 8px;">\
                        <table cellspacing="0" cellpadding="0">\
                            <tr class="headerTitle">\
                                {{each(key, tableHeader) msgData.message[0].component.payload.columns}} \
                                    <th {{if tableHeader[1]}}style="text-align:${tableHeader[1]};"{{/if}}>${tableHeader[0]}</th>\
                                {{/each}} \
                            </tr>\
                            {{each(key, tableRow) msgData.message[0].component.payload.elements}} \
                                {{if tableRow.Values.length>1}}\
                                    <tr {{if key > 4}}class="hide"{{/if}}>\
                                        {{each(cellkey, cellValue) tableRow.Values}} \
                                            <td  {{if cellkey === tableRow.Values.length-1}}colspan="2"{{/if}} class=" {{if key == 0}} addTopBorder {{/if}}" {{if msgData.message[0].component.payload.columns[cellkey][1]}}style="text-align:${msgData.message[0].component.payload.columns[cellkey][1]};" {{/if}} title="${cellValue}">${cellValue}</td>\
                                        {{/each}} \
                                    </tr>\
                                {{/if}}\
                            {{/each}} \
                        </table>\
                    </div>\
                    {{if msgData.message[0].component.payload.elements.length > 5 && msgData.message[0].component.payload.table_design && msgData.message[0].component.payload.table_design == "regular"}}<div class="showMore">Show more</div>{{/if}}\
                </div>\
                 <div class="accordionTable {{if msgData.message[0].component.payload.table_design && msgData.message[0].component.payload.table_design == "regular"}}hide{{else}}responsive{{/if}}">\
                    {{each(key, tableRow) msgData.message[0].component.payload.elements}} \
                        {{if key < 4}}\
                            <div class="accordionRow">\
                                {{each(cellkey, cellValue) tableRow.Values}} \
                                    {{if cellkey < 2}}\
                                        <div class="accordionCol">\
                                            <div class="colTitle hideSdkEle">${msgData.message[0].component.payload.columns[cellkey][0]}</div>\
                                            <div class="colVal">${cellValue}</div>\
                                        </div>\
                                    {{else}}\
                                        <div class="accordionCol hideSdkEle">\
                                            <div class="colTitle">${msgData.message[0].component.payload.columns[cellkey][0]}</div>\
                                            <div class="colVal">${cellValue}</div>\
                                        </div>\
                                    {{/if}}\
                                {{/each}} \
                                <span class="fa fa-caret-right tableBtn"></span>\
                            </div>\
                        {{/if}}\
                    {{/each}} \
                    <div class="showMore">Show more</div>\
                </div>\
            </li> \
        {{/if}} \
    </scipt>';
        return tableChartTemplate;
    };
    return TableChartTemplate;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TableChartTemplate);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("592f52760e43234ae010")
/******/ })();
/******/ 
/******/ }
)
//# sourceMappingURL=hot-update.js.map