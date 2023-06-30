

import './avatarComponent.scss';
import { h } from 'preact';
import { useState } from 'preact/hooks';

export function AvatarComponent(props: any) {
    const hostInstance = props.hostInstance;
    const [brandingInfo, updateBrandingInfo] = useState(hostInstance.config.branding);
    hostInstance.on('onBrandingUpdate', function (event: any) {
        updateBrandingInfo(event.brandingData)
    });

    const aShape = {
        "rounded": "avatar-actions",
        "balloon": "avatar-actions variation-1",
        "rectangle": "avatar-actions variation-2",
        "square": "avatar-actions variation-3"
    }
    return (
        <div className="avatar-variations-footer" aria-label="avatar footer">
            <div className="avatar-actions variation-2" aria-label="avatar actions">
                <div className="content-info">
                    <div className="text-content animation" role="contentinfo" aria-labelledby="helojohn">
                        <h4 id="helojohn">Hello Jhon</h4>
                        <p className="help-text-content">Welcome to support</p>
                        <span className="close-avatar-content" role="contentinfo" aria-label="close">
                            <figure>
                                <img src="/images/close.svg" alt="close" />
                            </figure>
                        </span>
                    </div>
                    <div className="text-content animation" role="contentinfo" aria-label="paragraph text">
                        <p className="help-text-content">Can I help you any way?</p>
                    </div>
                    <button className="primary-button animation">Send message</button>
                </div>
                <button className="avatar-bg" style={{ background: brandingInfo.chat_bubble.primary_color }}>
                    <span className="un-read-msg">2</span>
                    <figure>
                        <img src="/images/avatar.svg" alt="Elephant at sunset" />
                    </figure>
                </button>
            </div>
        </div>
    );
}
