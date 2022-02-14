
import helpers from '../../../../utils/helpers';
import './messageTemplate.scss';

class MessageTemplate {

    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.cwInstance.$;
        let helpersObj = helpers;
        let chatWindowInstance = me.cwInstance;
        if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.formData && msgData.message[0].component.payload.formData.renderType === 'inline') {
            msgData.renderType = 'inline';
            me.messageHtml = chatWindowInstance.renderWebForm(msgData, true);
        } else if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == 'live_agent') {
            msgData.fromAgent = true;

            if (msgData.message[0].component && msgData.message[0].component.payload) {
                msgData.message[0].cInfo.body = msgData.message[0].component.payload.text || '';
            }
            me.messageHtml = $(me.getTemplateString('message')).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers
            });
        } else {
            me.messageHtml = $(me.getTemplateString('message')).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers
            });
        }
        return me.messageHtml;

    }

    getTemplateString() {
        var msgTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
        {{if msgData.message}} \
            {{each(key, msgItem) msgData.message}} \
                {{if msgItem.cInfo && msgItem.type === "text"}} \
                    <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}"\
                         class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} {{if msgData.icon}}with-icon{{/if}} {{if msgData.fromAgent}}from-agent{{/if}}"> \
                        {{if msgData.createdOn}}<div aria-hidden="true" aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                        {{if msgData.icon}}<div aria-hidden="true"  aria-live="off" class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})" title="User Avatar"></div> </div> {{/if}} \
                        <div class="messageBubble" aria-live="assertive">\
                            <div> \
                                {{if msgData.type === "bot_response"}} \
                                    {{if msgItem.component  && msgItem.component.type =="error"}} \
                                        <span style="color:${msgItem.component.payload.color}">{{html helpers.convertMDtoHTML(msgItem.component.payload.text, "bot",msgItem)}} </span>\
                                    {{else}} \
                                        <span class="simpleMsg" {{if msgData}}msgData="${JSON.stringify(msgData)}" {{/if}}>{{html helpers.convertMDtoHTML(msgItem.cInfo.body, "bot",msgItem)}}</span> \
                                        {{if msgItem.component && msgItem.component.payload && msgItem.component.payload.videoUrl}}\
                                            <div class="videoEle"><video width="300" controls><source src="${msgItem.component.payload.videoUrl}" type="video/mp4"></video></div>\
                                        {{/if}}\
                                        {{if msgItem.component && msgItem.component.payload && msgItem.component.payload.audioUrl}}\
                                            <div class="audioEle"><audio width="180" controls><source src="${msgItem.component.payload.audioUrl}"></audio></div>\
                                        {{/if}}\
                                    {{/if}} \
                                {{else}} \
                                    {{if msgItem.cInfo.renderMsg && msgItem.cInfo.renderMsg !== ""}}\
                                        {{html helpers.convertMDtoHTML(msgItem.cInfo.renderMsg, "user",msgItem)}} \
                                    {{else}}\
                                        {{html helpers.convertMDtoHTML(msgItem.cInfo.body, "user",msgItem)}} \
                                    {{/if}}\
                                {{/if}} \
                            </div>\
                            {{if msgItem.cInfo && msgItem.cInfo.emoji}} \
                                <span class="emojione emojione-${msgItem.cInfo.emoji[0].code}">${msgItem.cInfo.emoji[0].title}</span> \
                            {{/if}} \
                            {{if msgItem.cInfo.attachments}} \
                                <div class="msgCmpt attachments" fileid="${msgItem.cInfo.attachments[0].fileId}"> \
                                    <div class="uploadedFileIcon"> \
                                        {{if msgItem.cInfo.attachments[0].fileType == "image"}} \
                                            <span class="icon cf-icon icon-photos_active"></span> \
                                        {{else msgItem.cInfo.attachments[0].fileType == "audio"}}\
                                            <span class="icon cf-icon icon-files_audio"></span> \
                                        {{else msgItem.cInfo.attachments[0].fileType == "video"}} \
                                            <span class="icon cf-icon icon-video_active"></span> \
                                        {{else}} \
                                            {{if extension[1]=="xlsx" || extension[1]=="xls" || extension[1]=="docx" || extension[1]=="doc" || extension[1]=="pdf" || extension[1]=="ppsx" || extension[1]=="pptx" || extension[1]=="ppt" || extension[1]=="zip" || extension[1]=="rar"}}\
                                                <span class="icon cf-icon icon-files_${extension[1]}"></span> \
                                            {{else extension[1]}}\
                                                <span class="icon cf-icon icon-files_other_doc"></span> \
                                            {{/if}}\
                                        {{/if}}\
                                    </div> \
                                    <div class="curUseruploadedFileName">${msgItem.cInfo.attachments[0].fileName}</div> \
                                </div> \
                            {{/if}} \
                            {{if msgData.isError}} \
                                <div class="errorMsg">Send Failed. Please resend.</div> \
                            {{/if}} \
                        </div> \
                    </li> \
                {{/if}} \
            {{/each}} \
        {{/if}} \
    </scipt>';
        return msgTemplate;
    }

}

export default MessageTemplate;