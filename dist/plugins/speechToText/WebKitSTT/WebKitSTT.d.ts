import { BaseSTT } from "../BaseSTT";
export interface WebKitSTTConfig {
    lang: string;
}
/**
 *  WekKitSTT Plugin class
 *
 * @decorator Class
 */
declare class WebKitSTT extends BaseSTT {
    name: string;
    config: WebKitSTTConfig;
    recognition: any;
    final_transcript: string | undefined;
    recognizing: any;
    two_line: RegExp;
    one_line: RegExp;
    prevRange: any;
    hostInstance: any;
    constructor(mainconfig: WebKitSTTConfig);
    onHostCreate(): void;
    onInit(): void;
    onRecordButtonClick(): void;
    initializeWebKitSpeechRecognition(): void;
    startWebKitRecognization(): void;
    isChrome(): boolean;
    linebreak(s: string): string;
    capitalize(s: string): string;
    setCaretEnd(_this: any): void;
    stop(): void;
}
export default WebKitSTT;
