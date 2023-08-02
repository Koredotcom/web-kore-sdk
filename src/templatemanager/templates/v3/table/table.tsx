import BaseChatTemplate from '../baseChatTemplate';
import './table.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';

export function Table(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    if (msgData.message?.[0]?.component?.payload?.template_type == 'table' && msgData.message[0].component.payload?.table_design == 'regular') {
        return (
            <Fragment>
                <div className='table-container'>
                    <Message {...messageobj} />
                    <table>
                        <tr>
                            { msgData.message[0].component.payload.columns.map((ele: any) => (
                                <th>{ele[0]}</th>
                            ))}
                        </tr>
                        { msgData.message[0].component.payload.elements.map((ele: any) => (
                            <tr>
                                { ele.Values.map((e: any) => (
                                    <td>{e}</td>
                                ))}
                            </tr>
                        ))}
                    </table>
                </div>
            </Fragment>
        );
    }

    if (msgData.message?.[0]?.component?.payload?.template_type == 'table' && msgData.message[0].component.payload?.table_design == 'responsive') {
        return (
            <Fragment>
                <div className='table-container'>
                    <Message {...messageobj} />
                        { msgData.message[0].component.payload.elements.map((ele: any) => (
                            <div style={{display: 'flex'}}>
                                { ele.Values.map((e: any, i: any) => (
                                    <div>
                                        <div>{msgData.message[0].component.payload.columns[i]}</div>
                                        <div>{e}</div>
                                    </div>
                                ))}
                            </div>
                        ))}
                </div>
            </Fragment>
        );
    }
}

class TableTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(Table, msgData, this.hostInstance);
    }
}

export default TableTemplate;

