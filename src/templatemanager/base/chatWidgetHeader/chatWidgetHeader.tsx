

import './chatWidgetHeader.scss';
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import IconsManager from '../iconsManager';

export function ChatWidgetHeader(props: any) {
    const hostInstance = props.hostInstance;
    const iconHelper = new IconsManager();
    const [brandingInfo, updateBrandingInfo] = useState(hostInstance.config.branding);
    hostInstance.on('onBrandingUpdate', function (event: any) {
        updateBrandingInfo({...event.brandingData})
    });

    const hSizeObj: any = {
        "compact": "chat-widget-header",
        "regular": "chat-widget-header regular",
        "large": "chat-widget-header large "
    }

    const handleHeaderIcon = (data: any) => {
        hostInstance.sendMessage(data);
    }

    useEffect(() => {
        hostInstance.eventManager.removeEventListener('.btn-reconnect', 'click');
        hostInstance.eventManager.addEventListener('.btn-reconnect', 'click', (e: any) => {
            if (!hostInstance.chatEle.querySelector('.btn-reconnect').getAttribute('disabled')) {
                hostInstance.chatEle.querySelector('.btn-reconnect').setAttribute('disabled', true);
                setTimeout(() => {
                    hostInstance.resetWindow();
                });
            }
          });
        hostInstance.eventManager.removeEventListener('.btn-action-close', 'click');
        hostInstance.eventManager.addEventListener('.btn-action-close', 'click', () => {
            hostInstance.chatEle.querySelector('.avatar-bg').classList.remove('click-to-rotate-icon');
            hostInstance.chatEle.querySelector('.avatar-variations-footer').classList.remove('avatar-minimize');
            if (hostInstance.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.contains('fadeIn')) {
              hostInstance.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.remove('fadeIn');
            } else {
                hostInstance.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.remove(hostInstance.config.branding.chat_bubble.expand_animation);
            }
            hostInstance.chatEle.classList.add('minimize-chat');
            // if (hostInstance.config.multiPageApp && hostInstance.config.multiPageApp.enable) {
            //     hostInstance.setLocalStoreItem('kr-cw-state', 'minimized');
            //   }
            if (!hostInstance.config.pwcConfig.enable) {
                hostInstance.destroy();
                hostInstance.misc.initial = true;
                hostInstance.misc.chatOpened = false;
                hostInstance.bot.historyOffset = 0;
                hostInstance.bot.previousHistoryLoading = false;
                if (hostInstance.config.multiPageApp && hostInstance.config.multiPageApp.enable) {
                    hostInstance.removeLocalStoreItem('kr-cw-state');
                    hostInstance.removeLocalStoreItem('kr-cw-uid');
                    hostInstance.config.botOptions.maintainContext = false;
                }
                hostInstance.config.branding.header.title.name = hostInstance.config.botMessages.reconnecting;
                hostInstance.setBranding(hostInstance.config.branding);
            }
        })

        hostInstance.eventManager.removeEventListener('.back-to-chat', 'click');
        hostInstance.eventManager.addEventListener('.back-to-chat', 'click', () => {
            if (hostInstance.config.branding.welcome_screen.show) {
                hostInstance.chatEle.querySelector('.welcome-chat-section').classList.add(hostInstance.config.branding.chat_bubble.expand_animation);
                hostInstance.chatEle.querySelector('.avatar-variations-footer').classList.add('avatar-minimize')
            } else {
                if (hostInstance.config.branding.general.sounds.enable && hostInstance.config.branding.general.sounds.on_close.url != 'None') {
                    const closeSound = new Audio(hostInstance.config.branding.general.sounds.on_close.url);
                    closeSound.play();
                }
                hostInstance.chatEle.querySelector('.avatar-bg').classList.remove('click-to-rotate-icon');
                hostInstance.chatEle.querySelector('.avatar-variations-footer').classList.remove('avatar-minimize')
            }
            if (hostInstance.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.contains('fadeIn')) {
                hostInstance.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.remove('fadeIn');
            } else {
                hostInstance.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.remove(hostInstance.config.branding.chat_bubble.expand_animation);
            }
        })
    })

    return (
        <div className={hSizeObj[brandingInfo.header.size]} aria-label="chat widget header">
            <button className="back-to-chat" type="button" aria-label="back to welcome screen">
                {/* <figure>
                    <img src={iconHelper.getIcon('arrow_back')} alt="back button" />
                </figure> */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14.3999 18L8.3999 12L14.3999 6" stroke="#697586" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <div className="info-content-data">
                {brandingInfo.header?.icon?.show && brandingInfo.header?.icon?.type == 'custom' && <div className="img-block">
                    <figure>
                        <img src={brandingInfo.header.icon.icon_url} alt="icon" />
                    </figure>
                </div>}
                {brandingInfo.header?.icon?.show && brandingInfo.header?.icon?.type == 'default' && <figure className="bot_icon">
                    {brandingInfo.header.icon.icon_url && brandingInfo.header.icon.icon_url == 'icon-1' && <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
                        <path d="M12.6667 7.4618V10.0965C12.0584 10.8017 11.2505 11.0427 10.4419 11.0427C9.00304 11.0427 8 9.99141 8 8.78878C8 7.56693 9.00304 6.49573 10.4419 6.49573C11.2505 6.49573 12.0584 6.74061 12.6667 7.4618Z" fill="white" />
                        <path d="M21.1338 8.98667e-08H4.86687C4.49043 -9.32924e-05 4.11765 0.073067 3.76982 0.215302C3.422 0.357538 3.10596 0.566062 2.83973 0.828966C2.57351 1.09187 2.36233 1.404 2.21824 1.74754C2.07416 2.09107 2 2.45928 2 2.83112V11.889C4.15213 11.8975 5.83353 13.5193 5.83353 15.5982C5.83702 16.2822 5.64868 16.9538 5.28938 17.5385H21.1338C21.8938 17.5379 22.6225 17.2394 23.1599 16.7086C23.6973 16.1778 23.9994 15.458 24 14.7073V2.83397C24.0005 2.46191 23.9267 2.09342 23.7828 1.74956C23.639 1.4057 23.428 1.09323 23.1617 0.830014C22.8955 0.5668 22.5794 0.35801 22.2315 0.215588C21.8835 0.0731658 21.5105 -9.36611e-05 21.1338 8.98667e-08ZM15.3965 13.5328H12.7088V12.8055C11.9948 13.2655 11.1253 13.5328 10.0824 13.5328C7.52933 13.5328 5.46069 11.4326 5.46069 8.77776C5.46069 6.08457 7.52933 4.0014 10.0824 4.0014C11.1232 4.0014 11.9948 4.26873 12.7088 4.72873V4.0014H15.3965V13.5328ZM20.5415 13.5328H17.8538V4.0014H20.5451L20.5415 13.5328Z" fill="white" />
                        <path d="M1.98691 13.6411C0.899346 13.6411 0 14.4768 0 15.5772C0 16.7028 0.899346 17.5385 1.98691 17.5385C3.10065 17.5385 4 16.7028 4 15.5772C4 14.4761 3.10065 13.6411 1.98691 13.6411Z" fill="white" />
                    </svg>}
                    {brandingInfo.header.icon.icon_url && brandingInfo.header.icon.icon_url == 'icon-2' && <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
                        <path d="M2.5 0C1.26606 0 0.25 1.01606 0.25 2.25V9.75C0.25 10.9839 1.26606 12 2.5 12H4.74414V15L8.74316 12H13C14.2339 12 15.25 10.9839 15.25 9.75V2.25C15.25 1.01606 14.2339 0 13 0H2.5ZM2.5 1.5H13C13.4191 1.5 13.75 1.83094 13.75 2.25V9.75C13.75 10.1691 13.4191 10.5 13 10.5H8.24512L6.24414 12V10.5H2.5C2.08094 10.5 1.75 10.1691 1.75 9.75V2.25C1.75 1.83094 2.08094 1.5 2.5 1.5ZM3.25 3V4.5H12.25V3H3.25ZM16.75 4.5V6H19C19.42 6 19.75 6.33 19.75 6.75V14.25C19.75 14.67 19.42 15 19 15H15.25V16.5L13.2549 15H8.5C8.185 15 7.93117 14.8214 7.82617 14.5664L6.625 15.4805C7.015 16.0955 7.705 16.5 8.5 16.5H12.7598L16.75 19.5V16.5H19C20.245 16.5 21.25 15.495 21.25 14.25V6.75C21.25 5.505 20.245 4.5 19 4.5H16.75ZM3.25 6V7.5H9.25V6H3.25Z" fill="white" />
                    </svg>}
                    {brandingInfo.header.icon.icon_url && brandingInfo.header.icon.icon_url == 'icon-3' && <span><svg width="19" height="18" viewBox="0 0 19 18" fill="none">
                        <path d="M5.76628 8.99999H5.77561M9.49961 8.99999H9.50894M13.2329 8.99999H13.2423M17.8996 8.99999C17.8996 13.1237 14.1388 16.4667 9.49961 16.4667C8.06296 16.4667 6.71054 16.1461 5.52797 15.581L1.09961 16.4667L2.4016 12.9947C1.57707 11.8395 1.09961 10.4693 1.09961 8.99999C1.09961 4.87627 4.86042 1.53333 9.49961 1.53333C14.1388 1.53333 17.8996 4.87627 17.8996 8.99999Z" stroke="white" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                    </svg></span>}
                    {brandingInfo.header.icon.icon_url && brandingInfo.header.icon.icon_url == 'icon-4' && <svg width="21" height="21" viewBox="0 0 22 22" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.25 0.5C5.45101 0.5 0.75 5.20101 0.75 11C0.75 16.799 5.45101 21.5 11.25 21.5C17.049 21.5 21.75 16.799 21.75 11C21.75 5.20101 17.049 0.5 11.25 0.5ZM11.2501 2.05566C16.19 2.05566 20.1946 6.06023 20.1946 11.0001C20.1946 15.94 16.19 19.9446 11.2501 19.9446C6.31023 19.9446 2.30566 15.94 2.30566 11.0001C2.30566 6.06023 6.31023 2.05566 11.2501 2.05566ZM11.2822 6.40039C11.7047 6.40039 12.0516 6.711 12.0889 7.10737L12.0922 7.17817V7.25C12.0922 7.67955 11.7295 8.02778 11.2822 8.02778C10.8597 8.02778 10.5127 7.71717 10.4755 7.32079L10.4722 7.25V7.17817C10.4722 6.74861 10.8348 6.40039 11.2822 6.40039ZM11.2499 9.5C11.6556 9.5 11.9888 9.81061 12.0245 10.207L12.0277 10.2778V16.0742C12.0277 16.5037 11.6795 16.852 11.2499 16.852C10.8443 16.852 10.5111 16.5414 10.4753 16.145L10.4722 16.0742V10.2778C10.4722 9.84822 10.8204 9.5 11.2499 9.5Z" fill="white" />
                    </svg>}
                </figure>}
                <div className="content-text">
                    <h1 className="chat-header-title" aria-label="bot name">{hostInstance.config.botMessages.connecting}</h1>
                    <h2 aria-label="bot desc">{brandingInfo.header.sub_title.name}</h2>
                </div>
            </div>
            <div className="actions-info">
               { brandingInfo.header?.buttons?.help?.show && <a title="Help" href={brandingInfo.header.buttons.help.action.value} target="_blank" className="btn-action" aria-label="Help link kore ai products">
                    {/* <figure>
                        <img src={iconHelper.getIcon('help')} alt="back button" />
                    </figure> */}
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M7.11956 8.09317C7.11956 5.60254 9.59056 4.46819 11.41 5.36853C12.5593 5.93725 13.26 7.30009 13.0294 8.41579C12.8581 9.24476 12.4996 9.72966 11.7763 10.3211L11.4973 10.5424C10.791 11.0964 10.5927 11.3836 10.5927 12.0489C10.5927 12.3713 10.3313 12.6326 10.0089 12.6326C9.68653 12.6326 9.42516 12.3713 9.42516 12.0489C9.42516 11.0017 9.77624 10.4383 10.6297 9.7413L10.905 9.52313C11.5325 9.02974 11.772 8.73156 11.8861 8.17946C12.0071 7.59409 11.5743 6.75251 10.8922 6.41495C9.78568 5.8674 8.28709 6.55535 8.28709 8.09317C8.28709 8.41558 8.02573 8.67694 7.70332 8.67694C7.38092 8.67694 7.11956 8.41558 7.11956 8.09317Z" fill="#697586"/>
                        <path d="M10.7681 14.227C10.7681 14.62 10.4496 14.9385 10.0566 14.9385C9.66369 14.9385 9.34516 14.62 9.34516 14.227C9.34516 13.8341 9.66369 13.5156 10.0566 13.5156C10.4496 13.5156 10.7681 13.8341 10.7681 14.227Z" fill="#697586"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0002 1.11133C5.09102 1.11133 1.11133 5.09102 1.11133 10.0002C1.11133 14.9094 5.09102 18.8891 10.0002 18.8891C14.9094 18.8891 18.8891 14.9094 18.8891 10.0002C18.8891 5.09102 14.9094 1.11133 10.0002 1.11133ZM10.0002 2.4282C14.1821 2.4282 17.5722 5.81831 17.5722 10.0002C17.5722 14.1821 14.1821 17.5722 10.0002 17.5722C5.81831 17.5722 2.4282 14.1821 2.4282 10.0002C2.4282 5.81831 5.81831 2.4282 10.0002 2.4282Z" fill="#697586"/>
                    </svg>
                </a> }
                { brandingInfo.header?.buttons?.reconnect?.show && <button title="Reconnect" className="btn-action btn-reconnect" type="button" aria-label="Reconnect Chat">
                    <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
                        <path d="M12.8333 5.83333C12.8333 5.83333 11.6638 4.23979 10.7136 3.28898C9.76343 2.33816 8.4504 1.75 7 1.75C4.1005 1.75 1.75 4.1005 1.75 7C1.75 9.89949 4.1005 12.25 7 12.25C9.39347 12.25 11.4129 10.6483 12.0448 8.45833M12.8333 5.83333V2.33333M12.8333 5.83333H9.33333" stroke="#697586" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button> }
                { brandingInfo.header?.buttons?.live_agent?.show && <button title="Agent Chat" className="btn-action" type="button" aria-label="Agent Chat" onClick={(event) =>handleHeaderIcon(brandingInfo.header.buttons.live_agent.action.value)}>
                    {/* <figure>
                            <img src={iconHelper.getIcon('support')} alt="back button" />
                        </figure> */}
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M9.32692 1.25C2.94321 1.25 2.61719 5.45147 2.59615 8.79057C1.81791 9.09555 1.25 9.84225 1.25 10.6731C1.25 11.7458 2.05454 13.3654 3.26923 13.3654C3.3744 13.3654 3.48483 13.3549 3.59525 13.3444C4.58383 16.41 7.02374 18.75 9.32692 18.75C10.4259 18.75 11.5565 18.2031 12.5503 17.2987C12.1454 17.3618 11.7458 17.4038 11.3462 17.4038H9.32692C7.74414 17.4038 5.53561 15.4425 4.76262 12.524L4.54177 11.7563L3.91076 11.9141C3.52163 12.014 3.32182 12.0192 3.26923 12.0192C3.05364 11.9929 2.59615 11.2252 2.59615 10.6731C2.59615 10.3471 2.93795 10.021 3.3113 10L3.94231 9.95793V9.32692C3.94231 5.14123 4.30514 2.59615 9.32692 2.59615C9.48468 2.59615 11.3724 2.60141 12.6187 2.60667L12.1612 3.53741C12.0928 3.70042 11.8457 4.2473 10.9886 4.95192C10 5.77224 8.28576 6.63462 5.28846 6.63462V7.98077C8.54868 7.98077 10.6152 7.00796 11.851 5.99309C12.5083 5.44621 12.9079 4.90986 13.1603 4.49444C14.5433 5.19907 14.7115 6.59781 14.7115 9.32692V12.645C14.559 14.3382 12.2348 14.7115 11.3462 14.7115H10.6731C10.6731 13.9701 10.0684 13.3654 9.32692 13.3654C8.58549 13.3654 7.98077 13.9701 7.98077 14.7115C7.98077 15.453 8.58549 16.0577 9.32692 16.0577H11.3462C13.2024 16.0577 15.2479 15.2689 15.8736 13.5337H16.7308C17.8403 13.5337 18.75 12.6239 18.75 11.5144V10C18.75 8.89047 17.8403 7.98077 16.7308 7.98077H16.0314C15.963 6.05093 15.6318 4.23678 13.7861 3.29026L14.7852 1.27103L13.7019 1.26578C13.7019 1.26578 9.56355 1.25 9.32692 1.25ZM7.30769 9.32692C6.93434 9.32692 6.63462 9.62665 6.63462 10C6.63462 10.3733 6.93434 10.6731 7.30769 10.6731C7.68104 10.6731 7.98077 10.3733 7.98077 10C7.98077 9.62665 7.68104 9.32692 7.30769 9.32692ZM11.3462 9.32692C10.9728 9.32692 10.6731 9.62665 10.6731 10C10.6731 10.3733 10.9728 10.6731 11.3462 10.6731C11.7195 10.6731 12.0192 10.3733 12.0192 10C12.0192 9.62665 11.7195 9.32692 11.3462 9.32692ZM16.0577 9.32692H16.7308C17.1094 9.32692 17.4038 9.62139 17.4038 10V11.5144C17.4038 11.893 17.1094 12.1875 16.7308 12.1875H16.0577V9.32692Z" fill="#697586"/>
                        </svg>
                </button> }
                { brandingInfo.header?.buttons?.close?.show && <button title="Close" className="btn-action btn-action-close" type="button" aria-label="Close Chat">
                    {/* <figure>
                        <img src={iconHelper.getIcon('close_large')} alt="back button" />
                    </figure> */}
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586"/>
                    </svg>
                </button>}
            </div>
        </div>
    );
}