import BaseChatTemplate from '../baseChatTemplate';
import './table.scss';
import { h, Fragment } from 'preact';
import { useEffect } from 'preact/hooks';
import { Message } from '../message/message';
import { getHTML } from '../../../base/domManager';

export function TableExt(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const showMore = props?.showMore || false;
    const messageObj = {
        msgData: msgData,
        hostInstance: hostInstance
    }

    if (msgData.message?.[0]?.component?.payload?.template_type == 'table' && msgData.message[0].component.payload?.table_design == 'regular') {
        return (
            <Fragment>
                <section class="table-wrapper-main-container">
                    {showMore && <Message {...messageObj} />}
                    <section class="table-wrapper-section">
                        <table className="table-regular-view">
                            <thead>
                                <tr>
                                    {msgData.message[0].component.payload.columns.map((ele: any) => (
                                        <th>{ele[0]}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {msgData.message[0].component.payload.elements.map((ele: any, ind: any) => (
                                    (((showMore && ind < 3) || !showMore) && <tr>
                                        {ele.Values.map((e: any) => (
                                            <td>{e}</td>
                                        ))}
                                    </tr>)
                                ))}
                            </tbody>
                        </table>
                        {showMore && msgData.message[0].component.payload.elements.length > 3 && <button className={`show-more-btn table-show-more-${msgData.messageId}`}>Show More</button>}
                    </section>
                </section>
            </Fragment>
        );
    } else if (msgData.message?.[0]?.component?.payload?.template_type == 'table' && msgData.message[0].component.payload?.table_design == 'responsive') {
        const selectItem = (e: any) => {
            e.currentTarget.classList.toggle('acc-open');
        }
        return (
            <Fragment>
                <div className='table-container'>
                    {showMore && <Message {...messageObj} />}
                    <div className="table-response-wrapper-container">
                        <div className="table-response-wrapper">
                            {msgData.message[0].component.payload.elements.map((ele: any, ind: any) => (
                                (((showMore && ind < 3) || !showMore) && <div className="acc-block-content" onClick={selectItem}>
                                    {ele.Values.map((e: any, i: any) => (i < 2 && <div className="info-block">
                                        <h1 className="hide">{msgData.message[0].component.payload.columns[i]}</h1>
                                        <p title={e}>{e}</p>
                                    </div>
                                    ))}

                                    {ele.Values.map((e: any, i: any) => (i >= 2 && <div className="info-block hide">
                                        <h1>{msgData.message[0].component.payload.columns[i]}</h1>
                                        <p>{e}</p>
                                    </div>
                                    ))}

                                    <div className="icon-block">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                            <path d="M6.09961 4L10.0996 8L6.09961 12" stroke="#697586" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>)
                            ))}
                        </div>
                        {showMore && <button className={`show-more-btn table-show-more-${msgData.messageId}`}>Show More</button>}
                    </div>
                </div>
            </Fragment>
        );
    } else {
        return null;
    }
}

export function Table(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const msgObj = {
        msgData: msgData,
        hostInstance: hostInstance,
        showMore: true
    }

    if (msgData.message?.[0]?.component?.payload?.template_type == 'table') {
        useEffect(() => {
            setTimeout(() => {
                msgData.message[0].component.payload.table_design = 'regular';
                hostInstance.chatEle.querySelector(`.table-show-more-${msgData.messageId}`)?.addEventListener('click', (e: any) => {
                    hostInstance.modalAction(getHTML(TableExt, msgData, hostInstance));
                });
            }, 500);
        });
        if (msgData?.fromHistory) {
            msgObj.msgData.message[0].cInfo.body = msgObj.msgData.message[0].cInfo.body.payload.text;
        }
        return (
            <Fragment>
                <TableExt {...msgObj} />
            </Fragment>
        )
    }
}

class TableTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(Table, msgData, this.hostInstance);
    }
}

export default TableTemplate;

