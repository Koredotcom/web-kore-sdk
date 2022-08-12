import './carouselTemplate.scss';
declare class CarouselTemplate {
    renderMessage(msgData: any): any;
    bindEvents(messageHtml: any): void;
    getTemplateString(): string;
}
export default CarouselTemplate;
