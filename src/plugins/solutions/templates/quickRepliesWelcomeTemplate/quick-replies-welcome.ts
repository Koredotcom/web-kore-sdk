import helpers from '../../../../utils/helpers';
import './quick-replies-welcome.scss';
export class QuickRepliesWelcome {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;
        if (msgData?.message?.[0]?.component?.payload?.template_type == "quick_replies_welcome") {
            let messageHtml = $(me.getTemplateString('quick_replies_welcome')).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers
            });
            $(messageHtml).data(msgData);
            me.bindEvents(messageHtml, msgData);
            return $(messageHtml);
        }
    }
    bindEvents(ele: any, msgData: any) {
        let me: any = this;
        let chatWindowInstance = me.hostInstance;
        let $ = me.hostInstance.$;
		var $ele = $(ele);
        $(ele).off('click', '.quick_replies_welcome .quickReplyDiv .buttonQuickReply').on('click', '.quick_replies_welcome .quickReplyDiv .buttonQuickReply', (e: any) => {
            let target = $(e.currentTarget);
            let targetType = $(e.currentTarget).attr('type') || 'text';
            if (targetType == "postback" || targetType == "text") {
                let _innerText = $(target).attr('actual-value') || $(target).attr('value');
                let payload = $(target).attr('value');
                chatWindowInstance.sendMessage(payload, { renderMsg: _innerText });

            } else if (targetType == "url" || targetType == "web_url") {
                if (target.attr('msgData') !== undefined) {
                    let msgData;
                    try {
                        msgData = JSON.parse(target.attr('msgData'));
                    } catch (err) {
                      console.log(err);
                    }
                    if (msgData && msgData.message && msgData.message[0].component && (msgData.message[0].component.formData || (msgData.message[0].component.payload && msgData.message[0].component.payload.formData))) {
                        if (msgData.message[0].component.formData) {
                            msgData.message[0].component.payload.formData = msgData.message[0].component.formData;
                        }
                        chatWindowInstance.renderWebForm(msgData);
                        return;
                    }
                }
                let a_link = target.attr('url');
                if (a_link && (a_link.indexOf('http:') < 0 && a_link.indexOf('https:') < 0)) {
                    a_link = `http:////${a_link}`;
                }
                chatWindowInstance.openExternalLink(a_link);
            }
            }

        });

    }

    getTemplateString() {
        let quick_replies_welcome = '<script id="quick_replies_tmpl" type="text/x-jqury-tmpl"> \
            {{if msgData.message}} \
                <li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon quickReplies"> \
                    <div class="quick_replies_welcome "> \
                        {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                        {{if msgData.icon}}<div aria-live="off" class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                        {{if msgData.message[0].component.payload.text}} \
                            <div class="quickRepliesHeading"> \
                                {{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "user")}} {{/if}} \
                                {{if msgData.message[0].cInfo && msgData.message[0].cInfo.emoji}} \
                                    <span class="emojione emojione-${msgData.message[0].cInfo.emoji[0].code}">${msgData.message[0].cInfo.emoji[0].title}</span> \
                                {{/if}} \
                            </div>\
                        {{/if}} \
                        {{if msgData.message[0].component.payload.quick_replies && msgData.message[0].component.payload.quick_replies.length}} \
                            <div class="quick_replies_btn_parent"><div class="autoWidth">\
                                    {{each(key, msgItem) msgData.message[0].component.payload.quick_replies}} \
                                        <div class="quickRepliesChild quickReplyDiv displayInline"> <span {{if msgItem.payload}}value="${msgItem.payload}"{{/if}} actual-value="${msgItem.value}" class="buttonQuickReply {{if msgItem.image_url}}with-img{{/if}}" type="${msgItem.type}" {{if msgItem.url}}url="${msgItem.url}"{{/if}}>\
                                            {{if msgItem.image_url}}<img src="${msgItem.image_url}">{{/if}} <span class="quickreplyText {{if msgItem.image_url}}with-img{{/if}}">${msgItem.title}</span></span>\
                                        </div> \
                                    {{/each}} \
                                </div>\
                            </div>\
                        {{/if}} \
                        {{if msgData.message[0].component.payload.buttons && msgData.message[0].component.payload.buttons.length}} \
                            <div class="quick_replies_btn_parent"><div class="autoWidth">\
                                {{each(key, msgItem) msgData.message[0].component.payload.buttons}} \
                                    <div class="quickRepliesChild quickReplyDiv displayInline"> <span {{if msgItem.payload}}value="${msgItem.payload}"{{/if}} actual-value="${msgItem.value}" class="buttonQuickReply {{if msgItem.image_url}}with-img{{/if}}" type="${msgItem.type}" {{if msgItem.url}}url="${msgItem.url}"{{/if}}>\
                                        {{if msgItem.image_url}}<img src="${msgItem.image_url}">{{/if}} <span class="quickreplyText {{if msgItem.image_url}}with-img{{/if}}">${msgItem.title}</span></span>\
                                    </div> \
                                {{/each}} \
                            {{/if}} \
                        </div>\
                    </div>\
                </li> \
            {{/if}} \
        </scipt>';
        return quick_replies_welcome;
    }
}
export default QuickRepliesWelcome;