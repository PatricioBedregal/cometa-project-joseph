'use client'

import { ArrowLeft, Loader2 } from 'lucide-react'
import Image from 'next/image'

import { formatPrice } from '@/lib/utils'
import { Order } from '@/types/orders'

interface PaymentViewProps {
  order: Order
  onBack: () => void
  onCheckout: () => void
  isLoading: boolean
}

export default function PaymentView({ order, onBack, onCheckout, isLoading }: PaymentViewProps) {
  const subtotal = order.subtotal
  const driverFee = order.driver
  const tax = order.taxes
  const total = subtotal + driverFee + tax

  return (
    <div className='flex flex-col min-h-screen bg-white'>
      <div className='px-6 pt-6 pb-4 flex items-center'>
        <button
          onClick={onBack}
          className={`w-12 h-12 bg-red-500 rounded-md flex items-center justify-center mr-4 cursor-pointer transition-transform hover:scale-105 active:scale-95 ${
            isLoading ? '!cursor-not-allowed !bg-gray-400' : ''
          }`}
          aria-label='Go back'
          disabled={isLoading}
        >
          <ArrowLeft className='w-6 h-6 text-white' />
        </button>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Payment</h1>
          <p className='text-gray-500 mt-1'>You deserve better meal</p>
        </div>
      </div>

      <div className='flex-1 px-6 py-4'>
        <div className='overflow-auto'>
          <h2 className='text-xl font-bold text-gray-900 mb-4'>Item(s) Ordered</h2>
          {order.items.map((item) => (
            <div
              key={item.id}
              className='flex items-center mb-8'
            >
              <div className='h-20 w-20 rounded-lg overflow-hidden relative'>
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.name}
                  fill
                  className='object-cover'
                />
              </div>
              <div className='ml-4 flex-1'>
                <h3 className='text-xl font-semibold text-gray-900'>{item.name}</h3>
                <p className='text-gray-500'>{formatPrice(item.price_per_unit)}</p>
              </div>
              <div className='text-gray-500'>{item.quantity} items</div>
            </div>
          ))}
        </div>

        <h2 className='text-xl font-bold text-gray-900 mb-4'>Details Transaction</h2>
        <div className='space-y-3 mb-8'>
          <div className='flex justify-between'>
            <span className='text-gray-500'>Subtotal</span>
            <span className='text-gray-900 font-medium'>{formatPrice(subtotal)}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-500'>Driver</span>
            <span className='text-gray-900 font-medium'>{formatPrice(driverFee)}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-500'>Tax 10%</span>
            <span className='text-gray-900 font-medium'>{formatPrice(tax)}</span>
          </div>
          <div className='flex justify-between pt-3 border-t border-gray-200'>
            <span className='text-gray-500'>Total Price</span>
            <span className='text-green-500 font-bold'>{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <div className='p-6'>
        <button
          onClick={onCheckout}
          className={`w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-lg font-medium text-lg cursor-pointer transition-all hover:scale-102 active:scale-95 ${
            isLoading ? '!cursor-not-allowed !bg-gray-400' : ''
          }`}
          disabled={isLoading}
        >
          <div className='flex items-center gap-2 justify-center'>
            Checkout Now
            {isLoading && <Loader2 className='w-5 h-5 animate-spin' />}
          </div>
        </button>
      </div>
    </div>
  )
}
