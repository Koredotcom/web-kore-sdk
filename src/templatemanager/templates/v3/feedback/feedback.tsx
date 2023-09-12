import BaseChatTemplate from '../baseChatTemplate';
import './formTemplate.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';

export function Feedback(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }

    const handleEvent = (e: any) => {
        if (e.type == 'url' || e.type == 'data-url') {
            let link = e.url;
            if (link.indexOf("http:") < 0 && link.indexOf("https:") < 0) {
                link = "http:////" + link;
            }
            window.open(link, "_blank");
        } else {
            hostInstance.sendMessage(e.payload, { renderMsg: e.title });
        }
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'feedbackTemplate') {
        return (
            <div>Feedback Temaplte</div>
        );
    }
}

class TemplateFeedback extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(Feedback, msgData, this.hostInstance);
    }
}

export default TemplateFeedback;

