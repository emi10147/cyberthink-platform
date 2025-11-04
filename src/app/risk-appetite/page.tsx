'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function RiskAppetitePage() {
  const [organizationType, setOrganizationType] = useState('')
  const [industry, setIndustry] = useState('')
  const [companySize, setCompanySize] = useState('')
  const [riskTolerance, setRiskTolerance] = useState('')
  const [businessObjectives, setBusinessObjectives] = useState('')
  const [regulatoryRequirements, setRegulatoryRequirements] = useState('')
  const [generatedStatement, setGeneratedStatement] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const generateRiskAppetite = async () => {
    setIsGenerating(true)
    
    // Simulate AI generation with realistic delay
    setTimeout(() => {
      const statement = `**ENTERPRISE RISK APPETITE STATEMENT**

*Generated for ${organizationType} organization operating under ${regulatoryRequirements} requirements*

**Executive Summary:**
Our organization maintains a balanced approach to risk management, accepting calculated risks that support business growth while ensuring operational resilience and regulatory compliance.

**Operational Risk Appetite:**
- **Low tolerance** for risks that could result in regulatory violations or compliance failures
- **Moderate tolerance** for operational inefficiencies that enable innovation and growth
- **High tolerance** for competitive risks in pursuit of market leadership

**Financial Risk Appetite:**
- Maximum acceptable loss of **2.5%** of annual revenue per single incident
- **Value at Risk (VaR)** threshold set at **$${Math.floor(Math.random() * 500 + 100)}K** (99% confidence)
- Capital adequacy ratio maintained above **12%**

**Cybersecurity Risk Appetite:**
- **Zero tolerance** for data breaches involving customer personal information
- **Low tolerance** for system outages exceeding **4 hours**
- **Moderate tolerance** for security incidents that do not impact customer data

**Strategic Risk Appetite:**
- Willing to accept **moderate** strategic risks for initiatives with ROI > **15%**
- **Low tolerance** for risks that could damage brand reputation
- **High tolerance** for technology adoption risks that enhance competitive position

**Compliance & Regulatory:**
- **Zero tolerance** for violations of ${regulatoryRequirements}
- All risk decisions must align with regulatory expectations
- Regular reporting to board and regulatory authorities maintained

**Risk Monitoring & Review:**
This risk appetite statement is reviewed quarterly and updated annually or upon significant organizational changes.

*Generated on: ${new Date().toLocaleDateString()}*
*Next Review Date: ${new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString()}*`

      setGeneratedStatement(statement)
      setIsGenerating(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80">
                <div className="text-2xl">📝</div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Risk Appetite Generator</h1>
                  <p className="text-sm text-gray-500">AI-Powered Risk Statement Creation</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-sm text-blue-600 hover:text-blue-800 px-3 py-2 rounded-lg hover:bg-blue-50">← Back to Dashboard</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Generate Risk Appetite Statement
          </h2>
          <p className="text-gray-600">
            Create a comprehensive risk appetite statement tailored to your organization using AI-powered analysis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Organization Context</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization Type
                </label>
                <select
                  value={organizationType}
                  onChange={(e) => setOrganizationType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select organization type</option>
                  <option value="Financial Services">Financial Services</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Technology">Technology</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Retail">Retail</option>
                  <option value="Government">Government</option>
                  <option value="Non-profit">Non-profit</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry Sector
                </label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g., Banking, E-commerce, SaaS"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Size
                </label>
                <select
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select company size</option>
                  <option value="Startup (1-50 employees)">Startup (1-50 employees)</option>
                  <option value="Small (51-200 employees)">Small (51-200 employees)</option>
                  <option value="Medium (201-1000 employees)">Medium (201-1000 employees)</option>
                  <option value="Large (1000+ employees)">Large (1000+ employees)</option>
                  <option value="Enterprise (5000+ employees)">Enterprise (5000+ employees)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Risk Tolerance Level
                </label>
                <select
                  value={riskTolerance}
                  onChange={(e) => setRiskTolerance(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select risk tolerance</option>
                  <option value="Conservative">Conservative - Minimal risk acceptance</option>
                  <option value="Moderate">Moderate - Balanced risk approach</option>
                  <option value="Aggressive">Aggressive - High risk for high reward</option>
                  <option value="Very Conservative">Very Conservative - Risk averse</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Business Objectives
                </label>
                <textarea
                  value={businessObjectives}
                  onChange={(e) => setBusinessObjectives(e.target.value)}
                  placeholder="Describe key business goals and strategic priorities..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Regulatory Requirements
                </label>
                <select
                  value={regulatoryRequirements}
                  onChange={(e) => setRegulatoryRequirements(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select regulatory framework</option>
                  <option value="GDPR">GDPR (General Data Protection Regulation)</option>
                  <option value="SOX">SOX (Sarbanes-Oxley Act)</option>
                  <option value="HIPAA">HIPAA (Health Insurance Portability)</option>
                  <option value="PCI DSS">PCI DSS (Payment Card Industry)</option>
                  <option value="NIST">NIST Cybersecurity Framework</option>
                  <option value="ISO 27001">ISO 27001</option>
                  <option value="Multiple Frameworks">Multiple Regulatory Frameworks</option>
                </select>
              </div>

              <button
                onClick={generateRiskAppetite}
                disabled={!organizationType || !regulatoryRequirements || isGenerating}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Generating Statement...</span>
                  </div>
                ) : (
                  '🤖 Generate Risk Appetite Statement'
                )}
              </button>
            </div>
          </motion.div>

          {/* Generated Statement */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Generated Statement</h3>
              {generatedStatement && (
                <button className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-lg hover:bg-green-200">
                  📄 Export PDF
                </button>
              )}
            </div>

            {generatedStatement ? (
              <div className="prose prose-sm max-w-none">
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
                    {generatedStatement}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Ready to Generate</h4>
                <p className="text-gray-600">
                  Fill in your organization details and click generate to create a customized risk appetite statement.
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Risk Variables Section */}
        {generatedStatement && (
          <motion.div 
            className="mt-8 bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Risk Variables & Thresholds</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Financial Risk</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Max Single Loss:</span>
                    <span className="font-medium">2.5% of revenue</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VaR (99%):</span>
                    <span className="font-medium">${Math.floor(Math.random() * 500 + 100)}K</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Capital Ratio:</span>
                    <span className="font-medium">&gt;12%</span>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">Operational Risk</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Max Downtime:</span>
                    <span className="font-medium">4 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data Breach:</span>
                    <span className="font-medium">Zero tolerance</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Compliance:</span>
                    <span className="font-medium">Zero tolerance</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Strategic Risk</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Min ROI:</span>
                    <span className="font-medium">15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Innovation:</span>
                    <span className="font-medium">High tolerance</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Market Risk:</span>
                    <span className="font-medium">Moderate</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}