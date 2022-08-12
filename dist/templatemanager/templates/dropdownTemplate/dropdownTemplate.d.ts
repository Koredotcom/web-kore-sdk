import './dropdownTemplate.scss';
declare class DropdownTemplate {
    renderMessage(msgData: any): any;
    bindEvents(messageHtml: any): void;
    getTemplateString(): string;
}
export default DropdownTemplate;
