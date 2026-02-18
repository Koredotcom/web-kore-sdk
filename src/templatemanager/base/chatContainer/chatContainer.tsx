

import './chatContainer.scss';
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { ChatWidget } from '../chatWidget/chatWidget';

export function ChatContainer(props: any) {

    const hostInstance = props.hostInstance;
    const [brandingInfo, updateBrandingInfo] = useState(hostInstance.config.branding);
    hostInstance.on('onBrandingUpdate', function (event: any) {
        updateBrandingInfo({...event.brandingData})
    });

    let chatContainerClass = 'kore-chat-window-main-section';
        chatContainerClass = chatContainerClass + ' custom-template-open';
    if (brandingInfo.chat_bubble.icon.size == 'medium') {
        chatContainerClass = chatContainerClass + ' avatar-medium-size';
    } else if (brandingInfo.chat_bubble.icon.size == 'large') {
        chatContainerClass = chatContainerClass + ' avatar-large-size';
    }

    if (brandingInfo.general.widgetPanel) {
        chatContainerClass = chatContainerClass + ' is-wigets-enabled';
    }

    return (
        <div className={chatContainerClass} aria-label='chat-window-section'>
            <div className="kr-wiz-menu-chat defaultTheme-kore"></div>
            <ChatWidget {...props} />
            <div className="kr-wiz-content-chat"></div>
        </div>

    );

}