import BaseChatTemplate from '../baseChatTemplate';
import './datePicker.scss';
import { h } from 'preact';
export declare function DatePicker(props: any): h.JSX.Element | undefined;
declare class TemplateDatePicker extends BaseChatTemplate {
    hostInstance: any;
    renderMessage(msgData: any): ChildNode;
}
export default TemplateDatePicker;
