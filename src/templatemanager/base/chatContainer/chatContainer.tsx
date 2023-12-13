

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
        console.count('Branding Call');
        console.log('Branding Data: ', event.brandingData);
        updateBrandingInfo({...event.brandingData})
    });

    const themeType: any = {
        light: 'chat-window-main-section minimize-chat light-theme',
        dark: 'chat-window-main-section minimize-chat dark-theme'
    }

    return (
        <div className={themeType[brandingInfo.general.themeType]} aria-label='chat-window-section'>
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