

import './chatWidgetHeader.scss';
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import IconsManager from '../iconsManager';

export function ChatWidgetHeader(props: any) {
    const hostInstance = props.hostInstance;
    const iconHelper = new IconsManager();
    const [brandingInfo, updateBrandingInfo] = useState(hostInstance.config.brandingCopy);

    const hSizeObj: any = {
        "compact": "chat-widget-header",
        "regular": "chat-widget-header regular",
        "large": "chat-widget-header large "
    }

    useEffect(() => {
        hostInstance.eventManager.removeEventListener('.btn-action-close', 'click');
        hostInstance.eventManager.addEventListener('.btn-action-close', 'click', () => {
            hostInstance.chatEle.querySelector('.avatar-bg').classList.remove('click-to-rotate-icon');
            hostInstance.chatEle.querySelector('.avatar-variations-footer').classList.remove('avatar-minimize');
            if (hostInstance.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.contains('fadeIn')) {
              hostInstance.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.remove('fadeIn');
            } else {
                hostInstance.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.remove('minimize');
            }
            hostInstance.chatEle.classList.add('minimize-chat');
        })

        hostInstance.eventManager.removeEventListener('.back-to-chat', 'click');
        hostInstance.eventManager.addEventListener('.back-to-chat', 'click', () => {
            if (hostInstance.config.branding.welcome_screen.show) {
                hostInstance.chatEle.querySelector('.welcome-chat-section').classList.add('minimize');
                hostInstance.chatEle.querySelector('.avatar-variations-footer').classList.add('avatar-minimize')
            } else {
                hostInstance.chatEle.querySelector('.avatar-bg').classList.remove('click-to-rotate-icon');
                hostInstance.chatEle.querySelector('.avatar-variations-footer').classList.remove('avatar-minimize')
            }
            if (hostInstance.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.contains('fadeIn')) {
                hostInstance.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.remove('fadeIn');
            } else {
                hostInstance.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.remove('minimize');
            }
        })
        hostInstance.on('onBrandingUpdate', function (event: any) {
            updateBrandingInfo(JSON.parse(JSON.stringify(event.brandingData)))
        });
    }, [brandingInfo])

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
               { brandingInfo.header.icon.show && <div className="img-block">
                    <figure>
                        <img src={iconHelper.getIcon('avatar_bot')} alt="icon" />
                    </figure>
                </div> }
                <div className="content-text">
                    <h1 aria-label="bot name">{brandingInfo.header.title.name}</h1>
                    <h2 aria-label="bot desc">{brandingInfo.header.sub_title.name}</h2>
                </div>
            </div>
            <div className="actions-info">
               { brandingInfo.header.buttons.help.show && <a href="#" target="_blank" className="btn-action" aria-label="Help link kore ai products">
                    {/* <figure>
                        <img src={iconHelper.getIcon('help')} alt="back button" />
                    </figure> */}
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M7.11956 8.09317C7.11956 5.60254 9.59056 4.46819 11.41 5.36853C12.5593 5.93725 13.26 7.30009 13.0294 8.41579C12.8581 9.24476 12.4996 9.72966 11.7763 10.3211L11.4973 10.5424C10.791 11.0964 10.5927 11.3836 10.5927 12.0489C10.5927 12.3713 10.3313 12.6326 10.0089 12.6326C9.68653 12.6326 9.42516 12.3713 9.42516 12.0489C9.42516 11.0017 9.77624 10.4383 10.6297 9.7413L10.905 9.52313C11.5325 9.02974 11.772 8.73156 11.8861 8.17946C12.0071 7.59409 11.5743 6.75251 10.8922 6.41495C9.78568 5.8674 8.28709 6.55535 8.28709 8.09317C8.28709 8.41558 8.02573 8.67694 7.70332 8.67694C7.38092 8.67694 7.11956 8.41558 7.11956 8.09317Z" fill="#697586"/>
                        <path d="M10.7681 14.227C10.7681 14.62 10.4496 14.9385 10.0566 14.9385C9.66369 14.9385 9.34516 14.62 9.34516 14.227C9.34516 13.8341 9.66369 13.5156 10.0566 13.5156C10.4496 13.5156 10.7681 13.8341 10.7681 14.227Z" fill="#697586"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0002 1.11133C5.09102 1.11133 1.11133 5.09102 1.11133 10.0002C1.11133 14.9094 5.09102 18.8891 10.0002 18.8891C14.9094 18.8891 18.8891 14.9094 18.8891 10.0002C18.8891 5.09102 14.9094 1.11133 10.0002 1.11133ZM10.0002 2.4282C14.1821 2.4282 17.5722 5.81831 17.5722 10.0002C17.5722 14.1821 14.1821 17.5722 10.0002 17.5722C5.81831 17.5722 2.4282 14.1821 2.4282 10.0002C2.4282 5.81831 5.81831 2.4282 10.0002 2.4282Z" fill="#697586"/>
                    </svg>
                </a> }
                { brandingInfo.header.buttons.reconnect.show && <button className="btn-action btn-reconnect" type="button" aria-label="Reconnect Chat">
                    <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
                        <path d="M12.8333 5.83333C12.8333 5.83333 11.6638 4.23979 10.7136 3.28898C9.76343 2.33816 8.4504 1.75 7 1.75C4.1005 1.75 1.75 4.1005 1.75 7C1.75 9.89949 4.1005 12.25 7 12.25C9.39347 12.25 11.4129 10.6483 12.0448 8.45833M12.8333 5.83333V2.33333M12.8333 5.83333H9.33333" stroke="#697586" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button> }
                { brandingInfo.header.buttons.live_agent.show && <button className="btn-action" type="button" aria-label="Agent Chat">
                    {/* <figure>
                            <img src={iconHelper.getIcon('support')} alt="back button" />
                        </figure> */}
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M9.32692 1.25C2.94321 1.25 2.61719 5.45147 2.59615 8.79057C1.81791 9.09555 1.25 9.84225 1.25 10.6731C1.25 11.7458 2.05454 13.3654 3.26923 13.3654C3.3744 13.3654 3.48483 13.3549 3.59525 13.3444C4.58383 16.41 7.02374 18.75 9.32692 18.75C10.4259 18.75 11.5565 18.2031 12.5503 17.2987C12.1454 17.3618 11.7458 17.4038 11.3462 17.4038H9.32692C7.74414 17.4038 5.53561 15.4425 4.76262 12.524L4.54177 11.7563L3.91076 11.9141C3.52163 12.014 3.32182 12.0192 3.26923 12.0192C3.05364 11.9929 2.59615 11.2252 2.59615 10.6731C2.59615 10.3471 2.93795 10.021 3.3113 10L3.94231 9.95793V9.32692C3.94231 5.14123 4.30514 2.59615 9.32692 2.59615C9.48468 2.59615 11.3724 2.60141 12.6187 2.60667L12.1612 3.53741C12.0928 3.70042 11.8457 4.2473 10.9886 4.95192C10 5.77224 8.28576 6.63462 5.28846 6.63462V7.98077C8.54868 7.98077 10.6152 7.00796 11.851 5.99309C12.5083 5.44621 12.9079 4.90986 13.1603 4.49444C14.5433 5.19907 14.7115 6.59781 14.7115 9.32692V12.645C14.559 14.3382 12.2348 14.7115 11.3462 14.7115H10.6731C10.6731 13.9701 10.0684 13.3654 9.32692 13.3654C8.58549 13.3654 7.98077 13.9701 7.98077 14.7115C7.98077 15.453 8.58549 16.0577 9.32692 16.0577H11.3462C13.2024 16.0577 15.2479 15.2689 15.8736 13.5337H16.7308C17.8403 13.5337 18.75 12.6239 18.75 11.5144V10C18.75 8.89047 17.8403 7.98077 16.7308 7.98077H16.0314C15.963 6.05093 15.6318 4.23678 13.7861 3.29026L14.7852 1.27103L13.7019 1.26578C13.7019 1.26578 9.56355 1.25 9.32692 1.25ZM7.30769 9.32692C6.93434 9.32692 6.63462 9.62665 6.63462 10C6.63462 10.3733 6.93434 10.6731 7.30769 10.6731C7.68104 10.6731 7.98077 10.3733 7.98077 10C7.98077 9.62665 7.68104 9.32692 7.30769 9.32692ZM11.3462 9.32692C10.9728 9.32692 10.6731 9.62665 10.6731 10C10.6731 10.3733 10.9728 10.6731 11.3462 10.6731C11.7195 10.6731 12.0192 10.3733 12.0192 10C12.0192 9.62665 11.7195 9.32692 11.3462 9.32692ZM16.0577 9.32692H16.7308C17.1094 9.32692 17.4038 9.62139 17.4038 10V11.5144C17.4038 11.893 17.1094 12.1875 16.7308 12.1875H16.0577V9.32692Z" fill="#697586"/>
                        </svg>
                </button> }
                { brandingInfo.header.buttons.close.show && <button className="btn-action btn-action-close" type="button" aria-label="Close Chat">
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