import React, {useState, useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { InputSwitch } from 'primereact/inputswitch';
import { Checkbox } from 'primereact/checkbox';
import { RadioButton } from 'primereact/radiobutton'


const COLORS = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#6c757d'];

function ProductLineChart(props){

    const [yaq, setYAQ] = useState(false)
    const [lastView, setLastView] = useState(false)
    const [dataKey, setDataKey] = useState([])
    const [quater, setQuater] = useState(1)
    const [data, setData] = useState([])

    useEffect(() => {
        if(!yaq) {
            let _data = props.data.map(item => ({name: item.name}))
            props.data.forEach((item, index) => {
                Object.keys(item.current).forEach((key) => {
                    _data[index][key] = item.current[key]
                    if(lastView) _data[index][`${key}(last year)`] = item.last[key]
                })
            })
            setData(_data)
        }

        if(yaq) {
            let _data = [{name: "First Month"}, {name: "Second Month"}, {name: "Third Month"}]

            _data.forEach((item, index) => {
                Object.keys(props.data[0].current).forEach((key) => {
                    _data[index][key] = props.data[index + (quater - 1) * 3].current[key]
                    if(lastView) _data[index][`${key}(last quater)`] = quater == 1 ? props.data[index + 9].last[key] : props.data[index + (quater - 2) * 3].current[key]
                })
            })
            setData(_data)
        }
    }, [props, yaq, lastView, quater])
    return (
        <>
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
                {
                    data.length && (Object.keys(data[0]).slice(1)).map((item, index) => (
                        <Line key={item} type="linear" dataKey={item} stroke={COLORS[index % COLORS.length]} activeDot={{ r: 5 }} />
                    ))
                }
                </LineChart>
            </ResponsiveContainer>
            <div className="d-flex flex-row align-items-center justify-content-between">
                <div className="d-flex flex-row align-items-center justify-content-center">
                    <span>Year</span>
                    <InputSwitch className="mx-2" checked={yaq} onChange={(e) => setYAQ(e.value)} />
                    <span>Quater</span>
                </div>
                {
                    yaq ? (
                        <div className="d-flex flex-row align-items-center justify-content-center">
                            <RadioButton value={1} onChange={(e) => setQuater(e.value)} checked={quater === 1} />
                            <label className="mr-2">Q1</label>
                            <RadioButton value={2} onChange={(e) => setQuater(e.value)} checked={quater === 2} />
                            <label className="mr-2">Q2</label>
                            <RadioButton value={3} onChange={(e) => setQuater(e.value)} checked={quater === 3} />
                            <label className="mr-2">Q3</label>
                            <RadioButton value={4} onChange={(e) => setQuater(e.value)} checked={quater === 4} />
                            <label className="mr-2">Q4</label>
                        </div>
                    ) : <></>
                }
                <div className="d-flex flex-row align-items-center justify-content-center">
                    <Checkbox inputId="binary" checked={lastView} onChange={e => setLastView(e.checked)} />
                    <span>View Last {yaq ? "Quater" : "Year"}</span>
                </div>
            </div>
        </>
    )
}

export default ProductLineChart;