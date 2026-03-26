import { h, Fragment } from 'preact';
import BaseChatTemplate from '../../../../templatemanager/templates/baseChatTemplate';
import './pwcBannerTemplate.scss';
export function Banner(props: any) {
    const msgData = props.msgData;
    const hostInstance = props.hostInstance;

    if (msgData.type == 'pwe_message' && msgData.body.campInfo?.webCampaignType && msgData.body.campInfo?.webCampaignType == 'banner' && msgData?.body?.layoutDesign) {
        const layoutDesign = msgData.body?.layoutDesign;
        // "pwc-active-campaign-template" class is added to the DOM after the campaign template is rendered
        // This class is used to identify the campaign template and prevent the sendApiEvent from getting triggered multiple times
        // DONOT REMOVE THIS CLASS
        let bannerClass = 'pwc-active-campaign-template campaign-banner-sec';
        if (layoutDesign.pattern == 'floating') {
            bannerClass = bannerClass + ' floating-banner';
        }
        if (layoutDesign.placement == 'bottom') {
            bannerClass = bannerClass + ' position-bottom';
        }
        let messages = layoutDesign.messages;
        let msgs: any = [];
        messages.forEach((ele: any) => {
            const obj = {
                type: ele.type,
                value: decodeURIComponent(atob(ele.value))
            }
            msgs.push(obj);
        });
        layoutDesign.messages = msgs;
        const closeBanner = () => {
            // Clear from sessionStorage
            hostInstance.plugins.ProactiveWebCampaignPlugin.clearPersistedTemplateFromStorage();
            
            // Remove from DOM
            const bannerEle: any = document.querySelector('.campaign-banner-sec');
            bannerEle.remove();
            hostInstance.plugins.ProactiveWebCampaignPlugin.recordCampaignMetric(
                msgData.body.campInfo.campInstId,
                msgData.body.campInfo.campId,
                { eventInfo: { action: 'close', data: {} } }
            );
        }
        return (
            <div className={bannerClass}>
                <div className="banner-data-info" style={{backgroundColor: layoutDesign?.backgroundColor}}>
                    <div className="info-p-data" style={{color: layoutDesign?.color}}>
                        { layoutDesign.messages.map((ele: any) => (
                        <p dangerouslySetInnerHTML={{__html: ele.value}}></p>
                        ))}
                    </div>
                    <button className="close_banner" onClick={() => closeBanner()}>
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
