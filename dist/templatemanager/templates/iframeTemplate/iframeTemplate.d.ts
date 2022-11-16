import './iframeTemplate.scss';
declare class IframeTemplate {
    renderMessage(msgData: any): any;
    bindEvents(): void;
    getTemplateString(): string;
}
export default IframeTemplate;
