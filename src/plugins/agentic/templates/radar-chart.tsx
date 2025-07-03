import { h } from 'preact';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartData } from './types';

interface RadarChartTemplateProps {
    data: ChartData;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const RadarChartTemplate = ({ data }: RadarChartTemplateProps) => {
    return (
        <div style={{ width: '100%', height: 300, fontFamily: 'sans-serif', border: '1px solid #eee', padding: '10px', boxSizing: 'border-box' }}>
            <h4 style={{ textAlign: 'center', margin: '0 0 10px 0' }}>{data.title}</h4>
            <ResponsiveContainer width="100%" height="90%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey={data.xKey} />
                    <PolarRadiusAxis />
                    <Tooltip />
                    <Legend />
                    {data.series?.map((series, index) => (
                        <Radar
                            key={series.name}
                            name={series.name}
                            dataKey={series.key}
                            stroke={COLORS[index % COLORS.length]}
                            fill={COLORS[index % COLORS.length]}
                            fillOpacity={0.6}
                        />
                    ))}
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RadarChartTemplate; 