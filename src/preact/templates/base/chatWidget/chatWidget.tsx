

import './chatWidget.scss';
import {h} from 'preact';
import render from 'preact-render-to-string';
import chatWidgetHeader from '../chatWidgetHeader/chatWidgetHeader';
export default class chatWidget {
    element:any;
    hostInstance: any;
    chatWidgetHeaderRef:any;
    constructor(hostInstance:any){
        this.hostInstance=hostInstance;
        this.chatWidgetHeaderRef = new chatWidgetHeader(this.hostInstance).FunctionalComponent;
    }
    FunctionalComponent (props:any) {
        return (
            <div className='chat-widgetwrapper-main-container'>
                <this.chatWidgetHeaderRef />
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






// import './welcomeScreeContainer.scss';
// import {h} from 'preact';
// import render from 'preact-render-to-string';

// import ChatContainer from '../chatContainer/chatContainer';

// export default class welcomeScreeContainer {
//     element:any;
//     hostInstance: any;
//     ChatComponent:any;
//     constructor(hostInstance:any){
//         this.hostInstance=hostInstance;
//         this.ChatComponent=new ChatContainer(this.hostInstance).FunctionalComponent;
//     }
//     FunctionalComponent (props:any) {
//         const handleClick = () => {
//             console.log('Button clicked!');
//         };
//         return (
//             <div className='test'>
//             <h1>Welcome Screen</h1>
//             <button onClick={handleClick}>click</button>
//             <p>some thing</p>
//             <div><this.ChatComponent/></div>
//           </div>
//         );
//     } 
//     getHTML() {
//         let me=this;
//         me.element=document.createElement("div"); 
//         me.element.className = "chat-container";
//         me.element=render(this.FunctionalComponent({hostInsance:this.hostInstance}),me.element );
//         return me.element;
//     }    
// }

