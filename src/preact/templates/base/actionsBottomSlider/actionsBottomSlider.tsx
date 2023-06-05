

import './actionsBottomSlider.scss';
import {h} from 'preact';
import render from 'preact-render-to-string';
export default class actionsBottomSlider {
    element:any;
    hostInstance: any;
    constructor(hostInstance:any){
        this.hostInstance=hostInstance;
    }
    FunctionalComponent (props:any) {
        const handleClick = () => {
            console.log('Button clicked!');
        };
        return (
            <div className="chat-actions-bottom-wraper" aria-label="chat widget body">
                <div className="actions-contnet-data">
                    <h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1><h1>test</h1>
                </div>
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

