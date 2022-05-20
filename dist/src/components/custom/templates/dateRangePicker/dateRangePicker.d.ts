import '../../../../../UI/libs/daterangepicker.css';
import './dateRangePicker.scss';
declare class DateRangePickerTemplate {
    defaultDateRangePickerConfig: any;
    daterangeInput: any;
    renderMessage(msgData: any): any;
    bindEvents(): void;
    initiateDatePicker(msgData: any): void;
    getTemplateString(): string;
    bindDataToTemplate(msgData: any): void;
}
export default DateRangePickerTemplate;
