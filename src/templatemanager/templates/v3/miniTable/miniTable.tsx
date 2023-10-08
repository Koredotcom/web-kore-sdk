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
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
                            <path d="M12 15.5L7 10.5L12 5.5" stroke="#697586" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
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
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
                            <path d="M7 5.5L12 10.5L7 15.5" stroke="#697586" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
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

