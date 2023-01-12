declare class BaseTTS {
    hostInstance: any;
    appendPickerHTMLtoChatWindowFooter(pickerHTML: any): void;
    installTextToSpeechTemplate(): void;
    getTextToSpeechTemplateString(): string;
    bindEvents(): void;
}
export default BaseTTS;
