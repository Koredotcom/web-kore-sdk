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

    const handleEvent = (ele: any, id: any) => {
        const inputEle: any = hostInstance.chatEle.querySelector(`#input-${id}`);
        if (inputEle && inputEle.value) {
            let botMsg = inputEle.value;
            let renderMsg = inputEle.value;
            if (ele.type == 'password') {
                let render = ' ';
                for (let i = 0; i < renderMsg.length; i++) {
                    render = render + '*';
                }
                renderMsg = render;
            }
            hostInstance.sendMessage(botMsg, { renderMsg }, msgData);
        }
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'form_template') {
        return (
            <div className="form-template-wrapper-container">
                <div className="form-temp-content">
                    <h1>{msgData?.message?.[0]?.component?.payload.heading}</h1>
                    {msgData?.message?.[0]?.component?.payload.formFields.map((ele: any) => (
                        <Fragment>
                            <div className="form-input-wrapper">
                                <label>{ele.label}</label>
                                <input type={ele.type} id={`input-` + msgData.messageId} placeholder={ele.placeholder}></input>
                            </div>
                            <button className="kr-button-primary lg" onClick={() =>handleEvent(ele, msgData.messageId)}>{ele.fieldButton.title}</button>
                        </Fragment>))}
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

