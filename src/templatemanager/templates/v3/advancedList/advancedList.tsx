import BaseChatTemplate from '../baseChatTemplate';
import './advancedList.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';
import { getHTML } from '../../../base/domManager';
import IconsManager from '../../../base/iconsManager';

export function AdvancedListExtension(props: any) {
    const iconHelper = new IconsManager();
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;

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

    return (
        <div className="menu-wrapper-data-actions">
            <div className="actions-slider-header-menu">
                <button className="menu-close" role="contentinfo" aria-label="close" onClick={closeMenu}>
                    <figure>
                        <img src={iconHelper.getIcon('close_icon')} alt="close" />
                    </figure>
                </button>
            </div>
            <div className="iner-data-scroll-wraper">
                <div className="padding-wrapper-content">
                    <div className="adv-parent-temp-wrapper">
                        <div className="main-heading-wrapper">
                            {msgData.message[0].component.payload.title && <h1>{msgData.message[0].component.payload.title}</h1>}
                            {(msgData.message[0].component.payload.isSortEnabled || msgData.message[0].component.payload.isSearchEnabled) && <div className="header-actions">
                                {msgData.message[0].component.payload.isSortEnabled && <button className="btn-action-filter">
                                    <i className="sdkv3-filter"></i>
                                </button>}
                                {msgData.message[0].component.payload.isSearchEnabled && <button className="btn-action-filter">
                                    <i className="sdkv3-search"></i>
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
                            <div className={`adv-parent-acc-list ${(!item.isAccordian || !item.isCollapsed) ? `open-acc-adv-temp` : ``}`} data-kr-alt-acc={`${msgData.messageId}_${index}`} style={item?.elementStyles}>
                                <div className="advanced-list-template-wrapper" onClick={() => handleItem(item)}>
                                    {item.icon && <div className="img-block">
                                        <figure>
                                            <img src={item.icon} />
                                        </figure>
                                    </div>}
                                    {(item.title || item.description) && <div className="titles-info-block">
                                        <h1 style={item?.titleStyles}>{item.title}</h1>
                                        <p>{item.description}</p>
                                    </div>}
                                    <div className="right-actions-content">
                                        {item.headerOptions?.length > 0 && item.headerOptions.map((headerEle: any) => (
                                            <Fragment>
                                                {headerEle.contenttype === 'button' && <button style={headerEle?.buttonStyles} className="kr-button-blue-light" onClick={() => handleItem(headerEle)}>{headerEle.title}</button>}
                                                {headerEle.type === 'text' && <h1 style={headerEle?.styles}>{headerEle.value}</h1>}
                                                {<p style={{ display: 'none' }} className="tag-status">Shortlisted</p>}
                                                {item.isAccordian && headerEle.type === 'icon' && <button className="arrow-icon" onClick={() => handleAccordian(index)}>
                                                    <i className="sdkv3-cheveron-right"></i>
                                                </button>}
                                                {headerEle.type === 'dropdown' && <div className="dropdown-list-wrapper" onClick={event => handleDropdown(event, index)}>
                                                    <button className="elipse-dropdown" onClick={event => handleDropdown(event, index)}>
                                                        <i className="sdkv3-elipse"></i>
                                                    </button>
                                                    <ul className="drp-content-menu" data-kr-alt-drp={`${msgData.messageId}_${index}`}>
                                                        <button className="close-drp-down">
                                                            <i className="sdkv3-close"></i>
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
                                                <p>{textEle.title}</p>
                                            </div>))}
                                    </div>}
                                    {item.view === 'options' && item.optionsData && <Fragment>
                                        {item.optionsData[0].type === 'checkbox' && item.optionsData.map((checkboxEle: any, ind: any) => (
                                            <div className="checkbox-item item-checked">
                                                <input id={`check-box-${msgData.messageId}-${index}-${ind}`} className='checkbox-input' type="checkbox" value={checkboxEle.value} label={checkboxEle.label} data-kr-alt-che={`${msgData.messageId}_${index}`} />
                                                <label for={`check-box-${msgData.messageId}-${index}-${ind}`} className="checkbox-label">
                                                    <div className="title">{checkboxEle.label}</div>
                                                    {/* <div className="desc-text-checkbox">Checkbox item</div> */}
                                                </label>
                                            </div>))}
                                        {item.optionsData[0].type === 'radio' && item.optionsData.map((radioEle: any, ind: any) => (
                                            <div className="radio-button-item">
                                                <input id={`radio-button-${msgData.messageId}-${index}-${ind}`} name="radio" className="radio-input" type="radio" value={radioEle.value} label={radioEle.label} data-kr-alt-rad={`${msgData.messageId}_${index}`} />
                                                <label for={`radio-button-${msgData.messageId}-${index}-${ind}`} className="radio-label">
                                                    <div className="radio-title">{radioEle.label}</div>
                                                    {/* <div className="radio-desc">Radio button item</div> */}
                                                </label>
                                            </div>))}
                                    </Fragment>}
                                    {item.buttons?.length > 0 && item.view !== 'options' && <div className={`buttons-wrapper-sec ${item.buttonsLayout?.buttonAligment === 'fullwidth' ? `if-full-width-buttons` : ``}`}>
                                        {item.buttons.map((buttonEle: any, ind: any) => (
                                            (((item.buttonsLayout && ind < item.buttonsLayout?.displayLimit?.count) || !item.buttonsLayout && ind < 2) && <button className="kr-button-blue-light" onClick={() => handleItem(buttonEle)}>
                                                <i className="sdkv3-check"></i>
                                                <span>{buttonEle.title}</span>
                                            </button>)))}
                                        {((item.buttonsLayout && item.buttons?.length > item.buttonsLayout?.displayLimit?.count) || !item.buttonsLayout) &&
                                            <Fragment>
                                                <button className="kr-button-blue-light" onClick={event => handleButtonsMore(event, index)}>
                                                    <i className="sdkv3-elipse-horizantal"></i>
                                                    <span>More</span>
                                                </button>
                                                <ul className="drp-content-menu" data-kr-alt-btm={`${msgData.messageId}_${index}`}>
                                                    <button className="close-drp-down" onClick={event => handleButtonsMore(event, index)}>
                                                        <i className="sdkv3-close"></i>
                                                    </button>
                                                    {item.buttons.map((buttonEle: any, ind: any) => (
                                                        <li>
                                                            <button className="kr-button-blue-light" onClick={() => handleItem(buttonEle)}>{buttonEle.title}</button>
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
                                                    <p>{tableEle.title}</p>
                                                    <h1>{tableEle.description}</h1>
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
                        {msgData.message[0].component.payload.title && <h1>{msgData.message[0].component.payload.title}</h1>}
                        {(msgData.message[0].component.payload.isSortEnabled || msgData.message[0].component.payload.isSearchEnabled) && <div className="header-actions">
                            {msgData.message[0].component.payload.isSortEnabled && <button className="btn-action-filter">
                                <i className="sdkv3-filter"></i>
                            </button>}
                            {msgData.message[0].component.payload.isSearchEnabled && <button className="btn-action-filter">
                                <i className="sdkv3-search"></i>
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
                                        <h1 style={item?.titleStyles}>{item.title}</h1>
                                        <p>{item.description}</p>
                                    </div>}
                                    <div className="right-actions-content">
                                        {item.headerOptions?.length > 0 && item.headerOptions.map((headerEle: any) => (
                                            <Fragment>
                                                {headerEle.contenttype === 'button' && <button style={headerEle?.buttonStyles} className="kr-button-blue-light" onClick={() => handleItem(headerEle)}>{headerEle.title}</button>}
                                                {headerEle.type === 'text' && <h1 style={headerEle?.styles}>{headerEle.value}</h1>}
                                                {<p style={{ display: 'none' }} className="tag-status">Shortlisted</p>}
                                                {item.isAccordian && headerEle.type === 'icon' && <button className="arrow-icon" onClick={() => handleAccordian(index)}>
                                                    <i className="sdkv3-cheveron-right"></i>
                                                </button>}
                                                {headerEle.type === 'dropdown' && <div className="dropdown-list-wrapper" onClick={event => handleDropdown(event, index)}>
                                                    <button className="elipse-dropdown" onClick={event => handleDropdown(event, index)}>
                                                        <i className="sdkv3-elipse"></i>
                                                    </button>
                                                    <ul className="drp-content-menu" data-kr-alt-drp={`${msgData.messageId}_${index}`}>
                                                        <button className="close-drp-down">
                                                            <i className="sdkv3-close"></i>
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
                                                <p>{textEle.title}</p>
                                            </div>))}
                                    </div>}
                                    {item.view === 'options' && item.optionsData && <Fragment>
                                        <div className="checkbox-list-data-tems">
                                            {item.optionsData[0].type === 'checkbox' && item.optionsData.map((checkboxEle: any, ind: any) => (
                                                <div className="checkbox-item item-checked">
                                                    <input id={`check-box-${msgData.messageId}-${index}-${ind}`} className='checkbox-input' type="checkbox" value={checkboxEle.value} label={checkboxEle.label} data-kr-alt-che={`${msgData.messageId}_${index}`} />
                                                    <label for={`check-box-${msgData.messageId}-${index}-${ind}`} className="checkbox-label">
                                                        <div className="title">{checkboxEle.label}</div>
                                                        {/* <div className="desc-text-checkbox">Checkbox item</div> */}
                                                    </label>
                                                </div>))}
                                            {item.optionsData[0].type === 'radio' && item.optionsData.map((radioEle: any, ind: any) => (
                                                <div className="radio-button-item">
                                                    <input id={`radio-button-${msgData.messageId}-${index}-${ind}`} name="radio" className="radio-input" type="radio" value={radioEle.value} label={radioEle.label} data-kr-alt-rad={`${msgData.messageId}_${index}`} />
                                                    <label for={`radio-button-${msgData.messageId}-${index}-${ind}`} className="radio-label">
                                                        <div className="radio-title">{radioEle.label}</div>
                                                        {/* <div className="radio-desc">Radio button item</div> */}
                                                    </label>
                                                </div>))}
                                        </div>
                                        <div className="buttons-wrapper-sec">
                                            <button className="kr-button-primary" onClick={() => onSubmit(item, index)}>{item.buttons[0].title}</button>
                                            <button className="kr-button-secondary" onClick={() => onCancel(item, index)}>{item.buttons[1].title}</button>
                                        </div>
                                    </Fragment>}
                                    {item.buttons?.length > 0 && item.view !== 'options' && <div className={`buttons-wrapper-sec ${item.buttonsLayout?.buttonAligment === 'fullwidth' ? `if-full-width-buttons` : ``}`}>
                                        {item.buttons.map((buttonEle: any, ind: any) => (
                                            (((item.buttonsLayout && ind < item.buttonsLayout?.displayLimit?.count) || !item.buttonsLayout && ind < 2) && <button className="kr-button-blue-light" onClick={() => handleItem(buttonEle)}>
                                                <i className="sdkv3-check"></i>
                                                <span>{buttonEle.title}</span>
                                            </button>)))}
                                        {((item.buttonsLayout && item.buttons?.length > item.buttonsLayout?.displayLimit?.count) || !item.buttonsLayout) &&
                                            <Fragment>
                                                <button className="kr-button-blue-light" onClick={event => handleButtonsMore(event, index)}>
                                                    <i className="sdkv3-elipse-horizantal"></i>
                                                    <span>More</span>
                                                </button>
                                                <ul className="drp-content-menu" data-kr-alt-btm={`${msgData.messageId}_${index}`}>
                                                    <button className="close-drp-down" onClick={event => handleButtonsMore(event, index)}>
                                                        <i className="sdkv3-close"></i>
                                                    </button>
                                                    {item.buttons.map((buttonEle: any, ind: any) => (
                                                        <li>
                                                            <button className="kr-button-blue-light" onClick={() => handleItem(buttonEle)}>{buttonEle.title}</button>
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
                                                    <p>{tableEle.title}</p>
                                                    <h1>{tableEle.description}</h1>
                                                </div>
                                            </div>))}
                                    </div>}
                                </div>
                            </div>)))}

                    {msgData.message[0].component.payload.seeMore && <div className="see-more-link">
                        <button className="see-more-btn" onClick={() => handleViewMore(msgData.message[0].component.payload.seeMoreAction)}>
                            <span>See more</span>
                            <i className="sdkv3-cheveron-right"></i>
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

