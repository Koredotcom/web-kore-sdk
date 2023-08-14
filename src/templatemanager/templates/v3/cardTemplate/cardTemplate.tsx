import { getHTML } from '../../../base/domManager';
import BaseChatTemplate from '../baseChatTemplate';
import IconsManager from '../../../base/iconsManager';
import './cardTemplate.scss';
import { h, Fragment } from 'preact';

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

    /**
   * Define the tab state and set state active by default
   */



    /**
     * handle previous and current tabindex 
     * @param tabIndex 
     */
    const handleTabChange = (event: any) => {
        const tabHeader = hostInstance.chatEle.querySelectorAll('.tab-item');
        tabHeader.forEach((ele: any, i: any) => {
            if (i == event) {
                ele.classList.add('active');
            } else {
                ele.classList.remove('active');
            }
        })
        const tabInfo = hostInstance.chatEle.querySelectorAll('.tab-pane');
        tabInfo.forEach((ele: any, i: any) => {
            if (i == event) {
                ele.classList.add('active');
            } else {
                ele.classList.remove('active');
            }
        })
    };

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
                                    <img src={ele.topSection.icon} />
                                    <h1>{ele.topSection.title}</h1>
                                    <span style={ele.topSection.details.styles} className="tag-name">{ele.topSection.details.title}</span>


                                </div>
                                {
                                    ele?.middleSection?.items?.map((item: any) => (
                                        <div className="middle-sec-card">
                                            <div class="img-with-text">
                                                <img src={item.icon} />
                                                <p>{item.title}</p>
                                            </div>
                                            <div class="right-title">
                                                <p>{item.value}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                                {
                                    ele.bottomSection.items.map((val: any) => (
                                        <div className="bottom-sec-card small-font-sec">
                                            <div class="img-with-text">
                                                {val.icon && <img src={val.icon} />}
                                                <p style={val.titleStyles}>{val.title}</p>
                                            </div>
                                            <div class="right-title">
                                                {val.icon && <img src={val.icon} />}
                                                <p style={val.titleStyles}>{val.value}</p>
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
                                        <div className="arrow-icon">
                                            <i className="sdkv3-cheveron-right"></i>
                                        </div>
                                    </button>
                                    <div className="accordion_collapse">
                                        <div className="accordion_body">
                                            <div className="tab-data">
                                                {/* middle section tab */}
                                                {item.title.includes("Policy Discounts") &&
                                                    <div>
                                                        <div className="tabs">
                                                            <div className="tab-header tab">
                                                                {item.vehicles.map((tab: any, index: any) => (
                                                                    <div
                                                                        key={index}
                                                                        onClick={() => handleTabChange(index)} id={index}
                                                                        className={index == 0 ? "tab-item active" : "tab-item"}
                                                                    >
                                                                        <h2 className="title">{tab.title} <br /> {tab.subTitle}</h2>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className="tab-content">
                                                                {item.vehicles.map((tab: any, index: any) => (
                                                                    <div
                                                                        key={index}
                                                                        className={index == 0 ? "tab-pane active" : "tab-pane"}
                                                                    >
                                                                        <h2 className="sub-title f-style">{tab.info}</h2>
                                                                        {tab.content.map((tab: any) => (
                                                                            <div className="mt-15 clearfix p-bottom border-bottom">
                                                                                <div className="f-left">
                                                                                    {tab.name && <p className=" f-style-gray f-style">
                                                                                        {tab.name}
                                                                                    </p>}
                                                                                </div>
                                                                                <div className="f-right">
                                                                                    {tab.value && <p className="f-right f-style-gray f-style">{tab.value}</p>}
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>


                                            <div className="card-acc-temp-sec">
                                                {
                                                    item.items.map((val: any) => (
                                                        <div className="card-acc-temp">
                                                            <div className="left-data">
                                                                <h1 style={val.nameStyles}>{val.name}</h1>
                                                                {val.description && <p>{val.description}</p>}
                                                                {val.subTitle && <p className="mt-5">{val.subTitle}</p>}
                                                                {/* {
                                                                     val.itemDescriptions.map((val: any) => (
                                                                        <div>
                                                                             <h1 style={val.type}>{val.type}</h1>
                                                                        </div>
                                                                    ))
                                                                } */}
                                                                {/* {
                                                                     val.description.moreInfo.map((val:any) => (
                                                                        <div>
                                                                             <h1 style={val.type}>{val.name}</h1>
                                                                        </div>
                                                                    ))
                                                                } */}
                                                            </div>
                                                            <div className="right-data">
                                                                <p>{val.value}</p>
                                                                {val.subTitleValue && <p className="mt-5">{val.subTitleValue}</p>}
                                                                {/* {
                                                                     val.description.moreInfo.map((val:any) => (
                                                                        <div>
                                                                            <p>{val.value}</p>
                                                                        </div>
                                                                    ))
                                                                } */}
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
        return (
            <Fragment>
                <div>
                    <section className="card-template-wrapper" aria-label="card template sdk">
                        <div className="card-warpper-info">
                            <h1>{msgData.message[0].component.payload.cards.cardHeading.title}</h1>
                            <p style={msgData.valueStyles}>{msgData.message[0].component.payload.cards}</p>

                            {
                                msgData.message[0].component.payload.cards.cardDescription.map((ele: any) => (
                                    <button className="card-content-sec" onClick={() => handleButtonEvent(ele.actions)}>
                                        <div className="top-sec-card">
                                            <h1>{ele.topSection.title}</h1>
                                            {ele.topSection.details && <span style={ele.topSection.details.styles} className="tag-name">{ele.topSection.details.title}</span>}
                                        </div>
                                        <div className="middle-sec-card">
                                            <h1>{ele.middleSection.title}</h1>
                                        </div>
                                        <div className="bottom-sec-card">
                                            <h2>{ele.bottomSection.title}</h2>
                                            <p>
                                                <time>{ele.bottomSection.details.title}</time>
                                            </p>
                                        </div>
                                    </button>
                                ))
                            }
                        </div>
                    </section>
                </div>
            </Fragment>
        );
    } else if (msgData?.message?.[0]?.component?.payload?.template_type === 'cardTemplate' && msgData?.message?.[0]?.component?.payload?.cardViewType === 'details') {



        return (
            <Fragment>
                <div>
                    <section className="card-template-wrapper-view-more-details" aria-label="card template sdk">
                        {
                            msgData.message[0].component.payload.cards.cardDescription.map((ele: any) => (
                                <div className="card-content-sec">
                                    <div className="top-sec-card">
                                        <img src={ele.topSection.icon} /> 
                                        <h1>{ele.topSection.title}</h1>
                                        <span style={ele.topSection.details.styles} className="tag-name">{ele.topSection.details.title}</span>

                                    </div>
                                    <div className="middle-sec-card"> 
                                    <h1>{ele.topSection.subTitle}</h1>
                                    </div>
                                    {
                                        ele.topSection.items.map((val: any) => (
                                            <div style={val?.borderStyles} className="bottom-sec-card"> 
                                                <h2 style={val.titleStyles}>{val.title}</h2>
                                                <p style={val.valueStyles}>{val.value}</p>
                                            </div>
                                        ))
                                    }
                                    {
                                        ele?.middleSection?.items.map((val: any) => (
                                            <div className="bottom-sec-card">
                                                <h2 style={val.titleStyles}>{val.title}<span style={val.subTitleStyles}>{val.subTitle}</span></h2>                                                <p style={val.valueStyles}>{val.value}</p>
                                            </div>
                                        ))
                                    }
                                    <div className="border-divider"></div>
                                    {
                                        ele.bottomSection.items.map((val: any) => (
                                            <div className="bottom-sec-card">
                                                <h2 style={val.titleStyles}>{val.title}</h2>
                                                <p style={val.valueStyles}>{val.value}</p>
                                            </div>
                                        ))
                                    }
                                    {
                                        msgData.message[0].component.payload.cards.buttonActions.map((button: any) => (
                                            <button className="view-more-btn" onClick={() => handleButtonEvent(button)} >{button.title}</button>
                                        ))
                                    }
                                </div>
                            ))
                        }

                    </section>
                </div>
            </Fragment>
        );
    } else {

    }
}

class cardTemplate extends BaseChatTemplate {
    hostInstance: any = this;
    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(card, msgData, this.hostInstance);
    }
}

export default cardTemplate;