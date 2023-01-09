import React, {useState, useEffect} from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Dropdown } from 'primereact/dropdown'


function ProductBarChart(props) {

  const [drop, setDrop] = useState('')

  useEffect(() => {
    if(props.default) setDrop(props.default)
  }, [])

  return (
    <>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={props.data}
          margin={{
          top: 5,
          bottom: 5,
          }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar barSize={5} dataKey={drop} fill="#007bff" />
        </BarChart>
      </ResponsiveContainer>
      <Dropdown className="float-right" value={drop} options={props.dropdown} onChange={(e) => setDrop(e.value)}/>
    </>
    
  );
}

export default ProductBarChart;