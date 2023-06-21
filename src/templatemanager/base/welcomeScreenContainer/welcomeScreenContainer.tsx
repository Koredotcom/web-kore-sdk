

import './welcomeScreenContainer.scss';
import { h } from 'preact';

export function WelcomeScreeContainer() {

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
                <section className="start-conversations-wrapper">
                    <div className="start-conv-sec">
                        <div className="conv-starter-box">
                            <div className="bot_icon">
                                <i className="sdkv3-bot-settings"></i>
                            </div>
                            <div className="conv-starter-content-info">
                                <div className="conv-starter-title">Start New Conversation</div>
                                <div className="conv-starter-desc">I’m your personal assistant I’m here to help</div>
                            </div>
                        </div>
                        <div className="quick-start-template-container">
                            <button className="quick-start-btn">
                                <span className="emoji-symbol">&#128512;</span>
                                <span>Contact sales</span>
                            </button>
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
                            </button>
                        </div>
                        <button className="start-conv-button">
                            <span>Start New Conversation</span>
                            <i className="sdkv3-check"></i>
                        </button>

                        <div className="start-conv-search-block">
                            <div className="start-conv-search">
                                <i className="sdkv3-search search-icon"></i>
                                <input type="text" placeholder="Search"></input>
                            </div>
                            <button className="search-send" aria-label="send button">
                                <i className="sdkv3-send"></i>
                            </button>
                        </div>
                    </div>
                </section>
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