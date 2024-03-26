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
    const [brandingInfo, updateBrandingInfo] = useState(hostInstance.config.branding);
    hostInstance.on('onBrandingUpdate', function (event: any) {
        updateBrandingInfo({...event.brandingData})
    });
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }

    let agentBannerClass: any = {
        '1': 'agent-joined-wrapper',
        '2': 'agent-joined-wrapper agent-joined-variation-1',
        '3': 'agent-joined-wrapper agent-joined-variation-2' 
    };

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'SYSTEM' && !msgData.formHistory) {
        if (msgData.message[0].component && msgData.message[0].component.payload) {
            msgData.message[0].cInfo.body = msgData.message[0].component.payload.text || "";
        }
        return (
            <div className={`agent-joined-banner i${msgData.messageId}`} data-time-stamp={msgData.createdOnTimemillis}>
                <div className={agentBannerClass[brandingInfo.body.agent_message.separator]}>
                    <div className="img-block">
                        <figure>
                            <img src={msgData.icon ? msgData.icon : brandingInfo.body.agent_message.icon.icon_url} alt="agent image" />
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

