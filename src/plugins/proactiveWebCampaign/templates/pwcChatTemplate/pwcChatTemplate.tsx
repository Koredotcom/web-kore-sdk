import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import './pwcChatTemplate.scss';
export function Chat(props: any) {
    const pwcCampaign = {
        data: props.msgData.layoutData
    };
    pwcCampaign.data.messages.forEach((message: any, index: number)=> {
        try {
            pwcCampaign.data.messages[index].value = decodeURIComponent(atob(message.value));
        } catch(err){
            // Do nothing
        }
    });
    let actionsList: any;
    let defaultActionsList: any = [
        {name: "Chat", value: "chat", description: 'Engage with a chat agent'},
        {name: "Audio", value: "audio", description: 'Engage over web based audio call'},
        {name: "Video", value: "video", description: 'Engage over web based video call'}
    ];
    let currentCampInstId = props.msgData.campInstId;
    const hostInstance = props.hostInstance;
    let [isAcceptTriggered, setAcceptTriggered] = useState(false);
    // get actionsList for a campaign
    hostInstance.campInfo.forEach((campaign: any)=> {
        if(campaign.campInstanceId === currentCampInstId){
            actionsList = defaultActionsList.filter((action: any) => campaign?.engagementStrategy?.channel.includes(action.value));
            return;
        }
    });
    let buttonStyle = "buttons-triger-click-wrapper animation-slide-up btn-anim-send";
    if (pwcCampaign.data.appearance.buttonAlignment == 'singlerow') {
        buttonStyle = buttonStyle + ' buttons-single-row-block';
    } else if (pwcCampaign.data.appearance.buttonAlignment == 'stacked') {
        buttonStyle = buttonStyle + ' buttons-block-level';
    }
    
    const handlePWCButtonEvent = (e: any) => {
        if(e.actionType == 'accept'){
            setAcceptTriggered(true);
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
         // Clear from sessionStorage when chat opens
         hostInstance.plugins.ProactiveWebCampaignPlugin.clearPersistedTemplateFromStorage();
        
        // Remove from DOM
        hostInstance.chatEle.querySelector('.content-info').remove();
    }

    const handleConversationAction = (action: any) => {
        // Clear from sessionStorage when chat opens
        hostInstance.plugins.ProactiveWebCampaignPlugin.clearPersistedTemplateFromStorage();
        
        hostInstance.isWelcomeScreenOpened = true;
        hostInstance.plugins.ProactiveWebCampaignPlugin.isPWEChatTriggered = action;
        hostInstance.chatEle.classList.remove('minimize-chat');
        hostInstance.chatEle.querySelector('.avatar-variations-footer').classList.add('avatar-minimize');
        hostInstance.chatEle.querySelector('.avatar-bg').classList.add('click-to-rotate-icon');
        hostInstance.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.add(hostInstance.config.branding.chat_bubble.expand_animation);
        if (hostInstance.config.multiPageApp && hostInstance.config.multiPageApp.enable) {
            hostInstance.setLocalStoreItem('kr-cw-state', 'open');
        }
        hostInstance.bot.RtmClient._safeDisconnect();
        hostInstance.bot.logInComplete();
        hostInstance.chatEle.querySelector('.welcome-chat-section-campaign').remove();
        // setConversationInprogress in agentdesktop-script.js
        if(action === 'audio' || action === 'video'){
            hostInstance.plugins.AgentDesktopPlugin.agentDesktopInfo.setConversationInProgress(action, hostInstance);
        }
    }

    return(
        // "pwc-active-campaign-template" class is added to the DOM after the campaign template is rendered
        // This class is used to identify the campaign template and prevent the sendApiEvent from getting triggered multiple times
        // DONOT REMOVE THIS CLASS
        <div>{!isAcceptTriggered && <div className="pwc-active-campaign-template content-info">
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

        {isAcceptTriggered && <div className="welcome-chat-section-campaign" aria-label="">
            <header className="welcome-header-campaign variation-2" aria-label="welcome header">
                <div className="welcome-header-bg">
                    {hostInstance.config.branding.welcome_screen.logo.logo_url && <div className="logo-img">
                        <figure>
                        <img src={hostInstance.config.branding.welcome_screen.logo.logo_url} alt="log-img" />
                        </figure>
                    </div>}
                    <h1>{hostInstance.config.branding.welcome_screen.title.name}</h1>
                    <h2>{hostInstance.config.branding.welcome_screen.sub_title.name}</h2>
                </div>
                <div className="bg-logo">
                    <figure>
                        <img src={hostInstance.config.branding.welcome_screen.logo.logo_url} alt="log-img" />
                    </figure>
                </div>
            </header>
            <div className="welcome-interactions-campaign" aria-label="welcome message screen">
                <section className="start-conversations-wrapper-campaign">
                    <div className="start-conv-sec">
                        <div className="conv-starter-box">
                            <figure className="bot_icon">
                                <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
                                <path d="M12.6667 7.4618V10.0965C12.0584 10.8017 11.2505 11.0427 10.4419 11.0427C9.00304 11.0427 8 9.99141 8 8.78878C8 7.56693 9.00304 6.49573 10.4419 6.49573C11.2505 6.49573 12.0584 6.74061 12.6667 7.4618Z" fill="white"></path>
                                <path d="M21.1338 8.98667e-08H4.86687C4.49043 -9.32924e-05 4.11765 0.073067 3.76982 0.215302C3.422 0.357538 3.10596 0.566062 2.83973 0.828966C2.57351 1.09187 2.36233 1.404 2.21824 1.74754C2.07416 2.09107 2 2.45928 2 2.83112V11.889C4.15213 11.8975 5.83353 13.5193 5.83353 15.5982C5.83702 16.2822 5.64868 16.9538 5.28938 17.5385H21.1338C21.8938 17.5379 22.6225 17.2394 23.1599 16.7086C23.6973 16.1778 23.9994 15.458 24 14.7073V2.83397C24.0005 2.46191 23.9267 2.09342 23.7828 1.74956C23.639 1.4057 23.428 1.09323 23.1617 0.830014C22.8955 0.5668 22.5794 0.35801 22.2315 0.215588C21.8835 0.0731658 21.5105 -9.36611e-05 21.1338 8.98667e-08ZM15.3965 13.5328H12.7088V12.8055C11.9948 13.2655 11.1253 13.5328 10.0824 13.5328C7.52933 13.5328 5.46069 11.4326 5.46069 8.77776C5.46069 6.08457 7.52933 4.0014 10.0824 4.0014C11.1232 4.0014 11.9948 4.26873 12.7088 4.72873V4.0014H15.3965V13.5328ZM20.5415 13.5328H17.8538V4.0014H20.5451L20.5415 13.5328Z" fill="white"></path>
                                <path d="M1.98691 13.6411C0.899346 13.6411 0 14.4768 0 15.5772C0 16.7028 0.899346 17.5385 1.98691 17.5385C3.10065 17.5385 4 16.7028 4 15.5772C4 14.4761 3.10065 13.6411 1.98691 13.6411Z" fill="white"></path>
                                </svg>
                            </figure>
                            <div className="conv-starter-content-info">
                                <div className="conv-starter-title">Start New Conversation</div>
                                <div className="conv-starter-desc">How would you like to engage ?</div>
                            </div>
                        </div>
                        <div className="campaign-click-to-actions-wrapper">
                            {actionsList?.map((action: any) => (
                                <button className="campaign-click-to-action-chat-voice-btn" onClick={() => handleConversationAction(action.value)}>
                                    {action.value === 'chat' && <div className="icon_block">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M5.07994 9.35766C5.02814 9.02385 5.00127 8.68187 5.00127 8.33366C5.00127 4.65176 8.00568 1.66699 11.7118 1.66699C15.4179 1.66699 18.4223 4.65176 18.4223 8.33366C18.4223 9.16539 18.269 9.96154 17.9889 10.6957C17.9308 10.8482 17.9017 10.9245 17.8885 10.984C17.8754 11.043 17.8703 11.0845 17.8689 11.1449C17.8675 11.2058 17.8757 11.273 17.8923 11.4073L18.2278 14.1324C18.2641 14.4274 18.2822 14.5749 18.2332 14.6822C18.1902 14.7761 18.1138 14.8508 18.0189 14.8916C17.9105 14.9382 17.7635 14.9166 17.4694 14.8735L14.815 14.4844C14.6764 14.4641 14.6071 14.4539 14.544 14.4543C14.4816 14.4547 14.4384 14.4593 14.3773 14.4721C14.3155 14.4851 14.2366 14.5147 14.0788 14.5738C13.3427 14.8495 12.545 15.0003 11.7118 15.0003C11.3633 15.0003 11.021 14.9739 10.6869 14.9231M6.36095 18.3337C8.8317 18.3337 10.8346 16.2816 10.8346 13.7503C10.8346 11.219 8.8317 9.16699 6.36095 9.16699C3.8902 9.16699 1.88727 11.219 1.88727 13.7503C1.88727 14.2592 1.9682 14.7486 2.11759 15.2059C2.18074 15.3992 2.21232 15.4959 2.22268 15.5619C2.2335 15.6309 2.2354 15.6696 2.23137 15.7393C2.22751 15.806 2.21081 15.8814 2.17742 16.0323L1.66797 18.3337L4.16364 17.9928C4.29986 17.9742 4.36797 17.9649 4.42744 17.9653C4.49007 17.9657 4.52331 17.9691 4.58473 17.9814C4.64306 17.993 4.72977 18.0236 4.90319 18.0848C5.36013 18.2461 5.85056 18.3337 6.36095 18.3337Z" stroke="#667085" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </div>}
                                    {action.value === 'audio' && <div className="icon_block">
                                        <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
                                            <path d="M12.8346 8.33366V10.0003C12.8346 13.222 10.223 15.8337 7.0013 15.8337M1.16797 8.33366V10.0003C1.16797 13.222 3.77964 15.8337 7.0013 15.8337M7.0013 15.8337V18.3337M3.66797 18.3337H10.3346M7.0013 12.5003C5.62059 12.5003 4.5013 11.381 4.5013 10.0003V4.16699C4.5013 2.78628 5.62059 1.66699 7.0013 1.66699C8.38201 1.66699 9.5013 2.78628 9.5013 4.16699V10.0003C9.5013 11.381 8.38201 12.5003 7.0013 12.5003Z" stroke="#667085" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </div>}
                                    {action.value === 'video' && <div className="icon_block">
                                        <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
                                            <path d="M18.3346 4.44313C18.3346 3.93829 18.3346 3.68586 18.2348 3.56898C18.1482 3.46756 18.0182 3.41373 17.8853 3.4242C17.732 3.43626 17.5535 3.61475 17.1966 3.97173L14.168 7.00033L17.1966 10.0289C17.5535 10.3859 17.732 10.5644 17.8853 10.5765C18.0182 10.5869 18.1482 10.5331 18.2348 10.4317C18.3346 10.3148 18.3346 10.0624 18.3346 9.55752V4.44313Z" stroke="#667085" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M1.66797 5.16699C1.66797 3.76686 1.66797 3.0668 1.94045 2.53202C2.18014 2.06161 2.56259 1.67916 3.03299 1.43948C3.56777 1.16699 4.26784 1.16699 5.66797 1.16699H10.168C11.5681 1.16699 12.2682 1.16699 12.8029 1.43948C13.2734 1.67916 13.6558 2.06161 13.8955 2.53202C14.168 3.0668 14.168 3.76686 14.168 5.16699V8.83366C14.168 10.2338 14.168 10.9339 13.8955 11.4686C13.6558 11.939 13.2734 12.3215 12.8029 12.5612C12.2682 12.8337 11.5681 12.8337 10.168 12.8337H5.66797C4.26784 12.8337 3.56777 12.8337 3.03299 12.5612C2.56259 12.3215 2.18014 11.939 1.94045 11.4686C1.66797 10.9339 1.66797 10.2338 1.66797 8.83366V5.16699Z" stroke="#667085" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </div>}
                                    <div className="content-info-sec">
                                        <h1>{action.name}</h1>
                                        <p>{action.description}</p>
                                    </div>
                                </button>
                            ))}
                            {/* <button className="campaign-click-to-action-chat-voice-btn">
                                <div className="icon_block">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M2.5 7.50033H13.75C15.8211 7.50033 17.5 9.17926 17.5 11.2503C17.5 13.3214 15.8211 15.0003 13.75 15.0003H10M2.5 7.50033L5.83333 4.16699M2.5 7.50033L5.83333 10.8337" stroke="#667085" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                <div className="content-info-sec">
                                    <h1>Callback</h1>
                                    <p>Leave your number to get a callback</p>
                                </div>
                            </button>
                            <button className="campaign-click-to-action-chat-voice-btn">
                                <div className="icon_block">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10.0013 14.5837H10.0096M6.83464 18.3337H13.168C14.1014 18.3337 14.5681 18.3337 14.9246 18.152C15.2382 17.9922 15.4932 17.7372 15.653 17.4236C15.8346 17.0671 15.8346 16.6004 15.8346 15.667V4.33366C15.8346 3.40024 15.8346 2.93353 15.653 2.57701C15.4932 2.2634 15.2382 2.00844 14.9246 1.84865C14.5681 1.66699 14.1014 1.66699 13.168 1.66699H6.83464C5.90121 1.66699 5.4345 1.66699 5.07798 1.84865C4.76438 2.00844 4.50941 2.2634 4.34962 2.57701C4.16797 2.93353 4.16797 3.40024 4.16797 4.33366V15.667C4.16797 16.6004 4.16797 17.0671 4.34962 17.4236C4.50941 17.7372 4.76438 17.9922 5.07798 18.152C5.4345 18.3337 5.90121 18.3337 6.83464 18.3337ZM10.418 14.5837C10.418 14.8138 10.2314 15.0003 10.0013 15.0003C9.77118 15.0003 9.58464 14.8138 9.58464 14.5837C9.58464 14.3535 9.77118 14.167 10.0013 14.167C10.2314 14.167 10.418 14.3535 10.418 14.5837Z" stroke="#667085" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                <div className="content-info-sec">
                                    <h1>Click-to-call</h1>
                                    <p>Connect to the IVR number</p>
                                </div>
                            </button> */}
                        </div>
                    </div>
                </section>
            </div>
        </div>}
        </div>
    );
    
}
export default Chat;
