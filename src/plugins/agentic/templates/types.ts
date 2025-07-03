export interface ChartData {
    type: 'line' | 'bar' | 'pie' | 'area' | 'scatter' | 'radar' | 'radialBar' | 'composed' | 'treemap' | 'sankey' | 'funnel';
    title: string;
    data: any[];
    xKey?: string;
    yKey?: string;
    zKey?: string;
    xName?: string;
    yName?: string;
    zName?: string;
    series?: Array<{ name: string; key: string }>;
  } 