import { getHTML } from '../../base/domManager';
import BaseChatTemplate from '../baseChatTemplate';
import './cardTemplate.scss';
import { h, Fragment } from 'preact';
import KoreHelpers from '../../../utils/helpers';

export function cardSliderExtension(props: any) {
    const sliderData = props.msgData;
    const hostInstance = props.hostInstance;
    const helpers = KoreHelpers.helpers;
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
                {sliderData.sliderTitle && <h1 dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(sliderData.sliderTitle, "bot") }}></h1>}
                <button className="menu-close" role="contentinfo" aria-label="close" onClick={closeMenu}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586"/>
                    </svg>
                </button>
            </div>
            <div className="iner-data-scroll-wraper">
                <section className="card-info-more-details" aria-label="card template sdk">
                    {
                        sliderData.sliderInfo.map((ele: any) => (
                            <div>
                                <div className="top-sec-card">
                                    <h1 dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(ele.topSection.title, "bot") }}></h1>
                                    <span style={ele.topSection.details.styles} className="tag-name" dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(ele.topSection.details.title, "bot") }}></span>
                                </div>
                                {
                                    ele.middleSection.items.map((item: any) => (
                                        <div className="middle-sec-card">
                                            <div class="img-with-text">
                                                {item.icon && <img src={item.icon} />}
                                                <p dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(item.title, "bot") }}></p>
                                            </div>
                                            <div class="right-title">
                                                <p dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(item.value, "bot") }}></p>
                                            </div>
                                        </div>
                                    ))
                                }
                                {
                                    ele.bottomSection.items.map((val: any) => (
                                        <div className="bottom-sec-card small-font-sec">
                                            <div class="img-with-text">
                                                <p style={val.titleStyles} dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(val.title, "bot") }}></p>
                                            </div>
                                            <div class="right-title">
                                                {val.icon && <img src={val.icon} />}
                                                <p style={val.titleStyles} dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(val.value, "bot") }}></p>
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
                                        <p dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(item.title, "bot") }}></p>
                                        <div className="arrow-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                <path d="M6.09961 4L10.0996 8L6.09961 12" stroke="#697586" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </div>
                                    </button>
                                    <div className="accordion_collapse">
                                        <div className="accordion_body">
                                            <div className="card-acc-temp-sec">
                                                {
                                                    item.items.map((val: any) => (
                                                        <div className="card-acc-temp">
                                                            <div className="left-data">
                                                                <h1 style={val.nameStyles} dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(val.name, "bot") }}></h1>
                                                                { val.description  && <p dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(val.description, "bot") }}></p>}
                                                            </div>
                                                            <div className="right-data">
                                                                <p dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(val.value, "bot") }}></p>
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
    const helpers = KoreHelpers.helpers;

    const handleButtonEvent = (e: any) => {
        if (e.type.toLowerCase() == 'postback' || e.type.toLowerCase() == 'text') {
            hostInstance.sendMessage(e.payload || e.value, { renderMsg: e.title });
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
                <div data-cw-msg-id={msgData?.messageId}>
                    <section className="card-template-wrapper" aria-label="card template sdk">
                        <div className="card-warpper-info">
                            <h1 dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(msgData.message[0].component.payload.cards.cardHeading.title, "bot") }}></h1>
                            {
                                msgData.message[0].component.payload.cards.cardDescription.map((ele: any) => (
                                    <button className="card-content-sec" onClick={() => handleButtonEvent(ele.actions)}>
                                        <div className="top-sec-card">
                                            <h1 dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(ele.topSection.title, "bot") }}></h1>
                                            <span style={ele.topSection.details.styles} className="tag-name" dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(ele.topSection.details.title, "bot") }}></span>
                                        </div>
                                        <div className="middle-sec-card">
                                            <p dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(ele.middleSection.title, "bot") }}></p>
                                        </div>
                                        <div className="bottom-sec-card">
                                            <h2 dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(ele.bottomSection.title, "bot") }}></h2>
                                            <p>
                                                <time dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(ele.bottomSection.details.title, "bot") }}></time>
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
                <div data-cw-msg-id={msgData?.messageId}>
                    <section className="card-template-wrapper-view-more-details" aria-label="card template sdk">
                        {
                            msgData.message[0].component.payload.cards.cardDescription.map((ele: any) => (
                                <div className="card-content-sec">
                                    <div className="top-sec-card">
                                        <h1 dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(ele.topSection.title, "bot") }}></h1>
                                        <span style={ele.topSection.details.styles} className="tag-name" dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(ele.topSection.details.title, "bot") }}></span>
                                    </div>
                                    <div className="middle-sec-card">
                                        <p dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(ele.topSection.subTitle, "bot") }}></p>
                                    </div>
                                    {
                                        ele.topSection.items.map((val: any) => (
                                            <div className="bottom-sec-card">
                                                <h2 style={val.titleStyles} dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(val.title, "bot") }}></h2>
                                                <p style={val.valueStyles} dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(val.value, "bot") }}></p>
                                            </div>
                                        ))
                                    }
                                    <div className="border-divider"></div>
                                    {
                                        ele.middleSection.items.map((val: any) => (
                                            <div className="bottom-sec-card">
                                                <h2 style={val.titleStyles}>{val.title}<span style={val.subTitleStyles}>{val.subTitle}</span></h2>
                                                <p style={val.valueStyles} dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(val.value, "bot") }}></p>
                                            </div>
                                        ))
                                    }
                                    <div className="border-divider"></div>
                                    {
                                        ele.bottomSection.items.map((val: any) => (
                                            <div className="bottom-sec-card">
                                                <h2 style={val.titleStyles} dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(val.title, "bot") }}></h2>
                                                <p style={val.valueStyles} dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(val.value, "bot") }}></p>
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
            <div className="regular-card-temp-container" data-cw-msg-id={msgData?.messageId}>
                {msgData?.message?.[0]?.component?.payload.cards.map((card: any, index: any) => (
                    <div className="rugular-card-temp" style={!card.cardDescription ? card.cardContentStyles : ''}>
                        {card && card.cardHeading && <div class="card-r-h-1" style={card.cardHeading.headerStyles}>
                            {card.cardHeading && card.cardHeading.icon && <div class="img-block">
                                <figure>
                                    <img src={card.cardHeading.icon} />
                                </figure>
                            </div>}
                            {card.cardHeading && (card.cardHeading.title || card.cardHeading.description) && <div class="titles-info-block">
                                {card.cardHeading.title && <h1 dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(card.cardHeading.title, "bot") }}></h1>}
                                {card.cardHeading.description && <p dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(card.cardHeading.description, "bot") }}></p>}
                            </div>}
                        </div>}
                        {card && card.cardDescription && <div className="r-body-card" style={card.cardDescription.cardContentStyles}>
                            {card.cardDescription.map((desc: any) => (
                                <div className="row-list-info">
                                    {desc.icon && <figure>
                                        <img src={desc.icon} />
                                    </figure>}
                                    {desc.title && <p dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(desc.title, "bot") }}></p>}
                                </div>
                            ))}
                        </div>}
                        {card.buttons && card.buttons.length > 0 && card.buttons.map((btn: any) => (
                            <button className="btn-action-card" style={btn?.buttonStyles} onClick={() => handleButtonEvent(btn)}>{btn.title}</button>
                        ))}
                    </div>
                ))}
            </div>
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