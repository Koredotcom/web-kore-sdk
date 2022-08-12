import './radioOptionPicker.scss';
declare class RadioOptionPickerTemplate {
    renderMessage(msgData: any): void;
    bindEvents(): void;
    initiateRadioOptionPicker(msgData: any): void;
    getTemplateString(): string;
    getRadioOptions: () => any;
    getradioOptionsPickerTemplate(radioOptionConfig: any): any;
}
export default RadioOptionPickerTemplate;
