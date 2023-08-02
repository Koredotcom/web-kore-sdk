import BaseChatTemplate from '../baseChatTemplate';
import './list.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';

export function List(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type == 'list') {
        return (
            <div>List</div>
        );
    }
}

class TemplateList extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(List, msgData, this.hostInstance);
    }
}

export default TemplateList;

