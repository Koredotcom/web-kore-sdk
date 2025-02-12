import { getHTML } from '../../base/domManager';
import BaseChatTemplate from '../baseChatTemplate';
import { Message } from '../message/message';
import './resetPin.scss';
import { h, Fragment } from 'preact';

export function Reset(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const isFromHistory = msgData.fromHistory;
    const messageId = msgData.messageId;
    const payload = msgData?.message?.[0]?.component?.payload || {};

    const closeMenu = () => {
        hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').classList.add('close-bottom-slide');
        setTimeout(() => {
            hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').remove('.chat-actions-bottom-wraper');
        }, 150);
    }

    const pinLength = payload.pinLength || 4;

    const handleInput = (e: Event, index: number) => {
        const input = e.target as HTMLInputElement;
        const value = input.value;
        const inputs = input.parentElement?.querySelectorAll('input');
        
        if (!inputs) return;

        if (!/^\d*$/.test(value)) {
            input.value = '';
            return;
        }

        if (value && index < pinLength - 1) {
            (inputs[index + 1] as HTMLInputElement).focus();
        }

        validatePinInputs();
    };

    const validatePinInputs = () => {
        const pin1Inputs = document.querySelectorAll(`#pin-set-1-${messageId} input`);
        const pin2Inputs = document.querySelectorAll(`#pin-set-2-${messageId} input`);
        const submitButton = document.querySelector(`#submit-button-${messageId}`);
        const errorDiv = document.querySelector(`#pin-error-${messageId}`);

        const pin1 = Array.from(pin1Inputs).map(input => (input as HTMLInputElement).value).join('');
        const pin2 = Array.from(pin2Inputs).map(input => (input as HTMLInputElement).value).join('');

        const expectedLength = payload.pinLength || 4;
        
        if (submitButton) {
            const isValidLength = pin1.length === expectedLength && pin2.length === expectedLength;
            const pinsMatch = pin1 === pin2;
            
            if (isValidLength && pinsMatch) {
                submitButton.classList.remove('disabled');
                errorDiv?.classList.add('hidden');
            } else {
                submitButton.classList.add('disabled');
                if (isValidLength && !pinsMatch && errorDiv) {
                    errorDiv.textContent = payload.warningMessage || 'PINs do not match';
                    errorDiv.classList.remove('hidden');
                }
            }
        }
    };

    const handleKeyDown = (e: KeyboardEvent, index: number) => {
        const input = e.target as HTMLInputElement;
        const inputs = input.parentElement?.querySelectorAll('input');
        
        if (!inputs) return;

        if (e.key === 'Backspace' && index > 0 && !input.value) {
            e.preventDefault();
            (inputs[index - 1] as HTMLInputElement).focus();
        }
    };

    const handleSubmit = () => {
        const pin1Inputs = document.querySelectorAll(`#pin-set-1-${messageId} input`);
        const pin2Inputs = document.querySelectorAll(`#pin-set-2-${messageId} input`);
        
        const pin1 = Array.from(pin1Inputs).map(input => (input as HTMLInputElement).value).join('');
        const pin2 = Array.from(pin2Inputs).map(input => (input as HTMLInputElement).value).join('');

        const errorDiv = document.querySelector(`#pin-error-${messageId}`);
        
        if (pin1 !== pin2) {
            if (errorDiv) {
                errorDiv.textContent = payload.warningMessage || 'PINs do not match';
                errorDiv.classList.remove('hidden');
            }
        } else {
            if (errorDiv) {
                errorDiv.classList.add('hidden');
            }
            
            let finalPin = pin1;
            if (payload.piiReductionChar) {
                finalPin = `${payload.piiReductionChar}${pin1}${payload.piiReductionChar}`;
            }

            hostInstance.sendMessage(finalPin, { renderMsg: '*'.repeat(pin1.length) });
            if (!isFromHistory) {
                closeMenu();
            }
        }
    };

    return (
        <div className="menu-wrapper-data-actions" data-cw-msg-id={msgData?.messageId}>
            <div className="actions-slider-header-menu">
                <h1>{payload.title || 'Reset PIN'}</h1>
                {!isFromHistory && <button className="menu-close" role="contentinfo" aria-label="close" onClick={closeMenu}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586" />
                    </svg>
                </button>}
            </div>
            <div className="iner-data-scroll-wraper otp-data-scroll-wrapper">
                <div className="otp-input-wrapper">
                    <p>{payload.enterPinTitle || 'Enter your new PIN'}</p>
                    <div className="otp-inputs" id={`pin-set-1-${messageId}`}>
                        {Array.from({ length: pinLength }, (_, i) => (
                            <input 
                                key={`pin1-${i}-${messageId}`}
                                type="text" 
                                maxLength={1}
                                placeholder="0"
                                onInput={(e) => handleInput(e, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                            />
                        ))}
                    </div>
                </div>
                <div className="otp-input-wrapper">
                    <p>{payload.reEnterPinTitle || 'Re-enter your PIN'}</p>
                    <div className="otp-inputs" id={`pin-set-2-${messageId}`}>
                        {Array.from({ length: pinLength }, (_, i) => (
                            <input 
                                key={`pin2-${i}-${messageId}`}
                                type="text" 
                                maxLength={1}
                                placeholder="0"
                                onInput={(e) => handleInput(e, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                            />
                        ))}
                    </div>
                </div>
                <div id={`pin-error-${messageId}`} className="pin-error hidden"></div>
                {payload.resetButtons && payload.resetButtons.length > 0 && <button 
                    id={`submit-button-${messageId}`}
                    className="kr-button-primary lg disabled" 
                    onClick={handleSubmit}
                >
                    {payload.resetButtons[0].title || 'Reset'}
                </button>}
            </div>
        </div>
    );
}

export function ResetPin(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const msg = {
        hostInstance,
        msgData
    }
    const msgDataCopy = {...msgData};
    const msgCopy = {
        hostInstance,
        msgData: msgDataCopy
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'resetPinTemplate') {
        // Check if element already exists
        const existingElement = hostInstance?.chatEle?.querySelector(`[data-cw-msg-id="${msgData?.messageId}"]`);
        if (existingElement) {
            return; // Exit if element already exists
        }
        if (msgData.fromHistory) {
            return (
                <Reset {...msg} />
            );
        } else {
            hostInstance.bottomSliderAction('', getHTML(Reset, msgData, hostInstance));
            msgCopy.msgData.message[0].cInfo.body = msgData?.message?.[0]?.component?.payload.title;
            return (
                <Message {...msgCopy} />
            );
        }
    }
}

class ResetPinTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(ResetPin, msgData, this.hostInstance);
    }
}

export default ResetPinTemplate;