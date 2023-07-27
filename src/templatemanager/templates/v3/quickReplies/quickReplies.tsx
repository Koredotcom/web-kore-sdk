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
    setTimeout(() => {
        const btnsParentDiv: any = hostInstance.chatEle.querySelector('.quick-replies-buttons');
        const leftScrollBtn = hostInstance.chatEle.querySelector('.quick-left-click');
        const rightScrollBtn = hostInstance.chatEle.querySelector('.quick-right-click');
        if (btnsParentDiv && btnsParentDiv.hasChildNodes()) {
            if (leftScrollBtn) {
                if (btnsParentDiv.scrollLeft > 0) {
                    leftScrollBtn.classList.remove('hide');
                } else {
                    leftScrollBtn.classList.add('hide');
                }
            }
            if (rightScrollBtn) {
                if (btnsParentDiv.offsetWidth < btnsParentDiv.scrollWidth) {
                    rightScrollBtn.classList.remove('hide');
                } else {
                    rightScrollBtn.classList.add('hide');
                }
            }
        }

        leftScrollBtn.addEventListener('click', () => {
            const btnsParentDivWidth = btnsParentDiv.scrollLeft;
            const qButtons = btnsParentDiv.querySelectorAll('.quick-buttons');
            let curWidth = 0;
            if (qButtons.length > 0) {
                qButtons.forEach((ele: any) => {
                    curWidth = curWidth + ele.offsetWidth + 10;
                    if (curWidth > btnsParentDivWidth) {
                        btnsParentDiv.scrollTo({
                            left: btnsParentDiv.offsetHeight - ele.offsetHeight - 50,
                            behavior: 'smooth'
                        });
                        rightScrollBtn.classList.remove('hide');;
                        if (btnsParentDiv.scrollLeft <= 0) {
                            leftScrollBtn.classList.add('hide');;
                        }
                    }

                })
            }
        })
        rightScrollBtn.addEventListener('click', () => {
            const btnsParentDivWidth = btnsParentDiv.offsetWidth;
            const qButtons = btnsParentDiv.querySelectorAll('.quick-buttons');
            let curWidth = 0;
            if (qButtons.length > 0) {
                qButtons.forEach((ele: any) => {
                    curWidth = curWidth + ele.offsetWidth + 10;
                    if (curWidth > btnsParentDivWidth) {
                        btnsParentDiv.scrollTo({
                            left: btnsParentDiv.scrollLeft + ele.offsetWidth + 20,
                            behavior: 'smooth'
                        });
                        leftScrollBtn.classList.remove('hide');;
                        if (btnsParentDiv.scrollLeft + btnsParentDivWidth + 10 >= btnsParentDiv.scrollWidth) {
                            rightScrollBtn.classList.add('hide');
                        }
                    }

                })
            }
        })
    }, 50);
    return (

        <div className="quick-replies button-temp button-variation-2">
            <button className="quick-left-click">
                <i className="sdkv3-cheveron-left"></i>
            </button>
            <div className="quick-replies-buttons">
                {msgData.message[0].component.payload.quick_replies.map((ele: any) => (
                    <button className="kr-btn quick-buttons" onClick={() => handleQuickReply(ele)}>{ele.title}</button>
                ))
                }
                {msgData.message[0].component.payload.quick_replies.map((ele: any) => (
                    <button className="kr-btn quick-buttons" onClick={() => handleQuickReply(ele)}>{ele.title}</button>
                ))
                }
                {msgData.message[0].component.payload.quick_replies.map((ele: any) => (
                    <button className="kr-btn quick-buttons" onClick={() => handleQuickReply(ele)}>{ele.title}</button>
                ))
                }
            </div>
            <button className="quick-right-click">
                <i className="sdkv3-cheveron-right"></i>
            </button>
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

