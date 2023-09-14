import BaseChatTemplate from '../baseChatTemplate';
import './formTemplate.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';

export function Form(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }

    const handleEvent = (e: any) => {
        if (e.type == 'url' || e.type == 'data-url') {
            let link = e.url;
            if (link.indexOf("http:") < 0 && link.indexOf("https:") < 0) {
                link = "http:////" + link;
            }
            window.open(link, "_blank");
        } else {
            hostInstance.sendMessage(e.payload, { renderMsg: e.title });
        }
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'form_template') {
        return (
            <div className="form-template-wrapper-container">
                <div className="form-temp-content">
                    <h1>Fill the form</h1>
                    <div className="form-input-wrapper">
                        <label>Enter Password</label>
                        <input type="text" placeholder="Enter password"></input>
                    </div>
                    <button className="kr-button-primary lg">Submit</button>
                </div>
            </div>
        );
    }
}

class TemplateForm extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(Form, msgData, this.hostInstance);
    }
}

export default TemplateForm;

