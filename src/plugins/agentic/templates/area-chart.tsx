import { h } from 'preact';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartData } from './types';

interface AreaChartTemplateProps {
    data: ChartData;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const AreaChartTemplate = ({ data }: AreaChartTemplateProps) => {
    return (
        <div style={{ width: '100%', height: 300, fontFamily: 'sans-serif', border: '1px solid #eee', padding: '10px', boxSizing: 'border-box', overflowX: 'auto' }}>
            <h4 style={{textAlign:'center', margin:'0 0 10px 0'}}>{data.title}</h4>
            <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={data.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={data.xKey} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {data.series?.map((series, index) => (
                        <Area
                            key={series.name}
                            type="monotone"
                            dataKey={series.key}
                            name={series.name}
                            stroke={COLORS[index % COLORS.length]}
                            fill={COLORS[index % COLORS.length]}
                            fillOpacity={0.6}
                        />
                    ))}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AreaChartTemplate; 