declare class TemplateManager {
    hostInstance: any;
    templates: any[];
    chatInitialize: any;
    helpers: any;
    constructor(hostInstance: any);
    installTemplate(template: any): void;
    installDefaultTemplates(): void;
    installDefaultTemplatesV3(): void;
    renderMessage(msgData: any): string;
}
export default TemplateManager;
