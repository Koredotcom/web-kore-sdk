

import './welcomeScreenContainer.scss';
import { h } from 'preact';

export function WelcomeScreenContainer(props: any) {
    const me = props.hostInstance;
    const wsLayout: any = {
        1: 'welcome-header',
        2: 'welcome-header variation-1',
        3: 'welcome-header variation-2'
    };
    const ws = props?.welcome_screen;
    const wsLayoutIndex = ws?.layout || 1;
    const wsTitle = ws?.title?.name || 'Test';
    const wsTitleColor = ws?.title.color || '#000';
    const wsSubTitle = ws?.sub_title.name || 'Welcome to Kore.ai';
    const wsSubTitleColor = ws?.sub_title.color || '#fff';
    const wsNote = ws?.note.name || 'Our community is ready to help.';
    const wsLogo = ws?.logo.logo_url || '/images/sc-small.svg';
    const wsBackgroundColor = ws?.background.color || '#4B4EDE';
    const wsBackgroundUrl = '$(ws?.background.img)' || "url('/images/standardcharteredlogo.svg')";

    const wsStarterSection =  ws?.starter_section.show || true;
    const wsStarterSectionIcon = ws?.starter_section.icon.show || true;
    const wsStarterSectionTitle = ws?.starter_section.title || 'Start New Conversation';
    const wsStarterSectionSubText = ws?.starter_section.sub_text || 'I’m your personal assistant I’m here to help';
    const wsStartSectionQuickStart = ws?.starter_section.quick_start_buttons.show || true;
    const wsStartSectionQuickStartType = ws?.starter_section.quick_start_buttons.input || 'search';
    const wsStartSectionButtons = ws?.starter_section.quick_start_buttons.buttons || [{"title": 'Contact Sales',
    "action": {
        "type": "postback|url", //postback
        "value": "http://abc.com|help",
    }}]


    const handleStartEvent = (e: any) => {
        me.sendMessageToBot(e);
        me.handleEventsWelcomeScreen();
    }

    return (
        <div className="welcome-chat-section" aria-label="welcome message screen">
            <header className={wsLayout[wsLayoutIndex]} aria-label="welcome header">
                <div className="welcome-header-bg" style={{backgroundColor: wsBackgroundColor, background: wsBackgroundUrl}}>
                    <div className="logo-img">
                        <figure>
                            <img src={wsLogo} alt="log-img" />
                        </figure>
                    </div>
                    <h1 style={{color: wsTitleColor}}>{wsTitle}</h1>
                    <h2 style={{color: wsSubTitleColor}}>{wsSubTitle}</h2>
                    <p>{wsNote}</p>
                </div>
                <div className="bg-logo">
                    <figure>
                        <img src={wsLogo} alt="log-img" />
                    </figure>
                </div>
            </header>
          {wsStarterSection && <div className="welcome-interactions" aria-label="welcome message screen">
                <section className="start-conversations-wrapper">
                    <div className="start-conv-sec">
                        <div className="conv-starter-box">
                            {wsStarterSectionIcon && <div className="bot_icon">
                                <i className="sdkv3-bot-settings"></i>
                            </div> }
                            <div className="conv-starter-content-info">
                                <div className="conv-starter-title">{wsStarterSectionTitle}</div>
                                <div className="conv-starter-desc">{wsStarterSectionSubText}</div>
                            </div>
                        </div>
                        <div className="quick-start-buttons-container">
                            {
                                wsStartSectionButtons.map((ele: any) => (
                                    <button className="quick-start-btn" onClick={() =>handleStartEvent(ele.title)}>
                                        <span className="emoji-symbol">&#128512;</span>
                                        <span>{ele.title}</span>
                                    </button>
                                ))
                            }
{/* 
                            <button className="quick-start-btn">
                                <span className="emoji-symbol">&#128512;</span>
                                <span>Free trail</span>
                            </button>
                            <button className="quick-start-btn">
                                <span className="emoji-symbol">&#128512;</span>
                                <span>Support</span>
                            </button>
                            <button className="quick-start-btn">
                                <span className="emoji-symbol">&#128512;</span>
                                <span>Know about Kore.ai</span>
                            </button>
                            <button className="quick-start-btn">
                                <span className="emoji-symbol">&#128512;</span>
                                <span>Just checking about the site</span>
                            </button> */}
                        </div>
                        { wsStartSectionQuickStart &&  wsStartSectionQuickStartType=== 'button' && <button className="start-conv-button">
                            <span>Start New Conversation</span>
                            <i className="sdkv3-check"></i>
                        </button>}

                        {wsStartSectionQuickStart && wsStartSectionQuickStartType === 'search' && <div className="start-conv-search-block">
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
            </div> }
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