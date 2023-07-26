

import BaseChatTemplate from '../baseChatTemplate';
import './carouselTemplate.scss';
import { h, Fragment } from 'preact';
import stackedCards from './stackedCarousel'
export function Carousel(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;

    const stackClass = msgData.messageId + ' stacked stacked-cards';
    const leftCheButton = msgData.messageId + ' left-click';
    const rightCheButton = msgData.messageId + ' right-click';
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type == 'carousel') {
        const stackedCard = new stackedCards({
            hostInstance: hostInstance,
            selector: '.' + msgData.messageId,
            layout: "slide",
            transformOrigin: "center",
            id: msgData.messageId,
            buttons: false // To show/hide buttons
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
}

class CarouselTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(Carousel, msgData, this.hostInstance);
    }

}

export default CarouselTemplate;

