import { BaseSTT } from "../BaseSTT";
export interface GoogleSTTConfig {
    key: string;
    languageCode: string;
}
declare class GoogleSTT extends BaseSTT {
    name: string;
    gapiLoaded: boolean;
    isRecordingStarted: boolean;
    intervalKey: any;
    config: GoogleSTTConfig;
    constructor(mainconfig: GoogleSTTConfig);
    onHostCreate(): void;
    onInit(): void;
    /**
 * Callback used to update sample UI when transcription completes.
 *
 * @param r The data from the API call containing an array of transcription
 *          results.
 */
    setCaretEnd(_this: any): void;
    uiCallback(r: any): void;
    stop(): void;
    /**
 * Sends a file blob to the speech API endpoint.
 *
 * @param blob the Blob to send.
 * @param encoding the encoding type (e.g. 'flac' or 'LINEAR16').
 * @param rate the encoding rate, ideally 16000.
 */
    sendBlobToSpeech(blob: any, encoding: any, rate: any): void;
    /**
     * Sends post data to the speech API endpoint.
     *
     * @param bytes The raw data to send.
     * @param encoding The encoding for the data transcribe.
     * @param rate The rate that the data is encoded at.
     * @param callback A function to send result data to.
     */
    sendBytesToSpeech(bytes: any, encoding: any, rate: any, callback: any): void;
    startGoogleSpeech(rec: any): void;
    successAudioCallback(e: any): void;
    micEnable(): void;
    initializeSTTSpeechRecognition(): void;
    startSTTRecognization(): void;
    onRecordButtonClick(): void;
}
export { GoogleSTT };
