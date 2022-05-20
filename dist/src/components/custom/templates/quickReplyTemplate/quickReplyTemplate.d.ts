import './quickReplyTemplate.scss';
declare class QuickReplyTemplate {
    renderMessage(msgData: any): any;
    bindEvents(messageHtml: any): void;
    getTemplateString(): string;
}
export default QuickReplyTemplate;
