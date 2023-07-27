import BaseChatTemplate from '../baseChatTemplate';
import './quickReplies.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';
import { getHTML } from '../../../base/domManager';

export function QuickReply(props: any) {
    const msgData = props.msgData;
    const hostInstance = props.hostInstance;
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
        hostInstance.chatEle.querySelector('.quick-replies').remove();
    }
    return (
        <div className="quick-replies button-temp button-variation-2">
            {msgData.message[0].component.payload.quick_replies.map((ele: any) => (
                <button className="kr-btn" onClick={() => handleQuickReply(ele)}>{ele.title}</button>
            ))
            }
        </div>
    )
}

export function QuickReplies(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type === 'quick_replies') {
        setTimeout(() => {
            if (!msgData.fromHistory) {
                const quickReply = getHTML(QuickReply, msgData, hostInstance);
                const composeBar = hostInstance.chatEle.querySelector('.chat-widget-composebar');
                composeBar.insertBefore(quickReply, composeBar.firstChild);
            }
        }, 500);
        return (
            <Fragment>
                <div className='quick-replies-container'>
                    <Message {...messageobj} />
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

