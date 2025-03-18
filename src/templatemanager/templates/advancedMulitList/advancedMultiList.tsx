import BaseChatTemplate from '../baseChatTemplate';
import './advancedMultiList.scss';
import { h, Fragment } from 'preact';
import { getHTML } from '../../base/domManager';
import KoreHelpers from '../../../utils/helpers';

export function AdvancedMultiListExtension(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const helpers = KoreHelpers.helpers;

    const handleItem = (item: any) => {
        if (item.type == 'postback' || item.type == 'text') {
            hostInstance.sendMessage(item.payload || item.title, { renderMsg: item.renderMessage || item.title });
        } else if (item.type == 'url' || item.type == 'web_url') {
            let link = item.url;
            if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
                link = `http:////${link}`;
            }
            hostInstance.openExternalLink(link);
        }
    }
    const handleAccordian = (index: any, ind: any) => {
        hostInstance.chatEle.querySelector(`[data-kr-alt-acc-extra='${msgData.messageId}_${index}_${ind}']`).classList.toggle('open-acc-adv-temp');
    }

    const handleDropdown = (event: any, index: any) => {
        event.stopPropagation();
        if (hostInstance.chatEle.querySelector(`[data-kr-alt-drp='${msgData.messageId}_${index}']`).style.display == 'block') {
            hostInstance.chatEle.querySelector(`[data-kr-alt-drp='${msgData.messageId}_${index}']`).style.display = 'none';
        } else {
            hostInstance.chatEle.querySelector(`[data-kr-alt-drp='${msgData.messageId}_${index}']`).style.display = 'block';
        }
    }

    // const handleButtonsMore = (event: any, index: any) => {
    //     event.stopPropagation();
    //     if (hostInstance.chatEle.querySelector(`[data-kr-alt-btm='${msgData.messageId}_${index}']`).style.display == 'block') {
    //         hostInstance.chatEle.querySelector(`[data-kr-alt-btm='${msgData.messageId}_${index}']`).style.display = 'none';
    //     } else {
    //         hostInstance.chatEle.querySelector(`[data-kr-alt-btm='${msgData.messageId}_${index}']`).style.display = 'block';
    //     }
    // }

    return (
        <div className="padding-wrapper-content">
            <div className="adv-parent-temp-wrapper">
                {msgData.message[0].component.payload.listItems.map((listItem: any, index: any) => (
                    <Fragment>
                        <div className="main-heading-wrapper">
                            {listItem.title && <h1 dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(listItem.title, "bot") }}></h1>}
                        </div>
                        {
                            (listItem.subListItems.map((item: any, ind: any) => (
                                <div className={`adv-parent-acc-list ${(!item.isAccordian || !item.isCollapsed) ? `open-acc-adv-temp` : ``}`} data-kr-alt-acc-extra={`${msgData.messageId}_${index}_${ind}`}>
                                    <div className="advanced-list-template-wrapper" onClick={() => handleItem(item)}>
                                        {item.borderAvailable && <div className="border-div-indication" style={{ height: item?.borderStyles?.Height, width: item?.borderStyles?.Width, borderRadius: item?.bordeStyles?.radius, padding: item?.borderStyles?.Padding, background: item?.borderStyles?.background }}></div>}
                                        {item.icon && <div className="img-block">
                                            <img src={item.icon} />
                                        </div>}
                                        {(item.title || item.description) && <div className="titles-info-block">
                                            <h1 style={item?.titleStyles} dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(item.title, "bot") }}></h1>
                                            {item.description && <p dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(item.description, "bot") }}></p>}
                                        </div>}
                                        <div className="right-actions-content">
                                            {item.headerOptions?.length > 0 && item.headerOptions.map((headerEle: any) => (
                                                <Fragment>
                                                    {headerEle.contenttype === 'button' && <button style={headerEle?.buttonStyles} className="kr-button-blue-light" onClick={() => handleItem(headerEle)}>{headerEle.title}</button>}
                                                    {headerEle.type === 'text' && <h1 style={headerEle?.styles}>{headerEle.value}</h1>}
                                                    {/* {<p style={{ display: 'none' }} className="tag-status">Shortlisted</p>} */}
                                                    {item.isAccordian && headerEle.type === 'icon' && <button className="arrow-icon" onClick={() => handleAccordian(index, ind)}>
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.222 8.55518C11.4187 8.35845 11.4303 8.04668 11.2567 7.83641L11.222 7.79823L6.53504 3.11125C6.32601 2.90222 5.98711 2.90222 5.77809 3.11125C5.58136 3.30798 5.56978 3.61975 5.74337 3.83002L5.77809 3.8682L10.0865 8.1767L5.77809 12.4852C5.58136 12.6819 5.56978 12.9937 5.74337 13.204L5.77809 13.2422C5.97482 13.4389 6.28659 13.4505 6.49685 13.2769L6.53504 13.2422L11.222 8.55518Z" fill="#202124" />
                                                        </svg>
                                                    </button>}
                                                    {headerEle.type === 'dropdown' && <div className="dropdown-list-wrapper" onClick={event => handleDropdown(event, index)}>
                                                        <button className="elipse-dropdown" onClick={event => handleDropdown(event, index)}>
                                                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
                                                                <path d="M7.46661 4.76623C8.1539 4.76623 8.71106 4.20908 8.71106 3.52179C8.71106 2.8345 8.1539 2.27734 7.46661 2.27734C6.77932 2.27734 6.22217 2.8345 6.22217 3.52179C6.22217 4.20908 6.77932 4.76623 7.46661 4.76623Z" fill="#202124" />
                                                                <path d="M8.71106 8.49957C8.71106 9.18685 8.1539 9.74401 7.46661 9.74401C6.77932 9.74401 6.22217 9.18685 6.22217 8.49957C6.22217 7.81228 6.77932 7.25512 7.46661 7.25512C8.1539 7.25512 8.71106 7.81228 8.71106 8.49957Z" fill="#202124" />
                                                                <path d="M8.71106 13.4773C8.71106 14.1646 8.1539 14.7218 7.46661 14.7218C6.77932 14.7218 6.22217 14.1646 6.22217 13.4773C6.22217 12.7901 6.77932 12.2329 7.46661 12.2329C8.1539 12.2329 8.71106 12.7901 8.71106 13.4773Z" fill="#202124" />
                                                            </svg>
                                                        </button>
                                                        <ul className="drp-content-menu" data-kr-alt-drp={`${msgData.messageId}_${index}`}>
                                                            <button className="close-drp-down">
                                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                    <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586" />
                                                                </svg>
                                                            </button>
                                                            {headerEle.dropdownOptions.map((dropdownEle: any) => (
                                                                <li>
                                                                    <button className="kr-button-blue-light" onClick={() => handleItem(dropdownEle)}>{dropdownEle.title}</button>
                                                                </li>))}
                                                        </ul>
                                                    </div>}
                                                </Fragment>))}
                                        </div>
                                    </div>
                                    <div className="adv-list-temp-accordion">
                                        {item.view === 'default' && item.textInformation?.length > 0 && <div className="list-of-rows">
                                            {item.textInformation.map((textEle: any) => (
                                                <div className="row-list-info" onClick={() => handleItem(textEle)}>
                                                    {textEle.icon && <figure>
                                                        <img src={textEle.icon} />
                                                    </figure>}
                                                    <p dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(textEle.title, "bot") }}></p>
                                                </div>))}
                                        </div>}
                                        {/* {item.buttons?.length > 0 && item.view !== 'options' && <div className={`buttons-wrapper-sec ${item.buttonsLayout?.buttonAligment === 'fullwidth' ? `if-full-width-buttons` : ``}`}>
                    {item.buttons.map((buttonEle: any, ind: any) => (
                        (((item.buttonsLayout && ind < item.buttonsLayout?.displayLimit?.count) || !item.buttonsLayout && ind < 2) && <button className="kr-button-blue-light" onClick={() => handleItem(buttonEle)}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7804 3.31768C13.967 3.11682 14.2795 3.1067 14.4784 3.29508C14.6656 3.47238 14.6855 3.76232 14.5317 3.96328L14.5008 3.99987L6.13818 12.509C5.95951 12.7013 5.66615 12.7183 5.46746 12.5556L5.43136 12.523L1.44799 8.55964C1.25373 8.36636 1.25144 8.05066 1.44287 7.85451C1.62304 7.66991 1.9106 7.65699 2.10576 7.81726L2.14122 7.84934L5.76405 11.454L13.7804 3.31768Z" fill="#202124"/>
                            </svg>
                            <span>{buttonEle.title}</span>
                        </button>)))}
                    {((item.buttonsLayout && item.buttons?.length > item.buttonsLayout?.displayLimit?.count) || !item.buttonsLayout) &&
                        <Fragment>
                            <button className="kr-button-blue-light" onClick={event => handleButtonsMore(event, index)}>
                                <svg width="16" height="16" viewBox="0 0 17 17" fill="none">
                                    <path d="M4.6 8.5002C4.6 7.78223 4.01797 7.2002 3.3 7.2002C2.58203 7.2002 2 7.78223 2 8.5002C2 9.21817 2.58203 9.8002 3.3 9.8002C4.01797 9.8002 4.6 9.21817 4.6 8.5002Z" fill="#07377F"/>
                                    <path d="M8.5 7.2002C9.21797 7.2002 9.8 7.78223 9.8 8.5002C9.8 9.21817 9.21797 9.8002 8.5 9.8002C7.78203 9.8002 7.2 9.21817 7.2 8.5002C7.2 7.78223 7.78203 7.2002 8.5 7.2002Z" fill="#07377F"/>
                                    <path d="M13.7 7.2002C14.418 7.2002 15 7.78223 15 8.5002C15 9.21817 14.418 9.8002 13.7 9.8002C12.982 9.8002 12.4 9.21817 12.4 8.5002C12.4 7.78223 12.982 7.2002 13.7 7.2002Z" fill="#07377F"/>
                                </svg>
                                <span>More</span>
                            </button>
                            <ul className="drp-content-menu" data-kr-alt-btm={`${msgData.messageId}_${index}`}>
                                <button className="close-drp-down" onClick={event => handleButtonsMore(event, index)}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586"/>
                                    </svg>
                                </button>
                                {item.buttons.map((buttonEle: any, ind: any) => (
                                    <li>
                                        <button className="kr-button-blue-light" onClick={() => handleItem(buttonEle)}>{buttonEle.title}</button>
                                    </li>))}
                            </ul>
                        </Fragment>}
                </div>} */}
                                    </div>
                                </div>)))
                        }
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

