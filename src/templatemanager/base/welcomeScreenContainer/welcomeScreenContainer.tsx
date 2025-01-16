

import './welcomeScreenContainer.scss';
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import IconsManager from '../iconsManager';
import CarouselButtons from '../../templates/carouselTemplate/carouselButtons';

export function WelcomeScreenContainer(props: any) {
    const hostInstance = props.hostInstance;
    const iconHelper = new IconsManager();
    const [brandingInfo, updateBrandingInfo] = useState(hostInstance.config.branding);
    hostInstance.on('onBrandingUpdate', function (event: any) {
        updateBrandingInfo({...event.brandingData})
    });
    const wsLayout: any = {
        "regular": 'welcome-header',
        "large": 'welcome-header variation-1',
        "medium": 'welcome-header variation-2'
    };
    const startButtonsLayout: any = {
        "slack": "quick-start-buttons-container",
        "stack": "quick-start-buttons-container stacked-buttons"
    }

    const handleStartEvent = (e: any) => {
        if (e.action.type.toLowerCase() == 'postback' || e.action.type.toLowerCase() == 'text') {
            if (hostInstance.isWelcomeScreenOpened) {
                hostInstance.sendMessage(e.action.value, { renderMsg: e.title });
            } else {
                let event = hostInstance.config.loadHistory ? 'historyComplete' : 'onWSOpen';
                hostInstance.on(event, (ev: any) => {
                    hostInstance.sendMessage(e.action.value, { renderMsg: e.title });
                }, true);
            }
            handleEventsWelcomeScreen();
        } else if ((e.action.type == 'url' || e.action.type == 'web_url') && e.action.value) {
            let link = e.action.value;
            if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
                link = `http:////${link}`;
            }
            hostInstance.openExternalLink(link);
        }
    }

    const handleEventsWelcomeScreen = () => {
        hostInstance.isWelcomeScreenOpened = true;
        if (hostInstance.config.multiPageApp && hostInstance.config.multiPageApp.enable) {
            hostInstance.setLocalStoreItem('kr-cw-welcome-chat', true);
        }
        hostInstance.chatEle.querySelector('.chat-widgetwrapper-main-container')?.classList.add('fadeIn');
        hostInstance.chatEle.querySelector('.welcome-chat-section')?.classList.remove(hostInstance.config.branding.chat_bubble.expand_animation);
        if (!hostInstance.config.botOptions.openSocket && !hostInstance.isSocketOpened) {
            setTimeout(() => {
                hostInstance.bot.logInComplete();
            }, 2000);
        }
    }

    if (brandingInfo.welcome_screen.static_links.show && brandingInfo.welcome_screen.static_links.layout == 'carousel') {
        setTimeout(() => {
            const carouselButtons = new CarouselButtons({
                hostInstance,
                id: 'welcome_screen_carousel',
                class: 'hide',
                lsWidth: 40,
                rsWidth: 20
            });
            carouselButtons.init();
        }, 50);
    }
    
    useEffect(() => {
        hostInstance.eventManager.removeEventListener('.start-conv-button', 'click');
        hostInstance.eventManager.addEventListener('.start-conv-button', 'click', (event: any) => {
            // const ele = hostInstance.chatEle.querySelector('.start-conv-value');
            // if (ele && ele.getAttribute('data-value')) {
            //     const timeout = hostInstance.historyLoading ? 3500 : 200
            //     setTimeout(() => {
            //         hostInstance.sendMessageToBot(ele.getAttribute('data-value'));
            //         ele.setAttribute('data-value', '');
            //     }, timeout);
            // }
            handleEventsWelcomeScreen();
        })

        hostInstance.eventManager.removeEventListener('.search-send', 'click');
        hostInstance.eventManager.addEventListener('.search-send', 'click', (event: any) => {
            const inputEle: any = document.querySelector('.start-conv-input');
            if (inputEle.value.trim() === '') {
                return;
            }
            handleEventsWelcomeScreen();
            const timeout = hostInstance.historyLoading ? 3500 : 200
            setTimeout(() => {
                hostInstance.sendMessageToBot(inputEle.value);
                inputEle.value = '';
            }, timeout);
        })

        hostInstance.eventManager.removeEventListener('.start-conv-input', 'keydown');
        hostInstance.eventManager.addEventListener('.start-conv-input', 'keydown', (event: any) => {
            if (event.keyCode == 13) {
                if (event.target.value.trim() === '') {
                    return;
                }
                if (event.shiftKey) {
                    return;
                }
                handleEventsWelcomeScreen();
                event.preventDefault();
                const timeout = hostInstance.historyLoading ? 3500 : 200
                setTimeout(() => {
                    hostInstance.sendMessageToBot(event.target.value);
                    event.target.value = '';
                }, timeout)
            }
        })
    });
    
    return (
        <div className="welcome-chat-section" aria-label="welcome message screen">
            <header className={wsLayout[brandingInfo.welcome_screen.layout]} aria-label="welcome header">
                <div className="welcome-header-bg">
                    { brandingInfo.welcome_screen.logo.logo_url && <div className="logo-img">
                        <figure>
                            <img src={brandingInfo.welcome_screen.logo.logo_url} alt="log-img" />
                        </figure>
                    </div> }
                    <h1>{brandingInfo.welcome_screen.title.name}</h1>
                    <h2>{brandingInfo.welcome_screen.sub_title.name}</h2>
                    <p>{brandingInfo.welcome_screen.note.name}</p>
                </div>
                { brandingInfo.welcome_screen.logo.logo_url && <div className="bg-logo">
                    <figure>
                        <img src={brandingInfo.welcome_screen.logo.logo_url} alt="log-img" />
                    </figure>
                </div> }
            </header>
            <div className="welcome-interactions" aria-label="welcome message screen">
                { brandingInfo.welcome_screen.starter_box.show && <section className="start-conversations-wrapper">
                    <div className="start-conv-sec">
                        <div className="conv-starter-box">
                            {brandingInfo.welcome_screen.starter_box.icon.show && brandingInfo.chat_bubble.icon.type == 'default' && <figure className="bot_icon">
                                {/* <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M7.66794 4.8865C7.66794 5.44621 7.2142 5.89995 6.65449 5.89995C6.09478 5.89995 5.64104 5.44621 5.64104 4.8865C5.64104 4.32679 6.09478 3.87305 6.65449 3.87305C7.2142 3.87305 7.66794 4.32679 7.66794 4.8865Z" fill="#364152"/>
                                    <path d="M9.57807 5.89995C10.1378 5.89995 10.5915 5.44621 10.5915 4.8865C10.5915 4.32679 10.1378 3.87305 9.57807 3.87305C9.01835 3.87305 8.56461 4.32679 8.56461 4.8865C8.56461 5.44621 9.01835 5.89995 9.57807 5.89995Z" fill="#364152"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.61628 1C8.61628 0.723858 8.39242 0.5 8.11628 0.5C7.84014 0.5 7.61628 0.723858 7.61628 1V1.46265H5.75782C4.36225 1.46265 3.23092 2.59398 3.23092 3.98955V5.78306C3.23092 7.17863 4.36225 8.30996 5.75782 8.30996H10.475C11.8706 8.30996 13.0019 7.17863 13.0019 5.78306V3.98955C13.0019 2.59398 11.8706 1.46265 10.475 1.46265H8.61628V1ZM4.23092 3.98955C4.23092 3.14627 4.91454 2.46265 5.75782 2.46265H10.475C11.3183 2.46265 12.0019 3.14627 12.0019 3.98955V5.78306C12.0019 6.62634 11.3183 7.30996 10.475 7.30996H5.75782C4.91454 7.30996 4.23092 6.62634 4.23092 5.78306V3.98955Z" fill="#364152"/>
                                    <path d="M4.47301 10.8828C4.68333 10.7039 4.70878 10.3883 4.52985 10.178C4.35092 9.96765 4.03536 9.9422 3.82503 10.1211L2.91575 10.8946L2.67089 11.1087C2.49076 11.2662 2.44748 11.5293 2.56764 11.7362L2.73132 12.0182L3.54196 13.3735L3.70393 13.6531C3.82104 13.8553 4.06259 13.9495 4.28564 13.8798L4.60143 13.7813L5.53941 13.4677C5.75699 13.6198 5.99003 13.7564 6.23908 13.8712L6.4261 14.7795L6.48854 15.0966C6.5347 15.331 6.74022 15.5 6.97912 15.5H9.253C9.49148 15.5 9.69677 15.3316 9.74336 15.0977L9.80668 14.7798L9.99321 13.8711C10.2422 13.7564 10.4752 13.6198 10.6927 13.4677L11.6212 13.7782L11.9465 13.8798C12.1692 13.9494 12.4104 13.8556 12.5277 13.654L12.6907 13.3738L13.4976 12.0236L13.6647 11.7371C13.7856 11.5298 13.7422 11.2659 13.5614 11.1082L13.3209 10.8986L12.4071 10.1211C12.1968 9.9422 11.8812 9.96765 11.7023 10.178C11.5233 10.3883 11.5488 10.7039 11.7591 10.8828L12.5913 11.5907L11.8654 12.8054L10.763 12.4368C10.6037 12.3835 10.4283 12.4138 10.296 12.5174C10.0145 12.738 9.70907 12.9193 9.37795 13.0457C9.21833 13.1067 9.10089 13.2449 9.06654 13.4123L8.84327 14.5H7.38952L7.16552 13.412C7.13108 13.2448 7.01368 13.1066 6.85417 13.0457C6.52305 12.9193 6.21761 12.738 5.93608 12.5174C5.80386 12.4138 5.62843 12.3835 5.46911 12.4368L4.36726 12.8052L3.64087 11.5907L4.47301 10.8828Z" fill="#364152"/>
                                    <path d="M9.65897 10.1012C9.91392 10.2073 10.0346 10.5 9.92852 10.755C9.63367 11.4636 8.93384 11.9637 8.11647 11.9637C7.30187 11.9637 6.60402 11.4669 6.30745 10.7622C6.20034 10.5077 6.31984 10.2145 6.57437 10.1074C6.82889 10.0003 7.12205 10.1198 7.22916 10.3743C7.37518 10.7213 7.71835 10.9637 8.11647 10.9637C8.51595 10.9637 8.86011 10.7196 9.00526 10.3708C9.11134 10.1158 9.40402 9.99516 9.65897 10.1012Z" fill="#364152"/>
                                </svg> */}
                                {brandingInfo.chat_bubble.icon.icon_url && brandingInfo.chat_bubble.icon.icon_url == 'icon-1' && <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
                                    <path d="M12.6667 7.4618V10.0965C12.0584 10.8017 11.2505 11.0427 10.4419 11.0427C9.00304 11.0427 8 9.99141 8 8.78878C8 7.56693 9.00304 6.49573 10.4419 6.49573C11.2505 6.49573 12.0584 6.74061 12.6667 7.4618Z" fill="white" />
                                    <path d="M21.1338 8.98667e-08H4.86687C4.49043 -9.32924e-05 4.11765 0.073067 3.76982 0.215302C3.422 0.357538 3.10596 0.566062 2.83973 0.828966C2.57351 1.09187 2.36233 1.404 2.21824 1.74754C2.07416 2.09107 2 2.45928 2 2.83112V11.889C4.15213 11.8975 5.83353 13.5193 5.83353 15.5982C5.83702 16.2822 5.64868 16.9538 5.28938 17.5385H21.1338C21.8938 17.5379 22.6225 17.2394 23.1599 16.7086C23.6973 16.1778 23.9994 15.458 24 14.7073V2.83397C24.0005 2.46191 23.9267 2.09342 23.7828 1.74956C23.639 1.4057 23.428 1.09323 23.1617 0.830014C22.8955 0.5668 22.5794 0.35801 22.2315 0.215588C21.8835 0.0731658 21.5105 -9.36611e-05 21.1338 8.98667e-08ZM15.3965 13.5328H12.7088V12.8055C11.9948 13.2655 11.1253 13.5328 10.0824 13.5328C7.52933 13.5328 5.46069 11.4326 5.46069 8.77776C5.46069 6.08457 7.52933 4.0014 10.0824 4.0014C11.1232 4.0014 11.9948 4.26873 12.7088 4.72873V4.0014H15.3965V13.5328ZM20.5415 13.5328H17.8538V4.0014H20.5451L20.5415 13.5328Z" fill="white" />
                                    <path d="M1.98691 13.6411C0.899346 13.6411 0 14.4768 0 15.5772C0 16.7028 0.899346 17.5385 1.98691 17.5385C3.10065 17.5385 4 16.7028 4 15.5772C4 14.4761 3.10065 13.6411 1.98691 13.6411Z" fill="white" />
                                </svg>}
                                {brandingInfo.chat_bubble.icon.icon_url && brandingInfo.chat_bubble.icon.icon_url == 'icon-2' && <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
                                    <path d="M2.5 0C1.26606 0 0.25 1.01606 0.25 2.25V9.75C0.25 10.9839 1.26606 12 2.5 12H4.74414V15L8.74316 12H13C14.2339 12 15.25 10.9839 15.25 9.75V2.25C15.25 1.01606 14.2339 0 13 0H2.5ZM2.5 1.5H13C13.4191 1.5 13.75 1.83094 13.75 2.25V9.75C13.75 10.1691 13.4191 10.5 13 10.5H8.24512L6.24414 12V10.5H2.5C2.08094 10.5 1.75 10.1691 1.75 9.75V2.25C1.75 1.83094 2.08094 1.5 2.5 1.5ZM3.25 3V4.5H12.25V3H3.25ZM16.75 4.5V6H19C19.42 6 19.75 6.33 19.75 6.75V14.25C19.75 14.67 19.42 15 19 15H15.25V16.5L13.2549 15H8.5C8.185 15 7.93117 14.8214 7.82617 14.5664L6.625 15.4805C7.015 16.0955 7.705 16.5 8.5 16.5H12.7598L16.75 19.5V16.5H19C20.245 16.5 21.25 15.495 21.25 14.25V6.75C21.25 5.505 20.245 4.5 19 4.5H16.75ZM3.25 6V7.5H9.25V6H3.25Z" fill="white" />
                                </svg>}
                                {brandingInfo.chat_bubble.icon.icon_url && brandingInfo.chat_bubble.icon.icon_url == 'icon-3' && <span><svg width="19" height="18" viewBox="0 0 19 18" fill="none">
                                    <path d="M5.76628 8.99999H5.77561M9.49961 8.99999H9.50894M13.2329 8.99999H13.2423M17.8996 8.99999C17.8996 13.1237 14.1388 16.4667 9.49961 16.4667C8.06296 16.4667 6.71054 16.1461 5.52797 15.581L1.09961 16.4667L2.4016 12.9947C1.57707 11.8395 1.09961 10.4693 1.09961 8.99999C1.09961 4.87627 4.86042 1.53333 9.49961 1.53333C14.1388 1.53333 17.8996 4.87627 17.8996 8.99999Z" stroke="white" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                                </svg></span>}
                                {brandingInfo.chat_bubble.icon.icon_url && brandingInfo.chat_bubble.icon.icon_url == 'icon-4' && <svg width="21" height="21" viewBox="0 0 22 22" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.25 0.5C5.45101 0.5 0.75 5.20101 0.75 11C0.75 16.799 5.45101 21.5 11.25 21.5C17.049 21.5 21.75 16.799 21.75 11C21.75 5.20101 17.049 0.5 11.25 0.5ZM11.2501 2.05566C16.19 2.05566 20.1946 6.06023 20.1946 11.0001C20.1946 15.94 16.19 19.9446 11.2501 19.9446C6.31023 19.9446 2.30566 15.94 2.30566 11.0001C2.30566 6.06023 6.31023 2.05566 11.2501 2.05566ZM11.2822 6.40039C11.7047 6.40039 12.0516 6.711 12.0889 7.10737L12.0922 7.17817V7.25C12.0922 7.67955 11.7295 8.02778 11.2822 8.02778C10.8597 8.02778 10.5127 7.71717 10.4755 7.32079L10.4722 7.25V7.17817C10.4722 6.74861 10.8348 6.40039 11.2822 6.40039ZM11.2499 9.5C11.6556 9.5 11.9888 9.81061 12.0245 10.207L12.0277 10.2778V16.0742C12.0277 16.5037 11.6795 16.852 11.2499 16.852C10.8443 16.852 10.5111 16.5414 10.4753 16.145L10.4722 16.0742V10.2778C10.4722 9.84822 10.8204 9.5 11.2499 9.5Z" fill="white" />
                                </svg>}
                            </figure>}
                            {brandingInfo.welcome_screen.starter_box.icon.show && brandingInfo.chat_bubble.icon.type == 'custom' && <figure className="bot_icon_image">
                                <img src={brandingInfo.chat_bubble.icon.icon_url} alt="icon" />
                            </figure>}
                            <div className="conv-starter-content-info">
                                <div className="conv-starter-title">{brandingInfo.welcome_screen.starter_box.title}</div>
                                <div className="conv-starter-desc">{brandingInfo.welcome_screen.starter_box.sub_text}</div>
                            </div>
                        </div>
                        { brandingInfo.welcome_screen.starter_box.quick_start_buttons.show && brandingInfo.welcome_screen.starter_box.quick_start_buttons.buttons.length > 0 && <div className={startButtonsLayout[brandingInfo.welcome_screen.starter_box.quick_start_buttons.style]}>
                            {
                                brandingInfo.welcome_screen.starter_box.quick_start_buttons.buttons.map((ele: any) => (
                                    <button className="quick-start-btn" onClick={() => handleStartEvent(ele)}>
                                        {/* <span className="emoji-symbol">&#128512;</span> */}
                                        <span>{ele.title}</span>
                                        {/* <img className="new-item" src="https://hbchat.senseforth.com/HDFC_Chat/assets/new.png" /> */}
                                    </button>
                                ))
                            }
                        </div>}
                        {brandingInfo.welcome_screen.starter_box.quick_start_buttons.input === 'button' && <button className="start-conv-button">
                            <span class="start-conv-value" data-value={brandingInfo.welcome_screen.starter_box.quick_start_buttons.action.value} >{brandingInfo.welcome_screen.starter_box.quick_start_buttons.action.value}</span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7 5L12 10L7 15" stroke="white" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>}

                        {brandingInfo.welcome_screen.starter_box.quick_start_buttons.input === 'search' && <div className="start-conv-search-block">
                            <div className="start-conv-search">
                                <div className="search-icon">
                                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.2974 2.68213C4.26116 2.68213 1.7998 5.15006 1.7998 8.19441C1.7998 11.2388 4.26116 13.7067 7.2974 13.7067C8.62518 13.7067 9.84301 13.2347 10.7931 12.449L13.342 14.9733L13.38 15.0075C13.5892 15.1785 13.8978 15.1651 14.0914 14.9686C14.297 14.7599 14.2949 14.4235 14.0867 14.2173L11.5423 11.6974C12.325 10.7451 12.795 9.52477 12.795 8.19441C12.795 5.15006 10.3336 2.68213 7.2974 2.68213ZM7.2974 3.74474C9.74834 3.74474 11.7352 5.73692 11.7352 8.19441C11.7352 10.6519 9.74834 12.6441 7.2974 12.6441C4.84646 12.6441 2.85958 10.6519 2.85958 8.19441C2.85958 5.73692 4.84646 3.74474 7.2974 3.74474Z" fill="#9AA4B2"/>
                                    </svg>
                                </div>
                                <input className="start-conv-input" type="text" placeholder="Search"></input>
                            </div>
                            <button className="search-send" aria-label="send button">
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
                                    <path d="M1.33854 6.66152C0.917738 6.81557 0.880121 7.39614 1.2769 7.6044L6.52164 10.3609L9.27579 15.6045C9.48411 16.0011 10.064 15.9626 10.2181 15.542L14.9674 2.57764C15.1186 2.16476 14.7177 1.76375 14.3048 1.91491L1.33854 6.66152ZM2.78926 7.23344L12.4626 3.68939L6.80699 9.34503L2.78926 7.23344ZM7.53749 10.0755L13.1931 4.41989L9.65193 14.0961L7.53749 10.0755Z" fill="white"/>
                                </svg>
                            </button>
                        </div>}
                    </div>
                </section> }
                { brandingInfo.welcome_screen.static_links.show && brandingInfo.welcome_screen.static_links.layout == 'list' && <div className="link-wrapper-content">
                        <div className="link-temp-wrapper">
                            <div className="main-heading-wrapper">
                                <h1>Links</h1>
                            </div>

                            {brandingInfo.welcome_screen.static_links.links.map((item: any, index: any) => (
                            <div className="link-list-template-wrapper" onClick={() => handleStartEvent(item)}>
                                {/* <div className="img-block">
                                    <img src={iconHelper.getIcon('link_logo')} />
                                </div> */}
                                {(item.title || item.description) && <div className="titles-info-block">
                                    <h1>{item.title}</h1>
                                    <p>{item.description}</p>
                                </div>}
                                <div className="right-actions-content">
                                    <button className="arrow-icon">
                                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
                                            <path d="M7 5.38232L12 10.3823L7 15.3823" stroke="#697586" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>))}
                        </div>
                    </div>
                }
                { brandingInfo.welcome_screen.static_links.show && brandingInfo.welcome_screen.static_links.layout == 'carousel' &&  <div className="link-wrapper-content">
                    <div className="link-temp-wrapper carousel-temp-links">
                        <div className="main-heading-wrapper">
                            <h1>Links</h1>
                        </div>

                        <div className="carousel-temp-links">
                            <button className="carousel-left-click" c-left-button-id="welcome_screen_carousel">
                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
                                    <path d="M12 15.5L7 10.5L12 5.5" stroke="#697586" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                            <div className="carousel-link-temp-wrapper" c-parent-id="welcome_screen_carousel">
                                {brandingInfo.welcome_screen.static_links.links.map((item: any, index: any) => (
                                        <div className="link-list-template-wrapper" c-items-id="welcome_screen_carousel" onClick={() => handleStartEvent(item)}>
                                            {/* <div className="img-block">
                                                <img src={iconHelper.getIcon('link_logo')} />
                                            </div> */}
                                            {(item.title || item.description) && <div className="titles-info-block">
                                                <h1>{item.title}</h1>
                                                <p>{item.description}</p>
                                            </div>}
                                            <div className="right-actions-content">
                                                <button className="arrow-icon">
                                                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
                                                        <path d="M7 5.38232L12 10.3823L7 15.3823" stroke="#697586" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                </button>
                                            </div>
                                    </div>))}
                            </div>
                            <button className="carousel-right-click" c-right-button-id="welcome_screen_carousel">
                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
                                    <path d="M7 5.5L12 10.5L7 15.5" stroke="#697586" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    </div>
                }
                {brandingInfo.welcome_screen.promotional_content.show && <article className="pramotional-banner-wrapper-container">
                    {brandingInfo.welcome_screen.promotional_content.promotions.map((ele: any) => (
                        (ele && ele.banner && <a className="banner-img" aria-label="pramotional banner" onClick={() => handleStartEvent(ele)}>
                            <figure>
                                <img src={ele.banner} alt="log-img" />
                            </figure>
                        </a>)))}
                </article>}
            </div>        
        </div>
    );

}