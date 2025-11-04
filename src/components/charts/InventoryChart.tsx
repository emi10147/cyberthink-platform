'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const inventoryData = [
  { name: 'Electronics', current: 250, minimum: 300, status: 'low' },
  { name: 'Hardware', current: 180, minimum: 200, status: 'critical' },
  { name: 'Supplies', current: 450, minimum: 300, status: 'good' },
  { name: 'Components', current: 320, minimum: 250, status: 'good' },
  { name: 'Tools', current: 150, minimum: 200, status: 'low' }
]

const getBarColor = (status: string) => {
  switch (status) {
    case 'critical': return '#ef4444'
    case 'low': return '#f59e0b'
    case 'good': return '#10b981'
    default: return '#6b7280'
  }
}

export default function InventoryChart() {
  return (
    <div className='bg-white rounded-xl shadow-lg p-6'>
      <h3 className='text-lg font-semibold text-gray-900 mb-4'>Inventory Levels by Category</h3>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={inventoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => [value, name === 'current' ? 'Current Stock' : 'Minimum Required']}
            labelFormatter={(label) => Category: }
          />
          <Bar dataKey='minimum' fill='#e5e7eb' name='minimum' />
          <Bar dataKey='current' name='current'>
            {inventoryData.map((entry, index) => (
              <Cell key={cell-} fill={getBarColor(entry.status)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
