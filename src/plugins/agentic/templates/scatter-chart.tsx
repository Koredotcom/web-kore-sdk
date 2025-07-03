import { h } from 'preact';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ZAxis } from 'recharts';
import { ChartData } from './types';

interface ScatterChartTemplateProps {
    data: ChartData;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const ScatterChartTemplate = ({ data }: ScatterChartTemplateProps) => {
    return (
        <div style={{ width: '100%', height: 300, fontFamily: 'sans-serif', border: '1px solid #eee', padding: '10px', boxSizing: 'border-box' }}>
            <h4 style={{ textAlign: 'center', margin: '0 0 10px 0' }}>{data.title}</h4>
            <ResponsiveContainer width="100%" height="90%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid />
                    <XAxis type="number" dataKey={data.xKey} name={data.xName || 'x'} />
                    <YAxis type="number" dataKey={data.yKey} name={data.yName || 'y'} />
                    {data.zKey && <ZAxis type="number" dataKey={data.zKey} range={[10, 500]} name={data.zName || 'z'} />}
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    <Scatter name={data.title} data={data.data} fill={COLORS[0]} />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ScatterChartTemplate; 