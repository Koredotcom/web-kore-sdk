

import './chatContainer.scss';
import { h } from 'preact';
import { ChatWidget } from '../chatWidget/chatWidget';
import { AvatarComponent } from '../avatarComponent/avatarComponent';
import { WelcomeScreenContainer } from '../../base/welcomeScreenContainer/welcomeScreenContainer';


export function ChatContainer(props: any) {

    return (
        <div class='chat-window-main-section' aria-label='chat-window-section'>
            <ChatWidget />
            <WelcomeScreenContainer {...props} />
            <AvatarComponent />
        </div>

    );

}