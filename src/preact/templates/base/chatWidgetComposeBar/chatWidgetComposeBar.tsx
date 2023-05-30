

import './chatWidgetComposeBar.scss';
import {h} from 'preact';
import render from 'preact-render-to-string';
export default class chatWidgetComposeBar {
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
            <div className="chat-widget-composebar" aria-label="chat widget compose">
                <div className="voice-speak-msg-info" style="display:none">
                    <div className="voice-msg-bubble">I would like to know my account balance</div>
                </div>
                <div className="attachment-wrapper-data"  style="display:none">
                    <div className="select-file-block">
                        <button className="inputfile-btn">
                            <span>Media</span>
                            <input type="file" />
                        </button>
                        <button className="inputfile-btn">
                            <span>Media</span>
                            <input type="file" />
                        </button>
                    </div>
                    <div className="uploaded-attachment-data">
                        <div className="uploaded-item">
                            <div className="img-block"></div>
                            <div className="content-data">
                                <h1>Document name.png</h1>
                                <div className="progress-percentage">
                                    <div></div>
                                </div>
                                <p>525KB • 30% uploaded</p>
                            </div>
                            <button className="delete-upload">
                                <figure>
                                    <img src="/images/close-large.svg" alt="remove"/>
                                </figure>
                            </button>
                        </div>
                        <div className="uploaded-item">
                            <div className="img-block"></div>
                            <div className="content-data">
                                <h1>Document name.png</h1>
                                <div className="progress-percentage">
                                    <div></div>
                                </div>
                                <p>525KB • 30% uploaded</p>
                            </div>
                            <button className="delete-upload">
                                <figure>
                                    <img src="/images/close-large.svg" alt="remove"/>
                                </figure>
                            </button>
                        </div>
                        <div className="uploaded-item">
                            <div className="img-block"></div>
                            <div className="content-data">
                                <h1>Document name.png</h1>
                                <div className="progress-percentage">
                                    <div></div>
                                </div>
                                <p>525KB • 30% uploaded</p>
                            </div>
                            <button className="delete-upload">
                                <figure>
                                    <img src="/images/close-large.svg" alt="remove"/>
                                </figure>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="compose-bar-wrapper" aria-label="compose footer">
                    <button className="action-btn">
                        <figure>
                            <img src="/images/hamberger.svg" alt="image" />
                        </figure>
                    </button>
                    <button className="action-btn">
                        <figure>
                            <img src="/images/attachment.svg" alt="image" />
                        </figure>
                    </button>
                    <div className="compose-text-area">
                        <button className="emoji-btn">
                            <figure>
                                <img src="/images/emoji.svg" alt="image" />
                            </figure>
                        </button>
                        <textarea className="typing-text-area" placeholder="Type a message"></textarea>
                    </div>
                    <div className="compose-voice-text">
                        <button className="voice-compose-btn">
                            <figure>
                                <img src="/images/send.svg" alt="image" />
                            </figure>
                        </button>
                        <p className="speak-info">Tap microphone to speak</p>
                    </div>
                    <button className="voice-btn">
                        <figure>
                            <img src="/images/voice.svg" alt="image" />
                        </figure>
                    </button>
                    {/* <button className="send-btn">
                        <figure>
                            <img src="/images/send.svg" alt="image" />
                        </figure>
                    </button> */}
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

