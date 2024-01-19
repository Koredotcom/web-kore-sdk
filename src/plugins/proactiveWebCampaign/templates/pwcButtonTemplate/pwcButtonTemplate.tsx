import { h, Fragment } from 'preact';
import BaseChatTemplate from '../../../../templatemanager/templates/v3/baseChatTemplate';
import './pwcButtonTemplate.scss';
export function Button(props: any) {
    const msgData = props.msgData;
    const hostInstance = props.hostInstance;

    if (msgData.type == 'pwe_message' && msgData.body.campInfo?.webCampaignType && msgData.body.campInfo?.webCampaignType == 'button' && msgData?.body?.layoutDesign) {
        const layoutDesign = msgData.body?.layoutDesign;
        let buttonClass = 'campaign-post-button-wrapper';
        if (layoutDesign?.placement == 'right') {
            buttonClass = buttonClass + ' campaign-post-button-wrapper-right-position';
        }

        let buttons = layoutDesign?.buttons;
        let btns: any = [];
        buttons.forEach((ele: any) => {
            let obj = ele;
            obj.message = decodeURIComponent(obj?.message);
            btns.push(obj);
        });
        layoutDesign.buttons = btns;

        const handleClick = (btn: any, ind: any) => {
            if (btn.actionType == 'url') {
                let link = btn.actionValue;
                if (link.indexOf('http:') < 0 && link.indexOf('https:') < 0) {
                    link = `http:////${link}`;
                }
                hostInstance.openExternalLink(link);
                removeButton(ind)
            } else {
                const btn = document.getElementById(`campaign-button-${ind}`);
                if (btn) {
                    btn.classList.add('show-campaign-content-data');
                }
            }
        }

        const removeButton = (ind: any) => {
            const btn = document.getElementById(`campaign-button-${ind}`);
            if (btn) {
                btn.remove();
            }
        }

        return (
            <div className={buttonClass}>
                {layoutDesign.buttons.map((btn: any, ind: any) => (
                    <div className="campaign-button-content-details" id={`campaign-button-${ind}`}>
                        <button className="button-maintain" onClick={() => handleClick(btn, ind)}>{btn?.text}</button>
                        {btn.actionType != 'url' && <div className="content-campaign-more-info" >
                            <div className="heading-block-info">
                                <h1>{btn?.text}</h1>
                                <button onClick={() => removeButton(ind)}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M18 6L6 18M6 6L18 18" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                            </div>
                            <p dangerouslySetInnerHTML={{ __html: btn.message }}></p>
                        </div>}
                    </div>
                ))}
            </div>
        )
    }
}

class PWCButtonTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(Button, msgData, this.hostInstance);
    }

}

export default PWCButtonTemplate;
