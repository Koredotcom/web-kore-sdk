

import './chatWidgetHeader.scss';
import { h } from 'preact';

export function ChatWidgetHeader() {
    return (
        <div className="chat-widget-header" aria-label="chat widget header">
            <button className="back-to-chat" aria-label="back to welcome screen">
                <figure>
                    <img src="/images/arrow-back.svg" alt="back button" />
                </figure>
            </button>
            <div className="info-content-data">
                <div className="img-block">
                    <figure>
                        <img src="/images/avatar-bot.svg" alt="back button" />
                    </figure>
                </div>
                <div className="content-text">
                    <h1 aria-label="bot name">Bot</h1>
                    <h2 aria-label="bot desc">Your personal assistant</h2>
                </div>
            </div>
            <div className="actions-info">
                <button className="btn-action">
                    {/* <figure>
                            <img src="/images/help.svg" alt="back button" />
                        </figure> */}
                    <i className="sdkv3-help"></i>
                </button>
                <button className="btn-action">
                    {/* <figure>
                            <img src="/images/support.svg" alt="back button" />
                        </figure> */}
                    <i className="sdkv3-support"></i>
                </button>
                <button className="btn-action">
                    {/* <figure>
                            <img src="/images/close-large.svg" alt="back button" />
                        </figure> */}
                    <i className="sdkv3-close"></i>
                </button>
            </div>
        </div>
    );
}