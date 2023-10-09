

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

    let avatarStyle = aShape[brandingInfo.chat_bubble.style];

    if (brandingInfo.chat_bubble.alignment == 'block') {
        avatarStyle = avatarStyle + ' bubble-align-block';
    }

    const closeHelp = (e: any) => {
        e?.stopPropagation();
        hostInstance.chatEle.querySelector('.content-info').remove();
    }

    return (
        <div className="avatar-variations-footer" aria-label="avatar footer">
            <div className={avatarStyle} aria-label="avatar actions">
                <div className="content-info">
                    <div className="text-content animation-slide-up" role="contentinfo" aria-labelledby="helojohn">
                        <h4 id="helojohn">Hello {hostInstance.config.botOptions.userIdentity}</h4>
                        <p className="help-text-content">Welcome to support</p>
                        <span className="close-avatar-content" role="contentinfo" aria-label="close" onClick={closeHelp}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586"/>
                            </svg>
                        </span>
                    </div>
                    <div className="text-content animation-slide-up" role="contentinfo" aria-label="paragraph text">
                        <p className="help-text-content">Can I help you any way?</p>
                    </div>
                    <button className="primary-button animation-slide-up">Send message</button>
                </div>
                <button className="avatar-bg">
                    <span className="un-read-msg">2</span>
                    <figure className="default-avater-icon">
                        <img src={iconHelper.getIcon('avatar_icon')} alt="Elephant at sunset" />
                    </figure>
                    <figure className="close-avater-icon rotateIn">
                        <img src={iconHelper.getIcon('close_chat_avatar')} alt="Elephant at sunset" />
                    </figure>
                </button>
                {/* <button className="button-only-img-avatar">
                    <figure>
                        <img src="https://qa-xo.kore.ai:443/api/getMediaStream/market/f-43348414-840f-5e10-8603-40da4d731d41.png?n=4930054647&s=IkRjZFlTdzV5TW1nZ2xlMDhXck9UWHdaSzNKMUpOa2V0NUg2cjVhL2p2NEk9Ig$$" />
                    </figure>
                </button> */}
            </div>
        </div>
    );
}
