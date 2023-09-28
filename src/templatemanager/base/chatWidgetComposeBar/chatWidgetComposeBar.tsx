

import { getHTML } from '../domManager';
import IconsManager from '../iconsManager';
import './chatWidgetComposeBar.scss';
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Menu } from '../../base/menu/menu';

export function ChatWidgetComposeBar(props: any) {
    const hostInstance = props.hostInstance;
    const iconHelper = new IconsManager();
    const [brandingInfo, updateBrandingInfo] = useState(hostInstance.config.branding);
    hostInstance.on('onBrandingUpdate', function (event: any) {
        updateBrandingInfo({...event.brandingData})
    });

    const inputTypeObj: any = {
        keypad: 'compose-bar-wrapper',
        voice: 'compose-bar-wrapper if-voice-compose'
    }

    const handleVoice =  (event: any) => {
        hostInstance.chatEle.querySelector('.compose-voice-text').style.display = 'block';
        brandingInfo.footer.layout = 'voice';
        updateBrandingInfo({...brandingInfo})
    }

    const handleKeyboard = () => {
        hostInstance.chatEle.querySelector('.compose-voice-text').style.display = 'none';
        hostInstance.chatEle.querySelector('.voice-speak-msg-info').style.display = 'none';
        hostInstance.chatEle.querySelector('.compose-voice-text-end').style.display = 'none';
        hostInstance.chatEle.querySelector('.compose-voice-text-recording').style.display = 'none';
        brandingInfo.footer.layout = 'keypad';
        updateBrandingInfo({...brandingInfo})
    }

    const handleHamberger = () => {
        hostInstance.bottomSliderAction('', getHTML(Menu, '', hostInstance)) 
    }

    useEffect(() => {
        hostInstance.eventManager.removeEventListener('.send-btn', 'click');
        hostInstance.eventManager.addEventListener('.send-btn', 'click', (event: any) => {
            const inputEle = hostInstance.chatEle.querySelector('.typing-text-area');
            if (inputEle.value.trim() === '') {
                return;
            }
            event.preventDefault();
            hostInstance.sendMessageToBot(inputEle.value);
            inputEle.value = '';
            hostInstance.chatEle.querySelector('.send-btn').classList.remove('show');
        })
    });

    return (
        <div className="chat-widget-composebar" aria-label="chat widget compose">
            <div className="voice-speak-msg-info" style="display:none">
                <button className="remove-voice-text" type="button" aria-label="Close voice text">
                    <svg width="10" height="10" viewBox="0 0 20 20" fill="none">
                        <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586"></path>
                    </svg>
                </button>
                <div className="voice-msg-bubble"></div>
            </div>
            <div className="attachment-wrapper-data hide-attachment">
                <div className="select-file-block">
                    <button className="inputfile-btn inputfile-btn-media" type="button" aria-label="Media">
                        <span>Media</span>
                        <input type="file" id="captureMediaAttachment"/>
                    </button>
                    <button className="inputfile-btn inputfile-btn-file" type="button" aria-label="File">
                        <span>File</span>
                        <input type="file" id="captureFileAttachment"/>
                    </button>
                </div>
                <div className="uploaded-attachment-data">
                    {/* <div className="uploaded-item">
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
                                <img src="/images/close-large.svg" alt="remove" />
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
                                <img src="/images/close-large.svg" alt="remove" />
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
                                <img src="/images/close-large.svg" alt="remove" />
                            </figure>
                        </button>
                    </div> */}
                </div>
            </div>
            <div className={inputTypeObj[brandingInfo.footer.layout]} aria-label="compose footer">
                { brandingInfo.footer.buttons.menu.show && <button className="action-btn hamberger-menu" type="button" aria-label="Action Hamberger menu" onClick={handleHamberger}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M2.5 3.125C2.15482 3.125 1.875 3.40482 1.875 3.75C1.875 4.09518 2.15482 4.375 2.5 4.375H17.5C17.8452 4.375 18.125 4.09518 18.125 3.75C18.125 3.40482 17.8452 3.125 17.5 3.125H2.5ZM2.5 9.375C2.15482 9.375 1.875 9.65482 1.875 10C1.875 10.3452 2.15482 10.625 2.5 10.625H17.5C17.8452 10.625 18.125 10.3452 18.125 10C18.125 9.65482 17.8452 9.375 17.5 9.375H2.5ZM2.5 15.625C2.15482 15.625 1.875 15.9048 1.875 16.25C1.875 16.5952 2.15482 16.875 2.5 16.875H17.5C17.8452 16.875 18.125 16.5952 18.125 16.25C18.125 15.9048 17.8452 15.625 17.5 15.625H2.5Z" fill="#697586"/>
                    </svg>
                </button> }
                { brandingInfo.footer.buttons.attachment.show && <button className="action-btn attachmentUpload" type="button" aria-label="Attachments">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 2.5C12.7733 2.5 15 4.79988 15 7.61355V13.341C15 13.7049 14.6924 13.9999 14.313 13.9999C13.9547 13.9999 13.6605 13.7368 13.6289 13.401L13.6261 13.341V7.61355C13.6261 5.5067 11.9908 3.81769 10 3.81769C8.00922 3.81769 6.37393 5.5067 6.37393 7.61355V13.9774C6.37393 15.1951 7.40322 16.1823 8.67291 16.1823C9.94261 16.1823 10.9719 15.1951 10.9719 13.9774V7.61355C10.9719 7.09876 10.5368 6.68143 10 6.68143C9.4856 6.68143 9.06454 7.0647 9.03035 7.54973L9.0281 7.61355V13.341C9.0281 13.7049 8.72054 13.9999 8.34114 13.9999C7.98282 13.9999 7.68857 13.7368 7.65698 13.401L7.65418 13.341V7.61355C7.65418 6.37101 8.70444 5.36374 10 5.36374C11.2956 5.36374 12.3458 6.37101 12.3458 7.61355L12.3458 13.9774C12.3453 15.9224 10.7011 17.5 8.67291 17.5C6.64442 17.5 5 15.9229 5 13.9774V7.61355C5 4.79988 7.22674 2.5 10 2.5Z" fill="#697586"/>
                    </svg>
                </button> }
                <div className="compose-text-area">
                    { brandingInfo.footer.buttons.emoji.show &&  <button className="emoji-btn" type="button" aria-label="Emojis">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M5.96154 8.29627C5.96154 7.65625 6.47987 7.14243 7.11538 7.14243C7.7509 7.14243 8.26923 7.65625 8.26923 8.29627C8.26923 8.93179 7.7509 9.45012 7.11538 9.45012C6.47987 9.45012 5.96154 8.93179 5.96154 8.29627Z" fill="#697586"/>
                            <path d="M11.7308 8.29627C11.7308 7.65625 12.2491 7.14243 12.8846 7.14243C13.5201 7.14243 14.0385 7.65625 14.0385 8.29627C14.0385 8.93179 13.5201 9.45012 12.8846 9.45012C12.2491 9.45012 11.7308 8.93179 11.7308 8.29627Z" fill="#697586"/>
                            <path d="M6.52563 12.561C6.41013 12.4503 6.34275 12.2963 6.33794 12.1375C6.32831 11.8824 6.4775 11.6466 6.71331 11.5504C6.94912 11.4493 7.21862 11.5023 7.39669 11.6899C8.06562 12.3541 8.98481 12.7679 10.0051 12.7679C11.0253 12.7679 11.9445 12.3541 12.6134 11.6899C12.854 11.4493 13.2439 11.4493 13.4845 11.6899C13.7251 11.9306 13.7251 12.3204 13.4845 12.561C12.5942 13.4465 11.3622 13.9999 10.0051 13.9999C8.64793 13.9999 7.41594 13.4465 6.52563 12.561Z" fill="#697586"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 10C2.5 5.86689 5.86689 2.5 10 2.5C14.1331 2.5 17.5 5.86689 17.5 10C17.5 14.1331 14.1331 17.5 10 17.5C5.86689 17.5 2.5 14.1331 2.5 10ZM16.3462 10C16.3462 6.48888 13.5111 3.65385 10 3.65385C6.48888 3.65385 3.65385 6.48888 3.65385 10C3.65385 13.5111 6.48888 16.3462 10 16.3462C13.5111 16.3462 16.3462 13.5111 16.3462 10Z" fill="#697586"/>
                        </svg>  
                    </button> }
                    <textarea className="typing-text-area disableComposeBar" id="typing-text-area" placeholder={brandingInfo.footer.compose_bar.placeholder}></textarea>
                </div>
                <div className="compose-voice-text">
                    <button className="voice-compose-btn" type="button" aria-label="Voice Compose Button">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 1.875C8.28613 1.875 6.875 3.28613 6.875 5V10C6.875 11.7139 8.28613 13.125 10 13.125C11.7139 13.125 13.125 11.7139 13.125 10V5C13.125 3.28613 11.7139 1.875 10 1.875ZM10 3.125C11.0352 3.125 11.875 3.96484 11.875 5V10C11.875 11.0352 11.0352 11.875 10 11.875C8.96484 11.875 8.125 11.0352 8.125 10V5C8.125 3.96484 8.96484 3.125 10 3.125ZM5 9.375C4.65482 9.375 4.375 9.65482 4.375 10C4.375 12.876 6.57715 15.2441 9.375 15.5615V16.875H7.5C7.15482 16.875 6.875 17.1548 6.875 17.5C6.875 17.8452 7.15482 18.125 7.5 18.125H12.5C12.8452 18.125 13.125 17.8452 13.125 17.5C13.125 17.1548 12.8452 16.875 12.5 16.875H10.625V15.5615C13.4229 15.2441 15.625 12.876 15.625 10C15.625 9.65482 15.3452 9.375 15 9.375C14.6548 9.375 14.375 9.65482 14.375 10C14.375 12.4072 12.4072 14.375 10 14.375C7.59277 14.375 5.625 12.4072 5.625 10C5.625 9.65482 5.34518 9.375 5 9.375Z" fill="white"/>
                    </svg>
                    </button>
                    <p className="speak-info">Tap microphone to speak</p>
                </div>
                <div className="compose-voice-text-recording zoomIn">
                    <button className="voice-compose-btn-recording" type="button" aria-label="Voice recording">
                        <svg width="23" height="16" viewBox="0 0 23 16" fill="none">
                            <rect x="10.5137" width="1.97143" height="16" rx="0.985713" fill="white"/>
                            <rect x="15.7715" y="2.66699" width="1.97143" height="10.6667" rx="0.985713" fill="white"/>
                            <rect x="21.0293" y="5.33301" width="1.97143" height="5.33333" rx="0.985713" fill="white"/>
                            <rect x="5.25781" y="2.66699" width="1.97143" height="10.6667" rx="0.985713" fill="white"/>
                            <rect y="5.33301" width="1.97143" height="5.33333" rx="0.985713" fill="white"/>
                        </svg>
                    </button>
                    <p className="speak-info">Listening... Tap to end</p>
                    <button className="cancel-sepak" type="button" aria-label="Cancel voice recording">Cancel</button>
                </div>
                <div className="compose-voice-text-end">
                    <button className="voice-compose-btn-end" type="button" aria-label="Send button">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M1.33854 5.7792C0.917738 5.93325 0.880121 6.51382 1.2769 6.72207L6.52164 9.47856L9.27579 14.7222C9.48411 15.1188 10.064 15.0803 10.2181 14.6597L14.9674 1.69532C15.1186 1.28244 14.7177 0.881423 14.3048 1.03258L1.33854 5.7792ZM2.78926 6.35112L12.4626 2.80707L6.80699 8.46271L2.78926 6.35112ZM7.53749 9.1932L13.1931 3.53756L9.65193 13.2138L7.53749 9.1932Z" fill="white"/>
                        </svg>
                    </button>
                    <p className="speak-info">Tap to send</p>
                </div>
                { brandingInfo.footer.layout === 'voice' && <button className="key-board" type="button" aria-label="Keyboard" onClick={handleKeyboard}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M1.875 3.75C0.844726 3.75 0 4.59473 0 5.625V13.125C0 14.1553 0.844726 15 1.875 15H16.875C17.9053 15 18.75 14.1553 18.75 13.125V5.625C18.75 4.59473 17.9053 3.75 16.875 3.75H1.875ZM1.875 5H16.875C17.2266 5 17.5 5.27344 17.5 5.625V13.125C17.5 13.4766 17.2266 13.75 16.875 13.75H1.875C1.52344 13.75 1.25 13.4766 1.25 13.125V5.625C1.25 5.27344 1.52344 5 1.875 5ZM3.125 6.25C2.77982 6.25 2.5 6.52982 2.5 6.875C2.5 7.22018 2.77982 7.5 3.125 7.5C3.47018 7.5 3.75 7.22018 3.75 6.875C3.75 6.52982 3.47018 6.25 3.125 6.25ZM5.625 6.25C5.27982 6.25 5 6.52982 5 6.875C5 7.22018 5.27982 7.5 5.625 7.5C5.97018 7.5 6.25 7.22018 6.25 6.875C6.25 6.52982 5.97018 6.25 5.625 6.25ZM8.125 6.25C7.77982 6.25 7.5 6.52982 7.5 6.875C7.5 7.22018 7.77982 7.5 8.125 7.5C8.47018 7.5 8.75 7.22018 8.75 6.875C8.75 6.52982 8.47018 6.25 8.125 6.25ZM10.625 6.25C10.2798 6.25 10 6.52982 10 6.875C10 7.22018 10.2798 7.5 10.625 7.5C10.9702 7.5 11.25 7.22018 11.25 6.875C11.25 6.52982 10.9702 6.25 10.625 6.25ZM13.125 6.25C12.7798 6.25 12.5 6.52982 12.5 6.875C12.5 7.22018 12.7798 7.5 13.125 7.5C13.4702 7.5 13.75 7.22018 13.75 6.875C13.75 6.52982 13.4702 6.25 13.125 6.25ZM15.625 6.25C15.2798 6.25 15 6.52982 15 6.875C15 7.22018 15.2798 7.5 15.625 7.5C15.9702 7.5 16.25 7.22018 16.25 6.875C16.25 6.52982 15.9702 6.25 15.625 6.25ZM3.125 8.75C2.77982 8.75 2.5 9.02982 2.5 9.375C2.5 9.72018 2.77982 10 3.125 10C3.47018 10 3.75 9.72018 3.75 9.375C3.75 9.02982 3.47018 8.75 3.125 8.75ZM5.625 8.75C5.27982 8.75 5 9.02982 5 9.375C5 9.72018 5.27982 10 5.625 10C5.97018 10 6.25 9.72018 6.25 9.375C6.25 9.02982 5.97018 8.75 5.625 8.75ZM8.125 8.75C7.77982 8.75 7.5 9.02982 7.5 9.375C7.5 9.72018 7.77982 10 8.125 10C8.47018 10 8.75 9.72018 8.75 9.375C8.75 9.02982 8.47018 8.75 8.125 8.75ZM10.625 8.75C10.2798 8.75 10 9.02982 10 9.375C10 9.72018 10.2798 10 10.625 10C10.9702 10 11.25 9.72018 11.25 9.375C11.25 9.02982 10.9702 8.75 10.625 8.75ZM13.125 8.75C12.7798 8.75 12.5 9.02982 12.5 9.375C12.5 9.72018 12.7798 10 13.125 10C13.4702 10 13.75 9.72018 13.75 9.375C13.75 9.02982 13.4702 8.75 13.125 8.75ZM15.625 8.75C15.2798 8.75 15 9.02982 15 9.375C15 9.72018 15.2798 10 15.625 10C15.9702 10 16.25 9.72018 16.25 9.375C16.25 9.02982 15.9702 8.75 15.625 8.75ZM6.875 11.25C6.52982 11.25 6.25 11.5298 6.25 11.875C6.25 12.2202 6.52982 12.5 6.875 12.5H11.875C12.2202 12.5 12.5 12.2202 12.5 11.875C12.5 11.5298 12.2202 11.25 11.875 11.25H6.875ZM3.12744 11.2598C2.78092 11.2598 2.5 11.5407 2.5 11.8872C2.5 12.2337 2.78092 12.5146 3.12744 12.5146H4.37256C4.71909 12.5146 5 12.2337 5 11.8872C5 11.5407 4.71909 11.2598 4.37256 11.2598H3.12744ZM14.397 11.2598C14.0504 11.2598 13.7695 11.5407 13.7695 11.8872C13.7695 12.2337 14.0504 12.5146 14.397 12.5146H15.6421C15.9886 12.5146 16.2695 12.2337 16.2695 11.8872C16.2695 11.5407 15.9886 11.2598 15.6421 11.2598H14.397Z" fill="#697586"/>
                    </svg>
                </button> }
                { brandingInfo.footer.layout === 'keypad' && brandingInfo.footer.buttons.microphone.show && <button className="voice-btn" type="button" aria-label="Voice" onClick={handleVoice}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 1.875C8.28613 1.875 6.875 3.28613 6.875 5V10C6.875 11.7139 8.28613 13.125 10 13.125C11.7139 13.125 13.125 11.7139 13.125 10V5C13.125 3.28613 11.7139 1.875 10 1.875ZM10 3.125C11.0352 3.125 11.875 3.96484 11.875 5V10C11.875 11.0352 11.0352 11.875 10 11.875C8.96484 11.875 8.125 11.0352 8.125 10V5C8.125 3.96484 8.96484 3.125 10 3.125ZM5 9.375C4.65482 9.375 4.375 9.65482 4.375 10C4.375 12.876 6.57715 15.2441 9.375 15.5615V16.875H7.5C7.15482 16.875 6.875 17.1548 6.875 17.5C6.875 17.8452 7.15482 18.125 7.5 18.125H12.5C12.8452 18.125 13.125 17.8452 13.125 17.5C13.125 17.1548 12.8452 16.875 12.5 16.875H10.625V15.5615C13.4229 15.2441 15.625 12.876 15.625 10C15.625 9.65482 15.3452 9.375 15 9.375C14.6548 9.375 14.375 9.65482 14.375 10C14.375 12.4072 12.4072 14.375 10 14.375C7.59277 14.375 5.625 12.4072 5.625 10C5.625 9.65482 5.34518 9.375 5 9.375Z" fill="#697586"/>
                    </svg>
                </button> }
                { brandingInfo.footer.layout === 'keypad' && <button className="send-btn" type="button" aria-label="Send">
                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                        <path d="M1.67123 5.0568C1.30302 5.19159 1.27011 5.69959 1.61729 5.88181L6.20644 8.29374L8.61632 12.8819C8.79859 13.2289 9.30601 13.1953 9.44085 12.8272L13.5965 1.4834C13.7288 1.12213 13.378 0.771245 13.0167 0.903509L1.67123 5.0568ZM2.9406 5.55723L11.4048 2.45618L6.45612 7.40487L2.9406 5.55723ZM7.0953 8.04405L12.044 3.09537L8.94544 11.5621L7.0953 8.04405Z" fill="white"/>
                    </svg>
                </button> }
            </div>


            <div className="typing-indicator-wraper">
                <div className="bot-icon">
                    <figure>
                        <img src=""></img>
                    </figure>
                </div>
                <p>Typing</p>
                <div class="dot-flashing"></div>
            </div>
        </div>
    );
} 
