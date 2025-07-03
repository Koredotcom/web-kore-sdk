import { h } from 'preact';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartData } from './types';

interface LineChartTemplateProps {
    data: ChartData;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const LineChartTemplate = ({ data }: LineChartTemplateProps) => {
    return (
        <div style={{ width: '100%', height: 300, fontFamily: 'sans-serif', border: '1px solid #eee', padding: '10px', boxSizing: 'border-box', overflowX: 'auto' }}>
            <h4 style={{textAlign:'center', margin:'0 0 10px 0'}}>{data.title}</h4>
            <ResponsiveContainer width="100%" height="90%">
                <LineChart data={data.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={data.xKey} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {data.series?.map((series, index) => (
                        <Line
                            key={series.name}
                            type="monotone"
                            dataKey={series.key}
                            name={series.name}
                            stroke={COLORS[index % COLORS.length]}
                            activeDot={{ r: 8 }}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineChartTemplate; 