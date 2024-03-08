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

    const removeForm = (msgId: any) => {
        const ele = hostInstance.chatEle.querySelector(`.form-${msgId}`);
        if (ele) {
            ele.remove();
        }
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'form_template') {
        return (
            <div className={`form-template-wrapper-container form-${msgData.messageId}`}>
                <div className="form-temp-content">
                    <div className="form-heading">
                        <h1>{msgData?.message?.[0]?.component?.payload.heading}</h1>
                        <button className="close_form" onClick={() => removeForm(msgData.messageId)}>
                            <svg version="1.1" width="auto" height="auto" viewBox="0 0 1024 1024"><title></title><g id="icomoon-ignore"></g><path fill="#697586" d="M557.251 512.005l265.375-265.378c12.498-12.497 12.498-32.758 0-45.255-12.493-12.497-32.758-12.497-45.251 0l-265.381 265.379-265.367-265.355c-12.497-12.497-32.758-12.496-45.255 0.001s-12.496 32.758 0.001 45.255l265.366 265.353-265.367 265.37c-12.497 12.498-12.497 32.758 0 45.256 12.497 12.493 32.758 12.493 45.255 0l265.368-265.37 265.38 265.37c12.498 12.493 32.758 12.493 45.256-0.005 12.493-12.493 12.493-32.758-0.005-45.251l-265.375-265.37z"></path></svg>
                        </button>
                    </div>
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

