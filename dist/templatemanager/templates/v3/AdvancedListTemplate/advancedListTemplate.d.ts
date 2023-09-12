import BaseChatTemplate from '../baseChatTemplate';
import './advancedListTemplate.scss';
import { h } from 'preact';
export declare function AdvancedListExtension(props: any): h.JSX.Element;
export declare function AdvancedList(props: any): h.JSX.Element | undefined;
declare class TestTemplate extends BaseChatTemplate {
    hostInstance: any;
    renderMessage(msgData: any): ChildNode;
}
export default TestTemplate;
