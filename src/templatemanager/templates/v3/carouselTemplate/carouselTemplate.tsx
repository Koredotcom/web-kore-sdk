

import BaseChatTemplate from '../baseChatTemplate';
import './carouselTemplate.scss';
import { h, Fragment } from 'preact';
import stackedCards from './stackedCarousel'
export function Carousel(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    const handleButtonEvent = (e: any) => {
        if (e.type.toLowerCase() == 'postback' || e.type.toLowerCase() == 'text') {
            // hostInstance.sendMessage(e.payload || e.value, { renderMsg: e.title });
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
                    <li class="item">
                    </li>
                    <li class="item">
                        <button className="card-content-sec">
                            <div className="top-sec-card">
                                <h1>1043693</h1>
                                <span className="tag-name">Active</span>
                            </div>
                            <div className="middle-sec-card">
                                <p>Auto</p>
                            </div>
                            <div className="bottom-sec-card">
                                <h2>Premium amount</h2>
                                <p>
                                    <time>$588</time>
                                </p>
                            </div>
                            <button className="view-more-btn">View more</button>
                        </button>
                    </li>
                    <li class="item">
                        <button className="card-content-sec">
                            <div className="top-sec-card">
                                <h1>1043693</h1>
                                <span className="tag-name">Active</span>
                            </div>
                            <div className="middle-sec-card">
                                <p>Auto</p>
                            </div>
                            <div className="bottom-sec-card">
                                <h2>Premium amount</h2>
                                <p>
                                    <time>$588</time>
                                </p>
                            </div>
                            <button className="view-more-btn">View more</button>
                        </button>
                    </li>
                    <li class="item">
                        <button className="card-content-sec">
                            <div className="top-sec-card">
                                <h1>1043693</h1>
                                <span className="tag-name">Active</span>
                            </div>
                            <div className="middle-sec-card">
                                <p>Auto</p>
                            </div>
                            <div className="bottom-sec-card">
                                <h2>Premium amount</h2>
                                <p>
                                    <time>$588</time>
                                </p>
                            </div>
                            <button className="view-more-btn">View more</button>
                        </button>
                    </li>
                </ul>
                <button className={rightCheButton}>
                    <i className="sdkv3-cheveron-right"></i>
                </button>
            </div>
        );
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'carousel') {
        setTimeout(() => {
            const btnsParentDiv: any = hostInstance.chatEle.querySelector(`[data-id='${msgData.messageId}']`);
            const leftScrollBtn = hostInstance.chatEle.querySelector(`[data-button-left='${msgData.messageId}']`);
            const rightScrollBtn = hostInstance.chatEle.querySelector(`[data-button-right='${msgData.messageId}']`);
            if (btnsParentDiv && btnsParentDiv.hasChildNodes()) {
                if (leftScrollBtn) {
                    if (btnsParentDiv.scrollLeft > 0) {
                        leftScrollBtn.classList.remove('hide');
                    } else {
                        leftScrollBtn.classList.add('hide');
                    }
                }
                if (rightScrollBtn) {
                    if (btnsParentDiv.offsetWidth < btnsParentDiv.scrollWidth) {
                        rightScrollBtn.classList.remove('hide');
                    } else {
                        rightScrollBtn.classList.add('hide');
                    }
                }
            }

            // leftScrollBtn.addEventListener('click', () => {
            //     const btnsParentDivWidth = btnsParentDiv.scrollLeft;
            //     const qButtons = btnsParentDiv.querySelectorAll('.list-carousel-item');
            //     let curWidth = 0;
            //     if (qButtons.length > 0) {
            //         qButtons.forEach((ele: any) => {
            //             curWidth = curWidth + ele.offsetWidth + 10;
            //             if (curWidth > btnsParentDivWidth) {
            //                 btnsParentDiv.scrollTo({
            //                     left: btnsParentDiv.offsetHeight - ele.offsetHeight - 50,
            //                     behavior: 'smooth'
            //                 });
            //                 rightScrollBtn.classList.remove('hide');;
            //                 if (btnsParentDiv.scrollLeft <= 0) {
            //                     leftScrollBtn.classList.add('hide');;
            //                 }
            //             }

            //         })
            //     }
            // })
            // rightScrollBtn.addEventListener('click', () => {
            //     const btnsParentDivWidth = btnsParentDiv.offsetWidth;
            //     const qButtons = btnsParentDiv.querySelectorAll('.list-carousel-item');
            //     let curWidth = 0;
            //     if (qButtons.length > 0) {
            //         qButtons.forEach((ele: any) => {
            //             curWidth = curWidth + ele.offsetWidth + 10;
            //             if (curWidth > btnsParentDivWidth) {
            //                 btnsParentDiv.scrollTo({
            //                     left: btnsParentDiv.scrollLeft + ele.offsetWidth + 20,
            //                     behavior: 'smooth'
            //                 });
            //                 leftScrollBtn.classList.remove('hide');;
            //                 if (btnsParentDiv.scrollLeft + btnsParentDivWidth + 10 >= btnsParentDiv.scrollWidth) {
            //                     rightScrollBtn.classList.add('hide');
            //                 }
            //             }

            //         })
            //     }
            // })
        }, 50);
        if (msgData?.message?.[0]?.component?.payload?.template_type == 'carousel') {
            if (msgData.message[0].component?.payload.elements[0].items.length > 1) {
                return (
                    <div>
                        {
                            msgData.message[0].component?.payload.elements[0].items.map((ele: any) => (
                                <div>
                                    <div className="list-carousel-item card-content-sec">
                                        <div className="img-block">
                                            <div className="top-sec-card">
                                                {ele.topSection.icon && <img src={ele.topSection.icon} />}
                                                {ele.topSection.title && <h1>{ele.topSection.title}</h1>}<br />
                                                {ele.topSection.details && <span style={ele.topSection.details.styles} className="tag-name">{ele.topSection.details.title}</span>}
                                            </div>
                                            <div className="middle-section">
                                                <div className="card-acc-temp-sec">
                                                    <div className="card-acc-temp">
                                                        <div className="left-data">
                                                            {ele.middleSection.title && <h2>{ele.middleSection.title}</h2>}
                                                            {ele.middleSection.title && <h1>{ele.middleSection.subTitle}</h1>}

                                                        </div>
                                                        <div className="right-data">
                                                            {ele.middleSection.value && <h3>{ele.middleSection.value}</h3>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                {
                                                    ele.bottomSection.items.map((ele: any) => (
                                                        <div>
                                                            {/* <div className="bottom-sec-card text-right"> */}
                                                            <div className="card-acc-temp-sec">
                                                                <div className="card-acc-temp">
                                                                    <div className="left-data">
                                                                        {ele.title && <p style={ele.titleStyles}>{ele.title}</p>}
                                                                    </div>
                                                                    <div className="right-data">
                                                                        {ele.value && <p style={ele.titleStyles}>{ele.value}</p>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        // </div>
                                                    ))
                                                }
                                                <div className="button-block">
                                                    <button className="kr-button-secondary" onClick={() => handleButtonEvent("test")}>Pay more</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))
                        }
                        {/* <div className="list-carousel-item card-content-sec">
                            <div className="img-block">
                                <div className="top-sec-card">
                                    <img src={msgData.message[0].component?.payload.elements[0].items[0].topSection.icon} />
                                    <h1>{msgData.message[0].component?.payload.elements[0].items[0].topSection.title}</h1>
                                    {msgData.message[0].component?.payload.elements[0].items[0].topSection.details && <span style={msgData.message[0].component?.payload.elements[0].items[0].topSection.details.styles} className="tag-name">{msgData.message[0].component?.payload.elements[0].items[0].topSection.details.title}</span>}
                                </div>
                                {
                                    msgData.message[0].component?.payload.elements[0].items[0].topSection.items.map((ele: any) => (
                                        <div>
                                            <div style={ele.titleStyles} className="middle-sec-card">
                                                <h1>{ele.title}</h1>
                                                <h2>{ele.value}</h2>
                                            </div>

                                        </div>
                                    ))
                                }
                            </div>
                            {
                                msgData.message[0].component?.payload.elements[0].items[0].bottomSection.items.map((ele: any) => (
                                    <div className="bottom-sec-card text-right">
                                        <h1>{ele.title}</h1>
                                        <h2 style={ele.titleStyles}>{ele.value}</h2>
                                    </div>
                                ))}
                            <div className="button-block">
                                <button className="kr-button-secondary" onClick={() => handleButtonEvent("test")}>Pay more</button>
                            </div>
                        </div> */}
                    </div>
                )
            }
            else {
                return (
                    <div className="list-template-carousel-wrapper" id={msgData.messageId}>
                        <button className="carousel-left-click" data-button-left={msgData.messageId}>
                            <i className="sdkv3-cheveron-left"></i>
                        </button>
                        <div className="list-carousel single-item" data-id={msgData.messageId}>
                            {
                                <div className="list-carousel-item card-content-sec">
                                    <div className="img-block">
                                        <div className="top-sec-card">
                                            <img src={msgData.message[0].component?.payload.elements[0].items[0].topSection.icon} />
                                            <h1>{msgData.message[0].component?.payload.elements[0].items[0].topSection.title}</h1>
                                            {msgData.message[0].component?.payload.elements[0].items[0].topSection.details && <span style={msgData.message[0].component?.payload.elements[0].items[0].topSection.details.styles} className="tag-name">{msgData.message[0].component?.payload.elements[0].items[0].topSection.details.title}</span>}
                                        </div>
                                        {
                                            msgData.message[0].component?.payload.elements[0].items[0].topSection.items.map((ele: any) => (
                                                <div>
                                                    <div style={ele.titleStyles} className="middle-sec-card">
                                                        <h1>{ele.title}</h1>
                                                        <h2>{ele.value}</h2>
                                                    </div>

                                                </div>
                                            ))
                                        }
                                    </div>
                                    {
                                        msgData.message[0].component?.payload.elements[0].items[0].bottomSection.items.map((ele: any) => (
                                            <div className="bottom-sec-card text-right">
                                                <h1>{ele.title}</h1>
                                                <h2 style={ele.titleStyles}>{ele.value}</h2>
                                            </div>
                                        ))}
                                    <div className="button-block">
                                        <button className="kr-button-secondary" onClick={() => handleButtonEvent("test")}>Pay more</button>
                                    </div>
                                </div>
                            }
                        </div>
                        <button className="carousel-right-click" data-button-right={msgData.messageId}>
                            <i className="sdkv3-cheveron-right"></i>
                        </button>
                    </div>
                )
            }

        }
        // else if (msgData?.message?.[0]?.component?.payload?.template_type != 'carousel') {

        // }

    }
}

class CarouselTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(Carousel, msgData, this.hostInstance);
    }

}

export default CarouselTemplate;

