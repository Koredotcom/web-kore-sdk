import BaseChatTemplate from '../baseChatTemplate';
import './barChart.scss';
import { h, Fragment } from 'preact';
import KoreGraphAdapter from '../../../libs/kore-graph-adapter/KoreGraphAdapter';
import { getHTML } from '../../base/domManager';
import KoreHelpers from '../../../utils/helpers';

export function BarChart(props: any) {
    const msgData = props.msgData;
    const helpers = KoreHelpers.helpers;
    return (
        <div className="chart-template-wrapper" id={`bc${msgData.messageId}`} data-cw-msg-id={msgData?.messageId}>
            <div className="barchartDiv charts-body-info">
                <h1 dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(msgData?.message?.[0]?.component?.payload?.text, "bot") }}></h1>
                <div className="barChartChildDiv" id={`barchart${msgData.messageId}`}></div>
            </div>
        </div>

    );
}

export function BarChartModal(props: any) {
    const msgData = props.msgData;
    const helpers = KoreHelpers.helpers;
    return (
        <div className="chart-template-wrapper" id={`bc${msgData.messageId}`}>
            <div className="barchartDiv charts-body-info">
                <h1 dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(msgData?.message?.[0]?.component?.payload?.text, "bot") }}></h1>
                <div className="barChartChildDiv" id={`barchartmodal${msgData.messageId}`}></div>
            </div>
        </div>
    );
}

export function BarChartBase(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageObj = {
        msgData,
        hostInstance
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'barchart') {
        // Check if element already exists
        const existingElement = hostInstance?.chatEle?.querySelector(`[data-cw-msg-id="${msgData?.messageId}"]`);
        if (existingElement) {
            return; // Exit if element already exists
        }
        const pieChartHTML = getHTML(BarChart, msgData, hostInstance);
        KoreGraphAdapter.drawBarChartTemplate(msgData, pieChartHTML, { graphLib: 'd3' });

        setTimeout(() => {
            hostInstance.chatEle.querySelector('.chat-widget-body-wrapper')?.scrollTo({
                top: hostInstance.chatEle.querySelector('.chat-widget-body-wrapper').scrollHeight,
                behavior: 'smooth'
            });
            const ele = hostInstance.chatEle.querySelector(`#bc${msgData.messageId}`);
            if (ele) {
                const barChartHTMLModal = getHTML(BarChartModal, msgData, hostInstance);
                ele.addEventListener('click', (e: any) => {
                    hostInstance.modalAction(barChartHTMLModal);
                    KoreGraphAdapter.openChartModal(msgData, `#barchartmodal${msgData.messageId}`);
                });
            }
        }, 400);

        return (
            <BarChart {...messageObj} />
        )
    }
}

class TemplateBarChart extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(BarChartBase, msgData, this.hostInstance);
    }
}

export default TemplateBarChart;

