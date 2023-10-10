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
        const input: any = hostInstance.chatEle.querySelector('.form-input-wrapper');
        const inputEle: any = input.querySelector('input[type=\'password\']');
        hostInstance.sendMessage(inputEle.value, { renderMsg: inputEle.value, msgData });
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
                                <input type={ele.type} placeholder={ele.placeholder}></input>
                            </div>
                            <button className="kr-button-primary lg" onClick={handleEvent}>{ele.fieldButton.title}</button>
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

