import './customTemplate.css';
import '../../../libs/purejscarousel.css';
declare class customTemplate {
    hostInstance: any;
    templates: any[];
    chatInitialize: any;
    helpers: any;
    constructor(hostInstance: any);
    installTemplate(template: any): void;
    installDefaultTemplates(): void;
    /**
 * purpose: Function to render bot message for a given custom template
 * input  : Bot Message
 * output : Custom template HTML
 */
    renderMessage(msgData: any): string;
    /**
    * purpose: Function to get custom template HTML
    * input  : Template type
    * output : Custom template HTML
    *
    */
    getChatTemplate(tempType: any): string;
    bindEvents(messageHtml: any): void;
}
export default customTemplate;
