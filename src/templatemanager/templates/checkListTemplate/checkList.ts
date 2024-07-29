import helpers from '../../../utils/helpers';
import './checkList.scss';
class CheckListTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;

        if (msgData?.message?.[0]?.component?.payload?.template_type === "checkListTemplate") {
            me.messageHtml = $(me.getTemplateString("checkListTemplate")).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers
            });
            // me.bindEvents(me.messageHtml);
            return me.messageHtml;
        }
    }

    getTemplateString() {
        var checkListTemplate = '<script id="chat_check_list_tmpl" type="text/x-jqury-tmpl"> \
            {{if msgData.message}} \
                <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}"\
                    class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} {{if msgData.icon}}with-icon{{/if}}"> \
                    <div class="buttonTmplContent"> \
                        {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                        {{if msgData.icon}}<div aria-live="off" class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                        <div class="buttonTmplContentBox messageLeftAnimation">\
                            <div class="buttonTmplContentHeading btn-li"> \
                                {{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.title, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "user")}} {{/if}} \
                            </div>\
                            <div> \
                               Checklist template \
                            </div> \
                        </div>\
                    </div>\
                </li> \
            {{/if}} \
        </scipt>';
        return checkListTemplate;
    }
    
}

export default CheckListTemplate;