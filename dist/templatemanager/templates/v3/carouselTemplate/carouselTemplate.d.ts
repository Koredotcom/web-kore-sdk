import BaseChatTemplate from '../baseChatTemplate';
import './carouselTemplate.scss';
import { h } from 'preact';
export declare function Carousel(props: any): h.JSX.Element | undefined;
declare class CarouselTemplate extends BaseChatTemplate {
    hostInstance: any;
    renderMessage(msgData: any): ChildNode;
}
export default CarouselTemplate;
