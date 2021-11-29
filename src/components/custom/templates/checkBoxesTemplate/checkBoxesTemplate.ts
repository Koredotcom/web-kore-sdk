
import helpers from '../../../../../src/utils/helpers'

class CheckBoxesTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.cwInstance.$;
        let helpersObj = new helpers();

        if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "multi_select") {
            me.messageHtml = $(me.getTemplateString('checkBoxesTemplate')).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers
            });
            me.bindEvents();
            return me.messageHtml;
        }
    }
    bindEvents() {
    
    }
    getTemplateString() {
        var checkBoxesTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
        {{if msgData.message}} \
        <li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
                <div class = "listTmplContent"> \
                    {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                    {{if msgData.icon}}<div aria-live="off" class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                    <ul class="{{if msgData.message[0].component.payload.fromHistory}} dummy listTmplContentBox  {{else}} listTmplContentBox{{/if}} "> \
                        {{if msgData.message[0].component.payload.title || msgData.message[0].component.payload.heading}} \
                            <li class="listTmplContentHeading"> \
                                {{if msgData.type === "bot_response" && msgData.message[0].component.payload.heading}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.heading, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "user")}} {{/if}} \
                                {{if msgData.message[0].cInfo && msgData.message[0].cInfo.emoji}} \
                                    <span class="emojione emojione-${msgData.message[0].cInfo.emoji[0].code}">${msgData.message[0].cInfo.emoji[0].title}</span> \
                                {{/if}} \
                            </li> \
                        {{/if}} \
                        {{each(key, msgItem) msgData.message[0].component.payload.elements}} \
                            {{if msgData.message[0].component.payload.buttons}} \
                                <li class="listTmplContentChild"> \
                                    <div class="checkbox checkbox-primary styledCSS checkboxesDiv"> \
                                        <input  class = "checkInput" type="checkbox" text = "${msgItem.title}" value = "${msgItem.value}" id="${msgItem.value}${msgData.messageId}"> \
                                        <label for="${msgItem.value}${msgData.messageId}">{{html helpers.convertMDtoHTML(msgItem.title, "bot")}}</label> \
                                    </div> \
                                </li> \
                            {{/if}} \
                        {{/each}} \
                        <div class="{{if msgData.message[0].component.payload.fromHistory}} hide  {{else}} checkboxButtons {{/if}} "> \
                            {{each(key, buttonData) msgData.message[0].component.payload.buttons}} \
                                <div class="checkboxBtn" value=${buttonData.payload} title="${buttonData.title}"> \
                                    ${buttonData.title} \
                                </div> \
                            {{/each}} \
                        </div> \
                    </ul> \
                </div> \
            </li> \
        {{/if}} \
    </script>';

        return checkBoxesTemplate;
    }

}

export default CheckBoxesTemplate;