import BaseChatTemplate from '../baseChatTemplate';
import './listView.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';

export function ListView(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type == 'listView') {
        return (
            <div>List View</div>
        );
    }
}

class TemplateListView extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(ListView, msgData, this.hostInstance);
    }
}

export default TemplateListView;

