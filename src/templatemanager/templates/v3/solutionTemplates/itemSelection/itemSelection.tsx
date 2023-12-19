import BaseChatTemplate from '../../baseChatTemplate';
import './itemSelection.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import IconsManager from '../../../../base/iconsManager';
import { getHTML } from '../../../../base/domManager';

export function ListMore(props: any) {
    const iconHelper = new IconsManager();
    const hostInstance = props.hostInstance;
    const msgData = props.msgData.msgData;
    const closeMenu = () => {
        hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').classList.add('close-bottom-slide');
        setTimeout(() => {
            hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').remove('.chat-actions-bottom-wraper');
        }, 150);
    }

    const handleClick = (e: any) => {
        if (e.type.toLowerCase() == 'postback' || e.type.toLowerCase() == 'text') {
            hostInstance.sendMessage(e.title || e.payload || e.value, { renderMsg: e.title });
            closeMenu();
        } else if (e.type == 'url' || e.type == 'web_url') {
            let link = e.fallback_url || e.url;
            if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
                link = `http:////${link}`;
            }
            hostInstance.openExternalLink(link);
        }
    }

    return (
        <div className="menu-wrapper-data-actions">
            <div className="actions-slider-header-menu">
                <h1>Best Collections</h1>
                <button className="menu-close" role="contentinfo" aria-label="close" onClick={closeMenu}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586" />
                    </svg>
                </button>
            </div>
            <div className="iner-data-scroll-wraper">
                <div className="list-action-template-wrapper">
                    <div className="list-content-details">
                        {msgData.message[0].component.payload.elements.map((ele: any, ind: any) => (
                            <div className="list-data-temp">
                                <div className="img-with-content-block">
                                    <div className="img-block">
                                        <figure>
                                            <img src={ele.image_url} />
                                        </figure>
                                    </div>
                                    <div className="content-details">
                                        <h1>{ele.title}</h1>
                                        <p>{ele.subtitle}</p>
                                    </div>
                                </div>
                                {ele.buttons && ele.buttons[0] && <button className="kr-button-blue-light" onClick={() => handleClick(ele.buttons[0])}>{ele.buttons[0].title}</button>}
                                {!ele.buttons && <a className="link-exteranl-list" href="#" target="_blank" onClick={() => handleClick(ele.default_action)}>{ele.default_action.url}</a>}
                            </div>))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export function RetailOrderSelection(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const payLoad = msgData?.message?.[0]?.component?.payload;
    const styles = payLoad?.styles ?? null;
    const pageTitle = payLoad?.cards?.cardHeading?.title ?? null;
    const pageTitleStyle = payLoad?.cards?.cardHeading?.style ?? null;
    const elements = payLoad?.elements ?? null;
    const elementsContent = elements ? elements[0] : null;
    const messageObj = {
        msgData: msgData,
        hostInstance: hostInstance
    }

    const handleClick = (e: any) => {
        if (e.type.toLowerCase() == 'postback' || e.type.toLowerCase() == 'text') {
            hostInstance.sendMessage(e.title || e.payload || e.value, { renderMsg: e.title });
        } else if (e.type == 'url' || e.type == 'web_url') {
            let link = e.fallback_url || e.url;
            if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
                link = `http:////${link}`;
            }
            hostInstance.openExternalLink(link);
        }
    }

    const openSeeMoreTab = () => {
        hostInstance.bottomSliderAction('', getHTML(ListMore, messageObj, hostInstance));
    }
    // templates design for the order selection
    if (payLoad?.template_type == 'retailOrderList') {
        return (
            <div className="list-action-template-wrapper">
                <h1 className='list-action-template-header' style={pageTitleStyle}>{pageTitle || ''}</h1>
                <div className='list-action-template-body'>
                    <div className="list-content-details">
                        {elements && elements.map((ele: any, ind: any) => (
                            (ind < 3 &&
                                <div className="list-data-temp">
                                    <div className="img-with-content-block">
                                        <div className="img-block">
                                            <figure>
                                                <img src={ele?.itemDetail?.items?.find((item: { thumbnail: any }) => item.thumbnail)?.thumbnail} />
                                            </figure>
                                        </div>
                                        <div className="content-details">
                                            <div className="content-details-header">
                                                <p className="content-details-title" style={styles?.titleStyle} >{ele?.itemDetail?.items && ele?.itemDetail?.items?.find((item: { title: any }) => item.title)?.title}</p>
                                                <div className={`content-details-status ${ele?.itemDetail?.orderDetails && ele?.itemDetail?.orderDetails.find((order: { status: any; }) => order.status)?.status === "Delivered" ? "badge-success" : "badge-warning"}`}>
                                                    <p style={styles?.statusStyle} >{ele?.itemDetail?.orderDetails && ele?.itemDetail?.orderDetails.find((order: { status: any; }) => order.status)?.status || ""}</p>
                                                </div>
                                            </div>
                                            <p className="content-details-sub-title" style={styles?.subTitleStyle}>{ele?.itemDetail?.items && ele?.itemDetail?.items?.find((item: { subTitle: any }) => item.subTitle)?.subTitle}</p>
                                            <p className="content-details-footer" style={styles?.itemIdStyle}>{ele?.itemDetail?.items && ele?.itemDetail?.items?.find((item: { itemId: any }) => item.itemId)?.itemId}</p>
                                        </div>
                                    </div>
                                    {ele.buttons && ele.buttons[0] && <button className="kr-button-blue-light" style={styles?.buttonStyle} onClick={() => handleClick(ele.buttons[0])}>{ele.buttons[0].title}</button>}
                                    {!ele.buttons && <a className="link-exteranl-list" href="#" target="_blank" style={styles?.buttonStyle} onClick={() => handleClick(ele.default_action)}>{ele.default_action.url}</a>}
                                </div>)))}
                    </div>
                    {elements && elements.length > 3 && <button className="show-more-btn" onClick={openSeeMoreTab}>Show More</button>}
                </div>
            </div>
        );
    }

    // templates design for the order detail page
    if (payLoad?.template_type == 'orderDetails' && payLoad.card_type == 'detail') {
        return (
            <div className="list-action-template-wrapper">
                <h1 className='list-action-template-header' style={pageTitleStyle}>{pageTitle || ''}</h1>
                <div className='list-action-template-body'>
                    <div className="list-content-details">
                        { elementsContent &&
                            <div className="list-data-temp">
                                <div className="img-with-content-block">
                                    <div className="order-detail-summary">
                                        <div className="order-basic-summary">
                                            <div class="order-detail-info">
                                                <p className="content-details-title" style={styles?.titleStyle}>{elementsContent?.itemDetail?.items && elementsContent?.itemDetail?.items?.find((item: { title: any }) => item.title)?.title}</p>
                                                <p className="content-details-sub-title" style={styles?.subTitleStyle}>{elementsContent?.itemDetail?.items && elementsContent?.itemDetail?.items?.find((item: { subTitle: any }) => item.subTitle)?.subTitle}</p>
                                                <p className="content-details-footer" style={styles?.itemIdStyle}>Qty:{elementsContent?.itemDetail?.orderDetails && elementsContent?.itemDetail?.orderDetails.find((order: { qty: any; }) => order.qty)?.qty || ""}
                                                    {elementsContent?.itemDetail?.orderDetails && elementsContent?.itemDetail?.orderDetails.find((order: { price: any; }) => order.price)?.price || ""}
                                                </p>
                                            </div>
                                            <div className="order-detail-img-info">
                                                <figure>
                                                    <img src={elementsContent?.itemDetail?.items?.find((item: { thumbnail: any }) => item.thumbnail)?.thumbnail} />
                                                </figure>
                                            </div>
                                        </div>
                                        <div className="context-line"></div>
                                        <div className="order-info">
                                            
                                            <div><p>Order Date</p> <span>: {elementsContent?.itemDetail?.orderDetails && elementsContent?.itemDetail?.orderDetails.find((order: { date: any; }) => order.date)?.date || ""}</span></div>
                                            <div><p>Order ID</p> <span>: 2023-11-13</span></div>
                                            <div><p>Item ID</p> <span></span>: 1234434</div>
                                            <div><p>Order Total</p> <span></span>: $699.00 (1 Items)</div>
                                        </div>
                                        <div className="order-status-summary">
                                            <div><p>Status</p> <span className="delivered">: Delivered</span></div>
                                            <div><p>Est. Delivery Date</p> <span>: 2023-11-13</span></div>
                                            <div><p>Tracking No</p> <span className="trackingNo">: 123123123123123</span></div>
                                        </div>
                                        <div className="order-summary-detail">
                                            <div className="order-summary-title">Order Summary</div>
                                            <div><p>Order Price</p> <span>$699.00</span></div>
                                            <div><p>Tax</p> <span>$50.00</span></div>
                                            <div><p>Total</p> <span>$749.00</span></div>
                                            <div><p>Discount</p> <span>-$50.00</span></div>
                                        </div>
                                        <div className="order-total-detail">
                                            <p>Order Total</p>
                                            <p>$699.00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                    </div>

                </div>
            </div>
        );
    }
}

class ItemSelectionList extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(RetailOrderSelection, msgData, this.hostInstance);
    }
}

export default ItemSelectionList;

