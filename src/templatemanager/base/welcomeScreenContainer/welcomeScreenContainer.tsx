

import './welcomeScreeContainer.scss';
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
                <div className="start-conversations-wrapper">
                    <div className=""></div>
                </div>
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