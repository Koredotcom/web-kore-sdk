import './templateAttachment.scss';
declare class TemplateAttachment {
    renderMessage(msgData: any): any;
    bindEvents(messageHtml: any): void;
    getTemplateString(): string;
}
export default TemplateAttachment;
