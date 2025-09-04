import BaseChatTemplate from '../baseChatTemplate';
import './pieChart.scss';
import { h, Fragment } from 'preact';
import KoreGraphAdapter from '../../../libs/kore-graph-adapter/KoreGraphAdapter';
import { getHTML } from '../../base/domManager';
import KoreHelpers from '../../../utils/helpers';

export function PieChart(props: any) {
    const msgData = props.msgData;
    const helpers = KoreHelpers.helpers;
    return (
        <div className="chart-template-wrapper" id={`pc${msgData.messageId}`} data-cw-msg-id={msgData?.messageId}>
            <div id="d3Pie"></div>
            <div className="piechartDiv charts-body-info">
                {msgData?.message?.[0]?.component?.payload?.text && <h1 dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(msgData?.message?.[0]?.component?.payload?.text, "bot") }}></h1>}
                <div className="lineChartChildDiv" id={`piechart${msgData.messageId}`}></div>
            </div>
        </div>

    );
}

export function PieChartModal(props: any) {
    const msgData = props.msgData;
    const helpers = KoreHelpers.helpers;
    return (
        <div className="chart-template-wrapper" id={`pcmodal${msgData.messageId}`}>
            <div id="d3Pie"></div>
            <div className="piechartDiv charts-body-info">
                {msgData?.message?.[0]?.component?.payload?.text && <h1 dangerouslySetInnerHTML={{ __html: helpers.convertMDtoHTML(msgData?.message?.[0]?.component?.payload?.text, "bot") }}></h1>}
                <div className="lineChartChildDiv" id={`piechartmodal${msgData.messageId}`}></div>
            </div>
        </div>
    );
}

export function PieChartBase(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageObj = {
        msgData,
        hostInstance
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'piechart') {
        // Check if element already exists
        const existingElement = hostInstance?.chatEle?.querySelector(`[data-cw-msg-id="${msgData?.messageId}"]`);
        if (existingElement) {
            return; // Exit if element already exists
        }
        const pieChartHTML = getHTML(PieChart, msgData, hostInstance);
        KoreGraphAdapter.drawPieChartTemplate(msgData, pieChartHTML, { graphLib: 'd3' });

        setTimeout(() => {
            hostInstance.chatEle.querySelector('.chat-widget-body-wrapper')?.scrollTo({
                top: hostInstance.chatEle.querySelector('.chat-widget-body-wrapper').scrollHeight,
                behavior: 'smooth'
            });
            const ele = hostInstance.chatEle.querySelector(`#pc${msgData.messageId}`);
            if (ele) {
                const pieChartHTMLModal = getHTML(PieChartModal, msgData, hostInstance);
                ele.addEventListener('click', (e: any) => {
                    hostInstance.modalAction(pieChartHTMLModal);
                    KoreGraphAdapter.openChartModal(msgData, `#piechartmodal${msgData.messageId}`);
                });
            }
        }, 200);

        return (
            <PieChart {...messageObj} />
        )
    }
}

class TemplatePieChart extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(PieChartBase, msgData, this.hostInstance);
    }
}

export default TemplatePieChart;

