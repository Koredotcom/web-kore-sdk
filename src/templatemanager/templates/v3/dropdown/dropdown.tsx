import BaseChatTemplate from '../baseChatTemplate';
import './dropdown.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';

export function Dropdown(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const [selectedItem, setSelectedItem] = useState({ title: 'Select', value: 'Select' });
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }

    const openDropdown = (e: any) => {
        e.currentTarget.classList.toggle('show-drp');
    }

    const selectItem = (e: any, item: any) => {
        setSelectedItem(item);
    }

    const onSubmit = () => {
        hostInstance.sendMessage(selectedItem.value, { renderMsg: selectedItem.title });
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'dropdown_template') {
        if (msgData?.fromHistory) {
            const selectedItem = msgData?.message?.[0]?.component?.payload?.elements.filter((e: any) => e.value == msgData?.message?.[0]?.component?.selectedValue);
            setSelectedItem(selectedItem[0]);
        }
        return (
            <section className="dropdwon-wrapper-section">
                <div className="dropdwon-wrapper-contaner">
                    { msgData.message?.[0].component?.payload.heading && <div className="heading-block">
                        <h1>{msgData.message?.[0].component?.payload.heading}</h1>
                        {/* <button className="close-dropdown">
                            <i className="sdkv3-close"></i>
                        </button> */}
                    </div> }
                    <div className="dropdown-temp">
                        {/* <div className="label-text">Please select</div> */}
                        <div className="drp-menu-wrapper" onClick={openDropdown}>
                            <button className="drp-btn">
                                <span>{selectedItem?.title}</span>
                                <i className="sdkv3-back-arrow"></i>
                            </button>
                            <div className="menu-content-list-drp">
                                { msgData?.message?.[0].component?.payload.elements.map((ele: any) => (
                                    <li className={selectedItem?.title == ele?.title ? 'active-list-option' :''} onClick={event => selectItem(event, ele) }>
                                        <p>{ele.title}</p>
                                        {/* { selectedItem.title == ele.title && <i className="sdkv3-check"></i> } */}
                                        <i className="sdkv3-check"></i>
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

