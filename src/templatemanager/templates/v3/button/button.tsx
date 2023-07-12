

import BaseChatTemplate from '../baseChatTemplate';
import './button.scss';
import { h } from 'preact';
import { useState } from 'preact/hooks';

export function Button(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const handleButtonEvent = (e: any) => {
        hostInstance.sendMessageToBot(e);
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type === 'button' && !msgData?.message?.[0]?.component?.formData) {
        return (
            <div className="button-template-container">
                <div className="button-temp button-variation-2">
                    {
                        msgData.message[0].component.payload.buttons.map((ele: any) => (
                            <button className="kr-btn" onClick={() => handleButtonEvent(ele.title)}>{ele.title}
                            </button>
                        ))
                    }
                </div>
            </div>
        );
    }
}

class TemplateButton extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(Button, msgData, this.hostInstance);
    }

}

export default TemplateButton;