export function AdvancedMultiListExtensionSlider(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const msgObj = {
        hostInstance,
        msgData
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
                <button className="menu-close" role="contentinfo" aria-label="close" onClick={closeMenu}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586" />
                    </svg>
                </button>
            </div>
            <div className="iner-data-scroll-wraper">
                <AdvancedMultiListExtension {...msgObj} />
            </div>
        </div>
    )
}

export function AdvancedMultiList(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const helpers = KoreHelpers.helpers;

    const handleItem = (item: any) => {
        if (item.type == 'postback' || item.type == 'text') {
            hostInstance.sendMessage(item.payload || item.title, { renderMsg: item.renderMessage || item.title });
        } else if (item.type == 'url' || item.type == 'web_url') {
            let link = item.url;
            if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
                link = `http:////${link}`;
            }
            hostInstance.openExternalLink(link);
        }
    }
    const handleAccordian = (index: any, ind: any) => {
        hostInstance.chatEle.querySelector(`[data-kr-alt-acc='${msgData.messageId}_${index}_${ind}']`).classList.toggle('open-acc-adv-temp');
    }

    const handleDropdown = (event: any, index: any) => {
        event.stopPropagation();
        if (hostInstance.chatEle.querySelector(`[data-kr-alt-drp='${msgData.messageId}_${index}']`).style.display == 'block') {
            hostInstance.chatEle.querySelector(`[data-kr-alt-drp='${msgData.messageId}_${index}']`).style.display = 'none';
        } else {
            hostInstance.chatEle.querySelector(`[data-kr-alt-drp='${msgData.messageId}_${index}']`).style.display = 'block';
        }
    }

    // const handleButtonsMore = (event: any, index: any) => {
    //     event.stopPropagation();
    //     if (hostInstance.chatEle.querySelector(`[data-kr-alt-btm='${msgData.messageId}_${index}']`).style.display == 'block') {
    //         hostInstance.chatEle.querySelector(`[data-kr-alt-btm='${msgData.messageId}_${index}']`).style.display = 'none';
    //     } else {
    //         hostInstance.chatEle.querySelector(`[data-kr-alt-btm='${msgData.messageId}_${index}']`).style.display = 'block';
    //     }
    // }

    const handleViewMore = (type: any) => {
        if (type === 'slider') {
            hostInstance.bottomSliderAction('', getHTML(AdvancedMultiListExtensionSlider, msgData, hostInstance));
        } else if (type == 'modal') {
            hostInstance.modalAction(getHTML(AdvancedMultiListExtension, msgData, hostInstance));
        }
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'advancedMultiListTemplate') {
        return (
            <div className="padding-wrapper-content" data-cw-msg-id={msgData?.messageId}>
                <div className="adv-parent-temp-wrapper">
                    {msgData.message[0].component.payload.listItems.map((listItem: any, index: any) => (
                        ((msgData.message[0].component.payload.seeMore && (index < msgData.message[0].component.payload.listItemDisplayCount) || !msgData.message[0].component.payload.seeMore) &&
                            <Fragment>
                                <div className="main-heading-wrapper">
                                    {listItem.title && <h1 dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(listItem.title, "bot") }}></h1>}
                                </div>
                                {
                                    (listItem.subListItems.map((item: any, ind: any) => (
                                        <div className={`adv-parent-acc-list ${(!item.isAccordian || !item.isCollapsed) ? `open-acc-adv-temp` : ``}`} data-kr-alt-acc={`${msgData.messageId}_${index}_${ind}`}>
                                            <div className="advanced-list-template-wrapper" onClick={() => handleItem(item)}>
                                                {item.borderAvailable && <div className="border-div-indication" style={{ height: item?.borderStyles?.Height, width: item?.borderStyles?.Width, borderRadius: item?.bordeStyles?.radius, padding: item?.borderStyles?.Padding, background: item?.borderStyles?.background }}></div>}
                                                {item.icon && <div className="img-block">
                                                    <img src={item.icon} />
                                                </div>}
                                                {(item.title || item.description) && <div className="titles-info-block">
                                                    {item.title && <h1 style={item?.titleStyles} dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(item.title, "bot") }}></h1>}
                                                    {item.description && <p dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(item.description, "bot") }}></p>}
                                                </div>}
                                                <div className="right-actions-content">
                                                    {item.headerOptions?.length > 0 && item.headerOptions.map((headerEle: any) => (
                                                        <Fragment>
                                                            {headerEle.contenttype === 'button' && <button style={headerEle?.buttonStyles} className="kr-button-blue-light" onClick={() => handleItem(headerEle)}>{headerEle.title}</button>}
                                                            {headerEle.type === 'text' && <h1 style={headerEle?.styles}>{headerEle.value}</h1>}
                                                            {/* {<p style={{ display: 'none' }} className="tag-status">Shortlisted</p>} */}
                                                            {item.isAccordian && headerEle.type === 'icon' && <button className="arrow-icon" onClick={() => handleAccordian(index, ind)}>
                                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.222 8.55518C11.4187 8.35845 11.4303 8.04668 11.2567 7.83641L11.222 7.79823L6.53504 3.11125C6.32601 2.90222 5.98711 2.90222 5.77809 3.11125C5.58136 3.30798 5.56978 3.61975 5.74337 3.83002L5.77809 3.8682L10.0865 8.1767L5.77809 12.4852C5.58136 12.6819 5.56978 12.9937 5.74337 13.204L5.77809 13.2422C5.97482 13.4389 6.28659 13.4505 6.49685 13.2769L6.53504 13.2422L11.222 8.55518Z" fill="#202124" />
                                                                </svg>
                                                            </button>}
                                                            {headerEle.type === 'dropdown' && <div className="dropdown-list-wrapper" onClick={event => handleDropdown(event, index)}>
                                                                <button className="elipse-dropdown" onClick={event => handleDropdown(event, index)}>
                                                                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
                                                                        <path d="M7.46661 4.76623C8.1539 4.76623 8.71106 4.20908 8.71106 3.52179C8.71106 2.8345 8.1539 2.27734 7.46661 2.27734C6.77932 2.27734 6.22217 2.8345 6.22217 3.52179C6.22217 4.20908 6.77932 4.76623 7.46661 4.76623Z" fill="#202124" />
                                                                        <path d="M8.71106 8.49957C8.71106 9.18685 8.1539 9.74401 7.46661 9.74401C6.77932 9.74401 6.22217 9.18685 6.22217 8.49957C6.22217 7.81228 6.77932 7.25512 7.46661 7.25512C8.1539 7.25512 8.71106 7.81228 8.71106 8.49957Z" fill="#202124" />
                                                                        <path d="M8.71106 13.4773C8.71106 14.1646 8.1539 14.7218 7.46661 14.7218C6.77932 14.7218 6.22217 14.1646 6.22217 13.4773C6.22217 12.7901 6.77932 12.2329 7.46661 12.2329C8.1539 12.2329 8.71106 12.7901 8.71106 13.4773Z" fill="#202124" />
                                                                    </svg>
                                                                </button>
                                                                <ul className="drp-content-menu" data-kr-alt-drp={`${msgData.messageId}_${index}`}>
                                                                    <button className="close-drp-down">
                                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                            <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586" />
                                                                        </svg>
                                                                    </button>
                                                                    {headerEle.dropdownOptions.map((dropdownEle: any) => (
                                                                        <li>
                                                                            <button className="kr-button-blue-light" onClick={() => handleItem(dropdownEle)}>{dropdownEle.title}</button>
                                                                        </li>))}
                                                                </ul>
                                                            </div>}
                                                        </Fragment>))}
                                                </div>
                                            </div>
                                            <div className="adv-list-temp-accordion">
                                                {item.view === 'default' && item.textInformation?.length > 0 && <div className="list-of-rows">
                                                    {item.textInformation.map((textEle: any) => (
                                                        <div className="row-list-info" onClick={() => handleItem(textEle)}>
                                                            {textEle.icon && <figure>
                                                                <img src={textEle.icon} />
                                                            </figure>}
                                                            <p dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(textEle.title, "bot") }}></p>
                                                        </div>))}
                                                </div>}
                                                {/* {item.buttons?.length > 0 && item.view !== 'options' && <div className={`buttons-wrapper-sec ${item.buttonsLayout?.buttonAligment === 'fullwidth' ? `if-full-width-buttons` : ``}`}>
                    {item.buttons.map((buttonEle: any, ind: any) => (
                        (((item.buttonsLayout && ind < item.buttonsLayout?.displayLimit?.count) || !item.buttonsLayout && ind < 2) && <button className="kr-button-blue-light" onClick={() => handleItem(buttonEle)}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7804 3.31768C13.967 3.11682 14.2795 3.1067 14.4784 3.29508C14.6656 3.47238 14.6855 3.76232 14.5317 3.96328L14.5008 3.99987L6.13818 12.509C5.95951 12.7013 5.66615 12.7183 5.46746 12.5556L5.43136 12.523L1.44799 8.55964C1.25373 8.36636 1.25144 8.05066 1.44287 7.85451C1.62304 7.66991 1.9106 7.65699 2.10576 7.81726L2.14122 7.84934L5.76405 11.454L13.7804 3.31768Z" fill="#202124"/>
                            </svg>
                            <span>{buttonEle.title}</span>
                        </button>)))}
                    {((item.buttonsLayout && item.buttons?.length > item.buttonsLayout?.displayLimit?.count) || !item.buttonsLayout) &&
                        <Fragment>
                            <button className="kr-button-blue-light" onClick={event => handleButtonsMore(event, index)}>
                                <svg width="16" height="16" viewBox="0 0 17 17" fill="none">
                                    <path d="M4.6 8.5002C4.6 7.78223 4.01797 7.2002 3.3 7.2002C2.58203 7.2002 2 7.78223 2 8.5002C2 9.21817 2.58203 9.8002 3.3 9.8002C4.01797 9.8002 4.6 9.21817 4.6 8.5002Z" fill="#07377F"/>
                                    <path d="M8.5 7.2002C9.21797 7.2002 9.8 7.78223 9.8 8.5002C9.8 9.21817 9.21797 9.8002 8.5 9.8002C7.78203 9.8002 7.2 9.21817 7.2 8.5002C7.2 7.78223 7.78203 7.2002 8.5 7.2002Z" fill="#07377F"/>
                                    <path d="M13.7 7.2002C14.418 7.2002 15 7.78223 15 8.5002C15 9.21817 14.418 9.8002 13.7 9.8002C12.982 9.8002 12.4 9.21817 12.4 8.5002C12.4 7.78223 12.982 7.2002 13.7 7.2002Z" fill="#07377F"/>
                                </svg>
                                <span>More</span>
                            </button>
                            <ul className="drp-content-menu" data-kr-alt-btm={`${msgData.messageId}_${index}`}>
                                <button className="close-drp-down" onClick={event => handleButtonsMore(event, index)}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586"/>
                                    </svg>
                                </button>
                                {item.buttons.map((buttonEle: any, ind: any) => (
                                    <li>
                                        <button className="kr-button-blue-light" onClick={() => handleItem(buttonEle)}>{buttonEle.title}</button>
                                    </li>))}
                            </ul>
                        </Fragment>}
                </div>} */}
                                            </div>
                                        </div>)))
                                }
                            </Fragment>)
                    ))}

                    {msgData.message[0].component.payload.seeMore && <div className="see-more-link">
                        <button className="see-more-btn" onClick={() => handleViewMore(msgData.message[0].component.payload.seeMoreAction)}>
                            <span>{msgData.message[0].component.payload.seeMoreTitle}</span>
                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.222 9.05518C11.4187 8.85845 11.4303 8.54668 11.2567 8.33641L11.222 8.29823L6.53504 3.61125C6.32601 3.40222 5.98711 3.40222 5.77809 3.61125C5.58136 3.80798 5.56978 4.11975 5.74337 4.33002L5.77809 4.3682L10.0865 8.6767L5.77809 12.9852C5.58136 13.1819 5.56978 13.4937 5.74337 13.704L5.77809 13.7422C5.97482 13.9389 6.28659 13.9505 6.49685 13.7769L6.53504 13.7422L11.222 9.05518Z" fill="#202124" />
                            </svg>
                        </button>
                    </div>}

                </div>
            </div>
        );
    }
}

class AdvancedMultiListTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(AdvancedMultiList, msgData, this.hostInstance);
    }
}

export default AdvancedMultiListTemplate;

