import { h } from 'preact';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartData } from './types';

interface ComposedChartTemplateProps {
    data: ChartData;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const ComposedChartTemplate = ({ data }: ComposedChartTemplateProps) => {
    return (
        <div style={{ width: '100%', height: 300, fontFamily: 'sans-serif', border: '1px solid #eee', padding: '10px', boxSizing: 'border-box', overflowX: 'auto' }}>
            <h4 style={{ textAlign: 'center', margin: '0 0 10px 0' }}>{data.title}</h4>
            <ResponsiveContainer width="100%" height="90%">
                <ComposedChart data={data.data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey={data.xKey} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {/* The reference seems to imply that a composed chart would render all series as both lines and bars. This might not always be desired.
                        Here we assume the first half of the series are bars and the second half are lines for variety.
                        A more robust implementation might require a 'type' property on the series object itself.
                    */}
                    {data.series?.map((series, index) => {
                        if (index % 2 === 0) {
                            return <Bar key={`bar-${series.key}`} dataKey={series.key} name={series.name} fill={COLORS[index % COLORS.length]} />;
                        } else {
                            return <Line key={`line-${series.key}`} type="monotone" dataKey={series.key} name={series.name} stroke={COLORS[index % COLORS.length]} />;
                        }
                    })}
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ComposedChartTemplate; 