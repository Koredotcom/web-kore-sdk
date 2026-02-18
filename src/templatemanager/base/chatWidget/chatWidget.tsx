import './chatWidget.scss';
import { h } from 'preact';
import React from 'preact/compat';
import { CustomChatTemplate } from '../customChatTemplate/customChatTemplate';

export function ChatWidget(props: any) {
    return (
        <div className='chat-widgetwrapper-main-container'>
                <CustomChatTemplate {...props} />
        </div>
    );
}