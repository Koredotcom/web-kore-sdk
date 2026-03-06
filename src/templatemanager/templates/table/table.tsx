import BaseChatTemplate from '../baseChatTemplate';
import './table.scss';
import { h, Fragment } from 'preact';
import { useEffect } from 'preact/hooks';
import { Message } from '../message/message';
import { getHTML } from '../../base/domManager';
import KoreHelpers from '../../../utils/helpers';

export function TableExt(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const helpers = KoreHelpers.helpers;
    const showMore = props?.showMore || false;
    const messageObj = {
        msgData: msgData,
        hostInstance: hostInstance
    }

    if (msgData.message?.[0]?.component?.payload?.template_type == 'table' && msgData.message[0].component.payload?.table_design == 'regular') {
        return (
            <Fragment>
                <section class="table-wrapper-main-container" data-cw-msg-id={msgData?.messageId}>
                    {showMore && msgData?.message?.[0]?.cInfo?.body &&<Message {...messageObj} />}
                    <section class="table-wrapper-section">
                        <table className="table-regular-view">
                            <thead>
                                <tr>
                                    {msgData.message[0].component.payload.columns.map((ele: any) => (
                                        <th dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(ele[0] || "", "bot") }}></th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {msgData.message[0].component.payload.elements.map((ele: any, ind: any) => (
                                    (((showMore && ind < 3) || !showMore) && <tr>
                                        {ele.Values.map((e: any) => (
                                            <td dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(e || "", "bot") }}></td>
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
                    {showMore && msgData?.message?.[0]?.cInfo?.body && <Message {...messageObj} />}
                    <div className="table-response-wrapper-container">
                        <div className="table-response-wrapper">
                            {msgData.message[0].component.payload.elements.map((ele: any, ind: any) => (
                                (((showMore && ind < 3) || !showMore) && <div className="acc-block-content" onClick={selectItem} tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') selectItem(e); }} >
                                    {ele.Values.map((e: any, i: any) => (i < 2 && <div className="info-block">
                                        <h1 className="hide" dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(msgData.message[0].component.payload.columns[i], "bot") }}></h1>
                                        <p title={e} dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(e, "bot") }}></p>
                                    </div>
                                    ))}

                                    {ele.Values.map((e: any, i: any) => (i >= 2 && <div className="info-block hide">
                                        <h1 dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(msgData.message[0].component.payload.columns[i], "bot") }}></h1>
                                        <p dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(e, "bot") }}></p>
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
    } else if (msgData.message?.[0]?.component?.payload?.template_type == 'custom_table' && msgData.message[0].component.payload?.table_design == 'regular') {
        const payload = msgData.message[0].component.payload;
        const handleCellClick = (cellValue: any) => {
            if (cellValue[1] === 'button' && cellValue[2]) {
                if (cellValue[2].type === 'web_url' && cellValue[2].url) {
                    let link = cellValue[2].url;
                    if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
                        link = `https://${link}`;
                    }
                    hostInstance.openExternalLink(link);
                } else if (cellValue[2].type === 'postback') {
                    hostInstance.sendMessage(cellValue[2].payload, { renderMsg: cellValue[2].title });
                }
            }
        }
        return (
            <Fragment>
                <section class="table-wrapper-main-container" data-cw-msg-id={msgData?.messageId}>
                    {showMore && msgData?.message?.[0]?.cInfo?.body && <Message {...messageObj} />}
                    <section class="table-wrapper-section">
                            <table className="table-regular-view" cellSpacing={0} cellPadding={0}>
                                <thead>
                                    <tr>
                                        {payload.columns.map((col: any) => (
                                            <th style={col[1] ? { textAlign: col[1] } : {}}
                                                dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(col[0] || "", "bot") }}></th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {payload.elements.map((row: any, rowIdx: any) => (
                                        row.Values?.length > 1 && ((showMore && rowIdx < 3) || !showMore) &&
                                        <tr>
                                            {row.Values.map((cell: any, cellIdx: any) => (
                                                <td
                                                    className={cell[1] === 'button' ? `clickable-btn${cell[2]?.type === 'web_url' ? ' clickable-link' : ''}` : ''}
                                                    style={payload.columns[cellIdx]?.[1] ? { textAlign: payload.columns[cellIdx][1] } : {}}
                                                    title={cell[0]}
                                                    onClick={() => cell[1] === 'button' && handleCellClick(cell)}
                                                    dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(String(cell[0] ?? ""), "bot") }}>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        {showMore && payload.elements.length > 3 && <button className={`show-more-btn table-show-more-${msgData.messageId}`}>Show More</button>}
                    </section>
                </section>
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
        msgObj.msgData.message[0].cInfo.body = msgObj.msgData.message[0].component?.payload?.text || '';
        return (
            <Fragment>
                <TableExt {...msgObj} />
            </Fragment>
        )
    } else if (msgData.message?.[0]?.component?.payload?.template_type == 'custom_table') {
        useEffect(() => {
            setTimeout(() => {
                msgData.message[0].component.payload.table_design = 'regular';
                hostInstance.chatEle.querySelector(`.table-show-more-${msgData.messageId}`)?.addEventListener('click', (e: any) => {
                    hostInstance.modalAction(getHTML(TableExt, msgData, hostInstance));
                });
            }, 500);
        });
        msgObj.msgData.message[0].cInfo.body = msgObj.msgData.message[0].component?.payload?.text || '';
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

