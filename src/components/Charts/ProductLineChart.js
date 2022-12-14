import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const data = [
    {
        name: 'Monday',
        "Product 1": 5,
        "Product 2": 3,
    },
    {
        name: 'Tuesday',
        "Product 1": 4,
        "Product 2": 2,
    },
    {
        name: 'Wednesday',
        "Product 1": 8,
        "Product 2": 3,
    },
    {
        name: 'Thrusday',
        "Product 1": 4,
        "Product 2": 8,
    },
    {
        name: 'Friaday',
        "Product 1": 3,
        "Product 2": 7,
    },
    {
        name: 'Saturday',
        "Product 1": 5,
        "Product 2": 5,
    },
    {
        name: 'Sunday',
        "Product 1": 2,
        "Product 2": 4,
    },
];

function ProductLineChart(){
    return (
        <ResponsiveContainer width="100%" height={200}>
            <LineChart
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
            <Line type="linear" dataKey="Product 1" stroke="#007bff" activeDot={{ r: 8 }} />
            <Line type="linear" dataKey="Product 2" stroke="#dc3545" />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default ProductLineChart;