
import helpers from '../../../../../src/utils/helpers'

class CarouselTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.cwInstance.$;
        let helpersObj = new helpers();
        let carouselTemplateCount = 0;
        let carouselEles = [];

        if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "carousel") {
            me.messageHtml = $(me.getTemplateString('carouselTemplate')).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers
            });
            setTimeout(() => {
                $('.carousel:last').addClass(`carousel${carouselTemplateCount}`);
                const count = $(`.carousel${carouselTemplateCount}`).children().length;
                if (count > 1) {
                //   const carouselOneByOne = new PureJSCarousel({
                //     carousel: `.carousel${carouselTemplateCount}`,
                //     slide: '.slide',
                //     oneByOne: true,
                //   });
                  $(`.carousel${carouselTemplateCount}`).parent().show();
                  $(`.carousel${carouselTemplateCount}`).attr('style', 'height: 100% !important');
                //   carouselEles.push(carouselOneByOne);
                }
                // window.dispatchEvent(new Event('resize'));
                const evt = document.createEvent('HTMLEvents');
                evt.initEvent('resize', true, false);
                window.dispatchEvent(evt);
                carouselTemplateCount += 1;
                // _chatContainer.animate({
                //   scrollTop: _chatContainer.prop('scrollHeight'),
                // }, 0);
              });
            me.bindEvents();
            return me.messageHtml;
        }
    }
    bindEvents() {
    
    }
    getTemplateString() {
        var carouselTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
        {{if msgData.message}} \
            <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}"\
                class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
                {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                {{if msgData.icon}}<div aria-live="off" class="profile-photo extraBottom"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                {{if msgData.message[0].component.payload.text}}<div class="messageBubble tableChart">\
                    <span>{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}}</span>\
                </div>{{/if}}\
                <div class="carousel" id="carousel-one-by-one" style="height: 0px;">\
                    {{each(key, msgItem) msgData.message[0].component.payload.elements}} \
                        <div class="slide">\
                            {{if msgItem.image_url}} \
                                <div class="carouselImageContent" {{if msgItem.default_action && msgItem.default_action.url}}url="${msgItem.default_action.url}"{{/if}} {{if msgItem.default_action && msgItem.default_action.title}}data-value="${msgItem.default_action.title}"{{/if}} {{if msgItem.default_action && msgItem.default_action.type}}type="${msgItem.default_action.type}"{{/if}} {{if msgItem.default_action && msgItem.default_action.payload}} value="${msgItem.default_action.payload}"{{/if}}> \
                                    <img alt="image" src="${msgItem.image_url}" onerror="this.onerror=null;this.src=\'../libs/img/no_image.png\';"/> \
                                </div> \
                            {{/if}} \
                            <div class="carouselTitleBox"> \
                                <p class="carouselTitle">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.title, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.title, "user")}} {{/if}}</p> \
                                {{if msgItem.subtitle}}<p class="carouselDescription">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "user")}} {{/if}}</p>{{/if}} \
                                {{if msgItem.default_action && msgItem.default_action.type === "web_url"}}<div class="listItemPath carouselDefaultAction" type="url" url="${msgItem.default_action.url}">${msgItem.default_action.url}</div>{{/if}} \
                                {{if msgItem.buttons}} \
                                    {{each(key, msgBtn) msgItem.buttons}} \
                                        <div {{if msgBtn.payload}}value="${msgBtn.payload}"{{/if}} {{if msgBtn.url}}url="${msgBtn.url}"{{/if}} class="listItemPath carouselButton" data-value="${msgBtn.value}" type="${msgBtn.type}">\
                                            ${msgBtn.title}\
                                        </div> \
                                    {{/each}} \
                                {{/if}} \
                            </div>\
                        </div>\
                    {{/each}} \
                </div>\
            </li> \
        {{/if}}\
    </scipt>';
   

        return carouselTemplate;
    }

}

export default CarouselTemplate;