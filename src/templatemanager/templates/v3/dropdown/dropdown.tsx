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
            <div>Dropdown</div>
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

