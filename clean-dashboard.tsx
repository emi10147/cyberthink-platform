'use client'

import Link from 'next/link'

export default function WarehouseDashboard() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-white shadow-sm border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-4'>
            <div className='flex items-center space-x-4'>
              <div className='text-2xl'></div>
              <div>
                <h1 className='text-xl font-bold text-gray-900'>WarehouseERP Pro</h1>
                <p className='text-sm text-gray-500'>Professional Warehouse Management</p>
              </div>
            </div>
            <nav className='hidden md:flex items-center space-x-6'>
              <Link href='/' className='text-blue-600 font-medium'>Dashboard</Link>
              <Link href='/inventory' className='text-gray-600 hover:text-gray-900'>Inventory</Link>
              <Link href='/orders' className='text-gray-600 hover:text-gray-900'>Orders</Link>
              <Link href='/shipments' className='text-gray-600 hover:text-gray-900'>Shipments</Link>
            </nav>
          </div>
        </div>
      </header>
      
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='mb-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-2'>Warehouse Dashboard</h2>
          <p className='text-gray-600'>Monitor your warehouse operations in real-time</p>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
          <div className='bg-white rounded-xl shadow-lg p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600 mb-1'>Total Products</p>
                <p className='text-3xl font-bold text-gray-900'>0</p>
                <p className='text-sm text-gray-500 mt-1'>Connect database</p>
              </div>
              <div className='w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center text-white text-xl'></div>
            </div>
          </div>
          
          <div className='bg-white rounded-xl shadow-lg p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600 mb-1'>Low Stock</p>
                <p className='text-3xl font-bold text-gray-900'>0</p>
                <p className='text-sm text-gray-500 mt-1'>Awaiting sync</p>
              </div>
              <div className='w-12 h-12 rounded-lg bg-red-500 flex items-center justify-center text-white text-xl'></div>
            </div>
          </div>
          
          <div className='bg-white rounded-xl shadow-lg p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600 mb-1'>Pending Orders</p>
                <p className='text-3xl font-bold text-gray-900'>0</p>
                <p className='text-sm text-gray-500 mt-1'>Ready to process</p>
              </div>
              <div className='w-12 h-12 rounded-lg bg-yellow-500 flex items-center justify-center text-white text-xl'></div>
            </div>
          </div>
          
          <div className='bg-white rounded-xl shadow-lg p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600 mb-1'>Active Shipments</p>
                <p className='text-3xl font-bold text-gray-900'>0</p>
                <p className='text-sm text-gray-500 mt-1'>In transit</p>
              </div>
              <div className='w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center text-white text-xl'></div>
            </div>
          </div>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <Link href='/inventory'>
            <div className='p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer'>
              <div className='text-3xl mb-3'></div>
              <h4 className='font-semibold text-gray-900 mb-2'>Inventory Management</h4>
              <p className='text-sm text-gray-600'>Track stock levels and locations</p>
            </div>
          </Link>
          
          <Link href='/orders'>
            <div className='p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer'>
              <div className='text-3xl mb-3'></div>
              <h4 className='font-semibold text-gray-900 mb-2'>Order Processing</h4>
              <p className='text-sm text-gray-600'>Manage inbound and outbound orders</p>
            </div>
          </Link>
          
          <Link href='/shipments'>
            <div className='p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer'>
              <div className='text-3xl mb-3'></div>
              <h4 className='font-semibold text-gray-900 mb-2'>Shipment Tracking</h4>
              <p className='text-sm text-gray-600'>Monitor deliveries and logistics</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
