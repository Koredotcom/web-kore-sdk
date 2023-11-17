import { h, Fragment } from 'preact';
import BaseChatTemplate from '../../../../templatemanager/templates/v3/baseChatTemplate';
import './pwcButtonTemplate.scss';
export function Button(props: any) {
    const msgData = props.msgData;
    if (msgData.type == 'onTaskUpdate') {
        return (
            <div>Button Template</div>
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
