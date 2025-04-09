'use client'

import { useEffect, useState } from 'react'

import { Star } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import FoodItem from '@/components/features/item'
import { useStock } from '@/hooks/useStock'
import { FoodItemType } from '@/types/food'

export default function Home() {
  const [activeTab, setActiveTab] = useState('new-taste')
  const [foodData, setFoodData] = useState<Record<string, FoodItemType[]>>({})
  const [featuredItems, setFeaturedItems] = useState<FoodItemType[]>([])
  const { data: stockData, isLoading, error } = useStock()
  const router = useRouter()

  useEffect(() => {
    const featured = stockData?.filter((item) => item.is_featured)
    const popular = stockData?.filter((item) => item.category === 'popular')
    setFeaturedItems(featured || [])
    setFoodData({
      'new-taste': stockData || [],
      popular: popular || [],
    })
  }, [stockData])

  useEffect(() => {
    if (error) {
      toast.error('There was an error')
    }
  }, [error])

  return (
    <>
      <div className='px-5 pt-6 pb-4 flex justify-between items-center fixed top-0 left-0 right-0 bg-white z-10 shadow-sm'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>BeerMarket</h1>
          <p className='text-gray-500 mt-1'>Let&apos;s get some beers</p>
        </div>
        <div className='w-15 h-15 rounded-lg overflow-hidden'>
          <Image
            src='https://media.licdn.com/dms/image/v2/D4E03AQHqUUp3G20Ofg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1668556590673?e=1749686400&v=beta&t=zEgOGmSog8Jk52Cp1P3gV6StkrGQa3lncu_pSUDPIy4'
            alt='Profile'
            width={80}
            height={80}
            className='object-cover'
            priority
          />
        </div>
      </div>

      <div className='px-5 flex space-x-4 overflow-x-auto pb-4 scrollbar-hide mt-[125px]'>
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className='min-w-[220px] bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse'
              >
                <div className='h-32 bg-gray-200'></div>
                <div className='p-3'>
                  <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
                  <div className='flex items-center mt-1'>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className='w-4 h-4 mr-1 bg-gray-200 rounded-full'
                      ></div>
                    ))}
                    <div className='h-3 bg-gray-200 rounded w-6 ml-1'></div>
                  </div>
                </div>
              </div>
            ))
          : featuredItems.map((item) => (
              <div
                key={item.id}
                className='min-w-[220px] bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-transform duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer'
                onClick={() => router.push(`/detail/${item.id}`)}
              >
                <div className='h-32 relative'>
                  <Image
                    src={item.image || '/placeholder.svg'}
                    alt={item.name}
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    priority
                  />
                </div>
                <div className='p-3'>
                  <h3 className='font-semibold text-gray-900'>{item.name}</h3>
                  <div className='flex items-center mt-1'>
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
                    <span className='text-gray-500 text-xs ml-1'>{item.rating}</span>
                  </div>
                </div>
              </div>
            ))}
      </div>

      <div className='px-5 border-b border-gray-200'>
        <div className='flex space-x-6 overflow-x-auto scrollbar-hide'>
          <button
            onClick={() => setActiveTab('new-taste')}
            className={`py-3 font-medium whitespace-nowrap relative cursor-pointer transition-transform active:scale-95 ${
              activeTab === 'new-taste'
                ? 'text-gray-900 border-b-2 border-red-500'
                : 'text-gray-400'
            }`}
          >
            New Taste
          </button>
          <button
            onClick={() => setActiveTab('popular')}
            className={`py-3 font-medium whitespace-nowrap relative cursor-pointer transition-transform active:scale-95 ${
              activeTab === 'popular' ? 'text-gray-900 border-b-2 border-red-500' : 'text-gray-400'
            }`}
          >
            Popular
          </button>
        </div>
      </div>

      <div className='flex-1 overflow-auto mb-[63px]'>
        <div className='px-5 py-3'>
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className='flex items-center p-3 border-b border-gray-100 animate-pulse last:border-b-0'
                >
                  <div className='h-16 w-16 rounded-lg bg-gray-200'></div>
                  <div className='ml-4 flex-1'>
                    <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
                    <div className='h-3 bg-gray-200 rounded w-1/2 mb-1'></div>
                  </div>
                  <div className='flex items-center'>
                    <div className='h-5 bg-gray-200 rounded w-16'></div>
                  </div>
                </div>
              ))
            : foodData[activeTab]?.map((item) => (
                <FoodItem
                  key={item.id}
                  item={item}
                  onClick={() => router.push(`/detail/${item.id}`)}
                />
              ))}
        </div>
      </div>
    </>
  )
}
