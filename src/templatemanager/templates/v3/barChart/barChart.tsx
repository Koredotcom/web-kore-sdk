import BaseChatTemplate from '../baseChatTemplate';
import './barChart.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Message } from '../message/message';
import KoreGraphAdapter from '../../../../libs/kore-graph-adapter/KoreGraphAdapter';
import { getHTML } from '../../../base/domManager';

export function BarChart(props: any) {
    const msgData = props.msgData;
    return (
        <div className="chart-template-wrapper" id={`bc${msgData.messageId}`}>
            <div className="barchartDiv charts-body-info">
                <h1>{msgData?.message?.[0]?.component?.payload?.text}</h1>
                <div className="barChartChildDiv" id={`barchart${msgData.messageId}`}></div>
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
        const pieChartHTML = getHTML(BarChart, msgData, hostInstance);
        KoreGraphAdapter.drawBarChartTemplate(msgData, pieChartHTML, { graphLib: 'd3' });

        setTimeout(() => {
            hostInstance.chatEle.querySelector('.chat-widget-body-wrapper').scrollTo({
                top: hostInstance.chatEle.querySelector('.chat-widget-body-wrapper').scrollHeight,
                behavior: 'smooth'
            });
            const ele = hostInstance.chatEle.querySelector(`#bc${msgData.messageId}`);
            if (ele) {
                const eleCopy = ele.cloneNode(true); 
                ele.addEventListener('click', (e: any) => {
                    hostInstance.modalAction(eleCopy);
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

