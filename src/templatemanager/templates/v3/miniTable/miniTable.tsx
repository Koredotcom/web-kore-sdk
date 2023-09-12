import BaseChatTemplate from '../baseChatTemplate';
import './miniTable.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';
import CarouselButtons from '../carouselTemplate/carouselButtons';

export function MiniTable(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'mini_table') {
        setTimeout(() => {
            const carouselButtons = new CarouselButtons({
                hostInstance,
                id: msgData.messageId,
                class: 'hide',
                lsWidth: 50,
                rsWidth: 20
            });
            carouselButtons.init();
        }, 50);
        return (
            <div className="mini-table-template-wrapper"  id={msgData.messageId}>
                <Message {...messageobj}/>
                <div className="mini-table-template">
                    <button className="mini-left-click" c-left-button-id={msgData.messageId}>
                        <i className="sdkv3-cheveron-left"></i>
                    </button>
                    <div className="mini-table" c-parent-id={msgData.messageId}>
                        {msgData.message[0].component.payload.elements.map((ele: any) => (
                            // <table className="mini-table-item" c-items-id={msgData.messageId}>
                            //     <tr>
                            //         { ele.primary.map((e: any) => (
                            //             <th>{e[0]}</th>
                            //         ))}
                            //     </tr>
                            //     {ele.additional.map((el: any) => (
                            //         <tr>
                            //             { el.map((e: any) => (
                            //                 <td>{e}</td>
                            //             ))}
                            //         </tr>
                            //     ))}
                            // </table>
                            <table className="mini-table-regular-view" c-items-id={msgData.messageId}>
                                <thead>
                                    <tr>
                                        { ele.primary.map((e: any) => (
                                        <th>{e[0]}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {ele.additional.map((el: any) => (
                                        <tr>
                                            { el.map((e: any) => (
                                                <td>{e}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ))}
                    </div>
                    <button className="mini-right-click" c-right-button-id={msgData.messageId}>
                        <i className="sdkv3-cheveron-right"></i>
                    </button>
                </div>
            </div>
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

