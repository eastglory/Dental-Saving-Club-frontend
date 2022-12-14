import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'pro1',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'pro2',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'pro3',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'pro4',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
];

function ProductBarChart() {

    return (
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={data}
          margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
          }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar barSize={10} dataKey="pv" fill="#ffc107" />
        <Bar barSize={10} dataKey="uv" fill="#28a745" />
        </BarChart>
      </ResponsiveContainer>
    );
}

export default ProductBarChart;