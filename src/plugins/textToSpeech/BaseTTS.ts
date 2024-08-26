class BaseTTS {
    hostInstance: any;
    isSpeakerOn: boolean = false;

    appendPickerHTMLtoChatWindowFooter(pickerHTML: any) {
        let me: any = this;
        let chatWindowInstance = me.hostInstance;
        const _chatContainer = chatWindowInstance.chatEle;
        if (chatWindowInstance.config.UI.version == 'v2') {
            _chatContainer.find('.kore-chat-footer .footerContainer').append(pickerHTML);
        }
    }

    installTextToSpeechTemplate() {
        let me: any = this;
        let $ = me.hostInstance.$;
        if (me.hostInstance.config.UI.version == 'v2') {
            me.pickerHTML = $(me.getTextToSpeechTemplateString());
            me.appendPickerHTMLtoChatWindowFooter(me.pickerHTML);
            me.bindEvents();
        } else {
            me.bindEventsV3();
        }
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

    bindEventsV3() {
        let me: any = this;
        let chatEle = me.hostInstance.chatEle;
        chatEle.querySelector('.speaker-btn-mute').addEventListener('click', () => {
            me.isSpeakerOn = true;
            if(me.OnSpeakerButtonClick){
                me.OnSpeakerButtonClick();
            }
            chatEle.querySelector('.speaker-btn-mute').classList.remove('show');
            chatEle.querySelector('.speaker-btn-mute').classList.add('hide');
            chatEle.querySelector('.speaker-btn-speak').classList.remove('hide');
            chatEle.querySelector('.speaker-btn-speak').classList.add('show');
        });

        chatEle.querySelector('.speaker-btn-speak').addEventListener('click', () => {
            me.isSpeakerOn = false;
            var synth = window.speechSynthesis;
            synth.pause();
            chatEle.querySelector('.speaker-btn-speak').classList.remove('show');
            chatEle.querySelector('.speaker-btn-speak').classList.add('hide');
            chatEle.querySelector('.speaker-btn-mute').classList.remove('hide');
            chatEle.querySelector('.speaker-btn-mute').classList.add('show');
        });
    }
}

export default BaseTTS;