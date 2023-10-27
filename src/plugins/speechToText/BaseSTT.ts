class BaseSTT {
    hostInstance: any; 
    
    appendPickerHTMLtoChatWindowFooter(pickerHTML: any) {
        let me:any = this;
        let chatWindowInstance = me.hostInstance;
        const _chatContainer = chatWindowInstance.chatEle;
        if (chatWindowInstance.config.UI.version == 'v2') {
            _chatContainer.find('.kore-chat-footer .footerContainer').append(pickerHTML);
        }
    }
    installSpeechToTextTemplate() {
        let me:any = this;
        let $ = me.hostInstance.$;
        if (me.hostInstance.config.UI.version == 'v2') {
            me.pickerHTML = $(me.getSpeechToTextTemplateString());
            me.appendPickerHTMLtoChatWindowFooter(me.pickerHTML);
            me.bindEvents();
        }
        me.hostInstance.config.UI.version == 'v3' && me.bindEventsV3()
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

    bindEventsV3() {
        let me: any = this;
        let chatEle = me.hostInstance.chatEle;
        chatEle.querySelector('.voice-compose-btn').addEventListener('click', () => {
            if(me.onRecordButtonClick){
                me.onRecordButtonClick();
            }
            chatEle.querySelector('.compose-voice-text').style.display = 'none';
            chatEle.querySelector('.compose-voice-text-recording').style.display = 'block';
            if (chatEle.querySelector('.hamberger-menu')) {
                chatEle.querySelector('.hamberger-menu').style.display = 'none';
            }
            if (chatEle.querySelector('.attachmentUpload')) {
                chatEle.querySelector('.attachmentUpload').style.display = 'none';
            }
            if (chatEle.querySelector('.emoji-btn')) {
                chatEle.querySelector('.emoji-btn').style.display = 'none';
            }
            chatEle.querySelector('.key-board').style.display = 'none';
        });

        chatEle.querySelector('.voice-compose-btn-recording').addEventListener('click', () => {
            if (chatEle.querySelector('.voice-msg-bubble').textContent.trim() !== '') {
                me.stop();
                setTimeout(function () {
                    me.setCaretEnd(chatEle.getElementsByClassName('voice-msg-bubble'));
                }, 350);
                chatEle.querySelector('.compose-voice-text-recording').style.display = 'none';
                chatEle.querySelector('.compose-voice-text-end').style.display = 'block';
                chatEle.querySelector('.voice-msg-bubble').classList.add('speak-done-bg');
            }
        });

        chatEle.querySelector('.voice-compose-btn-end').addEventListener('click', () => {
            if (chatEle.querySelector('.voice-msg-bubble').textContent.trim() !== '') {
                chatEle.querySelector('.voice-msg-bubble').classList.remove('speak-done-bg');
                me.hostInstance.sendMessageToBot(chatEle.querySelector(".voice-msg-bubble").textContent);
                chatEle.querySelector('.voice-msg-bubble').textContent = '';
                chatEle.querySelector('.voice-speak-msg-info').style.display = 'none';
                chatEle.querySelector('.compose-voice-text-end').style.display = 'none';
                chatEle.querySelector('.compose-voice-text').style.display = 'block';
                if (chatEle.querySelector('.hamberger-menu')) {
                    chatEle.querySelector('.hamberger-menu').style.display = 'flex';
                }
                if (chatEle.querySelector('.attachmentUpload')) {
                    chatEle.querySelector('.attachmentUpload').style.display = 'flex';
                }
                if (chatEle.querySelector('.emoji-btn')) {
                    chatEle.querySelector('.emoji-btn').style.display = 'flex';
                }
                chatEle.querySelector('.key-board').style.display = 'block';
            }
        });

        chatEle.querySelector('.cancel-sepak').addEventListener('click', () => {
            me.stop();
            chatEle.querySelector('.voice-msg-bubble').textContent = '';
            chatEle.querySelector('.voice-speak-msg-info').style.display = 'none';
            chatEle.querySelector('.compose-voice-text-recording').style.display = 'none';
            chatEle.querySelector('.compose-voice-text').style.display = 'block';
            if (chatEle.querySelector('.hamberger-menu')) {
                chatEle.querySelector('.hamberger-menu').style.display = 'flex';
            }
            if (chatEle.querySelector('.attachmentUpload')) {
                chatEle.querySelector('.attachmentUpload').style.display = 'flex';
            }
            if (chatEle.querySelector('.emoji-btn')) {
                chatEle.querySelector('.emoji-btn').style.display = 'flex';
            }
            chatEle.querySelector('.key-board').style.display = 'block';
        });

        chatEle.querySelector('.remove-voice-text').addEventListener('click', () => {
            chatEle.querySelector('.voice-msg-bubble').textContent = '';
            chatEle.querySelector('.voice-speak-msg-info').style.display = 'none';
            if (me.recognizing) {
                me.stop();
                chatEle.querySelector('.compose-voice-text-recording').style.display = 'none';
                chatEle.querySelector('.compose-voice-text').style.display = 'block';
                if (chatEle.querySelector('.hamberger-menu')) {
                    chatEle.querySelector('.hamberger-menu').style.display = 'flex';
                }
                if (chatEle.querySelector('.attachmentUpload')) {
                    chatEle.querySelector('.attachmentUpload').style.display = 'flex';
                }
                if (chatEle.querySelector('.emoji-btn')) {
                    chatEle.querySelector('.emoji-btn').style.display = 'flex';
                }
                chatEle.querySelector('.key-board').style.display = 'block';
            } else {
                chatEle.querySelector('.voice-msg-bubble').classList.remove('speak-done-bg');
                chatEle.querySelector('.compose-voice-text-end').style.display = 'none';
                chatEle.querySelector('.compose-voice-text-recording').style.display = 'block';
                me.onRecordButtonClick();
            }
        });
    }
}
export default BaseSTT;