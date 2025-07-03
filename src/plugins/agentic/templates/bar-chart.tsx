import { h } from 'preact';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartData } from './types';

interface BarChartTemplateProps {
    data: ChartData;
}

const BarChartTemplate = ({ data }: BarChartTemplateProps) => {
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
    const getColor = (index: number) => colors[index % colors.length];
    
    // Estimate a minimum width for the chart to make it scrollable if it overflows
    const barCategoryGap = 80; // Estimated width per bar category in pixels
    const minChartWidth = (data.data.length || 1) * barCategoryGap;

    return (
        <div style={{ 
            width: '100%', 
            height: 300, 
            fontFamily: 'sans-serif',
            border: '1px solid #eee',
            padding: '10px',
            boxSizing: 'border-box',
            overflowX: 'auto'
         }}>
            <h4 style={{textAlign:'center', margin:'0 0 10px 0'}}>{data.title}</h4>
            <ResponsiveContainer width="100%" height="90%" minWidth={minChartWidth}>
                <BarChart data={data.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={data.xKey} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {data.series && data.series.map((seriesItem, index) => (
                        <Bar key={seriesItem.key} dataKey={seriesItem.key} name={seriesItem.name} fill={getColor(index)} />
                    ))}
                    {/* For simple bar charts without series */}
                    {(!data.series && data.yKey) && (
                        <Bar dataKey={data.yKey} name={data.yName || data.yKey} fill={getColor(0)} />
                    )}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChartTemplate; 