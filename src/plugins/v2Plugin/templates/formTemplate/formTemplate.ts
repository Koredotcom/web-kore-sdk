import helpers from '../../../../utils/helpers';
import  './formTemplate.scss';
class FormTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;

        if (msgData?.message?.[0]?.component?.payload?.template_type === "form_template") {
            me.messageHtml = $(me.getTemplateString('formTemplate')).tmpl({
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
        $(messageHtml).find(".formMainComponent").on('keydown', function (e: any) {
            if (e.keyCode == 13) {
                e.preventDefault();
                e.stopPropagation();
            }
        })
        $(messageHtml).find("#submit").on('click', function (e: any) {
            let inputForm_id = $(e.currentTarget).closest('.buttonTmplContent').find(".formMainComponent .formBody");
            let parentElement = $(e.currentTarget).closest(".fromOtherUsers.with-icon");
            let messageData = $(parentElement).data();
            let selectedValue: any;
            if (messageData.tmplItem.data.msgData.message[0].component.payload) {
                messageData.tmplItem.data.msgData.message[0].component.payload.ignoreCheckMark = true;
                var msgData = messageData.tmplItem.data.msgData;
            }

            if (inputForm_id.find("#email").val() == "") {
                $(parentElement).find(".buttonTmplContent").last().find(".errorMessage").removeClass("hide");
                $(".errorMessage").text("Please enter value");
            }
            else if (inputForm_id.find("input[type='password']").length != 0) {
                let textPwd = inputForm_id.find("#email").val();
                let passwordLength = textPwd.length;
                selectedValue = "";
                for (let i = 0; i < passwordLength; i++) {
                    selectedValue = selectedValue + "*";
                }
                //chatWindowInstance.assignValueToInput(textPwd);
                $(messageHtml).find(".formMainComponent form").addClass("hide");
                chatWindowInstance.sendMessage(textPwd,{renderMsg:selectedValue}, msgData);
            } else if (inputForm_id.find("input[type='password']").length == 0) {
                //chatWindowInstance.assignValueToInput(inputForm_id.find("#email").val());
                selectedValue = inputForm_id.find("#email").val();
                $(messageHtml).find(".formMainComponent form").addClass("hide");
                chatWindowInstance.sendMessage(inputForm_id.find("#email").val(),{renderMsg:selectedValue}, msgData);
            }
            
        });
        $(messageHtml).find('.btn-group').off('click', '.btn-info').on('click', '.btn-info', function(e: any) {
            let inputFields = $(messageHtml).find('.form-control');
            let payload: any = {};
            let messageTobeDisplayed = '';
            $(messageHtml).find('.errorMessage').addClass('hide');
            if (inputFields && inputFields.length) {
                for (let i = 0; i < inputFields.length; i++) {
                    let inputField = inputFields[i];
                    let inputId = $(inputField).attr('id');
                    let piiReductionChar = $(inputField).attr('piiReductionChar');
                    if ($(inputField).val().length) {
                        if (!piiReductionChar) {
                            payload[inputId] = $(inputField).val();
                        } else {
                            payload[inputId] = piiReductionChar + $(inputField).val() + piiReductionChar;
                        }
                    } else {
                        $(messageHtml).find('.errorMessage').removeClass('hide');
                        setTimeout(function() {
                            $(messageHtml).find('.errorMessage').addClass('hide');
                        }, 5000);
                        return false;
                    }

                    if ($(inputField).attr('type') != 'password') {
                        messageTobeDisplayed = messageTobeDisplayed + $(inputField).attr('title') + ':' + $(inputField).val();
                    } else {
                        if (i > 0 && i < inputFields.length) {
                            messageTobeDisplayed = messageTobeDisplayed + ' , ';
                        }
                        messageTobeDisplayed = messageTobeDisplayed + $(inputField).attr('title') + ' : ' + $(inputField).val().replace(/\w/g, "*");
                    }
                }
                chatWindowInstance.sendMessage(JSON.stringify(payload), messageTobeDisplayed, {}, true);
                $(messageHtml).find('.formMainComponent').css({
                    'pointer-events': 'none'
                });
                $(messageHtml).find('.formMainComponent .formBody').css({
                    'display': 'none'
                });
                $(messageHtml).find('.formMainComponent .btn-group').css({
                    'display': 'none'
                });
            }

        });
        $(messageHtml).find('.btn-group ').off('click', '.btn-url-postback').on('click', '.btn-url-postback', function(e: any) {
            let type = $(e.currentTarget).attr('type');
            if (type === 'url') {
                me.valueClick($(e.currentTarget));
            } else if (type == 'postback') {
                let payload = $(e.currentTarget).attr('value') || $(e.currentTarget).attr('title');
                let messageTobeDisplayed = $(e.currentTarget).attr('title')
                chatWindowInstance.sendMessage(payload, messageTobeDisplayed);
                $(messageHtml).find('.formMainComponent').css({
                    'pointer-events': 'none'
                });
                $(messageHtml).find('.formMainComponent .formBody').css({
                    'display': 'none'
                });
                $(messageHtml).find('.formMainComponent .btn-group').css({
                    'display': 'none'
                });
            }
        });

    }

    valueClick(_self: any, actionObj: any) {
		let me: any = this;
		let chatWindowInstance = me.hostInstance;
		let $ = me.hostInstance.$;
		let _innerText;
		if (actionObj) {
			if (actionObj.type === "url") {
				window.open(actionObj.url, "_blank");
				return;
			}
			if (actionObj.payload) {
				_innerText = actionObj.payload;
				let eData: any = {};
				eData.payload = _self.innerText || actionObj.title;
				//chatWindowInstance.assignValueToInput()
				chatWindowInstance.sendMessage(_innerText,{renderMsg:eData.payload});
			}
			if (_self && _self.hasClass("dropdown-contentWidgt")) {
				$(_self).hide();
			}
		} else {
			if ($(_self).attr('data-url') || $(_self).attr('url')) {
				let a_link = $(_self).attr('data-url') || $(_self).attr('url');
				if (a_link.indexOf("http:") < 0 && a_link.indexOf("https:") < 0) {
					a_link = "http:////" + a_link;
				}
				window.open(a_link, "_blank");
			} else {
				_innerText = $(_self).attr('data-value');
				let postBack = $(_self).attr('data-title');
				//chatWindowInstance.assignValueToInput(_innerText)
				chatWindowInstance.sendMessage(_innerText,{renderMsg:postBack});
				$(".kore-action-sheet .list-template-sheet").animate({ height: 'toggle' });
				chatWindowInstance.bottomSliderAction("hide");
				$(".listViewTmplContentBox").css({ "pointer-events": "none" });
			}
		}

	}

    getTemplateString() {
        let formTemplate = '<script id="chat_form_tmpl" type="text/x-jqury-tmpl"> \
        {{if msgData.message}} \
        <li {{if msgData.type !== "bot_response"}} id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
            <div class="buttonTmplContent"> \
            {{if msgData.createdOn}}<div class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                {{if msgData.icon}}<div class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
               <div class="{{if msgData.message[0].component.payload.fromHistory}} dummy messageBubble {{else}}messageBubble{{/if}}"> \
                    <div class="formMainComponent">\
                      {{if msgData.message[0].component.payload.heading}}<div class="templateHeading">${msgData.message[0].component.payload.heading}</div>{{else}}Submit Form{{/if}}\
                        <form>\
                           <div class="formBody">\
                               {{each(key, msgItem) msgData.message[0].component.payload.formFields}} \
                                    <div class="input_group">\
                                        <div class="input_label">${msgItem.label} : </div>\
                                        <div class="inputMainComponent">\
                                            <div class="input-btn-submit">\
                                                <input type="${msgItem.type}" class="form-control {{if msgItem.inputType ==="number"}}allow-only-numbers{{/if}}" id="${msgItem.key}" {{if msgItem.maxLength}}maxlength="${msgItem.maxLength}"{{/if}} name="${key}" {{if msgItem.piiReductionChar}}piiReductionChar="${msgItem.piiReductionChar}"{{/if}} title="${msgItem.label}" placeholder="${msgItem.placeholder}" value=""/>\
                                            </div>\
                                            {{if msgData?.message[0]?.component?.payload?.formFields[0]?.fieldButton?.title}} \
                                                <div id="submit" class="submit" value={{if msgData.message[0].component.payload.text}} "${msgData.message[0].component.payload.text}"{{/if}} >\
                                                    <div class="ok_btn" value="${msgData?.message[0]?.component?.payload?.formFields[0]?.fieldButton?.title}">${msgData?.message[0]?.component?.payload?.formFields[0]?.fieldButton?.title}</div>\
                                                </div>\
                                            {{/if}}\
                                        </div>\
                                    </div>\
                                {{/each}} \
                            </div>\
                            <div class="errorMessage hide"></div>\
                       </form>\
                       {{if msgData.message[0].component.payload.buttons}}\
                            <div class="btn-group">\
                                {{each(btnKey, btn) msgData.message[0].component.payload.buttons}}\
                                    {{if btn && ((btn.type !== "url") && (btn.type !== "postback")) || !btn.type}}\
                                        <button class="btn-info" type="${btn.type}">${btn.title}</button>\
                                    {{else  ((btn.type == "url") || (btn.type == "postback"))}}\
                                        <button class="btn-url-postback" type="${btn.type}" {{if btn.type=="url"}}url="${btn.url}"{{else btn.type=="postback"}}value="${btn.payload}"{{/if}} title="${btn.title}">${btn.title}</button>\
                                    {{/if}}\
                                {{/each}}\
                            </div>\
                        {{/if}}\
                    </div>\
               </div>\
            </div>\
        </li> \
        {{/if}} \
        </script>';
        return formTemplate;
    }

}

export default FormTemplate;