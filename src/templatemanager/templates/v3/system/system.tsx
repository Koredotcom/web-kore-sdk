import BaseChatTemplate from '../baseChatTemplate';
import './system.scss';
import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Message } from '../message/message';
import KoreHelpers from '../../../../utils/helpers';

export function System(props: any) {
    const helpers = KoreHelpers.helpers;
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'SYSTEM' && !msgData.formHistory) {
        if (msgData.message[0].component && msgData.message[0].component.payload) {
            msgData.message[0].cInfo.body = msgData.message[0].component.payload.text || "";
        }
        return (
            <div className="agent-joined-banner">
                <div className="agent-joined-wrapper">
                    <div className="img-block">
                        <figure>
                            <img src={msgData.icon} alt="agent image" />
                        </figure>
                    </div>
                    <div className="agent-name">{msgData.message[0].cInfo.body}</div>
                    <div className="time-stamp">
                        <time>{helpers.formatAMPMDay(msgData.createdOn)}</time>
                    </div>
                </div>
            </div>
        );
    }
}

class TemplateSystem extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(System, msgData, this.hostInstance);
    }
}

export default TemplateSystem;

