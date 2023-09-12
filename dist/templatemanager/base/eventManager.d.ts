declare class EventManager {
    eventMapper: any[];
    hostInstance: any;
    constructor(host: any);
    addEventListener(querySelector: any, event: any, cb: any): void;
    removeEventListener(querySelector: any, event: any): void;
}
export default EventManager;
