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

    const selectedItem  = () => {

    }
    if (msgData?.message?.[0]?.component?.payload?.template_type == 'radioOptionTemplate' && !msgData.fromHistory) {
        return (
            <div className="radio-button-wrapper">
                <div>{msgData?.message?.[0]?.component?.payload.heading}</div>
                { msgData?.message?.[0]?.component?.payload.radioOptions.map((ele: any, ind: any) => (
                    <div className="radio-padding">
                        <div className="radio-button-item">
                            <input id={`radio-${ind}`} name="radio" className="radio-input" type="radio" />
                            <label for={`radio-${ind}`} className="radio-label">
                                <div className="radio-title">{ele.title}</div>
                                {/* <div className="radio-desc">Radio button item</div> */}
                            </label>
                        </div>
                    </div>
                ))}
                <button className="kr-button-primary" onClick={selectedItem}>Confirm</button>
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

