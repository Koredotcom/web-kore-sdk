declare class TemplateManager {
    hostInstance: any;
    templates: any[];
    chatInitialize: any;
    helpers: any;
    constructor(hostInstance: any);
    installTemplate(template: any): void;
    installDefaultTemplates(): void;
    renderMessage(msgData: any): string;
}
export default TemplateManager;
