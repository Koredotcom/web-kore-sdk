import BaseChatTemplate from '../baseChatTemplate';
import './quickReplies.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';
export function QuickReplies(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const handleButtonEvent = (e: any) => {
        if (e.type.toLowerCase() == 'postback' || e.type.toLowerCase() == 'text') {
            hostInstance.sendMessage(e.payload || e.value, { renderMsg: e.title });
        } else if (e.type == 'url' || e.type == 'web_url') {
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
    if (msgData?.message?.[0]?.component?.payload?.template_type === 'quick_replies' && !msgData?.message?.[0]?.component?.formData) {
        return (
            <Fragment>
                <div>
                    <Message {...messageobj} />
                    <div className="quick-reply-container">
                        <div>Hello Quick Reply</div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

class QuickRepliesTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(QuickReplies, msgData, this.hostInstance);
    }

}

export default QuickRepliesTemplate;

