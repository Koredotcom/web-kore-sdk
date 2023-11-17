import { h, Fragment } from 'preact';
import BaseChatTemplate from '../../../../templatemanager/templates/v3/baseChatTemplate';
import './pwcBannerTemplate.scss';
export function Banner(props: any) {
    const msgData = props.msgData;
    if (msgData.type == 'Bot_Active') {
        return (
            <div>Banner Template</div>
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
