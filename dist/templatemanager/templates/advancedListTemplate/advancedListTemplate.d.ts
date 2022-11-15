import './advancedListTemplate.scss';
declare class AdvancedListTemplate {
    renderMessage(msgData: any): any;
    bindEvents(ele: any, msgData: any): void;
    getTemplateString(): string;
}
export default AdvancedListTemplate;
