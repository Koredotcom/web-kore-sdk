import { h, Fragment } from 'preact';
import BaseChatTemplate from '../../../../templatemanager/templates/v3/baseChatTemplate';
import './pwcButtonTemplate.scss';
export function Button(props: any) {
    const msgData = props.msgData;
    // if (msgData.type == 'onTaskUpdate') {
    if (msgData.type == 'Session_Start') {
        return (
            <div className="campaign-post-button-wrapper">
                <div className="campaign-button-content-details">
                    <button className="button-maintain">Maintenance</button>
                    <div className="content-campaign-more-info">
                        <div className="heading-block-info">
                            <h1>Maintenance</h1>
                            <button>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <p>The next maintenance of the website is been scheduled between at 02:00 am & 04:00 am</p>
                        <a href="#" target="_blank">Know More</a>
                    </div>
                </div>
            </div>
        )
    }
}

class PWCButtonTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(Button, msgData, this.hostInstance);
    }

}

export default PWCButtonTemplate;
