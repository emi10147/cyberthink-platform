'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

const riskDistributionData = [
  { name: 'Critical', value: 12, color: '#DC2626' },
  { name: 'High', value: 25, color: '#EA580C' },
  { name: 'Medium', value: 48, color: '#D97706' },
  { name: 'Low', value: 89, color: '#16A34A' },
  { name: 'Informational', value: 145, color: '#3B82F6' }
]

const riskTrendData = [
  { month: 'Jan', critical: 8, high: 20, medium: 45, low: 82 },
  { month: 'Feb', critical: 10, high: 22, medium: 50, low: 85 },
  { month: 'Mar', critical: 15, high: 28, medium: 52, low: 88 },
  { month: 'Apr', critical: 12, high: 25, medium: 48, low: 89 },
]

export default function RiskChart() {
  return (
    <div className='space-y-6'>
      {/* Risk Distribution Pie Chart */}
      <div>
        <h4 className='text-md font-medium text-gray-700 mb-3'>Current Risk Distribution</h4>
        <ResponsiveContainer width='100%' height={250}>
          <PieChart>
            <Pie
              data={riskDistributionData}
              cx='50%'
              cy='50%'
              labelLine={false}
              label={({ name, percent }) => ${name} (%)}
              outerRadius={80}
              fill='#8884d8'
              dataKey='value'
            >
              {riskDistributionData.map((entry, index) => (
                <Cell key={cell-} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [${value} risks, 'Count']} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Risk Trend Bar Chart */}
      <div>
        <h4 className='text-md font-medium text-gray-700 mb-3'>Risk Trend (Last 4 Months)</h4>
        <ResponsiveContainer width='100%' height={200}>
          <BarChart data={riskTrendData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='month' />
            <YAxis />
            <Tooltip />
            <Bar dataKey='critical' stackId='a' fill='#DC2626' name='Critical' />
            <Bar dataKey='high' stackId='a' fill='#EA580C' name='High' />
            <Bar dataKey='medium' stackId='a' fill='#D97706' name='Medium' />
            <Bar dataKey='low' stackId='a' fill='#16A34A' name='Low' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
