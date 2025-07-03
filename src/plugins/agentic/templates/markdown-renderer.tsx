import { h } from 'preact';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { getRunnableCode } from './code-renderer';

// Helper function to decode HTML entities
function decodeHtmlEntities(text: string): string {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}

// Define the props for the custom code component
interface CodeProps {
    node?: any;
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
    [key: string]: any;
}

// Helper function to check if a string is valid JSON
function isJsonString(str: string): boolean {
    try {
        const parsed = JSON.parse(str);
        // Ensure it's an object or array, not just a string or number
        if (typeof parsed === 'object' && parsed !== null) {
            return true;
        }
    } catch (e) {
        // Ignore errors
    }
    return false;
}

// Custom JSON formatter component
function JsonFormatter({ data }: { data: any }) {
    // We are not using a state for expansion for now to keep it simple
    // The component will always render the full JSON tree.
    return (
        <pre style={{
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
            background: '#f4f4f4',
            border: '1px solid #ddd',
            padding: '10px',
            borderRadius: '4px',
            fontSize: '13px',
            lineHeight: '1.5',
            wordBreak: 'break-all'
        }}>
            {JSON.stringify(data, null, 2)}
        </pre>
    );
}


// The main renderer component
const MarkdownRenderer = ({ content, hostInstance }: { content: string, hostInstance: any }) => {
    if (!content) return null;
    
    // Clean up potential double-escaped newlines or quotes
    const formattedContent = content.replace(/\\n/g, '\n').replace(/\\"/g, '"');

    const bubbleStyle = {
        background: 'var(--bot-bubble-msg-bg)',
        borderRadius: '8px 8px 2px 8px',
        color: 'var(--bot-bubble-msg-color)',
        padding: '8px 12px',
        fontFamily: 'var(--global-font-family)',
        lineHeight: '1.6'
    };

    return (
        <div className="text-message-container" style={bubbleStyle}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    code: ({ node, inline, className, children, ...props }: CodeProps) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const rawCodeContent = String(children);
                        const language = match ? match[1] : '';

                        // Handle interactive code blocks (HTML/JSX/React)
                        if (language === 'jsx' || language === 'react' || language === 'html') {
                            const ShowInteractiveCode = () => {
                                const isHtml = language === 'html';
                                const buttonText = isHtml ? 'Show HTML' : 'Show Code';

                                const handleClick = () => {
                                    const decodedCode = decodeHtmlEntities(rawCodeContent);
                                    const modalBody = document.createElement('div');
                                    modalBody.style.display = 'flex';
                                    modalBody.style.flexDirection = 'column';
                                    modalBody.style.height = '100%';

                                    const tabContainer = document.createElement('div');
                                    tabContainer.style.display = 'flex';
                                    tabContainer.style.borderBottom = '1px solid #ccc';
                                    tabContainer.style.marginBottom = '10px';

                                    const renderButton = document.createElement('button');
                                    renderButton.textContent = 'Render';
                                    const codeButton = document.createElement('button');
                                    codeButton.textContent = 'Code';

                                    const tabButtonStyle = { background: 'transparent', border: 'none', padding: '10px 15px', cursor: 'pointer', fontSize: '16px', borderBottom: '2px solid transparent' };
                                    const activeTabStyle = { ...tabButtonStyle, borderBottom: '2px solid var(--sdk-global-theme-color)', fontWeight: '600' };

                                    Object.assign(renderButton.style, activeTabStyle);
                                    Object.assign(codeButton.style, tabButtonStyle);

                                    const contentContainer = document.createElement('div');
                                    contentContainer.style.flexGrow = '1';
                                    contentContainer.style.overflow = 'auto';

                                    const iframe = document.createElement('iframe');
                                    iframe.style.width = '100%';
                                    iframe.style.height = '100%';
                                    iframe.style.border = '1px solid #eee';

                                    if (isHtml) {
                                        iframe.srcdoc = decodedCode;
                                    } else {
                                        const runnableCode = getRunnableCode(decodedCode);
                                        if (runnableCode) iframe.srcdoc = runnableCode;
                                    }

                                    const pre = document.createElement('pre');
                                    pre.style.background = '#f4f4f4';
                                    pre.style.border = '1px solid #ddd';
                                    pre.style.padding = '10px';
                                    pre.style.borderRadius = '4px';
                                    pre.style.whiteSpace = 'pre-wrap';
                                    pre.style.wordBreak = 'break-all';
                                    pre.style.display = 'none';
                                    const codeEl = document.createElement('code');
                                    codeEl.textContent = decodedCode;
                                    pre.appendChild(codeEl);

                                    contentContainer.appendChild(iframe);
                                    contentContainer.appendChild(pre);

                                    renderButton.onclick = () => {
                                        Object.assign(renderButton.style, activeTabStyle);
                                        Object.assign(codeButton.style, tabButtonStyle);
                                        iframe.style.display = 'block';
                                        pre.style.display = 'none';
                                    };
                                    codeButton.onclick = () => {
                                        Object.assign(codeButton.style, activeTabStyle);
                                        Object.assign(renderButton.style, tabButtonStyle);
                                        iframe.style.display = 'none';
                                        pre.style.display = 'block';
                                    };

                                    tabContainer.appendChild(renderButton);
                                    tabContainer.appendChild(codeButton);
                                    modalBody.appendChild(tabContainer);
                                    modalBody.appendChild(contentContainer);

                                    hostInstance.modalAction(modalBody);
                                };

                                return h(
                                    'button',
                                    {
                                        onClick: handleClick,
                                        style: {
                                            background: 'var(--sdk-global-theme-color)',
                                            color: 'white',
                                            border: 'none',
                                            padding: '8px 16px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontFamily: 'var(--global-font-family)',
                                            fontSize: '14px'
                                        }
                                    },
                                    buttonText
                                );
                            };
                            return h(ShowInteractiveCode, {});
                        }

                        // Handle JSON blocks
                        if (isJsonString(rawCodeContent)) {
                            try {
                                const jsonData = JSON.parse(rawCodeContent);
                                return (
                                    <div className="json-message-container">
                                        <JsonFormatter data={jsonData} />
                                    </div>
                                );
                            } catch (error) {
                                // Fallback for safety
                            }
                        }

                        // Regular code block handling
                        return !inline ? (
                            <pre {...props} style={{ background: '#f4f4f4', border: '1px solid #ddd', padding: '10px', borderRadius: '4px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                                <code>{children}</code>
                            </pre>
                        ) : (
                            <code {...props} style={{ background: '#f4f4f4', padding: '2px 4px', borderRadius: '3px', fontFamily: 'monospace' }}>
                                {children}
                            </code>
                        );
                    },
                    table: ({ node, ...props }: { node: any, [key: string]: any }) => (
                        <div className="table-container" style={{ overflowX: 'auto', border: '1px solid #ccc', borderRadius: '4px', margin: '10px 0' }}>
                            <table {...props} style={{ width: '100%', borderCollapse: 'collapse' }} />
                        </div>
                    ),
                    thead: ({ node, ...props }: { node: any, [key: string]: any }) => <thead {...props} style={{ background: '#f2f2f2', borderBottom: '1px solid #ccc' }} />,
                    th: ({ node, ...props }: { node: any, [key: string]: any }) => <th {...props} style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }} />,
                    td: ({ node, ...props }: { node: any, [key: string]: any }) => <td {...props} style={{ padding: '8px', border: '1px solid #ddd' }} />,
                    a: ({ node, ...props }: { node: any, [key: string]: any }) => (
                        <a
                            {...props}
                            target="_blank"
                            rel="noopener noreferrer"
                        />
                    ),
                }}
            >
                {formattedContent}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer; 