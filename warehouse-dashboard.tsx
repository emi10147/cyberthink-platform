'use client'

import { useState } from 'react'
import Link from 'next/link'

// Real-time warehouse metrics (no fake data)
const warehouseData = {
  totalProducts: 0,
  lowStockItems: 0,
  pendingOrders: 0,
  activeShipments: 0,
  todayReceived: 0,
  todayShipped: 0
}

// Professional metric card component
function MetricCard({ title, value, icon, color = 'blue', status }: {
  title: string
  value: string | number
  icon: string
  color?: string
  status?: string
}) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    red: 'from-red-500 to-red-600',
    yellow: 'from-yellow-500 to-yellow-600',
    gray: 'from-gray-500 to-gray-600'
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {status && (
            <p className="text-sm text-gray-500 mt-1">
              {status}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} flex items-center justify-center text-white text-xl`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default function WarehouseDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="text-2xl"></div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">WarehouseERP Pro</h1>
                <p className="text-sm text-gray-500">Professional Warehouse Management System</p>
              </div>
            </div>
            
            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-blue-600 font-medium">Dashboard</Link>
              <Link href="/inventory" className="text-gray-600 hover:text-gray-900">Inventory</Link>
              <Link href="/orders" className="text-gray-600 hover:text-gray-900">Orders</Link>
              <Link href="/shipments" className="text-gray-600 hover:text-gray-900">Shipments</Link>
              <Link href="/suppliers" className="text-gray-600 hover:text-gray-900">Suppliers</Link>
              <Link href="/reports" className="text-gray-600 hover:text-gray-900">Reports</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome back, <span className="font-medium">Warehouse Manager</span>
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                WM
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Warehouse Dashboard</h2>
          <p className="text-gray-600">Monitor your warehouse operations and inventory in real-time</p>
        </div>

        {/* System Status Alert */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-blue-400 text-xl">ℹ</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <span className="font-medium">System Ready:</span> Database connection needed to display live data.
                <Link href="/setup" className="font-medium underline text-blue-700 hover:text-blue-600 ml-1">
                  Configure Database 
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Products"
            value={warehouseData.totalProducts}
            icon=""
            color="blue"
            status="Connect database to view"
          />
          <MetricCard
            title="Low Stock Items"
            value={warehouseData.lowStockItems}
            icon=""
            color="red"
            status="Awaiting inventory sync"
          />
          <MetricCard
            title="Pending Orders"
            value={warehouseData.pendingOrders}
            icon=""
            color="yellow"
            status="Ready for processing"
          />
          <MetricCard
            title="Active Shipments"
            value={warehouseData.activeShipments}
            icon=""
            color="green"
            status="In transit tracking"
          />
        </div>

        {/* Today Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <MetricCard
            title="Today Received"
            value={warehouseData.todayReceived}
            icon=""
            color="green"
            status="Items processed today"
          />
          <MetricCard
            title="Today Shipped"
            value={warehouseData.todayShipped}
            icon=""
            color="purple"
            status="Orders fulfilled today"
          />
        </div>

        {/* Quick Actions - Warehouse Operations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link href="/inventory">
            <button className="w-full p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left">
              <div className="text-3xl mb-3"></div>
              <h4 className="font-semibold text-gray-900 mb-2">Inventory Management</h4>
              <p className="text-sm text-gray-600">Track stock levels, locations, and movements</p>
            </button>
          </Link>
          <Link href="/orders">
            <button className="w-full p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left">
              <div className="text-3xl mb-3"></div>
              <h4 className="font-semibold text-gray-900 mb-2">Order Processing</h4>
              <p className="text-sm text-gray-600">Manage inbound and outbound orders</p>
            </button>
          </Link>
          <Link href="/shipments">
            <button className="w-full p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left">
              <div className="text-3xl mb-3"></div>
              <h4 className="font-semibold text-gray-900 mb-2">Shipment Tracking</h4>
              <p className="text-sm text-gray-600">Monitor deliveries and logistics</p>
            </div>
          </Link>
        </div>

        {/* Additional Operations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/suppliers">
            <button className="w-full p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left">
              <div className="text-3xl mb-3"></div>
              <h4 className="font-semibold text-gray-900 mb-2">Supplier Management</h4>
              <p className="text-sm text-gray-600">Manage vendor relationships and procurement</p>
            </button>
          </Link>
          <Link href="/reports">
            <button className="w-full p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left">
              <div className="text-3xl mb-3"></div>
              <h4 className="font-semibold text-gray-900 mb-2">Analytics & Reports</h4>
              <p className="text-sm text-gray-600">Performance metrics and business intelligence</p>
            </button>
          </Link>
          <Link href="/settings">
            <button className="w-full p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left">
              <div className="text-3xl mb-3"></div>
              <h4 className="font-semibold text-gray-900 mb-2">System Configuration</h4>
              <p className="text-sm text-gray-600">Database setup and system preferences</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
