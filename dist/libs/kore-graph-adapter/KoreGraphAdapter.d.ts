export default KoreGraphAdapter;
declare namespace KoreGraphAdapter {
    export { drawD3Pie };
    export { drawD3PieDonut };
    export { drawD3barChart };
    export { drawD3barStackedChart };
    export { drawD3barVerticalStackedChart };
    export { drawD3barHorizontalbarChart };
    export { drawD3lineChartV2 };
    export { drawlineChartTemplate };
    export { drawBarChartTemplate };
    export { drawPieChartTemplate };
    export { handleChartOnClick };
    export { zoomChart };
}
declare function drawD3Pie(msgData: any, dimens: any, selection: any, scaleLegend: any): void;
declare function drawD3PieDonut(msgData: any, dimens: any, selection: any, scaleLegend: any, chart_type: any): void;
declare function drawD3barChart(msgData: any, dimens: any, selection: any, scaleLegend: any): void;
declare function drawD3barStackedChart(msgData: any, dimens: any, selection: any, scaleLegend: any): void;
declare function drawD3barVerticalStackedChart(msgData: any, dimens: any, selection: any, scaleLegend: any): void;
declare function drawD3barHorizontalbarChart(msgData: any, dimens: any, selection: any, scaleLegend: any): void;
declare function drawD3lineChartV2(msgData: any, dimens: any, selection: any, scaleLegend: any): void;
declare function drawlineChartTemplate(msgData: any, element: any, config: any): void;
declare function drawBarChartTemplate(msgData: any, element: any, config: any): void;
declare function drawPieChartTemplate(msgData: any, element: any, config: any): void;
declare function handleChartOnClick(): void;
declare function zoomChart(): void;
