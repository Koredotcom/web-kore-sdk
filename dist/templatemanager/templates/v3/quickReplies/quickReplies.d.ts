import BaseChatTemplate from '../baseChatTemplate';
import './quickReplies.scss';
import { h } from 'preact';
export declare function QuickReply(props: any): h.JSX.Element;
export declare function QuickReplies(props: any): h.JSX.Element | undefined;
declare class QuickRepliesTemplate extends BaseChatTemplate {
    hostInstance: any;
    renderMessage(msgData: any): ChildNode;
}
export default QuickRepliesTemplate;
