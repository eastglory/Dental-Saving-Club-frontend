import React from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Group A', value: 1 },
  { name: 'Group B', value: 0 },
  { name: 'Group C', value: 0 },
  { name: 'Group D', value: 0 },
];

const COLORS = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#6c757d'];

const RADIAN = Math.PI / 180;

export default function CustomPieChart(props){

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
        return (
          <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${[props.data[index].value]}`}
          </text>
        );
      };
    
    
    return (
        <ResponsiveContainer width="100%" height={280}>
        <PieChart>
            <Pie
            data={props.data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            >
            {props.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            </Pie>
            <Legend />
        </PieChart>
        </ResponsiveContainer>
    );
}
