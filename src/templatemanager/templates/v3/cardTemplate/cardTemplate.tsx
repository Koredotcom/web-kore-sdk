import { getHTML } from '../../../base/domManager';
import BaseChatTemplate from '../baseChatTemplate';
import IconsManager from '../../../base/iconsManager';
import './cardTemplate.scss';
import { h, Fragment, ComponentChild, VNode } from 'preact';

export function cardSliderExtension(props: any) {
    const sliderData = props.msgData;
    const iconHelper = new IconsManager();
    const hostInstance = props.hostInstance;
    const closeMenu = () => {
        hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').classList.add('close-bottom-slide');
        setTimeout(() => {
            hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').remove('.chat-actions-bottom-wraper');
        }, 150);
    }
    const openAccordionDetails = (e: any, i: any) => {
        if (hostInstance.chatEle.querySelectorAll('.accordion_collapse')[i].classList.contains('collapse_data')) {
            hostInstance.chatEle.querySelectorAll('.accordion_collapse')[i].classList.remove('collapse_data');
        } else {
            hostInstance.chatEle.querySelectorAll('.accordion_collapse')[i].classList.add('collapse_data');
        }
    }

    const openAccordionTab = (e: any, index: any, i: any) => {
        if (hostInstance.chatEle.querySelector(`[data-kr-ct-acc='acc_${index}_${i}'`).classList.contains('collapse_data')) {
            hostInstance.chatEle.querySelector(`[data-kr-ct-acc='acc_${index}_${i}'`).classList.remove('collapse_data');
        } else {
            hostInstance.chatEle.querySelector(`[data-kr-ct-acc='acc_${index}_${i}'`).classList.add('collapse_data');
        }
    }

    /**
     * handle previous and current tabindex 
     * @param event 
     */
    const handleTabChange = (event: any) => {
        const tabHeader = hostInstance.chatEle.querySelectorAll('.tab-item');
        tabHeader.forEach((ele: any, i: any) => {
            setActive(i, event, ele)
        })
        const tabInfo = hostInstance.chatEle.querySelectorAll('.tab-pane');
        tabInfo.forEach((ele: any, i: any) => {
            setActive(i, event, ele)
        })
        const tabmoreInfo = hostInstance.chatEle.querySelectorAll('.tab-accordian');
        tabmoreInfo.forEach((ele: any, i: any) => {
            setActive(i, event, ele)
        })
    };

    /**
    * handle previous and current tabindex 
    * @param i :  return the index  
    * @param event : return the index of current event 
    * @param ele : using for active and inactive the class
    */
    const setActive = (i: any, event: any, ele: any) => {
        if (i == event) {
            ele.classList.add('active');
        } else {
            ele.classList.remove('active');
        }
    }

    /**
     * handle the selections basis on select the select box
     * @param event : return the index of current event 
    */
    const selectionChange = (event: any) => {
        const selectedOption = event.target.value;
        const selectedIndex = event.target.selectedIndex;
        handleTabChange(selectedIndex);
    }
    return (
        <div className="menu-wrapper-data-actions">
            <div className="actions-slider-header-menu">
                <h1>{sliderData.sliderTitle}</h1>
                <button className="menu-close" role="contentinfo" aria-label="close" onClick={closeMenu}>
                    <figure>
                        <img src={iconHelper.getIcon('close_icon')} alt="close" />
                    </figure>
                </button>
            </div>
            <div className="iner-data-scroll-wraper">
                <section className="card-info-more-details" aria-label="card template sdk">
                    {
                        sliderData.sliderInfo.map((ele: any) => (
                            <div>
                                <div className="top-sec-card">
                                    <img src={ele?.topSection?.icon} />
                                    {ele?.topSection?.title && <h1>{ele?.topSection?.title}</h1>}
                                    {ele?.topSection?.details?.title && <span style={ele?.topSection?.details?.styles} className="tag-name">{ele?.topSection?.details?.title}</span>}
                                </div>
                                <div>
                                    {ele?.topSection?.details?.subTitle && <h2 style={ele?.topSection?.details?.subTitleStyles}>{ele?.topSection?.details?.subTitle}</h2>}
                                </div>
                                {
                                    ele?.middleSection?.items?.map((item: any) => (
                                        <div className="middle-sec-card">
                                            <div class="img-with-text">
                                                <img src={item?.icon} />
                                                {item?.title && <p>{item?.title}</p>}
                                            </div>
                                            <div class="right-title">
                                                {item?.value && <p>{item?.value}</p>}
                                            </div>
                                        </div>
                                    ))
                                }
                                {
                                    ele?.bottomSection?.items?.map((val: any) => (
                                        <div className="bottom-sec-card small-font-sec">
                                            <div class="img-with-text">
                                                {val.icon && <img src={val.icon} />}
                                                {val.title && <p style={val.titleStyles}>{val.title}</p>}
                                            </div>
                                            <div class="right-title">
                                                {val.icon && <img src={val.icon} />}
                                                {val.value && <p style={val.titleStyles}>{val.value}</p>}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </section>
                <div className="accordion-wrapper" id="accordion">
                    {
                        sliderData.sliderInfo.map((ele: any) => (
                            ele.moreInfo.map((item: any, i: any) => (
                                <div className="accordion_item">
                                    <button className="accordion_heading" aria-expanded="true" onClick={() => openAccordionDetails(event, i)}>
                                        <p>{item.title}</p>
                                        <p style={item?.valueStyle}>{item.value}</p>
                                        <div className="arrow-icon">
                                            <i className="sdkv3-cheveron-right"></i>
                                        </div>
                                    </button>
                                    <div className="accordion_collapse">
                                        <div className="accordion_body">
                                            <div className="card-acc-temp-sec">
                                                {
                                                    item.items?.map((val: any, index: any) => (
                                                        <div className="card-acc-temp card-accordian">
                                                            <div className="left-data">
                                                                <div key={index}>
                                                                    {val?.name && <h1 className="t-data">{val?.name}</h1>}
                                                                    {val?.description && <p>{val.description}</p>}
                                                                    {val?.subTitle && <p className="mt-5">{val?.subTitle}</p>}
                                                                </div>
                                                                <div className="tab-header tab tab-left">
                                                                    {val.itemDescriptions && val.itemDescriptions.map((tab: any, index: any) => (
                                                                        <div key={index} >
                                                                            {tab?.type && <h2 style={val?.nameStyles && val?.nameStyles}>{tab?.type}</h2>}
                                                                            {tab?.name && <p style={val?.valueStyle && val?.valueStyle} className="title">{tab.name}</p>}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div className="right-data">
                                                                <div>
                                                                    {val?.value && <p>{val?.value}</p>}
                                                                    {val?.subTitleValue && <p className="mt-5">{val?.subTitleValue}</p>}
                                                                    {/* {{moreInfoValue} && <p>{moreInfoValue}</p> */}

                                                                </div>
                                                                <div className="tab-header tab tab-right">
                                                                    {val?.itemDescriptions && val.itemDescriptions.map((tab: any, index: any) => (
                                                                        <div key={index} className="tab-p">
                                                                            {tab?.value && <p style={tab?.valueStyle}>{tab?.value}</p>}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            ))
                        ))
                    }
                </div>
                <div className="tab-data-style">
                    {/* tab accroidian start */}
                    {
                        sliderData?.sliderInfo?.map((ele: any) => (
                            <div>
                                {ele.vehicles?.length > 2 ? ele?.vehicles?.map((tab: any, index: any) => (
                                    <div className="tabs">
                                        <div style={tab?.tabStyle && tab?.tabStyle} className="tab-header">
                                            <div
                                                key={index}
                                                onClick={() => handleTabChange(index)} id={index}
                                                className={index == 0 ? "tab-item active" : "tab-item"}
                                            >
                                                {tab.title && <h2 className="title">{tab.title} <br /> {tab.subTitle}</h2>}
                                            </div>
                                        </div>
                                    </div>
                                )) :
                                    <div>
                                        {
                                            <select onChange={selectionChange}>
                                                {ele?.vehicles?.map((tab: any, index: any) => (
                                                    <option key={index} value={tab.title}>
                                                        {tab.title} <br /> {tab.subTitle}
                                                    </option>
                                                ))}
                                            </select>
                                        }
                                    </div>
                                }
                            </div>
                        ))
                    }

                    {/* tab accroidian End */}
                    {
                        sliderData?.sliderInfo?.map((ele: any) => (
                            ele?.vehicles?.map((tab: any, index: any) => (
                                <div className="tabs">
                                    <div
                                        key={index}
                                        className={index == 0 ? "tab-pane active" : "tab-pane"}>
                                        <div>
                                            <h2 className="sub-title">{tab.info}</h2>
                                            {tab.content.map((tab: any) => (
                                                <div className="clearfix p-bottom border-bottom">
                                                    <div className="card-acc-temp-sec tab-accordian-data">
                                                        <div className="card-acc-temp card-accordian">
                                                            <div className="left-data">
                                                                {tab.name && <p>
                                                                    {tab.name}
                                                                </p>}
                                                            </div>
                                                            <div className="right-data">
                                                                {tab.value && <p>{tab.value}</p>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )
                            )
                        ))
                    }
                    {
                        sliderData?.sliderInfo?.map((ele: any) => (
                            ele?.vehicles?.map((tab: any, index: any) => (
                                <div className="tabs">
                                    <div key={index}
                                        className={index == 0 ? "tab-accordian active" : "tab-accordian"}>
                                        {tab.items && tab.items.map((tab: any, i: any) => (
                                            <div className="accordion-wrapper accordian-container">
                                                <div className="accordion_item">
                                                    <button className="accordion_heading" aria-expanded="true" onClick={() => openAccordionTab(event, index, i)}>
                                                        {tab.title && <p>{tab.title}</p>}
                                                        <p style={tab?.valueStyle}>{tab.value}</p>
                                                        <div className="arrow-icon">
                                                            <i className="sdkv3-cheveron-right"></i>
                                                        </div>
                                                    </button>
                                                    <div className="accordion_collapse_tab" data-kr-ct-acc={`acc_${index}_${i}`}>
                                                        <div className="accordion_body">
                                                            {tab.subitems && tab.subitems.map((val: any, i: any) => (
                                                                <div>
                                                                    <div className="card-acc-temp-sec tab-accordian-data">
                                                                        <div className="card-acc-temp card-accordian">
                                                                            <div className="left-data">
                                                                                {val.name && <h2 style={val.nameStyles}>{val.name}</h2>}
                                                                                {val.subTitle && <p style={val.valueStyle} className="title">{val.subTitle}</p>}
                                                                            </div>
                                                                            <div className="right-data">
                                                                                {val.value && <p className="mt-5">{val.value}</p>}
                                                                                {val.subTitleValue && <p>{val.subTitleValue}</p>}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}

                                                            {tab.items && tab.items.map((val: any, i: any) => (
                                                                <div className="border-style">
                                                                    <div className="card-acc-temp-sec tab-accordian-data">
                                                                        <div className="card-acc-temp">
                                                                            <div className="left-data">
                                                                                {val.name && <h2 className="sub-title" style={val.nameStyles}>{val.name}</h2>}
                                                                            </div>
                                                                            <div className="right-data">
                                                                                {val.value && <h2 className="sub-title" style={val.nameStyles}>{val.value}</h2>}
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                    {
                                                                        val.itemDescriptions && val.itemDescriptions.map((val: any, i: any) => (
                                                                            <div style={val?.borderStyle && val?.borderStyle}>
                                                                                <div className="card-acc-temp-sec">
                                                                                    <div className="card-acc-temp">
                                                                                        <div className="left-data">
                                                                                            {val.type && <h2>{val.type}</h2>}
                                                                                            {val.name && <p>{val.name}</p>}
                                                                                        </div>
                                                                                        <div className="right-data">
                                                                                            {val.value && <p style={val.titleStyle}>{val.value}</p>}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                {
                                                                                    val.limits && val.limits.map((val: any, i: any) => (
                                                                                        <div className="card-acc-temp-sec tab-accordian-data">
                                                                                            <div className="card-acc-temp pd-0">
                                                                                                <div className="left-data left-bottom-data">
                                                                                                    {val.name && <p>{val.name}</p>}
                                                                                                </div>
                                                                                                <div className="right-data text-value">
                                                                                                    {val.value && <p>{val.value}</p>}
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))
                                                                                }
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        ))}
                                    </div>
                                </div>

                            )
                            )
                        ))
                    }
                </div>

            </div>
        </div >
    );
}

export function card(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }


    const handleButtonEvent = (e: any) => {
        if (e.type.toLowerCase() == 'postback' || e.type.toLowerCase() == 'text') {
            hostInstance.sendMessage(e.value, { renderMsg: e.title });
        } else if (e.type == 'url' || e.type == 'web_url') {
            let link = e.value;
            if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
                link = `http:////${link}`;
            }
            hostInstance.openExternalLink(link);
        } else if (e.type == 'slider') {
            hostInstance.bottomSliderAction('', getHTML(cardSliderExtension, e, hostInstance));
        }
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type === 'cardTemplate' && msgData?.message?.[0]?.component?.payload?.cardViewType === 'modern') {
        // Active Section Template Start
        return (
            <Fragment>
                <div>
                    <section className="card-template-wrapper" aria-label="card template sdk">
                        <div className="card-warpper-info card-style">
                            {msgData.message[0]?.component?.payload?.cards.cardHeading?.title && <h1 id="card-style-header">{msgData.message[0]?.component?.payload?.cards?.cardHeading?.title}</h1>}
                            {msgData.message[0]?.component?.payload?.cards && <p style={msgData.valueStyles}>{msgData.message[0]?.component?.payload?.cards}</p>}

                            {
                                msgData.message[0].component?.payload?.cards?.cardDescription?.map((ele: any) => (
                                    <button className="card-content-sec" onClick={() => handleButtonEvent(ele.actions)}>
                                        <div className="top-sec-card">
                                            <img src={ele?.topSection?.icon} />
                                            {ele?.topSection?.title && <h1>{ele?.topSection?.title}</h1>}
                                            {ele?.topSection?.details && <span style={ele?.topSection?.details?.styles} className="tag-name">{ele?.topSection?.details?.title}</span>}
                                        </div>
                                        <div className="middle-sec-card  middle-sec-card-style">
                                            {ele?.middleSection?.title && <h1>{ele?.middleSection?.title}</h1>}
                                        </div>
                                        <div className="bottom-sec-card bottom-sec-card-style">
                                            {
                                                ele?.bottomSection?.items?.map((ele: any) => (
                                                    <div className="bottom-sec-style">
                                                        <div className="card-acc-temp-sec">
                                                            <div className="card-acc-temp">
                                                                <div className="left-data">
                                                                    {ele?.title && <h2> <img src={ele.icon && ele.icon} /> {ele?.title}</h2>}
                                                                </div>
                                                                <div className="right-data">
                                                                    <p>
                                                                        {ele?.value && <time>{ele?.value}</time>}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                ))}
                                        </div>
                                    </button>
                                ))
                            }
                        </div>
                    </section>
                </div>
            </Fragment>
        );
        // Active Section Template End
    } else if (msgData?.message?.[0]?.component?.payload?.template_type === 'cardTemplate' && msgData?.message?.[0]?.component?.payload?.cardViewType === 'details') {
\        return (
            <Fragment>
                <div>
                    <section className="card-template-wrapper-view-more-details" aria-label="card template sdk">
                        <div className="card-warpper-info card-style">
                            {msgData.message[0]?.component?.payload?.cards.cardHeading?.title && <h1 id="card-style-header">{msgData.message[0]?.component?.payload?.cards?.cardHeading?.title}</h1>}
                            {msgData.message[0]?.component?.payload?.cards && <p style={msgData.valueStyles}>{msgData.message[0]?.component?.payload?.cards}</p>}
                            {
                                msgData.message[0].component.payload.cards.cardDescription.map((ele: any) => (
                                    <div className="card-content-sec">
                                        {/* Top Section Start */}
                                        <div className="top-sec-card">
                                            <div className="card-acc-temp-sec">
                                                <div className="card-acc-temp">
                                                    <div className="left-data">
                                                        {ele?.topSection?.title && <h1 style={ele?.topSection?.subTitleStyles && ele?.topSection?.subTitleStyles}><img src={ele?.topSection?.icon} /> {ele?.topSection?.title}</h1>}
                                                        {ele.topSection?.subTitle && <h2 style={ele?.topSection?.subTitleStyles && ele?.topSection?.subTitleStyles}>{ele.topSection?.subTitle}</h2>}
                                                    </div>
                                                    <div className="right-data">
                                                        {ele?.topSection?.details?.title && <span style={ele?.topSection?.details?.styles} className="tag-name">{ele?.topSection?.details?.title}</span>}
                                                    </div>
                                                    {
                                                        ele.topSection?.items.map((val: any) => (
                                                            <div style={val?.borderStyles} className="gap-style">
                                                                <div className="left-data">
                                                                    {val?.title && <h3 style={val?.titleStyles && val?.titleStyles}>{val?.title}</h3>}
                                                                </div>
                                                                <div className="right-data">
                                                                    {val?.value && <p style={val?.titleStyles && val?.valueStyles}>{val?.value}</p>}

                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border-divider"></div>
                                        {/* Top Section End */}
                                        {/* Middle Section Start */}
                                        <div className="middle-sec-card">
                                            <div style={ele?.middleSection && ele?.middleSection?.borderStyles}>
                                                <div className="card-acc-temp-sec">
                                                    <div className="card-acc-temp">
                                                        <div className="left-data">
                                                            {ele?.middleSection?.title && <h2 style={ele?.middleSection?.titleStyles}>{ele?.middleSection?.title}</h2>}
                                                        </div>
                                                        <div className="right-data">
                                                            {ele?.middleSection?.value && <p style={ele?.middleSection?.titleStyles}>{ele?.middleSection?.value}</p>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                ele?.middleSection?.items?.map((val: any) => (
                                                    <div className="card-acc-temp-sec">
                                                        <div className="card-acc-temp">
                                                            <div className="left-data">
                                                                {val?.title && <h2>{val?.title} {val?.subTitle && <span style={val?.subTitleStyles && val.subTitleStyles}>{val?.subTitle}</span>}</h2>}
                                                            </div>
                                                            <div className="right-data">
                                                                <p style={val.valueStyles}>{val.value}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        {/* Middle Section End */}

                                        {/* Bottom Section Start */}
                                        <div className="bottom-sec-card">
                                            {
                                                ele.bottomSection?.items?.map((val: any) => (
                                                    <div className="card-acc-temp-sec">
                                                        <div className="card-acc-temp">
                                                            <div className="left-data">
                                                                {val?.title && <h2 style={val.titleStyles}> {val.title}</h2>}
                                                            </div>
                                                            <div className="right-data">
                                                                {val?.value && <p style={val.valueStyles}>{val.value}</p>}
                                                            </div>
                                                        </div>
                                                    </div>

                                                ))
                                            }
                                            {
                                                ele.bottomSection?.buttons?.map((button: any) => (
                                                        <button className="view-more-btn" onClick={() => handleButtonEvent(button)}>{button?.buttonTitle}</button>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                            {
                                msgData.message[0]?.component?.payload?.buttonActions?.map((button: any) => (
                                        <button style={button?.buttonStyle} className="view-more view-more-btn" onClick={() => handleButtonEvent(button)} >{button.title}</button>
                                ))
                            }
                        </div>
                    </section>
                </div>
            </Fragment>
        );
    } else {

    }
}

class cardTemplateDemo extends BaseChatTemplate {
    hostInstance: any = this;
    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(card, msgData, this.hostInstance);
    }
}

export default cardTemplateDemo;