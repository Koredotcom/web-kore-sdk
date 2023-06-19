

import './chatContainer.scss';
import { h } from 'preact';
import { ChatWidgetHeader } from '../chatWidgetHeader/chatWidgetHeader';
import { ChatWidgetBody } from '../chatWidgetBody/chatWidgetBody';
import { ChatWidgetComposeBar } from '../chatWidgetComposeBar/chatWidgetComposeBar';

export function ChatContainer(props: any) {

    return (
        <div class='chat-window-main-section' aria-label='chat-window-section'>
            <ChatWidgetHeader />
            <ChatWidgetBody />
            <ChatWidgetComposeBar props={props} />
        </div>
    );

}