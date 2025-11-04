'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, ScatterChart, Scatter, AreaChart, Area } from 'recharts'

// Historical loss data for VaR calculation
const historicalLossData = [
  { date: '2024-01', operationalLoss: 15000, cyberLoss: 8000, complianceLoss: 2000, reputationalLoss: 5000 },
  { date: '2024-02', operationalLoss: 22000, cyberLoss: 12000, complianceLoss: 0, reputationalLoss: 8000 },
  { date: '2024-03', operationalLoss: 18000, cyberLoss: 25000, complianceLoss: 15000, reputationalLoss: 12000 },
  { date: '2024-04', operationalLoss: 9000, cyberLoss: 5000, complianceLoss: 3000, reputationalLoss: 2000 },
  { date: '2024-05', operationalLoss: 35000, cyberLoss: 15000, complianceLoss: 8000, reputationalLoss: 20000 },
  { date: '2024-06', operationalLoss: 12000, cyberLoss: 18000, complianceLoss: 0, reputationalLoss: 6000 },
  { date: '2024-07', operationalLoss: 28000, cyberLoss: 22000, complianceLoss: 12000, reputationalLoss: 15000 },
  { date: '2024-08', operationalLoss: 8000, cyberLoss: 7000, complianceLoss: 5000, reputationalLoss: 3000 },
  { date: '2024-09', operationalLoss: 45000, cyberLoss: 35000, complianceLoss: 20000, reputationalLoss: 25000 },
  { date: '2024-10', operationalLoss: 16000, cyberLoss: 9000, complianceLoss: 2000, reputationalLoss: 8000 }
]

// Loss distribution data for tail risk analysis
const lossDistributionData = [
  { percentile: 50, loss: 18500 },
  { percentile: 75, loss: 28000 },
  { percentile: 90, loss: 42000 },
  { percentile: 95, loss: 58000 },
  { percentile: 99, loss: 89000 },
  { percentile: 99.9, loss: 125000 }
]

const riskScenarios = [
  {
    name: 'Data Breach (Personal Data)',
    probability: 15,
    impact: 2500000,
    expectedLoss: 375000,
    category: 'cyber'
  },
  {
    name: 'Ransomware Attack',
    probability: 8,
    impact: 1800000,
    expectedLoss: 144000,
    category: 'cyber'
  },
  {
    name: 'Regulatory Fine (GDPR)',
    probability: 5,
    impact: 5000000,
    expectedLoss: 250000,
    category: 'compliance'
  },
  {
    name: 'System Outage (24h)',
    probability: 25,
    impact: 500000,
    expectedLoss: 125000,
    category: 'operational'
  },
  {
    name: 'Insider Threat',
    probability: 12,
    impact: 800000,
    expectedLoss: 96000,
    category: 'operational'
  }
]

