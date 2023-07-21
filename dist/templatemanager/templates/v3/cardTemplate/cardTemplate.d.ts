import BaseChatTemplate from '../baseChatTemplate';
import './cardTemplate.scss';
import { h } from 'preact';
export declare function card(props: any): h.JSX.Element | undefined;
declare class cardTemplate extends BaseChatTemplate {
    hostInstance: any;
    renderMessage(msgData: any): ChildNode;
}
export default cardTemplate;
