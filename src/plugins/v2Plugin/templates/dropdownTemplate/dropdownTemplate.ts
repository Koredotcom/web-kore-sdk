import helpers from '../../../../utils/helpers';
import './dropdownTemplate.scss';

class DropdownTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;

        if (msgData?.message?.[0]?.component?.payload?.template_type === "dropdown_template") {
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
        let $ = me.hostInstance.$;
        let chatWindowInstance = me.hostInstance;
        $(messageHtml).find('.selectTemplateDropdowm').on('change', function (e: any) {
            e.preventDefault();
            e.stopPropagation();
            let selectedTarget = $(e.currentTarget).find('option:selected');
            //chatWindowInstance.assignValueToInput(selectedTarget.value);
            chatWindowInstance.sendMessage(selectedTarget.val(), { renderMsg: selectedTarget.attr('name') });
            // var k = $.Event('keydown', { which: 13 });
            // k.keyCode = 13
            // $('.chatInputBox').trigger(k);

        });

    }
    getTemplateString() {
        var dropdownTemplate = '<script id="chat_dropdown_tmpl" type="text/x-jqury-tmpl"> \
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
                            <option xyz = "${msgData.message[0].component.selectedValue} {{if msgData.message[0].component.selectedValue === msgItem.value}}selected{{/if}}" class = "dropdownTemplatesValues" title = "${msgItem.title}" type = "postback" value="${msgItem.value}" name="${msgItem.title}"> \
                                {{if msgItem.title.length > 32}}${msgItem.title.substr(0,32)}...{{else}}${msgItem.title}{{/if}}\
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