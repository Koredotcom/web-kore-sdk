import './likeDislikeTemplate.scss';
declare class LikeDislikeTemplate {
    renderMessage(msgData: any): any;
    bindEvents(messageHtml: any): void;
    getTemplateString(): string;
}
export default LikeDislikeTemplate;
