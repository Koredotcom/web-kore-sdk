import { h, Fragment } from 'preact';
import { useEffect } from 'preact/hooks';
import BaseChatTemplate from '../../../../templatemanager/templates/baseChatTemplate';
export function QuickChat(props: any) {
    const msgData = props.msgData;
    const hostInstance = props.hostInstance;
    const experienceFlowId = msgData.body?.campInfo?.experienceFlow;
    
    useEffect(() => {
        openChatWithFlowId();
    }, []);

    const openChatWithFlowId = () => {
        try {
            // Set flag to indicate PWE chat is triggered
            hostInstance.isWelcomeScreenOpened = true;
            hostInstance.plugins.ProactiveWebCampaignPlugin.isPWEChatTriggered = 'quickchat';
            hostInstance.plugins.ProactiveWebCampaignPlugin.pwcFlowId = experienceFlowId || '';

            hostInstance.chatEle.classList.remove('minimize-chat');
            const avatarVariationsFooter = hostInstance.chatEle.querySelector('.avatar-variations-footer');
            if (avatarVariationsFooter) {
                avatarVariationsFooter.classList.add('avatar-minimize');
            }

            const avatarBg = hostInstance.chatEle.querySelector('.avatar-bg');
            if (avatarBg) {
                avatarBg.classList.add('click-to-rotate-icon');
            }

            const chatContainer = hostInstance.chatEle.querySelector('.chat-widgetwrapper-main-container');
            if (chatContainer) {
                chatContainer.classList.add(hostInstance.config.branding.chat_bubble.expand_animation);
            }

            if (hostInstance.config.multiPageApp && hostInstance.config.multiPageApp.enable) {
                hostInstance.setLocalStoreItem('kr-cw-state', 'open');
            }

            hostInstance.bot.RtmClient._safeDisconnect();
            hostInstance.bot.logInComplete();

            if (experienceFlowId) {
                let messageSent = false;

                const sendQuickChatMessage = () => {
                    if (messageSent) return;
                    messageSent = true;

                    try {

                        hostInstance.config.botOptions.botInfo.customData =
                            {
                                callFlowId: experienceFlowId,
                                state: "published"
                            };
                        hostInstance.bot.sendMessage({
                            type: 'event',
                            eventType: 'quickChatTrigger',
                            flowId: experienceFlowId,
                            campInstanceId: msgData.body.campInfo.campInstId
                        });
                        delete hostInstance.config.botOptions.botInfo.customData;
                    } catch (error) {
                        console.error('PWC QuickChat: Error triggering experience flow', error);
                    }
                };

                if (hostInstance.bot?.initialized && hostInstance.bot?.RtmClient?.connected) {
                    sendQuickChatMessage();
                } else {
                    hostInstance.bot.once('open', sendQuickChatMessage);

                    setTimeout(() => {
                        if (!messageSent && hostInstance.bot?.initialized && hostInstance.bot?.RtmClient?.connected) {
                            sendQuickChatMessage();
                        }
                    }, 5000);
                }
            }
        } catch (error) {
            console.error('PWC QuickChat: Error opening chat', error);
        }
    };

    return null;
}

class PWCQuickChatTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        if (msgData.type === 'pwe_message' && 
            msgData.body.campInfo?.webCampaignType && 
            msgData.body.campInfo?.webCampaignType === 'quickchat') {
            return this.getHTMLFromPreact(QuickChat, msgData, this.hostInstance);
        }
        return null;
    }
}

export default PWCQuickChatTemplate;
