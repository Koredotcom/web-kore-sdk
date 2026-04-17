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

// ─── Parse table row/column counts from markdown ─────────────────────────────

function getTableDimensions(tableMarkdown: string): { rowCount: number; colCount: number } {
    const lines = tableMarkdown.split('\n').filter(l => l.trim().startsWith('|'));
    if (lines.length < 2) return { rowCount: 0, colCount: 0 };
    const colCount = lines[0].split('|').filter((_, i, arr) => i > 0 && i < arr.length - 1).length;
    // exclude header row and separator row
    const rowCount = Math.max(0, lines.length - 2);
    return { rowCount, colCount };
}

// ─── TableContentBlock ────────────────────────────────────────────────────────
// Splits `text` at the first GFM table and renders:
//   • text-before-table  →  div.{textClassName}.{truncated|expanded}
//   • table (≤20 rows)   →  div.table-scroll-wrapper   (inline, scrollable)
//   • table (>20 rows)   →  hidden div + table-preview-bar below the text
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
    const { rowCount, colCount } = hasTable ? getTableDimensions(tableMarkdown) : { rowCount: 0, colCount: 0 };
    const isLargeTable = rowCount > 1;

    const handleExpandTable = () => {
        const tableEl = tableRef.current?.querySelector('table');
        if (tableEl) showTablePreview(tableEl.outerHTML, title);
    };

    const containerClass = [
        'search-results-table-container',
        hasTable ? 'has-table' : '',
        isLargeTable ? 'has-large-table' : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <div className={containerClass}>
            {extraChildren}
            {/* Text-only div – lineClamp / overflow:hidden applies only here */}
            <div className={`${textClassName} ${isExpanded ? 'expanded' : 'truncated'}`}>
                {CMHelpers(hasTable ? textBefore : text)}
                {inlineChildren}

                {/* Inline table for small tables (≤20 rows) */}
                {hasTable && !isLargeTable && (
                    <div ref={tableRef} className="table-scroll-wrapper">
                        {CMHelpers(tableMarkdown)}
                    </div>
                )}
                {hasTable && !isLargeTable && isExpanded && (
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

            {/* Large table: hidden in DOM so popup can grab the HTML */}
            {hasTable && isLargeTable && (
                <div ref={tableRef} className="table-hidden">
                    {CMHelpers(tableMarkdown)}
                </div>
            )}

            {/* Table preview bar shown below text when table has >20 rows */}
            {hasTable && isLargeTable && (
                <div className="table-preview-bar">
                    <span className="table-preview-label">Table Preview</span>
                    <span className="table-preview-sep" />
                    <span className="table-preview-meta">{rowCount} Rows - {colCount} Columns</span>
                    <span className="table-preview-sep" />
                    <button className="table-preview-view-btn" onClick={handleExpandTable}>
                        <span>View Table</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.5 4.5L10.5 1.5M10.5 1.5H7.49999M10.5 1.5L6 6M5 1.5H3.9C3.05992 1.5 2.63988 1.5 2.31901 1.66349C2.03677 1.8073 1.8073 2.03677 1.66349 2.31901C1.5 2.63988 1.5 3.05992 1.5 3.9V8.1C1.5 8.94008 1.5 9.36012 1.66349 9.68099C1.8073 9.96323 2.03677 10.1927 2.31901 10.3365C2.63988 10.5 3.05992 10.5 3.9 10.5H8.1C8.94008 10.5 9.36012 10.5 9.68099 10.3365C9.96323 10.1927 10.1927 9.96323 10.3365 9.68099C10.5 9.36012 10.5 8.94008 10.5 8.1V7" stroke="#155EEF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}
