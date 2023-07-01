

import './chatContainer.scss';
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { ChatWidget } from '../chatWidget/chatWidget';
import { AvatarComponent } from '../avatarComponent/avatarComponent';
import { WelcomeScreenContainer } from '../../base/welcomeScreenContainer/welcomeScreenContainer';


export function ChatContainer(props: any) {

    const hostInstance = props.hostInstance;
    const [brandingInfo, updateBrandingInfo] = useState(hostInstance.config.branding);
    hostInstance.on('onBrandingUpdate', function (event: any) {
        console.log('Branding Data: ', event.brandingData);
        updateBrandingInfo(event.brandingData)
    });    return (
        <div class='chat-window-main-section default-theme' aria-label='chat-window-section'>
            <ChatWidget {...props} />
            { brandingInfo.welcome_screen.show &&
                <WelcomeScreenContainer {...props} />
            }
            <AvatarComponent {...props} />
        </div>

    );

}