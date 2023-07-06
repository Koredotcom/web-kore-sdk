

import IconsManager from '../iconsManager';
import './chatWidgetComposeBar.scss';
import { h } from 'preact';
import { useState } from 'preact/hooks';

export function ChatWidgetComposeBar(props: any) {
    const hostInstance = props.hostInstance;
    const iconHelper = new IconsManager();
    const [brandingInfo, updateBrandingInfo] = useState(hostInstance.config.branding);
    hostInstance.on('onBrandingUpdate', function (event: any) {
        updateBrandingInfo({...event.brandingData})
    });
    const handleClick =  (event: any) => {}

    return (
        <div className="chat-widget-composebar" aria-label="chat widget compose">
            <div className="voice-speak-msg-info" style="display:none">
                <div className="voice-msg-bubble">I would like to know my account balance</div>
            </div>
            <div className="attachment-wrapper-data" style="display:none">
                <div className="select-file-block">
                    <button className="inputfile-btn">
                        <span>Media</span>
                        <input type="file" />
                    </button>
                    <button className="inputfile-btn">
                        <span>Media</span>
                        <input type="file" />
                    </button>
                </div>
                <div className="uploaded-attachment-data">
                    <div className="uploaded-item">
                        <div className="img-block"></div>
                        <div className="content-data">
                            <h1>Document name.png</h1>
                            <div className="progress-percentage">
                                <div></div>
                            </div>
                            <p>525KB • 30% uploaded</p>
                        </div>
                        <button className="delete-upload">
                            <figure>
                                <img src="/images/close-large.svg" alt="remove" />
                            </figure>
                        </button>
                    </div>
                    <div className="uploaded-item">
                        <div className="img-block"></div>
                        <div className="content-data">
                            <h1>Document name.png</h1>
                            <div className="progress-percentage">
                                <div></div>
                            </div>
                            <p>525KB • 30% uploaded</p>
                        </div>
                        <button className="delete-upload">
                            <figure>
                                <img src="/images/close-large.svg" alt="remove" />
                            </figure>
                        </button>
                    </div>
                    <div className="uploaded-item">
                        <div className="img-block"></div>
                        <div className="content-data">
                            <h1>Document name.png</h1>
                            <div className="progress-percentage">
                                <div></div>
                            </div>
                            <p>525KB • 30% uploaded</p>
                        </div>
                        <button className="delete-upload">
                            <figure>
                                <img src="/images/close-large.svg" alt="remove" />
                            </figure>
                        </button>
                    </div>
                </div>
            </div>
            <div className="compose-bar-wrapper" aria-label="compose footer">
                { brandingInfo.footer.buttons.menu.show && <button className="action-btn">
                    <figure>
                        <img src={iconHelper.getIcon('hamberger')} alt="image" />
                    </figure>
                </button> }
                { brandingInfo.footer.buttons.attachment.show && <button className="action-btn">
                    <figure>
                        <img src={iconHelper.getIcon('attachment')} alt="image" />
                    </figure>
                </button> }
                <div className="compose-text-area">
                    { brandingInfo.footer.buttons.emoji.show &&  <button className="emoji-btn">
                        <figure>
                            <img src={iconHelper.getIcon('emoji')} alt="image" />
                        </figure>
                    </button> }
                    <textarea className="typing-text-area disableComposeBar" id="typing-text-area" placeholder={brandingInfo.footer.compose_bar.placeholder}></textarea>
                </div>
                <div className="compose-voice-text">
                    <button className="voice-compose-btn">
                        <figure>
                            <img src={iconHelper.getIcon('send')} alt="image" />
                        </figure>
                    </button>
                    <p className="speak-info">Tap microphone to speak</p>
                </div>
                { brandingInfo.footer.buttons.microphone.show && <button className="voice-btn">
                    <figure>
                        <img src={iconHelper.getIcon('voice')} alt="image" />
                    </figure>
                </button> }
                <button className="send-btn">
                        <figure>
                            <img src={iconHelper.getIcon('send')} alt="image" />
                        </figure>
                    </button>
            </div>
        </div>
    );
} 
