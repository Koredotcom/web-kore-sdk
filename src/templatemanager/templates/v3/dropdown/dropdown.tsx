import BaseChatTemplate from '../baseChatTemplate';
import './dropdown.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';

export function Dropdown(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const [selectedItem, setSelectedItem] = useState({ title: msgData.message?.[0].component?.payload?.placeholder ? msgData.message?.[0].component?.payload?.placeholder : 'Select', value: msgData.message?.[0].component?.payload?.placeholder ? msgData.message?.[0].component?.payload?.placeholder : 'Select' });

    const openDropdown = (e: any) => {
        e.currentTarget.classList.toggle('show-drp');
    }

    const selectItem = (e: any, item: any) => {
        setSelectedItem(item);
    }

    const onSubmit = () => {
        hostInstance.sendMessage(selectedItem.value, { renderMsg: selectedItem.title });
    }

    const removeDropdown = (msgId: any) => {
        const ele = hostInstance.chatEle.querySelector(`.dropdown-${msgId}`);
        if (ele) {
            ele.remove();
        }
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'dropdown_template') {
        if (msgData?.fromHistory) {
            const selectedItem = msgData?.message?.[0]?.component?.payload?.elements.filter((e: any) => e.value == msgData?.message?.[0]?.component?.selectedValue);
            setSelectedItem(selectedItem[0]);
        }
        return (
            <section className={`dropdwon-wrapper-section dropdown-${msgData.messageId}`}>
                <div className="dropdwon-wrapper-contaner">
                    { msgData.message?.[0].component?.payload.heading && <div className="heading-block">
                        <h1>{msgData.message?.[0].component?.payload.heading}</h1>
                        <button className="close-dropdown" onClick={() =>removeDropdown(msgData.messageId)}>
                            <i className="sdkv3-close"></i>
                        </button>
                    </div> }
                    <div className="dropdown-temp">
                        { msgData.message?.[0].component?.payload?.label && <div className="label-text">{msgData.message?.[0].component?.payload.label}</div> }
                        <div className="drp-menu-wrapper" onClick={openDropdown}>
                            <button className="drp-btn">
                                <span>{selectedItem?.title}</span>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M15 8L10 13L5 8" stroke="#697586" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                            <div className="menu-content-list-drp">
                                { msgData?.message?.[0].component?.payload.elements.map((ele: any) => (
                                    <li className={selectedItem?.title == ele?.title ? 'active-list-option' :''} onClick={event => selectItem(event, ele) }>
                                        <div className="list-section">
                                            <p>{ele.title}</p>
                                            <div className="subtext">{ele.value}</div>
                                        </div>
                                        {/* { selectedItem.title == ele.title && <i className="sdkv3-check"></i> } */}
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7804 3.31768C13.967 3.11682 14.2795 3.1067 14.4784 3.29508C14.6656 3.47238 14.6855 3.76232 14.5317 3.96328L14.5008 3.99987L6.13818 12.509C5.95951 12.7013 5.66615 12.7183 5.46746 12.5556L5.43136 12.523L1.44799 8.55964C1.25373 8.36636 1.25144 8.05066 1.44287 7.85451C1.62304 7.66991 1.9106 7.65699 2.10576 7.81726L2.14122 7.84934L5.76405 11.454L13.7804 3.31768Z" fill="#202124"/>
                                        </svg>
                                    </li>
                                ))}           
                            </div>
                        </div>
                    </div>
                    <button className="kr-button-primary lg" onClick={onSubmit}>Submit</button>
                </div>
            </section>
        );
    }
}

class TemplateDropdown extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(Dropdown, msgData, this.hostInstance);
    }
}

export default TemplateDropdown;

