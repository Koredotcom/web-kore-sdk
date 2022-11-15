import './listViewTemplate.scss';
declare class ListViewTemplate {
    renderMessage(msgData: any): any;
    bindEvents(messageHtml: any): void;
    listViewTabs(): void;
    valueClick(_self: any, actionObj: any): void;
    getTemplateString(type: any): string | undefined;
}
export default ListViewTemplate;
