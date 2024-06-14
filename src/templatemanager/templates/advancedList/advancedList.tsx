import BaseChatTemplate from '../baseChatTemplate';
import './advancedList.scss';
import { h, Fragment } from 'preact';
import { getHTML } from '../../base/domManager';
import KoreHelpers from '../../../utils/helpers';

export function AdvancedListExtension(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const helpers = KoreHelpers.helpers;

    const closeMenu = () => {
        hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').classList.add('close-bottom-slide');
        setTimeout(() => {
            hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').remove('.chat-actions-bottom-wraper');
        }, 150);
    }

    const handleItem = (item: any) => {
        if (item.type == 'postback' || item.type == 'text') {
            hostInstance.sendMessage(item.payload || item.title, { renderMsg: item.renderMessage || item.title });
            closeMenu();
        } else if (item.type == 'url' || item.type == 'web_url') {
            let link = item.url;
            if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
                link = `http:////${link}`;
            }
            hostInstance.openExternalLink(link);
        }
    }
    const handleAccordian = (index: any) => {
        hostInstance.chatEle.querySelector(`[data-kr-alt-acc-ext='${msgData.messageId}_${index}']`).classList.toggle('open-acc-adv-temp');
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

    const onSubmit = (item: any, index: any) => {
        if (item.optionsData[0].type == 'checkbox') {
            const eles = hostInstance.chatEle.querySelectorAll(`input[data-kr-alt-che=${msgData.messageId}_${index}]:checked`);
            const selectedValue: any = [];
            const selectText: any = [];
            eles?.forEach((ele: any) => {
                selectedValue.push(ele.value);
                selectText.push(ele.getAttribute('label'));
            });
            const innerText = eles.length > 0 ? item.buttons[0].title + ': ' + selectedValue.toString() : item.buttons[0].title;
            hostInstance.sendMessage(innerText, { renderMsg: innerText });
        } else {
            const ele = hostInstance.chatEle.querySelector(`input[data-kr-alt-rad=${msgData.messageId}_${index}]:checked`);
            const selectedValue: any = ele?.value;
            const selectText: any = ele?.getAttribute('label');
            const innerText = ele ? item.buttons[0].title + ': ' + selectedValue : item.buttons[0].title;
            hostInstance.sendMessage(innerText, { renderMsg: innerText });
        }
    }

    const onCancel = (item: any, index: any) => {
        if (item.optionsData[0].type == 'checkbox') {
            const eles = hostInstance.chatEle.querySelectorAll(`input[data-kr-alt-che=${msgData.messageId}_${index}]:checked`);
            eles?.forEach((ele: any) => {
                ele.checked = false;
            })
        } else {
            const ele = hostInstance.chatEle.querySelector(`input[data-kr-alt-rad=${msgData.messageId}_${index}]:checked`);
            if (ele) {
                ele.checked = false;
            }
        }
    }

    return (
        <div className="menu-wrapper-data-actions">
            <div className="actions-slider-header-menu">
                <h1></h1>
                <button className="menu-close" role="contentinfo" aria-label="close" onClick={closeMenu}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586"/>
                    </svg>
                </button>
            </div>
            <div className="iner-data-scroll-wraper">
                <div className="padding-wrapper-content">
                    <div className="adv-parent-temp-wrapper">
                        <div className="main-heading-wrapper">
                            {msgData.message[0].component.payload.title && <h1 dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(msgData.message[0].component.payload.title, "bot") }}></h1>}
                            {(msgData.message[0].component.payload.isSortEnabled || msgData.message[0].component.payload.isSearchEnabled) && <div className="header-actions">
                                {msgData.message[0].component.payload.isSortEnabled && <button className="btn-action-filter">
                                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
                                        <path d="M2 4C1.72386 4 1.5 4.22386 1.5 4.5C1.5 4.77614 1.72386 5 2 5H14C14.2761 5 14.5 4.77614 14.5 4.5C14.5 4.22386 14.2761 4 14 4H2ZM4 8C3.72386 8 3.5 8.22386 3.5 8.5C3.5 8.77614 3.72386 9 4 9H12C12.2761 9 12.5 8.77614 12.5 8.5C12.5 8.22386 12.2761 8 12 8H4ZM6 12C5.72386 12 5.5 12.2239 5.5 12.5C5.5 12.7761 5.72386 13 6 13H10C10.2761 13 10.5 12.7761 10.5 12.5C10.5 12.2239 10.2761 12 10 12H6Z" fill="#202124"/>
                                    </svg>
                                </button>}
                                {msgData.message[0].component.payload.isSearchEnabled && <button className="btn-action-filter">
                                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.29765 2.2998C4.26141 2.2998 1.80005 4.76774 1.80005 7.81209C1.80005 10.8564 4.26141 13.3244 7.29765 13.3244C8.62542 13.3244 9.84326 12.8524 10.7934 12.0667L13.3422 14.5909L13.3802 14.6252C13.5895 14.7962 13.898 14.7828 14.0916 14.5863C14.2973 14.3775 14.2952 14.0411 14.087 13.8349L11.5426 11.3151C12.3252 10.3627 12.7952 9.14244 12.7952 7.81209C12.7952 4.76774 10.3339 2.2998 7.29765 2.2998ZM7.29765 3.36241C9.74859 3.36241 11.7355 5.3546 11.7355 7.81209C11.7355 10.2696 9.74859 12.2618 7.29765 12.2618C4.84671 12.2618 2.85983 10.2696 2.85983 7.81209C2.85983 5.3546 4.84671 3.36241 7.29765 3.36241Z" fill="#202124"/>
                                    </svg>
                                </button>}
                                <input type="search" className="input-search" placeholder="Search" style={{ display: 'none' }} />
                            </div>}
                        </div>

                        <div className="tabs-sec-data" style={{ display: 'none' }}>
                            <button className="tab-name active-tab">Jan</button>
                            <button className="tab-name">Feb</button>
                            <button className="tab-name">Mar</button>
                            <button className="tab-name">April</button>
                            <button className="tab-name">May</button>
                            <button className="tab-name">June</button>
                            <button className="tab-name">July</button>
                            <button className="tab-name">Aug</button>
                            <button className="tab-name">Sep</button>
                            <button className="tab-name">Oct</button>
                            <button className="tab-name">Nov</button>
                            <button className="tab-name">Dec</button>
                        </div>

                        {msgData.message[0].component.payload.listItems.map((item: any, index: any) => (
                            <div className={`adv-parent-acc-list ${(!item.isAccordian || !item.isCollapsed) ? `open-acc-adv-temp` : ``}`} data-kr-alt-acc-ext={`${msgData.messageId}_${index}`} style={item?.elementStyles}>
                                <div className="advanced-list-template-wrapper" onClick={() => handleItem(item)}>
                                    {item.icon && <div className="img-block">
                                        <figure>
                                            <img src={item.icon} />
                                        </figure>
                                    </div>}
                                    {(item.title || item.description) && <div className="titles-info-block">
                                        <h1 style={item?.titleStyles} dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(item.title, "bot") }}></h1>
                                        <p>{item.description}</p>
                                    </div>}
                                    <div className="right-actions-content">
                                        {item.headerOptions?.length > 0 && item.headerOptions.map((headerEle: any) => (
                                            <Fragment>
                                                {headerEle.contenttype === 'button' && <button style={headerEle?.buttonStyles} className="kr-button-blue-light" onClick={() => handleItem(headerEle)} dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(headerEle.title, "bot") }}></button>}
                                                {headerEle.type === 'text' && <h1 style={headerEle?.styles} dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(headerEle.value, "bot") }}>{headerEle.value}</h1>}
                                                {<p style={{ display: 'none' }} className="tag-status">Shortlisted</p>}
                                                {item.isAccordian && headerEle.type === 'icon' && <button className="arrow-icon" onClick={() => handleAccordian(index)}>
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.222 8.55518C11.4187 8.35845 11.4303 8.04668 11.2567 7.83641L11.222 7.79823L6.53504 3.11125C6.32601 2.90222 5.98711 2.90222 5.77809 3.11125C5.58136 3.30798 5.56978 3.61975 5.74337 3.83002L5.77809 3.8682L10.0865 8.1767L5.77809 12.4852C5.58136 12.6819 5.56978 12.9937 5.74337 13.204L5.77809 13.2422C5.97482 13.4389 6.28659 13.4505 6.49685 13.2769L6.53504 13.2422L11.222 8.55518Z" fill="#202124"/>
                                                    </svg>
                                                </button>}
                                                {headerEle.type === 'dropdown' && <div className="dropdown-list-wrapper" onClick={event => handleDropdown(event, index)}>
                                                    <button className="elipse-dropdown" onClick={event => handleDropdown(event, index)}>
                                                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
                                                            <path d="M7.46661 4.76623C8.1539 4.76623 8.71106 4.20908 8.71106 3.52179C8.71106 2.8345 8.1539 2.27734 7.46661 2.27734C6.77932 2.27734 6.22217 2.8345 6.22217 3.52179C6.22217 4.20908 6.77932 4.76623 7.46661 4.76623Z" fill="#202124"/>
                                                            <path d="M8.71106 8.49957C8.71106 9.18685 8.1539 9.74401 7.46661 9.74401C6.77932 9.74401 6.22217 9.18685 6.22217 8.49957C6.22217 7.81228 6.77932 7.25512 7.46661 7.25512C8.1539 7.25512 8.71106 7.81228 8.71106 8.49957Z" fill="#202124"/>
                                                            <path d="M8.71106 13.4773C8.71106 14.1646 8.1539 14.7218 7.46661 14.7218C6.77932 14.7218 6.22217 14.1646 6.22217 13.4773C6.22217 12.7901 6.77932 12.2329 7.46661 12.2329C8.1539 12.2329 8.71106 12.7901 8.71106 13.4773Z" fill="#202124"/>
                                                        </svg>
                                                    </button>
                                                    <ul className="drp-content-menu" data-kr-alt-drp={`${msgData.messageId}_${index}`}>
                                                        <button className="close-drp-down">
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                            <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586"/>
                                                        </svg>
                                                        </button>
                                                        {headerEle.dropdownOptions.map((dropdownEle: any) => (
                                                            <li>
                                                                <button className="kr-button-blue-light" onClick={() => handleItem(dropdownEle)} dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(dropdownEle.title, "bot") }}></button>
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
                                    {item.view === 'options' && item.optionsData && <Fragment>
                                        {item.optionsData[0].type === 'checkbox' && item.optionsData.map((checkboxEle: any, ind: any) => (
                                            <div className="checkbox-item item-checked">
                                                <input id={`check-box-${msgData.messageId}-${index}-${ind}`} className='checkbox-input' type="checkbox" value={checkboxEle.value} label={checkboxEle.label} data-kr-alt-che={`${msgData.messageId}_${index}`} />
                                                <label for={`check-box-${msgData.messageId}-${index}-${ind}`} className="checkbox-label">
                                                    <div className="title" dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(checkboxEle.label, "bot") }}></div>
                                                    {/* <div className="desc-text-checkbox">Checkbox item</div> */}
                                                </label>
                                            </div>))}
                                        {item.optionsData[0].type === 'radio' && item.optionsData.map((radioEle: any, ind: any) => (
                                            <div className="radio-button-item">
                                                <input id={`radio-button-${msgData.messageId}-${index}-${ind}`} name="radio" className="radio-input" type="radio" value={radioEle.value} label={radioEle.label} data-kr-alt-rad={`${msgData.messageId}_${index}`} />
                                                <label for={`radio-button-${msgData.messageId}-${index}-${ind}`} className="radio-label">
                                                    <div className="radio-title" dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(radioEle.label, "bot") }}></div>
                                                    {/* <div className="radio-desc">Radio button item</div> */}
                                                </label>
                                            </div>))}
                                    </Fragment>}
                                    {item.buttons?.length > 0 && item.view !== 'options' && <div className={`buttons-wrapper-sec ${item.buttonsLayout?.buttonAligment === 'fullwidth' ? `if-full-width-buttons` : ``}`}>
                                        {item.buttons.map((buttonEle: any, ind: any) => (
                                            (((item.buttonsLayout && ind < item.buttonsLayout?.displayLimit?.count) || !item.buttonsLayout && ind < 2) && <button className="kr-button-blue-light" onClick={() => handleItem(buttonEle)}>
                                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7804 3.31768C13.967 3.11682 14.2795 3.1067 14.4784 3.29508C14.6656 3.47238 14.6855 3.76232 14.5317 3.96328L14.5008 3.99987L6.13818 12.509C5.95951 12.7013 5.66615 12.7183 5.46746 12.5556L5.43136 12.523L1.44799 8.55964C1.25373 8.36636 1.25144 8.05066 1.44287 7.85451C1.62304 7.66991 1.9106 7.65699 2.10576 7.81726L2.14122 7.84934L5.76405 11.454L13.7804 3.31768Z" fill="#202124"/>
                                                </svg>
                                                <span dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(buttonEle.title, "bot") }}></span>
                                            </button>)))}
                                        {((item.buttonsLayout && item.buttons?.length > item.buttonsLayout?.displayLimit?.count) || !item.buttonsLayout) &&
                                            <Fragment>
                                                <button className="kr-button-blue-light" onClick={event => handleButtonsMore(event, index)}>
                                                    <svg width="14" height="14" viewBox="0 0 17 17" fill="none">
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
                                                            <button className="kr-button-blue-light" onClick={() => handleItem(buttonEle)} dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(buttonEle.title, "bot") }}></button>
                                                        </li>))}
                                                </ul>
                                            </Fragment>}
                                    </div>}

                                    {item.view === 'table' && item.tableListData && <div className={`table-list-data ${item.type === 'column' ? `if-column-type` : ``}`}>
                                        {item.tableListData[0].rowData.map((tableEle: any) => (
                                            <div className="table-body-data">
                                                {tableEle.icon && <div className="img_block">
                                                    <img src={tableEle.icon} />
                                                </div>}
                                                <div className="titles_info_block">
                                                    <p dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(tableEle.title, "bot") }}></p>
                                                    <h1 dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(tableEle.description, "bot") }}></h1>
                                                </div>
                                            </div>))}
                                    </div>}
                                </div>
                            </div>))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function AdvancedList(props: any) {
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
    const handleAccordian = (index: any) => {
        hostInstance.chatEle.querySelector(`[data-kr-alt-acc='${msgData.messageId}_${index}']`).classList.toggle('open-acc-adv-temp');
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

    const onSubmit = (item: any, index: any) => {
        if (item.optionsData[0].type == 'checkbox') {
            const eles = hostInstance.chatEle.querySelectorAll(`input[data-kr-alt-che=${msgData.messageId}_${index}]:checked`);
            const selectedValue: any = [];
            const selectText: any = [];
            eles?.forEach((ele: any) => {
                selectedValue.push(ele.value);
                selectText.push(ele.getAttribute('label'));
            });
            const innerText = eles.length > 0 ? item.buttons[0].title + ': ' + selectedValue.toString() : item.buttons[0].title;
            hostInstance.sendMessage(innerText, { renderMsg: innerText });
        } else {
            const ele = hostInstance.chatEle.querySelector(`input[data-kr-alt-rad=${msgData.messageId}_${index}]:checked`);
            const selectedValue: any = ele?.value;
            const selectText: any = ele?.getAttribute('label');
            const innerText = ele ? item.buttons[0].title + ': ' + selectedValue : item.buttons[0].title;
            hostInstance.sendMessage(innerText, { renderMsg: innerText });
        }
    }

    const onCancel = (item: any, index: any) => {
        if (item.optionsData[0].type == 'checkbox') {
            const eles = hostInstance.chatEle.querySelectorAll(`input[data-kr-alt-che=${msgData.messageId}_${index}]:checked`);
            eles?.forEach((ele: any) => {
                ele.checked = false;
            })
        } else {
            const ele = hostInstance.chatEle.querySelector(`input[data-kr-alt-rad=${msgData.messageId}_${index}]:checked`);
            if (ele) {
                ele.checked = false;
            }
        }
    }

    const handleViewMore = (type: any) => {
        if (type === 'slider') {
            hostInstance.bottomSliderAction('', getHTML(AdvancedListExtension, msgData, hostInstance));
        }
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'advancedListTemplate') {
        return (
            <div className="padding-wrapper-content">
                <div className="adv-parent-temp-wrapper">
                    <div className="main-heading-wrapper">
                        {msgData.message[0].component.payload.title && <h1 dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(msgData.message[0].component.payload.title, "bot") }}></h1>}
                        {(msgData.message[0].component.payload.isSortEnabled || msgData.message[0].component.payload.isSearchEnabled) && <div className="header-actions">
                            {msgData.message[0].component.payload.isSortEnabled && <button className="btn-action-filter">
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
                                    <path d="M2 4C1.72386 4 1.5 4.22386 1.5 4.5C1.5 4.77614 1.72386 5 2 5H14C14.2761 5 14.5 4.77614 14.5 4.5C14.5 4.22386 14.2761 4 14 4H2ZM4 8C3.72386 8 3.5 8.22386 3.5 8.5C3.5 8.77614 3.72386 9 4 9H12C12.2761 9 12.5 8.77614 12.5 8.5C12.5 8.22386 12.2761 8 12 8H4ZM6 12C5.72386 12 5.5 12.2239 5.5 12.5C5.5 12.7761 5.72386 13 6 13H10C10.2761 13 10.5 12.7761 10.5 12.5C10.5 12.2239 10.2761 12 10 12H6Z" fill="#202124"/>
                                </svg>
                            </button>}
                            {msgData.message[0].component.payload.isSearchEnabled && <button className="btn-action-filter">
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.29765 2.2998C4.26141 2.2998 1.80005 4.76774 1.80005 7.81209C1.80005 10.8564 4.26141 13.3244 7.29765 13.3244C8.62542 13.3244 9.84326 12.8524 10.7934 12.0667L13.3422 14.5909L13.3802 14.6252C13.5895 14.7962 13.898 14.7828 14.0916 14.5863C14.2973 14.3775 14.2952 14.0411 14.087 13.8349L11.5426 11.3151C12.3252 10.3627 12.7952 9.14244 12.7952 7.81209C12.7952 4.76774 10.3339 2.2998 7.29765 2.2998ZM7.29765 3.36241C9.74859 3.36241 11.7355 5.3546 11.7355 7.81209C11.7355 10.2696 9.74859 12.2618 7.29765 12.2618C4.84671 12.2618 2.85983 10.2696 2.85983 7.81209C2.85983 5.3546 4.84671 3.36241 7.29765 3.36241Z" fill="#202124"/>
                                </svg>
                            </button>}
                            <input type="search" className="input-search" placeholder="Search" style={{ display: 'none' }} />
                        </div>}
                    </div>

                    <div className="tabs-sec-data" style={{ display: 'none' }}>
                        <button className="tab-name active-tab">Jan</button>
                        <button className="tab-name">Feb</button>
                        <button className="tab-name">Mar</button>
                        <button className="tab-name">April</button>
                        <button className="tab-name">May</button>
                        <button className="tab-name">June</button>
                        <button className="tab-name">July</button>
                        <button className="tab-name">Aug</button>
                        <button className="tab-name">Sep</button>
                        <button className="tab-name">Oct</button>
                        <button className="tab-name">Nov</button>
                        <button className="tab-name">Dec</button>
                    </div>

                    {msgData.message[0].component.payload.listItems.map((item: any, index: any) => (
                        ((msgData.message[0].component.payload.seeMore && (index < msgData.message[0].component.payload.listItemDisplayCount) || !msgData.message[0].component.payload.seeMore) &&
                            <div className={`adv-parent-acc-list ${(!item.isAccordian || !item.isCollapsed) ? `open-acc-adv-temp` : ``}`} data-kr-alt-acc={`${msgData.messageId}_${index}`} style={item?.elementStyles}>
                                <div className="advanced-list-template-wrapper" onClick={() => handleItem(item)}>
                                    {item.icon && <div className="img-block">
                                        <img src={item.icon} />
                                    </div>}
                                    {(item.title || item.description) && <div className="titles-info-block">
                                        <h1 style={item?.titleStyles} dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(item.title, "bot") }}></h1>
                                        <p dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(item.description, "bot") }}></p>
                                    </div>}
                                    <div className="right-actions-content">
                                        {item.headerOptions?.length > 0 && item.headerOptions.map((headerEle: any) => (
                                            <Fragment>
                                                {headerEle.contenttype === 'button' && <button style={headerEle?.buttonStyles} className="kr-button-blue-light" onClick={() => handleItem(headerEle)} dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(headerEle.title, "bot") }}></button>}
                                                {headerEle.type === 'text' && <h1 style={headerEle?.styles} dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(headerEle.value, "bot") }}></h1>}
                                                {<p style={{ display: 'none' }} className="tag-status">Shortlisted</p>}
                                                {item.isAccordian && headerEle.type === 'icon' && <button className="arrow-icon" onClick={() => handleAccordian(index)}>
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.222 8.55518C11.4187 8.35845 11.4303 8.04668 11.2567 7.83641L11.222 7.79823L6.53504 3.11125C6.32601 2.90222 5.98711 2.90222 5.77809 3.11125C5.58136 3.30798 5.56978 3.61975 5.74337 3.83002L5.77809 3.8682L10.0865 8.1767L5.77809 12.4852C5.58136 12.6819 5.56978 12.9937 5.74337 13.204L5.77809 13.2422C5.97482 13.4389 6.28659 13.4505 6.49685 13.2769L6.53504 13.2422L11.222 8.55518Z" fill="#202124"/>
                                                    </svg>
                                                </button>}
                                                {headerEle.type === 'dropdown' && <div className="dropdown-list-wrapper" onClick={event => handleDropdown(event, index)}>
                                                    <button className="elipse-dropdown" onClick={event => handleDropdown(event, index)}>
                                                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
                                                            <path d="M7.46661 4.76623C8.1539 4.76623 8.71106 4.20908 8.71106 3.52179C8.71106 2.8345 8.1539 2.27734 7.46661 2.27734C6.77932 2.27734 6.22217 2.8345 6.22217 3.52179C6.22217 4.20908 6.77932 4.76623 7.46661 4.76623Z" fill="#202124"/>
                                                            <path d="M8.71106 8.49957C8.71106 9.18685 8.1539 9.74401 7.46661 9.74401C6.77932 9.74401 6.22217 9.18685 6.22217 8.49957C6.22217 7.81228 6.77932 7.25512 7.46661 7.25512C8.1539 7.25512 8.71106 7.81228 8.71106 8.49957Z" fill="#202124"/>
                                                            <path d="M8.71106 13.4773C8.71106 14.1646 8.1539 14.7218 7.46661 14.7218C6.77932 14.7218 6.22217 14.1646 6.22217 13.4773C6.22217 12.7901 6.77932 12.2329 7.46661 12.2329C8.1539 12.2329 8.71106 12.7901 8.71106 13.4773Z" fill="#202124"/>
                                                        </svg>
                                                    </button>
                                                    <ul className="drp-content-menu" data-kr-alt-drp={`${msgData.messageId}_${index}`}>
                                                        <button className="close-drp-down">
                                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586"/>
                                                            </svg>
                                                        </button>
                                                        {headerEle.dropdownOptions.map((dropdownEle: any) => (
                                                            <li>
                                                                <button className="kr-button-blue-light" onClick={() => handleItem(dropdownEle)} dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(dropdownEle.title, "bot") }}></button>
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
                                    {item.view === 'options' && item.optionsData && <Fragment>
                                        <div className="checkbox-list-data-tems">
                                            {item.optionsData[0].type === 'checkbox' && item.optionsData.map((checkboxEle: any, ind: any) => (
                                                <div className="checkbox-item item-checked">
                                                    <input id={`check-box-${msgData.messageId}-${index}-${ind}`} className='checkbox-input' type="checkbox" value={checkboxEle.value} label={checkboxEle.label} data-kr-alt-che={`${msgData.messageId}_${index}`} />
                                                    <label for={`check-box-${msgData.messageId}-${index}-${ind}`} className="checkbox-label">
                                                        <div className="title" dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(checkboxEle.label, "bot") }}></div>
                                                        {/* <div className="desc-text-checkbox">Checkbox item</div> */}
                                                    </label>
                                                </div>))}
                                            {item.optionsData[0].type === 'radio' && item.optionsData.map((radioEle: any, ind: any) => (
                                                <div className="radio-button-item">
                                                    <input id={`radio-button-${msgData.messageId}-${index}-${ind}`} name="radio" className="radio-input" type="radio" value={radioEle.value} label={radioEle.label} data-kr-alt-rad={`${msgData.messageId}_${index}`} />
                                                    <label for={`radio-button-${msgData.messageId}-${index}-${ind}`} className="radio-label">
                                                        <div className="radio-title" dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(radioEle.label, "bot") }}></div>
                                                        {/* <div className="radio-desc">Radio button item</div> */}
                                                    </label>
                                                </div>))}
                                        </div>
                                        <div className="buttons-wrapper-sec">
                                            <button className="kr-button-primary" onClick={() => onSubmit(item, index)} dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(item.buttons[0].title, "bot") }}></button>
                                            <button className="kr-button-secondary" onClick={() => onCancel(item, index)} dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(item.buttons[1].title, "bot") }}></button>
                                        </div>
                                    </Fragment>}
                                    {item.buttons?.length > 0 && item.view !== 'options' && <div className={`buttons-wrapper-sec ${item.buttonsLayout?.buttonAligment === 'fullwidth' ? `if-full-width-buttons` : ``}`}>
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
                                                            <button className="kr-button-blue-light" onClick={() => handleItem(buttonEle)} dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(buttonEle.title, "bot") }}></button>
                                                        </li>))}
                                                </ul>
                                            </Fragment>}
                                    </div>}

                                    {item.view === 'table' && item.tableListData && <div className={`table-list-data ${item.type === 'column' ? `if-column-type` : ``}`}>
                                        {item.tableListData[0].rowData.map((tableEle: any) => (
                                            <div className="table-body-data">
                                                {tableEle.icon && <div className="img_block">
                                                    <img src={tableEle.icon} />
                                                </div>}
                                                <div className="titles_info_block">
                                                    <p dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(tableEle.title, "bot") }}></p>
                                                    <h1 dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(tableEle.description, "bot") }}></h1>
                                                </div>
                                            </div>))}
                                    </div>}
                                </div>
                            </div>)))}

                    {msgData.message[0].component.payload.seeMore && <div className="see-more-link">
                        <button className="see-more-btn" onClick={() => handleViewMore(msgData.message[0].component.payload.seeMoreAction)}>
                            <span>See more</span>
                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.222 9.05518C11.4187 8.85845 11.4303 8.54668 11.2567 8.33641L11.222 8.29823L6.53504 3.61125C6.32601 3.40222 5.98711 3.40222 5.77809 3.61125C5.58136 3.80798 5.56978 4.11975 5.74337 4.33002L5.77809 4.3682L10.0865 8.6767L5.77809 12.9852C5.58136 13.1819 5.56978 13.4937 5.74337 13.704L5.77809 13.7422C5.97482 13.9389 6.28659 13.9505 6.49685 13.7769L6.53504 13.7422L11.222 9.05518Z" fill="#202124"/>
                            </svg>
                        </button>
                    </div>}

                </div>
            </div>
        );
    }
}

class TemplateAdvancedList extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(AdvancedList, msgData, this.hostInstance);
    }
}

export default TemplateAdvancedList;