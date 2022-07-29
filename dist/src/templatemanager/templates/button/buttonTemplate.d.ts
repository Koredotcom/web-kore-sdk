import './buttonTemplate.scss';
declare class ButtonTemplate {
    renderMessage(msgData: any): any;
    bindEvents(messageHtml: any): void;
    getTemplateString(): string;
}
export default ButtonTemplate;
