import { h, Fragment } from 'preact';
import BaseChatTemplate from '../../../../templatemanager/templates/v3/baseChatTemplate';
import './pwcPostTemplate.scss';
export function Post(props: any) {
    const msgData = props.msgData;
    if (msgData.type == 'Session_Start') {
        return (
            <div>Post Template</div>
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
