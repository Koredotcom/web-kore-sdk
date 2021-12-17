
import helpers from '../../../../../src/utils/helpers'

class ListTemplate {

    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.cwInstance.$;
        let helpersObj = new helpers();

        if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "list") {
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
        let chatWindowInstance = me.cwInstance;
        let $ = me.cwInstance.$;
        const _chatContainer = chatWindowInstance.config.chatContainer;

    }
    getTemplateString() {
        var iframe = '<script id="chat_message_tmpl" type="text/x-jquery-tmpl"> \
        {{if link_url}}\
           {{if (msgData && msgData.renderType ==="inline")}}\
                <li class="inlineIframeContainer"> \
                    <div class="iframeBubble"> \
                            <div class="uiformComponent">\
                            <div id="closeInlineModel" role="region" aria-live="polite" aria-atomic="true" aira-label="close Form" class="loading_form iframeLoader"></div>\
                            <iframe id="inlineIframeModal" src="${link_url}"></iframe> \
                            </div>\
                    </div>\
                </li> \
            {{else}}\
                <iframe role="region" aria-live="polite" aria-atomic="true" aira-label="Loadig Form" id="iframeModal" src="${link_url}"></iframe> \
            {{/if}}\
        {{else}}\
            <div role="region" aria-live="polite" aria-atomic="true" class="failedIframe">Failed to load iFrame</div>\
        {{/if}}\
    </script>';
        return iframe;
    }

}

export default ListTemplate;