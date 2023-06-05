import './chatContainer.scss';
import { h } from 'preact';
declare class ChatContainer {
    element: any;
    hostInstance: any;
    welcomeCompponent: any;
    avatarComponentRef: any;
    chatWidgetRef: any;
    chatWidgetHeaderRef: any;
    chatWidgetBodyRef: any;
    chatWidgetComposeBarRef: any;
    actionsBottomSliderRef: any;
    constructor(hostInstance: any);
    FunctionalComponent(props: any): h.JSX.Element;
    getHTML(): any;
}
export default ChatContainer;
