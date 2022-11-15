import './tableListTemplate.scss';
declare class TableListTemplate {
    renderMessage(msgData: any): any;
    bindEvents(messageHtml: any): void;
    valueClick(_self: any, actionObj: any): void;
    getTemplateString(): string;
}
export default TableListTemplate;
