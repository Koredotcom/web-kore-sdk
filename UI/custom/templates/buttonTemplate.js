
import helpers from '../../../src/utils/helpers'

class buttonTemplate {

    renderMessage(msgData) {
        var me = this;
        var $ = me.cwInstance.$;
        var helpersObj = new helpers();

        if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "button") {
            var messageHtml = $(me.getTemplateString("templatebutton")).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers
            });
            return messageHtml;
        }
    }

    getTemplateString() {
        var buttonTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
            {{if msgData.message}} \
                <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}"\
                    class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
                    <div class="buttonTmplContent"> \
                        {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                        {{if msgData.icon}}<div aria-live="off" class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                        <ul class="buttonTmplContentBox">\
                            <li class="buttonTmplContentHeading"> \
                                {{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "user")}} {{/if}} \
                                {{if msgData.message[0].cInfo && msgData.message[0].cInfo.emoji}} \
                                    <span class="emojione emojione-${msgData.message[0].cInfo.emoji[0].code}">${msgData.message[0].cInfo.emoji[0].title}</span> \
                                {{/if}} \
                            </li>\
                            {{each(key, msgItem) msgData.message[0].component.payload.buttons}} \
                                <a>\
                                    <li {{if msgData}}msgData="${JSON.stringify(msgData)}"{{/if}} {{if msgItem.payload}}value="${msgItem.payload}"{{/if}} {{if msgItem.payload}}actual-value="${msgItem.payload}"{{/if}} {{if msgItem.url}}url="${msgItem.url}"{{/if}} class="buttonTmplContentChild" data-value="${msgItem.value}" type="${msgItem.type}">\
                                        ${msgItem.title}\
                                    </li> \
                                </a> \
                            {{/each}} \
                        </ul>\
                    </div>\
                </li> \
            {{/if}} \
        </scipt>';
        return buttonTemplate;
    }
    
}

export default buttonTemplate;