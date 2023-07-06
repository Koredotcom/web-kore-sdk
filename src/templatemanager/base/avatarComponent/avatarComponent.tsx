

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
    return (
        <div className="avatar-variations-footer" aria-label="avatar footer">
            <div className={aShape[brandingInfo.chat_bubble.style]} aria-label="avatar actions">
                <div className="content-info">
                    <div className="text-content animation" role="contentinfo" aria-labelledby="helojohn">
                        <h4 id="helojohn">Hello {hostInstance.config.botOptions.userIdentity}</h4>
                        <p className="help-text-content">Welcome to support</p>
                        <span className="close-avatar-content" role="contentinfo" aria-label="close">
                            <figure>
                                <img src={iconHelper.getIcon('close_icon')} alt="close" />
                            </figure>
                        </span>
                    </div>
                    <div className="text-content animation" role="contentinfo" aria-label="paragraph text">
                        <p className="help-text-content">Can I help you any way?</p>
                    </div>
                    <button className="primary-button animation" style={{ background: brandingInfo.chat_bubble.secondary_color }}>Send message</button>
                </div>
                <button className="avatar-bg" style={{ background: brandingInfo.chat_bubble.primary_color }}>
                    <span className="un-read-msg">2</span>
                    <figure>
                        <img src={iconHelper.getIcon('avatar_icon')} alt="Elephant at sunset" />
                    </figure>
                </button>
            </div>
        </div>
    );
}
