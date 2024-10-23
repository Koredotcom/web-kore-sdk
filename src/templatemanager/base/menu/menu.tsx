import './menu.scss';
import { Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import IconsManager from '../iconsManager';
export function Menu(props: any) {
    const iconHelper = new IconsManager();
    const hostInstance = props.hostInstance;
    const [brandingInfo, updateBrandingInfo] = useState(hostInstance.config.branding);
    hostInstance.on('onBrandingUpdate', function (event: any) {
        console.log('Branding Data: ', event.brandingData);
        updateBrandingInfo({ ...event.brandingData })
    });

    const closeMenu = () => {
        hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').classList.add('close-bottom-slide');
        setTimeout(() => {
            hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').remove('.chat-actions-bottom-wraper');
        }, 150);
    }

    const handleButtonEvent = (e: any) => {
        // if (!e.type) {
            let text = e.value;
            if (text.indexOf('http') >= 0 || text.indexOf('www') >= 0 || text.indexOf('https') >= 0) {
                hostInstance.openExternalLink(text);
            } else {
                hostInstance.sendMessage(text, { renderMsg: e.title });
                closeMenu(); 
            }
        // } else if (e.type.toLowerCase() == 'postback' || e.type.toLowerCase() == 'text') {
        //     hostInstance.sendMessage(e.value, { renderMsg: e.title });
        //     closeMenu();
        // } else if (e.type == 'url' || e.type == 'web_url') {
        //     let link = e.value;
        //     if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
        //         link = `http:////${link}`;
        //     }
        //     hostInstance.openExternalLink(link);
        // }
    }

    return (
        <div className="menu-wrapper-data-actions">
            <div className="actions-slider-header-menu">
                <h1>{hostInstance.config.botMessages.menu}</h1>
                <button className="menu-close" role="contentinfo" aria-label="close" onClick={closeMenu}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586"/>
                    </svg>
                </button>
            </div>
            <div className="iner-data-scroll-wraper">
                {<div class="button-template-container">
                    <div class="button-temp full-width-buttons button-variation-3">
                        {
                            brandingInfo.footer.buttons.menu.actions.map((ele: any) => (
                                <button class="kr-btn" onClick={() => handleButtonEvent(ele)}><span>{ele.title}</span></button>
                            ))
                        }
                    </div>
                </div>}
            </div>
        </div>
    );
}