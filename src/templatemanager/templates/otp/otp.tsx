import { getHTML } from '../../base/domManager';
import BaseChatTemplate from '../baseChatTemplate';
import { Message } from '../message/message';
import './otp.scss';
import { h, Fragment } from 'preact';

export function OTPExt(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;

    const closeMenu = () => {
        hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').classList.add('close-bottom-slide');
        setTimeout(() => {
            hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').remove('.chat-actions-bottom-wraper');
        }, 150);
    }

    return (
        <div className="menu-wrapper-data-actions">
            <div className="actions-slider-header-menu">
                <h1></h1>
                <button className="menu-close" role="contentinfo" aria-label="close" onClick={closeMenu}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586" />
                    </svg>
                </button>
            </div>
            <div className="iner-data-scroll-wraper">
                <div>OTP Template</div>
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

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'otpValidationTemplate') {
        hostInstance.bottomSliderAction('', getHTML(OTPExt, msgData, hostInstance));

        return (
            <Message {...msg} />
        );
    }
}

class OTPTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(OTP, msgData, this.hostInstance);
    }
}

export default OTPTemplate;