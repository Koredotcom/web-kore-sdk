import './customChatTemplate.scss';
import { h } from 'preact';
import { useState, useRef } from 'preact/hooks';

export function CustomChatBody(props: any) {
    const hostInstance = props.hostInstance;
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null);

    const submitSearch = () => {
        const q = (searchInputRef.current?.value || searchQuery || '').trim();
        if (q && hostInstance?.sendMessageToBot) {
            hostInstance.sendMessageToBot(q);
            setSearchQuery('');
            if (searchInputRef.current) searchInputRef.current.value = '';
        }
    };

    return (
        <div className="custom-chat-body">
               <div className="custom-chat-body-container text-center">Custom Chat Body Component</div>
            <div className="custom-search-section">
                <div className="custom-search-bar">
                    <input
                        ref={searchInputRef}
                        type="text"
                        className="custom-search-input"
                        placeholder="Search..."
                        value={searchQuery}
                        onInput={(e: any) => setSearchQuery(e.target?.value || '')}
                        onKeyDown={(e: any) => e.key === 'Enter' && submitSearch()}
                        aria-label="Search"
                    />
                    {searchQuery && (
                        <button type="button" className="custom-search-clear" aria-label="Clear search" onClick={() => setSearchQuery('')}>
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M10.88 10L16.07 4.82c.24-.24.24-.64 0-.88-.25-.25-.64-.25-.88 0L10 9.12 4.82 3.93c-.24-.24-.64-.24-.88 0-.25.24-.25.64 0 .88L9.12 10l-5.18 5.18c-.25.24-.25.64 0 .88.24.25.64.25.88 0L10 10.88l5.18 5.18c.24.24.64.24.88 0 .24-.24.24-.64 0-.88L10.88 10z" fill="currentColor"/></svg>
                        </button>
                    )}
                    <button type="button" className="custom-search-submit" aria-label="Search" onClick={submitSearch}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M9 3a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0 1.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z" fill="currentColor"/></svg>
                    </button>
                </div>
                <div className="custom-content-tabs">
                   Custom Tabs
                </div>
            </div>

            <div className="custom-body-layout">
                <aside className="custom-filters-sidebar">
                    <div className="custom-filters-header">
                        <span>Custom Filters Sidebar</span>
                    </div>
                </aside>

                <div className="custom-main-content">
                    <div className="custom-ai-summary">
                       Info Toast Message
                    </div>

                    {/* SDK message list: same structure as default body so chat logic works */}
                    <div className="chat-widget-body-wrapper custom-chat-messages-wrapper" aria-live="polite" aria-relevant="additions" tabIndex={-1}>
                        <div className="prev-message-list" aria-hidden="true"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
