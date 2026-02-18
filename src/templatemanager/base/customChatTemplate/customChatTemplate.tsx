import './customChatTemplate.scss';
import { h } from 'preact';
import { CustomChatHeader } from './customChatHeader';
import { CustomChatBody } from './customChatBody';

export function CustomChatTemplate(props: any) {
    return (
        <div className="custom-chat-template">
            <CustomChatHeader {...props} />
            <div className="kore-sdk-error-section hide"></div>
            <CustomChatBody {...props} />
        </div>
    );
}
