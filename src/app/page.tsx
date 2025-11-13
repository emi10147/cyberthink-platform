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

// Elegant Floating Particles Component
const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
    duration: number;
    color: string;
  }>>([])
  
  useEffect(() => {
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 8,
      duration: Math.random() * 25 + 20,
      color: ['#60A5FA', '#34D399', '#A78BFA', '#38BDF8', '#3B82F6', '#06B6D4'][Math.floor(Math.random() * 6)]
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{ 
            left: `${particle.x}%`, 
            top: `${particle.y}%`, 
            width: particle.size, 
            height: particle.size,
            backgroundColor: particle.color,
            filter: 'blur(0.5px)',
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}40`
          }}
          animate={{
            y: [-30, 30],
            x: [-15, 15],
            opacity: [0.15, 0.4, 0.15],
            scale: [0.8, 1.2, 0.8]
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

// Artistic Neural Network Background Component
const NeuralBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.3" />
          <stop offset="25%" stopColor="#34D399" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.5" />
          <stop offset="75%" stopColor="#38BDF8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.3" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <motion.path
        d="M100,200 Q300,100 500,200 T900,200"
        stroke="url(#neuralGradient)"
        strokeWidth="2"
        fill="none"
        filter="url(#glow)"
        animate={{ pathLength: [0, 1, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M200,400 Q400,300 600,400 T1000,400"
        stroke="url(#neuralGradient)"
        strokeWidth="2"
        fill="none"
        filter="url(#glow)"
        animate={{ pathLength: [0, 1, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.path
        d="M50,600 Q350,500 650,600 T1150,600"
        stroke="url(#neuralGradient)"
        strokeWidth="2"
        fill="none"
        filter="url(#glow)"
        animate={{ pathLength: [0, 1, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      
      {/* Additional crossing paths for complexity */}
      <motion.path
        d="M0,300 Q600,100 1200,300"
        stroke="url(#neuralGradient)"
        strokeWidth="1"
        fill="none"
        filter="url(#glow)"
        animate={{ pathLength: [0, 1, 0], opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.path
        d="M0,500 Q600,700 1200,500"
        stroke="url(#neuralGradient)"
        strokeWidth="1"
        fill="none"
        filter="url(#glow)"
        animate={{ pathLength: [0, 1, 0], opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
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
      
      {/* Majestic Risk Level Display */}
      <motion.div
        className="mt-6 md:mt-12 text-center"
        initial={{ opacity: 0, y: 30, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <motion.div 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-3 md:mb-4 font-fira-code drop-shadow-2xl tabular-nums"
          animate={{ 
            textShadow: [
              "0 0 20px rgba(255, 255, 255, 0.5)",
              "0 0 40px rgba(255, 255, 255, 0.8)",
              "0 0 20px rgba(255, 255, 255, 0.5)"
            ],
            scale: [1, 1.02, 1]
          }}
          transition={{ 
            textShadow: { duration: 3, repeat: Infinity },
            scale: { duration: 4, repeat: Infinity }
          }}
        >
          {Math.round(riskLevel)}%
        </motion.div>
        
        <motion.div 
          className="text-purple-200 font-semibold text-base md:text-xl lg:text-2xl drop-shadow-lg font-outfit tracking-wide"
          animate={{ 
            opacity: [0.7, 1, 0.7],
            y: [0, -2, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          Current Risk Level
        </motion.div>
        
        {/* Additional status indicators */}
        <motion.div
          className="mt-4 md:mt-6 flex justify-center space-x-2 md:space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.8 }}
        >
          {['Real-time', 'Monitored', 'Secured'].map((status, index) => (
            <motion.span
              key={status}
              className="px-2 md:px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-200 text-xs md:text-sm font-medium"
              animate={{ 
                borderColor: [
                  "rgba(168, 85, 247, 0.3)",
                  "rgba(168, 85, 247, 0.6)", 
                  "rgba(168, 85, 247, 0.3)"
                ]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: index * 0.5
              }}
            >
              {status}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden font-inter text-white">
      {/* Majestic Artistic Background Foundation */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950"></div>
      
      {/* Elegant Flowing Shapes */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/40 to-cyan-500/40 rounded-full filter blur-3xl transform rotate-45 animate-pulse"></div>
        <div className="absolute top-1/4 -right-1/4 w-80 h-80 bg-gradient-to-l from-indigo-500/30 to-blue-400/30 rounded-full filter blur-3xl transform -rotate-12 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-t from-blue-700/35 to-cyan-400/35 rounded-full filter blur-3xl transform rotate-90 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Sophisticated Mesh Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-slate-950/50 to-blue-900/70"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-900/20 to-indigo-900/40"></div>
      
      {/* Subtle Geometric Patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-300 rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-3/4 left-3/4 w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-indigo-300 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Elegant Light Rays */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-300 to-transparent transform skew-x-12"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-cyan-300 to-transparent transform -skew-x-6"></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-indigo-300 to-transparent transform skew-x-3"></div>
      </div>

      <FloatingParticles />
      <NeuralBackground />
      
      {/* Majestic Header */}
      <motion.header 
        className="relative z-10 bg-gradient-to-r from-slate-900/90 via-purple-900/80 to-slate-900/90 backdrop-blur-2xl border-b border-purple-500/30 shadow-2xl"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3 md:space-x-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/30"
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(139, 92, 246, 0.3)",
                    "0 0 30px rgba(139, 92, 246, 0.5)",
                    "0 0 20px rgba(139, 92, 246, 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <svg className="w-5 h-5 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </motion.div>
              <div>
                <h1 className="text-xl md:text-3xl font-bold text-white font-orbitron leading-tight tracking-tight">
                  <TypewriterText 
                    text="CyberThink" 
                    className="bg-gradient-to-r from-blue-300 via-purple-300 to-violet-300 bg-clip-text text-transparent drop-shadow-lg font-orbitron font-black" 
                    delay={500} 
                    speed={120} 
                  />
                  <motion.span 
                    className="text-slate-200 ml-2 drop-shadow-lg font-space-grotesk font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 0.8 }}
                  >
                    Platform
                  </motion.span>
                </h1>
                <motion.p 
                  className="text-purple-200 text-xs md:text-sm font-medium mt-1 font-outfit tracking-wide"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.5, duration: 0.8 }}
                >
                  Enterprise Risk Management
                </motion.p>
              </div>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2 md:space-x-3 text-xs md:text-sm text-purple-200"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <motion.div 
                className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full shadow-lg"
                animate={{ 
                  scale: [1, 1.3, 1],
                  boxShadow: [
                    "0 0 5px rgba(34, 197, 94, 0.5)",
                    "0 0 15px rgba(34, 197, 94, 0.8)",
                    "0 0 5px rgba(34, 197, 94, 0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-medium drop-shadow-lg">System Active</span>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Majestic Main Content */}
      <main className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {/* Main Dashboard Layout */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-6 md:gap-8 lg:gap-12 mb-12 md:mb-20 px-4">
          {/* Left Side - CyberThink Logo */}
          <motion.div 
            className="flex-shrink-0 w-full lg:w-80 flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.div
              className="flex items-center space-x-3 md:space-x-4 mb-8"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {/* CyberThink Logo */}
              <motion.div 
                className="relative"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                {/* Logo Background Glow */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-3xl blur-xl opacity-30"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                {/* Logo Container */}
                <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-400 via-emerald-400 to-green-500 rounded-3xl shadow-2xl flex items-center justify-center">
                  {/* Stylized Logo Design */}
                  <motion.svg 
                    className="w-8 h-8 md:w-10 md:h-10 text-white"
                    viewBox="0 0 100 100"
                    fill="none"
                    animate={{ 
                      rotate: [0, 360],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    {/* Outer Ring */}
                    <motion.circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      fill="none"
                      strokeDasharray="20 10"
                      animate={{ 
                        strokeDashoffset: [0, -30],
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* Inner Shield */}
                    <motion.path 
                      d="M30 40 L50 25 L70 40 L70 65 C70 72 62 78 50 80 C38 78 30 72 30 65 Z" 
                      fill="currentColor"
                      animate={{ 
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    {/* Central Dot */}
                    <motion.circle 
                      cx="50" 
                      cy="52" 
                      r="8" 
                      fill="rgba(255,255,255,0.3)"
                      animate={{ 
                        r: [6, 10, 6],
                        opacity: [0.3, 0.8, 0.3]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                  </motion.svg>
                </div>
              </motion.div>
              
              {/* CyberThink Text Logo */}
              <div>
                <motion.h1 
                  className="text-2xl md:text-3xl lg:text-4xl font-black text-white font-orbitron tracking-tight leading-none"
                  animate={{ 
                    textShadow: [
                      "0 0 20px rgba(34, 197, 94, 0.3)",
                      "0 0 40px rgba(34, 197, 94, 0.5)",
                      "0 0 20px rgba(34, 197, 94, 0.3)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <motion.span 
                    className="bg-gradient-to-r from-green-300 via-emerald-300 to-green-400 bg-clip-text text-transparent drop-shadow-lg"
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    style={{ backgroundSize: "200% 200%" }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    Cyber
                  </motion.span>
                  <span className="text-white drop-shadow-2xl">Think</span>
                </motion.h1>
                
                <motion.p 
                  className="text-emerald-200 text-sm md:text-base font-rajdhani tracking-wide mt-2 font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  Enterprise Risk Management
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Dashboard Window */}
          <motion.div
            className="flex-shrink-0 w-full lg:w-auto lg:flex-1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          >
          {/* Simple Dashboard Window */}
          <motion.div 
            className="bg-white/95 backdrop-blur-xl rounded-xl md:rounded-2xl shadow-lg overflow-hidden border border-gray-200/50 w-full max-w-sm md:max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Simple Header Bar */}
            <motion.div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 flex items-center justify-between"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Window Controls */}
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              
              {/* Window Title */}
              <div className="flex-1 text-center">
                <h2 className="text-white font-semibold text-sm md:text-lg font-orbitron">
                  Dashboard
                </h2>
              </div>
              
              {/* Navigation Items */}
              <div className="flex items-center space-x-2 md:space-x-4 text-xs md:text-sm text-white/90 font-exo2">
                <span>Analytics</span>
                <span>Reports</span>
              </div>
            </motion.div>

            {/* Simple Content */}
            <div className="p-4 md:p-6 bg-gradient-to-br from-gray-50 to-blue-50">
              {/* Risk Overview Title */}
              <div className="mb-4 md:mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg md:text-2xl font-bold text-gray-800 font-orbitron mb-2 sm:mb-0">
                    Risk Overview
                  </h3>
                  <span className="text-xs md:text-sm text-blue-600 font-exo2 font-medium">Low Risk</span>
                </div>
              </div>

              {/* Simple Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                {/* 94% Threat Prevention */}
                <div className="bg-white rounded-lg p-3 md:p-4 shadow border border-gray-100">
                  <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1 font-jetbrains-mono">
                    94%
                  </div>
                  <div className="text-gray-600 font-medium text-xs md:text-sm font-exo2">
                    Threat Prevention
                  </div>
                </div>

                {/* $2.4M Annual Savings */}
                <div className="bg-white rounded-lg p-3 md:p-4 shadow border border-gray-100">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1 font-jetbrains-mono">
                    $2.4M
                  </div>
                  <div className="text-gray-600 font-medium text-xs md:text-sm font-exo2">
                    Annual Savings
                  </div>
                </div>
              </div>

              {/* Simple Chart */}
              <div className="bg-white rounded-lg p-3 md:p-4 shadow border border-gray-100">
                <div className="mb-3">
                  <h4 className="text-sm md:text-lg font-semibold text-gray-800 font-orbitron">
                    Risk Score Trend
                  </h4>
                </div>
                
                {/* Simple Chart Area */}
                <div className="h-24 md:h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg border border-blue-200 flex items-end justify-center p-2 relative">
                  {/* Simple chart bars */}
                  <div className="flex items-end space-x-1 w-full h-full">
                    {Array.from({ length: 12 }, (_, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-t from-blue-400 to-blue-500 rounded-t-sm flex-1 opacity-70"
                        style={{ 
                          height: `${40 + Math.sin(i * 0.5) * 20}%`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        </div>





        {/* Majestic Key Metrics */}
        <motion.div
          className="bg-gradient-to-br from-slate-800/70 via-purple-900/50 to-violet-900/60 backdrop-blur-2xl rounded-3xl md:rounded-4xl shadow-2xl p-6 md:p-12 border border-purple-500/30 relative overflow-hidden mx-4"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 2 }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.4)"
          }}
        >
          {/* Enhanced Glassmorphism effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/10 via-violet-500/15 to-cyan-500/10 rounded-3xl md:rounded-4xl"
            animate={{ 
              background: [
                "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.1), rgba(168,85,247,0.15), rgba(6,182,212,0.1))",
                "linear-gradient(135deg, rgba(168,85,247,0.25), rgba(139,92,246,0.15), rgba(236,72,153,0.1), rgba(59,130,246,0.15))",
                "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.1), rgba(168,85,247,0.15), rgba(6,182,212,0.1))"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          
          {/* Animated border glow */}
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-purple-500/40 via-blue-500/20 via-violet-500/40 to-purple-500/40 rounded-3xl md:rounded-4xl blur-lg"
            animate={{ 
              opacity: [0.3, 0.8, 0.3],
              scale: [0.98, 1.02, 0.98]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          
          <div className="relative z-10">
            <motion.h3 
              className="text-2xl md:text-4xl font-bold text-white mb-8 md:mb-16 text-center font-poppins"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(255, 255, 255, 0.3)",
                  "0 0 40px rgba(255, 255, 255, 0.5)",
                  "0 0 20px rgba(255, 255, 255, 0.3)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              System{' '}
              <motion.span 
                className="bg-gradient-to-r from-purple-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                style={{ backgroundSize: "200% 200%" }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                Performance
              </motion.span>
            </motion.h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {[
                { value: "99.9%", label: "Uptime", color: "cyan", glow: "rgba(103, 232, 249, 0.5)" },
                { value: "24/7", label: "Monitoring", color: "purple", glow: "rgba(139, 92, 246, 0.5)" },
                { value: "<100ms", label: "Response Time", color: "green", glow: "rgba(34, 197, 94, 0.5)" },
                { value: "Enterprise", label: "Grade Security", color: "yellow", glow: "rgba(251, 191, 36, 0.5)" }
              ].map((metric, index) => (
                <motion.div 
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.2 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.1,
                    y: -5
                  }}
                >
                  <motion.div 
                    className={`text-2xl md:text-5xl font-bold text-white mb-2 md:mb-4 font-fira-code tabular-nums drop-shadow-lg group-hover:text-${metric.color}-300 transition-all duration-500`}
                    animate={{ 
                      textShadow: [
                        `0 0 10px ${metric.glow}`,
                        `0 0 30px ${metric.glow}`,
                        `0 0 10px ${metric.glow}`
                      ],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      textShadow: { duration: 3, repeat: Infinity, delay: index * 0.7 },
                      scale: { duration: 4, repeat: Infinity, delay: index * 1 }
                    }}
                  >
                    {metric.value}
                  </motion.div>
                  <motion.div 
                    className="text-purple-200 font-semibold text-xs md:text-base drop-shadow-sm font-outfit tracking-wide"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {metric.label}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>

      {/* Majestic Footer */}
      <motion.footer 
        className="relative z-10 bg-gradient-to-r from-slate-900/90 via-purple-900/80 to-slate-900/90 backdrop-blur-2xl border-t border-purple-500/30 py-8 md:py-16 mt-12 md:mt-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/5 to-purple-500/10"
          animate={{ 
            background: [
              "linear-gradient(90deg, rgba(139,92,246,0.1), rgba(59,130,246,0.05), rgba(139,92,246,0.1))",
              "linear-gradient(90deg, rgba(168,85,247,0.15), rgba(139,92,246,0.08), rgba(168,85,247,0.15))",
              "linear-gradient(90deg, rgba(139,92,246,0.1), rgba(59,130,246,0.05), rgba(139,92,246,0.1))"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div 
              className="flex items-center justify-center space-x-3 md:space-x-4 mb-6 md:mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-2xl"
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(139, 92, 246, 0.4)",
                    "0 0 40px rgba(139, 92, 246, 0.6)",
                    "0 0 20px rgba(139, 92, 246, 0.4)"
                  ],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  boxShadow: { duration: 4, repeat: Infinity },
                  rotate: { duration: 8, repeat: Infinity }
                }}
              >
                <svg className="w-5 h-5 md:w-7 md:h-7 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </motion.div>
              
              <motion.span 
                className="text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-violet-300 bg-clip-text text-transparent font-space-grotesk tracking-tight drop-shadow-lg"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  textShadow: [
                    "0 0 10px rgba(255, 255, 255, 0.3)",
                    "0 0 20px rgba(255, 255, 255, 0.5)",
                    "0 0 10px rgba(255, 255, 255, 0.3)"
                  ]
                }}
                style={{ backgroundSize: "200% 200%" }}
                transition={{ 
                  backgroundPosition: { duration: 6, repeat: Infinity },
                  textShadow: { duration: 4, repeat: Infinity }
                }}
              >
                CyberThink Platform
              </motion.span>
            </motion.div>
            
            <motion.p 
              className="text-purple-200 font-medium text-sm md:text-lg drop-shadow-sm font-manrope leading-relaxed"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              © 2024 CyberThink Platform. Advanced cybersecurity risk management solutions.
            </motion.p>
            
            {/* Additional footer elements */}
            <motion.div
              className="mt-6 md:mt-8 flex justify-center space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3 }}
            >
              {['Security', 'Innovation', 'Excellence'].map((word, index) => (
                <motion.span
                  key={word}
                  className="text-purple-300 text-xs md:text-sm font-medium font-outfit tracking-wide"
                  animate={{ 
                    opacity: [0.6, 1, 0.6],
                    y: [0, -2, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.7
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}