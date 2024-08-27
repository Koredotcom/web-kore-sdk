import BaseChatTemplate from '../baseChatTemplate';
import './checkList.scss';
import { h, Fragment } from 'preact';
import { useEffect } from 'preact/hooks';
import { getHTML } from '../../base/domManager';

export function CheckListViewMore(props: any) {
    const msgData = props.msgData;
    const hostInstance = props.hostInstance;
    const msgObj = {
        msgData,
        hostInstance,
        viewMore: true
    }

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
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586" />
                    </svg>
                </button>
            </div>
            <div className="iner-data-scroll-wraper">
                <CheckList {...msgObj} />
            </div>
        </div>
    )
}

export function CheckList(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const viewMore = props?.viewMore || false;

    const handleEvent = ($event: any, e: any) => {
        $event?.stopPropagation();
        if (e.type.toLowerCase() == 'postback' || e.type.toLowerCase() == 'text') {
            hostInstance.sendMessage(e.payload?.toString(), { renderMsg: e.title });
        } else if (e.type == 'url' || e.type == 'web_url') {
            let link = e.url;
            if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
                link = `http:////${link}`;
            }
            hostInstance.openExternalLink(link);
        }
        if (viewMore) {
            closeMenu();
        }
    }

    const toggleItem = (event: any, msgId: any, i: any, viewMore: any) => {
        if (event.currentTarget.textContent == 'Details') {
            event.currentTarget.textContent = 'Hide Details';
        } else {
            event.currentTarget.textContent = 'Details';
        }
        const ele = hostInstance.chatEle.querySelector(`#item-${msgId}-${i}-${viewMore}`);
        const eleParent = hostInstance.chatEle.querySelector(`#ci-${msgData.messageId}-${i}-${viewMore}`);
        eleParent.classList.toggle('no-bg-hover-card');
        ele.classList.toggle('hide');
    }

    const handleViewMore = () => {
        hostInstance.bottomSliderAction('', getHTML(CheckListViewMore, msgData, hostInstance));
    }

    const closeMenu = () => {
        hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').classList.add('close-bottom-slide');
        setTimeout(() => {
            hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').remove('.chat-actions-bottom-wraper');
        }, 150);
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'checkListTemplate') {
        useEffect(() => {
            const ele = hostInstance.chatEle.querySelector(`.checklist-${msgData.messageId}-${viewMore}`)
            function bindPercentages(ele: any, msgData: any) {
                if (msgData && msgData.message[0].component.payload.elements.length) {
                    for (let i = 0; i < msgData.message[0].component.payload.elements.length; i++) {
                        let element = msgData.message[0].component.payload.elements[i];
                        let id = i;
                        let HTMLElement = ele.querySelector(`#ci-${msgData.messageId}-${id}-${viewMore}`);
                        let progressStyles = element.progressStyles;
                        let percentage = parseInt(element.taskProgress);
                        if (HTMLElement && progressStyles) {
                            for (let key in progressStyles) {
                                if (progressStyles.hasOwnProperty(key)) {
                                    if (key === 'background') {
                                        let style = document.createElement('style');
                                        style.textContent = `
                                            #progress${id}:before {
                                                background-image: conic-gradient(transparent ${percentage}%, ${progressStyles[key]} ${percentage}%);
                                            }
                                        `;
                                        HTMLElement.querySelector('.checklist-progress#progress' + id).appendChild(style);
                                    } else if (key === 'fillColor') {
                                        HTMLElement.querySelector('.checklist-progress').style.setProperty('--percentage', (percentage * 1) + '%');
                                        let image = `conic-gradient(${progressStyles[key]} 100%, ${progressStyles[key]} 100%, ${progressStyles[key]} 100%)`;
                                        HTMLElement.querySelector('.checklist-progress').style.backgroundImage = image;
                                    } else if (key === 'textcolor') {
                                        HTMLElement.querySelector('.checklist-percentage').style.color = progressStyles[key];
                                    }
                                }
                            }
                        } else {
                            if (HTMLElement) {
                                HTMLElement.querySelector('.checklist-progress').style.setProperty('--percentage', (percentage * 1) + '%');
                            }
                        }
                    }
                }
            }

            bindPercentages(ele, msgData);
        }, []);

        return (
            <div className={`checklist-temp-wrapper i${msgData.messageId} checklist-${msgData.messageId}-${viewMore}`}>
                {msgData.message[0].component.payload.elements.map((ele: any, ind: any) => (
                    ((!viewMore && ((msgData.message[0].component.payload.showMore && (ind < msgData.message[0].component.payload.displayLimit)) || !msgData.message[0].component.payload.showMore) || viewMore) &&
                        <button className="checklist-card" id={`ci-${msgData.messageId}-${ind}-${viewMore}`}>
                            <div className="manage-card-block" onClick={(event) => handleEvent(event, ele.default_action)}>
                                <div className="left-block-details">
                                    {ele.title && <h1>{ele.title}</h1>}
                                    {ele.subInformation && ele.subInformation.length > 0 && <div className="status-data-block">
                                        {ele.subInformation.map((item: any) => (
                                            <div className="status-data">
                                                {item.title && <h2>{item.title}</h2>}
                                                {item.value && <p>{item.value}</p>}
                                            </div>))}
                                    </div>}
                                </div>
                                {ele.taskProgress && <div className="progress-circle-block">
                                    <div class="checklist-progress" id={`progress${ind}`}>
                                        <div class="checklist-percentage">
                                            {ele.taskProgress}
                                        </div>
                                    </div>
                                </div>}
                            </div>
                            {ele.subElements && ele.subElements.length && <div className="more-details-status-type hide" id={`item-${msgData.messageId}-${ind}-${viewMore}`}>
                                {ele.subElements.map((se: any) => (
                                    <div className="details-card-status" onClick={(event) => handleEvent(event, se.default_action)}>
                                        <div className="details-card-status-header">
                                            {se.title && <h2>{se.title}</h2>}
                                            {se.rightContent && se.rightContent.icon &&
                                                <figure onClick={(event) => handleEvent(event, se.default_action)}>
                                                    <img src={se.rightContent.icon} />
                                                </figure>}

                                        </div>
                                        {se.values && se.values.length && se.values.map((v: any) => (<div className="status-heading">
                                            <h3>{v.title}</h3>
                                            <div className="status-info">
                                                {v.icon && <figure>
                                                    <img alt="" src={v.icon} />
                                                </figure>}
                                                <span>{v.value}</span>
                                            </div>
                                        </div>))}
                                    </div>))}
                            </div>}
                            <button className="show-more-btn hide-show-details" onClick={(event) => toggleItem(event, msgData.messageId, ind, viewMore)}>Details</button>
                        </button>
                    )))}
                {msgData.message[0].component.payload.showMore && (msgData.message[0].component.payload.elements.length > msgData.message[0].component.payload.displayLimit) && !viewMore && <button className="show-more-btn" onClick={() => handleViewMore()}>View More</button>}
            </div>
        );
    } else {
        return null;
    }
}

class TemplateCheckList extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(CheckList, msgData, this.hostInstance);
    }
}

export default TemplateCheckList;

