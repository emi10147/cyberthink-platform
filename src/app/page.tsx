'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Typewriter Text Component
interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, className, delay = 0, speed = 50 }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const startTyping = setTimeout(() => {
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayText(text.slice(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        }, speed)
        return () => clearTimeout(timer)
      } else {
        // Blinking cursor effect
        const cursorTimer = setInterval(() => {
          setShowCursor(prev => !prev)
        }, 500)
        return () => clearInterval(cursorTimer)
      }
    }, delay)

    return () => clearTimeout(startTyping)
  }, [currentIndex, text, delay, speed])

  return (
    <span className={className}>
      {displayText}
      {showCursor && currentIndex <= text.length && (
        <span className="animate-pulse text-cyan-400">|</span>
      )}
    </span>
  )
}

// Neural Network Background Component
const NeuralBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      
      <motion.path
        d="M100,200 Q300,100 500,200 T900,200"
        stroke="url(#neuralGradient)"
        strokeWidth="1"
        fill="none"
        animate={{ pathLength: [0, 1, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M200,400 Q400,300 600,400 T1000,400"
        stroke="url(#neuralGradient)"
        strokeWidth="1"
        fill="none"
        animate={{ pathLength: [0, 1, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.path
        d="M50,600 Q350,500 650,600 T1150,600"
        stroke="url(#neuralGradient)"
        strokeWidth="1"
        fill="none"
        animate={{ pathLength: [0, 1, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
    </svg>
  </div>
)

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
          stroke="#334155"
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
              stroke="#94a3b8"
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
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </motion.g>
        
        {/* Center Circle */}
        <circle
          cx="300"
          cy="300"
          r="12"
          fill="#475569"
          stroke="#94a3b8"
          strokeWidth="2"
        />
        
        {/* Labels */}
        <text x="200" y="340" fill="#94a3b8" fontSize="14" fontWeight="600" textAnchor="middle">LOW</text>
        <text x="300" y="170" fill="#94a3b8" fontSize="14" fontWeight="600" textAnchor="middle">MODERATE</text>
        <text x="400" y="340" fill="#94a3b8" fontSize="14" fontWeight="600" textAnchor="middle">HIGH</text>
        
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
        <div className="text-5xl font-bold text-white mb-2 font-jetbrains-mono">
          {Math.round(riskLevel)}%
        </div>
        <div className="text-blue-200 font-medium text-lg">
          Current Risk Level
        </div>
      </motion.div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden font-inter">
      {/* Neural Network Background */}
      <NeuralBackground />
      
      {/* Header */}
      <header className="relative z-10 bg-slate-900/80 backdrop-blur-xl border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white font-poppins">
                  <TypewriterText text="CyberThink" className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent" delay={500} speed={100} />
                  <span className="text-slate-300 ml-2">Platform</span>
                </h1>
                <p className="text-blue-300 text-sm font-medium">Enterprise Risk Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-sm text-blue-200">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <span className="font-medium">System Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-20">
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-poppins"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Risk Assessment
            </span>
            <br />
            <span className="text-white">Dashboard</span>
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Advanced real-time monitoring and assessment of organizational risk levels 
            with <span className="text-cyan-300 font-medium">intelligent threat detection</span> and 
            <span className="text-purple-300 font-medium"> predictive analytics</span>
          </motion.p>
        </div>

        {/* Risk Gauge */}
        <div className="flex justify-center mb-20">
          <motion.div 
            className="bg-slate-800/40 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-blue-500/20 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Glassmorphism effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-cyan-500/10 rounded-3xl"></div>
            <div className="relative z-10">
              <RiskGauge />
            </div>
          </motion.div>
        </div>

        {/* Risk Categories */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <motion.div 
            className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-8 border border-green-500/20 hover:border-green-400/40 transition-all duration-300 group"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="w-14 h-14 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 font-poppins">Low Risk</h3>
            <p className="text-slate-300 leading-relaxed">Acceptable operational parameters. Standard monitoring protocols in effect with minimal intervention required.</p>
            <div className="mt-6 text-3xl font-bold text-green-400 font-jetbrains-mono">0-30%</div>
          </motion.div>

          <motion.div 
            className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-8 border border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300 group"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="w-14 h-14 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 font-poppins">Moderate Risk</h3>
            <p className="text-slate-300 leading-relaxed">Enhanced monitoring required. Review and adjust security measures with increased vigilance.</p>
            <div className="mt-6 text-3xl font-bold text-yellow-400 font-jetbrains-mono">31-70%</div>
          </motion.div>

          <motion.div 
            className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-8 border border-red-500/20 hover:border-red-400/40 transition-all duration-300 group"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="w-14 h-14 bg-gradient-to-r from-red-500/20 to-rose-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 font-poppins">High Risk</h3>
            <p className="text-slate-300 leading-relaxed">Immediate attention required. Implement emergency protocols and comprehensive mitigation strategies.</p>
            <div className="mt-6 text-3xl font-bold text-red-400 font-jetbrains-mono">71-100%</div>
          </motion.div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          className="bg-slate-800/40 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-purple-500/20 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {/* Glassmorphism effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-cyan-500/10 rounded-3xl"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-white mb-12 text-center font-poppins">
              System <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Performance</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div 
                className="text-center group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-4xl font-bold text-white mb-2 font-jetbrains-mono group-hover:text-cyan-400 transition-colors duration-300">99.9%</div>
                <div className="text-blue-200 font-medium">Uptime</div>
              </motion.div>
              <motion.div 
                className="text-center group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-4xl font-bold text-white mb-2 font-jetbrains-mono group-hover:text-purple-400 transition-colors duration-300">24/7</div>
                <div className="text-blue-200 font-medium">Monitoring</div>
              </motion.div>
              <motion.div 
                className="text-center group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-4xl font-bold text-white mb-2 font-jetbrains-mono group-hover:text-green-400 transition-colors duration-300">&lt;100ms</div>
                <div className="text-blue-200 font-medium">Response Time</div>
              </motion.div>
              <motion.div 
                className="text-center group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-4xl font-bold text-white mb-2 font-jetbrains-mono group-hover:text-yellow-400 transition-colors duration-300">Enterprise</div>
                <div className="text-blue-200 font-medium">Grade Security</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-900/80 backdrop-blur-xl border-t border-blue-500/20 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-poppins">CyberThink Platform</span>
            </div>
            <p className="text-blue-200 font-medium">
              © 2024 CyberThink Platform. Advanced cybersecurity risk management solutions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}