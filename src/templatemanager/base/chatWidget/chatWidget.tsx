

import './chatWidget.scss';
import { h } from 'preact';
import { ChatWidgetHeader } from '../chatWidgetHeader/chatWidgetHeader';
import { ChatWidgetBody } from '../chatWidgetBody/chatWidgetBody';
import { ChatWidgetComposeBar } from '../chatWidgetComposeBar/chatWidgetComposeBar';
import { ClickToCallComponent } from '../clickToCall/clickToCallComponent';
import { useState } from 'preact/hooks';
export function ChatWidget(props: any) {

    const [showClickToCallWidget, setShowClickToCallWidget] = useState(false);

    return (
        <div className='chat-widgetwrapper-main-container'>
            <ChatWidgetHeader {...props}/>
            <ChatWidgetBody />
            <ChatWidgetComposeBar {...props} setShowClickToCallWidget={setShowClickToCallWidget} />
            {showClickToCallWidget && <ClickToCallComponent {...props} setShowClickToCallWidget={setShowClickToCallWidget} />}
        </div>
    );
}