

import './chatWidget.scss';
import { h } from 'preact';
import { ChatWidgetHeader } from '../chatWidgetHeader/chatWidgetHeader';
import { ChatWidgetBody } from '../chatWidgetBody/chatWidgetBody';
import { ChatWidgetComposeBar } from '../chatWidgetComposeBar/chatWidgetComposeBar';
export function ChatWidget(props: any) {

    return (
        <div className='chat-widgetwrapper-main-container'>
            <ChatWidgetHeader {...props}/>
            <ChatWidgetBody />
            <ChatWidgetComposeBar {...props} />
        </div>
    );
}