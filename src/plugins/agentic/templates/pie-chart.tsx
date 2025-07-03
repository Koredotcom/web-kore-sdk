import { h } from 'preact';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ChartData } from './types';

interface PieChartTemplateProps {
    data: ChartData;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const PieChartTemplate = ({ data }: PieChartTemplateProps) => {
    if (!data.yKey) {
        return <div style={{ fontFamily: 'sans-serif', color: 'red', padding: '10px' }}>Missing yKey for pie chart</div>;
    }
    return (
        <div style={{ width: '100%', height: 300, fontFamily: 'sans-serif', border: '1px solid #eee', padding: '10px', boxSizing: 'border-box' }}>
            <h4 style={{textAlign:'center', margin:'0 0 10px 0'}}>{data.title}</h4>
            <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                    <Pie
                        data={data.data}
                        dataKey={data.yKey}
                        nameKey={data.xKey || 'name'}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                    >
                        {data.data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChartTemplate; 