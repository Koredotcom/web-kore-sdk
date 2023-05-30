

import './welcomeScreeContainer.scss';
import {h} from 'preact';
import render from 'preact-render-to-string';
import avatarComponent from '../avatarComponent/avatarComponent';
export default class welcomeScreeContainer {
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
            <div className="welcome-chat-section" aria-label="welcome message screen">
                <header className="welcome-header" aria-label="welcome header">
                    <div className="welcome-header-bg">
                        <div className="logo-img">
                            <figure>
                                <img src="/images/standardcharteredlogo.svg" alt="log-img" />
                            </figure>
                        </div>
                        <h1>Hello</h1>
                        <h2>Welcome to Kore.ai <br />Bot Support</h2>
                        <p>Our Community is ready to help you to join our best platform</p>
                    </div>
                    <div className="bg-logo">
                        <figure>
                            <img src="/images/sc-small.svg" alt="log-img" />
                        </figure>
                    </div>
                </header>
                <div className="welcome-interactions" aria-label="welcome message screen">
                    
                </div>
                <footer>
                    <div className="powerdby-info">
                        <p>Powered by</p>
                        <figure>
                            <img src="/images/korelogo.svg" alt="kore-img" />
                        </figure>
                    </div>
                </footer>
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

