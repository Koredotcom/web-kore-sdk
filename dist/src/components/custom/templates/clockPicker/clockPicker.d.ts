import './clockPicker.scss';
import '../../../../../UI/libs/jquery-clockpicker.css';
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
