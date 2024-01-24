import BaseChatTemplate from '../../baseChatTemplate';
import './quickReply.css';
import { useState } from 'preact/hooks';
import { h, Fragment } from 'preact';
import { Message } from '../../message/message';

export function quickWelcome(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const [clickedButtons, setClickedButtons] = useState<string[]>([]);
    const handleQuickReply = (e: any) => {
        if (e.content_type.toLowerCase() == 'postback' || e.content_type.toLowerCase() == 'text') {
            hostInstance.sendMessage(JSON.stringify(e.payload) || e.value, { renderMsg: e.title });
        } else if (e.content_type == 'url' || e.content_type == 'web_url') {
            let link = e.url;
            if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
                link = `http:////${link}`;
            }
            hostInstance.openExternalLink(link);
        }
        setClickedButtons((prevClickedButtons) => [...prevClickedButtons, e.title]);
        // Disable all buttons with the class 'quick-buttons'
        const buttons = hostInstance.chatEle.querySelectorAll('.quick-buttons');
        buttons.forEach((button: HTMLButtonElement) => {
        button.disabled = true;
        });
    }
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "quick_replies") {
        
        return (
            <Fragment>
                <div className="bot-bubble-comp if-animation-bubble" id={msgData.messageId}>
                    <div className="bot-bubble-content hover-show-copy">
                        <div className="bubble-msg-with-img">
                            <div className="bubble-msg">
                                {/* <Message {...messageobj} /> */}
                                {msgData.message[0].cInfo.body}
                                <div className="quick-button">
                                    {msgData.message[0].component.payload.quick_replies.map((ele: any) => (
                                        <button className={`quick-buttons ${clickedButtons.includes(ele.title) ? 'clicked' : ''}`} c-items-id={msgData.messageId} onClick={() => handleQuickReply(ele)}>{ele.title}</button>
                                    ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
                
                
        );
    }
}

class quickReply extends BaseChatTemplate {
    hostInstance: any = this;
    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(quickWelcome, msgData, this.hostInstance);
    }
}

export default quickReply;