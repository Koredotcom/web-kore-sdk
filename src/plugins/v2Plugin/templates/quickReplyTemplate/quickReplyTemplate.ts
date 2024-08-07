import helpers from '../../../../utils/helpers';
import './quickReplyTemplate.scss';
class QuickReplyTemplate {
    template_type:string="quick_replies";
    config={
        hideOptionsOnClick:true
    }
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;

        if (msgData?.message?.[0]?.component?.payload?.template_type === "quick_replies") {
            me.messageHtml = $(me.getTemplateString()).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers
            });
            me.bindEvents( me.messageHtml);
            return me.messageHtml;
        }
    }
    bindEvents(messageHtml:any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let chatWindowInstance = me.hostInstance;
        const quickReplyDivs = document.querySelectorAll('.quickReplies');
        // for (var i = 0; i < quickReplyDivs.length; i++) {
            const btnsParentDiv: any = $(messageHtml).find('.quick_replies_btn_parent');
            const leftScrollBtn =  $(messageHtml).find('.quickreplyLeftIcon');
            const rightScrollBtn =  $(messageHtml).find('.quickreplyRightIcon');
            setTimeout(() => {
                if (btnsParentDiv && btnsParentDiv[0] && btnsParentDiv[0].hasChildNodes()) {
                    if (leftScrollBtn && leftScrollBtn.length && leftScrollBtn[0] && leftScrollBtn[0].classList) {
                        if (btnsParentDiv[0].scrollLeft > 0) {
                            leftScrollBtn[0].classList.remove('hide');
                        } else {
                            if(!$(leftScrollBtn[0]).hasClass('hide')){
                                leftScrollBtn[0].classList.add('hide');
                            }
                        }
                    }
                    if (rightScrollBtn && rightScrollBtn.length && rightScrollBtn[0] && rightScrollBtn[0].classList) {
                        if (btnsParentDiv[0].offsetWidth < btnsParentDiv[0].scrollWidth) {
                            rightScrollBtn[0].classList.remove('hide');
                        } else {
                            if(!$(rightScrollBtn[0]).hasClass('hide')){
                                rightScrollBtn[0].classList.add('hide');
                            }
                        }
                    }
                } 
            }, 1000);
        // }
        $(messageHtml).off('click', '.quickReply').on('click', '.quickReply', function (e: any) {
            e.preventDefault();
            e.stopPropagation();
            let selectedTarget = e.currentTarget;
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
                if (a_link && (a_link.indexOf('http:') < 0 && a_link.indexOf('https:') < 0)) {
                    a_link = `http:////${a_link}`;
                }
                chatWindowInstance.openExternalLink(a_link);
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
                const checkboxSelection:any = $(e.currentTarget.parentElement.parentElement).find('.checkInput:checked');
                const selectedValue:any = [];
                const toShowText:any = [];
                for (let i = 0; i < checkboxSelection.length; i++) {
                    selectedValue.push($(checkboxSelection[i]).attr('value'));
                    toShowText.push($(checkboxSelection[i]).attr('text'));
                }
                //chatWindowInstance.assignValueToInput(`${$(selectedTarget).attr('title')}: ${selectedValue.toString()}`);
                chatWindowInstance.sendMessage(`${$(selectedTarget).attr('title')}: ${selectedValue.toString()}`,{renderMsg:toShowText.toString()});
            }
            if (e.currentTarget.classList && e.currentTarget.classList.length > 0 && e.currentTarget.classList[0] === 'quickReply') {
                const _parentQuikReplyEle = e.currentTarget.parentElement.parentElement;
                const _leftIcon = _parentQuikReplyEle.parentElement.parentElement.querySelectorAll('.quickreplyLeftIcon');
                const _rightIcon = _parentQuikReplyEle.parentElement.parentElement.querySelectorAll('.quickreplyRightIcon');
                if(me.config.hideOptionsOnClick){
                setTimeout(() => {
                    _parentQuikReplyEle.parentElement.parentElement.getElementsByClassName('user-account')[0].classList.remove('marginT50');
                    _parentQuikReplyEle.parentElement.parentElement.removeChild(_leftIcon[0]);
                    _parentQuikReplyEle.parentElement.parentElement.removeChild(_rightIcon[0]);
                    _parentQuikReplyEle.parentElement.removeChild(_parentQuikReplyEle);
                }, 50);
            }
            }
            // setTimeout(() => {
                chatWindowInstance.focusInputTextbox();
            // }, 600);
        });
        $(messageHtml).off('click', '.quickreplyRightIcon').on('click', '.quickreplyRightIcon', (event: any) => {
            const _quickReplesDivs = event.currentTarget.parentElement.getElementsByClassName('quickReplyTemplContentChild');
            if (_quickReplesDivs.length) {
                const _scrollParentDiv = event.target.parentElement.getElementsByClassName('quick_replies_btn_parent');
                const _totalWidth = event.target.parentElement.offsetWidth;
                let _currWidth = 0;
                // calculation for moving element scroll
                for (let i = 0; i < _quickReplesDivs.length; i++) {
                    _currWidth += (_quickReplesDivs[i].offsetWidth + 10);
                    if (_currWidth > _totalWidth) {
                        // _scrollParentDiv[0].scrollLeft = _currWidth;
                        $(_scrollParentDiv).animate({
                            scrollLeft: (_scrollParentDiv[0].scrollLeft + _quickReplesDivs[i].offsetWidth + 20),
                        }, 'slow', () => {
                            // deciding to enable left and right scroll icons
                            const leftIcon = _scrollParentDiv[0].parentElement.querySelectorAll('.quickreplyLeftIcon');
                            leftIcon[0].classList.remove('hide');
                            if ((_scrollParentDiv[0].scrollLeft + _totalWidth + 10) >= _scrollParentDiv[0].scrollWidth) {
                                const rightIcon = _scrollParentDiv[0].parentElement.querySelectorAll('.quickreplyRightIcon');
                                rightIcon[0].classList.add('hide');
                            }
                        });
                        break;
                    }
                }
            }
        });
        $(messageHtml).off('click', '.quickreplyLeftIcon').on('click', '.quickreplyLeftIcon', function (event: any) {
            const _quickReplesDivs = event.currentTarget.parentElement.getElementsByClassName('quickReplyTemplContentChild');
            if(_quickReplesDivs.length) {
                const _scrollParentDiv = event.target.parentElement.getElementsByClassName('quick_replies_btn_parent');
                const _totalWidth = _scrollParentDiv[0].scrollLeft;
                let _currWidth = 0;
                for(let i=0;i<_quickReplesDivs.length;i++) {
                    _currWidth += (_quickReplesDivs[i].offsetWidth+10);
                    if(_currWidth > _totalWidth) {
                        //_scrollParentDiv[0].scrollLeft = (_totalWidth - _quickReplesDivs[i].offsetWidth+20);
                        $(_scrollParentDiv).animate({
                            scrollLeft: (_totalWidth - _quickReplesDivs[i].offsetWidth-50)
                        },'slow',function(){
                            // deciding to enable left and right scroll icons
                            const rightIcon = _scrollParentDiv[0].parentElement.querySelectorAll('.quickreplyRightIcon');
                            rightIcon[0].classList.remove('hide');
                            if(_scrollParentDiv[0].scrollLeft <= 0) {
                                const leftIcon = _scrollParentDiv[0].parentElement.querySelectorAll('.quickreplyLeftIcon');
                                leftIcon[0].classList.add('hide');
                            }
                        });
                        break;
                    }
                }
            }
        });
    }
    getTemplateString() {
        var quickReplyTemplate = '<script id="chat_quick_reply_tmpl" type="text/x-jqury-tmpl"> \
        {{if msgData.message}} \
            <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}"\
                class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon quickReplies"> \
                <div class="quickReplyTemplate"> \
                    {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                    {{if msgData.icon}}<div aria-live="off" class="profile-photo"> <div class="user-account avtar marginT50" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                    {{if msgData.message[0].component.payload.text}} \
                        <div class="quickReplyHeading"> \
                            {{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "user")}} {{/if}} \
                            {{if msgData.message[0].cInfo && msgData.message[0].cInfo.emoji}} \
                                <span class="emojione emojione-${msgData.message[0].cInfo.emoji[0].code}">${msgData.message[0].cInfo.emoji[0].title}</span> \
                            {{/if}} \
                        </div>\
                        {{/if}} \
                        {{if msgData.message[0].component.payload.quick_replies && msgData.message[0].component.payload.quick_replies.length}} \
                        <div class="fa fa-chevron-left quickreplyLeftIcon hide"></div><div class="fa fa-chevron-right quickreplyRightIcon hide"></div>\
                            <div class="quick_replies_btn_parent"><div class="autoWidth">\
                                {{each(key, msgItem) msgData.message[0].component.payload.quick_replies}} \
                                    <div class="quickReplyTemplContentChild quickReplyDiv"> <span {{if msgItem.payload}}value="${msgItem.payload}"{{/if}} class="quickReply {{if msgItem.image_url}}with-img{{/if}}" type="${msgItem.content_type}" {{if msgItem.url}}url="${msgItem.url}"{{/if}}>\
                                        {{if msgItem.image_url}}<img src="${msgItem.image_url}">{{/if}} <span class="quickreplyText {{if msgItem.image_url}}with-img{{/if}}">${msgItem.title}</span></span>\
                                    </div> \
                                {{/each}} \
                            </div>\
                        </div>\
                    {{/if}} \
                </div>\
            </li> \
        {{/if}} \
    </scipt>';
        return quickReplyTemplate;
    }

}

export default QuickReplyTemplate;