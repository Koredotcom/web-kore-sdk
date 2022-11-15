import './cardTemplate.scss';
declare class CardTemplate {
    renderMessage(msgData: any): any;
    bindEvents(ele: any, msgData: any): void;
    getTemplateString(): string;
}
export default CardTemplate;
