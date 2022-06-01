import './listTemplate.scss';
declare class ListTemplate {
    renderMessage(msgData: any): any;
    bindEvents(messageHtml: any): void;
    getTemplateString(): string;
}
export default ListTemplate;
