import './customChatTemplate.scss';
import { h } from 'preact';

export function CustomChatHeader(_props: any) {
    return (
        <div className="custom-chat-header" aria-label="chat widget header">
            <div className="custom-header-brand">
                <span className="custom-header-logo">Custom Chat Header Component</span>
            </div>
        </div>
    );
}
