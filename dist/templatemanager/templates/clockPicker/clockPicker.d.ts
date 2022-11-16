import './clockPicker.scss';
import '../../../libs/jquery-clockpicker/jquery-clockpicker.css';
declare class ClockPickerTemplate {
    defaultClockerPickerConfig: any;
    clockPickerInputContainer: any;
    renderMessage(msgData: any): any;
    bindEvents(): void;
    initiateClockPicker(): void;
    getTemplateString(): string;
    bindDataToTemplate(msgData: any): void;
}
export default ClockPickerTemplate;
