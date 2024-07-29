import { getHTML } from '../../base/domManager';
import BaseChatTemplate from '../baseChatTemplate';
import './article.scss';
import { h, Fragment } from 'preact';

export function Article(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;

    const onSubmit = () => {
        let selectedValues: any= [];
        let selectedText: any = '';
        const selectedItems = hostInstance.chatEle.querySelectorAll(`.checkbox-input-${msgData.messageId}:checked`);
        selectedItems.forEach((ele: any) => {
            selectedValues.push(ele.value);
            selectedText = selectedText + ' ' + ele.getAttribute('data-title');
        });
        hostInstance.sendMessage(selectedValues.toString(), {renderMsg: selectedText});
    }

    const closeMenu = () => {
        hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').classList.add('close-bottom-slide');
        setTimeout(() => {
            hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').remove('.chat-actions-bottom-wraper');
        }, 150);
    }

    return (
        <div className="menu-wrapper-data-actions">
            <div className="actions-slider-header-menu">
                <div className="article-menuheader">
                    <h1>Article about credit card</h1>
                    <span>5</span>
                </div>
                <button className="menu-close" role="contentinfo" aria-label="close" onClick={closeMenu}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586" />
                    </svg>
                </button>
            </div>
            <div className="iner-data-scroll-wraper hidden-scroll">
                <div className="article-temp-wrapper-data display-hide">
                    <div className="articles-block">
                        <button className="article-card">
                            <div className="article-header">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3 5.625C3 4.6585 3.7835 3.875 4.75 3.875H11.75C12.7165 3.875 13.5 4.6585 13.5 5.625V14.375C13.5 15.3415 14.2835 16.125 15.25 16.125H4.75C3.7835 16.125 3 15.3415 3 14.375V5.625ZM5.625 6.5H10.875V10H5.625V6.5ZM10.875 11.75H5.625V13.5H10.875V11.75Z" fill="#101828"/>
                                    <path d="M14.375 7.375H15.25C16.2165 7.375 17 8.1585 17 9.125V13.9375C17 14.6624 16.4124 15.25 15.6875 15.25C14.9626 15.25 14.375 14.6624 14.375 13.9375V7.375Z" fill="#101828"/>
                                </svg>
                                <span>Article about credit card</span>
                            </div>
                            <div className="article-body-text">Credit cards can be a useful financial tool because they allow you to make purchases and pay bills without having to pay for them immediately. This can be especially helpful in cases where you don't have the cash on hand to pay for a large purchase, or if you need to make an emergency purchase and don't have the funds available.</div>
                            <div className="article-footer">
                                <div>Created: 23-2-2024</div>
                                <div>Updated: 23-2-2024</div>
                            </div>
                        </button>
                        <button className="article-card">
                            <div className="article-header">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3 5.625C3 4.6585 3.7835 3.875 4.75 3.875H11.75C12.7165 3.875 13.5 4.6585 13.5 5.625V14.375C13.5 15.3415 14.2835 16.125 15.25 16.125H4.75C3.7835 16.125 3 15.3415 3 14.375V5.625ZM5.625 6.5H10.875V10H5.625V6.5ZM10.875 11.75H5.625V13.5H10.875V11.75Z" fill="#101828"/>
                                    <path d="M14.375 7.375H15.25C16.2165 7.375 17 8.1585 17 9.125V13.9375C17 14.6624 16.4124 15.25 15.6875 15.25C14.9626 15.25 14.375 14.6624 14.375 13.9375V7.375Z" fill="#101828"/>
                                </svg>
                                <span>Article about credit card</span>
                            </div>
                            <div className="article-body-text">Credit cards can be a useful financial tool because they allow you to make purchases and pay bills without having to pay for them immediately. This can be especially helpful in cases where you don't have the cash on hand to pay for a large purchase, or if you need to make an emergency purchase and don't have the funds available.</div>
                            <div className="article-footer">
                                <div>Created: 23-2-2024</div>
                                <div>Updated: 23-2-2024</div>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="article-full-card-content-details">
                    <div className="scroll-inner-data">
                        <p>A credit card is a financial tool that allows individuals to make purchases without having to pay for them immediately. Instead, the user can pay for the purchases over time, usually with interest. Credit cards are widely used for various purposes, including making purchases online, paying for groceries, and covering unexpected expenses.<br/><br/>One of the main advantages of using a credit card is that it offers consumers the convenience of having funds available when they need them. For example, if a person needs to make an unexpected repair to their car, they can use their credit card to pay for it and then pay off the balance over time. Additionally, credit cards often provide users with rewards, such as cash back, points, and miles, for making purchases.<br/><br/>However, it is essential to use credit cards responsibly. One of the main dangers of credit card use is the risk of falling into debt. If a person uses a credit card to make purchases that they cannot afford to pay off, they can quickly accumulate a large debt that may take years to pay off. Additionally, credit cards often have high-interest rates, which can add significantly to the cost of the purchases made with the card.those who use them responsibly. It is crucial to have a good understanding of how credit cards work, including interest rates, fees, and payment terms. By using credit cards wisely and paying off balances in full and on time. </p>
                    </div>
                    <div className="article-update-time-block">
                        <div className="created-updated-text">Created:<br/>23-2-2024</div>
                        <div className="created-updated-text">Updated:<br/>23-2-2024</div>
                        <a target="_blank" href="https://kore.ai/">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M11.666 2.50033C11.666 2.04009 12.0391 1.66699 12.4993 1.66699H17.4993C17.9596 1.66699 18.3327 2.04009 18.3327 2.50033L18.3327 7.50033C18.3327 7.96056 17.9596 8.33366 17.4993 8.33366C17.0391 8.33366 16.666 7.96056 16.666 7.50033L16.666 4.51217L11.4219 9.75625C11.0965 10.0817 10.5689 10.0817 10.2434 9.75625C9.91799 9.43081 9.91799 8.90317 10.2434 8.57774L15.4875 3.33366H12.4993C12.0391 3.33366 11.666 2.96056 11.666 2.50033Z" fill="#155EEF"/>
                                <path d="M6.46493 3.33366L8.33268 3.33366C8.79292 3.33366 9.16602 3.70676 9.16602 4.16699C9.16602 4.62723 8.79292 5.00033 8.33268 5.00033H6.49935C5.78553 5.00033 5.30029 5.00097 4.92522 5.03162C4.55987 5.06147 4.37303 5.11557 4.2427 5.18198C3.9291 5.34177 3.67413 5.59674 3.51434 5.91034C3.44793 6.04068 3.39383 6.22751 3.36398 6.59286C3.33333 6.96793 3.33268 7.45318 3.33268 8.16699V13.5003C3.33268 14.2141 3.33333 14.6994 3.36398 15.0745C3.39383 15.4398 3.44793 15.6266 3.51434 15.757C3.67413 16.0706 3.9291 16.3255 4.2427 16.4853C4.37303 16.5517 4.55987 16.6058 4.92522 16.6357C5.30029 16.6663 5.78553 16.667 6.49935 16.667H11.8327C12.5465 16.667 13.0317 16.6663 13.4068 16.6357C13.7722 16.6058 13.959 16.5517 14.0893 16.4853C14.4029 16.3255 14.6579 16.0706 14.8177 15.757C14.8841 15.6266 14.9382 15.4398 14.9681 15.0745C14.9987 14.6994 14.9993 14.2141 14.9993 13.5003V11.667C14.9993 11.2068 15.3724 10.8337 15.8327 10.8337C16.2929 10.8337 16.666 11.2068 16.666 11.667V13.5348C16.666 14.2056 16.666 14.7592 16.6292 15.2102C16.5909 15.6786 16.5088 16.1092 16.3027 16.5136C15.9831 17.1408 15.4732 17.6508 14.846 17.9703C14.4415 18.1764 14.011 18.2586 13.5425 18.2968C13.0915 18.3337 12.5379 18.3337 11.8671 18.3337H6.46491C5.79411 18.3337 5.24049 18.3337 4.7895 18.2968C4.32108 18.2586 3.89049 18.1764 3.48605 17.9703C2.85884 17.6508 2.34891 17.1408 2.02933 16.5136C1.82325 16.1092 1.74112 15.6786 1.70284 15.2102C1.666 14.7592 1.66601 14.2056 1.66602 13.5348V8.13258C1.66601 7.46177 1.666 6.90813 1.70284 6.45714C1.74112 5.98872 1.82325 5.55814 2.02933 5.15369C2.34891 4.52648 2.85884 4.01655 3.48605 3.69697C3.89049 3.4909 4.32108 3.40876 4.7895 3.37049C5.24049 3.33364 5.79413 3.33365 6.46493 3.33366Z" fill="#155EEF"/>
                            </svg>
                            <span>Show Article</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        )
}

