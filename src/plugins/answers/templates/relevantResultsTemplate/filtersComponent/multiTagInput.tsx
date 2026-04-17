import { useState } from 'preact/hooks';
import { h } from 'preact';
import './multiTagInput.scss';

interface MultiTagInputProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

export function MultiTagInput(props: MultiTagInputProps): any {
    const { 
        placeholder = "Select file types", 
        value = "", 
        onChange, 
        onFocus, 
        onBlur 
    } = props;

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
        onFocus?.();
    };

    const handleBlur = () => {
        setIsFocused(false);
        onBlur?.();
    };

    const handleChange = (e: any) => {
        onChange?.(e.target.value);
    };

    return h('div', { className: "sa-answer-multi-tag-input-wrapper" }, [
        h('div', { 
            className: `sa-answer-multi-tag-input ${isFocused ? 'sa-answer-focused' : ''}`,
            onClick: handleFocus
        }, [
            h('div', { className: "sa-answer-input-content" }, [
                h('span', { className: "sa-answer-input-text" }, value || placeholder)
            ]),
            h('div', { className: "sa-answer-chevron-icon" }, [
                h('svg', { 
                    width: "16", 
                    height: "16", 
                    viewBox: "0 0 16 16", 
                    fill: "none" 
                }, [
                    h('path', { 
                        d: "M4 6L8 10L12 6", 
                        stroke: "#98A2B3", 
                        strokeWidth: "1.4", 
                        strokeLinecap: "round", 
                        strokeLinejoin: "round" 
                    })
                ])
            ])
        ])
    ]);
}
