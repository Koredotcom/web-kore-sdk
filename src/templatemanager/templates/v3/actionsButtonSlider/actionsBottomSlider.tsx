

import BaseChatTemplate from '../baseChatTemplate';
import './actionsBottomSlider.scss';
import { h } from 'preact';

export function ActionsBottomSlider(props: any) {
    const msgData = props.msgData;
    if (msgData.msg) {
        return (
            <div className="chat-actions-bottom-wraper" aria-label="chat widget body">
                <div className="actions-contnet-data">
                    <h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1>
                </div>
            </div>
        );
    }
}

class ActionsBottomSliderTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(ActionsBottomSlider, msgData, this.hostInstance);
    }

}

export default ActionsBottomSliderTemplate;

