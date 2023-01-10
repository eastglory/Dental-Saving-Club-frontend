import React, {useState, useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { InputSwitch } from 'primereact/inputswitch';
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
];

const COLORS = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#6c757d'];

function ProductLineChart(props){

    const [checked, setChecked] = useState(false)
    const [dataKey, setDataKey] = useState([])

    useEffect(() => {
        if(props.data[0]) setDataKey(Object.keys(props.data[0]).slice(1))
        console.log(props.data)
    }, [props])
    return (
        <>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart
                data={props.data}
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
                {
                    (checked ? dataKey : dataKey.filter(item => !item.includes('last year'))).map((item, index) => (
                        <Line key={item} type="linear" dataKey={item} stroke={COLORS[index % COLORS.length]} activeDot={{ r: 5 }} />
                    ))
                }
                </LineChart>
            </ResponsiveContainer>
            <div className="d-flex flex-row align-items-center justify-content-center">
                <InputSwitch className="mx-2" checked={checked} onChange={(e) => setChecked(e.value)} />
                <span>View last year</span>
            </div>
        </>
    )
}

export default ProductLineChart;