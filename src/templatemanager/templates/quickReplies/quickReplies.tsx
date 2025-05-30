import BaseChatTemplate from '../baseChatTemplate';
import './quickReplies.scss';
import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Message } from '../message/message';
import { getHTML } from '../../base/domManager';
import CarouselButtons from '../carouselTemplate/carouselButtons';

export function QuickReply(props: any) {
    const msgData = props.msgData;
    const hostInstance = props.hostInstance;
    const handleQuickReply = (e: any, msg: any) => {
        if (e.content_type.toLowerCase() == 'postback' || e.content_type.toLowerCase() == 'text') {
            hostInstance.sendMessage(e.payload?.toString() || e.value?.toString(), { renderMsg: e.title });
        } else if (e.content_type == 'url' || e.content_type == 'web_url') {
            let link = e.url;
            if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
                link = `http:////${link}`;
            }
            hostInstance.openExternalLink(link);
        }
        if (!msgData.fromHistory) {
            hostInstance.chatEle.querySelector('[data-quick-replies-cid="' + msg.messageId + '"]')?.remove();
        }
    }
    if (!msgData?.message?.[0]?.component?.payload?.stackedButtons && !msgData?.message?.[0]?.component?.payload?.fullWidth) {
        setTimeout(() => {
            const carouselButtons = new CarouselButtons({
                hostInstance,
                id: msgData.messageId,
                class: 'hide',
                lsWidth: 50,
                rsWidth: 20,
                classToRemove: 'remove'
            });
            carouselButtons.init();
        }, 50);
    }

    setTimeout(() => {
        hostInstance.chatEle.querySelector('.chat-widget-body-wrapper').scrollTo({
            top: hostInstance.chatEle.querySelector('.chat-widget-body-wrapper').scrollHeight,
            behavior: 'smooth'
        });
    }, 100);

    let quickReplyStyle = 'quick-replies';
    const quickreplyVariations: any = {
        'plain': '',
        'textInverted': 'button-variation-1',
        'backgroundInverted': 'button-variation-2'
    }

    quickReplyStyle = quickReplyStyle + ' ' + quickreplyVariations[msgData?.message?.[0]?.component?.payload?.variation];
    if (msgData?.message?.[0]?.component?.payload?.fullWidth) {
        quickReplyStyle = quickReplyStyle + ' full-width-buttons';
    }

    if (msgData?.message?.[0]?.component?.payload?.stackedButtons) {
        quickReplyStyle = quickReplyStyle + ' stack-buttons';
    }

    return (
        <Fragment>
            {(!msgData?.message?.[0]?.component?.payload?.stackedButtons && !msgData?.message?.[0]?.component?.payload?.fullWidth) && <div className={quickReplyStyle} data-quick-replies-cid={msgData.messageId}>
                <button className="quick-left-click" c-left-button-id={msgData.messageId} aria-label="scroll left">
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
                        <path d="M12 15.5L7 10.5L12 5.5" stroke="#697586" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <div className="quick-replies-buttons" c-parent-id={msgData.messageId}>
                    {msgData.message[0].component.payload.quick_replies.map((ele: any) => (
                        <button className="kr-btn" c-items-id={msgData.messageId} onClick={() => handleQuickReply(ele, msgData)} disabled={msgData.fromHistory}>{ele.image_url && <img src={ele.image_url} class="quickReplyIcon"/>} {ele.title}</button>
                    ))
                    }
                </div>
                <button className="quick-right-click" c-right-button-id={msgData.messageId} aria-label="scroll right">
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
                        <path d="M7 5.5L12 10.5L7 15.5" stroke="#697586" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>}

            {(msgData?.message?.[0]?.component?.payload?.stackedButtons || msgData?.message?.[0]?.component?.payload?.fullWidth) && <div className={quickReplyStyle} data-quick-replies-cid={msgData.messageId}>
                {msgData.message[0].component.payload.quick_replies.map((ele: any) => (
                    <button className="kr-btn" c-items-id={msgData.messageId} onClick={() => handleQuickReply(ele, msgData)} disabled={msgData.fromHistory}>{ele.image_url && <img src={ele.ele.image_url} class="quickReplyIcon"/>} {ele.title}</button>
                ))
                }
            </div>}
        </Fragment>

    )
}

export function QuickReplies(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageObj = {
        msgData: msgData,
        hostInstance: hostInstance
    }

    if (hostInstance.chatEle && hostInstance.chatEle.querySelectorAll('.chat-widget-composebar .quick-replies') && hostInstance.chatEle.querySelectorAll('.chat-widget-composebar .quick-replies').length > 0) {
        hostInstance.chatEle.querySelector('.chat-widget-composebar .quick-replies').remove();   // To remove quick replies container if exists
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type === 'quick_replies') {
        if (msgData?.fromHistory) {
            messageObj.msgData.message[0].cInfo.body = messageObj.msgData.message[0].cInfo.body.payload.text;
        }
        useEffect(() => {
            setTimeout(() => {
                if ((!msgData.fromHistory && !msgData?.fromHistorySync) && !msgData?.message?.[0]?.component?.payload?.inline) {
                    const quickReply = getHTML(QuickReply, msgData, hostInstance);
                    const composeBar = hostInstance.chatEle.querySelector('.chat-widget-composebar');
                    composeBar.insertBefore(quickReply, composeBar.firstChild);
                }
            }, 500);
        }, []);
        return (
            <Fragment>
                <div className='quick-replies-container' data-kr-msg-id={msgData.messageId}>
                    <Message {...messageObj} />
                    {(msgData.fromHistory || msgData?.fromHistorySync || msgData?.message?.[0]?.component?.payload?.inline) && <QuickReply {...messageObj} />}
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

