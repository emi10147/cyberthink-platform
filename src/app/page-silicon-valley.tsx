'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area } from 'recharts'

// Enhanced Particle System Component
const ParticleField = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
    duration: number;
  }>>([])
  
  useEffect(() => {
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 4,
      duration: Math.random() * 15 + 10
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute bg-gradient-to-br from-blue-400/20 via-purple-400/15 to-cyan-400/10 rounded-full"
          style={{ 
            left: `${particle.x}%`, 
            top: `${particle.y}%`, 
            width: particle.size, 
            height: particle.size 
          }}
          animate={{
            y: [-30, 30],
            x: [-10, 10],
            opacity: [0, 0.8, 0],
            scale: [0.3, 1.2, 0.3]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
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

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  delay?: number;
  color?: 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'cyan';
  trend?: number[];
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon, delay = 0, color = 'blue', trend = [] }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  const getGradientClasses = (color: string) => {
    const gradients: Record<string, string> = {
      red: 'from-red-500/10 via-red-400/5 to-transparent border-red-500/20 shadow-red-500/10',
      green: 'from-emerald-500/10 via-emerald-400/5 to-transparent border-emerald-500/20 shadow-emerald-500/10',
      yellow: 'from-amber-500/10 via-amber-400/5 to-transparent border-amber-500/20 shadow-amber-500/10',
      purple: 'from-purple-500/10 via-purple-400/5 to-transparent border-purple-500/20 shadow-purple-500/10',
      cyan: 'from-cyan-500/10 via-cyan-400/5 to-transparent border-cyan-500/20 shadow-cyan-500/10',
      blue: 'from-blue-500/10 via-blue-400/5 to-transparent border-blue-500/20 shadow-blue-500/10'
    }
    return gradients[color] || gradients.blue
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -8, scale: 1.03 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ 
        delay, 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        scale: { duration: 0.3 },
        y: { duration: 0.3 }
      }}
      className={`relative group p-8 rounded-3xl border backdrop-blur-xl transition-all duration-700 bg-gradient-to-br ${getGradientClasses(color)} overflow-hidden cursor-pointer hover:shadow-2xl`}
    >
      {/* Dynamic Glow Effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className={`absolute -inset-1 bg-gradient-to-r from-${color}-500/30 via-purple-500/20 to-${color}-500/30 rounded-3xl blur-xl`} 
          />
        )}
      </AnimatePresence>
      
      {/* Glassmorphism Layer */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-white/[0.06] to-transparent rounded-3xl"
        animate={{ opacity: isHovered ? 1 : 0.3 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Animated Mesh Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]" />
      </div>
      
      {/* Flowing Border Animation */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-${color}-400/40 to-transparent translate-x-[-100%] skew-x-12`}
          animate={{ 
            translateX: isHovered ? ['0%', '200%'] : '-100%' 
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <motion.div 
            className={`p-4 rounded-2xl bg-gradient-to-br from-${color}-400/25 via-${color}-500/15 to-${color}-600/25 backdrop-blur-md border border-${color}-400/30 shadow-lg`}
            whileHover={{ scale: 1.15, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.div>
          
          <div className="flex flex-col items-end space-y-3">
            <motion.div 
              className={`px-4 py-2 rounded-2xl bg-gradient-to-r from-${color}-500/25 to-${color}-600/25 text-${color}-200 border border-${color}-400/40 text-xs font-bold backdrop-blur-md shadow-lg`}
              animate={{ 
                scale: change > 0 ? [1, 1.1, 1] : [1, 0.95, 1],
                boxShadow: isHovered ? '0 8px 32px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.1)'
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="flex items-center gap-1">
                {change > 0 ? '↗️' : '↘️'} {Math.abs(change)}%
              </span>
            </motion.div>
            
            {trend && trend.length > 0 && (
              <motion.div 
                className="w-20 h-8 rounded-lg overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10"
                whileHover={{ scale: 1.1 }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trend.map((val, idx) => ({ value: val, index: idx }))}>
                    <defs>
                      <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color === 'red' ? '#ef4444' : color === 'green' ? '#22c55e' : '#3b82f6'} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={color === 'red' ? '#ef4444' : color === 'green' ? '#22c55e' : '#3b82f6'} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={color === 'red' ? '#ef4444' : color === 'green' ? '#22c55e' : '#3b82f6'}
                      fillOpacity={1}
                      fill={`url(#gradient-${color})`}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>
            )}
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white/70 tracking-wide uppercase leading-tight">{title}</h3>
          <motion.p 
            className="text-4xl font-black bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent tracking-tight leading-none"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {value}
          </motion.p>
        </div>
      </div>
      
      {/* Floating Ambient Lights */}
      <motion.div 
        className="absolute top-6 right-6 w-3 h-3 bg-gradient-to-r from-white/60 to-white/30 rounded-full blur-sm"
        animate={{ 
          opacity: [0.4, 1, 0.4],
          scale: [0.8, 1.2, 0.8] 
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-8 left-8 w-2 h-2 bg-gradient-to-r from-white/40 to-white/20 rounded-full blur-sm"
        animate={{ 
          opacity: [0.3, 0.8, 0.3],
          scale: [0.6, 1, 0.6] 
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
      />
    </motion.div>
  )
}

export default function Dashboard() {
  const [activeView, setActiveView] = useState('overview')
  const [timeRange, setTimeRange] = useState('7d')

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-950 via-slate-900/95 to-indigo-950/90 overflow-hidden">
      {/* Advanced Silicon Valley Background */}
      <ParticleField />
      <NeuralBackground />
      
      {/* Cosmic Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-purple-950/15 to-cyan-950/25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tl from-indigo-950/20 via-transparent to-violet-950/20 pointer-events-none" />
      
      {/* Premium Geometric Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Ambient Orbs */}
        <motion.div 
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-500/15 via-indigo-500/10 to-cyan-500/15 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-500/15 via-violet-500/10 to-pink-500/15 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
        
        {/* Advanced Grid Systems */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.8)_1px,transparent_0)] bg-[length:80px_80px]" />
        </div>
        
        {/* Dynamic Light Streaks */}
        <motion.div
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400/20 to-transparent"
          animate={{ opacity: [0, 0.8, 0], scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0 }}
        />
      </div>
      
      <div className="relative z-10">
        {/* Silicon Valley Premium Header */}
        <header className="relative bg-gradient-to-r from-slate-950/95 via-slate-900/90 to-indigo-950/95 backdrop-blur-2xl shadow-2xl border-b border-white/10 sticky top-0 z-50">
          {/* Dynamic Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/3 to-cyan-600/5 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-white/[0.01] to-transparent pointer-events-none"></div>
          
          {/* Animated Border */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
          <motion.div 
            className="absolute bottom-0 h-px bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400"
            initial={{ width: 0, left: "50%" }}
            animate={{ width: "100%", left: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex justify-between items-center py-6">
              {/* Enhanced Logo Section */}
              <motion.div 
                className="flex items-center space-x-6 group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-blue-600/30 via-indigo-600/20 to-purple-600/30 rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-md border border-blue-400/30 group-hover:shadow-blue-500/25 transition-all duration-500"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                  {/* Pulse Ring */}
                  <div className="absolute inset-0 rounded-2xl bg-blue-400/10 animate-ping opacity-30"></div>
                </div>
                
                <div className="space-y-1">
                  <motion.h1 
                    className="text-3xl font-black bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent tracking-tight"
                  >
                    CyberRisk Pro
                  </motion.h1>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-sm text-blue-200/80 font-semibold tracking-wide">Enterprise Security Intelligence Platform</p>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Navigation */}
              <motion.nav 
                className="hidden md:flex items-center space-x-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {[
                  { name: 'Dashboard', href: '/', icon: '⚡' },
                  { name: 'Risk Appetite', href: '/risk-appetite', icon: '🎯' },
                  { name: 'Controls', href: '/controls', icon: '🛡️' },
                  { name: 'Analytics', href: '/analytics', icon: '📊' }
                ].map((item, index) => (
                  <Link key={item.name} href={item.href} className="group">
                    <motion.div
                      className="flex items-center space-x-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md border border-white/10 hover:border-blue-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                        {item.name}
                      </span>
                    </motion.div>
                  </Link>
                ))}
              </motion.nav>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 space-y-12">
          
          {/* Hero Section */}
          <motion.div 
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-6xl md:text-7xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent tracking-tight leading-tight"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                Security Intelligence
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Redefined
                </span>
              </motion.h1>
              <motion.p 
                className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                AI-powered cybersecurity risk management platform designed for enterprise CISOs. 
                Transform your security posture with intelligent analytics and automated insights.
              </motion.p>
            </div>
            
            <motion.div 
              className="flex items-center justify-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-400/30 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-green-300">Live Security Monitoring</span>
                </div>
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full border border-blue-400/30 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-blue-300">AI Risk Analysis</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <MetricCard
              title="Risk Score"
              value="94/100"
              change={-8.2}
              delay={0.1}
              color="red"
              trend={[85, 88, 92, 89, 94]}
              icon={
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            />
            
            <MetricCard
              title="Active Incidents"
              value="23"
              change={15.3}
              delay={0.2}
              color="yellow"
              trend={[18, 21, 19, 25, 23]}
              icon={
                <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              }
            />
            
            <MetricCard
              title="Protection Level"
              value="98.7%"
              change={2.1}
              delay={0.3}
              color="green"
              trend={[95, 96, 97, 98, 98.7]}
              icon={
                <svg className="w-8 h-8 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              }
            />
            
            <MetricCard
              title="Cost Savings"
              value="$2.4M"
              change={12.8}
              delay={0.4}
              color="purple"
              trend={[1.8, 2.0, 2.2, 2.3, 2.4]}
              icon={
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              }
            />
          </div>

          {/* Quick Actions */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {[
              {
                href: "/risk-appetite",
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
                title: "AI Risk Assessment",
                description: "Generate comprehensive risk appetite statements using advanced AI algorithms tailored to your organizational context."
              },
              {
                href: "/controls",
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
                title: "Security Controls",
                description: "Evaluate and optimize your CIS Critical Security Controls implementation with intelligent gap analysis."
              },
              {
                href: "/analytics",
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
                title: "Advanced Analytics",
                description: "Unlock deep insights with Value-at-Risk calculations and predictive security analytics powered by machine learning."
              }
            ].map((action, index) => (
              <Link key={action.href} href={action.href} className="group">
                <motion.div
                  className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-xl border border-white/10 hover:border-blue-400/30 transition-all duration-500 overflow-hidden group-hover:shadow-2xl group-hover:shadow-blue-500/10"
                  whileHover={{ y: -8, scale: 1.02 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                >
                  {/* Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/3 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Icon */}
                  <motion.div 
                    className="mb-6 p-4 w-fit bg-gradient-to-br from-blue-500/20 via-indigo-500/15 to-purple-500/20 rounded-2xl backdrop-blur-sm border border-blue-400/20"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-blue-400">
                      {action.icon}
                    </div>
                  </motion.div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-100 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                      {action.description}
                    </p>
                  </div>
                  
                  {/* Arrow */}
                  <motion.div 
                    className="absolute top-6 right-6 text-white/40 group-hover:text-blue-400 transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.div>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}