import '../../../libs/jquery-daterangepicker/daterangepicker.css';
import './datePicker.scss';
declare class DatePickerTemplate {
    defaultDatePickerConfig: any;
    daterangeInput: any;
    renderMessage(msgData: any): any;
    bindEvents(): void;
    initiateDatePicker(msgData: any): void;
    getTemplateString(): string;
    addClickEventCalender(msgData: any): void;
}
export default DatePickerTemplate;
