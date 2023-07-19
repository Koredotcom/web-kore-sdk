

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

    useEffect(() => {
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
    }, [])

    return (
        <div className={hSizeObj[brandingInfo.header.size]} aria-label="chat widget header">
            <button className="back-to-chat" aria-label="back to welcome screen">
                <figure>
                    <img src={iconHelper.getIcon('arrow_back')} alt="back button" />
                </figure>
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
               { brandingInfo.header.buttons.help.show && <button className="btn-action">
                    {/* <figure>
                            <img src="/images/help.svg" alt="back button" />
                        </figure> */}
                    <i className="sdkv3-help"></i>
                </button> }
                { brandingInfo.header.buttons.live_agent.show && <button className="btn-action">
                    {/* <figure>
                            <img src="/images/support.svg" alt="back button" />
                        </figure> */}
                    <i className="sdkv3-support"></i>
                </button> }
                { brandingInfo.header.buttons.close.show && <button className="btn-action btn-action-close">
                    <figure>
                            <img src={iconHelper.getIcon('close_large')} alt="back button" />
                        </figure>
                    {/* <i className="sdkv3-close"></i> */}
                </button>}
            </div>
        </div>
    );
}