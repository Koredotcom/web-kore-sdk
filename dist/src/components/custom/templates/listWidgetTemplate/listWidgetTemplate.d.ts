import './listWidgetTemplate.scss';
declare class ListWidgetTemplate {
    renderMessage(msgData: any): any;
    bindEvents(ele: any, templateType: any, bindingData: any): void;
    getColumnWidth(width: any): any;
    valueClick(_self: any, actionObj: any): void;
    getTemplateString(): string;
}
export default ListWidgetTemplate;
