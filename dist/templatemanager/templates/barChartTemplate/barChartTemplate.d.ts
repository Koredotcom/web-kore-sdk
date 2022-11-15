import './barChartTemplate.scss';
declare class BarChartTemplate {
    config: any;
    constructor(config?: any);
    renderMessage(msgData: any): any;
    bindEvents(msgData: any): void;
    getTemplateString(): string;
}
export default BarChartTemplate;
