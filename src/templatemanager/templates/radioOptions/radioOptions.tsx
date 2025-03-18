import BaseChatTemplate from '../baseChatTemplate';
import './radioOptions.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';
import { getHTML } from '../../base/domManager';
import KoreHelpers from '../../../utils/helpers';

export function RadioOptionsComp(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const helpers = KoreHelpers.helpers;
    const [selectItem, setSelectedItem] = useState({title: '', value: ''});

    const selectedItem  = (e: any) => {
        setSelectedItem(e);
    }

    const onSubmit = () => {
        if (msgData?.message?.[0]?.component?.payload?.slideView) {
            closeMenu();
        }
        if (selectItem.title && selectItem.value) {
            hostInstance.sendMessage(selectItem.value, { renderMsg: selectItem.title});
        }
    }

    const closeMenu = () => {
        hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').classList.add('close-bottom-slide');
        setTimeout(() => {
            hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').remove('.chat-actions-bottom-wraper');
        }, 150);
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'radioOptionTemplate' && !msgData.fromHistory) {
        return (
            <div className="radio-button-wrapper" data-cw-msg-id={msgData?.messageId}>
                {msgData?.message?.[0]?.component?.payload.heading && <h1 dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(msgData?.message?.[0]?.component?.payload.heading, "bot") }}></h1>}
                { msgData?.message?.[0]?.component?.payload.radioOptions.map((ele: any, ind: any) => (
                    <div className="radio-padding">
                        <div className="radio-button-item" onClick={() => selectedItem(ele.postback)}>
                            <input id={`radio-${msgData.messageId}-${ind}`} name={`radio-${msgData.messageId}`} className="radio-input" type="radio" />
                            <label for={`radio-${msgData.messageId}-${ind}`} className="radio-label">
                                {ele.title && <div className="radio-title" dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(ele.title, "bot") }}></div>}
                                {ele.value && <div className="radio-desc" dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(ele.value, "bot") }}></div>}
                            </label>
                        </div>
                    </div>
                ))}
                <button className="kr-button-primary lg" onClick={onSubmit} dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(msgData?.message?.[0]?.component?.payload.submitButtonText || 'Confirm', "bot") }}></button>
            </div>
        );
    } else {
        return null;
    }
}

export function RadioOptionsSlider(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageObj = {
        msgData: msgData,
        hostInstance: hostInstance
    }

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
                <RadioOptionsComp {...messageObj} />
            </div>
        </div>
    )
}


export function RadioOptions(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageObj = {
        msgData: msgData,
        hostInstance: hostInstance
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'radioOptionTemplate' && !msgData.fromHistory) {
        // Check if element already exists
        const existingElement = hostInstance?.chatEle?.querySelector(`[data-cw-msg-id="${msgData?.messageId}"]`);
        if (existingElement) {
            return; // Exit if element already exists
        }
        if (msgData?.message?.[0]?.component?.payload?.slideView) {
            hostInstance.bottomSliderAction('', getHTML(RadioOptionsSlider, msgData, hostInstance));
            return (
                <Message {...messageObj} />
            )
        } else {
            return (
                <RadioOptionsComp {...messageObj} />
            )
        }
    }

}


class RadioOptionsTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(RadioOptions, msgData, this.hostInstance);
    }
}

export default RadioOptionsTemplate;

