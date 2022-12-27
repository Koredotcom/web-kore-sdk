declare class BaseSTT {
    hostInstance: any;
    appendPickerHTMLtoChatWindowFooter(pickerHTML: any): void;
    installSpeechToTextTemplate(): void;
    getSpeechToTextTemplateString(): string;
    bindEvents(): void;
}
export { BaseSTT };
