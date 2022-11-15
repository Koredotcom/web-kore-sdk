import './pieChartTemplate.scss';
declare class PieChartTemplate {
    config: any;
    constructor(config?: any);
    renderMessage(msgData: any): any;
    bindEvents(msgData: any): void;
    getTemplateString(): string;
}
export default PieChartTemplate;
