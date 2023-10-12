import BaseChatTemplate from '../../baseChatTemplate';
import './insureAssistFormTemplate.scss';
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { getHTML } from '../../../../base/domManager';
import { Message } from '../../message/message';

// ../../../base/domManager
// import IconsManager from '../../../../templateManager/base/icons/i';

export function InsureAsssitForm(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const msgObj = {
        msgData,
        hostInstance
    }
    // function handleInput(e: any, maxLength: any) {
    //     const input = e.target;
    //     if (maxLength && input.value.length > maxLength) {
    //         input.value = input.value.slice(0, maxLength); // Truncate input if it exceeds maxLength
    //     }
    // }
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
            hostInstance.bottomSliderAction('', getHTML(InsureAsssitForm, e, hostInstance));
        }
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type === 'insureAssistFormTemplate' && !msgData?.fromHistory) {
        if (msgData?.message?.[0]?.component?.payload?.render_type != 'slider') {
            hostInstance.bottomSliderAction('', getHTML(InsureAsssitForm, msgData, hostInstance));
            return (
                <Message {...msgObj} />
            )
        } else {
            return (
                <form className="card-form content-info">
                    <div className="left-data">
                        <h2 style={msgData?.message[0].component?.payload?.style}>{msgData?.message[0].component?.payload?.heading}</h2>
                    </div>
                    <div className="right-data">
                        <figure>
                            <img src="/images/close-large.svg" alt="remove" />
                        </figure>
                    </div>

                    <div className="login-card">
                        {msgData?.message[0].component?.payload?.formFields?.map((ele: any) => (
                            <div>
                                <label> {ele.label && ele.label} </label>
                                <input
                                    type={ele.type && ele.type}
                                    id={ele.key && ele.key}
                                    name={ele.key && ele.key}
                                    placeholder={ele.placeholder && ele.placeholder}
                                />
                            </div>
                        ))}
                        {msgData.message[0]?.component?.payload?.buttons?.map((button: any, btnIndex: any) => (
                             <button style={button?.btnStyle} className="view-more-btn kr-button-primary lg info-Btn" type="button" onClick={() => handleButtonEvent(button)}>{button.title}</button>
                        ))}
                    </div>
                </form>

            )
        }
    }
}

class InsureAsssitFormTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(InsureAsssitForm, msgData, this.hostInstance);
    }
}
export default InsureAsssitFormTemplate;
