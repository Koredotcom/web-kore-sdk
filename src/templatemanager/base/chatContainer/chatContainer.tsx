

import './chatContainer.scss';
import { h } from 'preact';
import { render } from 'preact'
import { AvatarComponent } from '../avatarComponent/avatarComponent';
import { ChatWidget } from '../chatWidget/chatWidget';
import { ChatWidgetHeader } from '../chatWidgetHeader/chatWidgetHeader';
import { ChatWidgetBody } from '../chatWidgetBody/chatWidgetBody';
import { ChatWidgetComposeBar } from '../chatWidgetComposeBar/chatWidgetComposeBar';

export function ChatContainer(props: any) {

    return (
        <div class='chat-window-main-section' aria-label='chat-window-section'>
            <div class="minimized-chat-title">Talk to Bot</div>
            <div class="minimized-chat"><figure>
                <img src="/images/avatar.svg" alt="Elephant at sunset" />
            </figure></div>
            {/* <AvatarComponent /> */}
            {/* <ChatWidget /> */}
            <ChatWidgetHeader />
            <ChatWidgetBody />
            <ChatWidgetComposeBar props={props} />

        </div>
    );

}