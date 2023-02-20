import './quickReplyTemplate.scss';
declare class QuickReplyTemplate {
    template_type: string;
    config: {
        hideOptionsOnClick: boolean;
    };
    renderMessage(msgData: any): any;
    bindEvents(messageHtml: any): void;
    getTemplateString(): string;
}
export default QuickReplyTemplate;
