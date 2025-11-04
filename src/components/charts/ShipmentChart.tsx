'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const shipmentTrendData = [
  { month: 'Jan', shipped: 145, delivered: 142, pending: 3 },
  { month: 'Feb', shipped: 167, delivered: 165, pending: 2 },
  { month: 'Mar', shipped: 189, delivered: 184, pending: 5 },
  { month: 'Apr', shipped: 203, delivered: 198, pending: 5 },
  { month: 'May', shipped: 221, delivered: 218, pending: 3 },
  { month: 'Jun', shipped: 234, delivered: 230, pending: 4 }
]

const shipmentStatusData = [
  { name: 'Delivered', value: 85, color: '#10b981' },
  { name: 'In Transit', value: 12, color: '#3b82f6' },
  { name: 'Pending', value: 3, color: '#f59e0b' }
]

export default function ShipmentChart() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      <div className='bg-white rounded-xl shadow-lg p-6'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>Shipment Trends</h3>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={shipmentTrendData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='month' />
            <YAxis />
            <Tooltip />
            <Line type='monotone' dataKey='shipped' stroke='#3b82f6' strokeWidth={2} name='Shipped' />
            <Line type='monotone' dataKey='delivered' stroke='#10b981' strokeWidth={2} name='Delivered' />
            <Line type='monotone' dataKey='pending' stroke='#f59e0b' strokeWidth={2} name='Pending' />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className='bg-white rounded-xl shadow-lg p-6'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>Current Status Distribution</h3>
        <ResponsiveContainer width='100%' height={300}>
          <PieChart>
            <Pie
              data={shipmentStatusData}
              cx='50%'
              cy='50%'
              outerRadius={80}
              dataKey='value'
              label={({ name, percent }) => ${name} %}
            >
              {shipmentStatusData.map((entry, index) => (
                <Cell key={cell-} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
