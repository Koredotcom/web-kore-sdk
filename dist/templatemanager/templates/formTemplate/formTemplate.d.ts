import './formTemplate.scss';
declare class FormTemplate {
    renderMessage(msgData: any): any;
    bindEvents(messageHtml: any): void;
    getTemplateString(): string;
}
export default FormTemplate;
