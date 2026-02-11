import { h, Fragment } from 'preact';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const CMHelpers = (markdown: string) => {
    return (
        <Fragment>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </Fragment>
    )
};