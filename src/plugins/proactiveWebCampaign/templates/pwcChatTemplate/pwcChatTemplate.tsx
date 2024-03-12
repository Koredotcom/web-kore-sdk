import { h, Fragment } from 'preact';
import BaseChatTemplate from '../../../../templatemanager/templates/v3/baseChatTemplate';
import { useEffect, useState } from 'preact/hooks';
import './pwcChatTemplate.scss';
export function Chat(props: any) {
    // const layoutData = props.msgData.layoutData;
    const pwcCampaign = {
        data: props.msgData.layoutData
    };
    const hostInstance = props.hostInstance;
    // console.log(layoutData);
    console.log(hostInstance);
    console.log("HELLO from PWC CHAT");
    let [isAcceptTriggered, setAcceptTriggered] = useState(false);
    const actionsList: any = ['chat', 'audio', 'video'];

    let buttonStyle = "buttons-triger-click-wrapper animation-slide-up btn-anim-send";

    if (pwcCampaign.data.appearance.buttonAlignment == 'singlerow') {
        buttonStyle = buttonStyle + ' buttons-single-row-block';
    } else if (pwcCampaign.data.appearance.buttonAlignment == 'stacked') {
        buttonStyle = buttonStyle + ' buttons-block-level';
    }
    /* if (pwcCampaign.enable) {
        if (pwcCampaign.data.appearance.dropShadow == 'lightShadow') {
            avatarParentStyle = avatarParentStyle + ' box-shadow-light-avatar';
        } else if (pwcCampaign.data.appearance.dropShadow == 'darkShadow') {
            avatarParentStyle = avatarParentStyle + ' box-shadow-dark-avatar';
        }
    } */
    
    const handlePWCButtonEvent = (e: any) => {
        if(e.actionType == 'accept'){
            setAcceptTriggered(true);
            console.log("isAcceptTriggered: ", isAcceptTriggered);
        }
        if (e.actionType == 'url') {
            let link = e.actionValue;
            if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
                link = `http:////${link}`;
            }
            hostInstance.openExternalLink(link);
            closePWCHelp(e);
        } else if (e.actionType == 'reject') {
            closePWCHelp(e);
        }
    }

    const closePWCHelp = (e: any) => {
        hostInstance.chatEle.querySelector('.content-info').remove();
        // updatePWCCampaignInfo({ enable: false, data: { buttons: [], messages: [], appearance: { messageBubbleAlignment : '', buttonAlignment: '', dropShadow: pwcCampaign.data.appearance.dropShadow}, messageHeaderConfig: { headerToggle: false, headerMessage: '', headerUpload: '', headerIcon: ''}}});
    }

    const handleConversationAction = (e: any) => {
        console.log("action Event got triggered: ", e);
        hostInstance.welcomeScreenState = true;
        hostInstance.chatEle.classList.remove('minimize-chat');
        hostInstance.chatEle.querySelector('.avatar-variations-footer').classList.add('avatar-minimize');
        hostInstance.chatEle.querySelector('.avatar-bg').classList.add('click-to-rotate-icon');
        hostInstance.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.add('minimize');
        hostInstance.bot.close();
        hostInstance.bot.KoreRTMClient.prototype.reWriteURL = function connect(socketUrl: any) {
            if (this.reWriteSocketURL) {
                var parser = document.createElement('a');
                parser.href = socketUrl;
                if (this.reWriteSocketURL.protocol) {
                    parser.protocol = this.reWriteSocketURL.protocol;
                }
                if (this.reWriteSocketURL.hostname) {
                    parser.hostname = this.reWriteSocketURL.hostname;
                }
                if (this.reWriteSocketURL.port) {
                    parser.port = this.reWriteSocketURL.port;
                }
                socketUrl=parser.href;
            }
            
            socketUrl+="&pwe="+e;
            return socketUrl;
          };
        hostInstance.bot.logInComplete();
        setTimeout(()=>{
            let msg = "connect "+e;
            hostInstance.sendMessage(msg);   
        },2000);
        // closing the actions layout .actions-content
        hostInstance.chatEle.querySelector('.actions-content').remove();
        // setConversationInprogress in agentdesktop-script.js
        hostInstance.plugins.AgentDesktopPlugin.agentDesktopInfo.setConversationInProgress(e);
    }

    return(
        <div>{!isAcceptTriggered && <div className="content-info">
            {pwcCampaign.data?.messages.map((ele: any, ind: any) => (
                <div className="text-content animation-slide-up" role="contentinfo" aria-labelledby="helojohn">
                    <div className="help-text-content">
                        {(ind == 0) && pwcCampaign.data.messageHeaderConfig.headerToggle && <div className="header-content">
                            {pwcCampaign.data.messageHeaderConfig.headerUpload == 'upload' && <div className="header-img"><img src={pwcCampaign.data.messageHeaderConfig.headerIcon}></img></div>}
                            {pwcCampaign.data.messageHeaderConfig.headerMessage && <h5>{pwcCampaign.data.messageHeaderConfig.headerMessage}</h5>}
                        </div>}
                        <p className="p-text-content" dangerouslySetInnerHTML={{ __html: ele.value }}></p>
                    </div>
                    {(ind == 0) && <span className="close-avatar-content" role="contentinfo" aria-label="close" onClick={closePWCHelp}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586" />
                        </svg>
                    </span>}
                </div>))}
            <div className={buttonStyle}>
                {pwcCampaign.data?.buttons?.map((ele: any) => (
                    <button style={{ backgroundColor: ele?.backgroundColor, color: ele?.color }} className={`primary-button animation-slide-up ${ele?.actionType == 'accept' ? 'pwc-accept' : ''}`} data-postback={ele?.actionValue} onClick={() => handlePWCButtonEvent(ele)}>{ele?.text}</button>
                ))}
            </div>
        </div>}

        {isAcceptTriggered && <div className="actions-content">
        {actionsList?.map((ele: any) => (
                    <button onClick={() => handleConversationAction(ele)}>{ele}</button>
                ))}
        </div>}
        </div>
    );
    
}
export default Chat;
/* class PWCChatTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(Chat, msgData, this.hostInstance);
    }

}

export default PWCChatTemplate; */
