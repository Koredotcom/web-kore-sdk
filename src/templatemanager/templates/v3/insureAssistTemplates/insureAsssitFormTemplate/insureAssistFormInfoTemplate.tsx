import BaseChatTemplate from '../../baseChatTemplate';
import './insureAssistFormTemplate.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../../message/message';

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

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'insureAssistLogInForm') {
        return (
            <div className="cardFor-info-template">
                <div className="header">
                    <div className="header-icon">
                    <img src={msgData?.message?.[0]?.component?.payload?.icon} />
                    </div>
                    <h2 style={msgData?.message?.[0]?.component?.payload.headerStyle}>{msgData?.message?.[0]?.component?.payload?.title}</h2>
                </div>
                <div className="card-body">
                    <p style={msgData?.message?.[0]?.component?.payload?.descriptionStyle}>{msgData?.message?.[0]?.component?.payload?.description}</p>
                    {msgData?.message?.[0]?.component?.payload?.buttons.map((ele: any) => (
                        <button style={ele?.btnStyle} className="kr-button-primary lg info-Btn" onClick={handleEvent}>{ele.title}</button>
                    ))}
                </div>
            </div>
        )
    }
}

class InsureAssistInfoForm extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(Form, msgData, this.hostInstance);
    }
}

export default InsureAssistInfoForm;

