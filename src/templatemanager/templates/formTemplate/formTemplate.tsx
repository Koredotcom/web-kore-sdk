import BaseChatTemplate from '../baseChatTemplate';
import './formTemplate.scss';
import { h, Fragment } from 'preact';
import KoreHelpers from '../../../utils/helpers';

export function Form(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const helpers = KoreHelpers.helpers;

    const handleEvent = (ele: any, id: any) => {
        if (ele.type && ele.type === 'postback') { 
            hostInstance.sendMessage(ele?.payload?.toString() || ele?.value?.toString(), { renderMsg: ele?.title }, msgData);
            return;
        }
        else if (ele.type && (ele.type === 'url' || ele.type === 'web_url')) {
            let link = ele.url;
            if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
                link = `http:////${link}`;
            }
            hostInstance.openExternalLink(link);
            return;
        }
        else {
            const inputEles: any = hostInstance.chatEle.querySelectorAll(`#input-${id}`);
            if (ele.type && ele.type === 'cancel') {
                inputEles.forEach((input: any) => {
                    input.value = '';
                });
                return;
            }
            else if (inputEles && inputEles.length > 0) {
                let isKeysPresent = msgData?.message?.[0]?.component?.payload?.formFields?.every((field:any)=>field.key) || false
                let botMsg:any = isKeysPresent ? {} : [];
                let renderMsg: any = isKeysPresent ? {} : [];
                inputEles.forEach((input: any) => {
                    const rawValue = input.value;
                    let displayValue = rawValue;
                    if (input.type == 'password' || input.getAttribute('data-pii-reduction-char')) { 
                        let piiReductionChar = input.getAttribute('data-pii-reduction-char') || '*';
                        displayValue = displayValue.replace(/./g, piiReductionChar);
                    }

                    if (!isKeysPresent) {
                        botMsg.push(rawValue);
                        renderMsg.push(displayValue);
                    } else {
                        let inputKey = input.getAttribute('data-key');
                        botMsg[inputKey] = rawValue;
                        renderMsg[inputKey] = displayValue;
                    }
                });
                if ((botMsg && typeof botMsg === 'object' && Object.keys(botMsg).length > 0 && Object.entries(botMsg).some(([key, value]) => value === '')) ||
                    (botMsg && typeof botMsg === 'string' && botMsg.trim() === '') ||
                    (botMsg && Array.isArray(botMsg) && botMsg.length > 0 && botMsg.some((value:any) => value === ''))) {
                    return;
                }
                botMsg=!isKeysPresent ? botMsg.join(',') : JSON.stringify(botMsg);
                renderMsg=!isKeysPresent ? renderMsg.join(',') : JSON.stringify(renderMsg);
                hostInstance.sendMessage(botMsg, { renderMsg }, msgData);
            }
        }
    }


    if (msgData?.message?.[0]?.component?.payload?.template_type == 'form_template') {
        return (
            <div className="form-template-wrapper-container" data-cw-msg-id={msgData?.messageId}>
                <div className="form-temp-content">
                    {msgData?.message?.[0]?.component?.payload.heading && <h1 dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(msgData?.message?.[0]?.component?.payload.heading, "bot") }}></h1>}
                    {msgData?.message?.[0]?.component?.payload.formFields.map((ele: any) => (
                        <Fragment>
                            <div className="form-input-wrapper">
                                <label>{ele.label}</label>
                                <input type={ele.type} data-key={ele.key || undefined} id={`input-${msgData.messageId}`} placeholder={ele.placeholder} maxLength={ele.maxLength || undefined} data-pii-reduction-char={ele.piiReductionChar || undefined}></input>
                            </div>
                        </Fragment>))}
                        {!msgData?.message?.[0]?.component?.payload.buttons && msgData?.message?.[0]?.component?.payload.formFields[0].fieldButton && (
                                <button className="kr-button-primary lg" onClick={() =>handleEvent(msgData?.message?.[0]?.component?.payload.formFields[0].fieldButton, msgData.messageId)}>{msgData?.message?.[0]?.component?.payload.formFields[0].fieldButton.title}</button>
                            )}

                        { msgData?.message?.[0]?.component?.payload.buttons && (
                            <div className="btn-group">
                                {msgData.message[0].component.payload.buttons.slice(0, 3).map((btn: any) => {
                                    if (btn && ((btn.type !== "url" && btn.type !== "postback") || !btn.type)) {
                                        return (
                                            <button
                                                className="kr-button-primary"
                                                type={btn.type}
                                                onClick={() => handleEvent(btn, msgData.messageId)}
                                            >
                                                {btn.title}
                                            </button>
                                        );
                                    } else if (btn && (btn.type === "url" || btn.type === "postback")) {
                                        return (
                                            <button
                                                className="kr-button-secondary"
                                                type={btn.type}
                                                {...(btn.type === "url" ? { url: btn.url } : { value: btn.payload })}
                                                title={btn.title}
                                                onClick={() => handleEvent(btn, msgData.messageId)}
                                            >
                                                {btn.title}
                                            </button>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        )}
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

