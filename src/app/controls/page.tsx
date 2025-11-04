'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Control {
  id: string
  cisId: string
  name: string
  description: string
  category: string
  implemented: number
  documented: number
  automated: number
  reported: number
  priority: 'critical' | 'high' | 'medium' | 'low'
}

const cisControls: Control[] = [
  {
    id: '1',
    cisId: 'CIS-1',
    name: 'Inventory and Control of Enterprise Assets',
    description: 'Actively manage (inventory, track, and correct) all enterprise assets connected to the infrastructure physically, virtually, remotely, and those within cloud environments.',
    category: 'Asset Management',
    implemented: 95,
    documented: 90,
    automated: 85,
    reported: 88,
    priority: 'critical'
  },
  {
    id: '2',
    cisId: 'CIS-2',
    name: 'Inventory and Control of Software Assets',
    description: 'Actively manage (inventory, track, and correct) all software on the network so that only authorized software is installed and can execute.',
    category: 'Asset Management',
    implemented: 88,
    documented: 85,
    automated: 75,
    reported: 82,
    priority: 'critical'
  },
  {
    id: '3',
    cisId: 'CIS-3',
    name: 'Data Protection',
    description: 'Develop processes and technical controls to identify, classify, securely handle, retain, and dispose of data.',
    category: 'Data Security',
    implemented: 82,
    documented: 88,
    automated: 70,
    reported: 78,
    priority: 'high'
  },
  {
    id: '4',
    cisId: 'CIS-4',
    name: 'Secure Configuration of Enterprise Assets and Software',
    description: 'Establish and maintain the secure configuration of enterprise assets and software.',
    category: 'Configuration Management',
    implemented: 90,
    documented: 85,
    automated: 82,
    reported: 86,
    priority: 'critical'
  },
  {
    id: '5',
    cisId: 'CIS-5',
    name: 'Account Management',
    description: 'Use processes and tools to assign and manage authorization to credentials for user accounts, including administrator accounts.',
    category: 'Identity Management',
    implemented: 93,
    documented: 90,
    automated: 88,
    reported: 91,
    priority: 'critical'
  },
  {
    id: '6',
    cisId: 'CIS-6',
    name: 'Access Control Management',
    description: 'Use processes and tools to create, assign, manage, and revoke access credentials and privileges for user, administrator, and service accounts.',
    category: 'Access Control',
    implemented: 87,
    documented: 82,
    automated: 80,
    reported: 84,
    priority: 'high'
  }
]

export default function ControlsPage() {
  const [controls, setControls] = useState<Control[]>(cisControls)
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [selectedControl, setSelectedControl] = useState<Control | null>(null)

  const filteredControls = controls.filter(control => {
    const matchesCategory = filterCategory === 'all' || control.category === filterCategory
    const matchesPriority = filterPriority === 'all' || control.priority === filterPriority
    return matchesCategory && matchesPriority
  })

  const updateControlScore = (controlId: string, metric: keyof Pick<Control, 'implemented' | 'documented' | 'automated' | 'reported'>, value: number) => {
    setControls(prev => 
      prev.map(control => 
        control.id === controlId 
          ? { ...control, [metric]: value }
          : control
      )
    )
  }

  const calculateOverallScore = (control: Control) => {
    return Math.round((control.implemented + control.documented + control.automated + control.reported) / 4)
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100'
    if (score >= 75) return 'text-yellow-600 bg-yellow-100'
    if (score >= 60) return 'text-orange-600 bg-orange-100'
    return 'text-red-600 bg-red-100'
  }

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'low': return 'bg-green-100 text-green-800 border-green-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getOverallMaturity = () => {
    const totalScore = controls.reduce((sum, control) => sum + calculateOverallScore(control), 0)
    const avgScore = totalScore / controls.length
    
    if (avgScore >= 90) return { level: 'Optimized', color: 'text-green-600', description: 'Excellent control maturity' }
    if (avgScore >= 75) return { level: 'Managed', color: 'text-blue-600', description: 'Good control maturity' }
    if (avgScore >= 60) return { level: 'Defined', color: 'text-yellow-600', description: 'Developing control maturity' }
    return { level: 'Initial', color: 'text-red-600', description: 'Basic control maturity' }
  }

  const maturity = getOverallMaturity()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80">
                <div className="text-2xl">⚙️</div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Controls Assessment</h1>
                  <p className="text-sm text-gray-500">CIS Critical Security Controls</p>
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
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Security Controls Assessment</h2>
              <p className="text-gray-600">Evaluate and track the effectiveness of CIS Critical Security Controls</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{maturity.level}</div>
              <div className={`text-sm ${maturity.color} font-medium`}>{maturity.description}</div>
            </div>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Implementation</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(controls.reduce((sum, c) => sum + c.implemented, 0) / controls.length)}%
                </p>
              </div>
              <div className="text-2xl">🏗️</div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Documentation</p>
                <p className="text-2xl font-bold text-green-600">
                  {Math.round(controls.reduce((sum, c) => sum + c.documented, 0) / controls.length)}%
                </p>
              </div>
              <div className="text-2xl">📋</div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Automation</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(controls.reduce((sum, c) => sum + c.automated, 0) / controls.length)}%
                </p>
              </div>
              <div className="text-2xl">🤖</div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reporting</p>
                <p className="text-2xl font-bold text-orange-600">
                  {Math.round(controls.reduce((sum, c) => sum + c.reported, 0) / controls.length)}%
                </p>
              </div>
              <div className="text-2xl">📊</div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div 
          className="bg-white rounded-lg shadow-sm p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="Asset Management">Asset Management</option>
                <option value="Data Security">Data Security</option>
                <option value="Configuration Management">Configuration Management</option>
                <option value="Identity Management">Identity Management</option>
                <option value="Access Control">Access Control</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Priority</label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                📈 Generate Report
              </button>
            </div>
          </div>
        </motion.div>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredControls.map((control, index) => (
            <motion.div
              key={control.id}
              className="bg-white rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{control.cisId}: {control.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(control.priority)}`}>
                      {control.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{control.description}</p>
                  <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {control.category}
                  </span>
                </div>
                <div className="text-right ml-4">
                  <div className={`text-2xl font-bold px-3 py-1 rounded-lg ${getScoreColor(calculateOverallScore(control))}`}>
                    {calculateOverallScore(control)}%
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Overall Score</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {(['implemented', 'documented', 'automated', 'reported'] as const).map((metric) => (
                  <div key={metric} className="text-center">
                    <label className="block text-xs font-medium text-gray-600 mb-1 capitalize">
                      {metric}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={control[metric]}
                      onChange={(e) => updateControlScore(control.id, metric, parseInt(e.target.value))}
                      className="w-full mb-2"
                    />
                    <div className={`text-lg font-bold ${getScoreColor(control[metric]).split(' ')[0]}`}>
                      {control[metric]}%
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Residual Risk Calculation */}
        <motion.div 
          className="mt-8 bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Residual Risk Calculation</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">🎯 Inherent Risk</h4>
              <div className="text-2xl font-bold text-red-600">High (4.2)</div>
              <p className="text-sm text-red-600">Risk level without controls</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">🛡️ Control Effectiveness</h4>
              <div className="text-2xl font-bold text-green-600">{maturity.level} (86%)</div>
              <p className="text-sm text-green-600">Average control maturity</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">📊 Residual Risk</h4>
              <div className="text-2xl font-bold text-blue-600">Medium (2.8)</div>
              <p className="text-sm text-blue-600">Risk after control mitigation</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}