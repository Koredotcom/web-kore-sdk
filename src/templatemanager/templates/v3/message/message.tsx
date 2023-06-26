import { h, Fragment } from 'preact';
import BaseChatTemplate  from '../baseChatTemplate';
import KoreHelpers from '../../../../utils/helpers';

export function Message(props: any) {
    let msgData = props.msgData;
    const helpers = KoreHelpers.helpers;

    const msgStyling = props.hostInstance.activeTheme?.body;

    const msgBotBackgroundColor = msgStyling?.bot_message.bg_color || '#000';
    const msgBotColor = msgStyling?.bot_message.color || '#fff';
    const msgUserBackgroundColor = msgStyling?.bot_message.bg_color || '#ddd';
    const msgUserColor = msgStyling?.bot_message.color || '#000';

    const chatBubble = props.hostInstance.activeTheme?.chat_bubble;

    if (msgData.message) {
        return (
            <Fragment>
                {
                    msgData.message.map((msgItem: any) => {
                        if (msgItem.cInfo && msgItem.type === 'text') {
                            return (
                                msgData.type === 'bot_response' ? (
                                    msgItem.component && msgItem.component.type === 'error' ? ('') : (<div className="bot-bubble-comp" id={msgData.messageId}>
                                        <div className="bot-bubble-content chat-bubble-style-1">
                                            <div className="top-info">
                                                <div className="you-text">Kore.ai Bot</div>
                                                <div className="time-tamp"><time>{helpers.formatDate(msgData.createdOn)}</time></div>
                                            </div>
                                            <div className="bubble-msg-with-img">
                                                <div className="bubble-msg">{msgItem.cInfo.body}</div>
                                                <div className="bot-img">
                                                    <figure>
                                                        <img src="/images/avatar-bot.svg" alt='avatr img' />
                                                    </figure>
                                                </div>
                                                <div className="copy-bubble">
                                                    <img src="/images/arrow-back.svg" alt="back button" />
                                                </div>
                                            </div>
                                            {/* <div className="bottom-info">
                                            <div className="time-tamp"><time>2:32pm, Today</time></div>
                                        </div> */}
                                        </div>
                                    </div>)) : (
                                    <div className="agent-bubble-comp" id={msgData.messageId}>
                                        <div className="agent-bubble-content">
                                            <div className="top-info">
                                                <div className="time-tamp"><time>{helpers.formatDate(msgData.createdOn)}</time></div>
                                                <div className="you-text">You</div>
                                            </div>
                                            <div className="bubble-msg-with-img">
                                                <div className="bubble-msg">{msgItem.cInfo.renderMsg && msgItem.cInfo.renderMsg !== '' ? msgItem.cInfo.renderMsg : msgItem.cInfo.body}
                                                </div>
                                                <div className="agent-img">
                                                    <figure>
                                                        <img src="/images/avatar-bot.svg" alt='avatr img' />
                                                    </figure>
                                                </div>
                                                <div className="copy-bubble">
                                                    <img src="/images/arrow-back.svg" alt="back button" />
                                                </div>
                                            </div>
                                            {/* <div className="bottom-info">
                                            <div className="time-tamp"><time>2:32pm, Today</time></div>
                                            <div className="read-text">Read <i className="sdkv3-read-status"></i></div>
                                        </div> */}
                                        </div>
                                    </div>)
                            )
                        }
                    })
                }
            </Fragment>
        )
    }
}

class MessageTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(Message, msgData, this.hostInstance);
    }

}

export default MessageTemplate;