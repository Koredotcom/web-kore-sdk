import BaseChatTemplate from '../baseChatTemplate';
import './advancedMultiSelect.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';

export function AdvancedMultiSelect(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type == 'advanced_multi_select') {
        return (
            <div>Advanced Multi Select</div>
        );
    }
}

class TemplateAdvancedMultiSelect extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(AdvancedMultiSelect, msgData, this.hostInstance);
    }
}

export default TemplateAdvancedMultiSelect;

