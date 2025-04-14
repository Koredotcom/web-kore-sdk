
import { h, Fragment } from 'preact';
import { useState, useRef } from 'preact/hooks';
import ImageCarouselSvgIcons from '../carouselImagePopupTemplate/imageCarouselSvgIcons';
import './feedbackTemplate.scss';

//carousel image popup template
export function FeedbackTemplate(props: any): any {
    const hostInstanceData = props?.data;  
    const feedbackArr = [{ 'name': 'Incorrect Answer', 'key': '', 'selected': false }, { 'name': 'Incorrect Citation', 'key': '', 'selected': false }, { 'name': 'Incorrect Formatting', 'key': '', 'selected': false }, { 'name': 'Ambiguous', 'key': '', 'selected': false }, { 'name': 'Missing details', 'key': '', 'selected': false }, { 'name': 'Hallucination', 'key': '', 'selected': false }, { 'name': 'Out of Date', 'key': '', 'selected': false }];
    const [negativeFeedbackArr, setNegativeFeedbackArr] = useState(feedbackArr);
    const [isNegative, setIsNegative] = useState(false);
    const [feedbackObj, setFeedbackObj] = useState({"thumsUp":false,"thumsDown":false});

    //select / deselect Negative Feedback
    const selectedFeedback = (index: number) => {
        let data = negativeFeedbackArr[index];
        data.selected = !data?.selected;
        const arr = [...negativeFeedbackArr.slice(0, index), data, ...negativeFeedbackArr.slice(index + 1)];
        setNegativeFeedbackArr(arr);
        updateFeedback("down",arr);
    }

    //select thunbs up // down event
    const selectFeedbackType = (type: string) => {
        if (type === 'up') {
            if(feedbackObj.thumsUp) return;
            setIsNegative(false);
            setFeedbackObj({"thumsUp":true,"thumsDown":false});

        } else if (type === 'down') {
            if(feedbackObj.thumsDown) return;
            setIsNegative(true);
            setFeedbackObj({"thumsUp":false,"thumsDown":true});
            setNegativeFeedbackArr(feedbackArr);
        }        
        updateFeedback(type,feedbackArr);
    }

    //API call to update feedback
    const updateFeedback = (type:string,selectedFeedbackArray?:any[]) => {
        const streamId=hostInstanceData?.config?.botOptions?.botInfo?.taskBotId;
        const url = hostInstanceData?.config?.botOptions?.koreAPIUrl + 'searchsdk/' + streamId + '/feedback';
        const updatedFeedbackArray= selectedFeedbackArray ??  feedbackArr;
        const selectedTags = updatedFeedbackArray?.filter(item => item.selected)
        .map(item => item.name);

        const payload={
            searchRequestId:props.searchRequestId,
            feedbackLevel:"smartAnswer",
            event:type==='up' ?  "thumbsUp" : "thumbsDown",
            comments:{
                tags:type==='up'? []:selectedTags
             }
            };

        fetch(url, {
            "headers": {
                "content-type": "application/json",
                "Authorization": "bearer " + hostInstanceData?.accessToken,
            },
            "body": JSON.stringify(payload),
            "method": "POST",
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error('Something went wrong');
            }).catch(err => {
                console.log(err);
            })
    }

    //image carousel template html
    return <div className="sa-feedback-block">
        <div className="sa-horizontal-line"></div>
        <div className="sa-feedback-row">
            <div className="sa-left">What do you think of the result?</div>
            <div className="sa-right">
                <span onClick={() => selectFeedbackType('up')}><ImageCarouselSvgIcons type={feedbackObj.thumsUp?'thums-up-green':'thums-up'} /></span>  
                <span onClick={() => selectFeedbackType('down')}><ImageCarouselSvgIcons type={feedbackObj.thumsDown?'thums-down-red':'thums-down'} /></span> 
                
            </div>
        </div>
        {
            isNegative && (
                <div className="sa-comments-block">
                    {
                        negativeFeedbackArr.map((item, index) => (
                            <div key={index} className={`sa-comment ${item?.selected && 'sa-active'}`} onClick={() => selectedFeedback(index)}>{item?.name}</div>
                        ))
                    }
                </div>
            )
        }
    </div>
}

export default FeedbackTemplate;