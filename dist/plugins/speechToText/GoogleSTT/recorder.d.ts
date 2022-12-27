declare class Recorder {
    config: any;
    context: any;
    node: any;
    worker: any;
    recording: boolean;
    currCallback: any;
    configure: any;
    constructor(source: any, cfg: any);
    init(source: any): void;
    record(): void;
    stop(): void;
    clear(): void;
    getBuffer(cb: any): void;
    exportWAV(cb: any, type: any): void;
    exportRAW(cb: any, type: any): void;
    export16kMono(cb: any, type: any): void;
    exportSpeex(cb: any, type: any): void;
    forceDownload(blob: any, filename: any): void;
}
export { Recorder };
