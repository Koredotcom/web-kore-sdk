

import './chatWidgetHeader.scss';
import { h } from 'preact';
import { useState } from 'preact/hooks';
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
                    <h1 aria-label="bot name" style={{color: brandingInfo.header.title.color}}>{brandingInfo.header.title.name}</h1>
                    <h2 aria-label="bot desc" style={{color: brandingInfo.header.header?.sub_title.color}}>{brandingInfo.header.sub_title.name}</h2>
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