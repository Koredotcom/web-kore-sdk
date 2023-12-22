import BaseChatTemplate from '../../baseChatTemplate';
import './customListView.css';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { getHTML } from '../../../../base/domManager';
import IconsManager from '../../../../base/iconsManager';

export function ListViewMore(props: any) {
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
        if (e.type != undefined) {
            if (e.type.toLowerCase() == 'postback' || e.type.toLowerCase() == 'text') {
                hostInstance.sendMessage(e.title || e.payload || e.value, { renderMsg: e.title });
                closeMenu();
            } else if (e.type == 'url' || e.type == 'web_url') {
                let link = e.url;
                if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
                    link = `http:////${link}`;
                }
                hostInstance.openExternalLink(link);
            }
        }
    }

    

    return (
        <div className="menu-wrapper-data-actions">
            <div className="actions-slider-header-menu">
                <h1>{msgData.message[0].component.payload.heading}</h1>
                <button className="menu-close" role="contentinfo" aria-label="close" onClick={closeMenu}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586"/>
                    </svg>
                </button>
            </div>
            <div className="iner-data-scroll-wraper">
                <div className="list-view-action-template-wrapper">
                    <div className="list-view-heading">{msgData.message[0].component.payload.heading} {msgData.message[0].component.payload.text}</div>
                    {/* {Object.keys(msgData?.message?.[0]?.component?.payload?.elements).map((e: any) => (<div onClick={() => onTabChange(e)}>{e}</div>))} */}
                    <div className="list-content-details">
                        {msgData?.message?.[0]?.component?.payload?.elements.map((ele: any, ind: any) => (
                            ((msgData.message[0].component.payload.seeMore && ind > msgData.message[0].component.payload.moreCount) || (!msgData.message[0].component.payload.seeMore)) &&
                            <div className="list-data-temp">
                                <div className="img-with-content-block" onClick={() => { if (ele.default_action !='') { handleClick(ele.default_action)} } }>
                                    {ele.image_url &&
                                        <div className="img-block small-img">
                                            <figure>
                                                {ele.image_url && <img src={ele.image_url} />}
                                            </figure>
                                        </div>
                                    }
                                    <div className="content-details">
                                        <h1>{ele.title}</h1>
                                        <p>{ele.subtitle}</p>
                                    </div>
                                    <div className="price-tag">{ele.value}</div>
                                </div>
                            </div>))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export function CustomList(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageObj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    const openSeeMoreTab = () => {
        
        debugger
        hostInstance.bottomSliderAction('', getHTML(ListViewMore, messageObj, hostInstance));
    }

    const handleClick = (e: any) => {
        if (e.type != undefined) {
            if (e.type.toLowerCase() == 'postback' || e.type.toLowerCase() == 'text') {
                hostInstance.sendMessage(e.title || e.payload || e.value, { renderMsg: e.title });
            } else if (e.type == 'url' || e.type == 'web_url') {
                let link = e.url;
                if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
                    link = `http:////${link}`;
                }
                hostInstance.openExternalLink(link);
            }
        }
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'listView') {
        debugger
        return (
            <div className="list-view-action-template-wrapper">
                <div className="list-view-heading">{msgData.message[0].component.payload.heading} {msgData.message[0].component.payload.text}</div>
                <div className="list-content-details">
                    { msgData.message[0].component.payload.elements.map((ele: any, ind: any) => (
                        ((msgData.message[0].component.payload.seeMore && ind < msgData.message[0].component.payload.moreCount) || (!msgData.message[0].component.payload.seeMore)) &&
                        <div className={`list-data-temp ${ele.default_action.type != undefined ? 'clickable' : ''}`} >
                            <div className="img-with-content-block" onClick={() => { handleClick(ele.default_action)} } >
                                {ele.image_url &&
                                    <div className="img-block small-img">
                                        <figure>
                                            {ele.image_url && <img src={ele.image_url} />}
                                        </figure>
                                    </div>
                                }
                                <div className="content-details">
                                {ele.title && <h1>{ele.title}</h1> }
                                {ele.subtitle && <p>{ele.subtitle}  </p>}
                                </div>
                                <div className="price-tag">{ele.value}</div>
                            </div>
                        </div>))}
                </div>
                {/* <button className="show-more-btn" onClick={openSeeMoreTab}>View More</button> */}
                {msgData?.message?.[0]?.component?.payload?.seeMore && 
                    <button className="show-more-btn" onClick={openSeeMoreTab}>
                        {msgData.message[0].component.payload.seeMore?.title ?? 'Show More'}
                    </button>
                }
            </div>
        );
    }
}

class customListView extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(CustomList, msgData, this.hostInstance);
    }
}

export default customListView;