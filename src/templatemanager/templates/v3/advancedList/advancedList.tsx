import BaseChatTemplate from '../baseChatTemplate';
import './advancedList.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';

export function AdvancedList(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type == 'advancedListTemplate') {
        return (
            <div>Advanced List</div>
        );
    }
}

class TemplateAdvancedList extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(AdvancedList, msgData, this.hostInstance);
    }
}

export default TemplateAdvancedList;

