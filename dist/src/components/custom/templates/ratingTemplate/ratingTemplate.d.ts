import './ratingTemplate.scss';
declare class RatingTemplate {
    renderMessage(msgData: any): any;
    bindEvents(messageHtml: any): void;
    suggestionComponent(): string;
    getTemplateString(): string;
}
export default RatingTemplate;
