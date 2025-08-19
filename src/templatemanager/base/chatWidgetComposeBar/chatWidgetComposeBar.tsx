

import { getHTML } from '../domManager';
import IconsManager from '../iconsManager';
import './chatWidgetComposeBar.scss';
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Menu } from '../../base/menu/menu';
import { EmojiPicker } from '../emojiPicker/emojiPicker';

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

    const checkForFileUploadPlugin = () => {
        if (hostInstance.plugins && !hostInstance.plugins['KoreMultiFileUploaderPlugin']) {
            alert('Please install File Uploader Plugin...');
        }
    }

    const checkForSTTPlugin = () => {
        // if (hostInstance.plugins && !hostInstance.plugins['WebKitSTT']) {
        //     alert('Please install Speech To Text Plugin...');
        // }
    }

    const checkForTTSPlugin = () => {
        // if (hostInstance.plugins && !hostInstance.plugins['BroswerTTS']) {
        //     alert('Please install Text To Speech Plugin...');
        // }
    }

    const showEmojiPicker = () => {
        if (hostInstance.chatEle.querySelector('.emoji-picker-section').style.display != 'none') {
            hostInstance.chatEle.querySelector('.emoji-picker-section').style.display = 'none';
        } else {
            if (hostInstance.chatEle?.querySelector('.attachment-wrapper-data') && !hostInstance.chatEle?.querySelector('.attachment-wrapper-data')?.classList.contains('hide-attachment')) {
                hostInstance.chatEle?.querySelector('.attachment-wrapper-data')?.classList.add('hide-attachment');
            }
            hostInstance.chatEle.querySelector('.emoji-picker-section').style.display = 'block';
        }
    }

    useEffect(() => {
        hostInstance.eventManager.removeEventListener('.send-btn', 'click');
        hostInstance.eventManager.addEventListener('.send-btn', 'click', (event: any) => {
            const inputEle = hostInstance.chatEle.querySelector('.typing-text-area');
            if (inputEle.value.trim() === '' && !hostInstance?.attachmentData?.length) {
                return;
            }
            let chatWindowEvent = {stopFurtherExecution: false};
            hostInstance.emit('onSubmit', {
                event: event,
                chatWindowEvent: chatWindowEvent
            });
            if (chatWindowEvent.stopFurtherExecution) {
                return false;
            }
            event.preventDefault();
            hostInstance.sendMessageToBot(inputEle.value);
            inputEle.value = '';
            // hostInstance.chatEle.querySelector('.send-btn').classList.remove('show');
            if (hostInstance.chatEle.querySelectorAll('.quick-replies') && hostInstance.chatEle.querySelectorAll('.quick-replies').length > 0) {
                hostInstance.chatEle.querySelector('.quick-replies').remove();
              }
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
                <div className="voice-msg-bubble" aria-label="entered msg"></div>
            </div>
            <div className={`emoji-picker-section ${!brandingInfo.footer.buttons.speaker.show && brandingInfo.footer.buttons.emoji.show ? 'emoji-only' : ''}`} style="display: none"><EmojiPicker {...{hostInstance: hostInstance}}/></div>
            <div className="attachment-wrapper-data hide-attachment">
                <div className="select-file-block">
                    <button className="inputfile-btn inputfile-btn-media" type="button" aria-label="Media">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.625 2.5C2.59473 2.5 1.75 3.34473 1.75 4.375V15.625C1.75 16.6553 2.59473 17.5 3.625 17.5H17.375C18.4053 17.5 19.25 16.6553 19.25 15.625V4.375C19.25 3.34473 18.4053 2.5 17.375 2.5H3.625ZM3.625 3.75H17.375C17.7266 3.75 18 4.02344 18 4.375V13.457L13.995 9.22878C13.7934 9.01595 13.4528 9.02141 13.2581 9.2406L11.1787 11.582L7.78897 8.00763C7.58732 7.795 7.24688 7.80057 7.0523 8.01969L3 12.583V4.375C3 4.02344 3.27344 3.75 3.625 3.75ZM14.25 5C13.5615 5 13 5.56152 13 6.25C13 6.93848 13.5615 7.5 14.25 7.5C14.9385 7.5 15.5 6.93848 15.5 6.25C15.5 5.56152 14.9385 5 14.25 5ZM7.44336 9.45801L13.8838 16.25H3.625C3.27344 16.25 3 15.9766 3 15.625V14.4678L7.44336 9.45801ZM13.6445 10.6836L18 15.2734V15.625C18 15.9766 17.7266 16.25 17.375 16.25H15.6025L12.043 12.4902L13.6445 10.6836Z" fill="#4B4EDE"/>
                        </svg>
                        <span>{hostInstance.config.botMessages.media}</span>
                    </button>
                    <input type="file" id="captureMediaAttachment" accept="audio/*,video/*,image/*" style={{display: 'none'}} />
                    <button className="inputfile-btn inputfile-btn-file" type="button" aria-label="File">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
                            <path d="M6.125 2.5C5.09473 2.5 4.25 3.34473 4.25 4.375V15.625C4.25 16.6553 5.09473 17.5 6.125 17.5H14.875C15.9053 17.5 16.75 16.6553 16.75 15.625V6.87509C16.75 6.70933 16.6842 6.55036 16.5669 6.43315L12.8168 2.68306C12.6996 2.56585 12.5407 2.5 12.3749 2.5H6.125ZM6.125 3.75H11.75V6.25C11.75 6.94036 12.3096 7.5 13 7.5H15.5V15.625C15.5 15.9766 15.2266 16.25 14.875 16.25H6.125C5.77344 16.25 5.5 15.9766 5.5 15.625V4.375C5.5 4.02344 5.77344 3.75 6.125 3.75ZM13 4.63379L14.6162 6.25H13V4.63379ZM8.625 10C8.27982 10 8 10.2798 8 10.625C8 10.9702 8.27982 11.25 8.625 11.25H12.375C12.7202 11.25 13 10.9702 13 10.625C13 10.2798 12.7202 10 12.375 10H8.625ZM8.625 12.5C8.27982 12.5 8 12.7798 8 13.125C8 13.4702 8.27982 13.75 8.625 13.75H11.125C11.4702 13.75 11.75 13.4702 11.75 13.125C11.75 12.7798 11.4702 12.5 11.125 12.5H8.625Z" fill="#4B4EDE"/>
                        </svg>
                        <span>{hostInstance.config.botMessages.file}</span>
                    </button>
                    <input type="file" id="captureFileAttachment" accept=".bmp, .csv, .txt, .json, .pdf, .doc, .dot, .docx, .docm,
                        .dotx, .dotm, .xls, .xlt, .xlm, .xlsx, .xlsm, .xltx, .xltm, .xlsb, .xla, .xlam, .xll, .xlw, .ppt, .pot, .pps, .pptx, .pptm, .potx, .potm, .ppam,
                        .ppsx, .ppsm, .sldx, .sldm, .zip, .rar., .tar, .wpd, .wps, .rtf, .msg, .dat, .sdf, .vcf, .xml, .3ds, .3dm, .max, .obj, .ai, .eps, .ps, .svg, .indd, .pct, .accdb,
                        .db, .dbf, .mdb, .pdb, .sql, .apk, .cgi, .cfm, .csr, .css, .htm, .html, .jsp, .php, .xhtml, .rss, .fnt, .fon, .otf, .ttf, .cab, .cur, .dll, .dmp, .drv, .7z, .cbr,
                        .deb, .gz, .pkg, .rpm, .zipx, .bak, .avi, .m4v, .mpg, .rm, .swf, .vob, .wmv, .3gp2, .3g2, .asf, .asx, .srt, .wma, .mid, .aif, .iff, .m3u, .mpa, .ra, .aiff, .tiff" style={{display: 'none'}}/>
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
                { brandingInfo.footer.buttons.menu.show && <button className="action-btn hamberger-menu" type="button" title={hostInstance.config.botMessages.menu} onClick={handleHamberger}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M2.5 3.125C2.15482 3.125 1.875 3.40482 1.875 3.75C1.875 4.09518 2.15482 4.375 2.5 4.375H17.5C17.8452 4.375 18.125 4.09518 18.125 3.75C18.125 3.40482 17.8452 3.125 17.5 3.125H2.5ZM2.5 9.375C2.15482 9.375 1.875 9.65482 1.875 10C1.875 10.3452 2.15482 10.625 2.5 10.625H17.5C17.8452 10.625 18.125 10.3452 18.125 10C18.125 9.65482 17.8452 9.375 17.5 9.375H2.5ZM2.5 15.625C2.15482 15.625 1.875 15.9048 1.875 16.25C1.875 16.5952 2.15482 16.875 2.5 16.875H17.5C17.8452 16.875 18.125 16.5952 18.125 16.25C18.125 15.9048 17.8452 15.625 17.5 15.625H2.5Z" fill="#697586"/>
                    </svg>
                </button> }
                { brandingInfo.footer.buttons.attachment.show && <button className="action-btn attachmentUpload" type="button" title={hostInstance.config.botMessages.attachments} onClick={() => checkForFileUploadPlugin()}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 2.5C12.7733 2.5 15 4.79988 15 7.61355V13.341C15 13.7049 14.6924 13.9999 14.313 13.9999C13.9547 13.9999 13.6605 13.7368 13.6289 13.401L13.6261 13.341V7.61355C13.6261 5.5067 11.9908 3.81769 10 3.81769C8.00922 3.81769 6.37393 5.5067 6.37393 7.61355V13.9774C6.37393 15.1951 7.40322 16.1823 8.67291 16.1823C9.94261 16.1823 10.9719 15.1951 10.9719 13.9774V7.61355C10.9719 7.09876 10.5368 6.68143 10 6.68143C9.4856 6.68143 9.06454 7.0647 9.03035 7.54973L9.0281 7.61355V13.341C9.0281 13.7049 8.72054 13.9999 8.34114 13.9999C7.98282 13.9999 7.68857 13.7368 7.65698 13.401L7.65418 13.341V7.61355C7.65418 6.37101 8.70444 5.36374 10 5.36374C11.2956 5.36374 12.3458 6.37101 12.3458 7.61355L12.3458 13.9774C12.3453 15.9224 10.7011 17.5 8.67291 17.5C6.64442 17.5 5 15.9229 5 13.9774V7.61355C5 4.79988 7.22674 2.5 10 2.5Z" fill="#697586"/>
                    </svg>
                </button> }
                { brandingInfo.footer.buttons.click_to_call.show && <button className="action-btn connect-to-agent" id="kore-click-to-call" type="button" title={hostInstance.config.botMessages.clickToCall}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <g clip-path="url(#clip0_20289_60803)">
                            <path d="M9.36648 3.99998C10.0176 4.12702 10.6161 4.44548 11.0852 4.9146C11.5543 5.38372 11.8728 5.98216 11.9998 6.63331M9.36648 1.33331C10.7193 1.4836 11.9809 2.08943 12.944 3.05132C13.9071 4.01321 14.5145 5.27399 14.6665 6.62665M6.8178 9.24203C6.01675 8.44097 5.38422 7.53521 4.92022 6.5688C4.88031 6.48567 4.86036 6.44411 4.84503 6.39152C4.79054 6.20461 4.82968 5.97511 4.94302 5.81682C4.97491 5.77228 5.01302 5.73417 5.08923 5.65797C5.3223 5.4249 5.43883 5.30836 5.51502 5.19118C5.80235 4.74925 5.80235 4.17953 5.51502 3.7376C5.43883 3.62042 5.3223 3.50388 5.08923 3.27081L4.95931 3.1409C4.60502 2.7866 4.42787 2.60945 4.23762 2.51322C3.85924 2.32184 3.4124 2.32184 3.03402 2.51322C2.84377 2.60945 2.66662 2.7866 2.31233 3.1409L2.20724 3.24599C1.85416 3.59907 1.67762 3.77561 1.54278 4.01563C1.39317 4.28197 1.2856 4.69563 1.2865 5.00111C1.28732 5.27641 1.34073 5.46456 1.44753 5.84085C2.02151 7.86312 3.10449 9.77136 4.69648 11.3633C6.28847 12.9553 8.19671 14.0383 10.219 14.6123C10.5953 14.7191 10.7834 14.7725 11.0587 14.7733C11.3642 14.7742 11.7779 14.6667 12.0442 14.517C12.2842 14.3822 12.4608 14.2057 12.8138 13.8526L12.9189 13.7475C13.2732 13.3932 13.4504 13.2161 13.5466 13.0258C13.738 12.6474 13.738 12.2006 13.5466 11.8222C13.4504 11.632 13.2732 11.4548 12.9189 11.1005L12.789 10.9706C12.5559 10.7375 12.4394 10.621 12.3222 10.5448C11.8803 10.2575 11.3106 10.2575 10.8687 10.5448C10.7515 10.621 10.6349 10.7375 10.4019 10.9706C10.3257 11.0468 10.2875 11.0849 10.243 11.1168C10.0847 11.2301 9.85521 11.2693 9.66831 11.2148C9.61572 11.1995 9.57415 11.1795 9.49103 11.1396C8.52461 10.6756 7.61885 10.0431 6.8178 9.24203Z" stroke="#101828" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_20289_60803">
                                <rect width="16" height="16" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </button> }
                <div className={`compose-text-area ${brandingInfo.footer.buttons.speaker.show && brandingInfo.footer.buttons.emoji.show ? 'emoji-btn-true' : 'only-emoji-btn'}`}>
                    {brandingInfo.footer.buttons.speaker.show && <button className="speaker-btn speaker-btn-mute show" type="button" title={hostInstance.config.botMessages.speakerOn} onClick={() => checkForTTSPlugin()}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 5.41415L7.17574 8.23841C7.16402 8.25013 7.15202 8.2622 7.13972 8.27456C7.00579 8.40921 6.83714 8.57876 6.63079 8.70521C6.45185 8.81487 6.25676 8.89568 6.05268 8.94467C5.81735 9.00117 5.57821 9.00053 5.3883 9.00002C5.37086 8.99998 5.35383 8.99993 5.33726 8.99993H3.60001C3.30348 8.99993 3.14122 9.00071 3.02464 9.01024C3.02 9.01061 3.0156 9.011 3.01145 9.01138C3.01107 9.01553 3.01069 9.01992 3.01031 9.02457C3.00078 9.14115 3.00001 9.30341 3.00001 9.59993V14.3999C3.00001 14.6965 3.00078 14.8587 3.01031 14.9753C3.01069 14.9799 3.01107 14.9843 3.01145 14.9885C3.0156 14.9889 3.02 14.9893 3.02464 14.9896C3.14122 14.9992 3.30348 14.9999 3.60001 14.9999H5.33726C5.35383 14.9999 5.37086 14.9999 5.3883 14.9998C5.57821 14.9993 5.81735 14.9987 6.05268 15.0552C6.25676 15.1042 6.45185 15.185 6.63079 15.2947C6.83715 15.4211 7.00579 15.5907 7.13972 15.7253C7.15202 15.7377 7.16403 15.7497 7.17574 15.7615L10 18.5857V5.41415ZM10.3823 2.71166C10.861 2.67399 11.3288 2.86775 11.6406 3.23287C11.9199 3.55981 11.9642 3.95307 11.9811 4.14396C12.0001 4.35793 12 4.62369 12 4.89407C12 4.90647 12 4.91888 12 4.9313L12 19.1058C12 19.3762 12.0001 19.6419 11.9811 19.8559C11.9642 20.0468 11.9199 20.4401 11.6406 20.767C11.3288 21.1321 10.861 21.3259 10.3823 21.2882C9.95368 21.2545 9.64424 21.0078 9.4973 20.8847C9.33259 20.7469 9.1447 20.5589 8.95355 20.3677L5.76153 17.1757C5.6689 17.083 5.6225 17.037 5.58738 17.0049C5.58646 17.0041 5.58557 17.0033 5.58472 17.0025C5.58358 17.0025 5.58238 17.0024 5.58114 17.0023C5.53365 17.0002 5.46826 16.9999 5.33726 16.9999L3.56812 16.9999C3.31574 17 3.06994 17 2.86178 16.983C2.63318 16.9643 2.36345 16.9202 2.09202 16.7819C1.7157 16.5902 1.40974 16.2842 1.21799 15.9079C1.07969 15.6365 1.03563 15.3668 1.01695 15.1382C0.999943 14.93 0.999973 14.6842 1 14.4318L1.00001 9.59993C1.00001 9.58929 1 9.57866 1 9.56803C0.999973 9.31565 0.999943 9.06986 1.01695 8.8617C1.03563 8.63311 1.07969 8.36338 1.21799 8.09195C1.40974 7.71563 1.7157 7.40967 2.09202 7.21792C2.36345 7.07962 2.63318 7.03555 2.86178 7.01688C3.06993 6.99987 3.31572 6.9999 3.56811 6.99993C3.57873 6.99993 3.58936 6.99993 3.60001 6.99993H5.33726C5.46826 6.99993 5.53365 6.99969 5.58114 6.99752C5.58238 6.99747 5.58358 6.99741 5.58472 6.99735C5.58557 6.99658 5.58646 6.99578 5.58738 6.99494C5.6225 6.96289 5.6689 6.91683 5.76153 6.8242L8.92721 3.65851C8.93599 3.64973 8.94477 3.64095 8.95354 3.63218C9.1447 3.44097 9.33259 3.25302 9.4973 3.11512C9.64424 2.9921 9.95368 2.7454 10.3823 2.71166ZM15.2929 8.29283C15.6834 7.9023 16.3166 7.9023 16.7071 8.29283L19 10.5857L21.2929 8.29283C21.6834 7.9023 22.3166 7.9023 22.7071 8.29283C23.0976 8.68335 23.0976 9.31651 22.7071 9.70704L20.4142 11.9999L22.7071 14.2928C23.0976 14.6834 23.0976 15.3165 22.7071 15.707C22.3166 16.0976 21.6834 16.0976 21.2929 15.707L19 13.4141L16.7071 15.707C16.3166 16.0976 15.6834 16.0976 15.2929 15.707C14.9024 15.3165 14.9024 14.6834 15.2929 14.2928L17.5858 11.9999L15.2929 9.70704C14.9024 9.31651 14.9024 8.68335 15.2929 8.29283Z" fill="#101828" />
                        </svg>
                    </button>}
                    {brandingInfo.footer.buttons.speaker.show && <button className="speaker-btn speaker-btn-speak hide" type="button" title={hostInstance.config.botMessages.speakerOff}>
                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                            <path d="M15.4564 2.28917C16.6375 3.93104 17.3332 5.94554 17.3332 8.12251C17.3332 10.2995 16.6375 12.314 15.4564 13.9558M12.1209 4.78917C12.78 5.73404 13.1665 6.88313 13.1665 8.12251C13.1665 9.36188 12.78 10.511 12.1209 11.4558M7.02843 1.76058L4.39036 4.39865C4.24624 4.54278 4.17417 4.61484 4.09007 4.66637C4.01551 4.71207 3.93423 4.74574 3.8492 4.76615C3.75329 4.78917 3.65138 4.78917 3.44755 4.78917H1.99984C1.53313 4.78917 1.29977 4.78917 1.12151 4.88C0.96471 4.9599 0.837226 5.08738 0.757332 5.24418C0.666504 5.42244 0.666504 5.6558 0.666504 6.12251V10.1225C0.666504 10.5892 0.666504 10.8226 0.757332 11.0008C0.837226 11.1576 0.96471 11.2851 1.12151 11.365C1.29977 11.4558 1.53313 11.4558 1.99984 11.4558H3.44755C3.65138 11.4558 3.75329 11.4558 3.8492 11.4789C3.93423 11.4993 4.01551 11.533 4.09007 11.5786C4.17417 11.6302 4.24624 11.7022 4.39036 11.8464L7.02843 14.4844C7.38541 14.8414 7.5639 15.0199 7.71715 15.032C7.85011 15.0424 7.98005 14.9886 8.06667 14.8872C8.1665 14.7703 8.1665 14.5179 8.1665 14.013V2.23198C8.1665 1.72714 8.1665 1.47471 8.06667 1.35783C7.98005 1.25641 7.85011 1.20258 7.71715 1.21305C7.5639 1.22511 7.38541 1.4036 7.02843 1.76058Z" stroke="#101828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>}
                    { brandingInfo.footer.buttons.emoji.show &&  <button className="emoji-btn" type="button" title={hostInstance.config.botMessages.emojis} onClick={showEmojiPicker}>
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
                    <button className="voice-compose-btn" type="button" aria-label="Voice Compose Button" onClick={() => checkForSTTPlugin()}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 1.875C8.28613 1.875 6.875 3.28613 6.875 5V10C6.875 11.7139 8.28613 13.125 10 13.125C11.7139 13.125 13.125 11.7139 13.125 10V5C13.125 3.28613 11.7139 1.875 10 1.875ZM10 3.125C11.0352 3.125 11.875 3.96484 11.875 5V10C11.875 11.0352 11.0352 11.875 10 11.875C8.96484 11.875 8.125 11.0352 8.125 10V5C8.125 3.96484 8.96484 3.125 10 3.125ZM5 9.375C4.65482 9.375 4.375 9.65482 4.375 10C4.375 12.876 6.57715 15.2441 9.375 15.5615V16.875H7.5C7.15482 16.875 6.875 17.1548 6.875 17.5C6.875 17.8452 7.15482 18.125 7.5 18.125H12.5C12.8452 18.125 13.125 17.8452 13.125 17.5C13.125 17.1548 12.8452 16.875 12.5 16.875H10.625V15.5615C13.4229 15.2441 15.625 12.876 15.625 10C15.625 9.65482 15.3452 9.375 15 9.375C14.6548 9.375 14.375 9.65482 14.375 10C14.375 12.4072 12.4072 14.375 10 14.375C7.59277 14.375 5.625 12.4072 5.625 10C5.625 9.65482 5.34518 9.375 5 9.375Z" fill="white"/>
                    </svg>
                    </button>
                    <p className="speak-info tap-speak">{hostInstance.config.botMessages.tapToSpeak}</p>
                </div>
                <div className="compose-voice-text-recording zoomIn">
                    <button className="voice-compose-btn-recording" type="button" aria-label="Voice recording" tabIndex={0}>
                        <svg width="23" height="16" viewBox="0 0 23 16" fill="none">
                            <rect x="10.5137" width="1.97143" height="16" rx="0.985713" fill="white"/>
                            <rect x="15.7715" y="2.66699" width="1.97143" height="10.6667" rx="0.985713" fill="white"/>
                            <rect x="21.0293" y="5.33301" width="1.97143" height="5.33333" rx="0.985713" fill="white"/>
                            <rect x="5.25781" y="2.66699" width="1.97143" height="10.6667" rx="0.985713" fill="white"/>
                            <rect y="5.33301" width="1.97143" height="5.33333" rx="0.985713" fill="white"/>
                        </svg>
                    </button>
                    <p className="speak-info listen-end">{hostInstance.config.botMessages.listenToEnd}</p>
                    <button className="cancel-sepak" type="button" aria-label="Cancel voice recording">{hostInstance.config.botMessages.cancel}</button>
                </div>
                <div className="compose-voice-text-end">
                    <button className="voice-compose-btn-end" type="button" aria-label="Send button" tabIndex={0}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M1.33854 5.7792C0.917738 5.93325 0.880121 6.51382 1.2769 6.72207L6.52164 9.47856L9.27579 14.7222C9.48411 15.1188 10.064 15.0803 10.2181 14.6597L14.9674 1.69532C15.1186 1.28244 14.7177 0.881423 14.3048 1.03258L1.33854 5.7792ZM2.78926 6.35112L12.4626 2.80707L6.80699 8.46271L2.78926 6.35112ZM7.53749 9.1932L13.1931 3.53756L9.65193 13.2138L7.53749 9.1932Z" fill="white"/>
                        </svg>
                    </button>
                    <p className="speak-info tap-send">{hostInstance.config.botMessages.tapToSend}</p>
                </div>
                { brandingInfo.footer.layout === 'voice' && <button className="key-board" type="button" title={hostInstance.config.botMessages.keyboard} onClick={handleKeyboard}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M1.875 3.75C0.844726 3.75 0 4.59473 0 5.625V13.125C0 14.1553 0.844726 15 1.875 15H16.875C17.9053 15 18.75 14.1553 18.75 13.125V5.625C18.75 4.59473 17.9053 3.75 16.875 3.75H1.875ZM1.875 5H16.875C17.2266 5 17.5 5.27344 17.5 5.625V13.125C17.5 13.4766 17.2266 13.75 16.875 13.75H1.875C1.52344 13.75 1.25 13.4766 1.25 13.125V5.625C1.25 5.27344 1.52344 5 1.875 5ZM3.125 6.25C2.77982 6.25 2.5 6.52982 2.5 6.875C2.5 7.22018 2.77982 7.5 3.125 7.5C3.47018 7.5 3.75 7.22018 3.75 6.875C3.75 6.52982 3.47018 6.25 3.125 6.25ZM5.625 6.25C5.27982 6.25 5 6.52982 5 6.875C5 7.22018 5.27982 7.5 5.625 7.5C5.97018 7.5 6.25 7.22018 6.25 6.875C6.25 6.52982 5.97018 6.25 5.625 6.25ZM8.125 6.25C7.77982 6.25 7.5 6.52982 7.5 6.875C7.5 7.22018 7.77982 7.5 8.125 7.5C8.47018 7.5 8.75 7.22018 8.75 6.875C8.75 6.52982 8.47018 6.25 8.125 6.25ZM10.625 6.25C10.2798 6.25 10 6.52982 10 6.875C10 7.22018 10.2798 7.5 10.625 7.5C10.9702 7.5 11.25 7.22018 11.25 6.875C11.25 6.52982 10.9702 6.25 10.625 6.25ZM13.125 6.25C12.7798 6.25 12.5 6.52982 12.5 6.875C12.5 7.22018 12.7798 7.5 13.125 7.5C13.4702 7.5 13.75 7.22018 13.75 6.875C13.75 6.52982 13.4702 6.25 13.125 6.25ZM15.625 6.25C15.2798 6.25 15 6.52982 15 6.875C15 7.22018 15.2798 7.5 15.625 7.5C15.9702 7.5 16.25 7.22018 16.25 6.875C16.25 6.52982 15.9702 6.25 15.625 6.25ZM3.125 8.75C2.77982 8.75 2.5 9.02982 2.5 9.375C2.5 9.72018 2.77982 10 3.125 10C3.47018 10 3.75 9.72018 3.75 9.375C3.75 9.02982 3.47018 8.75 3.125 8.75ZM5.625 8.75C5.27982 8.75 5 9.02982 5 9.375C5 9.72018 5.27982 10 5.625 10C5.97018 10 6.25 9.72018 6.25 9.375C6.25 9.02982 5.97018 8.75 5.625 8.75ZM8.125 8.75C7.77982 8.75 7.5 9.02982 7.5 9.375C7.5 9.72018 7.77982 10 8.125 10C8.47018 10 8.75 9.72018 8.75 9.375C8.75 9.02982 8.47018 8.75 8.125 8.75ZM10.625 8.75C10.2798 8.75 10 9.02982 10 9.375C10 9.72018 10.2798 10 10.625 10C10.9702 10 11.25 9.72018 11.25 9.375C11.25 9.02982 10.9702 8.75 10.625 8.75ZM13.125 8.75C12.7798 8.75 12.5 9.02982 12.5 9.375C12.5 9.72018 12.7798 10 13.125 10C13.4702 10 13.75 9.72018 13.75 9.375C13.75 9.02982 13.4702 8.75 13.125 8.75ZM15.625 8.75C15.2798 8.75 15 9.02982 15 9.375C15 9.72018 15.2798 10 15.625 10C15.9702 10 16.25 9.72018 16.25 9.375C16.25 9.02982 15.9702 8.75 15.625 8.75ZM6.875 11.25C6.52982 11.25 6.25 11.5298 6.25 11.875C6.25 12.2202 6.52982 12.5 6.875 12.5H11.875C12.2202 12.5 12.5 12.2202 12.5 11.875C12.5 11.5298 12.2202 11.25 11.875 11.25H6.875ZM3.12744 11.2598C2.78092 11.2598 2.5 11.5407 2.5 11.8872C2.5 12.2337 2.78092 12.5146 3.12744 12.5146H4.37256C4.71909 12.5146 5 12.2337 5 11.8872C5 11.5407 4.71909 11.2598 4.37256 11.2598H3.12744ZM14.397 11.2598C14.0504 11.2598 13.7695 11.5407 13.7695 11.8872C13.7695 12.2337 14.0504 12.5146 14.397 12.5146H15.6421C15.9886 12.5146 16.2695 12.2337 16.2695 11.8872C16.2695 11.5407 15.9886 11.2598 15.6421 11.2598H14.397Z" fill="#697586"/>
                    </svg>
                </button> }
                { brandingInfo.footer.layout === 'keypad' && brandingInfo.footer.buttons.microphone.show && <button className="voice-btn" type="button" title={hostInstance.config.botMessages.microphone} onClick={handleVoice}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 1.875C8.28613 1.875 6.875 3.28613 6.875 5V10C6.875 11.7139 8.28613 13.125 10 13.125C11.7139 13.125 13.125 11.7139 13.125 10V5C13.125 3.28613 11.7139 1.875 10 1.875ZM10 3.125C11.0352 3.125 11.875 3.96484 11.875 5V10C11.875 11.0352 11.0352 11.875 10 11.875C8.96484 11.875 8.125 11.0352 8.125 10V5C8.125 3.96484 8.96484 3.125 10 3.125ZM5 9.375C4.65482 9.375 4.375 9.65482 4.375 10C4.375 12.876 6.57715 15.2441 9.375 15.5615V16.875H7.5C7.15482 16.875 6.875 17.1548 6.875 17.5C6.875 17.8452 7.15482 18.125 7.5 18.125H12.5C12.8452 18.125 13.125 17.8452 13.125 17.5C13.125 17.1548 12.8452 16.875 12.5 16.875H10.625V15.5615C13.4229 15.2441 15.625 12.876 15.625 10C15.625 9.65482 15.3452 9.375 15 9.375C14.6548 9.375 14.375 9.65482 14.375 10C14.375 12.4072 12.4072 14.375 10 14.375C7.59277 14.375 5.625 12.4072 5.625 10C5.625 9.65482 5.34518 9.375 5 9.375Z" fill="#697586"/>
                    </svg>
                </button> }
                { brandingInfo.footer.layout === 'keypad' && (hostInstance.mobileBrowserOpened || brandingInfo.footer.buttons.send_button.show) && <button className="send-btn show" type="button" title={hostInstance.config.botMessages.sendText}>
                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                        <path d="M1.67123 5.0568C1.30302 5.19159 1.27011 5.69959 1.61729 5.88181L6.20644 8.29374L8.61632 12.8819C8.79859 13.2289 9.30601 13.1953 9.44085 12.8272L13.5965 1.4834C13.7288 1.12213 13.378 0.771245 13.0167 0.903509L1.67123 5.0568ZM2.9406 5.55723L11.4048 2.45618L6.45612 7.40487L2.9406 5.55723ZM7.0953 8.04405L12.044 3.09537L8.94544 11.5621L7.0953 8.04405Z" fill="white"/>
                    </svg>
                </button> }
            </div>

            { brandingInfo.body.typing_indicator.show && <div className="typing-indicator-wraper">
                { brandingInfo.body.typing_indicator && brandingInfo.body.typing_indicator.icon &&<div className="bot-icon">
                    <figure>
                        <img src={brandingInfo.body.typing_indicator.icon}></img>
                    </figure>
                </div> }
                <p>{hostInstance.config.botMessages.typing}</p>
                <div class="dot-flashing"></div>
            </div>}
            <div className="powerdby-info powerdby-hide">
                <p>{hostInstance.config.botMessages.poweredBy}</p>
                <figure>
                    <img src={iconHelper.getIcon('kore_logo')} alt="kore-img" />
                </figure>
            </div>
        </div>
    );
} 
