'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Access Control', score: 85 },
  { name: 'Data Protection', score: 92 },
  { name: 'Network Security', score: 78 },
  { name: 'Incident Response', score: 88 },
  { name: 'Risk Assessment', score: 94 }
]

export default function ControlsChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="score" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  )
}