import BaseChatTemplate from '../../baseChatTemplate';
import './disputeCheckboxList.css';
import { h, Fragment } from 'preact';
import { Message } from '../../message/message';

export function disputeCheckboxList(props: any) {
    // debugger
    console.log(props);
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
        
    const handleButtonEvent = () => {
        let $ = props.hostInstance.$;
        
        const checkboxSelection = $('.checkBoxestmplContentChild').find('.checkInput:checked');
        const selectedValue = []
        const toShowText = [];
        for (let i = 0; i < checkboxSelection.length; i++) {
            selectedValue.push($(checkboxSelection[i]).attr('value'));
            const checkbox = $(checkboxSelection[i]);
            const value = checkbox.attr('value');
            const label = checkbox.siblings('label').text().trim() || checkbox.closest('label').text().trim();
            toShowText.push(label);
        }
        // hostInstance.sendMessage(`${selectedValue.toString()}`,{renderMsg:toShowText.toString()});
        hostInstance.sendMessage(`Done: ${selectedValue.toString()}`,{renderMsg:toShowText.toString()});
        
    }
    
    

    // msgData.message[0].component.payload = {
    //     "payload": {
    //       "template_type": "multi_select",
    //       "heading": "Let me know which of the following purchases you did not make and I will place them in dispute.",
    //       "elements": [
    //         {
    //           "title": "Michigan State University Tuition, East Lansing, MI for $500.00 on 12/12/2023",
    //           "value": 998424
    //         },
    //         {
    //           "title": "American Lung Association, Hartford, CT for $250.00 on 12/10/2023",
    //           "value": 998415
    //         },
    //         {
    //           "title": "Allstate Policy Renewal, Brookline, MA for $280.00 on 12/09/2023",
    //           "value": 998414
    //         },
    //         {
    //           "title": "PUBLIX - PONTE VEDRA BEACH, FL for $162.60 on 12/07/2023",
    //           "value": 998190
    //         },
    //         {
    //           "title": "AT&T *PAYMENT - 800-288-2020, TX for $177.65 on 12/06/2023",
    //           "value": 998189
    //         }
    //       ],
    //       "buttons": [
    //         {
    //           "title": "Done",
    //           "type": "postback",
    //           "payload": "done"
    //         }
    //       ]
    //     }
    // }
    const messageobj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == 'multi_select') {
        return (
            <Fragment>
                <div className="checkboxes-template">
                    <ul className="listTmplContent listTmplContentBox multi-search-select-wrapper">
                        <li className="listTmplContentHeading" aria-live="off" aria-hidden="true">
                        {msgData.message[0].component.payload.heading}
                        </li>
                        {msgData.message[0].component.payload.elements.map((ele: any) => (
                            <li className="checkBoxestmplContentChild" aria-live="off" aria-hidden="true">
                                <div className="checkbox checkbox-primary styledCSS checkboxesDiv">
                                    <input className="checkInput" type="checkbox"  value={ele.value} id={`$${msgData.messageId}`} />
                                    <label id={`${ele.value}${msgData.messageId}`}>{ele.title}</label>
                                </div>
                            </li>
                        ))}     
                        <div className=" checkboxButtons  ">
                        {msgData.message[0].component.payload.buttons.map((ele: any) => (
                            <button className="kr-btn checkboxBtn" onClick={() => handleButtonEvent()} value={ele.payload} title={ele.title}>Done</button>
                        ))}   
                        </div>                    
                    </ul>
                </div>
            </Fragment>
                
                
        );
    }
}

class multiSelect extends BaseChatTemplate {
    hostInstance: any = this;
    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(disputeCheckboxList, msgData, this.hostInstance);
    }
}

export default multiSelect;