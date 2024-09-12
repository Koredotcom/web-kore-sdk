
import helpers from '../../../utils/helpers';
import PureJSCarousel from '../../../libs/purejscarousel/purejscarousel';
import './miniTableTemplate.scss';
class MiniTableChartTemplate {

    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;
        if (msgData?.message?.[0]?.component?.payload?.template_type === "mini_table") {
            if (msgData.message[0].component.payload.layout == 'horizontal') {
                me.messageHtml = $(me.getTemplateString('miniTableHorizontalTemplate')).tmpl({
                    'msgData': msgData,
                    'helpers': helpersObj.helpers
                });
                me.bindEvents();
                return me.messageHtml;
            } else {
                me.messageHtml = $(me.getTemplateString('miniTableChartTemplate')).tmpl({
                    'msgData': msgData,
                    'helpers': helpersObj.helpers
                });
                return me.messageHtml;
            }
        }
    }
    bindEvents() {
        let me: any = this;
        const carouselEles = [];
        let $ = me.hostInstance.$;
        let chatWindowInstance = me.hostInstance;

        setTimeout(() => {
            $('.carousel:last').addClass(`carousel${chatWindowInstance.carouselTemplateCount}`);
            const count = $(`.carousel${chatWindowInstance.carouselTemplateCount}`).children().length;
            if (count > 1) {
                const carouselOneByOne = new PureJSCarousel({
                    carousel: `.carousel${chatWindowInstance.carouselTemplateCount}`,
                    slide: '.slide',
                    oneByOne: true,
                });
                $(`.carousel${chatWindowInstance.carouselTemplateCount}`).parent().show();
                $(`.carousel${chatWindowInstance.carouselTemplateCount}`).attr('style', 'height: 100% !important');
                carouselEles.push(carouselOneByOne);
            }
            window.dispatchEvent(new Event('resize'));
            const evt = document.createEvent('HTMLEvents');
            evt.initEvent('resize', true, false);
            window.dispatchEvent(evt);
            chatWindowInstance.carouselTemplateCount += 1;
            chatWindowInstance.scrollTop();
            // _chatContainer.animate({
            //     scrollTop: _chatContainer.prop('scrollHeight'),
            // }, 0);
        });
    }
    getTemplateString(template_type: string) {

        var miniTableHorizontalTemplate = '<script id="chat_mini_table_hori_tmpl" type="text/x-jqury-tmpl"> \
        {{if msgData.message}} \
        <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId}"\
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

        var miniTableChartTemplate = '<script id="chat_mini_table_chart_tmpl" type="text/x-jqury-tmpl"> \
    {{if msgData.message}} \
        <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId}"\
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