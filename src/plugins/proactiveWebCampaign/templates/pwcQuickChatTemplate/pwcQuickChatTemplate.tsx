import { h, Fragment } from 'preact';
import { useEffect } from 'preact/hooks';
import BaseChatTemplate from '../../../../templatemanager/templates/baseChatTemplate';
import './pwcQuickChatTemplate.scss';

export function QuickChat(props: any) {
    const msgData = props.msgData;
    const hostInstance = props.hostInstance;
    const experienceFlowId = msgData.body?.campInfo?.experienceFlow; // Get from campInfo, not layoutDesign
    
    useEffect(() => {
        // Auto-open chat immediately when component mounts
        openChatWithFlowId();
    }, []);

    const openChatWithFlowId = () => {
        try {
            // Set flag to indicate PWE chat is triggered
            hostInstance.isWelcomeScreenOpened = true;
            hostInstance.plugins.ProactiveWebCampaignPlugin.isPWEChatTriggered = 'quickchat';
            hostInstance.plugins.ProactiveWebCampaignPlugin.pwcFlowId = experienceFlowId || '';
            
            // Open chat window
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
            
            // Handle multi-page app state
            if (hostInstance.config.multiPageApp && hostInstance.config.multiPageApp.enable) {
                hostInstance.setLocalStoreItem('kr-cw-state', 'open');
            }
            
            // Reconnect bot
            hostInstance.bot.RtmClient._safeDisconnect();
            hostInstance.bot.logInComplete();
            // Trigger experience flow if available
            if (experienceFlowId) {
                // Send the flow trigger to backend after bot is ready
                setTimeout(() => {
                    try {
                        // Trigger experience flow and pass callFlowId in botInfo.customData
                        hostInstance.bot.sendMessage({
                            type: 'event',
                            eventType: 'quickChatTrigger',
                            flowId: experienceFlowId,
                            campInstanceId: msgData.body.campInfo.campInstId,
                            botInfo: {
                                customData: [
                                    {
                                        callFlowId: experienceFlowId
                                    }
                                ]
                            }
                        });
                    } catch (error) {
                        console.error('PWC QuickChat: Error triggering experience flow', error);
                    }
                }, 800);
            }
        } catch (error) {
            console.error('PWC QuickChat: Error opening chat', error);
        }
    };

    // This component doesn't render anything visible - it just triggers the chat opening
    // Return null since the chat window itself handles the UI
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
