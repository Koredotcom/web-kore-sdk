import BaseChatTemplate from '../baseChatTemplate';
import './listView.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';
import { getHTML } from '../../../base/domManager';
import IconsManager from '../../../base/iconsManager';

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

    return (
        <div className="menu-wrapper-data-actions">
            <div className="actions-slider-header-menu">
                <h1>{msgData.message[0].component.payload.heading}</h1>
                <button className="menu-close" role="contentinfo" aria-label="close" onClick={closeMenu}>
                    <figure>
                        <img src={iconHelper.getIcon('close_icon')} alt="close" />
                    </figure>
                </button>
            </div>
            <div className="iner-data-scroll-wraper">
                See More
            </div>
        </div>
    )
}

export function ListView(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageObj = {
        msgData: msgData,
        hostInstance: hostInstance
    }

    const openSeeMoreTab = () => {
        hostInstance.bottomSliderAction('', getHTML(ListViewMore, messageObj, hostInstance));
    }

    const handleClick = (e: any) => {
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

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'listView') {
        return (
            <div className="list-view-action-template-wrapper">
                <h1>{msgData.message[0].component.payload.heading}</h1>
                <div className="list-content-details">
                    { msgData.message[0].component.payload.elements.map((ele: any, ind: any) => (
                        ((msgData.message[0].component.payload.seeMore && ind < msgData.message[0].component.payload.moreCount) || (!msgData.message[0].component.payload.seeMore)) &&
                        <div className="list-data-temp">
                            <div className="img-with-content-block" onClick={() => handleClick(ele.default_action)}>
                                <div className="img-block small-img">
                                    <figure>
                                        {ele.image_url && <img src={ele.image_url} />}
                                    </figure>
                                </div>
                                <div className="content-details">
                                    <h1>{ele.title}</h1>
                                    <p>{ele.subtitle}</p>
                                </div>
                                <div className="price-tag">{ele.value}</div>
                            </div>
                        </div>))}
                </div>
                {msgData && msgData.message && msgData.message.length && msgData.message[0].component && msgData.message[0].component.payload &&
                    msgData.message[0].component.payload.seeMore && msgData.message[0].component.payload.buttons && msgData.message[0].component.payload.buttons.length &&
                    msgData.message[0].component.payload.buttons[0].title && <button className="show-more-btn" onClick={openSeeMoreTab}>{msgData.message[0].component.payload.buttons[0].title}</button>}
            </div>
        );
    }
}

class TemplateListView extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(ListView, msgData, this.hostInstance);
    }
}

export default TemplateListView;

