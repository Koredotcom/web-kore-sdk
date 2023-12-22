import BaseChatTemplate from '../../baseChatTemplate';
import './welcomeQuickReply.css';
import { h, Fragment } from 'preact';
import { Message } from '../../message/message';

export function quickRepliesWelcome(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const handleButtonEvent = (e: any) => {
        if (e.content_type == "postback" || e.content_type == "text") {
            hostInstance.sendMessage(e.payload || e.value, { renderMsg: e.title });
        } else if (e.content_type == 'url' || e.content_type == 'web_url') {
            let link = e.url;
            if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
                link = `http:////${link}`;
            }
            hostInstance.openExternalLink(link);
        }
    }
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == 'quick_replies_welcome') {
        return (
            <Fragment>
                <div>
                    <Message {...messageobj} />
                    {msgData.message[0].component.payload.quick_replies !='' && 
                        <div className="button-template-container">
                            {/* <span class="quickreply-text">Or Choose from these common requests:</span> */}
                            <div className="button-temp button-variation-3">
                                {
                                    msgData.message[0].component.payload.quick_replies.map((ele: any) => (
                                        <button className="kr-btn" onClick={() => handleButtonEvent(ele)}>{ele.title}
                                        </button>
                                    ))
                                }
                            </div>
                        </div>
                    }
                </div>
                
            </Fragment>
                
                
        );
    }
}

class welcomeQuickReply extends BaseChatTemplate {
    hostInstance: any = this;
    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(quickRepliesWelcome, msgData, this.hostInstance);
    }
}

export default welcomeQuickReply;