import BaseChatTemplate from '../baseChatTemplate';
import './listWidget.scss';
import { h, Fragment } from 'preact';

export function ListWidget(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;

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

    const handleButtonsMore = (event: any, index: any) => {
        event.stopPropagation();
        if (hostInstance.chatEle.querySelector(`[data-kr-alt-btm='${msgData.messageId}_${index}']`).style.display == 'block') {
            hostInstance.chatEle.querySelector(`[data-kr-alt-btm='${msgData.messageId}_${index}']`).style.display = 'none';
        } else {
            hostInstance.chatEle.querySelector(`[data-kr-alt-btm='${msgData.messageId}_${index}']`).style.display = 'block';
        }
    }

    const handleDropdown = (event: any, index: any) => {
        event.stopPropagation();
        if (hostInstance.chatEle.querySelector(`[data-kr-alt-drp='${msgData.messageId}_${index}']`).style.display == 'block') {
            hostInstance.chatEle.querySelector(`[data-kr-alt-drp='${msgData.messageId}_${index}']`).style.display = 'none';
        } else {
            hostInstance.chatEle.querySelector(`[data-kr-alt-drp='${msgData.messageId}_${index}']`).style.display = 'block';
        }
    }

    const handleButtonSection = (event: any, index: any) => {
        event.currentTarget.classList.toggle('rotate');
        hostInstance.chatEle.querySelector(`.lw-buttons-wrapper-sec-${index}`).classList.toggle('hide');
    }

    // const handleViewMore = (type: any) => {
    //     if (type === 'slider') {
    //          hostInstance.bottomSliderAction('', getHTML(AdvancedListExtension, msgData, hostInstance));
    //     }
    // }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'listWidget') {
        return (
            <div className="padding-wrapper-content-list-widget">
                <div className="adv-parent-temp-wrapper-list-widget">
                    <div className="main-heading-wrapper">
                        <div>
                            {msgData.message[0].component.payload.title && <h1>{msgData.message[0].component.payload.title}</h1>}
                            {msgData.message[0].component.payload.description && <p>{msgData.message[0].component.payload.description}</p>}
                        </div>
                        {msgData && msgData.headerOptions && msgData.headerOptions.type === "text" && msgData.headerOptions.text &&
                            <div className="header-actions">
                                <p>{msgData.headerOptions.text}</p>
                            </div>}
                        {msgData && msgData.headerOptions && msgData.headerOptions.type === "button" && msgData.headerOptions.button && msgData.headerOptions.button.title &&
                            <div className="header-actions">
                                <button onClick={() => handleItem(msgData.headerOptions.button)} className="kr-button-blue-light">{msgData.headerOptions.button.title}</button>
                            </div>}
                        {msgData && msgData.headerOptions && msgData.headerOptions.type === "url" && msgData.headerOptions.url && msgData.headerOptions.url.title &&
                            <div className="header-actions">
                                <button onClick={() => handleItem(msgData.headerOptions.url)} className="kr-button-blue-light">{msgData.headerOptions.url.title}</button>
                            </div>}
                        {msgData && msgData.headerOptions && msgData.headerOptions.type === "menu" && msgData.headerOptions.menu && msgData.headerOptions.menu.length > 0 &&
                            <div className="header-actions">
                                <div className="dropdown-list-wrapper" onClick={event => handleDropdown(event, 'dropdown')}>
                                    <button className="elipse-dropdown">
                                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
                                            <path d="M7.46661 4.76623C8.1539 4.76623 8.71106 4.20908 8.71106 3.52179C8.71106 2.8345 8.1539 2.27734 7.46661 2.27734C6.77932 2.27734 6.22217 2.8345 6.22217 3.52179C6.22217 4.20908 6.77932 4.76623 7.46661 4.76623Z" fill="#202124" />
                                            <path d="M8.71106 8.49957C8.71106 9.18685 8.1539 9.74401 7.46661 9.74401C6.77932 9.74401 6.22217 9.18685 6.22217 8.49957C6.22217 7.81228 6.77932 7.25512 7.46661 7.25512C8.1539 7.25512 8.71106 7.81228 8.71106 8.49957Z" fill="#202124" />
                                            <path d="M8.71106 13.4773C8.71106 14.1646 8.1539 14.7218 7.46661 14.7218C6.77932 14.7218 6.22217 14.1646 6.22217 13.4773C6.22217 12.7901 6.77932 12.2329 7.46661 12.2329C8.1539 12.2329 8.71106 12.7901 8.71106 13.4773Z" fill="#202124" />
                                        </svg>
                                    </button>
                                    <ul className="drp-content-menu" data-kr-alt-drp={`${msgData.messageId}_dropdown`}>
                                        <button className="close-drp-down">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586" />
                                            </svg>
                                        </button>
                                        {msgData.headerOptions.menu.map((dropdownEle: any) => (
                                            <li>
                                                {dropdownEle.image && dropdownEle.image.image_type === "image" && dropdownEle.image.image_src && <img src={dropdownEle.image.image_src}></img>}
                                                <button className="kr-button-blue-light" onClick={() => handleItem(dropdownEle)}>{dropdownEle.title}</button>
                                            </li>))}
                                    </ul>
                                </div>
                            </div>}
                    </div>

                    {msgData.tabs && msgData.tabs.length > 0 && <div className="tabs-sec-data">
                        {/* <button className="tab-name active-tab">Jan</button> */}
                        {msgData.tabs.map((tab: any) => (
                            <button className="tab-name">{tab}</button>
                        ))
                        }
                    </div>}

                    {msgData.message[0].component.payload.elements.map((item: any, index: any) => (
                        <div className={`adv-parent-acc-list open-acc-adv-temp`} data-kr-alt-acc={`${msgData.messageId}_${index}`} style={item?.elementStyles}>
                            <div className="advanced-list-template-wrapper" onClick={() => handleItem(item)}>
                                {item.image && item.image.image_type === "image" && item.image.image_src && <div className="img-block">
                                    <img src={item.image.image_src} />
                                </div>}
                                {(item.title || item.subtitle) && <div className="titles-info-block">
                                    <h1 style={item?.titleStyles}>{item.title}</h1>
                                    <p>{item.subtitle}</p>
                                </div>}
                                <div className="right-actions-content">
                                        <Fragment>
                                            {item.value && item.value.type == "button" && item.value.button && <div onClick={() => handleItem(item.value.button)}>
                                                {item.value.button.image && item.value.button.image.image_type === "image" && item.value.button.image.image_src && <img src={item.value.button.image.image_src}></img>}
                                                <button style={item?.buttonStyles} className="kr-button-blue-light">{item.value.button.title}</button>
                                            </div>
                                            }
                                            {item.value && item.value.type === "text" && item.value.text && <h1>{item.value.text}</h1>}                                        
                                            {item.value && item.value.type === "image" && item.value.image && item.value.image.image_src &&
                                                <img src={item.value.image.image_src} style={{width: '20px', height: '20px'}}></img>
                                            }
                                            {item.value && item.value.type === "url" && item.value.url && item.value.url.title && <button className="kr-button-blue-light">{item.value.url.title}</button>}
                                            {item.value && item.value.type == "menu" && item.value.menu && item.value.menu.length > 0 && <div className="dropdown-list-wrapper" onClick={event => handleDropdown(event, index)}>
                                                <button className="elipse-dropdown">
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
                                                    {item.value.menu.map((dropdownEle: any) => (
                                                        <li>
                                                            {dropdownEle.image && dropdownEle.image.image_type === "image" && dropdownEle.image.image_src && <img src={dropdownEle.image.image_src} style={{width: '20px', height: '20px'}}></img>}
                                                            <button className="kr-button-blue-light" onClick={() => handleItem(dropdownEle)}>{dropdownEle.title}</button>
                                                        </li>))}
                                                </ul>
                                            </div>}
                                        </Fragment>
                                </div>
                            </div>
                            <div className={`adv-list-temp-accordion ${item?.buttonsLayout && item.buttons?.length > item.buttonsLayout?.displayLimit?.count ? `button-z-index-3` : ``}`}>
                                {item.details && item.details.length > 0 && <div className="list-of-rows">
                                    {item.details.map((textEle: any, inde: any) => (
                                        <div className="row-list-info" onClick={() => handleItem(textEle)}>
                                            {textEle.image && textEle.image.image_type === "image" && textEle.image.image_src && <figure>
                                                <img src={textEle.image.image_src} />
                                            </figure>}
                                            {textEle.description && <p>{textEle.description}</p>}
                                            {((item.details.length < 3 && inde == item.details.length - 1) && (item.buttons && item.buttons.length > 0)) && <button className="arrow-icon" onClick={(event) => handleButtonSection(event, index)}>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.222 8.55518C11.4187 8.35845 11.4303 8.04668 11.2567 7.83641L11.222 7.79823L6.53504 3.11125C6.32601 2.90222 5.98711 2.90222 5.77809 3.11125C5.58136 3.30798 5.56978 3.61975 5.74337 3.83002L5.77809 3.8682L10.0865 8.1767L5.77809 12.4852C5.58136 12.6819 5.56978 12.9937 5.74337 13.204L5.77809 13.2422C5.97482 13.4389 6.28659 13.4505 6.49685 13.2769L6.53504 13.2422L11.222 8.55518Z" fill="#202124" />
                                                </svg>
                                            </button>}
                                        </div>))}
                                </div>}
                                {item.buttons?.length > 0 && <div className={`buttons-wrapper-sec lw-buttons-wrapper-sec-${index} ${item.buttonsLayout?.style === 'fitToWidth' ? `if-full-width-buttons` : `auto-adjust`} ${item.details && item.details.length > 0 ? `hide` : ``}`}>
                                    {item.buttons.map((buttonEle: any, ind: any) => (
                                        (((item.buttonsLayout && ind < item.buttonsLayout?.displayLimit?.count) || !item.buttonsLayout && ind < 2) && <button className="kr-button-blue-light" onClick={() => handleItem(buttonEle)}>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7804 3.31768C13.967 3.11682 14.2795 3.1067 14.4784 3.29508C14.6656 3.47238 14.6855 3.76232 14.5317 3.96328L14.5008 3.99987L6.13818 12.509C5.95951 12.7013 5.66615 12.7183 5.46746 12.5556L5.43136 12.523L1.44799 8.55964C1.25373 8.36636 1.25144 8.05066 1.44287 7.85451C1.62304 7.66991 1.9106 7.65699 2.10576 7.81726L2.14122 7.84934L5.76405 11.454L13.7804 3.31768Z" fill="#202124" />
                                            </svg>
                                            <span>{buttonEle.title}</span>
                                        </button>)))}
                                    {((item.buttonsLayout && item.buttons?.length > item.buttonsLayout?.displayLimit?.count) || !item.buttonsLayout) &&
                                        <Fragment>
                                            <button className="kr-button-blue-light" onClick={event => handleButtonsMore(event, index)}>
                                                <svg width="16" height="16" viewBox="0 0 17 17" fill="none">
                                                    <path d="M4.6 8.5002C4.6 7.78223 4.01797 7.2002 3.3 7.2002C2.58203 7.2002 2 7.78223 2 8.5002C2 9.21817 2.58203 9.8002 3.3 9.8002C4.01797 9.8002 4.6 9.21817 4.6 8.5002Z" fill="#07377F" />
                                                    <path d="M8.5 7.2002C9.21797 7.2002 9.8 7.78223 9.8 8.5002C9.8 9.21817 9.21797 9.8002 8.5 9.8002C7.78203 9.8002 7.2 9.21817 7.2 8.5002C7.2 7.78223 7.78203 7.2002 8.5 7.2002Z" fill="#07377F" />
                                                    <path d="M13.7 7.2002C14.418 7.2002 15 7.78223 15 8.5002C15 9.21817 14.418 9.8002 13.7 9.8002C12.982 9.8002 12.4 9.21817 12.4 8.5002C12.4 7.78223 12.982 7.2002 13.7 7.2002Z" fill="#07377F" />
                                                </svg>
                                                <span>More</span>
                                            </button>
                                            <ul className="drp-content-menu" data-kr-alt-btm={`${msgData.messageId}_${index}`}>
                                                <button className="close-drp-down" onClick={event => handleButtonsMore(event, index)}>
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                        <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586" />
                                                    </svg>
                                                </button>
                                                {item.buttons.map((buttonEle: any, ind: any) => (
                                                    <li>
                                                        <button className="kr-button-blue-light" onClick={() => handleItem(buttonEle)}>{buttonEle.title}</button>
                                                    </li>))}
                                            </ul>
                                        </Fragment>}
                                </div>}
                            </div>
                        </div>))}

                    {/* {msgData.message[0].component.payload.seeMore && <div className="see-more-link">
                        <button className="see-more-btn" onClick={() => handleViewMore(msgData.message[0].component.payload.seeMoreAction)}>
                            <span>See more</span>
                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.222 9.05518C11.4187 8.85845 11.4303 8.54668 11.2567 8.33641L11.222 8.29823L6.53504 3.61125C6.32601 3.40222 5.98711 3.40222 5.77809 3.61125C5.58136 3.80798 5.56978 4.11975 5.74337 4.33002L5.77809 4.3682L10.0865 8.6767L5.77809 12.9852C5.58136 13.1819 5.56978 13.4937 5.74337 13.704L5.77809 13.7422C5.97482 13.9389 6.28659 13.9505 6.49685 13.7769L6.53504 13.7422L11.222 9.05518Z" fill="#202124"/>
                            </svg>
                        </button>
                    </div>} */}

                </div>
            </div>
        );
    }
}

class TemplateListWidget extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(ListWidget, msgData, this.hostInstance);
    }
}

export default TemplateListWidget;

