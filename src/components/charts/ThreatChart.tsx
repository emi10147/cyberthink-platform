'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, Legend } from 'recharts'

const threatTrendData = [
  { date: '2024-10-01', malware: 15, phishing: 32, ddos: 8, insider: 3, apt: 2 },
  { date: '2024-10-08', malware: 18, phishing: 28, ddos: 12, insider: 5, apt: 1 },
  { date: '2024-10-15', malware: 22, phishing: 35, ddos: 6, insider: 2, apt: 3 },
  { date: '2024-10-22', malware: 19, phishing: 41, ddos: 9, insider: 4, apt: 2 },
  { date: '2024-10-29', malware: 25, phishing: 38, ddos: 15, insider: 3, apt: 4 }
]

const threatCategoryData = [
  { name: 'Phishing', value: 174, color: '#DC2626' },
  { name: 'Malware', value: 99, color: '#EA580C' },
  { name: 'DDoS', value: 50, color: '#D97706' },
  { name: 'Insider Threats', value: 17, color: '#7C3AED' },
  { name: 'APT', value: 12, color: '#1F2937' }
]

const riskExposureData = [
  { severity: 'Critical', count: 8, avgDays: 2.3 },
  { severity: 'High', count: 23, avgDays: 5.7 },
  { severity: 'Medium', count: 45, avgDays: 12.4 },
  { severity: 'Low', count: 78, avgDays: 28.1 }
]

export default function ThreatChart() {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return ${date.getMonth() + 1}/
  }

  const totalThreats = threatCategoryData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className='space-y-6'>
      {/* Threat Trends Over Time */}
      <div>
        <h4 className='text-md font-medium text-gray-700 mb-3'>Threat Activity (Last 30 Days)</h4>
        <ResponsiveContainer width='100%' height={200}>
          <AreaChart data={threatTrendData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis 
              dataKey='date' 
              tickFormatter={formatDate}
              tick={{ fontSize: 12 }}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(value) => Date: }
              formatter={(value, name) => [value, name.charAt(0).toUpperCase() + name.slice(1)]}
            />
            <Area type='monotone' dataKey='phishing' stackId='1' stroke='#DC2626' fill='#DC2626' fillOpacity={0.8} />
            <Area type='monotone' dataKey='malware' stackId='1' stroke='#EA580C' fill='#EA580C' fillOpacity={0.8} />
            <Area type='monotone' dataKey='ddos' stackId='1' stroke='#D97706' fill='#D97706' fillOpacity={0.8} />
            <Area type='monotone' dataKey='insider' stackId='1' stroke='#7C3AED' fill='#7C3AED' fillOpacity={0.8} />
            <Area type='monotone' dataKey='apt' stackId='1' stroke='#1F2937' fill='#1F2937' fillOpacity={0.8} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Threat Category Distribution */}
      <div>
        <h4 className='text-md font-medium text-gray-700 mb-3'>Threat Categories (This Month)</h4>
        <div className='grid grid-cols-2 gap-4'>
          <ResponsiveContainer width='100%' height={200}>
            <PieChart>
              <Pie
                data={threatCategoryData}
                cx='50%'
                cy='50%'
                outerRadius={70}
                fill='#8884d8'
                dataKey='value'
                label={({ name, percent }) => ${(percent * 100).toFixed(0)}%}
              >
                {threatCategoryData.map((entry, index) => (
                  <Cell key={cell-} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [${value} threats, 'Count']} />
            </PieChart>
          </ResponsiveContainer>
          
          <div className='space-y-2'>
            {threatCategoryData.map((threat, index) => (
              <div key={index} className='flex items-center justify-between p-2 bg-gray-50 rounded'>
                <div className='flex items-center space-x-2'>
                  <div 
                    className='w-3 h-3 rounded-full'
                    style={{ backgroundColor: threat.color }}
                  ></div>
                  <span className='text-sm font-medium'>{threat.name}</span>
                </div>
                <div className='text-right'>
                  <div className='text-sm font-bold'>{threat.value}</div>
                  <div className='text-xs text-gray-500'>
                    {((threat.value / totalThreats) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk Exposure Matrix */}
      <div>
        <h4 className='text-md font-medium text-gray-700 mb-3'>Risk Exposure & Response Times</h4>
        <div className='grid grid-cols-4 gap-3'>
          {riskExposureData.map((risk, index) => {
            const getSeverityColor = (severity: string) => {
              switch(severity) {
                case 'Critical': return 'bg-red-100 border-red-300 text-red-800'
                case 'High': return 'bg-orange-100 border-orange-300 text-orange-800'
                case 'Medium': return 'bg-yellow-100 border-yellow-300 text-yellow-800'
                case 'Low': return 'bg-green-100 border-green-300 text-green-800'
                default: return 'bg-gray-100 border-gray-300 text-gray-800'
              }
            }

            return (
              <div key={index} className={p-3 rounded-lg border-2 }>
                <div className='text-center'>
                  <div className='text-lg font-bold'>{risk.count}</div>
                  <div className='text-xs font-medium'>{risk.severity} Risks</div>
                  <div className='text-xs mt-1'>Avg: {risk.avgDays}d</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Threat Intelligence Summary */}
      <div className='bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-4 border border-red-200'>
        <h4 className='text-md font-semibold text-red-800 mb-2 flex items-center'>
          <span className='mr-2'></span>
          Active Threat Intelligence
        </h4>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-3 text-sm'>
          <div>
            <span className='font-medium text-red-700'>High Priority:</span>
            <div className='text-red-600'>New ransomware campaign targeting healthcare sector</div>
          </div>
          <div>
            <span className='font-medium text-orange-700'>Medium Priority:</span>
            <div className='text-orange-600'>Phishing campaign using AI-generated content detected</div>
          </div>
          <div>
            <span className='font-medium text-yellow-700'>Monitoring:</span>
            <div className='text-yellow-600'>Increased DDoS activity from known threat groups</div>
          </div>
        </div>
      </div>
    </div>
  )
}
