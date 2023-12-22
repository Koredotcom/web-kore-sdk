import BaseChatTemplate from '../../baseChatTemplate';
import './loginForm.css';
import { h, Fragment } from 'preact';
import { useState, useMemo } from 'preact/hooks';

export function customLoginForm(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleButtonEvent = () => {
        // Get all elements with the class 'focus-me'
        var elements = document.getElementsByClassName('custom-form-input-wrapper');
        var inputValues = {"username":`${username}`,"password":`${password}`}
        const stringifiedValues = JSON.stringify(inputValues);
        let clientMessageId = new Date().getTime();
        
        let messageToBot: any = {
            clientMessageId: clientMessageId,
            resourceid: '/bot.message',
        };
        if (stringifiedValues && stringifiedValues.trim() && stringifiedValues.trim().length) {
            messageToBot["message"] = {
                body: stringifiedValues.trim()
            }
        }
        hostInstance.bot.sendMessage(messageToBot);
        setUsername('');
        setPassword('');
        // Find the target div within the custom-form-wrapper
        const targetDiv = document.querySelector('.custom-form-wrapper');

        // Check if the target div is found
        if (targetDiv) {
            // Apply the CSS style to hide the div
            // targetDiv.style.display = 'none';
            // targetDiv.classList.add('display-none');
            targetDiv.classList.remove('custom-form-wrapper');
            targetDiv.classList.add('display-none');
            hostInstance.showTypingIndicator();
        }
        
    }

    //for disable and enable the submit button
    const onInputKeyUp = (event: any) => {
        
        var elements: HTMLElement[] = [];
        var count = 0;
        
        // Assuming there are multiple elements with the same class
        var ele = document.querySelectorAll('.custom-form-input');
        
        // Find the element with the class "disabledField"
        const disabled = document.querySelectorAll('.solutionFormSubmit');
        var disabledField: HTMLElement[] = [];
        ele.forEach((element, index, arr) => {
            // Check if the current element is one of the last two
            if (index >= arr.length - 2) {
                elements.push(element as HTMLElement);
                count++;
            }
        });
        var count = 0;
        disabled.forEach((element, index, arr) => {
            // Check if the current element is one of the last two
            if (index >= arr.length - 1) {
                disabledField.push(element as HTMLElement);
                count++;
            }
        });
        
        if (elements.length > 0) {
            var userName    = elements[0] as HTMLInputElement;
            var disable     = true;
            var userCondition = false;
            var passwordCondition = false;
            setUsername(userName.value);
            
            if (userName.value.length >= 4) {
                userCondition = true;
            }
            
            var password = elements[1] as HTMLInputElement;
            setPassword(password.value);
            if (password.value.length >= 4) {
                passwordCondition = true;
            }
            if (userCondition == true && passwordCondition == true) {
                // Check if the element is found
                if (disabledField) {
                    // Remove the "disabled" attribute to enable the field
                    disabledField[0].removeAttribute('disabled');
                }
            } else {
                // Check if the element is found
                if (disabledField) {
                    // Remove the "disabled" attribute to enable the field
                    disabledField[0].setAttribute('disabled', 'true');
                }
            }
        }   


        
    };

    if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == 'solutionsFormTemplate') {
        
        return (
            <div>
                <div className="custom-form-wrapper custom-forms-thumbnails">
                    {msgData.message[0].component.payload.icon &&
                        <div className="custom-form-data-content">
                            <div className="icon-block">
                                <img width="40" height="40" src={msgData.message[0].component.payload.icon} />
                            </div>
                            {msgData.message[0].component.payload.heading &&
                                <h1>{msgData.message[0].component.payload.heading}</h1>
                            }
                        </div>
                    }
                    <div className="custom-form-body">
                        <form id="customForm">
                            <div className="formBody" >
                                {msgData?.message?.[0]?.component?.payload.formFields.map((ele: any) => (
                                    <Fragment>
                                        <div className="custom-form-input-wrapper">
                                            <label>{ele.label}</label>
                                            <input  value={ele.key === "username" ? `${username}` : `${password}` } type={ele.type} placeholder={ele.placeholder} onKeyUp={onInputKeyUp} name={ele.key} className={`custom-form-input ${msgData.message[0].component.payload.error_message === 'true' ? 'red-form-control' : ''}`} autoComplete="off"></input>
                                        </div>

                                    </Fragment>))}
                                    {msgData.message[0].component.payload.error_message == "true" &&
                                        <div class="custom-errorMessage">{msgData.message[0].component.payload.errorMessage}</div>
                                    }
                            </div>
                        </form>
                        {
                            msgData.message[0].component.payload.buttons.map((ele: any) => (
                                <div class="custom-form-input-wrapper">
                                    <button className="custom-form-button solutionFormSubmit" onClick={() => handleButtonEvent()} type={ele.type}  disabled>{ele.title}</button>
                                </div>
                            ))
                        }
                    </div>    
                </div>
            </div>
        );
        
    }
}

class loginForm extends BaseChatTemplate {
    hostInstance: any = this;
    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(customLoginForm, msgData, this.hostInstance);
    }
}

export default loginForm;