'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const RiskGauge = () => {
  const [riskLevel, setRiskLevel] = useState(0)
  
  useEffect(() => {
    // Simulate real-time risk level updates
    const interval = setInterval(() => {
      setRiskLevel(prev => {
        const change = (Math.random() - 0.5) * 10
        return Math.max(0, Math.min(100, prev + change))
      })
    }, 3000)
    
    // Initial animation to moderate level
    setTimeout(() => setRiskLevel(42), 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  const getRiskStatus = (level: number) => {
    if (level < 30) return { status: 'LOW', color: '#10b981', label: 'Acceptable' }
    if (level < 70) return { status: 'MODERATE', color: '#f59e0b', label: 'Monitor' }
    return { status: 'HIGH', color: '#ef4444', label: 'Critical' }
  }
  
  const risk = getRiskStatus(riskLevel)
  const needleAngle = -135 + (riskLevel / 100) * 180
  
  return (
    <div className="flex flex-col items-center">
      <motion.svg
        className="w-full max-w-lg drop-shadow-lg"
        viewBox="0 0 600 400"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Background Arc */}
        <path
          d="M 150 300 A 150 150 0 0 1 450 300"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="20"
          strokeLinecap="round"
        />
        
        {/* Risk Zones */}
        <motion.path
          d="M 150 300 A 150 150 0 0 0 245 155"
          fill="none"
          stroke="#10b981"
          strokeWidth="20"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        />
        
        <motion.path
          d="M 245 155 A 150 150 0 0 0 355 155"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="20"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
        />
        
        <motion.path
          d="M 355 155 A 150 150 0 0 0 450 300"
          fill="none"
          stroke="#ef4444"
          strokeWidth="20"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.1, duration: 1, ease: "easeOut" }}
        />
        
        {/* Gauge Markings */}
        {Array.from({ length: 11 }, (_, i) => {
          const angle = -135 + (i * 18)
          const radian = (angle * Math.PI) / 180
          const x1 = 300 + 140 * Math.cos(radian)
          const y1 = 300 + 140 * Math.sin(radian)
          const x2 = 300 + 120 * Math.cos(radian)
          const y2 = 300 + 120 * Math.sin(radian)
          
          return (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#64748b"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 + i * 0.05 }}
            />
          )
        })}
        
        {/* Animated Needle */}
        <motion.g
          initial={{ rotate: -135 }}
          animate={{ rotate: needleAngle }}
          transition={{ 
            type: "spring",
            stiffness: 50,
            damping: 15,
            mass: 1
          }}
          style={{ transformOrigin: "300px 300px" }}
        >
          <line
            x1="300"
            y1="300"
            x2="300"
            y2="180"
            stroke="#1e293b"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </motion.g>
        
        {/* Center Circle */}
        <circle
          cx="300"
          cy="300"
          r="12"
          fill="#1e293b"
        />
        
        {/* Labels */}
        <text x="200" y="340" fill="#64748b" fontSize="14" fontWeight="500" textAnchor="middle">LOW</text>
        <text x="300" y="170" fill="#64748b" fontSize="14" fontWeight="500" textAnchor="middle">MODERATE</text>
        <text x="400" y="340" fill="#64748b" fontSize="14" fontWeight="500" textAnchor="middle">HIGH</text>
        
        {/* Current Value */}
        <rect x="225" y="330" width="150" height="35" rx="18" fill={risk.color} fillOpacity="0.1" stroke={risk.color} strokeWidth="1"/>
        <text x="300" y="352" fill={risk.color} fontSize="16" fontWeight="700" textAnchor="middle">{risk.status}</text>
      </motion.svg>
      
      {/* Risk Level Display */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <div className="text-4xl font-bold text-slate-800 mb-2">
          {Math.round(riskLevel)}%
        </div>
        <div className="text-slate-600 font-medium">
          Current Risk Level
        </div>
      </motion.div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">CyberThink Platform</h1>
                <p className="text-slate-600 text-sm">Enterprise Risk Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>System Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Risk Assessment Dashboard
          </motion.h2>
          <motion.p
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Real-time monitoring and assessment of organizational risk levels 
            with advanced analytics and intelligent threat detection.
          </motion.p>
        </div>

        {/* Risk Gauge */}
        <div className="flex justify-center mb-16">
          <div className="bg-white rounded-3xl shadow-xl p-12 border border-slate-200">
            <RiskGauge />
          </div>
        </div>

        {/* Risk Categories */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Low Risk</h3>
            <p className="text-slate-600">Acceptable operational parameters. Standard monitoring protocols in effect.</p>
            <div className="mt-4 text-2xl font-bold text-green-600">0-30%</div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-yellow-100">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Moderate Risk</h3>
            <p className="text-slate-600">Enhanced monitoring required. Review and adjust security measures as needed.</p>
            <div className="mt-4 text-2xl font-bold text-yellow-600">31-70%</div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-red-100">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">High Risk</h3>
            <p className="text-slate-600">Immediate attention required. Implement emergency protocols and mitigation strategies.</p>
            <div className="mt-4 text-2xl font-bold text-red-600">71-100%</div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">System Performance</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-1">99.9%</div>
              <div className="text-slate-600">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-1">24/7</div>
              <div className="text-slate-600">Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-1">&lt;100ms</div>
              <div className="text-slate-600">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-1">Enterprise</div>
              <div className="text-slate-600">Grade Security</div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-xl font-semibold text-slate-200">CyberThink Platform</span>
            </div>
            <p className="text-slate-500">
              © 2024 CyberThink Platform. Professional risk management solutions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}