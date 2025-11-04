'use client'

import { useState } from 'react'
import Link from 'next/link'

// Mock data for demonstration
const mockData = {
  todayRevenue: 2847.50,
  todayOrders: 42,
  totalCustomers: 1234,
  pendingOrders: 7,
  lowStockItems: 3,
  activeStaff: 12,
  recentOrders: [
    { id: 'ORD-001', customer: 'John Smith', table: 5, amount: 45.99, status: 'preparing', time: '2 mins ago' },
    { id: 'ORD-002', customer: 'Sarah Johnson', table: null, amount: 23.50, status: 'ready', time: '5 mins ago' },
    { id: 'ORD-003', customer: 'Mike Brown', table: 12, amount: 89.75, status: 'completed', time: '8 mins ago' }
  ],
  popularItems: [
    { name: 'Classic Burger', orders: 156, revenue: 2496.44 },
    { name: 'Grilled Salmon', orders: 89, revenue: 2044.11 },
    { name: 'Caesar Salad', orders: 124, revenue: 1363.76 },
    { name: 'BBQ Ribs', orders: 67, revenue: 1673.33 }
  ]
}

// Professional metric card component
function MetricCard({ title, value, icon, color = 'blue', change }: {
  title: string
  value: string
  icon: string
  color?: string
  change?: string
}) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    red: 'from-red-500 to-red-600',
    yellow: 'from-yellow-500 to-yellow-600'
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className="text-sm text-green-600 mt-1">
               {change}
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

// Order status badge component
function StatusBadge({ status }: { status: string }) {
  const statusColors = {
    preparing: 'bg-yellow-100 text-yellow-800',
    ready: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800'
  }

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[status as keyof typeof statusColors]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

export default function Home() {
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
                <h1 className="text-xl font-bold text-gray-900">RestaurantERP Pro</h1>
                <p className="text-sm text-gray-500">Professional Restaurant Management</p>
              </div>
            </div>
            
            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-blue-600 font-medium">Dashboard</Link>
              <Link href="/orders" className="text-gray-600 hover:text-gray-900">Orders</Link>
              <Link href="/menu" className="text-gray-600 hover:text-gray-900">Menu</Link>
              <Link href="/inventory" className="text-gray-600 hover:text-gray-900">Inventory</Link>
              <Link href="/staff" className="text-gray-600 hover:text-gray-900">Staff</Link>
              <Link href="/reports" className="text-gray-600 hover:text-gray-900">Reports</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome back, <span className="font-medium">Admin</span>
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-gray-600">Welcome back! Here is what is happening at your restaurant today.</p>
        </div>

        {/* Alert Banner */}
        {mockData.lowStockItems > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-yellow-400 text-xl"></span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <span className="font-medium">Low Stock Alert:</span> {mockData.lowStockItems} items are running low on stock.
                  <Link href="/inventory" className="font-medium underline text-yellow-700 hover:text-yellow-600 ml-1">
                    View inventory 
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Today Revenue"
            value={`$${mockData.todayRevenue.toLocaleString()}`}
            icon=""
            color="green"
            change="+12.5% from yesterday"
          />
          <MetricCard
            title="Orders Today"
            value={mockData.todayOrders.toString()}
            icon=""
            color="blue"
            change="+8 orders this hour"
          />
          <MetricCard
            title="Total Customers"
            value={mockData.totalCustomers.toLocaleString()}
            icon=""
            color="purple"
            change="+15 new this week"
          />
          <MetricCard
            title="Pending Orders"
            value={mockData.pendingOrders.toString()}
            icon=""
            color={mockData.pendingOrders > 5 ? "red" : "yellow"}
          />
        </div>

        {/* Recent Orders & Popular Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Recent Orders</h3>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {mockData.recentOrders.length} active
              </span>
            </div>
            <div className="space-y-4">
              {mockData.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900">{order.id}</p>
                      <StatusBadge status={order.status} />
                    </div>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                    <p className="text-xs text-gray-500">
                      {order.table ? `Table ${order.table}` : 'Takeout'}  {order.time}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-lg font-semibold text-gray-900">${order.amount}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/orders">
              <button className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                View All Orders
              </button>
            </Link>
          </div>

          {/* Popular Items */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Popular Menu Items</h3>
            <div className="space-y-4">
              {mockData.popularItems.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.orders} orders</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">${item.revenue.toLocaleString()}</p>
                </div>
              ))}
            </div>
            <Link href="/menu">
              <button className="w-full mt-4 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
                View Menu Analytics
              </button>
            </Link>
          </div>
        </div>

        {/* Quick Actions - Now with working links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/orders">
            <button className="w-full p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left">
              <div className="text-3xl mb-3"></div>
              <h4 className="font-semibold text-gray-900 mb-2">Manage Orders</h4>
              <p className="text-sm text-gray-600">View and manage all orders</p>
            </button>
          </Link>
          <Link href="/inventory">
            <button className="w-full p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left">
              <div className="text-3xl mb-3"></div>
              <h4 className="font-semibold text-gray-900 mb-2">Check Inventory</h4>
              <p className="text-sm text-gray-600">View current stock levels</p>
            </button>
          </Link>
          <Link href="/staff">
            <button className="w-full p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left">
              <div className="text-3xl mb-3"></div>
              <h4 className="font-semibold text-gray-900 mb-2">Staff Management</h4>
              <p className="text-sm text-gray-600">Manage staff and shifts</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
