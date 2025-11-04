'use client'

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts'

const controlsMaturityData = [
  { category: 'Access Control', maturity: 85, target: 90 },
  { category: 'Asset Management', maturity: 78, target: 85 },
  { category: 'Incident Response', maturity: 92, target: 95 },
  { category: 'Network Security', maturity: 88, target: 90 },
  { category: 'Data Protection', maturity: 75, target: 85 },
  { category: 'Vulnerability Mgmt', maturity: 82, target: 88 }
]

const cisControlsData = [
  { name: 'CIS-1: Inventory', implemented: 95, documented: 90, automated: 75, reported: 85 },
  { name: 'CIS-2: Software', implemented: 88, documented: 85, automated: 70, reported: 80 },
  { name: 'CIS-3: Data Protection', implemented: 82, documented: 80, automated: 65, reported: 75 },
  { name: 'CIS-4: Secure Config', implemented: 90, documented: 88, automated: 80, reported: 85 },
  { name: 'CIS-5: Account Mgmt', implemented: 93, documented: 90, automated: 85, reported: 88 },
  { name: 'CIS-6: Access Control', implemented: 87, documented: 85, automated: 78, reported: 82 }
]

export default function ControlsChart() {
  const getMaturityColor = (maturity: number, target: number) => {
    const percentage = (maturity / target) * 100
    if (percentage >= 95) return '#16A34A' // green
    if (percentage >= 80) return '#D97706' // yellow
    return '#DC2626' // red
  }

  return (
    <div className='space-y-6'>
      {/* Controls Maturity Radar Chart */}
      <div>
        <h4 className='text-md font-medium text-gray-700 mb-3'>Security Controls Maturity</h4>
        <ResponsiveContainer width='100%' height={250}>
          <RadarChart data={controlsMaturityData}>
            <PolarGrid />
            <PolarAngleAxis dataKey='category' tick={{ fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name='Current Maturity'
              dataKey='maturity'
              stroke='#3B82F6'
              fill='#3B82F6'
              fillOpacity={0.3}
            />
            <Radar
              name='Target'
              dataKey='target'
              stroke='#10B981'
              fill='#10B981'
              fillOpacity={0.1}
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* CIS Controls Assessment */}
      <div>
        <h4 className='text-md font-medium text-gray-700 mb-3'>CIS Critical Controls Assessment</h4>
        <div className='space-y-3'>
          {cisControlsData.map((control, index) => {
            const avgScore = (control.implemented + control.documented + control.automated + control.reported) / 4
            return (
              <div key={index} className='bg-gray-50 rounded-lg p-3'>
                <div className='flex justify-between items-center mb-2'>
                  <span className='text-sm font-medium text-gray-700'>{control.name}</span>
                  <span className={	ext-sm font-bold }>
                    {avgScore.toFixed(0)}%
                  </span>
                </div>
                <div className='grid grid-cols-4 gap-2'>
                  <div className='text-center'>
                    <div className='text-xs text-gray-500'>Implemented</div>
                    <div className={	ext-sm font-medium }>
                      {control.implemented}%
                    </div>
                  </div>
                  <div className='text-center'>
                    <div className='text-xs text-gray-500'>Documented</div>
                    <div className={	ext-sm font-medium }>
                      {control.documented}%
                    </div>
                  </div>
                  <div className='text-center'>
                    <div className='text-xs text-gray-500'>Automated</div>
                    <div className={	ext-sm font-medium }>
                      {control.automated}%
                    </div>
                  </div>
                  <div className='text-center'>
                    <div className='text-xs text-gray-500'>Reported</div>
                    <div className={	ext-sm font-medium }>
                      {control.reported}%
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Overall Controls Effectiveness */}
      <div>
        <h4 className='text-md font-medium text-gray-700 mb-3'>Controls Effectiveness Overview</h4>
        <ResponsiveContainer width='100%' height={200}>
          <BarChart data={controlsMaturityData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='category' angle={-45} textAnchor='end' height={80} />
            <YAxis domain={[0, 100]} />
            <Tooltip formatter={(value) => [${value}%, 'Maturity']} />
            <Bar dataKey='maturity' name='Current'>
              {controlsMaturityData.map((entry, index) => (
                <Cell key={cell-} fill={getMaturityColor(entry.maturity, entry.target)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
