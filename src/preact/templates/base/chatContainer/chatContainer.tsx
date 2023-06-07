

import './chatContainer.scss';
import {h} from 'preact';
import render from 'preact-render-to-string';
import welcomeScreeContainer from '../welcomeScreeContainer/welcomeScreeContainer';
import avatarComponent from '../avatarComponent/avatarComponent';
import chatWidget from '../chatWidget/chatWidget';
import chatWidgetHeader from '../chatWidgetHeader/chatWidgetHeader';
import chatWidgetBody from '../chatWidgetBody/chatWidgetBody';
import chatWidgetComposeBar from '../chatWidgetComposeBar/chatWidgetComposeBar';
import actionsBottomSlider from '../actionsBottomSlider/actionsBottomSlider';
class ChatContainer {
    element:any;
    hostInstance: any;
    welcomeCompponent: any;
    avatarComponentRef :any;
    chatWidgetRef: any;
    chatWidgetHeaderRef :any;
    chatWidgetBodyRef:any;
    chatWidgetComposeBarRef:any;
    actionsBottomSliderRef:any;
    constructor(hostInstance:any){
        this.hostInstance = hostInstance;
        this.welcomeCompponent = new welcomeScreeContainer(this.hostInstance).FunctionalComponent;
        this.avatarComponentRef = new avatarComponent(this.hostInstance).FunctionalComponent;
        this.chatWidgetRef = new chatWidget(this.hostInstance).FunctionalComponent;
        this.chatWidgetHeaderRef = new chatWidgetHeader(this.hostInstance).FunctionalComponent;
        this.chatWidgetBodyRef = new chatWidgetBody(this.hostInstance).FunctionalComponent;
        this.chatWidgetComposeBarRef = new chatWidgetComposeBar(this.hostInstance).FunctionalComponent;
        this.actionsBottomSliderRef = new actionsBottomSlider(this.hostInstance).FunctionalComponent;
    }
    FunctionalComponent (props:any) {
        const handleClick = () => {
            console.log('Button clicked!');
        };
        return (
            <div className='chat-window-main-section' aria-label='chat-window-section'>
                {/* <this.chatWidgetRef />
                <this.welcomeCompponent /> */}
                {/* <this.welcomeCompponent /> */}
                <this.avatarComponentRef />
                {/* <div className='chat-widgetwrapper-main-container'>
                    <this.chatWidgetHeaderRef />
                    <this.chatWidgetBodyRef />
                    <this.chatWidgetComposeBarRef />
                </div> */}
                {/* <this.actionsBottomSliderRef /> */}
            </div>
        );
    } 
    getHTML() {
        let me=this;
        me.element=document.createElement("div"); 
        me.element.className = "chat-container";
        me.element=render(this.FunctionalComponent({hostInsance:this.hostInstance}),me.element );
        return me.element;
    }    
}

export default ChatContainer;
