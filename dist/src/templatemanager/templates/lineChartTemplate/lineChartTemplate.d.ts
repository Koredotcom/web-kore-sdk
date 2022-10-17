import './lineChartTemplate.scss';
declare class LineChartTemplate {
    config: any;
    constructor(config?: any);
    renderMessage(msgData: any): any;
    bindEvents(msgData: any): void;
    getTemplateString(): string;
}
export default LineChartTemplate;
