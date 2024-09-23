
import helpers from '../../../utils/helpers';
import './templateAttachment.scss';

class TemplateAttachment {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;
        let extension = '';
        let extractedFileName;
        if (msgData?.message?.[0]?.component?.payload?.name) {
            extension = msgData.message[0].component.payload.name.split('.');
            extractedFileName = extension[0];
        }
        if (msgData?.message?.[0]?.component?.payload && (msgData.message[0].component.type == 'image' || msgData.message[0].component.type == 'audio' || msgData.message[0].component.type == 'video' || msgData.message[0].component.type == 'link')) {
            me.messageHtml = $(me.getTemplateString()).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers,
                'extension':extension,
                'extractedFileName': extractedFileName
            });
            me.bindEvents(me.messageHtml);
            return me.messageHtml;
        }
    }
    bindEvents(messageHtml:any) {
        let me :any = this;
        let $ = me.hostInstance.$;
        $(messageHtml).off('click', '.botResponseAttachments').on('click', '.botResponseAttachments', function (event: any) {
            event.preventDefault();
            event.stopPropagation();
            let selectedTarget = event.currentTarget;
            window.open($(selectedTarget).attr('fileid'), '_blank');
        });
    }
    getTemplateString() {
        var templateAttachment = '<script id="chat_attachment_tmpl" type="text/x-jqury-tmpl"> \
        {{if msgData.message}} \
            {{each(key, msgItem) msgData.message}} \
                {{if msgItem.component && msgItem.component.payload.url}} \
                    <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}" data-kr-msg-id="${msgData.messageId || msgItem.clientMessageId}"\
                        class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} {{if msgData.icon}}with-icon{{/if}}"> \
                        {{if msgData.createdOn}}<div class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                        {{if msgData.icon}}<div class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                        <div class="messageBubble">\
                            {{if msgItem.component.payload.url}} \
                                <div class="msgCmpt botResponseAttachments"  download="${msgItem.component.payload.download}" fileid="${msgItem.component.payload.url}"> \
                                    <div class="uploadedFileIcon"> \
                                        {{if msgItem.component.type == "image"}} \
                                        <img class="image-size" src="${msgItem.component.payload.url}"> \
                                        {{else msgItem.component.type == "audio"}}\
                                            <span class="icon cf-icon icon-files_audio"></span> \
                                        {{else msgItem.component.type == "video"}} \
                                            <span class="icon cf-icon icon-video_active"></span> \
                                        {{else}} \
                                            {{if extension[1]=="xlsx" || extension[1]=="xls" || extension[1]=="docx" || extension[1]=="doc" || extension[1]=="pdf" || extension[1]=="ppsx" || extension[1]=="pptx" || extension[1]=="ppt" || extension[1]=="zip" || extension[1]=="rar"}}\
                                                <span class="icon cf-icon icon-files_${extension[1]}"></span> \
                                            {{else extension[1]}}\
                                                <span class="icon cf-icon icon-files_other_doc"></span> \
                                            {{/if}}\
                                        {{/if}}\
                                    </div> \
                                    <div class="botuploadedFileName">${extractedFileName}</div> \
                                </div> \
                            {{/if}} \
                        </div> \
                    </li> \
                {{/if}} \
            {{/each}} \
        {{/if}} \
    </scipt>';
        return templateAttachment;
    }

}

export default TemplateAttachment;