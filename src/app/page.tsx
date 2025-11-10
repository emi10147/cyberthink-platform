'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area } from 'recharts'

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
        <span className="animate-pulse">|</span>
      )}
    </span>
  )
}

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
                {change > 0 ? '+' : '-'}{Math.abs(change)}%
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

  // Set dynamic page title with animation
  useEffect(() => {
    const titles = [
      "CyberThink - Intelligent Cyber Risk Assistant",
      "CyberThink - LLM-Powered Risk Management", 
      "CyberThink - Real-Time Security Analytics",
      "CyberThink - Executive-Ready Cyber Reports"
    ]
    
    let currentIndex = 0
    const animateTitle = () => {
      document.title = titles[currentIndex]
      currentIndex = (currentIndex + 1) % titles.length
    }
    
    // Initial title
    document.title = "CyberThink - Intelligent Cyber Risk Assistant"
    
    // Animate title every 3 seconds
    const titleInterval = setInterval(animateTitle, 3000)
    
    return () => clearInterval(titleInterval)
  }, [])

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
      {/* Blue Toned Background with Patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/80 to-indigo-900/90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tl from-cyan-900/30 via-transparent to-blue-900/40 pointer-events-none" />
      
      {/* Enhanced Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.8)_1px,transparent_0)] bg-[length:40px_40px]" />
      </div>
      
      {/* Floating Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-indigo-400/30 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-32 left-16 w-48 h-48 bg-gradient-to-br from-cyan-400/20 to-blue-400/30 rounded-full blur-3xl"
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [90, 0, 90]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-purple-500/20 rounded-full blur-3xl"
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>
      
      <div className="relative z-10">
        {/* Animated Title Banner */}
        <motion.div
          className="fixed top-0 left-0 right-0 bg-gradient-to-r from-cyan-600/95 via-blue-600/95 to-indigo-600/95 backdrop-blur-xl border-b border-cyan-400/30 z-[60] shadow-2xl"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="max-w-7xl mx-auto px-6 py-3">
            <motion.div
              className="text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <TypewriterText 
                text="CyberThink - Transforming Cyber Risk Management with AI Intelligence"
                className="text-lg md:text-xl font-bold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent"
                delay={800}
                speed={50}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Blue Toned Header */}
        <header className="relative bg-blue-900/80 backdrop-blur-xl border-b border-blue-400/20 sticky top-0 z-50 mt-16">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-indigo-900/90 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex justify-between items-center py-4">
              {/* Logo Section with Typing Animation */}
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                  <div>
                    <TypewriterText 
                      text="CyberThink" 
                      className="text-xl font-bold bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent"
                      delay={1000}
                      speed={100}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Blue Themed Navigation */}
              <motion.nav 
                className="hidden md:flex items-center space-x-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {[
                  { name: 'Product', href: '/' },
                  { name: 'Pricing', href: '/pricing' },
                  { name: 'Resources', href: '/resources' },
                  { name: 'Blog', href: '/blog' }
                ].map((item, index) => (
                  <Link key={item.name} href={item.href}>
                    <motion.span
                      className="text-blue-200 hover:text-white font-medium transition-colors cursor-pointer"
                      whileHover={{ y: -1 }}
                    >
                      {item.name}
                    </motion.span>
                  </Link>
                ))}
                
                {/* Auth Buttons */}
                <div className="flex items-center space-x-3 ml-6">
                  <button className="text-blue-200 hover:text-white font-medium transition-colors">
                    Login
                  </button>
                  <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-cyan-500/25">
                    Sign up
                  </button>
                </div>
              </motion.nav>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 space-y-24">
          
          {/* Hero Section with Dashboard Preview */}
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
            {/* Left Content */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                {/* Urgency Banner */}
                <motion.div
                  className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/30 rounded-full px-4 py-2 mb-6 inline-block"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.8 }}
                >
                  <span className="text-red-300 font-semibold text-sm">CISOs spend 3+ weeks just collecting risk data</span>
                </motion.div>

                <motion.h1 
                  className="text-5xl md:text-6xl font-black text-white leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Stop wasting weeks
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">collecting data</span>
                  <br />
                  <span className="text-3xl md:text-4xl text-blue-200">Get instant cyber risk answers</span>
                </motion.h1>
                
                {/* Think Risk Branding */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
                  className="my-8"
                >
                  <div className="flex items-center justify-start space-x-4">
                    <motion.div 
                      className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl border border-blue-400/30"
                      initial={{ rotate: -180, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ delay: 1.5, duration: 0.8, type: "spring", stiffness: 200 }}
                    >
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                    <motion.h2 
                      className="text-4xl md:text-6xl font-black tracking-tight"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.7, duration: 0.8 }}
                    >
                      <span className="text-white/90">Think</span>{' '}
                      <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 bg-clip-text text-transparent font-black">
                        Risk
                      </span>
                    </motion.h2>
                  </div>
                </motion.div>
                
                <motion.p 
                  className="text-xl text-blue-200 leading-relaxed max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <span className="text-cyan-300 font-bold">Intelligent cyber risk assistant</span> powered by{' '}
                  <span className="text-cyan-300 font-bold">LLMs & real-time analytics</span>. 
                  Ask questions in natural language, get{' '}
                  <span className="font-semibold text-white">executive-ready reports</span> with{' '}
                  <span className="font-semibold text-white">financial impact analysis</span> instantly.
                </motion.p>
                
                {/* Value Props */}
                <motion.div 
                  className="flex flex-wrap gap-4 mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  {[
                    '✓ Natural language queries',
                    '✓ Real-time data integration', 
                    '✓ Executive-ready reports'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-cyan-200">
                      <span>{feature}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
              
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {/* Primary CTA */}
                <motion.button
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 text-lg"
                  whileHover={{ y: -1, scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Free Trial
                </motion.button>
                
                {/* Secondary CTA */}
                <motion.button
                  className="text-cyan-300 hover:text-white font-semibold flex items-center space-x-2 group"
                  whileHover={{ x: 4 }}
                >
                  <span>See Live Demo</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button>
                
                {/* Trust Signal */}
                <motion.div 
                  className="text-sm text-blue-300 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  Trusted by Fortune 500 companies • No credit card required
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Problem-Solution Section */}
            <motion.div 
              className="mt-32 mb-24 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                {/* Problem Statement */}
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                >
                  <div className="space-y-4">
                    <motion.div 
                      className="inline-block"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.5, duration: 0.6 }}
                    >
                      <span className="bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider border border-red-500/20">
                        The Problem
                      </span>
                    </motion.div>
                    
                    <motion.h2 
                      className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.6, duration: 0.8 }}
                    >
                      Cybersecurity investments without clear risk understanding
                    </motion.h2>
                  </div>
                  
                  <motion.div 
                    className="space-y-4 text-base lg:text-lg text-blue-100/90 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.8 }}
                  >
                    <p className="text-lg lg:text-xl font-medium text-blue-200">
                      Organizations are increasingly investing in cybersecurity without a clear understanding of how much risk they are actually mitigating.
                    </p>
                    <p>
                      Decisions are often reactive and misaligned with corporate strategy.
                    </p>
                    <p>
                      There is a lack of a quantitative, visual, and dynamic way to connect technical controls with risk exposure and business capability.
                    </p>
                  </motion.div>
                </motion.div>

                {/* Solution Statement */}
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6, duration: 0.8 }}
                >
                  <div className="space-y-4">
                    <motion.div 
                      className="inline-block"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.7, duration: 0.6 }}
                    >
                      <span className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider border border-cyan-500/20">
                        The Solution
                      </span>
                    </motion.div>
                    
                    <motion.h2 
                      className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.8, duration: 0.8 }}
                    >
                      AI-powered integrated risk management
                    </motion.h2>
                  </div>
                  
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.0, duration: 0.8 }}
                  >
                    <p className="text-lg lg:text-xl font-medium text-blue-200 leading-relaxed">
                      An integrated model that combines{' '}
                      <span className="text-cyan-300 font-bold">artificial intelligence</span>,{' '}
                      <span className="text-cyan-300 font-bold">quantitative analytics</span>, and{' '}
                      <span className="text-cyan-300 font-bold">risk management expertise</span>{' '}
                      to help organizations define, visualize, and manage their cyber risk and risk appetite.
                    </p>
                  </motion.div>
                  
                  {/* Solution Features */}
                  <motion.div 
                    className="space-y-3 mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2, duration: 0.8 }}
                  >
                    {[
                      'AI-driven risk quantification',
                      'Visual risk exposure mapping', 
                      'Strategic alignment analytics',
                      'Real-time decision support'
                    ].map((feature, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-center space-x-3 group"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.4 + (index * 0.1), duration: 0.6 }}
                      >
                        <motion.div 
                          className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex-shrink-0"
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.2 }}
                        />
                        <span className="text-base font-medium text-cyan-200 group-hover:text-cyan-100 transition-colors duration-200">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Dashboard Preview */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Main Dashboard Container */}
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
                {/* Dashboard Header */}
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-600">
                    <span>Dashboard</span>
                    <span>Analytics</span>
                    <span>Reports</span>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                  {/* Welcome Section */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">Hey there, Security Team</h3>
                    <p className="text-slate-600 text-sm">Here's what's happening with your security posture today.</p>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {[
                      { label: 'Threats Blocked', value: '1,247', color: 'text-green-600' },
                      { label: 'Active Alerts', value: '23', color: 'text-amber-600' },
                      { label: 'Risk Score', value: '92', color: 'text-blue-600' },
                      { label: 'Compliance', value: '98%', color: 'text-emerald-600' }
                    ].map((metric, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
                        <div className={`text-2xl font-bold ${metric.color} mb-1`}>{metric.value}</div>
                        <div className="text-xs text-slate-600">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Chart Area */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100 mb-4">
                    <h4 className="text-sm font-semibold text-slate-900 mb-3">Threat Detection Over Time</h4>
                    <div className="h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded relative overflow-hidden">
                      <svg className="absolute inset-0 w-full h-full">
                        <path
                          d="M0,60 Q25,40 50,45 T100,35 T150,50 T200,30 T250,40 T300,25"
                          stroke="#3B82F6"
                          strokeWidth="2"
                          fill="none"
                          className="animate-pulse"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Activity Feed */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
                    <h4 className="text-sm font-semibold text-slate-900 mb-3">Recent Activity</h4>
                    <div className="space-y-2">
                      {[
                        'Malware blocked from endpoint-007',
                        'Suspicious login attempt detected',
                        'Firewall rule updated successfully'
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs text-slate-600">
                          <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                          <span>{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Feature Icons */}
              <motion.div
                className="absolute -top-8 -left-8 bg-blue-600 text-white p-4 rounded-2xl shadow-lg"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -right-6 bg-emerald-600 text-white p-3 rounded-xl shadow-lg"
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-8 bg-purple-600 text-white p-3 rounded-xl shadow-lg"
                animate={{ x: [-3, 3, -3] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </motion.div>
            </motion.div>
          </div>

          {/* Social Proof Section */}
          <motion.div 
            className="text-center space-y-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {/* Customer Count */}
            <div className="space-y-4">
              <div className="text-6xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                10,000+
              </div>
              <div className="text-blue-200 text-lg">companies protected worldwide</div>
            </div>

            {/* Testimonial */}
            <motion.div 
              className="max-w-4xl mx-auto bg-blue-800/30 backdrop-blur-lg border border-blue-600/30 rounded-2xl p-8"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-2xl text-white font-semibold mb-4">
                "CyberThink reduced our security incidents by 94% and saved us $2.4M in the first year alone."
              </div>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  JS
                </div>
                <div className="text-left">
                  <div className="text-cyan-300 font-semibold">James Sullivan</div>
                  <div className="text-blue-300 text-sm">CISO, TechCorp Inc.</div>
                </div>
              </div>
            </motion.div>
            
            {/* Integration Partners */}
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-2 text-sm text-blue-300">
                <span>Seamlessly integrates with your existing tools</span>
              </div>
              
              <div className="flex items-center justify-center space-x-12 opacity-70 hover:opacity-100 transition-all duration-300">
                {[
                  { name: 'Splunk', logo: 'S' },
                  { name: 'Microsoft', logo: 'M' },
                  { name: 'AWS', logo: 'A' },
                  { name: 'Palo Alto', logo: 'P' },
                  { name: 'CrowdStrike', logo: 'C' },
                  { name: 'Okta', logo: 'O' },
                  { name: 'ServiceNow', logo: 'SN' }
                ].map((partner, index) => (
                  <motion.div
                    key={partner.name}
                    className="w-12 h-12 bg-blue-800/40 backdrop-blur-sm rounded-lg flex items-center justify-center text-blue-200 font-semibold text-sm border border-blue-600/30 hover:border-cyan-400/50 hover:bg-blue-700/50 hover:text-white transition-all duration-200"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {partner.logo}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Problem & Solution Section */}
          <motion.div 
            className="space-y-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Problem */}
            <div className="bg-gradient-to-br from-red-900/20 via-red-800/10 to-transparent backdrop-blur-xl border border-red-500/20 rounded-3xl p-12">
              <div className="max-w-4xl mx-auto text-center space-y-6">
                <motion.h2 
                  className="text-4xl md:text-5xl font-black text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  The <span className="text-red-400">Problem</span>
                </motion.h2>
                <motion.p 
                  className="text-xl text-red-100 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Today's CISOs waste <span className="font-bold text-white">weeks collecting scattered data</span> from IT teams, databases, and spreadsheets just to understand their risk exposure.
                </motion.p>
                <motion.p 
                  className="text-lg text-red-200/90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  Reports are static, manual, and often <span className="font-semibold text-white">disconnected from financial impact</span> — leaving leadership blind to real cyber threats.
                </motion.p>
              </div>
            </div>

            {/* Solution */}
            <div className="bg-gradient-to-br from-blue-900/30 via-cyan-800/20 to-transparent backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-12">
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <motion.h2 
                  className="text-4xl md:text-5xl font-black text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Our <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Solution</span>
                </motion.h2>
                <motion.p 
                  className="text-xl text-cyan-100 leading-relaxed mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  We built an <span className="font-bold text-white">intelligent cyber risk assistant</span> powered by LLMs, R analytics, and real-time data integration.
                </motion.p>
                
                {/* Solution Features */}
                <motion.div 
                  className="grid md:grid-cols-2 gap-8 text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2">Direct Integration</h4>
                        <p className="text-cyan-200/90">Connects directly to servers, databases, and security logs.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2">Natural Language Search</h4>
                        <p className="text-cyan-200/90">Uses an LLM-based search engine so CISOs can ask questions in natural language — "Which servers have critical vulnerabilities?"</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2">Financial Impact Analysis</h4>
                        <p className="text-cyan-200/90">Calculates expected loss, residual risk, and VaR using R analytics.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">4</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2">Executive Reports</h4>
                        <p className="text-cyan-200/90">Generates interactive dashboards with instant updates and executive-ready written reports automatically, in plain business language.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* ROI-Focused Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <MetricCard
              title="Threat Prevention"
              value="94%"
              change={8.2}
              delay={0.1}
              color="green"
              trend={[85, 88, 92, 89, 94]}
              icon={
                <svg className="w-8 h-8 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              }
            />
            
            <MetricCard
              title="Setup Time"
              value="5 min"
              change={-75.5}
              delay={0.2}
              color="cyan"
              trend={[20, 15, 10, 7, 5]}
              icon={
                <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            
            <MetricCard
              title="Customer ROI"
              value="340%"
              change={15.8}
              delay={0.3}
              color="purple"
              trend={[250, 280, 310, 325, 340]}
              icon={
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              }
            />
            
            <MetricCard
              title="Annual Savings"
              value="$2.4M"
              change={12.8}
              delay={0.4}
              color="green"
              trend={[1.8, 2.0, 2.2, 2.3, 2.4]}
              icon={
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              }
            />
          </div>

          {/* Professional Risk Tolerance Assessment */}
          <motion.div 
            className="relative py-16 md:py-32 px-4 md:px-8 overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            {/* Premium Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900/50 to-slate-900"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
            
            <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
              {/* Enhanced Header */}
              <motion.div
                className="text-center mb-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-blue-300 text-sm font-medium tracking-wide">ENTERPRISE RISK MANAGEMENT</span>
                </motion.div>
                
                <h2 className="text-3xl md:text-5xl lg:text-7xl font-extrabold mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-cyan-300">
                  Risk Tolerance Assessment
                </h2>
                <p className="text-base md:text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12 md:mb-16 px-4">
                  Advanced AI analytics continuously monitor your organization's risk appetite and security posture with 
                  <span className="text-cyan-300 font-semibold"> real-time precision</span>
                </p>
              </motion.div>
              
              <div className="relative flex justify-center items-center px-4 md:px-0">
              {/* Risk Tolerance Gauge SVG */}
              <motion.svg
                className="w-full max-w-md md:max-w-lg lg:max-w-xl drop-shadow-2xl"
                viewBox="0 0 600 450"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                {/* Outer Ring - Background */}
                <circle
                  cx="300"
                  cy="300"
                  r="180"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="12"
                  opacity="0.2"
                />
                
                {/* Risk Appetite Zone (Green) */}
                <motion.path
                  d="M 300 120 A 180 180 0 0 1 455.88 210 L 437.45 234 A 150 150 0 0 0 300 150 Z"
                  fill="url(#greenGradient)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.9 }}
                  transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
                />
                
                {/* Risk Tolerance Zone (Orange) */}
                <motion.path
                  d="M 455.88 210 A 180 180 0 0 1 455.88 390 L 437.45 366 A 150 150 0 0 0 437.45 234 Z"
                  fill="url(#orangeGradient)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.9 }}
                  transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
                />
                
                {/* Risk Threshold Zone (Red) */}
                <motion.path
                  d="M 455.88 390 A 180 180 0 0 1 144.12 390 L 162.55 366 A 150 150 0 0 0 437.45 366 Z"
                  fill="url(#redGradient)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.9 }}
                  transition={{ delay: 1.8, duration: 1.5, ease: "easeOut" }}
                />
                
                {/* Inner Gauge Face */}
                <circle
                  cx="300"
                  cy="300"
                  r="150"
                  fill="url(#gaugeBackground)"
                  stroke="#475569"
                  strokeWidth="3"
                />
                
                {/* Enhanced Gauge Markings */}
                {Array.from({length: 9}, (_, i) => {
                  const angle = -135 + (i * 22.5);
                  const radian = (angle * Math.PI) / 180;
                  const isMainMark = i % 2 === 0;
                  const x1 = 300 + 135 * Math.cos(radian);
                  const y1 = 300 + 135 * Math.sin(radian);
                  const x2 = 300 + (isMainMark ? 115 : 125) * Math.cos(radian);
                  const y2 = 300 + (isMainMark ? 115 : 125) * Math.sin(radian);
                  
                  return (
                    <motion.line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={isMainMark ? "#cbd5e1" : "#64748b"}
                      strokeWidth={isMainMark ? "4" : "2"}
                      strokeLinecap="round"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2 + i * 0.1 }}
                    />
                  );
                })}
                
                {/* Enhanced Animated Needle */}
                <motion.g
                  initial={{ rotate: -135 }}
                  animate={{ rotate: -15 }}
                  transition={{ 
                    delay: 2.5,
                    duration: 2.5,
                    type: "spring",
                    stiffness: 60,
                    damping: 8
                  }}
                  style={{ transformOrigin: "300px 300px" }}
                >
                  {/* Needle Shadow */}
                  <line
                    x1="300"
                    y1="300"
                    x2="302"
                    y2="170"
                    stroke="#000000"
                    strokeWidth="8"
                    strokeLinecap="round"
                    opacity="0.2"
                  />
                  {/* Main Needle */}
                  <line
                    x1="300"
                    y1="300"
                    x2="300"
                    y2="165"
                    stroke="#ffffff"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  {/* Needle Base */}
                  <circle
                    cx="300"
                    cy="300"
                    r="15"
                    fill="#64748b"
                    stroke="#475569"
                    strokeWidth="3"
                  />
                </motion.g>
                
                {/* Center Pin */}
                <circle
                  cx="300"
                  cy="300"
                  r="8"
                  fill="#1e293b"
                />
                
                {/* Labels */}
                <text x="200" y="420" fill="#94a3b8" fontSize="20" fontWeight="600" textAnchor="middle">MIN</text>
                <text x="400" y="420" fill="#94a3b8" fontSize="20" fontWeight="600" textAnchor="middle">MAX</text>
                <text x="300" y="440" fill="#64748b" fontSize="14" fontWeight="500" textAnchor="middle" letterSpacing="2px">RISK LEVEL</text>
                
                {/* Current Status Display */}
                <rect x="225" y="360" width="150" height="45" rx="22" fill="url(#statusBackground)" stroke="#22c55e" strokeWidth="2"/>
                <text x="300" y="390" fill="#22c55e" fontSize="18" fontWeight="700" textAnchor="middle" letterSpacing="1px">MODERATE</text>
                
                {/* Gradient Definitions */}
                <defs>
                  <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#34d399" stopOpacity="0.7"/>
                  </linearGradient>
                  <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.7"/>
                  </linearGradient>
                  <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#f87171" stopOpacity="0.7"/>
                  </linearGradient>
                  <radialGradient id="gaugeBackground" cx="50%" cy="30%">
                    <stop offset="0%" stopColor="#475569"/>
                    <stop offset="100%" stopColor="#334155"/>
                  </radialGradient>
                  <radialGradient id="statusBackground" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="#1e293b" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#0f172a" stopOpacity="0.7"/>
                  </radialGradient>
                </defs>
              </motion.svg>
              
              {/* Premium Floating Labels - Responsive */}
              <motion.div
                className="absolute -top-4 md:-top-6 -left-2 md:-left-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white px-3 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl shadow-2xl border border-green-400/30"
                initial={{ opacity: 0, x: -30, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 3 }}
              >
                <div className="text-xs md:text-sm font-bold">Apetito de riesgo</div>
                <div className="text-xs opacity-90 hidden md:block">Risk Appetite</div>
              </motion.div>
              
              <motion.div
                className="absolute -top-4 md:-top-6 -right-2 md:-right-4 bg-gradient-to-r from-orange-600 to-amber-500 text-white px-3 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl shadow-2xl border border-orange-400/30"
                initial={{ opacity: 0, x: 30, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 3.2 }}
              >
                <div className="text-xs md:text-sm font-bold">Tolerancia al riesgo</div>
                <div className="text-xs opacity-90 hidden md:block">Risk Tolerance</div>
              </motion.div>
              
              <motion.div
                className="absolute bottom-4 md:bottom-8 -right-4 md:-right-8 bg-gradient-to-r from-red-600 to-rose-500 text-white px-3 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl shadow-2xl border border-red-400/30"
                initial={{ opacity: 0, x: 20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 3.4 }}
              >
                <div className="text-xs md:text-sm font-bold">Umbral de riesgo</div>
                <div className="text-xs opacity-90 hidden md:block">Risk Threshold</div>
              </motion.div>
              </div>
            </div>
            
            {/* Risk Assessment Details */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-16 max-w-4xl px-4 md:px-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3 }}
            >
              <div className="bg-green-900/30 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-green-500/20 text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-base md:text-lg font-semibold text-green-300 mb-1 md:mb-2">Risk Appetite</h3>
                <p className="text-green-100 text-xs md:text-sm">Acceptable risk level for business operations and growth objectives</p>
              </div>
              
              <div className="bg-yellow-900/30 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-yellow-500/20 text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-base md:text-lg font-semibold text-yellow-300 mb-1 md:mb-2">Risk Tolerance</h3>
                <p className="text-yellow-100 text-xs md:text-sm">Maximum deviation from risk appetite before action is required</p>
              </div>
              
              <div className="bg-red-900/30 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-red-500/20 text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-base md:text-lg font-semibold text-red-300 mb-1 md:mb-2">Risk Threshold</h3>
                <p className="text-red-100 text-xs md:text-sm">Critical limit requiring immediate intervention and risk mitigation</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Benefit-Focused Features */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {[
              {
                href: "/risk-appetite",
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                title: "Stop Threats Instantly",
                description: "AI-powered threat detection blocks 84% of cyber attacks in real-time. Reduce security incidents from dozens per month to less than 3.",
                benefit: "84% threat reduction"
              },
              {
                href: "/controls",
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>,
                title: "Save $2.4M Annually",
                description: "Eliminate expensive security breaches, reduce insurance premiums by 40%, and cut security team workload by 60%.",
                benefit: "$2.4M average savings"
              },
              {
                href: "/analytics",
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                title: "Deploy in 5 Minutes",
                description: "Complete security transformation without lengthy implementations. Full protection starts working in minutes, not months.",
                benefit: "5-minute setup"
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
                    
                    {/* Apple-style Learn More Link */}
                    <motion.div 
                      className="pt-2"
                      initial={{ opacity: 0.7 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <span className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors cursor-pointer">
                        Learn more →
                      </span>
                    </motion.div>
                  </div>
                  
                  {/* Apple-style Arrow Button */}
                  <motion.div 
                    className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:border-white/30 transition-all duration-200"
                    whileHover={{ scale: 1.1, x: 2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Animated R and MySQL Logos Section */}
      <div className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/40 to-black"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}>
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Powered By
            </h2>
            <p className="text-xl text-purple-200">
              Industry-leading technologies for advanced analytics
            </p>
          </motion.div>

          {/* Animated Logos Container */}
          <div className="relative h-40 md:h-60 flex items-center justify-center">
            
            {/* R Logo */}
            <motion.div
              className="absolute"
              animate={{
                x: [0, 100, 0, -100, 0],
                y: [0, -50, 0, 50, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-20 h-20 md:w-28 md:h-28 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl hover:shadow-blue-500/50 transition-shadow duration-500">
                <svg viewBox="0 0 24 24" className="w-12 h-12 md:w-16 md:h-16 text-white">
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
            </motion.div>

            {/* MySQL Logo */}
            <motion.div
              className="absolute"
              animate={{
                x: [0, -120, 0, 120, 0],
                y: [0, 60, 0, -60, 0],
                rotate: [0, -360]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            >
              <div className="w-20 h-20 md:w-28 md:h-28 bg-orange-500 rounded-2xl flex items-center justify-center shadow-2xl hover:shadow-orange-500/50 transition-shadow duration-500">
                <svg viewBox="0 0 24 24" className="w-12 h-12 md:w-16 md:h-16 text-white">
                  <path fill="currentColor" d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.274.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.168-.152-.021-.03-.021-.061-.046-.094-.008-.007-.014-.007-.02-.014-.044-.094-.115-.134-.154-.274-.026-.08-.033-.16-.08-.214-.047-.054-.154-.1-.214-.133-.194-.1-.4-.133-.6-.2-.214-.054-.4-.133-.533-.2-.133-.067-.267-.14-.367-.274-.133-.154-.2-.347-.2-.533-.04-.214.014-.387.1-.533.09-.146.267-.267.4-.333.154-.08.307-.133.487-.2.133-.054.287-.107.32-.174.014-.027.014-.054 0-.08-.04-.107-.107-.133-.214-.2-.107-.054-.267-.094-.334-.154-.133-.094-.267-.227-.334-.367-.094-.2-.14-.42-.154-.645-.014-.226-.014-.467-.1-.667-.04-.1-.107-.154-.214-.267-.127-.133-.174-.347-.267-.533-.107-.2-.267-.333-.334-.533-.067-.2-.067-.427-.2-.6-.187-.267-.427-.334-.6-.667-.107-.2-.133-.4-.267-.533-.154-.154-.347-.267-.534-.334-.2-.067-.427-.067-.6-.133-.107-.04-.267-.107-.334-.2-.133-.154-.133-.34-.267-.487-.134-.154-.334-.267-.534-.334-.2-.054-.387-.067-.6-.1-.214-.04-.427-.094-.64-.133-.214-.04-.427-.067-.64-.133-.214-.054-.427-.154-.64-.2-.214-.054-.427-.067-.64-.154-.2-.067-.387-.2-.534-.267-.146-.067-.287-.107-.4-.2-.133-.107-.2-.267-.334-.4-.133-.133-.334-.2-.534-.267-.2-.054-.427-.067-.64-.1-.214-.04-.427-.094-.64-.133-.214-.04-.427-.067-.64-.133-.214-.054-.427-.154-.64-.2-.214-.054-.427-.067-.64-.154-.2-.067-.387-.2-.534-.267-.146-.067-.287-.107-.4-.2-.133-.107-.2-.267-.334-.4-.133-.133-.334-.2-.534-.267-.2-.054-.427-.067-.64-.1-.214-.04-.427-.094-.64-.133-.214-.04-.427-.067-.64-.133-.214-.054-.427-.154-.64-.2-.214-.054-.427-.067-.64-.154-.2-.067-.387-.2-.534-.267-.146-.067-.287-.107-.4-.2-.133-.107-.2-.267-.334-.4-.133-.133-.334-.2-.534-.267-.2-.054-.427-.067-.64-.1-.214-.04-.427-.094-.64-.133-.214-.04-.427-.067-.64-.133-.214-.054-.427-.154-.64-.2-.214-.054-.427-.067-.64-.154-.2-.067-.387-.2-.534-.267-.146-.067-.287-.107-.4-.2-.133-.107-.2-.267-.334-.4-.133-.133-.334-.2-.534-.267-.2-.054-.427-.067-.64-.1-.214-.04-.427-.094-.64-.133-.214-.04-.427-.067-.64-.133-.214-.054-.427-.154-.64-.2-.214-.054-.427-.067-.64-.154-.2-.067-.387-.2-.534-.267-.146-.067-.287-.107-.4-.2-.133-.107-.2-.267-.334-.4-.133-.133-.334-.2-.534-.267-.2-.054-.427-.067-.64-.1-.214-.04-.427-.094-.64-.133-.214-.04-.427-.067-.64-.133-.214-.054-.427-.154-.64-.2-.214-.054-.427-.067-.64-.154-.2-.067-.387-.2-.534-.267-.146-.067-.287-.107-.4-.2-.133-.107-.2-.267-.334-.4-.133-.133-.334-.2-.534-.267-.2-.054-.427-.067-.64-.1-.214-.04-.427-.094-.64-.133-.214-.04-.427-.067-.64-.133-.214-.054-.427-.154-.64-.2-.214-.054-.427-.067-.64-.154-.2-.067-.387-.2-.534-.267-.146-.067-.287-.107-.4-.2-.133-.107-.2-.267-.334-.4-.133-.133-.334-.2-.534-.267-.2-.054-.427-.067-.64-.1-.214-.04-.427-.094-.64-.133-.214-.04-.427-.067-.64-.133-.214-.054-.427-.154-.64-.2-.214-.054-.427-.067-.64-.154-.2-.067-.387-.2-.534-.267-.146-.067-.287-.107-.4-.2-.133-.107-.2-.267-.334-.4-.133-.133-.334-.2-.534-.267-.2-.054-.427-.067-.64-.1-.214-.04-.427-.094-.64-.133-.214-.04-.427-.067-.64-.133-.214-.054-.427-.154-.64-.2-.214-.054-.427-.067-.64-.154-.2-.067-.387-.2-.534-.267-.146-.067-.287-.107-.4-.2-.133-.107-.2-.267-.334-.4-.133-.133-.334-.2-.534-.267-.2-.054-.427-.067-.64-.1-.214-.04-.427-.094-.64-.133-.214-.04-.427-.067-.64-.133-.214-.054-.427-.154-.64-.2-.214-.054-.427-.067-.64-.154-.2-.067-.387-.2-.534-.267-.146-.067-.287-.107-.4-.2-.133-.107-.2-.267-.334-.4-.133-.133-.334-.2-.534-.267-.2-.054-.427-.067-.64-.1-.214-.04-.427-.094-.64-.133-.214-.04-.427-.067-.64-.133-.214-.054-.427-.154-.64-.2-.214-.054-.427-.067-.64-.154-.2-.067-.387-.2-.534-.267-.146-.067-.287-.107-.4-.2-.133-.107-.2-.267-.334-.4-.133-.133-.334-.2-.534-.267-.2-.054-.427-.067-.64-.1-.214-.04-.427-.094-.64-.133-.214-.04-.427-.067-.64-.133-.214-.054-.427-.154-.64-.2-.214-.054-.427-.067-.64-.154-.2-.067-.387-.2-.534-.267-.146-.067-.287-.107-.4-.2-.133-.107-.2-.267-.334-.4-.133-.133-.334-.2-.534-.267-.2-.054-.427-.067-.64-.1-.214-.04-.427-.094-.64-.133-.214-.04-.427-.067-.64-.133-.214-.054-.427-.154-.64-.2-.214-.054-.427-.067-.64-.154-.2-.067-.387-.2-.534-.267-.146-.067-.287-.107-.4-.2-.133-.107-.2-.267-.334-.4-.133-.133-.334-.2-.534-.267-.2-.054-.427-.067-.64-.1-.214-.04-.427-.094-.64-.133-.214-.04-.427-.067-.64-.133-.214-.054-.427-.154-.64-.2-.214-.054-.427-.067-.64-.154-.2-.067-.387-.2-.534-.267-.146-.067-.287-.107-.4-.2-.133-.107-.2-.267-.334-.4-.133-.133-.334-.2-.534-.267-.2-.054-.427-.067-.64-.1-.214-.04-.427-.094-.64-.133-.214-.04-.427-.067-.64-.133-.214-.054-.427-.154-.64-.2-.214-.054-.427-.067-.64-.154-.2-.067-.387-.2-.534-.267-.146-.067-.287-.107-.4-.2-.133-.107-.2-.267-.334-.4-.133-.133-.334-.2-.534-.267-.2-.054-.427-.067-.64-.1-.214-.04-.427-.094-.64-.133-.214-.04-.427-.067-.64-.133-.214-.054-.427-.154-.64-.2-.214-.054-.427-.067-.64-.154-.2-.067-.387-.2-.534-.267-.146-.067-.287-.107-.4-.2-.133-.107-.2-.267-.334-.4-.133-.133-.334-.2-.534-.267-.2-.054-.427-.067-.64-.1-.214-.04-.427-.094-.64-.133-.214-.04-.427-.067-.64-.133-.214-.054-.427-.154-.64-.2-.214-.054-.427-.067-.64-.154-.2-.067-.387-.2-.534-.267-.146-.067-.287-.107-.4-.2-.133-.107-.2-.267-.334-.4-.133-.133-.334-.2-.534-.267-.2-.054-.427-.067-.64-.1-.214-.04-.427-.094-.64-.133-.214-.04-.427-.067-.64-.133-.214-.054-.427-.154-.64-.2-.214-.054-.427-.067-.64-.154-.2-.067-.387-.2-.534-.267-.146-.067-.287-.107-.4-.2-.133-.107-.2-.267-.334-.4-.133-.133-.334-.2-.534-.267-.2-.054-.427-.067-.64-.1-.214-.04-.427-.094-.64-.133-.214-.04-.427-.067-.64-.133-.214-.054-.427-.154-.64-.2-.214-.054-.427-.067-.64-.154-.2-.067-.387-.2-.534-.267-.146-.067-.287-.107-.4-.2-.133-.107-.2-.267-.334-.4-.133-.133-.334-.2-.534-.267-.2-.054-.427-.067-.64-.1-.214-.04-.427-.094-.64-.133-.214-.04-.427-.067-.64-.133-.214-.054-.427-.154-.64-.2z"/>
                </svg>
              </div>
            </motion.div>

            {/* Center Connection Lines */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="w-2 h-2 bg-purple-400 rounded-full">
                <div className="absolute w-32 h-0.5 bg-gradient-to-r from-purple-400 to-transparent -translate-y-0.5"></div>
                <div className="absolute w-32 h-0.5 bg-gradient-to-l from-purple-400 to-transparent -translate-y-0.5 rotate-180"></div>
              </div>
            </motion.div>

            {/* Floating Particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-purple-300 rounded-full opacity-60"
                animate={{
                  x: [0, Math.sin(i * 60) * 150, 0],
                  y: [0, Math.cos(i * 60) * 150, 0],
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
                style={{
                  left: '50%',
                  top: '50%'
                }}
              />
            ))}
          </div>

          {/* Technology Stack Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16"
          >
            <div className="bg-blue-900/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
              <h3 className="text-2xl font-bold text-blue-300 mb-4">R Analytics</h3>
              <p className="text-blue-100">
                Advanced statistical computing and machine learning models for 
                comprehensive cyber risk analysis and predictive threat detection.
              </p>
            </div>
            <div className="bg-orange-900/30 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/20">
              <h3 className="text-2xl font-bold text-orange-300 mb-4">MySQL Database</h3>
              <p className="text-orange-100">
                Robust, scalable database infrastructure ensuring secure storage 
                and lightning-fast retrieval of critical security data.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}