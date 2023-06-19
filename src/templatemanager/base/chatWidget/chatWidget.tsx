

import './chatWidget.scss';
import { h } from 'preact';
import { AvatarComponent } from '../avatarComponent/avatarComponent';
import { ChatContainer } from '../chatContainer/chatContainer';
export function ChatWidget() {

    return (
        <div className='chat-widgetwrapper-main-container'>
            <AvatarComponent />
            <ChatContainer />
        </div>
    );
}