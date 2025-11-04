'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const ordersData = [
  { date: '2024-10-01', inbound: 45, outbound: 38, pending: 7 },
  { date: '2024-10-02', inbound: 52, outbound: 41, pending: 11 },
  { date: '2024-10-03', inbound: 38, outbound: 35, pending: 3 },
  { date: '2024-10-04', inbound: 67, outbound: 58, pending: 9 },
  { date: '2024-10-05', inbound: 71, outbound: 65, pending: 6 },
  { date: '2024-10-06', inbound: 59, outbound: 54, pending: 5 },
  { date: '2024-10-07', inbound: 48, outbound: 43, pending: 5 }
]

const orderTypeData = [
  { type: 'Regular', count: 145, percentage: 65 },
  { type: 'Priority', count: 58, percentage: 26 },
  { type: 'Express', count: 20, percentage: 9 }
]

export default function OrdersChart() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      <div className='bg-white rounded-xl shadow-lg p-6'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>Order Flow (Last 7 Days)</h3>
        <ResponsiveContainer width='100%' height={300}>
          <AreaChart data={ordersData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis 
              dataKey='date' 
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            />
            <Area type='monotone' dataKey='inbound' stackId='1' stroke='#3b82f6' fill='#3b82f6' fillOpacity={0.6} name='Inbound' />
            <Area type='monotone' dataKey='outbound' stackId='1' stroke='#10b981' fill='#10b981' fillOpacity={0.6} name='Outbound' />
            <Area type='monotone' dataKey='pending' stackId='1' stroke='#f59e0b' fill='#f59e0b' fillOpacity={0.6} name='Pending' />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className='bg-white rounded-xl shadow-lg p-6'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>Order Types Distribution</h3>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={orderTypeData} layout='horizontal'>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis type='number' />
            <YAxis dataKey='type' type='category' />
            <Tooltip 
              formatter={(value, name) => [value, name === 'count' ? 'Orders' : name]}
            />
            <Bar dataKey='count' fill='#6366f1' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