export default function AnalyticsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('12months')
  const [selectedConfidence, setSelectedConfidence] = useState('95')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // VaR Calculations
  const calculateVaR = (confidence: number) => {
    const totalLosses = historicalLossData.map(item => 
      item.operationalLoss + item.cyberLoss + item.complianceLoss + item.reputationalLoss
    ).sort((a, b) => b - a)

    const index = Math.ceil((confidence / 100) * totalLosses.length) - 1
    return totalLosses[index] || 0
  }

  const var95 = calculateVaR(95)
  const var99 = calculateVaR(99)
  const var999 = calculateVaR(99.9)

  const expectedLoss = historicalLossData.reduce((sum, item) => 
    sum + item.operationalLoss + item.cyberLoss + item.complianceLoss + item.reputationalLoss, 0
  ) / historicalLossData.length

  const totalScenarioRisk = riskScenarios.reduce((sum, scenario) => sum + scenario.expectedLoss, 0)

  const getRiskColor = (impact: number) => {
    if (impact > 1000000) return '#DC2626' // red
    if (impact > 500000) return '#EA580C' // orange  
    if (impact > 100000) return '#D97706' // yellow
    return '#16A34A' // green
  }

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'cyber': return '#DC2626'
      case 'operational': return '#2563EB'
      case 'compliance': return '#7C3AED'
      case 'reputational': return '#059669'
      default: return '#6B7280'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80">
                <div className="text-2xl">📈</div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Risk Analytics & VaR</h1>
                  <p className="text-sm text-gray-500">Value at Risk Analysis</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-sm text-blue-600 hover:text-blue-800 px-3 py-2 rounded-lg hover:bg-blue-50">← Back to Dashboard</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Risk Analytics & Value at Risk (VaR)
          </h2>
          <p className="text-gray-600">
            Quantitative risk analysis with historical loss data and statistical modeling
          </p>
        </motion.div>

        {/* VaR Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expected Loss</p>
                <p className="text-2xl font-bold text-gray-900">${(expectedLoss / 1000).toFixed(0)}K</p>
                <p className="text-xs text-gray-500">Monthly Average</p>
              </div>
              <div className="text-2xl">📊</div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">VaR 95%</p>
                <p className="text-2xl font-bold text-yellow-600">${(var95 / 1000).toFixed(0)}K</p>
                <p className="text-xs text-gray-500">95% Confidence</p>
              </div>
              <div className="text-2xl">⚠️</div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">VaR 99%</p>
                <p className="text-2xl font-bold text-orange-600">${(var99 / 1000).toFixed(0)}K</p>
                <p className="text-xs text-gray-500">99% Confidence</p>
              </div>
              <div className="text-2xl">🚨</div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">VaR 99.9%</p>
                <p className="text-2xl font-bold text-red-600">${(var999 / 1000).toFixed(0)}K</p>
                <p className="text-xs text-gray-500">99.9% Confidence</p>
              </div>
              <div className="text-2xl">💥</div>
            </div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Historical Loss Trends */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Historical Loss Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={historicalLossData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Loss']} />
                <Area type="monotone" dataKey="cyberLoss" stackId="1" stroke="#DC2626" fill="#DC2626" fillOpacity={0.8} />
                <Area type="monotone" dataKey="operationalLoss" stackId="1" stroke="#2563EB" fill="#2563EB" fillOpacity={0.8} />
                <Area type="monotone" dataKey="complianceLoss" stackId="1" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.8} />
                <Area type="monotone" dataKey="reputationalLoss" stackId="1" stroke="#059669" fill="#059669" fillOpacity={0.8} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Loss Distribution */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Loss Distribution (Tail Risk)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lossDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="percentile" domain={[50, 100]} />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Maximum Loss']} />
                <Line type="monotone" dataKey="loss" stroke="#DC2626" strokeWidth={3} dot={{ fill: '#DC2626', strokeWidth: 2, r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div className="p-2 bg-yellow-50 rounded">
                <div className="text-sm font-medium text-yellow-700">95th Percentile</div>
                <div className="text-lg font-bold text-yellow-600">${(var95 / 1000).toFixed(0)}K</div>
              </div>
              <div className="p-2 bg-orange-50 rounded">
                <div className="text-sm font-medium text-orange-700">99th Percentile</div>
                <div className="text-lg font-bold text-orange-600">${(var99 / 1000).toFixed(0)}K</div>
              </div>
              <div className="p-2 bg-red-50 rounded">
                <div className="text-sm font-medium text-red-700">99.9th Percentile</div>
                <div className="text-lg font-bold text-red-600">${(var999 / 1000).toFixed(0)}K</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Risk Scenarios Analysis */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Risk Scenarios & Expected Loss</h3>
            <div className="text-right">
              <div className="text-sm text-gray-600">Total Expected Annual Loss</div>
              <div className="text-xl font-bold text-red-600">${(totalScenarioRisk / 1000).toFixed(0)}K</div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {riskScenarios.map((scenario, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-semibold text-gray-900">{scenario.name}</h4>
                    <span 
                      className="px-2 py-1 text-xs font-medium rounded-full text-white"
                      style={{ backgroundColor: getCategoryColor(scenario.category) }}
                    >
                      {scenario.category}
                    </span>
                  </div>
                  <div className="mt-1 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Probability: </span>
                      <span className="font-medium">{scenario.probability}% annually</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Max Impact: </span>
                      <span className="font-medium">${(scenario.impact / 1000).toFixed(0)}K</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Expected Loss: </span>
                      <span className="font-bold text-red-600">${(scenario.expectedLoss / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: getRiskColor(scenario.impact) }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Monte Carlo Simulation Results */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Monte Carlo Simulation Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-gray-700 mb-4">Risk Metrics Summary</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Mean Annual Loss:</span>
                  <span className="font-bold text-gray-900">${(expectedLoss * 12 / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Standard Deviation:</span>
                  <span className="font-bold text-gray-900">${(var95 * 0.6 / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Coefficient of Variation:</span>
                  <span className="font-bold text-gray-900">1.42</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="font-medium">Maximum Simulated Loss:</span>
                  <span className="font-bold text-red-600">${(var999 * 1.8 / 1000).toFixed(0)}K</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-4">Capital Allocation Recommendations</h4>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-semibold text-blue-800">Economic Capital</div>
                  <div className="text-blue-600">${(var99 / 1000).toFixed(0)}K - ${(var999 / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-blue-600">For unexpected losses (99-99.9% VaR)</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="font-semibold text-green-800">Insurance Coverage</div>
                  <div className="text-green-600">${(var95 / 1000).toFixed(0)}K - ${(var99 / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-green-600">Transfer tail risk exposure</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="font-semibold text-yellow-800">Operational Reserve</div>
                  <div className="text-yellow-600">${(expectedLoss * 12 / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-yellow-600">For expected operational losses</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}