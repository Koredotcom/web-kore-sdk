import BaseChatTemplate from '../baseChatTemplate';
import './dropdown.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';

export function Dropdown(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type == 'dropdown_template') {
        return (
            <section className="dropdwon-wrapper-section">
                <div className="dropdwon-wrapper-contaner">
                    <div className="heading-block">
                        <h1>Fill the form</h1>
                        <button className="close-dropdown">
                            <i className="sdkv3-close"></i>
                        </button>
                    </div>
                    <div className="dropdown-temp">
                        <div className="label-text">Please select</div>
                        <div className="drp-menu-wrapper">
                            <button className="drp-btn">
                                <span>Placeholder</span>
                                <i className="sdkv3-back-arrow"></i>
                            </button>
                            <div className="menu-content-list-drp">
                                <li className="active-list-option">
                                    <p>Item 2</p>
                                    <i className="sdkv3-check"></i>
                                </li>
                                <li>
                                    <p>Item 2</p>
                                    <i className="sdkv3-check"></i>
                                </li>
                                <li>
                                    <p>Item 2</p>
                                    <i className="sdkv3-check"></i>
                                </li>
                            </div>
                        </div>
                    </div>
                    <button className="kr-button-primary lg">Submit</button>
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

