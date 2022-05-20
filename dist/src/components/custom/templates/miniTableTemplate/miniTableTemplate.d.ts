import './miniTableTemplate.scss';
declare class MiniTableChartTemplate {
    renderMessage(msgData: any): any;
    bindEvents(): void;
    getTemplateString(template_type: string): string | undefined;
}
export default MiniTableChartTemplate;
