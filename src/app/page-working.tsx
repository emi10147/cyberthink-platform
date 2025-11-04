'use client'

import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🛡️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">CyberRisk Pro</h1>
                <p className="text-sm text-gray-400">Silicon Valley Edition</p>
              </div>
            </div>
            
            <nav className="flex space-x-4">
              <Link href="/" className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Dashboard
              </Link>
              <Link href="/risk-appetite" className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                Risk Appetite
              </Link>
              <Link href="/controls" className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                Controls
              </Link>
              <Link href="/analytics" className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                Analytics
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Security Intelligence
            <br />
            Redefined
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            🚀 Plataforma funcionando correctamente! Diseño Silicon Valley cargado exitosamente.
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-500/20 rounded-xl">
                <span className="text-2xl">📊</span>
              </div>
              <span className="text-red-400 text-sm font-bold">-8.2%</span>
            </div>
            <h3 className="text-sm text-gray-400 uppercase tracking-wide">Risk Score</h3>
            <p className="text-3xl font-bold text-white">94/100</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-500/20 rounded-xl">
                <span className="text-2xl">⚠️</span>
              </div>
              <span className="text-yellow-400 text-sm font-bold">+15.3%</span>
            </div>
            <h3 className="text-sm text-gray-400 uppercase tracking-wide">Active Incidents</h3>
            <p className="text-3xl font-bold text-white">23</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <span className="text-2xl">🛡️</span>
              </div>
              <span className="text-green-400 text-sm font-bold">+2.1%</span>
            </div>
            <h3 className="text-sm text-gray-400 uppercase tracking-wide">Protection Level</h3>
            <p className="text-3xl font-bold text-white">98.7%</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <span className="text-2xl">💰</span>
              </div>
              <span className="text-purple-400 text-sm font-bold">+12.8%</span>
            </div>
            <h3 className="text-sm text-gray-400 uppercase tracking-wide">Cost Savings</h3>
            <p className="text-3xl font-bold text-white">$2.4M</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/risk-appetite" className="group">
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 hover:border-blue-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
              <div className="mb-6 p-4 w-fit bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl">
                <span className="text-3xl">📝</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">AI Risk Assessment</h3>
              <p className="text-gray-300">Generate comprehensive risk appetite statements using advanced AI algorithms.</p>
            </div>
          </Link>

          <Link href="/controls" className="group">
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 hover:border-green-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
              <div className="mb-6 p-4 w-fit bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Security Controls</h3>
              <p className="text-gray-300">Evaluate and optimize your CIS Critical Security Controls implementation.</p>
            </div>
          </Link>

          <Link href="/analytics" className="group">
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 hover:border-purple-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
              <div className="mb-6 p-4 w-fit bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl">
                <span className="text-3xl">📈</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Advanced Analytics</h3>
              <p className="text-gray-300">Unlock deep insights with Value-at-Risk calculations and predictive analytics.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}