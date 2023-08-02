import BaseChatTemplate from '../baseChatTemplate';
import './miniTable.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';

export function MiniTable(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type == 'mini_table') {
        return (
            <div>Mini Table</div>
        );
    }
}

class MiniTableTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(MiniTable, msgData, this.hostInstance);
    }
}

export default MiniTableTemplate;

