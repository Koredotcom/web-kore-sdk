

import BaseChatTemplate from '../baseChatTemplate';
import './button.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import MessageTemplate, { Message } from '../message/message';
export function Button(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const handleButtonEvent = (e: any) => {
        hostInstance.sendMessageToBot(e);
    }
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type === 'button' && !msgData?.message?.[0]?.component?.formData) {
        return (
            <Fragment>
                <div>
                    <Message {...messageobj} />
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
                </div>
            </Fragment>
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

