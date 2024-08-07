import BaseChatTemplate from '../baseChatTemplate';
import './lineChart.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';
import KoreGraphAdapter from '../../../libs/kore-graph-adapter/KoreGraphAdapter';
import { getHTML } from '../../base/domManager';

export function LineChart(props: any) {
    const msgData = props.msgData;
    return (
        <div className="chart-template-wrapper line-chart-inline" id={`lc${msgData.messageId}`}>
            <div className="linechartDiv charts-body-info">
                <h1>{msgData?.message?.[0]?.component?.payload?.text}</h1>
                <div className="lineChartChildDiv" id={`linechart${msgData.messageId}`}></div>
            </div>
        </div>

    );
}

export function LineChartModal(props: any) {
    const msgData = props.msgData;
    return (
        <div className="chart-template-wrapper" id={`lc${msgData.messageId}`}>
            <div className="linechartDiv charts-body-info">
                <h1>{msgData?.message?.[0]?.component?.payload?.text}</h1>
                <div className="lineChartChildDiv" id={`linechartmodal${msgData.messageId}`}></div>
            </div>
        </div>
    );
}

export function LineChartBase(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageObj = {
        msgData,
        hostInstance
    }

    if (msgData?.message?.[0]?.component?.payload?.template_type == 'linechart') {
        const pieChartHTML = getHTML(LineChart, msgData, hostInstance);
        KoreGraphAdapter.drawlineChartTemplate(msgData, pieChartHTML, { graphLib: 'd3' });

        setTimeout(() => {
            hostInstance.chatEle.querySelector('.chat-widget-body-wrapper').scrollTo({
                top: hostInstance.chatEle.querySelector('.chat-widget-body-wrapper').scrollHeight,
                behavior: 'smooth'
            });
            const ele = hostInstance.chatEle.querySelector(`#lc${msgData.messageId}`);
            if (ele) {
                const lineChartHTMLModal = getHTML(LineChartModal, msgData, hostInstance);
                ele.addEventListener('click', (e: any) => {
                    hostInstance.modalAction(lineChartHTMLModal);
                    KoreGraphAdapter.openChartModal(msgData, `#linechartmodal${msgData.messageId}`);
                });
            }
        }, 400);

        return (
            <LineChart {...messageObj} />
        )
    }
}

class TemplateLineChart extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(LineChartBase, msgData, this.hostInstance);
    }
}

export default TemplateLineChart;

