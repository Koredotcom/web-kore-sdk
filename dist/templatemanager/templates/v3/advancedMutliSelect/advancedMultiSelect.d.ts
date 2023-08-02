import BaseChatTemplate from '../baseChatTemplate';
import './advancedMultiSelect.scss';
import { h } from 'preact';
export declare function AdvancedMultiSelect(props: any): h.JSX.Element | undefined;
declare class TemplateAdvancedMultiSelect extends BaseChatTemplate {
    hostInstance: any;
    renderMessage(msgData: any): ChildNode;
}
export default TemplateAdvancedMultiSelect;
