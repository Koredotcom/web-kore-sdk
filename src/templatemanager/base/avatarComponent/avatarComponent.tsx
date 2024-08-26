

import './avatarComponent.scss';
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

export function AvatarComponent(props: any) {
    const hostInstance = props.hostInstance;
    const [brandingInfo, updateBrandingInfo] = useState(hostInstance.config.branding);
    const [pwcCampaign, updatePWCCampaignInfo] = useState({ enable: false, data: { buttons: [], messages: [], appearance: { messageBubbleAlignment : '', buttonAlignment: '', dropShadow: ''}, messageHeaderConfig: { headerToggle: false, headerMessage: '', headerUpload: '', headerIcon: ''}}});
    hostInstance.on('onBrandingUpdate', function (event: any) {
        updateBrandingInfo({...event.brandingData})
    });

    setInterval(() => {
        if (hostInstance?.pwcInfo?.dataFlag) {
            let pwcData = hostInstance.pwcInfo.chatData;
            updatePWCCampaignInfo({...pwcData});
            hostInstance.pwcInfo.dataFlag = false;
        }
    }, 500)

    const aShape: any = {
        "rounded": "avatar-actions",
        "balloon": "avatar-actions variation-1",
        "rectangle": "avatar-actions variation-2",
        "square": "avatar-actions variation-3"
    }

    let avatarParentStyle = "avatar-variations-footer"; 
    let avatarStyle = aShape[brandingInfo.chat_bubble.style];
    let buttonStyle = "buttons-triger-click-wrapper animation-slide-up btn-anim-send";
    let avatarBgStyle = "avatar-bg";

    if (brandingInfo.chat_bubble.icon.type == 'custom') {
        avatarBgStyle = avatarBgStyle + ' custom-image-avatar-bg';
    }
    if (brandingInfo.chat_bubble.minimise.type == 'custom') {
        avatarBgStyle = avatarBgStyle + ' custom-image-minimize-avatar-bg';
    }

    if (pwcCampaign.enable) {
        if (pwcCampaign.data.appearance.dropShadow == 'lightShadow') {
            avatarParentStyle = avatarParentStyle + ' box-shadow-light-avatar';
        } else if (pwcCampaign.data.appearance.dropShadow == 'darkShadow') {
            avatarParentStyle = avatarParentStyle + ' box-shadow-dark-avatar';
        }
    }

    if (brandingInfo.chat_bubble.icon.type == 'custom') {
        avatarStyle = 'avatar-actions';
    }

    if (brandingInfo.chat_bubble.animation == 'quick') {
        avatarStyle = avatarStyle + ' avatar-gentle-animation';
    } else if (brandingInfo.chat_bubble.animation == 'slide') {
        avatarStyle = avatarStyle + ' avatar-instant-animation';
    } else if (brandingInfo.chat_bubble.animation == 'crossFade') {
        avatarStyle = avatarStyle + ' avatar-bounce-animation';
    }

    if (brandingInfo.chat_bubble.alignment == 'block' || pwcCampaign.data.appearance.messageBubbleAlignment == 'block') {
        avatarStyle = avatarStyle + ' bubble-align-block';
    }

    const closeHelp = (e: any) => {
        e?.stopPropagation();
        hostInstance.chatEle.querySelector('.content-info').remove();
    }

    const buttonAction = (btn: any) => {
        const value = btn.value;
        hostInstance.welcomeScreenState = true;
        hostInstance.chatEle.classList.remove('minimize-chat');
        hostInstance.chatEle.querySelector('.avatar-variations-footer').classList.add('avatar-minimize');
        hostInstance.chatEle.querySelector('.avatar-bg').classList.add('click-to-rotate-icon');
        hostInstance.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.add('minimize');
        if (!hostInstance.config.openSocket && !hostInstance.misc.chatOpened) {
            hostInstance.bot.logInComplete();
            hostInstance.misc.chatOpened = true;
        }
        if (value) {
            if (hostInstance.config.loadHistory) {
                hostInstance.on('historyComplete', (event: any) => {
                    setTimeout(() => {
                        hostInstance.sendMessage(value);
                    }, 500);
                });    
            } else {
                setTimeout(() => {
                    hostInstance.sendMessage(value);
                }, 500);
            }
        }
    }

    const dynamicContextResolver = (msg: any, data: any) => {
        return msg.replace(/{{(.*?)}}/g, (match: any, key: any) => {
            const trimmedKey = key.trim();
            return data[trimmedKey] || match;
        });
    }

    useEffect(() => {
        if (hostInstance?.config?.branding?.chat_bubble.proactive?.show && (hostInstance.config.branding.chat_bubble.proactive.header || hostInstance.config.branding.chat_bubble.proactive.messages.length > 0) && !hostInstance.config.pwcConfig.enable) {
            if (hostInstance.config.branding.general.sounds.enable && hostInstance.config.branding.general.sounds.on_proactive_msg.url != 'None') {
                const playSound = new Audio(hostInstance.config.branding.general.sounds.on_proactive_msg.url);
                playSound?.play().catch(error => {
                    console.log('Error: ', error);
                });
            }
        }
    }, []);

    return (
        <div className={avatarParentStyle} aria-label="avatar footer">
            <div className={avatarStyle} aria-label="avatar actions">
                {hostInstance?.config?.branding?.chat_bubble?.proactive?.show && (hostInstance.config.branding.chat_bubble.proactive.header || hostInstance.config.branding.chat_bubble.proactive.messages.length > 0 || hostInstance.config.branding.chat_bubble.proactive.buttons.length > 0) && !hostInstance.config.pwcConfig.enable && <div className="content-info">
                    {hostInstance.config.branding.chat_bubble.proactive.header && <div className="text-content animation-slide-up text-heading-one" role="contentinfo" aria-labelledby={dynamicContextResolver(hostInstance.config.branding.chat_bubble.proactive.header, hostInstance.config.UIContext)}>
                        <h4 id="hellokore">{dynamicContextResolver(hostInstance.config.branding.chat_bubble.proactive.header, hostInstance.config.UIContext)}</h4>
                        <span className="close-avatar-content" role="contentinfo" aria-label="close" onClick={closeHelp}>
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                                <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586" />
                            </svg>
                        </span>
                    </div>}
                    {hostInstance?.config?.branding?.chat_bubble?.proactive?.messages?.map((msg: any, ind: any) => (
                        (msg.title && <div className="text-content animation-slide-up text-heading-one" role="contentinfo" aria-labelledby={msg.title}>
                            <p className="help-text-content">{dynamicContextResolver(msg.title, hostInstance.config.UIContext)}</p>
                            {ind == 0 && !hostInstance.config.branding.chat_bubble.proactive.header && <span className="close-avatar-content" role="contentinfo" aria-label="close" onClick={closeHelp}>
                                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                                    <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586" />
                                </svg>
                            </span>}
                        </div>)))}
                    <div className="buttons-triger-click-wrapper animation-slide-up btn-anim-send">
                        {hostInstance?.config?.branding?.chat_bubble?.proactive?.buttons?.map((btn: any) => (
                            <button className="primary-button" onClick={() => buttonAction(btn)}>{btn.title}</button>
                        ))}
                    </div>
                </div>}

                <button className={avatarBgStyle}>
                    {/* <span className="un-read-msg">2</span> */}
                    {brandingInfo.chat_bubble.icon.type == 'default' && <figure className="default-avater-icon">
                        {/* <img src={brandingInfo.chat_bubble.icon.icon_url} alt="Elephant at sunset" /> */}
                        {brandingInfo.chat_bubble.icon.icon_url && brandingInfo.chat_bubble.icon.icon_url == 'icon-1' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.5019 7.32966C11.5019 8.16923 10.8213 8.84984 9.98174 8.84984C9.14216 8.84984 8.46156 8.16923 8.46156 7.32966C8.46156 6.49009 9.14216 5.80948 9.98174 5.80948C10.8213 5.80948 11.5019 6.49009 11.5019 7.32966Z" fill="white" />
                            <path d="M14.3671 8.84984C15.2067 8.84984 15.8873 8.16923 15.8873 7.32966C15.8873 6.49009 15.2067 5.80948 14.3671 5.80948C13.5275 5.80948 12.8469 6.49009 12.8469 7.32966C12.8469 8.16923 13.5275 8.84984 14.3671 8.84984Z" fill="white" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9244 1.49991C12.9244 1.08569 12.5886 0.749908 12.1744 0.749908C11.7602 0.749908 11.4244 1.08569 11.4244 1.49991V2.19388H8.63674C6.54338 2.19388 4.84638 3.89088 4.84638 5.98424V8.67449C4.84638 10.7679 6.54338 12.4649 8.63674 12.4649H15.7125C17.8058 12.4649 19.5028 10.7679 19.5028 8.67449V5.98424C19.5028 3.89088 17.8058 2.19388 15.7125 2.19388H12.9244V1.49991ZM6.34638 5.98424C6.34638 4.71931 7.37181 3.69388 8.63674 3.69388H15.7125C16.9774 3.69388 18.0028 4.71931 18.0028 5.98424V8.67449C18.0028 9.93942 16.9774 10.9649 15.7125 10.9649H8.63674C7.37181 10.9649 6.34638 9.93943 6.34638 8.67449V5.98424Z" fill="white" />
                            <path d="M6.70951 16.3241C7.025 16.0557 7.06318 15.5824 6.79478 15.2669C6.52638 14.9514 6.05304 14.9132 5.73755 15.1816L4.37362 16.3419L4.00634 16.663C3.73615 16.8993 3.67122 17.2938 3.85145 17.6042L4.09699 18.0272L5.31295 20.0602L5.55589 20.4796C5.73156 20.7829 6.09389 20.9241 6.42846 20.8196L6.90214 20.6718L8.30912 20.2014C8.63548 20.4296 8.98504 20.6345 9.35862 20.8067L9.63915 22.1692L9.73281 22.6448C9.80205 22.9964 10.1103 23.2499 10.4687 23.2499H13.8795C14.2372 23.2499 14.5451 22.9973 14.615 22.6464L14.71 22.1697L14.9898 20.8066C15.3633 20.6344 15.7128 20.4296 16.0391 20.2014L17.4318 20.6672L17.9197 20.8196C18.2538 20.9239 18.6156 20.7834 18.7916 20.4809L19.0361 20.0606L20.2464 18.0353L20.4971 17.6055C20.6784 17.2946 20.6134 16.8988 20.3421 16.6623L19.9814 16.3478L18.6106 15.1816C18.2951 14.9132 17.8218 14.9514 17.5534 15.2669C17.285 15.5824 17.3232 16.0557 17.6387 16.3241L18.8869 17.386L17.7982 19.2079L16.1445 18.655C15.9055 18.5751 15.6424 18.6206 15.444 18.776C15.0218 19.107 14.5636 19.3788 14.0669 19.5685C13.8275 19.6599 13.6513 19.8673 13.5998 20.1184L13.2649 21.7499H11.0843L10.7483 20.1179C10.6966 19.867 10.5205 19.6599 10.2813 19.5685C9.78457 19.3788 9.32642 19.107 8.90412 18.776C8.70579 18.6206 8.44265 18.5751 8.20366 18.655L6.55089 19.2077L5.46131 17.386L6.70951 16.3241Z" fill="white" />
                            <path d="M14.4885 15.1518C14.8709 15.3109 15.0519 15.7499 14.8928 16.1323C14.4505 17.1953 13.4008 17.9454 12.1747 17.9454C10.9528 17.9454 9.90603 17.2003 9.46117 16.1432C9.30051 15.7614 9.47977 15.3216 9.86155 15.161C10.2433 15.0003 10.6831 15.1796 10.8437 15.5614C11.0628 16.0819 11.5775 16.4454 12.1747 16.4454C12.7739 16.4454 13.2902 16.0794 13.5079 15.5561C13.667 15.1737 14.106 14.9926 14.4885 15.1518Z" fill="white" />
                        </svg> }
                        {brandingInfo.chat_bubble.icon.icon_url && brandingInfo.chat_bubble.icon.icon_url == 'icon-2' && <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
                            <path d="M2.5 0C1.26606 0 0.25 1.01606 0.25 2.25V9.75C0.25 10.9839 1.26606 12 2.5 12H4.74414V15L8.74316 12H13C14.2339 12 15.25 10.9839 15.25 9.75V2.25C15.25 1.01606 14.2339 0 13 0H2.5ZM2.5 1.5H13C13.4191 1.5 13.75 1.83094 13.75 2.25V9.75C13.75 10.1691 13.4191 10.5 13 10.5H8.24512L6.24414 12V10.5H2.5C2.08094 10.5 1.75 10.1691 1.75 9.75V2.25C1.75 1.83094 2.08094 1.5 2.5 1.5ZM3.25 3V4.5H12.25V3H3.25ZM16.75 4.5V6H19C19.42 6 19.75 6.33 19.75 6.75V14.25C19.75 14.67 19.42 15 19 15H15.25V16.5L13.2549 15H8.5C8.185 15 7.93117 14.8214 7.82617 14.5664L6.625 15.4805C7.015 16.0955 7.705 16.5 8.5 16.5H12.7598L16.75 19.5V16.5H19C20.245 16.5 21.25 15.495 21.25 14.25V6.75C21.25 5.505 20.245 4.5 19 4.5H16.75ZM3.25 6V7.5H9.25V6H3.25Z" fill="white" />
                        </svg>}
                        {brandingInfo.chat_bubble.icon.icon_url && brandingInfo.chat_bubble.icon.icon_url == 'icon-3' && <span><svg width="19" height="18" viewBox="0 0 19 18" fill="none">
                            <path d="M5.76628 8.99999H5.77561M9.49961 8.99999H9.50894M13.2329 8.99999H13.2423M17.8996 8.99999C17.8996 13.1237 14.1388 16.4667 9.49961 16.4667C8.06296 16.4667 6.71054 16.1461 5.52797 15.581L1.09961 16.4667L2.4016 12.9947C1.57707 11.8395 1.09961 10.4693 1.09961 8.99999C1.09961 4.87627 4.86042 1.53333 9.49961 1.53333C14.1388 1.53333 17.8996 4.87627 17.8996 8.99999Z" stroke="white" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                        </svg></span>}
                        {brandingInfo.chat_bubble.icon.icon_url && brandingInfo.chat_bubble.icon.icon_url == 'icon-4' && <svg width="21" height="21" viewBox="0 0 22 22" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.25 0.5C5.45101 0.5 0.75 5.20101 0.75 11C0.75 16.799 5.45101 21.5 11.25 21.5C17.049 21.5 21.75 16.799 21.75 11C21.75 5.20101 17.049 0.5 11.25 0.5ZM11.2501 2.05566C16.19 2.05566 20.1946 6.06023 20.1946 11.0001C20.1946 15.94 16.19 19.9446 11.2501 19.9446C6.31023 19.9446 2.30566 15.94 2.30566 11.0001C2.30566 6.06023 6.31023 2.05566 11.2501 2.05566ZM11.2822 6.40039C11.7047 6.40039 12.0516 6.711 12.0889 7.10737L12.0922 7.17817V7.25C12.0922 7.67955 11.7295 8.02778 11.2822 8.02778C10.8597 8.02778 10.5127 7.71717 10.4755 7.32079L10.4722 7.25V7.17817C10.4722 6.74861 10.8348 6.40039 11.2822 6.40039ZM11.2499 9.5C11.6556 9.5 11.9888 9.81061 12.0245 10.207L12.0277 10.2778V16.0742C12.0277 16.5037 11.6795 16.852 11.2499 16.852C10.8443 16.852 10.5111 16.5414 10.4753 16.145L10.4722 16.0742V10.2778C10.4722 9.84822 10.8204 9.5 11.2499 9.5Z" fill="white" />
                        </svg>}
                    </figure>}
                    {brandingInfo.chat_bubble.minimise.type == 'default' && <figure className="close-avater-icon rotateIn">
                        {/* <img src={brandingInfo.chat_bubble.minimise.icon} alt="Elephant at sunset" /> */}
                        {brandingInfo.chat_bubble.minimise.icon && brandingInfo.chat_bubble.minimise.icon == 'icon-m-1' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5466 15.2242C12.2625 15.5076 11.8122 15.5242 11.5086 15.2742L11.4534 15.2242L4.72639 8.8159C4.42454 8.51487 4.42454 8.0268 4.72639 7.72577C5.01049 7.44245 5.46072 7.42578 5.76436 7.67577L5.8195 7.72577L12 13.5889L18.1805 7.72577C18.4646 7.44245 18.9148 7.42578 19.2185 7.67577L19.2736 7.72577C19.5577 8.00909 19.5744 8.4581 19.3237 8.76091L19.2736 8.8159L12.5466 15.2242Z" fill="white" />
                        </svg>}
                        {brandingInfo.chat_bubble.minimise.icon && brandingInfo.chat_bubble.minimise.icon == 'icon-m-2' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.46967 1.71967C2.76256 1.42678 3.23744 1.42678 3.53033 1.71967L11.25 9.43934L11.25 4.5C11.25 4.08579 11.5858 3.75 12 3.75C12.4142 3.75 12.75 4.08579 12.75 4.5L12.75 11.25C12.75 11.6642 12.4142 12 12 12L5.25 12C4.83579 12 4.5 11.6642 4.5 11.25C4.5 10.8358 4.83579 10.5 5.25 10.5L10.1893 10.5L2.46967 2.78033C2.17678 2.48744 2.17678 2.01256 2.46967 1.71967ZM13.5 20.25C13.0858 20.25 12.75 19.9142 12.75 19.5L12.75 12.75C12.75 12.3358 13.0858 12 13.5 12L20.25 12C20.6642 12 21 12.3358 21 12.75C21 13.1642 20.6642 13.5 20.25 13.5L15.3107 13.5L23.0303 21.2197C23.3232 21.5126 23.3232 21.9874 23.0303 22.2803C22.7374 22.5732 22.2626 22.5732 21.9697 22.2803L14.25 14.5607L14.25 19.5C14.25 19.9142 13.9142 20.25 13.5 20.25Z" fill="white" />
                        </svg>}
                        {brandingInfo.chat_bubble.minimise.icon && brandingInfo.chat_bubble.minimise.icon == 'icon-m-3' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M13.5605 12.0001L19.7803 5.78033C20.0732 5.48744 20.0732 5.01256 19.7803 4.71967C19.4874 4.42678 19.0126 4.42678 18.7197 4.71967L12.4999 10.9395L6.28033 4.72022C5.98743 4.42733 5.51256 4.42734 5.21967 4.72024C4.92678 5.01314 4.92679 5.48802 5.21969 5.7809L11.4392 12.0002L5.21967 18.2197C4.92678 18.5126 4.92678 18.9875 5.21967 19.2804C5.51256 19.5732 5.98744 19.5732 6.28033 19.2804L12.4999 13.0608L18.7197 19.2804C19.0126 19.5732 19.4875 19.5732 19.7804 19.2803C20.0732 18.9874 20.0732 18.5126 19.7803 18.2197L13.5605 12.0001Z" fill="white" />
                        </svg>}
                        {brandingInfo.chat_bubble.minimise.icon && brandingInfo.chat_bubble.minimise.icon == 'icon-m-4' && <span><svg width="25" height="25" viewBox="0 0 24 24" fill="none">
                            <path d="M17.0492 13L12.2492 18M12.2492 18L7.44922 13M12.2492 18L12.2492 6" stroke="white" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                        </svg></span>}
                    </figure>}
                    {brandingInfo.chat_bubble.icon.type == 'custom' && <figure className="custom-img-uploaded">
                        <img src={brandingInfo.chat_bubble.icon.icon_url} />
                    </figure>}
                    {brandingInfo.chat_bubble.minimise.type == 'custom' && <figure className="custom-img-uploaded-minimize" >
                        <img src={brandingInfo.chat_bubble.minimise.icon} />
                    </figure>}
                </button>
            </div>
        </div>
    );
}
