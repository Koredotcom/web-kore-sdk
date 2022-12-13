class BaseSTT {
    hostInstance: any; 
    
    appendPickerHTMLtoChatWindowFooter(pickerHTML: any) {
        let me:any = this;
        let chatWindowInstance = me.hostInstance;
        const _chatContainer = chatWindowInstance.chatEle;
        _chatContainer.find('.kore-chat-footer .footerContainer').append(pickerHTML);
    }
    installSpeechToTextTemplate() {
        let me:any = this;
        let $ = me.hostInstance.$;
        me.pickerHTML = $(me.getSpeechToTextTemplateString());
        me.appendPickerHTMLtoChatWindowFooter(me.pickerHTML);
        me.bindEvents();
    }
    getSpeechToTextTemplateString() {
        var speechToTextTemplate = '<div class="sdkFooterIcon microphoneBtn"> \
        <button class="notRecordingMicrophone" title="Microphone On"> \
            <i class="microphone"></i> \
        </button> \
        <button class="recordingMicrophone" title="Microphone Off" > \
            <i class="microphone"></i> \
            <span class="recordingGif"></span> \
        </button> \
        <div id="textFromServer"></div> \
    </div>';
        return speechToTextTemplate
    }
    bindEvents() {
        let me:any = this;
        let $ = me.hostInstance.$;
        $(me.pickerHTML).on('click', '.notRecordingMicrophone', function (event: any) {
            if(me.onRecordButtonClick){
                me.onRecordButtonClick();
            }
        });
        $(me.pickerHTML).on('click', '.recordingMicrophone', function (event: any) {
            me.stop();
            setTimeout(function () {
                me.setCaretEnd(document.getElementsByClassName("chatInputBox"));
            }, 350);
        });
    }
}
export default BaseSTT;