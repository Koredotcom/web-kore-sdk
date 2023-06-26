import { h } from 'preact';
import BaseChatTemplate from '../baseChatTemplate';
export declare function Message(props: any): h.JSX.Element | undefined;
declare class MessageTemplate extends BaseChatTemplate {
    hostInstance: any;
    renderMessage(msgData: any): ChildNode;
}
export default MessageTemplate;
