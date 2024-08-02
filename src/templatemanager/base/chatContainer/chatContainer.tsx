

import './chatContainer.scss';
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { ChatWidget } from '../chatWidget/chatWidget';
import { AvatarComponent } from '../avatarComponent/avatarComponent';
import { WelcomeScreenContainer } from '../../base/welcomeScreenContainer/welcomeScreenContainer';


export function ChatContainer(props: any) {

    const hostInstance = props.hostInstance;
    const [brandingInfo, updateBrandingInfo] = useState(hostInstance.config.branding);
    hostInstance.on('onBrandingUpdate', function (event: any) {
        updateBrandingInfo({...event.brandingData})
    });

    let chatContainerClass = 'kore-chat-window-main-section minimize-chat';
    if (brandingInfo.chat_bubble.icon.size == 'medium') {
        chatContainerClass = chatContainerClass + ' avatar-medium-size';
    } else if (brandingInfo.chat_bubble.icon.size == 'large') {
        chatContainerClass = chatContainerClass + ' avatar-large-size';
    }

    if (brandingInfo.general.widgetPanel) {
        chatContainerClass = chatContainerClass + ' is-wigets-enabled';
    }

    useEffect(() => {
        hostInstance.emit('renderComplete', { chatEle: hostInstance.chatEle });
    });

    return (
        <div className={chatContainerClass} aria-label='chat-window-section'>
            <div className="kr-wiz-menu-chat defaultTheme-kore"></div>
            <AvatarComponent {...props} />
            <ChatWidget {...props} />
            { brandingInfo.welcome_screen.show &&
                <WelcomeScreenContainer {...props} />
            }
            <div className="kr-wiz-content-chat"></div>
        </div>

    );

}