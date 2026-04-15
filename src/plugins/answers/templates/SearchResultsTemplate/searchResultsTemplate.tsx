import { getHTML } from '../../../../templatemanager/base/domManager';
import { RelevantResults, renderImageWithZoom, showFileUrl } from '../relevantResultsTemplate/relevantResults';
import './searchResultsTemplate.scss';
import { h } from 'preact';
import React from 'preact/compat';
import { RelevantResultsSvgIcons, RenderFileIcons } from '../relevantResultsTemplate/relevantResultsSvgIcons';
import { getRelevantResults } from '../relevantResultsTemplate/searchResultsData';
import { TableContentBlock } from '../tablePreviewTemplate/tablePreviewUtils';

interface SearchResult {
    id: string;
    snippet: string;
    source: {
        title: string;
        type: string;
        url?: string;
        imageUrls?: Array<string>;
    };
}

interface SearchResultsTemplateProps {
    results: SearchResult[];
    totalResults?: number;
    onResultClick?: (result: SearchResult) => void;
    hostInstance?: any;
    msgData?: any;
}

export function SearchResultsTemplate(props: SearchResultsTemplateProps): any {
    const { results, totalResults = 0, onResultClick, hostInstance, msgData } = props;

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
        hostInstance.bottomSliderAction('show', sliderElement, true, 'popup-window-block', true);
    };

    const handleViewAllClick = () => {
        if (!hostInstance?.bottomSliderAction) return;

        const taskBotId = hostInstance?.config?.botOptions?.botInfo?.taskBotId;
        const url = hostInstance?.config?.botOptions?.koreAPIUrl + 'searchsdk/' + taskBotId + '/' + (msgData?.searchIndexId || '') + '/advancedSearch';
        const query = msgData?.template?.originalQuery || '';

        fetch(url, {
            headers: {
                'content-type': 'application/json',
                'Authorization': 'bearer ' + hostInstance?.accessToken
            },
            body: JSON.stringify({ query }),
            method: 'POST'
        })
            .then(res => {
                if (res.ok) return res.json();
                throw new Error('Get search results API failed');
            })
            .then((response: any) => {
                let searchResultsRes = {};
                if (!response) {
                    searchResultsRes = getRelevantResults;
                }
                openSliderWithData(searchResultsRes);
            })
            .catch(() => {
                let searchResultsRes = getRelevantResults;
                openSliderWithData(searchResultsRes);
                console.error('Get search results API failed');
            });
    };

    return (
        <section className="search-results-container">
            <header className="search-results-header">
                <h3 className="search-results-title">Relevant Results</h3>
                {totalResults > 0 && (
                    <button
                        className="search-results-view-all"
                        onClick={handleViewAllClick}
                    >
                        <span className="search-all-results-text">All Results ({totalResults})</span>
                        <RelevantResultsSvgIcons type="arrow-right" />
                    </button>
                )}
            </header>

            <ul className="search-results-list">
                {results.map((result, index) => (
                    <li
                        key={result.id}
                        className={`search-result-item ${index === 0 ? 'first-item' : ''}`}
                    >
                        <article className="result-content">
                            <header className="result-title-row">
                                <span className="result-type-icon" aria-hidden="true">
                                    <RenderFileIcons type={result.source.type} />
                                </span>
                                <div
                                    className="result-title-link"
                                    onClick={() => handleResultClick(result)}
                                >
                                    {result.source.title}
                                </div>
                            </header>
                            <TableContentBlock
                                text={result.snippet}
                                title={result.source.title}
                                textClassName="result-snippet"
                                className="result-text-image"
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
