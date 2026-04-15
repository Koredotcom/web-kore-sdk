import { h } from 'preact';
import { useRef } from 'preact/hooks';
import { render } from 'preact';
import React from 'preact/compat';
import { ImageCarouselSvgIcons } from '../imagePreviewTemplate/imageCarouselSvgIcons';
import { CMHelpers } from '../../../../utils/cm-helpers';
import './tablePreviewUtils.scss';

// ─── Markdown table splitter ──────────────────────────────────────────────────
// Splits a markdown string at the first GFM table so that text and table are
// rendered in separate DOM elements.  This avoids the DOM-manipulation /
// Preact-reconciler conflict that caused duplicate wrappers.

export function splitMarkdownAtFirstTable(md: string): {
    textBefore: string;
    tableMarkdown: string;
} {
    const lines = md.split('\n');

    for (let i = 0; i + 1 < lines.length; i++) {
        const cur  = lines[i].trim();
        const next = lines[i + 1].trim();

        // GFM table: header row starts and ends with |;
        // separator row contains only |, -, :, and spaces.
        if (
            cur.startsWith('|') &&
            cur.endsWith('|') &&
            /^\|[\s\-:|]+\|$/.test(next)
        ) {
            let end = i;
            while (end < lines.length && lines[end].trim().startsWith('|')) end++;

            return {
                textBefore:    lines.slice(0, i).join('\n').trimEnd(),
                tableMarkdown: lines.slice(i, end).join('\n'),
            };
        }
    }

    return { textBefore: md, tableMarkdown: '' };
}

// ─── Popup close ──────────────────────────────────────────────────────────────

export const closeTablePopup = () => {
    document.getElementById('sa-table-popup-container')?.remove();
};

// ─── Popup component ──────────────────────────────────────────────────────────

interface TablePreviewPopupProps {
    tableHTML: string;
    title: string;
}

function TablePreviewPopup({ tableHTML, title }: TablePreviewPopupProps) {
    return (
        <div className="sa-table-preview">
            <div className="sa-table-preview-header">
                <div className="sa-table-header-content">
                    <div className="sa-table-header-left">
                        <div className="sa-table-back-btn" onClick={closeTablePopup}>
                            <ImageCarouselSvgIcons type="back-arrow" />
                        </div>
                        <div className="sa-table-title">{title || 'Table Preview'}</div>
                    </div>
                    <div className="sa-table-close-btn" onClick={closeTablePopup}>
                        <ImageCarouselSvgIcons type="close-button" />
                    </div>
                </div>
            </div>
            <div className="sa-table-preview-body">
                <div
                    className="sa-table-wrapper"
                    dangerouslySetInnerHTML={{ __html: tableHTML }}
                />
            </div>
        </div>
    );
}

// ─── Open popup helper ────────────────────────────────────────────────────────

export const showTablePreview = (tableHTML: string, title: string) => {
    closeTablePopup();
    const tempDiv = document.createElement('div');
    tempDiv.id = 'sa-table-popup-container';
    document.body.appendChild(tempDiv);
    render(<TablePreviewPopup tableHTML={tableHTML} title={title} />, tempDiv);
};

// ─── TableContentBlock ────────────────────────────────────────────────────────
// Splits `text` at the first GFM table and renders:
//   • text-before-table  →  div.{textClassName}.{truncated|expanded}
//   • table              →  div.table-scroll-wrapper   (no overflow:hidden → can scroll)
//   • expand button      →  button.table-expand-btn    (sibling of scroll-wrapper)
//
// Nothing is mutated after mount – no DOM manipulation, no useEffect.

interface TableContentBlockProps {
    /** Raw markdown string (may contain a GFM table) */
    text: string;
    /** Title forwarded to the table-preview popup */
    title: string;
    /** CSS class for the text div, e.g. "result-text" or "result-snippet" */
    textClassName: string;
    /** Whether the text div is in expanded state */
    isExpanded?: boolean;
    /** Extra CSS classes on the outer container (e.g. "result-text-image") */
    className?: string;
    /** Rendered BEFORE the text div (e.g. an inline thumbnail image) */
    extraChildren?: any;
    /** Rendered INSIDE the text div, after the text (e.g. more-images-block) */
    inlineChildren?: any;
}

export function TableContentBlock({
    text,
    title,
    textClassName,
    isExpanded = false,
    className = '',
    extraChildren = null,
    inlineChildren = null,
}: TableContentBlockProps) {
    const tableRef = useRef<HTMLDivElement>(null);

    const { textBefore, tableMarkdown } = splitMarkdownAtFirstTable(text);
    const hasTable = !!tableMarkdown;

    const handleExpandTable = () => {
        const tableEl = tableRef.current?.querySelector('table');
        if (tableEl) showTablePreview(tableEl.outerHTML, title);
    };

    const containerClass = [
        'search-results-table-container',
        hasTable ? 'has-table' : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <div className={containerClass}>
            {extraChildren}
            {/* Text-only div – lineClamp / overflow:hidden applies only here */}
            <div className={`${textClassName} ${isExpanded ? 'expanded' : 'truncated'}`}>
                {CMHelpers(hasTable ? textBefore : text)}
                {inlineChildren}
            
            {/* Table lives outside the clamped div so it is never clipped */}
            {hasTable && (
                <div ref={tableRef} className="table-scroll-wrapper">
                    {CMHelpers(tableMarkdown)}
                </div>
            )}
             {hasTable && (
                    <button
                    className="table-expand-btn"
                    onClick={handleExpandTable}
                    title="Expand table"
                >
                    <ImageCarouselSvgIcons type="expand" />
                    <span>Expand</span>
                </button>
                  )}
            </div>
        </div>
    );
}
