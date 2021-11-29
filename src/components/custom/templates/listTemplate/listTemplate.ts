
import helpers from '../../../../../src/utils/helpers'

class ListTemplate {
    [x: string]: any;
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
        let me = this;
        let chatWindowInstance = me.cwInstance;
        let $ = me.cwInstance.$;
        const _chatContainer = chatWindowInstance.config.chatContainer;
        _chatContainer.off('click', '.listTmplContentChild .buyBtn,.viewMoreList .viewMore,.listItemPath,.listRightContent').on('click', '.listTmplContentChild .buyBtn,.viewMoreList .viewMore,.listItemPath,.listRightContent', (e:any) =>  {
            e.preventDefault();
            e.stopPropagation();
            let type = $(this).attr('type')
            if (type) {
                type = type.toLowerCase();
            }
            if (type == 'postback' || type == 'text') {
                $('.chatInputBox').text($(this).attr('actual-value') || $(this).attr('value'));
                // var _innerText = $(this)[0].innerText.trim() || $(this).attr('data-value').trim();
                const _innerText = ($(this)[0] && $(this)[0].innerText) ? $(this)[0].innerText.trim() : '' || ($(this) && $(this).attr('data-value')) ? $(this).attr('data-value').trim() : '';
                me.sendMessage($('.chatInputBox'), _innerText);
            } else if (type == 'url' || type == 'web_url') {
                if ($(this).attr('msgData') !== undefined) {
                    let msgData;
                    try {
                        msgData = JSON.parse($(this).attr('msgData'));
                    } catch (err) {

                    }
                    if (msgData && msgData.message && msgData.message[0].component && (msgData.message[0].component.formData || (msgData.message[0].component.payload && msgData.message[0].component.payload.formData))) {
                        if (msgData.message[0].component.formData) {
                            msgData.message[0].component.payload.formData = msgData.message[0].component.formData;
                        }
                        me.renderWebForm(msgData);
                        return;
                    }
                }

                let a_link = $(this).attr('url');
                if (a_link.indexOf('http:') < 0 && a_link.indexOf('https:') < 0) {
                    a_link = `http:////${a_link}`;
                }
                me.openExternalLink(a_link);
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
                $('.chatInputBox').text(`${$(this).attr('title')}: ${selectedValue.toString()}`);
                me.sendMessage($('.chatInputBox'), toShowText.toString());
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
            setTimeout(() => {
                const _chatInput = _chatContainer.find('.kore-chat-footer .chatInputBox');
                _chatInput.focus();
            }, 600);
        });
    }
    getTemplateString() {
        var listTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
     {{if msgData.message}} \
         <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}"\
             class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
             <div class="listTmplContent"> \
                 {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                 {{if msgData.icon}}<div aria-live="off" class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                 <ul class="listTmplContentBox"> \
                     {{if msgData.message[0].component.payload.text || msgData.message[0].component.payload.heading}} \
                         <li class="listTmplContentHeading"> \
                             {{if msgData.type === "bot_response" && msgData.message[0].component.payload.heading}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.heading, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "user")}} {{/if}} \
                             {{if msgData.message[0].cInfo && msgData.message[0].cInfo.emoji}} \
                                 <span class="emojione emojione-${msgData.message[0].cInfo.emoji[0].code}">${msgData.message[0].cInfo.emoji[0].title}</span> \
                             {{/if}} \
                         </li> \
                     {{/if}} \
                     {{each(key, msgItem) msgData.message[0].component.payload.elements}} \
                         {{if msgData.message[0].component.payload.buttons}} \
                             {{if key<= 2 }}\
                                 <li class="listTmplContentChild"> \
                                     {{if msgItem.image_url}} \
                                         <div class="listRightContent" {{if msgItem.default_action && msgItem.default_action.url}}url="${msgItem.default_action.url}"{{/if}} {{if msgItem.default_action && msgItem.default_action.title}}data-value="${msgItem.default_action.title}"{{/if}} {{if msgItem.default_action && msgItem.default_action.type}}type="${msgItem.default_action.type}"{{/if}} {{if msgItem.default_action && msgItem.default_action.payload}} value="${msgItem.default_action.payload}"{{/if}}> \
                                             <img alt="image" src="${msgItem.image_url}" onerror="this.onerror=null;this.src=\'../libs/img/no_image.png\';"/> \
                                         </div> \
                                     {{/if}} \
                                     <div class="listLeftContent"> \
                                         <div class="listItemTitle">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.title, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.title, "user")}} {{/if}}</div> \
                                         {{if msgItem.subtitle}}<div class="listItemSubtitle">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "user")}} {{/if}}</div>{{/if}} \
                                         {{if msgItem.default_action && msgItem.default_action.url}}<div class="listItemPath" type="url" url="${msgItem.default_action.url}">${msgItem.default_action.url}</div>{{/if}} \
                                         {{if msgItem.buttons}}\
                                         <div> \
                                             <span class="buyBtn" {{if msgItem.buttons[0].type}}type="${msgItem.buttons[0].type}"{{/if}} {{if msgItem.buttons[0].url}}url="${msgItem.buttons[0].url}"{{/if}} {{if msgItem.buttons[0].payload}}value="${msgItem.buttons[0].payload}"{{/if}}>{{if msgItem.buttons[0].title}}${msgItem.buttons[0].title}{{else}}Buy{{/if}}</span> \
                                         </div> \
                                         {{/if}}\
                                     </div>\
                                 </li> \
                             {{/if}}\
                         {{else}} \
                             <li class="listTmplContentChild"> \
                                 {{if msgItem.image_url}} \
                                     <div class="listRightContent" {{if msgItem.default_action && msgItem.default_action.url}}url="${msgItem.default_action.url}"{{/if}} {{if msgItem.default_action && msgItem.default_action.title}}data-value="${msgItem.default_action.title}"{{/if}} {{if msgItem.default_action && msgItem.default_action.type}}type="${msgItem.default_action.type}"{{/if}} {{if msgItem.default_action && msgItem.default_action.payload}} value="${msgItem.default_action.payload}"{{/if}}> \
                                         <img alt="image" src="${msgItem.image_url}" onerror="this.onerror=null;this.src=\'../libs/img/no_image.png\';" /> \
                                     </div> \
                                 {{/if}} \
                                 <div class="listLeftContent"> \
                                     <div class="listItemTitle">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.title, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.title, "user")}} {{/if}}</div> \
                                     {{if msgItem.subtitle}}<div class="listItemSubtitle">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "user")}} {{/if}}</div>{{/if}} \
                                     {{if msgItem.default_action && msgItem.default_action.url}}<div class="listItemPath" type="url" url="${msgItem.default_action.url}">${msgItem.default_action.url}</div>{{/if}} \
                                     {{if msgItem.buttons}}\
                                     <div> \
                                         <span class="buyBtn" {{if msgItem.buttons[0].type}}type="${msgItem.buttons[0].type}"{{/if}} {{if msgItem.buttons[0].url}}url="${msgItem.buttons[0].url}"{{/if}} {{if msgItem.buttons[0].payload}}value="${msgItem.buttons[0].payload}"{{/if}}>{{if msgItem.buttons[0].title}}${msgItem.buttons[0].title}{{else}}Buy{{/if}}</span> \
                                     </div> \
                                     {{/if}}\
                                 </div>\
                             </li> \
                         {{/if}} \
                     {{/each}} \
                     </li> \
                     {{if msgData.message[0].component.AlwaysShowGlobalButtons || (msgData.message[0].component.payload.elements.length > 3 && msgData.message[0].component.payload.buttons)}}\
                     <li class="viewMoreList"> \
                         <span class="viewMore" url="{{if msgData.message[0].component.payload.buttons[0].url}}${msgData.message[0].component.payload.buttons[0].url}{{/if}}" type="${msgData.message[0].component.payload.buttons[0].type}" value="{{if msgData.message[0].component.payload.buttons[0].payload}}${msgData.message[0].component.payload.buttons[0].payload}{{else}}${msgData.message[0].component.payload.buttons[0].title}{{/if}}">${msgData.message[0].component.payload.buttons[0].title}</span> \
                     </li> \
                     {{/if}}\
                 </ul> \
             </div> \
         </li> \
     {{/if}} \
 </scipt>';
        return listTemplate;
    }

}

export default ListTemplate;