

import './avatarComponent.scss';
import { h } from 'preact';

export function AvatarComponent() {

    return (
        <div className="avatar-variations-footer" aria-label="avatar footer">
            <div className="avatar-actions" aria-label="avatar actions">
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
                <button className="avatar-bg">
                    <span className="un-read-msg">2</span>
                    <figure>
                        <img src="/images/avatar.svg" alt="Elephant at sunset" />
                    </figure>
                </button>
            </div>
        </div>
    );
}
