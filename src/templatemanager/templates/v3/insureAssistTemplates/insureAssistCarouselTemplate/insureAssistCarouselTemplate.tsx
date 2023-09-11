import BaseChatTemplate from '../../baseChatTemplate';
import './insureAssistCarouselTemplate.scss';
import { h, Fragment } from 'preact';
import stackedCards from './stackedCarousel';
export function Carousel(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;

    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }

    const handleButtonEvent = (e: any) => {
        if (e.type.toLowerCase() == 'postback' || e.type.toLowerCase() == 'text') {
            hostInstance.sendMessage(e.payload || e.value, { renderMsg: e.title });
        } else if (e.type == 'url' || e.type == 'web_url') {
            let link = e.url;
            if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
                link = `http:////${link}`;
            }
            hostInstance.openExternalLink(link);
        }
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'carousel' && msgData?.message?.[0]?.component?.payload?.carousel_type == 'stacked') {
        const stackClass = msgData.messageId + ' stacked stacked-cards';
        const leftCheButton = msgData.messageId + ' left-click';
        const rightCheButton = msgData.messageId + ' right-click';
        const stackedCard = new stackedCards({
            hostInstance: hostInstance,
            selector: '.' + msgData.messageId,
            layout: "slide",
            transformOrigin: "center",
            id: msgData.messageId,
            buttons: true // To show/hide buttons
        });
        setTimeout(() => {
            stackedCard.init();
        }, 300)
        return (
            <div className={stackClass}>
                <button className={leftCheButton}>
                    <i className="sdkv3-cheveron-left"></i>
                </button>
                <ul class="slider">
                    {msgData.message[0].component.payload.elements.map((ele: any) => (
                        <li class="item card-content-sec" style={ele.sliderStyle}>
                            <button className="card-content-sec">
                                <div className="card-acc-temp-sec">
                                    <div className="card-acc-temp">
                                        {ele?.topSection &&
                                            <div className="top-sec-card">
                                                <div className="gap-style-accordian">
                                                    <div className="left-data">
                                                        {ele?.topSection?.title && <h1 style={ele?.topSection?.titleStyle}> <img src={ele?.topSection?.icon} /> {ele?.topSection?.title}</h1>}
                                                    </div>
                                                    <div className="right-data">
                                                        {ele?.topSection?.details?.title && <span style={ele?.topSection?.details?.styles} className="tag-name">{ele?.topSection?.details?.title}</span>}
                                                    </div>
                                                </div>
                                                <div className="gap-style-accordian">
                                                    <div className="left-data">
                                                        {ele?.topSection?.subTitle && <h2 style={ele?.topSection?.subtitleStyle}>{ele?.topSection?.subTitle}</h2>}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        <div className="border-divider"></div>
                                        {
                                            ele?.middleSection &&
                                            <div className="middle-sec-card">
                                                <div className="gap-style-accordian">
                                                    <div className="left-data">
                                                        {ele.middleSection?.title && <h1 style={ele.middleSection.titleStyles}>{ele.middleSection?.title}</h1>}
                                                    </div>
                                                    <div className="right-data">
                                                        {ele.middleSection?.value && <h1>{ele.middleSection?.value}</h1>}
                                                    </div>
                                                </div>
                                                {
                                                    ele?.middleSection?.items?.map((val: any) => (
                                                        <div className="gap-style-accordian">
                                                            <div className="left-data">
                                                                {val?.title && <h2 style={val?.titleStyles && val?.titleStyles}>{val?.title}</h2>}
                                                                <div />
                                                            </div>
                                                            <div className="right-data">
                                                                {val?.value && <p style={val?.titleStyles && val?.valueStyles}>{val?.value}</p>}
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        }
                                        <div className="border-divider"></div>
                                        {
                                            ele?.bottomSection &&
                                            <div className="bottom-sec-card">
                                                {
                                                    ele.bottomSection?.items?.map((val: any) => (
                                                        <div style={val?.spaceTopStyle} className="gap-style-accordian">
                                                            <div className="left-data">
                                                                {val?.title && <h2 style={val?.titleStyles && val?.titleStyles}>{val?.title}</h2>}
                                                                <div />
                                                            </div>
                                                            <div className="right-data">
                                                                {val?.value && <p style={val?.titleStyles && val?.valueStyles}>{val?.value}</p>}
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        }
                                        {
                                            ele?.buttons?.map((button: any) => (
                                                <button style={button.buttonStyle} className="view-more-btn" onClick={() => handleButtonEvent(button)}>{button?.buttonTitle}</button>
                                            ))
                                        }
                                    </div>
                                </div>
                            </button>
                        </li>))}
                </ul>
                <button className={rightCheButton}>
                    <i className="sdkv3-cheveron-right"></i>
                </button>
            </div>
        );
    }
}

class insureAssistCarouselTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(Carousel, msgData, this.hostInstance);
    }

}

export default insureAssistCarouselTemplate;