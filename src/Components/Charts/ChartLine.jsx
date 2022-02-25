import React from 'react'
import './chartLine.css'
import { LineChart, Line,CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function ChartLine({data, label, datakey, dataval}) {
  return (
    <div className="line-chart">
        <h3 className="line-chart-title">
            {label}
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={datakey} stroke="#141E61"/>
              <YAxis stroke="#141E61" />
              <Tooltip />
              <Legend />
              <Line dataKey={dataval} fill="#1597BB" />
          </LineChart>
        </ResponsiveContainer>
    </div>
  )
}
