

import './chatWidgetHeader.scss';
import { h } from 'preact';

export function ChatWidgetHeader(props: any) {

    const hSizeObj: any = {
        "compact": "chat-widget-header",
        "regular": "chat-widget-header regular transparent-style",
        "large": "chat-widget-header large "
    }

    const header = props?.header;

    const hBgColor = header?.bg_color || '#FFFFFF';
    const hSize = header?.size || 'large';
    const hStyle = header?.style || 'solid';
    const hIcon = header?.icon.show || true;
    const hIconUrl = header?.icon.icon_url || '/images/avatar-bot.svg';
    const hIconColor = header?.icon.color;
    const hTitle = header?.title.name || 'Bot';
    const hTitleColor = header?.title.color;
    const hSubTitle = header?.sub_title.name || 'Personal Assistant';
    const hSubTitleColor = header?.sub_title.color;
    const hClose = header?.buttons.close.show || true;
    const hCloseIcon = header?.buttons.close.icon || '/images/close-large.svg';


    return (
        <div className={hSizeObj[hSize]} aria-label="chat widget header">
            <button className="back-to-chat" aria-label="back to welcome screen">
                <figure>
                    <img src="/images/arrow-back.svg" alt="back button" />
                </figure>
            </button>
            <div className="info-content-data">
               { hIcon && <div className="img-block">
                    <figure>
                        <img src={hIconUrl} alt="back button" />
                    </figure>
                </div> }
                <div className="content-text">
                    <h1 aria-label="bot name" style={{color: hTitleColor}}>{hTitle}</h1>
                    <h2 aria-label="bot desc" style={{color: hSubTitleColor}}>{hSubTitle}</h2>
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
                {hClose && <button className="btn-action btn-action-close">
                    <figure>
                            <img src={hCloseIcon} alt="back button" />
                        </figure>
                    {/* <i className="sdkv3-close"></i> */}
                </button>}
            </div>
        </div>
    );
}