export function TemplateArticle(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const openArticle = () => {
        hostInstance.bottomSliderAction('', getHTML(Article, msgData, hostInstance));
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'articleTemplate') {
        return (
            <div className="article-temp-wrapper-data">
                <div className="articles-block">
                    <button className="article-card">
                        <div className="article-header">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3 5.625C3 4.6585 3.7835 3.875 4.75 3.875H11.75C12.7165 3.875 13.5 4.6585 13.5 5.625V14.375C13.5 15.3415 14.2835 16.125 15.25 16.125H4.75C3.7835 16.125 3 15.3415 3 14.375V5.625ZM5.625 6.5H10.875V10H5.625V6.5ZM10.875 11.75H5.625V13.5H10.875V11.75Z" fill="#101828"/>
                                <path d="M14.375 7.375H15.25C16.2165 7.375 17 8.1585 17 9.125V13.9375C17 14.6624 16.4124 15.25 15.6875 15.25C14.9626 15.25 14.375 14.6624 14.375 13.9375V7.375Z" fill="#101828"/>
                            </svg>
                            <span>Article about credit card</span>
                        </div>
                        <div className="article-body-text">Credit cards can be a useful financial tool because they allow you to make purchases and pay bills without having to pay for them immediately. This can be especially helpful in cases where you don't have the cash on hand to pay for a large purchase, or if you need to make an emergency purchase and don't have the funds available.</div>
                        <div className="article-footer">
                            <div>Created: 23-2-2024</div>
                            <div>Updated: 23-2-2024</div>
                        </div>
                    </button>
                    <button className="article-card">
                        <div className="article-header">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3 5.625C3 4.6585 3.7835 3.875 4.75 3.875H11.75C12.7165 3.875 13.5 4.6585 13.5 5.625V14.375C13.5 15.3415 14.2835 16.125 15.25 16.125H4.75C3.7835 16.125 3 15.3415 3 14.375V5.625ZM5.625 6.5H10.875V10H5.625V6.5ZM10.875 11.75H5.625V13.5H10.875V11.75Z" fill="#101828"/>
                                <path d="M14.375 7.375H15.25C16.2165 7.375 17 8.1585 17 9.125V13.9375C17 14.6624 16.4124 15.25 15.6875 15.25C14.9626 15.25 14.375 14.6624 14.375 13.9375V7.375Z" fill="#101828"/>
                            </svg>
                            <span>Article about credit card</span>
                        </div>
                        <div className="article-body-text">Credit cards can be a useful financial tool because they allow you to make purchases and pay bills without having to pay for them immediately. This can be especially helpful in cases where you don't have the cash on hand to pay for a large purchase, or if you need to make an emergency purchase and don't have the funds available.</div>
                        <div className="article-footer">
                            <div>Created: 23-2-2024</div>
                            <div>Updated: 23-2-2024</div>
                        </div>
                    </button>
                </div>
                <button className="show-more-btn" onClick={openArticle}>Show More</button>
            </div>
        );
    }
}

class ArticleTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(TemplateArticle, msgData, this.hostInstance);
    }
}

export default ArticleTemplate;

