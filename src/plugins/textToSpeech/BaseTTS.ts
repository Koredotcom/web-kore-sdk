class BaseTTS {
    hostInstance: any;

    appendPickerHTMLtoChatWindowFooter(pickerHTML: any) {
        let me: any = this;
        let chatWindowInstance = me.hostInstance;
        const _chatContainer = chatWindowInstance.chatEle;
        _chatContainer.find('.kore-chat-footer .footerContainer').append(pickerHTML);
    }

    installTextToSpeechTemplate() {
        let me: any = this;
        let $ = me.hostInstance.$;
        me.pickerHTML = $(me.getTextToSpeechTemplateString());
        me.appendPickerHTMLtoChatWindowFooter(me.pickerHTML);
        me.bindEvents();
    }

    getTextToSpeechTemplateString() {
        var textToSpeechTemplate = '<div class="sdkFooterIcon ttspeakerDiv ttsOff"> \
        <button class="ttspeaker" title="Talk to speak"> \
            <span class="ttsSpeakerEnable"></span> \
            <span class="ttsSpeakerDisable"></span> \
            <span style="display:none;"><audio id="ttspeaker" controls="" autoplay="" name="media"><source src="" type="audio/wav"></audio></span>\
        </button> \
    </div> ';
        return textToSpeechTemplate
    }
    
    
    bindEvents() {
        let me: any = this;
        let $ = me.hostInstance.$;
        $(me.pickerHTML).on('click', '.ttspeaker', function (event: any) {
            if(me.OnSpeakerButtonClick){
                me.OnSpeakerButtonClick();
            }
        });
    }
}

export default BaseTTS;