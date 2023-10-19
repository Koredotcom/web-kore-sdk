
import BaseChatTemplate from '../../baseChatTemplate';
import './insureAssistFormTemplate.scss';
import { h } from 'preact';
import { useState, useMemo } from 'preact/hooks';
import { getHTML } from '../../../../base/domManager';
import { Message } from '../../message/message';
export function InsureAsssitForm(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const msgObj = {
        msgData,
        hostInstance
    }
    const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [buttondisable, setbuttondisable] = useState(false);

    const handleInputChange = (event: any, fieldKey: any) => {
        const { value } = event.target;
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [fieldKey]: value,
        }));
        // const allRequiredFieldsFilled = Object.keys(inputValues).every((key) => {
        //     return requiredFields.includes(key) && !!inputValues[key];
        //   });
        
    };
    const handleFormSubmit = (e:any) => {
        const stringifiedValues = JSON.stringify(inputValues);
        hostInstance.sendMessage(stringifiedValues, { renderMsg: 'Submit' });
        setFormSubmitted(true);
    };

    const handleButtonEvent = (e: any) => {
        if (e?.type?.toLowerCase() === 'postback' || e?.type?.toLowerCase() === 'text') {
          hostInstance.sendMessage(e.value, { renderMsg: e.title });
        } else if (e?.type === 'url' || e?.type === 'web_url') {
          let link = e.value;
          if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
            link = `http:////${link}`;
          }
          hostInstance.openExternalLink(link);
        } else {
          // handle form submission
          // this part remains the same
          handleFormSubmit(e);
        }
      }      
      

    // const closeMenu = () => {
    //     hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').classList.add('close-bottom-slide');
    //     setTimeout(() => {
    //         hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').remove('.chat-actions-bottom-wraper');
    //     }, 150);
    // }
    const handleInsureAssistTeamp = (props: any) => {
        const hostInstance = props.hostInstance;
        const msgData = props.msgData;
        let isSliderOpened = false;
        return (
            <div>
                <form className="card-form content-info chat-actions-bottom-wraper" id="myForm">
                    <div className="header">
                        <div className="header-icon">
                            <img src={msgData?.message?.[0]?.component?.payload?.icon} />
                        </div>
                        <h2 style={msgData?.message?.[0]?.component?.payload.headerStyle}>{msgData?.message?.[0]?.component?.payload?.title}</h2>
                    </div>
                    <div className="left-data">
                        <h2 style={msgData?.component?.payload?.style}>{msgData?.message[0].component?.payload?.heading}</h2>
                    </div>
                    {/* <div className="right-data">
                        <figure onClick={closeMenu}>
                            <img src="/images/close-large.svg" alt="remove" />
                        </figure>
                    </div> */}

                    {msgData.message[0]?.component?.payload?.formFields?.map((ele: any) => (
                        <div>
                            <label> {ele.label && ele.label} </label>
                            <input
                                type={ele.type && ele.type}
                                id={ele.key && ele.key}
                                name={ele.key && ele.key}
                                placeholder={ele.placeholder && ele.placeholder}
                                value={inputValues[ele.key]}
                                disabled={formSubmitted}
                                onChange={(event: Event) => handleInputChange(event, ele.key)}
                            />
                        </div>
                    ))}

                    {msgData.message[0]?.component?.payload?.buttons?.map((button: any, btnIndex: any) => (
                        <button
                            style={button?.style}
                            className="view-more-btn lg info-Btn"
                            type="button"
                            data-key={button.key}
                            disabled={formSubmitted}
                            onClick={() => handleButtonEvent(button)}
                        >
                            {button.title}
                        </button>
                    ))}

                </form>
            </div>

        )
    }
    // const memoizedHandleButtonEvent = useMemo(() => handleButtonEvent, [inputValues]);

    if (msgData?.message?.[0]?.component?.payload?.template_type === 'solutionsFormTemplate' && !msgData?.fromHistory) {
        if (msgData?.message?.[0]?.component?.payload?.render_type != 'slider') {
            let isSliderOpened = false;
            if (!isSliderOpened) {
                isSliderOpened = true;
                hostInstance.bottomSliderAction('', getHTML(handleInsureAssistTeamp, msgData, hostInstance))
                return (
                    <Message {...msgObj} />
                )
            }
        } else {
            return (
                <div>
                    <form className="cardFor-info-template card-form content-info" id="myForm" onSubmit={handleFormSubmit}>
                        <div className="header">
                            <div className="header-icon">
                                <img src={msgData?.message?.[0]?.component?.payload?.icon} />
                            </div>
                            <h2 style={msgData?.message?.[0]?.component?.payload.heading?.style}>{msgData?.message?.[0]?.component?.payload?.heading?.title}</h2>
                        </div>
                        <div className="login-card-container">
                            <div className="left-data">
                                <h2 style={msgData?.message[0].component?.payload?.description?.style}>{msgData?.message[0].component?.payload?.description?.title}</h2>
                            </div>
                            {/* <div className="right-data">
                            <figure onClick={closeMenu}>
                                <img src="/images/close-large.svg" alt="remove" />
                            </figure>
                        </div> */}

                            <div className="login-card">
                                {msgData?.message[0].component?.payload?.formFields?.map((ele: any) => (
                                    <div className="login-container">
                                        <label> {ele.label && ele.label} </label>
                                        <input
                                            type={ele.type && ele.type}
                                            id={ele.key && ele.key}
                                            name={ele.key && ele.key}
                                            placeholder={ele.placeholder && ele.placeholder}
                                            value={inputValues[ele.key] || ''}
                                            disabled={formSubmitted}
                                            onChange={(event: Event) => handleInputChange(event, ele.key)}
                                        />
                                    </div>
                                ))}
                                {msgData.message[0]?.component?.payload?.buttons?.map((button: any, btnIndex: any) => (
                                    <button
                                        style={button?.style}
                                        className="view-more-btn lg info-Btn"
                                        type="button"
                                        data-key={button.key}
                                        disabled={buttondisable}
                                        onClick={() => handleButtonEvent(button)}
                                    >
                                        {button.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </form>
                </div>
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

