import './message.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import BaseChatTemplate  from '../baseChatTemplate';
import KoreHelpers from '../../../../utils/helpers';
import IconsManager from '../../../base/iconsManager';

export function Message(props: any) {
    const msgData = props.msgData;
    const hostInstance = props.hostInstance;
    const iconHelper = new IconsManager();
    const [brandingInfo, updateBrandingInfo] = useState(hostInstance.config.branding);
    hostInstance.on('onBrandingUpdate', function (event: any) {
        updateBrandingInfo({...event.brandingData})
    });
    const helpers = KoreHelpers.helpers;
    const cbStyle: any = {
        balloon: 'bot-bubble-content hover-show-copy',
        rounded: 'bot-bubble-content chat-bubble-style-1 hover-show-copy',
        rectangle: 'bot-bubble-content chat-bubble-style-2 hover-show-copy'
    }

    const ubStyle: any = {
        balloon: 'agent-bubble-content hover-show-copy',
        rounded: 'agent-bubble-content chat-bubble-style-1 hover-show-copy',
        rectangle: 'agent-bubble-content chat-bubble-style-2 hover-show-copy'
    }

    let botStyle = cbStyle[brandingInfo.body.bubble_style]
    let userStyle = ubStyle[brandingInfo.body.bubble_style]

    if (brandingInfo.body.time_stamp.show_type == 'hover') {
        botStyle = botStyle + ' time-stamp-show-hover';
        userStyle = userStyle + ' time-stamp-show-hover';
    }

    if (brandingInfo.body.font.size == 'small') {
        botStyle = botStyle + ' small_text';
        userStyle = userStyle + ' small_text';
    } else if (brandingInfo.body.font.size == 'large') {
        botStyle = botStyle + ' large_text';
        userStyle = userStyle + ' large_text';  
    }

    if (brandingInfo.body.icon.show && brandingInfo.body.icon.user_icon) {
        userStyle = userStyle + ' if-agent-img';
    }

    const onCopy = (event: any, value: any) => {
        var dummy = document.createElement('textarea');
        document.body.appendChild(dummy);
        dummy.value = JSON.stringify(value);
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        console.log('event: ', event);
        event.target.classList.remove('sdkv3-copy');
        event.target.classList.add('sdkv3-check');
        setTimeout(() => {
            event.target.classList.remove('sdkv3-check');
            event.target.classList.add('sdkv3-copy');
        }, 800);
    }

    const download = (url: any, filename: any) => {
        let link = document.createElement("a");
        link.download = filename;
        link.target = "_blank";
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    let botStyles = {
        backgroundColor: brandingInfo.general.colors.useColorPaletteOnly ? brandingInfo.general.colors.secondary : brandingInfo.body.bot_message.bg_color,
        color: brandingInfo.general.colors.useColorPaletteOnly ? brandingInfo.general.colors.primary_text : brandingInfo.body.bot_message.color
    }

    if (msgData?.fromAgent) {
        botStyles = {
            backgroundColor: brandingInfo.general.colors.useColorPaletteOnly ? brandingInfo.general.colors.secondary : brandingInfo.body.agent_message.bg_color,
            color: brandingInfo.general.colors.useColorPaletteOnly ? brandingInfo.general.colors.primary_text : brandingInfo.body.agent_message.color
        }
    }

    if (msgData?.message[0]?.component?.payload?.template_type === 'live_agent') {
        msgData.fromAgent = true;

        if (msgData.message[0].component && msgData.message[0].component.payload) {
            msgData.message[0].cInfo.body = msgData.message[0].component.payload.text || '';
        }
    }

    if (msgData.message) {
        if (msgData.type == 'bot_response' && msgData.message[0].component && msgData.message[0].component.type == 'error'
        && msgData.message[0].component.payload.text) {
            msgData.message[0].cInfo.body = '';
        }
        return (
            <Fragment>
                {
                    msgData.message.map((msgItem: any) => (
                        <div class="message-bubble">
                            { msgData.type == 'bot_response' && msgItem.component && msgItem.component.type == 'error' && msgItem.component.payload.text && <div className={`bot-bubble-comp if-animation-bubble i${msgData.messageId || msgItem.clientMessageId}`} id={msgData.messageId || msgItem.clientMessageId}>
                                    <div className={botStyle}>
                                        {brandingInfo.body.time_stamp.show && brandingInfo.body.time_stamp.position == 'top' && <div className="top-info">
                                            <div className="you-text" title={hostInstance.config.botOptions.botInfo.chatBot}>{hostInstance.config.botOptions.botInfo.chatBot}</div>
                                            <div className="time-tamp">
                                                <time>{helpers.formatAMPMDay(msgData.createdOn)}</time>
                                            </div>
                                            {/* <span className="copied-text">Copied</span>                                            */}
                                        </div>}
                                        <div className="bubble-msg-with-img">
                                            <div className="bubble-msg" style={{color: msgItem.component.payload.color}} dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(msgItem.component.payload.text, "bot", msgItem) }}></div>
                                            {brandingInfo.body.icon.show && !msgData.fromAgent && <div className="bot-img">
                                                <figure>
                                                    <img src={msgData && msgData.icon ? msgData.icon : iconHelper.getIcon('kore')} alt='avatr img' />
                                                </figure>
                                            </div>}
                                            {brandingInfo.body.icon.show && msgData.fromAgent && <div className="bot-img">
                                                <figure>
                                                    <img src={msgData && msgData.icon ? msgData.icon : iconHelper.getIcon('kore')} alt='avatr img' />
                                                </figure>
                                            </div>}
                                            <div className="copy-bubble" onClick={() => onCopy(event, msgItem.component.payload.text)}>
                                                <svg width="15" height="16" viewBox="0 0 15 16" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.123 2.81483C13.1008 2.56823 12.8935 2.375 12.6411 2.375H5.57208L5.52803 2.37698C5.28144 2.39923 5.08821 2.60648 5.08821 2.85887V5.58821H2.35887C2.09164 5.58821 1.875 5.80484 1.875 6.07208V13.1411C1.875 13.4084 2.09164 13.625 2.35887 13.625H9.42792C9.69516 13.625 9.91179 13.4084 9.91179 13.1411V10.4118H12.6411L12.6852 10.4098C12.9318 10.3876 13.125 10.1803 13.125 9.92792V2.85887L13.123 2.81483ZM9.91179 9.44405H12.1573V3.34274H6.05595V5.58821H9.42792C9.69516 5.58821 9.91179 5.80484 9.91179 6.07208V9.44405ZM8.94405 6.55595V12.6573H2.84274V6.55595H8.94405Z" fill="#697586" />
                                                </svg>
                                            </div>
                                        </div>
                                        {brandingInfo.body.time_stamp.show && brandingInfo.body.time_stamp.position == 'bottom' && <div className="bottom-info">
                                            <div className="you-text" title={hostInstance.config.botOptions.botInfo.chatBot}>{hostInstance.config.botOptions.botInfo.chatBot}</div>
                                            <div className="time-tamp"><time>{helpers.formatAMPMDay(msgData.createdOn)}</time></div>
                                        </div>}
                                    </div>
                                </div> }
                            { msgData.type == 'bot_response' && msgItem.type === 'text' && msgItem.cInfo && msgItem.cInfo.body && <div className={`bot-bubble-comp if-animation-bubble i${msgData.messageId || msgItem.clientMessageId}`} id={msgData.messageId || msgItem.clientMessageId}>
                                    <div className={botStyle}>
                                        {brandingInfo.body.time_stamp.show && brandingInfo.body.time_stamp.position == 'top' && <div className="top-info">
                                            <div className="you-text" title={hostInstance.config.botOptions.botInfo.chatBot}>{hostInstance.config.botOptions.botInfo.chatBot}</div>
                                            <div className="time-tamp">
                                                <time>{helpers.formatAMPMDay(msgData.createdOn)}</time>
                                            </div>
                                            {/* <span className="copied-text">Copied</span>                                            */}
                                        </div>}
                                        <div className="bubble-msg-with-img">
                                            <div className="bubble-msg" style={botStyles} dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(msgItem.cInfo.body, "bot", msgItem) }}></div>
                                            {brandingInfo.body.icon.show && !msgData.fromAgent && <div className="bot-img">
                                                <figure>
                                                    <img src={msgData && msgData.icon ? msgData.icon : iconHelper.getIcon('kore')} alt='avatr img' />
                                                </figure>
                                            </div>}
                                            {brandingInfo.body.icon.show && msgData.fromAgent && <div className="bot-img">
                                                <figure>
                                                    <img src={msgData.icon} alt='avatr img' />
                                                </figure>
                                            </div>}
                                            <div className="copy-bubble" onClick={() => onCopy(event, msgItem.cInfo.body)}>
                                                <svg width="15" height="16" viewBox="0 0 15 16" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.123 2.81483C13.1008 2.56823 12.8935 2.375 12.6411 2.375H5.57208L5.52803 2.37698C5.28144 2.39923 5.08821 2.60648 5.08821 2.85887V5.58821H2.35887C2.09164 5.58821 1.875 5.80484 1.875 6.07208V13.1411C1.875 13.4084 2.09164 13.625 2.35887 13.625H9.42792C9.69516 13.625 9.91179 13.4084 9.91179 13.1411V10.4118H12.6411L12.6852 10.4098C12.9318 10.3876 13.125 10.1803 13.125 9.92792V2.85887L13.123 2.81483ZM9.91179 9.44405H12.1573V3.34274H6.05595V5.58821H9.42792C9.69516 5.58821 9.91179 5.80484 9.91179 6.07208V9.44405ZM8.94405 6.55595V12.6573H2.84274V6.55595H8.94405Z" fill="#697586" />
                                                </svg>
                                            </div>
                                        </div>
                                        {brandingInfo.body.time_stamp.show && brandingInfo.body.time_stamp.position == 'bottom' && <div className="bottom-info">
                                            <div className="you-text" title={hostInstance.config.botOptions.botInfo.chatBot}>{hostInstance.config.botOptions.botInfo.chatBot}</div>
                                            <div className="time-tamp"><time>{helpers.formatAMPMDay(msgData.createdOn)}</time></div>
                                        </div>}
                                    </div>
                                </div> }

                            { msgData.type != 'bot_response' && msgItem.type === 'text' && msgItem.cInfo && msgItem.cInfo.body && <div className={`agent-bubble-comp if-animation-bubble i${msgData.messageId || msgItem.clientMessageId}`} id={msgData.messageId || msgItem.clientMessageId}>
                                    <div className={userStyle}>
                                        {brandingInfo.body.time_stamp.show && brandingInfo.body.time_stamp.position == 'top' && <div className="top-info">
                                            {/* <span className="copied-text">Copied</span> */}
                                            <div className="time-tamp">
                                                <time>{helpers.formatAMPMDay(msgData.createdOn)}</time>
                                            </div>
                                            <div className="you-text">You</div>
                                        </div>}
                                        <div className="bubble-msg-with-img">
                                            <div className="bubble-msg" dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(msgItem.cInfo.renderMsg && msgItem.cInfo.renderMsg !== '' ? msgItem.cInfo.renderMsg : msgItem.cInfo.body, "user", msgItem) }}>
                                            </div>
                                            <div className="agent-img">
                                                <figure>
                                                    <img src="https://dev-xo.kore.ai/assets/websdkthemes/soundImages/user.png" alt='avatr img' />
                                                </figure>
                                            </div>
                                            <div className="copy-bubble" onClick={() => onCopy(event, msgItem.cInfo.renderMsg && msgItem.cInfo.renderMsg !== '' ? msgItem.cInfo.renderMsg : msgItem.cInfo.body)}>
                                                <svg width="15" height="16" viewBox="0 0 15 16" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.123 2.81483C13.1008 2.56823 12.8935 2.375 12.6411 2.375H5.57208L5.52803 2.37698C5.28144 2.39923 5.08821 2.60648 5.08821 2.85887V5.58821H2.35887C2.09164 5.58821 1.875 5.80484 1.875 6.07208V13.1411C1.875 13.4084 2.09164 13.625 2.35887 13.625H9.42792C9.69516 13.625 9.91179 13.4084 9.91179 13.1411V10.4118H12.6411L12.6852 10.4098C12.9318 10.3876 13.125 10.1803 13.125 9.92792V2.85887L13.123 2.81483ZM9.91179 9.44405H12.1573V3.34274H6.05595V5.58821H9.42792C9.69516 5.58821 9.91179 5.80484 9.91179 6.07208V9.44405ZM8.94405 6.55595V12.6573H2.84274V6.55595H8.94405Z" fill="#697586" />
                                                </svg>
                                                {/* <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7804 3.31768C13.967 3.11682 14.2795 3.1067 14.4784 3.29508C14.6656 3.47238 14.6855 3.76232 14.5317 3.96328L14.5008 3.99987L6.13818 12.509C5.95951 12.7013 5.66615 12.7183 5.46746 12.5556L5.43136 12.523L1.44799 8.55964C1.25373 8.36636 1.25144 8.05066 1.44287 7.85451C1.62304 7.66991 1.9106 7.65699 2.10576 7.81726L2.14122 7.84934L5.76405 11.454L13.7804 3.31768Z" fill="#202124"/>
                                        </svg> */}
                                            </div>
                                        </div>
                                        {brandingInfo.body.time_stamp.show && brandingInfo.body.time_stamp.position == 'bottom' && <div className="bottom-info">
                                            <div className="time-tamp"><time>{helpers.formatAMPMDay(msgData.createdOn)}</time></div>
                                            <div className="you-text">You</div>
                                        </div>}
                                    </div>
                                </div> }
                            { msgItem.type === 'text' && msgItem.cInfo && msgItem.cInfo.attachments && msgData.message[0].cInfo.attachments[0].type == 'image' &&
                                <section className="attachment-sended-temp-wrapper">
                                    <div className="multiple-attchments">
                                        <div className="attchments-wrap">
                                            <div className="img-attch">
                                                <figure>
                                                    <img src={msgData.message[0].cInfo.attachments[0].fileUrl} />
                                                </figure>
                                            </div>
                                            {/* <button className="layer-multiple">+1</button> */}
                                        </div>
                                        <div className="attchment-details">
                                            <div className="content-info">
                                                <h2>{msgData.message[0].cInfo.attachments[0].fileName}</h2>
                                                <p>{`${msgData.message[0].cInfo.attachments[0].size} MB`}</p>
                                            </div>
                                            <button className="kr-button-blue-light" onClick={() => download(msgData.message[0].cInfo.attachments[0].fileUrl, msgData.message[0].cInfo.attachments[0].fileName?.split('.')?.[0] || 'file')}>Download</button>
                                        </div>
                                    </div>
                                </section> }
                            { msgItem.type === 'text' && msgItem.cInfo && msgItem.cInfo.attachments && msgData.message[0].cInfo.attachments[0].type != 'image' && 
                                <div className="thumbnails-wrapper attachment-document">
                                    <div className="thumbnail-data-content">
                                        { msgData.message[0].cInfo.attachments[0].type == 'attachment' && <div className="icon-block">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.75 4.75C4.75 3.7835 5.5335 3 6.5 3H10.5126C10.9767 3 11.4218 3.18437 11.75 3.51256L14.7374 6.5C15.0656 6.82819 15.25 7.27331 15.25 7.73744V15.25C15.25 16.2165 14.4665 17 13.5 17H6.5C5.5335 17 4.75 16.2165 4.75 15.25V4.75ZM6.5 10C6.5 9.51675 6.89175 9.125 7.375 9.125H12.625C13.1082 9.125 13.5 9.51675 13.5 10C13.5 10.4832 13.1082 10.875 12.625 10.875H7.375C6.89175 10.875 6.5 10.4832 6.5 10ZM7.375 12.625C6.89175 12.625 6.5 13.0168 6.5 13.5C6.5 13.9832 6.89175 14.375 7.375 14.375H12.625C13.1082 14.375 13.5 13.9832 13.5 13.5C13.5 13.0168 13.1082 12.625 12.625 12.625H7.375Z" fill="#697586" />
                                            </svg>
                                        </div> }
                                        { msgData.message[0].cInfo.attachments[0].type == 'audio' && <div className="icon-block">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M17 3.87501C17 3.61286 16.8825 3.36453 16.6797 3.19833C16.477 3.03214 16.2105 2.96559 15.9534 3.017L7.2034 4.767C6.7944 4.8488 6.5 5.20791 6.5 5.62501V13.5996C6.22632 13.5351 5.93181 13.5 5.625 13.5C4.17525 13.5 3 14.2835 3 15.25C3 16.2165 4.17525 17 5.625 17C7.07474 17 8.24999 16.2165 8.25 15.25V8.09233L15.25 6.69233V11.8496C14.9763 11.7851 14.6818 11.75 14.375 11.75C12.9253 11.75 11.75 12.5335 11.75 13.5C11.75 14.4665 12.9253 15.25 14.375 15.25C15.8247 15.25 17 14.4665 17 13.5V3.87501Z" fill="#697586" />
                                            </svg>
                                        </div> }
                                        <div className="attchment-details">
                                            <div className="content-info">
                                                { msgData.message[0].cInfo.attachments[0].type == 'video'&& 
                                                    <video width="240" height="145" controls>
                                                        <source src={msgData.message[0].cInfo.attachments[0].fileUrl}></source>
                                                    </video>
                                                }
                                                <h1>{msgData.message[0].cInfo.attachments[0].fileName}</h1>
                                                { msgData.message[0].cInfo.attachments[0].type == 'audio' &&
                                                    <audio controls>
                                                        <source src={msgData.message[0].cInfo.attachments[0].fileUrl}></source>
                                                    </audio> }
                                                <p>{`${msgData.message[0].cInfo.attachments[0].size} MB`}</p>
                                            </div>
                                            <button className="kr-button-blue-light" onClick={() => download(msgData.message[0].cInfo.attachments[0].fileUrl, msgData.message[0].cInfo.attachments[0].fileName?.split('.')?.[0] || 'file')}>Download</button>
                                        </div>
                                    </div>
                                </div> }
                            { msgItem.component && msgItem.component.payload && (msgItem.component.payload.audioUrl || msgItem.component.payload.videoUrl) &&
                                <section className="attachment-sended-temp-wrapper attachment-wrap">
                                <div className="multiple-attchments">
                                    <div className="attchments-wrap">
                                        {msgItem.component.payload.audioUrl && <div className="img-attch">
                                            <figure>
                                                <audio controls>
                                                    <source src={msgItem.component.payload.audioUrl} type="audio/ogg"></source>
                                                </audio>
                                            </figure>
                                        </div>}
                                        {msgItem.component.payload.videoUrl && <div className="img-attch">
                                            <figure>
                                                <video width="240" height="145" controls>
                                                    <source src={msgItem.component.payload.videoUrl} type="video/mp4"></source>
                                                </video>
                                            </figure>
                                        </div>}
                                    </div>
                                </div>
                            </section> }    
                        </div>
                    ))
                }
            </Fragment>
        )
    } else {
        return null;
    }
}

class MessageTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(Message, msgData, this.hostInstance);
    }

}

export default MessageTemplate;