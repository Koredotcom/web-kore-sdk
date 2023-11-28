import { h, Fragment } from 'preact';
import BaseChatTemplate from '../../../../templatemanager/templates/v3/baseChatTemplate';
import './pwcBannerTemplate.scss';
export function Banner(props: any) {
    const msgData = props.msgData;
    if (msgData.type == 'SessionStart') {
        return (
            <div className="campaign-banner-sec">
                <div className="banner-data-info">
                    <div className="info-p-data">
                        <p>Hey First name, enjoy 15% off your next order</p>
                    </div>
                    <button className="close_banner">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8.70703 8.00009L12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L7.99991 7.293L3.85355 3.14681C3.65829 2.95156 3.34171 2.95156 3.14645 3.14683C2.95119 3.34209 2.9512 3.65868 3.14646 3.85393L7.2928 8.0001L3.14645 12.1465C2.95118 12.3417 2.95118 12.6583 3.14645 12.8536C3.34171 13.0488 3.65829 13.0488 3.85355 12.8536L7.99992 8.7072L12.1465 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.70703 8.00009Z" fill="white"/>
                        </svg>
                    </button>
                </div>
            </div>
        )
    }
}

class PWCBannerTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(Banner, msgData, this.hostInstance);
    }

}

export default PWCBannerTemplate;
