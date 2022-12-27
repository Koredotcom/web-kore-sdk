import { BaseSTT } from '../BaseSTT';
export interface AzureSTTConfig {
    key: string;
    region: string;
}
declare class AzureSTT extends BaseSTT {
    name: string;
    private speechConfig;
    private speechRecognizer;
    config: AzureSTTConfig;
    constructor(mainconfig: AzureSTTConfig);
    onHostCreate(): void;
    onInit(): void;
    onRecordButtonClick(): void;
    stop(): void;
    speechToText(): Promise<unknown>;
    setCaretEnd(_this: any): void;
}
export default AzureSTT;
