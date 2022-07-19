
import helpers from '../../../utils/helpers';
import './systemTemplate.scss';
class SystemTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;

        if (msgData?.message[0]?.component?.payload?.template_type === "SYSTEM") {
            if (msgData.message[0].component && msgData.message[0].component.payload) {
                msgData.message[0].cInfo.body = msgData.message[0].component.payload.text || "";
            }
            me.messageHtml = $(me.getTemplateString("systemTemplate")).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers
            });
            me.bindEvents(me.messageHtml);
            return me.messageHtml;
        }
    }
    bindEvents(messageHtml: any) {
        let me: any = this;
        let chatWindowInstance = me.hostInstance;
        let $ = me.hostInstance.$;

    }
    getTemplateString() {
        var systemTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
                    {{if msgData.message}} \
                        {{each(key, msgItem) msgData.message}} \
                            {{if msgItem.cInfo && msgItem.type === "text"}} \
                            <div class="messageBubble"> \
                                <div class = "system-template"> \
                                        <span class = "system-template-msg"> {{html helpers.convertMDtoHTML(msgItem.cInfo.body, "bot", msgItem)}}</span> \
                                    </div> \
                                </div> \
                            {{/if}} \
                        {{/each}} \
                    {{/if}} \
                </scipt>';
        return systemTemplate;
    }

}

export default SystemTemplate;