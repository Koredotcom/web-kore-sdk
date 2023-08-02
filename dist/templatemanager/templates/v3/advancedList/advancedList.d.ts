import BaseChatTemplate from '../baseChatTemplate';
import './advancedList.scss';
import { h } from 'preact';
export declare function AdvancedList(props: any): h.JSX.Element | undefined;
declare class TemplateAdvancedList extends BaseChatTemplate {
    hostInstance: any;
    renderMessage(msgData: any): ChildNode;
}
export default TemplateAdvancedList;
