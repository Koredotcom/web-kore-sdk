declare class EventEmiter {
    parentEmitter: any;
    runByEvent: any;
    runInAnyEvent: any;
    constructor(parentEmitter: any);
    addNode(event: any, cb: any, once: any): any;
    on(event: any, cb: any, once: any): () => void;
    once(event: any, cb: any): () => void;
    emit(event: string | number, data: any): void;
}
export default EventEmiter;
