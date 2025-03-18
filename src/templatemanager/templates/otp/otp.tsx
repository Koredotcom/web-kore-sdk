import { getHTML } from '../../base/domManager';
import BaseChatTemplate from '../baseChatTemplate';
import { Message } from '../message/message';
import './otp.scss';
import { h, Fragment } from 'preact';
import KoreHelpers from '../../../utils/helpers';

export function OTPExt(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const helpers = KoreHelpers.helpers;
    const fromHistory = msgData.fromHistory;
    const messageId = msgData.messageId;
    const payload = msgData.message[0].component.payload;

    const handleInput = (e: Event, index: number) => {
        const input = e.target as HTMLInputElement;
        const inputs = input.parentElement?.querySelectorAll('input');
        
        if (!inputs) return;

        if (!/^\d*$/.test(input.value)) {
            input.value = '';
            return;
        }

        if (input.value && index < payload.pinLength - 1) {
            (inputs[index + 1] as HTMLInputElement).focus();
        }

        validateOtp();
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

    const validateOtp = () => {
        const inputs = document.querySelectorAll(`#otp-inputs-${messageId} input`);
        const submitBtn = document.querySelector(`#submit-button-${messageId}`);
        
        const otp = Array.from(inputs)
            .map(input => (input as HTMLInputElement).value)
            .join('');

        if (submitBtn) {
            submitBtn.classList.toggle('disabled', otp.length !== payload.pinLength);
        }
    };

    const handleSubmit = () => {
        const inputs = document.querySelectorAll(`#otp-inputs-${messageId} input`);
        let otp = Array.from(inputs)
            .map(input => (input as HTMLInputElement).value)
            .join('');
        if (otp.length === payload.pinLength) {
            if (payload.piiReductionChar) {
                otp = payload.piiReductionChar + otp + payload.piiReductionChar;
            }
            hostInstance.sendMessage(otp, { renderMsg: '*'.repeat(otp.length) });
            if (!fromHistory) {
                closeMenu();
            }
        }
    };

    const handleResend = () => {
        const resendPayload = payload.otpButtons[1].payload;
        hostInstance.sendMessage(resendPayload);
    };

    const closeMenu = () => {
        const bottomWrapper = hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper');
        bottomWrapper.classList.add('close-bottom-slide');
        setTimeout(() => {
            bottomWrapper.remove();
        }, 150);
    };

    return (
        <div className="menu-wrapper-data-actions" data-cw-msg-id={msgData?.messageId}>
            <div className="actions-slider-header-menu">
               <div className="title-desc-heading">
                    <h1 dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(payload.title || 'Enter OTP', "bot") }}></h1>
                    <p dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(payload.description || 'Please enter your 4 digit one time password', "bot") }}></p>
               </div>
                {!fromHistory && <button className="menu-close" role="contentinfo" aria-label="close" onClick={closeMenu}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586" />
                    </svg>
                </button>}
            </div>
            <div className="iner-data-scroll-wraper otp-data-scroll-wrapper">
                <div className="otp-phone-num">
                    <div className="phone-icon">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8.00065 11.6663H8.00732M5.46732 14.6663H10.534C11.2807 14.6663 11.6541 14.6663 11.9393 14.521C12.1902 14.3932 12.3942 14.1892 12.522 13.9383C12.6673 13.6531 12.6673 13.2797 12.6673 12.533V3.46634C12.6673 2.7196 12.6673 2.34624 12.522 2.06102C12.3942 1.81014 12.1902 1.60616 11.9393 1.47833C11.6541 1.33301 11.2807 1.33301 10.534 1.33301H5.46732C4.72058 1.33301 4.34721 1.33301 4.062 1.47833C3.81111 1.60616 3.60714 1.81014 3.47931 2.06102C3.33398 2.34624 3.33398 2.7196 3.33398 3.46634V12.533C3.33398 13.2797 3.33398 13.6531 3.47931 13.9383C3.60714 14.1892 3.81111 14.3932 4.062 14.521C4.34721 14.6663 4.72058 14.6663 5.46732 14.6663ZM8.33398 11.6663C8.33398 11.8504 8.18475 11.9997 8.00065 11.9997C7.81656 11.9997 7.66732 11.8504 7.66732 11.6663C7.66732 11.4822 7.81656 11.333 8.00065 11.333C8.18475 11.333 8.33398 11.4822 8.33398 11.6663Z" stroke="#667085" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <p>{payload.mobileNumber}</p>
                </div>
                <div className="otp-input-wrapper">
                    <div className="otp-inputs" id={`otp-inputs-${messageId}`}>
                        {[...Array(payload.pinLength || 4)].map((_, i) => (
                            <input 
                                key={`otp-${i}-${messageId}`}
                                type="text"
                                maxLength={1}
                                placeholder="0"
                                onInput={(e) => handleInput(e, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                            />
                        ))}
                    </div>
                    <div className="text-info-otp">
                        <span>{payload.resendText || 'Didn\'t get a code?'}</span>
                        <button onClick={handleResend}>
                            {payload.otpButtons[1].title || 'Resend'}
                        </button>
                    </div>
                </div>
                <button 
                    id={`submit-button-${messageId}`}
                    className="kr-button-primary lg disabled"
                    onClick={handleSubmit}
                >
                    {payload.otpButtons[0].title || 'Submit'}
                </button>
            </div>
        </div>
    );
}

export function OTP(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const msg = {
        hostInstance,
        msgData
    }
    const msgCopy = {
        hostInstance,
        msgData: {...msgData}
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'otpValidationTemplate') {
        // Check if element already exists
        const existingElement = hostInstance?.chatEle?.querySelector(`[data-cw-msg-id="${msgData?.messageId}"]`);
        if (existingElement) {
            return; // Exit if element already exists
        }
        if (msgData.fromHistory || !msgData.message[0].component.payload.sliderView) {
            return (
                <OTPExt {...msg} />
            );
        } else {
            hostInstance.bottomSliderAction('', getHTML(OTPExt, msgData, hostInstance));
            msgCopy.msgData.message[0].cInfo.body = msgData?.message?.[0]?.component?.payload.title;
            return (
                <Message {...msg} />
            );
        }         
    }
}

class OTPTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(OTP, msgData, this.hostInstance);
    }
}

export default OTPTemplate;