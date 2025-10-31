import { h, Fragment } from 'preact';
import BaseChatTemplate from '../../../../templatemanager/templates/baseChatTemplate';
import './pwcPostTemplate.scss';
export function Post(props: any) {
    const msgData = props.msgData;
    const hostInstance = props.hostInstance;
    
    if (msgData.type == 'pwe_message' && msgData.body.campInfo?.webCampaignType && msgData.body.campInfo?.webCampaignType == 'post' && msgData?.body?.layoutDesign) {
        const layoutDesign = msgData.body?.layoutDesign;
        // "pwc-active-campaign-template" class is added to the DOM after the campaign template is rendered
        // This class is used to identify the campaign template and prevent the sendApiEvent from getting triggered multiple times
        // DONOT REMOVE THIS CLASS
        let postClass = 'pwc-active-campaign-template campaign-post-banner-data-sec';
        if (layoutDesign?.size == 'small') {
            postClass = postClass + ' small-post-banner';
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
        const closePost = () => {
            // Clear from sessionStorage
            hostInstance.plugins.ProactiveWebCampaignPlugin.clearPersistedTemplateFromStorage();
            
            // Remove from DOM
            const bannerEle: any = document.querySelector('.campaign-post-banner-data-sec');
            bannerEle.remove();
        }
        return (
            <div className={postClass}>
                <div className="post-banner-data">
                    <div className="header-block-info">
                        <button className="close-post-banner" onClick={closePost}>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                                <path d="M13.2985 5.70215L5.74023 13.2604M5.74023 5.70215L13.2985 13.2604" stroke="#101828" stroke-width="1.51166" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    <div className="banner-img-data" dangerouslySetInnerHTML={{__html: layoutDesign?.messages[0]?.value}}></div>
                </div>
            </div>
        )
    }
}

class PWCPostTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(Post, msgData, this.hostInstance);
    }

}

export default PWCPostTemplate;
