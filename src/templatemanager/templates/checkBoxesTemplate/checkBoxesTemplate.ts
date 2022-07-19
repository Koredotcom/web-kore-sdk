
import helpers from '../../../utils/helpers';
import './checkBoxesTemplate.scss';
class CheckBoxesTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;

        if (msgData?.message[0]?.component?.payload?.template_type === "multi_select") {
            me.messageHtml = $(me.getTemplateString('checkBoxesTemplate')).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers
            });
            me.bindEvents();
            return me.messageHtml;
        }
    }
    bindEvents() {
        let me: any = this;
        let chatWindowInstance = me.hostInstance;
        let $ = me.hostInstance.$;
        const _chatContainer = chatWindowInstance.chatEle;
        _chatContainer.off('click', '.checkboxBtn').on('click', '.checkboxBtn', function (e: any) {
            let selectedTarget = e.currentTarget;
            e.preventDefault();
            e.stopPropagation();
            let type = $(selectedTarget).attr('type');
            if (type) {
                type = type.toLowerCase();
            }
            if (type == 'postback' || type == 'text') {
                //chatWindowInstance.assignValueToInput($(selectedTarget).attr('actual-value') || $(selectedTarget).attr('value'));
                // var _innerText = $(this)[0].innerText.trim() || $(this).attr('data-value').trim();
                const _innerText = ($(selectedTarget)[0] && $(selectedTarget)[0].innerText) ? $(selectedTarget)[0].innerText.trim() : '' || ($(selectedTarget) && $(selectedTarget).attr('data-value')) ? $(selectedTarget).attr('data-value').trim() : '';
                chatWindowInstance.sendMessage($(selectedTarget).attr('actual-value') || $(selectedTarget).attr('value'),{renderMsg:_innerText});
            } else if (type == 'url' || type == 'web_url') {
                if ($(selectedTarget).attr('msgData') !== undefined) {
                    let msgData;
                    try {
                        msgData = JSON.parse($(selectedTarget).attr('msgData'));
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
                let a_link = $(selectedTarget).attr('url');
                if (a_link.indexOf('http:') < 0 && a_link.indexOf('https:') < 0) {
                    a_link = `http:////${a_link}`;
                }
                chatWindowInstance.openExternalLink(a_link);
            }


            if (e.currentTarget.classList && e.currentTarget.classList.length > 0 && e.currentTarget.classList[0] === 'checkboxBtn') {
                const checkboxSelection = $(e.currentTarget.parentElement.parentElement).find('.checkInput:checked');
                const selectedValue = [];
                const toShowText = [];
                for (let i = 0; i < checkboxSelection.length; i++) {
                    selectedValue.push($(checkboxSelection[i]).attr('value'));
                    toShowText.push($(checkboxSelection[i]).attr('text'));
                }
                //chatWindowInstance.assignValueToInput(`${$(selectedTarget).attr('title')}: ${selectedValue.toString()}`);
                chatWindowInstance.sendMessage(`${$(selectedTarget).attr('title')}: ${selectedValue.toString()}`,{renderMsg:toShowText.toString()});
            }
            chatWindowInstance.focusInputTextbox();
            // setTimeout(() => {
            //     const _chatInput = _chatContainer.find('.kore-chat-footer .chatInputBox');
            //     _chatInput.focus();
            // }, 600);
        });
    }
    getTemplateString() {
        var checkBoxesTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
        {{if msgData.message}} \
        <li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
                <div class = "checkboxes-template"> \
                    {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                    {{if msgData.icon}}<div aria-live="off" class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                    <ul class="{{if msgData.message[0].component.payload.fromHistory}} dummy checkBoxestmplContentBox  {{else}} checkBoxestmplContentBox{{/if}} "> \
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
                                <li class="checkBoxestmplContentChild"> \
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