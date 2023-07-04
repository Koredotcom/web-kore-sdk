

import './welcomeScreenContainer.scss';
import { h } from 'preact';
import { useState } from 'preact/hooks';

export function WelcomeScreenContainer(props: any) {
    const hostInstance = props.hostInstance;
    const [brandingInfo, updateBrandingInfo] = useState(hostInstance.config.branding);
    hostInstance.on('onBrandingUpdate', function (event: any) {
        updateBrandingInfo({...event.brandingData})
    });
    const wsLayout: any = {
        "regular": 'welcome-header',
        "medium": 'welcome-header variation-1',
        "large": 'welcome-header variation-2'
    };
    const startButtonsLayout: any = {
        "slack": "quick-start-buttons-container",
        "stack": "quick-start-buttons-container stacked-buttons"
    }
    const handleStartEvent = (e: any) => {
        hostInstance.sendMessageToBot(e);
        hostInstance.handleEventsWelcomeScreen();
    }

    return (
        <div className="welcome-chat-section" aria-label="welcome message screen">
            <header className={wsLayout[brandingInfo.welcome_screen.layout]} aria-label="welcome header">
                <div className="welcome-header-bg" style={{ backgroundColor: brandingInfo.welcome_screen.background.color }}>
                    <div className="logo-img">
                        <figure>
                            <img src={brandingInfo.welcome_screen.logo.logo_url} alt="log-img" />
                        </figure>
                    </div>
                    <h1 style={{ color: brandingInfo.welcome_screen.title.color }}>{brandingInfo.welcome_screen.title.name}</h1>
                    <h2 style={{ color: brandingInfo.welcome_screen.sub_title.color }}>{brandingInfo.welcome_screen.sub_title.name}</h2>
                    <p style={{ color: brandingInfo.welcome_screen.note.color }}>{brandingInfo.welcome_screen.note.name}</p>
                </div>
                <div className="bg-logo">
                    <figure>
                        <img src={brandingInfo.welcome_screen.logo.logo_url} alt="log-img" />
                    </figure>
                </div>
            </header>
            {brandingInfo.welcome_screen.starter_box.show && <div className="welcome-interactions" aria-label="welcome message screen">
                <section className="start-conversations-wrapper">
                    <div className="start-conv-sec">
                        <div className="conv-starter-box">
                            {brandingInfo.welcome_screen.starter_box.icon.show && <div className="bot_icon">
                                <i className="sdkv3-bot-settings"></i>
                            </div>}
                            <div className="conv-starter-content-info">
                                <div className="conv-starter-title">{brandingInfo.welcome_screen.starter_box.title}</div>
                                <div className="conv-starter-desc">{brandingInfo.welcome_screen.starter_box.sub_text}</div>
                            </div>
                        </div>
                        <div className={startButtonsLayout[brandingInfo.welcome_screen.starter_box.quick_start_buttons.style]}>
                            {
                                brandingInfo.welcome_screen.starter_box.quick_start_buttons.buttons.map((ele: any) => (
                                    <button className="quick-start-btn" onClick={() => handleStartEvent(ele.title)}>
                                        <span className="emoji-symbol">&#128512;</span>
                                        <span>{ele.title}</span>
                                    </button>
                                ))
                            }
                        </div>
                        {brandingInfo.welcome_screen.starter_box.quick_start_buttons.show && brandingInfo.welcome_screen.starter_box.quick_start_buttons.input === 'button' && <button className="start-conv-button">
                            <span>Start New Conversation</span>
                            <i className="sdkv3-check"></i>
                        </button>}

                        {brandingInfo.welcome_screen.starter_box.quick_start_buttons.show && brandingInfo.welcome_screen.starter_box.quick_start_buttons.input === 'search' && <div className="start-conv-search-block">
                            <div className="start-conv-search">
                                <i className="sdkv3-search search-icon"></i>
                                <input className="start-conv-input" type="text" placeholder="Search"></input>
                            </div>
                            <button className="search-send" aria-label="send button">
                                <i className="sdkv3-send"></i>
                            </button>
                        </div>}
                    </div>
                </section>
            </div>}
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