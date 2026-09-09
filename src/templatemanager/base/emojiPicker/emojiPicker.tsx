import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import 'emoji-picker-element';

export function EmojiPicker(props: any) {
    const hostInstance = props.hostInstance;
    const ref = useRef(null);
    const pickerProps: any = { ref };
    if (hostInstance.config?.useKoreCdn?.emojiData) {
        const koreAPIUrl = hostInstance.config.botOptions.koreAPIUrl.replace(new RegExp('/api/?' + String.fromCharCode(36)), '');
        pickerProps['data-source'] = koreAPIUrl + '/static/websdk/emojis/data.json';
    }

    useEffect(() => {
        const emojiPickerElement: any = ref.current;

        if (emojiPickerElement !== null) {
            emojiPickerElement.addEventListener('emoji-click', (event: any) => {
                hostInstance.chatEle.querySelector('.typing-text-area').value =  hostInstance.chatEle.querySelector('.typing-text-area').value + event.detail.unicode;
                hostInstance.chatEle.querySelector('.emoji-picker-section').style.display = 'none';
                hostInstance.chatEle.querySelector('.typing-text-area').focus();
            });
            // emojiPickerElement.skinToneEmoji = '👍';
        }

        // hostInstance.chatEle.querySelector('emoji-picker').setAttribute('style', 'height:200px;width:100%');

        return () => {
            // if (emojiPickerElement !== null) {
            //     emojiPickerElement.removeEventListener('emoji-click', (event: any) => {
            //         console.log('Emoji clicked!-----', event);
            //     });
            // }
        };
    }, []);

    return h('emoji-picker' as any, pickerProps);
};


