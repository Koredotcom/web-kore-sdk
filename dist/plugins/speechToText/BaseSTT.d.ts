declare class BaseSTT {
    hostInstance: any;
    appendPickerHTMLtoChatWindowFooter(pickerHTML: any): void;
    installSpeechToTextTemplate(): void;
    getSpeechToTextTemplateString(): string;
    bindEvents(): void;
    bindEventsV3(): void;
}
export default BaseSTT;
