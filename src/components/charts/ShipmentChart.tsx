'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Week 1', shipped: 45 },
  { name: 'Week 2', shipped: 52 },
  { name: 'Week 3', shipped: 38 },
  { name: 'Week 4', shipped: 61 },
  { name: 'Week 5', shipped: 48 }
]

export default function ShipmentChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="shipped" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} />
      </AreaChart>
    </ResponsiveContainer>
  )
}