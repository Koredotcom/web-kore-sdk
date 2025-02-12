

import BaseChatTemplate from '../baseChatTemplate';
import './button.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';
export function Button(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const handleButtonEvent = (e: any) => {
        if (e.type.toLowerCase() == 'postback' || e.type.toLowerCase() == 'text') {
            hostInstance.sendMessage(e.payload?.toString() || e.value?.toString(), { renderMsg: e.title });
        } else if (e.type == 'url' || e.type == 'web_url') {
            let link = e.url;
            if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
                link = `http:////${link}`;
            }
            hostInstance.openExternalLink(link);
        }
    }
    let messageObj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type === 'button' && !msgData?.message?.[0]?.component?.formData) {

        let buttonStyle = 'button-temp';
        const buttonVariations: any = {
            'plain': '',
            'textInverted': 'button-variation-1',
            'backgroundInverted': 'button-variation-2'
        }

        buttonStyle = buttonStyle + ' ' + buttonVariations[msgData?.message?.[0]?.component?.payload?.variation];
        if (msgData?.message?.[0]?.component?.payload?.fullWidth) {
            buttonStyle = buttonStyle + ' full-width-buttons';
        }

        if (msgData?.message?.[0]?.component?.payload?.stackedButtons) {
            buttonStyle = buttonStyle + ' stack-buttons';
        }

        if (msgData?.fromHistory || msgData?.fromHistorySync) {
            messageObj.msgData.message[0].cInfo.body = messageObj.msgData.message[0].cInfo.body.payload.text;
        }
        return (
            <Fragment>
                <div data-cw-msg-id={msgData?.messageId}>
                    {msgData.message[0].component.payload.text && <Message {...messageObj} />}
                    <div className="button-template-container">
                        <div className={buttonStyle}>
                            {
                                msgData.message[0].component.payload.buttons.map((ele: any) => (
                                    <button className="kr-btn" onClick={() => handleButtonEvent(ele)}>{ele.title}
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

