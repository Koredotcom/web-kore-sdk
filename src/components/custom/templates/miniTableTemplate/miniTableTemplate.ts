
import helpers from '../../../../../src/utils/helpers';
// import PureJSCarousel from '../../../../../libs/purejscarousel';

class MiniTableChartTemplate {

    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.cwInstance.$;
        let helpersObj = new helpers();
        let carouselTemplateCount = 0;
        const carouselEles = [];
        const _chatContainer = $(me.cwInstance.config.chatContainer).find('.chat-container');
        if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "mini_table") {
            if (msgData.message[0].component.payload.layout == 'horizontal') {
                me.messageHtml = $(me.getTemplateString('miniTableHorizontalTemplate')).tmpl({
                    'msgData': msgData,
                    'helpers': helpersObj.helpers
                });
                setTimeout(() => {
                    $('.carousel:last').addClass(`carousel${carouselTemplateCount}`);
                    const count = $(`.carousel${carouselTemplateCount}`).children().length;
                    if (count > 1) {
                        // const carouselOneByOne = new PureJSCarousel({
                        //     carousel: `.carousel${carouselTemplateCount}`,
                        //     slide: '.slide',
                        //     oneByOne: true,
                        // });
                        // $(`.carousel${carouselTemplateCount}`).parent().show();
                        // $(`.carousel${carouselTemplateCount}`).attr('style', 'height: 100% !important');
                        // carouselEles.push(carouselOneByOne);
                    }
                    // window.dispatchEvent(new Event('resize'));
                    const evt = document.createEvent('HTMLEvents');
                    evt.initEvent('resize', true, false);
                    window.dispatchEvent(evt);
                    carouselTemplateCount += 1;
                    _chatContainer.animate({
                        scrollTop: _chatContainer.prop('scrollHeight'),
                    }, 0);
                });
                me.bindEvents();
                return me.messageHtml;
            } else {
                me.messageHtml = $(me.getTemplateString('miniTableChartTemplate')).tmpl({
                    'msgData': msgData,
                    'helpers': helpersObj.helpers
                });
                me.bindEvents();
                return me.messageHtml;
            }
        }
    }
    bindEvents() {
    }
    getTemplateString(template_type: string) {

        var miniTableHorizontalTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
        {{if msgData.message}} \
        <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}"\
            class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon tablechart"> \
            {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
            {{if msgData.icon}}<div aria-live="off" class="profile-photo extraBottom"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
            {{if msgData.message[0].component.payload.text}}<div class="messageBubble tableChart">\
                <span>{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}}</span>\
            </div>{{/if}}\
            <div class="carousel" id="carousel-one-by-one" style="height: 0px;">\
                {{each(key, table) msgData.message[0].component.payload.elements}}\
                    <div class="slide">\
                        <div class="minitableDiv">\
                            <div style="overflow-x:auto; padding: 0 8px;">\
                                <table cellspacing="0" cellpadding="0">\
                                    <tr class="headerTitle">\
                                        {{each(key, tableHeader) table.primary}} \
                                            <th {{if tableHeader[1]}}style="text-align:${tableHeader[1]};" {{/if}}>${tableHeader[0]}</th>\
                                        {{/each}} \
                                    </tr>\
                                    {{each(key, additional) table.additional}} \
                                        <tr>\
                                            {{each(cellkey, cellValue) additional}} \
                                                <td  {{if cellkey === additional.length-1}}colspan="2"{{/if}}  {{if table.primary[cellkey][1]}}style="text-align:${table.primary[cellkey][1]};" {{/if}} title="${cellValue}">${cellValue}</td>\
                                            {{/each}} \
                                        </tr>\
                                    {{/each}} \
                                </table>\
                            </div>\
                        </div>\
                    </div>\
                {{/each}}\
            </div>\
        </li> \
        {{/if}} \
    </scipt>';

        var miniTableChartTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
    {{if msgData.message}} \
        <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}"\
            class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon tablechart"> \
            {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
            {{if msgData.icon}}<div aria-live="off" class="profile-photo extraBottom"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
            {{if msgData.message[0].component.payload.text}}<div class="messageBubble tableChart">\
                <span>{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}}</span>\
            </div>{{/if}}\
            {{each(key, table) msgData.message[0].component.payload.elements}}\
                <div class="minitableDiv">\
                    <div style="overflow-x:auto; padding: 0 8px;">\
                        <table cellspacing="0" cellpadding="0">\
                            <tr class="headerTitle">\
                                {{each(key, tableHeader) table.primary}} \
                                    <th {{if tableHeader[1]}}style="text-align:${tableHeader[1]};" {{/if}}>${tableHeader[0]}</th>\
                                {{/each}} \
                            </tr>\
                            {{each(key, additional) table.additional}} \
                                <tr>\
                                    {{each(cellkey, cellValue) additional}} \
                                        <td  {{if cellkey === additional.length-1}}colspan="2"{{/if}}  {{if table.primary[cellkey][1]}}style="text-align:${table.primary[cellkey][1]};" {{/if}} title="${cellValue}">${cellValue}</td>\
                                    {{/each}} \
                                </tr>\
                            {{/each}} \
                        </table>\
                    </div>\
                </div>\
            {{/each}}\
        </li> \
    {{/if}} \
</scipt>';

        if (template_type === "miniTableHorizontalTemplate") {
            return miniTableHorizontalTemplate;
        } else if (template_type === "miniTableChartTemplate") {
            return miniTableChartTemplate;
        }
    }

}

export default MiniTableChartTemplate;