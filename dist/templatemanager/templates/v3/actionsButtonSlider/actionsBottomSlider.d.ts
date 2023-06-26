import BaseChatTemplate from '../baseChatTemplate';
import './actionsBottomSlider.scss';
import { h } from 'preact';
export declare function ActionsBottomSlider(props: any): h.JSX.Element | undefined;
declare class ActionsBottomSliderTemplate extends BaseChatTemplate {
    hostInstance: any;
    renderMessage(msgData: any): ChildNode;
}
export default ActionsBottomSliderTemplate;
