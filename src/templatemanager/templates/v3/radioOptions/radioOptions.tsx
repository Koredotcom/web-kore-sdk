import BaseChatTemplate from '../baseChatTemplate';
import './radioOptions.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';

export function RadioOptions(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type == 'radioOptionTemplate' && !msgData.fromHistory) {
        return (
            <div className="radio-button-item">
                <input id="radio-1" name="radio" className="radio-input" type="radio" />
                <label for="radio-1" className="radio-label">
                    <div className="radio-title">Radio button item</div>
                    <div className="radio-desc">Radio button item</div>
                </label>
            </div>
        );
    }
}

class RadioOptionsTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(RadioOptions, msgData, this.hostInstance);
    }
}

export default RadioOptionsTemplate;

