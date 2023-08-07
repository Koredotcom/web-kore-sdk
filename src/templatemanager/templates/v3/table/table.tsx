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
                        <button className="show-more-btn">Show More</button>
                    </section>
                </section>
            </Fragment>
        );
    }

    if (msgData.message?.[0]?.component?.payload?.template_type == 'table' && msgData.message[0].component.payload?.table_design == 'responsive') {
        return (
            <Fragment>
                <div className='table-container'>
                    <Message {...messageobj} />
                    {/* { msgData.message[0].component.payload.elements.map((ele: any) => (
    <div style={{display: 'flex'}}>
        { ele.Values.map((e: any, i: any) => (
            <div className={i >= 2 ? 'hide': ''}>
                <div className={i < 2 ? 'hide' : ''}>{msgData.message[0].component.payload.columns[i]}</div>
                <div>{e}</div>
            </div>
        ))}
    </div>
))} */}
                    <div className="table-response-wrapper-container">
                        <div className="table-response-wrapper">
                            <div className="acc-block-content">
                                <div className="info-blcok">
                                    <h1>SI</h1>
                                    <p>1</p>
                                </div>
                                <div className="info-blcok">
                                    <h1>Name</h1>
                                    <p>Peter</p>
                                </div>
                                <div className="icon-block">
                                    <i className="sdkv3-cheveron-right"></i>
                                </div>
                            </div>
                            <div className="acc-block-content">
                                <div className="info-blcok">
                                    <h1>SI</h1>
                                    <p>1</p>
                                </div>
                                <div className="info-blcok">
                                    <h1>Name</h1>
                                    <p>Peter</p>
                                </div>
                                <div className="icon-block">
                                    <i className="sdkv3-cheveron-right"></i>
                                </div>
                            </div>
                            <div className="acc-block-content">
                                <div className="info-blcok">
                                    <h1>SI</h1>
                                    <p>1</p>
                                </div>
                                <div className="info-blcok">
                                    <h1>Name</h1>
                                    <p>Peter</p>
                                </div>
                                <div className="icon-block">
                                    <i className="sdkv3-cheveron-right"></i>
                                </div>
                            </div>
                            <div className="acc-block-content">
                                <div className="info-blcok">
                                    <h1>SI</h1>
                                    <p>1</p>
                                </div>
                                <div className="info-blcok">
                                    <h1>Name</h1>
                                    <p>Peter</p>
                                </div>
                                <div className="icon-block">
                                    <i className="sdkv3-cheveron-right"></i>
                                </div>
                            </div>
                        </div>
                        <button className="show-more-btn">Show More</button>
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

