'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Week 1', threats: 24 },
  { name: 'Week 2', threats: 18 },
  { name: 'Week 3', threats: 32 },
  { name: 'Week 4', threats: 15 },
  { name: 'Week 5', threats: 28 }
]

export default function ThreatChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="threats" stroke="#ef4444" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}