import BaseChatTemplate from '../baseChatTemplate';
import './checkBoxes.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';

export function CheckBoxes(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type == 'multi_select') {
        return (
            <div>Check Boxes</div>
        );
    }
}

class TemplateCheckBoxes extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(CheckBoxes, msgData, this.hostInstance);
    }
}

export default TemplateCheckBoxes;

