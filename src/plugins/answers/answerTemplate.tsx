import BaseChatTemplate from '../../templatemanager/templates/v3/baseChatTemplate';
import './answerTemplate.scss';
import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';


export function Answers(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageObj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    const [answersObj, setAnswersObj]: any = useState({ arr: [], data: {}, index: 0 });
    const [modelType, setModelType] = useState('');

    useEffect(() => {
        const results = messageObj?.msgData?.message[0]?.component?.payload?.answer_payload?.center_panel?.data[0]?.snippet_content;
        setAnswersObj((prevState: any) => ({ ...prevState, arr: results, data: results[0] }));
        setModelType(messageObj?.msgData?.message[0]?.component?.payload?.template_type);
    }, [msgData])
    console.log("msgData", msgData)

    const clickedArrow = (type: string) => {
        let data_index = answersObj.index;
        if ((answersObj.arr.length - 1) >= data_index) {
            if (type === 'left') {
                if (data_index > 0) data_index--;
            } else {
                data_index++;
            }
            setAnswersObj((prevState: any) => ({ ...prevState, data: answersObj.arr[data_index], index: data_index }))
        }
    }

    return (
        <div class="sa-answer-block">

            {
                modelType === 'generative_model' ? (
                    <Fragment>
                        <div class="sa-answer-result-block">
                            <div class="sa-answer-result-heading">{answersObj?.data?.answer_fragment}</div>
                            {
                                answersObj?.data?.sources?.map((source: any, index: number) => (
                                    <div class="sa-answer-result-footer">{index + 1}. {source?.title}</div>
                                ))
                            }
                        </div>

                        <div class="sa-answer-carousel-block">
                            <div class="sa-answer-left-arrow" onClick={() => clickedArrow('left')}>
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8333 8.00008C15.8333 3.94999 12.55 0.666748 8.49996 0.666748C4.44987 0.666748 1.16663 3.94999 1.16663 8.00008C1.16663 12.0502 4.44987 15.3334 8.49996 15.3334C12.55 15.3334 15.8333 12.0502 15.8333 8.00008ZM11.8333 8.00008C11.8333 8.36827 11.5348 8.66675 11.1666 8.66675H7.44277L8.97136 10.1953C9.23171 10.4557 9.23171 10.8778 8.97136 11.1382C8.71101 11.3985 8.2889 11.3985 8.02855 11.1382L5.36189 8.47149C5.10154 8.21114 5.10154 7.78903 5.36189 7.52868L8.02855 4.86201C8.2889 4.60166 8.71101 4.60166 8.97136 4.86201C9.23171 5.12236 9.23171 5.54447 8.97136 5.80482L7.44277 7.33341H11.1666C11.5348 7.33341 11.8333 7.63189 11.8333 8.00008Z" fill="#D0D5DD" />
                                </svg>
                            </div>
                            <div class="sa-answer-dot">
                                {
                                    answersObj?.arr?.map((dots: any) => (
                                        <svg class="m-b-5" width="5" height="4" viewBox="0 0 5 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="2.5" cy="2" r="2" fill="#D0D5DD" />
                                        </svg>
                                    ))
                                }
                            </div>
                            <div class="sa-answer-count">3/{answersObj?.arr?.length}</div>
                            <div class="sa-answer-right-arrow" onClick={() => clickedArrow('right')}>
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.16671 7.99992C1.16671 12.05 4.44995 15.3333 8.50004 15.3333C12.5501 15.3333 15.8334 12.05 15.8334 7.99992C15.8334 3.94983 12.5501 0.666586 8.50004 0.666585C4.44995 0.666585 1.16671 3.94983 1.16671 7.99992ZM5.16671 7.99992C5.16671 7.63173 5.46518 7.33325 5.83337 7.33325L9.55723 7.33325L8.02864 5.80466C7.76829 5.54431 7.76829 5.1222 8.02864 4.86185C8.28899 4.6015 8.7111 4.6015 8.97145 4.86185L11.6381 7.52851C11.8985 7.78886 11.8985 8.21097 11.6381 8.47132L8.97145 11.138C8.7111 11.3983 8.28899 11.3983 8.02864 11.138C7.76829 10.8776 7.76829 10.4555 8.02864 10.1952L9.55723 8.66659L5.83337 8.66659C5.46518 8.66658 5.16671 8.36811 5.16671 7.99992Z" fill="#D0D5DD" />
                                </svg>
                            </div>
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <div class="sa-answer-result-block">
                            <div class="sa-answer-result-heading">{answersObj?.data?.snippet_title}</div>
                            <div class="sa-answer-result-desc">{answersObj?.data?.snippet_content}</div>

                            <div class="sa-answer-result-footer">1. {answersObj?.data?.source}</div>
                        </div>

                    </Fragment>
                )
            }


        </div>
    );
}

export function answerTemplateCheck(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    if (msgData?.message?.[0]?.component?.payload?.template_type == 'answerTemplate') {
        return (
            <Answers {...props} />
        )
    }
}

class TemplateAnswers extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(answerTemplateCheck, msgData, this.hostInstance);
    }
}

export default TemplateAnswers;


