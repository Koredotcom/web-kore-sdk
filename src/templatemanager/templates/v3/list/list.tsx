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
    const handleButtonEvent = (e: any) => {
        if (e.type.toLowerCase() == 'postback' || e.type.toLowerCase() == 'text') {
            hostInstance.sendMessage(e.value, { renderMsg: e.title });
        } else if (e.type == 'url' || e.type == 'web_url') {
            let link = e.value;
            if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
                link = `http:////${link}`;
            }
            hostInstance.openExternalLink(link);
        }
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type == 'list') {
        return (
            <div className="list-style">
                <div className="card-acc-temp">
                    <div className="card-style card-style-header">
                        {msgData?.message?.[0]?.component?.payload.title && <h2>{msgData?.message?.[0]?.component?.payload.title}</h2>}
                    </div>
                    {/* payement options start */}
                    {
                        msgData?.message?.[0]?.component?.payload.items.map((val: any) => (
                            <div className="card-acc-temp-sec" onClick={() => handleButtonEvent(val.actions)}>
                                <div>
                                    <div className="left-data">
                                        {val.title && <h1>{val.title}</h1>}
                                        {val.date && <p>{val.date}</p>}
                                    </div>
                                    <div className="right-data">
                                        {val.value && <h2>{val.value}</h2>}
                                        {val.subtitle && <p className="font-style">{val.subtitle}</p>}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    {/* payement options end */}

                    {/* payement methods start*/}

                    {
                        msgData?.message?.[0]?.component?.payload.paymentsOption.map((val: any) => (
                            <div className="card-acc-temp-sec card-style">
                                <div>
                                    <div className="left-data">
                                        {val.title && <h1>{val.title}</h1>}
                                        {/* {val.date && <p>{val.date}</p>} */}
                                        {val.value && <p>{val.value}</p>}
                                    </div>
                                    <div className="right-data">
                                        {val.icon && <img src={val.icon} />}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    {/* payement methods end*/}

                </div>
            </div>
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

