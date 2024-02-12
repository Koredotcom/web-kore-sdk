
import helpers from '../../../utils/helpers';
import './buttonTemplate.scss';
class ButtonTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;

        if (msgData?.message?.[0]?.component?.payload?.template_type === "button") {
            me.messageHtml = $(me.getTemplateString("templatebutton")).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers
            });
            me.bindEvents(me.messageHtml);
            return me.messageHtml;
        }
    }
    bindEvents(messageHtml:any) {
        let me :any = this;
        let chatWindowInstance = me.hostInstance;
        let $ = me.hostInstance.$;
        $(messageHtml).off('click', '.buttonTmplContentBox .btn-li').on('click', '.buttonTmplContentBox .btn-li', (e: any) => {
            e.preventDefault();
            e.stopPropagation();
            let selectedTarget = e.currentTarget;
            let type = $(selectedTarget).attr('type')
            if (type) {
                type = type.toLowerCase();
            }
            if (type == 'postback' || type == 'text') {
               // chatWindowInstance.assignValueToInput($(selectedTarget).attr('actual-value') || $(selectedTarget).attr('value'));
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
            }else {
                if ($(selectedTarget).find('a')) {
                    let a_link = $(selectedTarget).find('a').attr('href');
                    if (a_link.indexOf('http:') < 0 && a_link.indexOf('https:') < 0) {
                        a_link = `http:////${a_link}`;
                    }
                    chatWindowInstance.openExternalLink(a_link);
                }
            }
            if (e.currentTarget.classList && e.currentTarget.classList.length > 0 && e.currentTarget.classList[1] === 'likeDiv') {
                $('.likeImg').addClass('hide');
                $('.likedImg').removeClass('hide');
                $('.likeDislikeDiv').addClass('dummy');
            }
            if (e.currentTarget.classList && e.currentTarget.classList.length > 0 && e.currentTarget.classList[1] === 'disLikeDiv') {
                $('.disLikeImg').addClass('hide');
                $('.disLikedImg').removeClass('hide');
                $('.likeDislikeDiv').addClass('dummy');
            }

            if (e.currentTarget.classList && e.currentTarget.classList.length > 0 && e.currentTarget.classList[0] === 'checkboxBtn') {
                const checkboxSelection = $(e.currentTarget.parentElement.parentElement).find('.checkInput:checked');
                const selectedValue = [];
                const toShowText = [];
                for (let i = 0; i < checkboxSelection.length; i++) {
                    selectedValue.push($(checkboxSelection[i]).attr('value'));
                    toShowText.push($(checkboxSelection[i]).attr('text'));
                }
              // chatWindowInstance.assignValueToInput(`${$(selectedTarget).attr('title')}: ${selectedValue.toString()}`);
              //  $('.chatInputBox').text(`${$(selectedTarget).attr('title')}: ${selectedValue.toString()}`);
                chatWindowInstance.sendMessage(`${$(selectedTarget).attr('title')}: ${selectedValue.toString()}`,{renderMsg:toShowText.toString()});
            }
            if (e.currentTarget.classList && e.currentTarget.classList.length > 0 && e.currentTarget.classList[0] === 'quickReply') {
                const _parentQuikReplyEle = e.currentTarget.parentElement.parentElement;
                const _leftIcon = _parentQuikReplyEle.parentElement.parentElement.querySelectorAll('.quickreplyLeftIcon');
                const _rightIcon = _parentQuikReplyEle.parentElement.parentElement.querySelectorAll('.quickreplyRightIcon');
                setTimeout(() => {
                    _parentQuikReplyEle.parentElement.parentElement.getElementsByClassName('user-account')[0].classList.remove('marginT50');
                    _parentQuikReplyEle.parentElement.parentElement.removeChild(_leftIcon[0]);
                    _parentQuikReplyEle.parentElement.parentElement.removeChild(_rightIcon[0]);
                    _parentQuikReplyEle.parentElement.removeChild(_parentQuikReplyEle);
                }, 50);
            }
            chatWindowInstance.focusInputTextbox();
            // setTimeout(() => {
            //     const _chatInput = _chatContainer.find('.kore-chat-footer .chatInputBox');
            //     _chatInput.focus(); 
            // }, 600);
        });

    }
    getTemplateString() {
        var buttonTemplate = '<script id="chat_button_tmpl" type="text/x-jqury-tmpl"> \
            {{if msgData.message}} \
                <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}"\
                    class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} {{if msgData.icon}}with-icon{{/if}}"> \
                    <div class="buttonTmplContent"> \
                        {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                        {{if msgData.icon}}<div aria-live="off" class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                        <div class="buttonTmplContentBox">\
                            <div class="buttonTmplContentHeading btn-li"> \
                                {{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "user")}} {{/if}} \
                                {{if msgData.message[0].cInfo && msgData.message[0].cInfo.emoji}} \
                                    <span class="emojione emojione-${msgData.message[0].cInfo.emoji[0].code}">${msgData.message[0].cInfo.emoji[0].title}</span> \
                                {{/if}} \
                            </div>\
                            {{each(key, msgItem) msgData.message[0].component.payload.buttons}} \
                                <a>\
                                    <div {{if msgData}}msgData="${JSON.stringify(msgData)}"{{/if}} {{if msgItem.payload}}value="${msgItem.payload}"{{/if}} {{if msgItem.payload}}actual-value="${msgItem.payload}"{{/if}} {{if msgItem.url}}url="${msgItem.url}"{{/if}} class="buttonTmplContentChild btn-li" data-value="${msgItem.value}" type="${msgItem.type}">\
                                        ${msgItem.title}\
                                    </div> \
                                </a> \
                            {{/each}} \
                        </div>\
                    </div>\
                </li> \
            {{/if}} \
        </scipt>';
        return buttonTemplate;
    }
    
}

export default ButtonTemplate;