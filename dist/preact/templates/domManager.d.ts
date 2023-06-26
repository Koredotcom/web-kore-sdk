declare class DomManager {
    component: any;
    componentRenderMessage: any;
    hostInstance: any;
    constructor(component: any, host: any);
    renderMessage(msgData: any): HTMLDivElement;
}
export declare function getHTML(comp: any, msgData: any, hostInstance?: any): HTMLDivElement;
export default DomManager;
