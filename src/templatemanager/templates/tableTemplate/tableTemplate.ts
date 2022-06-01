
import helpers from '../../../utils/helpers';
import './tableTemplate.scss';
class TableChartTemplate {

    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;

        if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "table") {
            me.messageHtml = $(me.getTemplateString()).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers
            });
            me.bindEvents();
            return me.messageHtml;
        }
    }
    bindEvents() {
        let me: any = this;
        let $ = me.hostInstance.$;
        setTimeout(() => {
            const acc = document.getElementsByClassName('accordionRow');
            for (var i = 0; i < acc.length; i++) {
                let accordian: any = acc[i];
                accordian.onclick = function (e: any) {
                    let selectedAcc = e.currentTarget;
                    selectedAcc.classList.toggle('open');
                };
            }
            const showFullTableModal = document.getElementsByClassName('showMore');
            for (var j = 0; j < showFullTableModal.length; j++) {
                let element: any = showFullTableModal[j];
                element.onclick = function (e: any) {
                    let selectedTarget = e.currentTarget;
                    const parentli = selectedTarget.parentElement;
                   // const tableChartDiv =  $(parentli).closest('.tableChart'); can be uncommented if using tableChartDiv
                    $('#dialog').empty();
                    $('#dialog').html($(parentli).find('.tablechartDiv').html());
                    $('.hello').clone().appendTo('.goodbye');
                    const modal: any = document.getElementById('myPreviewModal');
                    $('.largePreviewContent').empty();
                    // $(".largePreviewContent").html($(parentli).find('.tablechartDiv').html());
                    console.log($(parentli).find('.tablechartDiv'));

                   $('.tablechartDiv').clone().appendTo('.largePreviewContent');
                    modal.style.display = 'block';
                    // Get the <span> element that closes the modal
                    const span: any = document.getElementsByClassName('closeElePreview')[0];
                    // When the user clicks on <span> (x), close the modal
                    span.onclick = function () {
                        modal.style.display = 'none';
                        $('.largePreviewContent').removeClass('addheight');
                    };
                };
            }
        }, 350);
    }
    getTemplateString() {
        var tableChartTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
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
    }

}

export default TableChartTemplate;