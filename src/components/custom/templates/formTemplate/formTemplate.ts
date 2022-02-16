
import helpers from '../../../../../src/utils/helpers';
import  './formTemplate.scss';
class FormTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;

        if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "form_template") {
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
            var inputForm_id = $(e.currentTarget).closest('.buttonTmplContent').find(".formMainComponent .formBody");
            var parentElement = $(e.currentTarget).closest(".fromOtherUsers.with-icon");
            var messageData = $(parentElement).data();
            var selectedValue: any;
            if (messageData.tmplItem.data.msgData.message[0].component.payload) {
                messageData.tmplItem.data.msgData.message[0].component.payload.ignoreCheckMark = true;
                var msgData = messageData.tmplItem.data.msgData;
            }

            if (inputForm_id.find("#email").val() == "") {
                $(parentElement).find(".buttonTmplContent").last().find(".errorMessage").removeClass("hide");
                $(".errorMessage").text("Please enter value");
            }
            else if (inputForm_id.find("input[type='password']").length != 0) {
                var textPwd = inputForm_id.find("#email").val();
                var passwordLength = textPwd.length;
                selectedValue = "";
                for (var i = 0; i < passwordLength; i++) {
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
    }
    getTemplateString() {
        var formTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
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
                            {{if msgData.message[0].component.payload.formFields[0].label}}<div class="input_label">${msgData.message[0].component.payload.formFields[0].label} : </div>{{/if}}\
                                    <div class="inputMainComponent">\
                                     <div class="input-btn-submit">\
                                          <input type="${msgItem.type}" class="form-control" id="email" name="email" placeholder="${msgItem.placeholder}" value=""/>\
                                     </div>\
                                     <div id="submit" class="submit" value={{if msgData.message[0].component.payload.text}} "${msgData.message[0].component.payload.text}"{{/if}} >\
                                         <div class="ok_btn" value="${msgData.message[0].component.payload.formFields[0].fieldButton.title}">${msgData.message[0].component.payload.formFields[0].fieldButton.title}</div>\
                                     </div>\
                                     </div>\
                                    </div>\
                                    {{/each}} \
                               </div>\
                                 <div class="errorMessage hide"></div>\
                       </form>\
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