
import helpers from '../../../../../src/utils/helpers';
import './dropdownTemplate.scss';

class DropdownTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.cwInstance.$;
        let helpersObj = new helpers();

        if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "dropdown_template") {
            me.messageHtml = $(me.getTemplateString('dropdown_template')).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers
            });
            me.bindEvents(me.messageHtml);
            return me.messageHtml;
        }
    }
    bindEvents(messageHtml: any) {
        let me: any = this;
        let $ = me.cwInstance.$;
        $(messageHtml).find('.selectTemplateDropdowm').on('change', function (e: any) {
            e.preventDefault();
            e.stopPropagation();
            let selectedTarget = e.currentTarget;
            $(".chatInputBox").text(selectedTarget.value)
            var k = $.Event('keydown', { which: 13 });
            k.keyCode = 13
            $('.chatInputBox').trigger(k);

        });

    }
    getTemplateString() {
        var dropdownTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
        {{if msgData.message}} \
            <li {{if msgData.type !== "bot_response"}} id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
                <div class="dropDowntmplContent"> \
                    {{if msgData.createdOn}}<div class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                    {{if msgData.icon}}<div class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                    <div class="{{if msgData.message[0].component.payload.fromHistory}} dummy messageBubble {{else}}messageBubble{{/if}}"> \
                        {{if msgData.message[0].component.payload.heading}}<div class="templateHeading">${msgData.message[0].component.payload.heading}</div>{{/if}} \
                        <select class="selectTemplateDropdowm">\
                        <option>select</option> \
                            {{each(key, msgItem) msgData.message[0].component.payload.elements}} \
                                <option xyz = ${msgData.message[0].component.selectedValue} {{if msgData.message[0].component.selectedValue === msgItem.value}}selected{{/if}} class = "dropdownTemplatesValues" type = "postback" value="${msgItem.value}"> \
                                    ${msgItem.title}\
                                </option> \
                            {{/each}} \
                        </select> \
                    </div>\
                </div>\
            </li> \
        {{/if}} \
    </script>';

        return dropdownTemplate;
    }

}

export default DropdownTemplate;