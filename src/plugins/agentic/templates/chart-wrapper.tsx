import { h, render } from 'preact';
import { ChartData } from './types';
import BarChartTemplate from './bar-chart';
import LineChartTemplate from './line-chart';
import PieChartTemplate from './pie-chart';
import AreaChartTemplate from './area-chart';
import ScatterChartTemplate from './scatter-chart';
import RadarChartTemplate from './radar-chart';
import ComposedChartTemplate from './composed-chart';
import MarkdownRenderer from './markdown-renderer';

class AgenticChartWrapper {
    name = 'AgenticChartWrapper';
    hostInstance: any;

    renderMessage(message: any) {
        const payload = message?.message?.length > 0 && message.message[0]?.component?.payload;
        if (!payload || !payload.agentic) {
            return ''; // Not our template
        }

        const text = payload.text || '';
        const regex = /```\s*\n?\s*chart\s*([\s\S]*?)\s*```/g;
        regex.lastIndex = 0;
        const match = regex.exec(text);

        // If no chart is found, just render the whole content as markdown and we're done.
        if (!match || !match[1]) {
            const container = document.createElement('div');
            render(h(MarkdownRenderer, { content: text, hostInstance: this.hostInstance }), container);
            return container;
        }

        // --- Chart Found: Proceed with before/chart/after layout ---

        const beforeText = text.substring(0, match.index).trim();
        const afterText = text.substring(match.index + match[0].length).trim();
        const chartJsonString = match[1];

        let chartData: ChartData;
        try {
            chartData = JSON.parse(chartJsonString);
        } catch (e) {
            console.error("AgenticPlugin: Invalid chart JSON. Falling back to markdown.", e);
            // If JSON is invalid, just render the whole thing as markdown.
            const container = document.createElement('div');
            render(h(MarkdownRenderer, { content: text, hostInstance: this.hostInstance }), container);
            return container;
        }

        const mainContainer = document.createElement('div');
        mainContainer.className = 'agentic-message-container';
        mainContainer.style.padding = '0px 4px';
        mainContainer.style.margin = '12px 0 8px 0';

        if (beforeText) {
            const beforeDiv = document.createElement('div');
            render(h(MarkdownRenderer, { content: beforeText, hostInstance: this.hostInstance }), beforeDiv);
            mainContainer.appendChild(beforeDiv);
        }

        const chartContainer = document.createElement('div');
        chartContainer.className = 'agentic-chart-container';

        let chartComponent;
        switch (chartData.type) {
            case 'pie':
                const showChartButton = document.createElement('button');
                showChartButton.textContent = 'Show Chart';
                Object.assign(showChartButton.style, {
                    background: 'var(--sdk-global-theme-color)',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontFamily: 'var(--global-font-family)',
                    fontSize: '14px'
                });

                showChartButton.onclick = () => {
                    const pieChartContainer = document.createElement('div');
                    pieChartContainer.style.width = '100%';
                    pieChartContainer.style.height = '450px';
                    render(h(PieChartTemplate, { data: chartData }), pieChartContainer);
                    this.hostInstance.modalAction(pieChartContainer);
                };
                chartContainer.appendChild(showChartButton);
                break;
            case 'bar':
                chartComponent = h(BarChartTemplate, { data: chartData });
                break;
            case 'line':
                chartComponent = h(LineChartTemplate, { data: chartData });
                break;
            case 'area':
                chartComponent = h(AreaChartTemplate, { data: chartData });
                break;
            case 'scatter':
                chartComponent = h(ScatterChartTemplate, { data: chartData });
                break;
            case 'radar':
                chartComponent = h(RadarChartTemplate, { data: chartData });
                break;
            case 'composed':
                chartComponent = h(ComposedChartTemplate, { data: chartData });
                break;
            // TODO: Add cases for other chart types (radialBar, treemap, etc.)
            default:
                // Fallback for unsupported chart types
                chartContainer.innerHTML = `<div style="font-family: sans-serif; color: red; padding: 10px;">Unsupported chart type: <strong>${chartData.type}</strong></div>`;
        }

        if (chartComponent) {
            render(chartComponent, chartContainer);
        }
        mainContainer.appendChild(chartContainer);
        
        if (afterText) {
            const afterDiv = document.createElement('div');
            render(h(MarkdownRenderer, { content: afterText, hostInstance: this.hostInstance }), afterDiv);
            mainContainer.appendChild(afterDiv);
        }

        return mainContainer;
    }
}

export default AgenticChartWrapper; 