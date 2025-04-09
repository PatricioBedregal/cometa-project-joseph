'use client'

import { useState } from 'react'

import { ArrowLeft, Loader2, Minus, Plus, Star } from 'lucide-react'
import Image from 'next/image'

import { FoodItemType } from '@/types/food'

interface FoodDetailProps {
  food: FoodItemType
  onBack: () => void
  onAddToCart: (food: FoodItemType, quantity: number) => void
  isLoading: boolean
}

export default function FoodDetail({ food, onBack, onAddToCart, isLoading }: FoodDetailProps) {
  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => {
    if (quantity < food.quantity) {
      setQuantity((prev) => prev + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handleAddToCart = () => {
    onAddToCart(food, quantity)
  }

  return (
    <div className='flex flex-col min-h-screen bg-white'>
      <div className='relative w-full h-[50vh]'>
        <Image
          src={food.image || '/placeholder.svg'}
          alt={food.name}
          fill
          className='object-cover'
          sizes='100vw'
          priority
        />
        <button
          onClick={onBack}
          className={`absolute top-4 left-4 w-10 h-10 bg-red-500 rounded-md flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-105 active:scale-95 ${
            isLoading ? '!cursor-not-allowed !bg-gray-400' : ''
          }`}
          aria-label='Go back'
          disabled={isLoading}
        >
          <ArrowLeft className='w-5 h-5 text-white' />
        </button>
      </div>

      <div className='flex-1 px-6 py-5 bg-white rounded-t-3xl -mt-6 relative'>
        <div className='flex justify-between items-start mb-2'>
          <h1 className='text-2xl font-bold text-gray-900'>{food.name}</h1>
          <div className='flex items-center border border-gray-200 rounded-md'>
            <button
              onClick={decreaseQuantity}
              className='w-10 h-10 flex items-center justify-center cursor-pointer'
              aria-label='Decrease quantity'
            >
              <Minus className='w-4 h-4 text-gray-600' />
            </button>
            <span className='w-10 text-center font-medium'>{quantity}</span>
            <button
              onClick={increaseQuantity}
              className='w-10 h-10 flex items-center justify-center cursor-pointer'
              aria-label='Increase quantity'
            >
              <Plus className='w-4 h-4 text-gray-600' />
            </button>
          </div>
        </div>

        <div className='flex items-center mb-4'>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < Math.floor(food.rating)
                  ? 'fill-red-500 text-red-500'
                  : i < food.rating
                    ? 'fill-red-500 text-red-500 fill-opacity-50'
                    : 'text-gray-300'
              }`}
            />
          ))}
          <span className='text-gray-400 text-xs ml-1'>{food.rating}</span>
        </div>

        <p className='text-gray-500 mb-6'>{food.description}</p>

        <div className='mb-6'>
          <h2 className='text-lg font-semibold text-gray-900 mb-2'>Ingredients:</h2>
          <p className='text-gray-500'>{food.ingredients}</p>
        </div>

        <div className='mt-auto'>
          <p className='text-gray-500 mb-1'>Total Price:</p>
          <div className='flex justify-between items-center'>
            <p className='text-xl font-bold text-gray-900'>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(Number(food.price) * quantity)}
            </p>
            <button
              onClick={handleAddToCart}
              disabled={food.quantity === 0 || isLoading}
              className={`${
                food.quantity === 0 || isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-600 cursor-pointer hover:scale-105 active:scale-95'
              } text-white px-6 py-3 rounded-md font-medium transition-transform flex items-center justify-center`}
            >
              {food.quantity === 0 ? (
                'Out of Stock'
              ) : (
                <div className='flex items-center gap-2'>
                  Order Now
                  {isLoading && <Loader2 className='w-5 h-5 animate-spin' />}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
