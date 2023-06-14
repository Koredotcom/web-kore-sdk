

import './chatWidget.scss';
import { h } from 'preact';
import { ChatWidgetHeader } from '../chatWidgetHeader/chatWidgetHeader';
export function ChatWidget() {

    return (
        <div className='chat-widgetwrapper-main-container'>
            <ChatWidgetHeader />
        </div>
    );
}