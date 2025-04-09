'use client'

import { useState } from 'react'

import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'

import { formatPrice } from '@/lib/utils'
import { Order } from '@/types/orders'

interface CartProps {
  onBack: () => void
  inProgressOrders: Order[]
  pastOrders: Order[]
  onViewOrder: (order: Order) => void
  isLoading?: boolean
}

export default function Cart({
  onBack,
  inProgressOrders,
  pastOrders,
  onViewOrder,
  isLoading = false,
}: CartProps) {
  const [activeTab, setActiveTab] = useState('in-progress')

  return (
    <div className='flex flex-col bg-white h-full'>
      <div className='sticky top-0 z-10 bg-white'>
        <div className='px-6 pt-8 pb-4'>
          <h1 className='text-3xl font-bold text-gray-900'>Your Orders</h1>
          <p className='text-gray-500 mt-1'>Wait for the best beer</p>
        </div>

        <div className='px-6 border-b border-gray-200'>
          <div className='flex space-x-8'>
            <button
              onClick={() => setActiveTab('in-progress')}
              className={`py-3 font-medium relative ${
                activeTab === 'in-progress'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-400'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setActiveTab('past-orders')}
              className={`py-3 font-medium relative ${
                activeTab === 'past-orders'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-400'
              }`}
            >
              Past Orders
            </button>
          </div>
        </div>
      </div>

      <div className='flex-1 overflow-auto p-6 mb-[63px]'>
        {isLoading ? (
          <div className='space-y-6'>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className='flex items-center p-1'
              >
                <div className='h-20 w-20 rounded-lg bg-gray-200 animate-pulse'></div>
                <div className='ml-4 flex-1'>
                  <div className='h-5 w-3/4 bg-gray-200 rounded animate-pulse mb-2'></div>
                  <div className='h-4 w-1/2 bg-gray-200 rounded animate-pulse'></div>
                </div>
              </div>
            ))}
          </div>
        ) : activeTab === 'in-progress' ? (
          <>
            {inProgressOrders.length === 0 ? (
              <div className='flex flex-col items-center justify-center h-64 text-center'>
                <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
                  <ShoppingBag className='w-8 h-8 text-gray-400' />
                </div>
                <h2 className='text-xl font-semibold text-gray-900 mb-2'>No orders in progress</h2>
                <p className='text-gray-500 mb-6'>
                  Your orders will appear here once you place them
                </p>
                <button
                  onClick={onBack}
                  className='bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md cursor-pointer transition-transform hover:scale-105 active:scale-95'
                >
                  Back to home
                </button>
              </div>
            ) : (
              <div className='space-y-6'>
                {inProgressOrders?.map((order) =>
                  order.items.map((item) => (
                    <div
                      key={item.id}
                      className='flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded-md transition-all active:scale-99 duration-200'
                      onClick={() => onViewOrder(order)}
                    >
                      <div className='h-20 w-20 rounded-lg overflow-hidden relative'>
                        <Image
                          src={item.image || '/placeholder.svg'}
                          alt={item.name}
                          fill
                          className='object-cover'
                        />
                      </div>
                      <div className='ml-4'>
                        <h3 className='text-xl font-semibold text-gray-900'>{item.name}</h3>
                        <p className='text-gray-500'>
                          {item.quantity} items • {formatPrice(Number(item.price_per_unit))}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        ) : (
          <div className='space-y-6'>
            {pastOrders.length === 0 ? (
              <div className='flex flex-col items-center justify-center h-64 text-center'>
                <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
                  <ShoppingBag className='w-8 h-8 text-gray-400' />
                </div>
                <h2 className='text-xl font-semibold text-gray-900 mb-2'>No past orders</h2>
                <p className='text-gray-500 mb-6'>Your completed orders will appear here</p>
              </div>
            ) : (
              pastOrders?.map((order) =>
                order.items.map((item) => (
                  <div
                    key={item.id}
                    className='flex items-center p-1'
                  >
                    <div className='h-20 w-20 rounded-lg overflow-hidden relative'>
                      <Image
                        src={item.image || '/placeholder.svg'}
                        alt={item.name}
                        fill
                        className='object-cover'
                      />
                    </div>
                    <div className='ml-4'>
                      <h3 className='text-xl font-semibold text-gray-900'>{item.name}</h3>
                      <p className='text-gray-500'>
                        {item.quantity} items • {formatPrice(Number(item.price_per_unit))}
                      </p>
                    </div>
                  </div>
                ))
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}
