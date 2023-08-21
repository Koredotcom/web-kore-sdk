import BaseChatTemplate from '../baseChatTemplate';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';

export function Payment(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type == 'list') {
        return (
            <div className="list-style">
                <div className="card-acc-temp">
                <div className="card-style card-style-header">
                        {msgData?.message?.[0]?.component?.payload.title && <h2>{msgData?.message?.[0]?.component?.payload.title}</h2>}
                    </div>
                    {/* payement methods start*/}
                    {
                        msgData?.message?.[0]?.component?.payload.items.map((val: any) => (
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

class PaymentMethod extends BaseChatTemplate {
    hostInstance: any = this;
    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(Payment, msgData, this.hostInstance);
    }
}

export default PaymentMethod;

