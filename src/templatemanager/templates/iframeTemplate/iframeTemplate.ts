
import helpers from '../../../utils/helpers';
import './iframeTemplate.scss';

class IframeTemplate {

    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;
        if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "iframe") {
            me.messageHtml = $(me.getTemplateString('iframe')).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers,
                'link_url': msgData.message[0].component.payload.formData.formLink,
            });
            me.bindEvents();
            return me.messageHtml;
        }
    }
    bindEvents() {

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

export default IframeTemplate;