

import './avatarComponent.scss';
import { h } from 'preact';
import { useState } from 'preact/hooks';
import IconsManager from '../iconsManager';

export function AvatarComponent(props: any) {
    const hostInstance = props.hostInstance;
    const iconHelper = new IconsManager();
    const [brandingInfo, updateBrandingInfo] = useState(hostInstance.config.branding);
    hostInstance.on('onBrandingUpdate', function (event: any) {
        updateBrandingInfo({...event.brandingData})
    });

    const aShape: any = {
        "rounded": "avatar-actions",
        "balloon": "avatar-actions variation-1",
        "rectangle": "avatar-actions variation-2",
        "square": "avatar-actions variation-3"
    }

    const closeHelp = (e: any) => {
        e?.stopPropagation();
        hostInstance.chatEle.querySelector('.content-info').remove();
    }

    return (
        <div className="avatar-variations-footer" aria-label="avatar footer">
            <div className={aShape[brandingInfo.chat_bubble.style]} aria-label="avatar actions">
                <div className="content-info">
                    <div className="text-content animation-slide-up" role="contentinfo" aria-labelledby="helojohn">
                        <h4 id="helojohn">Hello {hostInstance.config.botOptions.userIdentity}</h4>
                        <p className="help-text-content">Welcome to support</p>
                        <span className="close-avatar-content" role="contentinfo" aria-label="close" onClick={closeHelp}>
                            <figure>
                                <img src={iconHelper.getIcon('close_icon')} alt="close" />
                            </figure>
                        </span>
                    </div>
                    <div className="text-content animation-slide-up" role="contentinfo" aria-label="paragraph text">
                        <p className="help-text-content">Can I help you any way?</p>
                    </div>
                    <button className="primary-button animation-slide-up" style={{ background: brandingInfo.chat_bubble.secondary_color }}>Send message</button>
                </div>
                <button className="avatar-bg" style={{ background: brandingInfo.chat_bubble.primary_color }}>
                    <span className="un-read-msg">2</span>
                    <figure className="default-avater-icon">
                        <img src={iconHelper.getIcon('avatar_icon')} alt="Elephant at sunset" />
                    </figure>
                    <figure className="close-avater-icon rotateIn">
                        <img src={iconHelper.getIcon('close_chat_avatar')} alt="Elephant at sunset" />
                    </figure>
                    <p className="minimize-text">Minimize Text</p>
                </button>
            </div>
        </div>
    );
}
