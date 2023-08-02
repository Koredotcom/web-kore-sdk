import BaseChatTemplate from '../baseChatTemplate';
import './tableList.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';

export function TableList(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type == 'tableList') {
        return (
            <div>Table List</div>
        );
    }
}

class TemplateTableList extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(TableList, msgData, this.hostInstance);
    }
}

export default TemplateTableList;

