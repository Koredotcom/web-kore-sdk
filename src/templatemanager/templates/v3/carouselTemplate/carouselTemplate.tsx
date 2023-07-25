

import BaseChatTemplate from '../baseChatTemplate';
import './carouselTemplate.scss';
import { h, Fragment } from 'preact';
import stackedCards from './stackedCarousel'
export function Carousel(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    var stackedCard = new stackedCards({
        selector: '.' + msgData.messageId,
        layout: "fanOut",
        transformOrigin: "center",
        id: msgData.messageId
    });
    setTimeout(() => {
        stackedCard.init();
    }, 300)
    const stackClass = msgData.messageId + ' stacked stacked-cards'
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    if (msgData?.message?.[0]?.component?.payload?.template_type == 'carousel') {
        return (

            <div className={stackClass}>
                <ul class="slider">
                    <li class="item"><h2>Headline</h2></li>
                    <li class="item"><h2>Headline</h2></li>
                    <li class="item"><h2>Headline</h2></li>
                    <li class="item"><h2>Headline</h2></li>
                    <li class="item"><h2>Headline</h2></li>
                    <li class="item"><h2>Headline</h2></li>
                </ul>
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

