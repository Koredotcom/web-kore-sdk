import { getHTML } from '../../../../templatemanager/base/domManager';
import { RelevantResults, renderImageWithZoom, showFileUrl } from '../relevantResultsTemplate/relevantResults';
import './searchResultsTemplate.scss';
import { h } from 'preact';
import React from 'preact/compat';
import { RelevantResultsSvgIcons, RenderFileIcons } from '../relevantResultsTemplate/relevantResultsSvgIcons';
import { TableContentBlock } from '../tablePreviewTemplate/tablePreviewUtils';

interface SearchResult {
    id: string;
    snippet: string;
    source: {
        title: string;
        type: string;
        url?: string;
        imageUrls?: Array<string>;
        fileType?: string;
    };
}

interface SearchResultsTemplateProps {
    results: SearchResult[];
    totalResults?: number;
    onResultClick?: (result: SearchResult) => void;
    hostInstance?: any;
    msgData?: any;
}

const MAX_VISIBLE_RESULTS = 3;
export function SearchResultsTemplate(props: SearchResultsTemplateProps): any {
    const { results, totalResults = 0, onResultClick, hostInstance, msgData } = props;
    const visibleResults = results.slice(0, MAX_VISIBLE_RESULTS);

    const handleResultClick = (result: SearchResult) => {
        if (onResultClick) {
            onResultClick(result);
        } else if (result.source.url) {
            window.open(result.source.url, '_blank');
        }
    };

    const openSliderWithData = (data: any) => {
        const sliderElement = getHTML(RelevantResults, { msgData: data }, hostInstance) as HTMLElement;
        sliderElement.querySelector('.actions-contnet-data')?.classList.add('ninety-percent-height');
        hostInstance.bottomSliderAction('show', sliderElement, true, 'popup-window-block', 'sa-answer-search-all-results-slider');
    };

    const handleViewAllClick = () => {
        if (!hostInstance?.bottomSliderAction) return;
        const taskBotId = hostInstance?.config?.botOptions?.botInfo?.taskBotId;
        const url = hostInstance?.config?.botOptions?.koreAPIUrl?.replace(/\/?$/, "/") + 'searchsdk/' + taskBotId + '/searchResults/' + (msgData?.searchRequestId || '');

        fetch(url, {
            headers: {
                'content-type': 'application/json',
                'Authorization': 'bearer ' + hostInstance?.accessToken
            },
            method: 'GET'
        })
            .then(res => {
                if (res.ok) return res.json();
                throw new Error('Get search results API failed');
            })
            .then((response: any) => {
                const searchResultsRes = response||{};
                openSliderWithData(searchResultsRes);
            })
            .catch(() => {
                console.error('Get search results API failed');
            });
    };

    return (
        <section className="sa-answer-search-results-container">
            <header className="sa-answer-search-results-header">
                <h3 className="sa-answer-search-results-title">Relevant Results</h3>
                {totalResults > 0 && (
                    <button
                        className="sa-answer-search-results-view-all"
                        onClick={handleViewAllClick}
                    >
                        <span className="sa-answer-search-all-results-text">All Results ({totalResults})</span>
                        <RelevantResultsSvgIcons type="arrow-right" />
                    </button>
                )}
            </header>

            <ul className="sa-answer-search-results-list">
                {visibleResults.map((result, index) => (
                    <li
                        key={result.id}
                        className={`sa-answer-search-result-item ${index === 0 ? 'sa-answer-first-item' : ''}`}
                    >
                        <article className="sa-answer-result-content">
                            <header className="sa-answer-result-title-row">
                                <span className="sa-answer-result-type-icon" aria-hidden="true">
                                    <RenderFileIcons type={result.source.fileType || result.source.type} hostInstance={hostInstance} />
                                </span>
                                <div
                                    className="sa-answer-result-title-link"
                                    onClick={() => handleResultClick(result)}
                                >
                                    {result.source.title}
                                </div>
                            </header>
                            <TableContentBlock
                                text={result.snippet}
                                title={result.source.title}
                                textClassName="sa-answer-result-snippet"
                                className="sa-answer-result-text-image"
                                extraChildren={result.source.imageUrls?.[0]
                                    ? renderImageWithZoom(
                                        result.source.imageUrls[0],
                                        result.source.title,
                                        () => showFileUrl(result.source.imageUrls?.[0], result.source.title)
                                    )
                                    : null
                                }
                            />
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default SearchResultsTemplate;
