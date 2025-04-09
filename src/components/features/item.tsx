'use client'

import { Star } from 'lucide-react'
import Image from 'next/image'

import { formatPrice } from '@/lib/utils'
import { FoodItemType } from '@/types/food'

interface FoodItemProps {
  item: FoodItemType
  onClick: () => void
}

export default function FoodItem({ item, onClick }: FoodItemProps) {
  return (
    <div
      className='flex items-center py-2 cursor-pointer transition-all hover:bg-gray-100 p-3 rounded-md active:scale-99 '
      onClick={onClick}
    >
      <div className='h-16 w-16 rounded-lg overflow-hidden relative'>
        <Image
          src={item.image}
          alt={item.name}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 64px, 64px'
        />
      </div>
      <div className='ml-4 flex-1'>
        <h3 className='font-semibold text-gray-900'>{item.name}</h3>
        <p className='text-gray-500 text-sm'>{formatPrice(Number(item.price))}</p>
      </div>
      <div className='flex items-center'>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(item.rating)
                ? 'fill-red-500 text-red-500'
                : i < item.rating
                  ? 'fill-red-500 text-red-500 fill-opacity-50'
                  : 'text-gray-300'
            }`}
          />
        ))}
        <span className='text-gray-400 text-xs ml-1'>{item.rating}</span>
      </div>
    </div>
  )
}
