import BaseChatTemplate from '../baseChatTemplate';
import './table.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';
import { getHTML } from '../../../base/domManager';


export function TableMore(props: any) {
    const msgData: any = props.msgData.msgData;
    const hostInstance: any = props.hostInstance;
 
    return (
        <Fragment>
            <section class="table-wrapper-main-container">
                <section class="table-wrapper-section">
                    <table className="table-regular-view">
                        <thead>
                            <tr>
                                { msgData.message[0].component.payload.columns.map((ele: any) => (
                                    <th>{ele[0]}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            { msgData.message[0].component.payload.elements.map((ele: any) => (
                                <tr>
                                    { ele.Values.map((e: any) => (
                                        <td>{e}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </section>
        </Fragment>
    );
}

export function Table(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }

    const handleShowMore = () => {
        hostInstance.modalAction('', getHTML(TableMore, messageobj, hostInstance));
    }
    if (msgData.message?.[0]?.component?.payload?.template_type == 'table' && msgData.message[0].component.payload?.table_design == 'regular') {
        return (
            <Fragment>
                <section class="table-wrapper-main-container">
                    <Message {...messageobj} />
                    <section class="table-wrapper-section">
                        <table className="table-regular-view">
                            <thead>
                                <tr>
                                    { msgData.message[0].component.payload.columns.map((ele: any) => (
                                        <th>{ele[0]}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                { msgData.message[0].component.payload.elements.map((ele: any) => (
                                    <tr>
                                        { ele.Values.map((e: any) => (
                                            <td>{e}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="show-more-btn" onClick={handleShowMore}>Show More</button>
                    </section>
                </section>
            </Fragment>
        );
    }

    if (msgData.message?.[0]?.component?.payload?.template_type == 'table' && msgData.message[0].component.payload?.table_design == 'responsive') {
        const selectItem = (e: any) => {
            e.currentTarget.classList.toggle('acc-open');
        }
        return (
            <Fragment>
                <div className='table-container'>
                    <Message {...messageobj} />
                    <div className="table-response-wrapper-container">
                        <div className="table-response-wrapper">
                        { msgData.message[0].component.payload.elements.map((ele: any) => (
                            <div className="acc-block-content" onClick={selectItem}>
                                { ele.Values.map((e: any, i: any) => ( i < 2 &&<div className="info-block">
                                    <h1 className="hide">{msgData.message[0].component.payload.columns[i]}</h1>
                                    <p>{e}</p>
                                </div>
                                ))}

                                { ele.Values.map((e: any, i: any) => ( i >= 2 &&<div className="info-block hide">
                                    <h1>{msgData.message[0].component.payload.columns[i]}</h1>
                                    <p>{e}</p>
                                </div>
                                ))}

                                <div className="icon-block">
                                    <i className="sdkv3-cheveron-right"></i>
                                </div>
                            </div>
                        ))}
                        </div>
                        <button className="show-more-btn" onClick={handleShowMore}>Show More</button>
                    </div>
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

