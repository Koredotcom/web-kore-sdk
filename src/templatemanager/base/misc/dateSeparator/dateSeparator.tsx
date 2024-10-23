import './dateSeparator.scss';
import { h } from 'preact';
import { useState } from 'preact/hooks';
export function DateSeparator(props: any) {
    const text = props.msgData.text;
    const type = props.msgData.type
    const hostInstance = props.hostInstance;
    const [brandingInfo, updateBrandingInfo] = useState(hostInstance.config.branding);
    hostInstance.on('onBrandingUpdate', function (event: any) {
        updateBrandingInfo({...event.brandingData})
    });
    const dsStyle: any = {
        line: 'date-saperator',
        rounded: 'date-saperator date-saperator-1',
        rectangle: 'date-saperator date-saperator-2', 
    }

    return (
        <div className={type + ' ' + dsStyle[brandingInfo.body.time_stamp.separator]}>
            <div className="line-border"></div>
            <div className="date-text">{text}</div>
            <div className="line-border"></div>
        </div>
    );
}