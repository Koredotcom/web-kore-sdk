import '../answerTemplate/answerTemplate.scss';
import { h, Fragment } from 'preact';
import KoreHelpers from '../../../../utils/helpers';
import ImageCarouselSvgIcons from '../carouselImagePopupTemplate/imageCarouselSvgIcons';
import { CMHelpers } from '../../../../utils/cm-helpers';

export function StreamingAnswersTemplate(props: any) {
    const msgData = props.msgData;
    
    const accumulatedText = msgData?.message?.[0]?.component?.payload?.payload?.answer || msgData?.message?.[0]?.component?.payload?.answer || msgData?.message?.[0]?.cInfo?.body || '';

    // Render the accumulated streaming text
    return (
        <div class="sa-answer-block" data-cw-msg-id={msgData?.messageId}>
            <div class="sa-answer-result-block">
                <div className="sa-answer-header-block">
                    <div className="sa-answer-left">
                        <Fragment>
                            <div className="sa-answer-img">
                                <ImageCarouselSvgIcons type="answer-icon" />
                            </div>
                            <div className="sa-answer-text">Answered by AI</div>
                        </Fragment>
                    </div>
                </div>
                <div class="sa-answer-result-sub-block">
                    <span className="sa-answer-result-heading">
                        {CMHelpers(accumulatedText)}
                    </span>
                </div>
            </div>
        </div>
    );
}