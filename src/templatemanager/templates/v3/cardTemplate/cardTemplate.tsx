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
    const openAccordionDetails = (e: any,i: any) =>{
        if( hostInstance.chatEle.querySelectorAll('.accordion_collapse')[i].classList.contains('collapse_data')){
            hostInstance.chatEle.querySelectorAll('.accordion_collapse')[i].classList.remove('collapse_data');
        } else {
            hostInstance.chatEle.querySelectorAll('.accordion_collapse')[i].classList.add('collapse_data');
        }  
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
                                    <h1>{ele.topSection.title}</h1>
                                    <span style={ele.topSection.details.styles} className="tag-name">{ele.topSection.details.title}</span>
                                </div>
                                {
                                    ele.middleSection.items.map((item: any) => (
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
                            ele.moreInfo.map((item: any,i: any) => (
                                <div className="accordion_item" onClick={() => openAccordionDetails(event,i)}>
                                    <button className="accordion_heading" aria-expanded="true">
                                        <p>{item.title}</p>
                                        <div className="arrow-icon">
                                            <i className="sdkv3-cheveron-right"></i>
                                        </div>
                                    </button>
                                    <div className="accordion_collapse">
                                        <div className="accordion_body">
                                            <div className="card-acc-temp-sec">
                                                {
                                                    item.items.map((val: any) => (
                                                        <div className="card-acc-temp">
                                                            <div className="left-data">
                                                                <h1 style={val.nameStyles}>{val.name}</h1>
                                                                { val.description  && <p>{val.description}</p>}
                                                            </div>
                                                            <div className="right-data">
                                                                <p>{val.value}</p>
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
        </div>
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
                            {
                                msgData.message[0].component.payload.cards.cardDescription.map((ele: any) => (
                                    <button className="card-content-sec" onClick={() => handleButtonEvent(ele.actions)}>
                                        <div className="top-sec-card">
                                            <h1>{ele.topSection.title}</h1>
                                            <span style={ele.topSection.details.styles} className="tag-name">{ele.topSection.details.title}</span>
                                        </div>
                                        <div className="middle-sec-card">
                                            <p>{ele.middleSection.title}</p>
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
                                        <h1>{ele.topSection.title}</h1>
                                        <span style={ele.topSection.details.styles} className="tag-name">{ele.topSection.details.title}</span>
                                    </div>
                                    <div className="middle-sec-card">
                                        <p>{ele.topSection.subTitle}</p>
                                    </div>
                                    {
                                        ele.topSection.items.map((val: any) => (
                                            <div className="bottom-sec-card">
                                                <h2 style={val.titleStyles}>{val.title}</h2>
                                                <p style={val.valueStyles}>{val.value}</p>
                                            </div>
                                        ))
                                    }
                                    <div className="border-divider"></div>
                                    {
                                        ele.middleSection.items.map((val: any) => (
                                            <div className="bottom-sec-card">
                                                <h2 style={val.titleStyles}>{val.title}<span style={val.subTitleStyles}>{val.subTitle}</span></h2>
                                                <p style={val.valueStyles}>{val.value}</p>
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
    } else if(msgData?.message?.[0]?.component?.payload?.template_type === 'cardTemplate') {
        return (
            <div>Card Regular template</div>
        )
    }
}

class cardTemplate extends BaseChatTemplate {
    hostInstance: any = this;
    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(card, msgData, this.hostInstance);
    }
}

export default cardTemplate;