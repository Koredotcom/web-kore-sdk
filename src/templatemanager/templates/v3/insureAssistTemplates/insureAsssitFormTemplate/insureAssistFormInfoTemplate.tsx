import BaseChatTemplate from '../../baseChatTemplate';
import './insureAssistFormTemplate.scss';
import { h, Fragment } from 'preact';
import { getHTML } from '../../../../base/domManager';
import { useState } from 'preact/hooks';
import { Message } from '../../message/message';

export function Form(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    const handleButtonEvent = (e: any) => {
        if (e.type.toLowerCase() == 'postback' || e.type.toLowerCase() == 'text') {
            hostInstance.sendMessage(e.value, { renderMsg: e.title });
        } else if (e.type == 'url' || e.type == 'web_url') {
            let link = e.value;
            if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
                link = `http:////${link}`;
            }
            hostInstance.openExternalLink(link);
        } else if (e.type == 'slider') {
            hostInstance.bottomSliderAction('', getHTML(Form, e, hostInstance));
        }
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'insureAssistPromptTemplate') {
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
                        <button style={ele?.btnStyle} className="kr-button-primary lg info-Btn"  onClick={() => handleButtonEvent(ele)}>{ele.title}</button>
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

