'use client'

import { useEffect, useState } from 'react'

import { Timestamp } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import FoodDetail from '@/components/features/detail'
import { tryCatch } from '@/hooks/tryCatch'
import { useCreateOrder } from '@/hooks/useCreateOrder'
import { useStock } from '@/hooks/useStock'
import { useUpdateStock } from '@/hooks/useUpdateStock'
import { FoodItemType } from '@/types/food'

export default function DetailPage() {
  const router = useRouter()
  const { id } = router.query
  const [selectedFood, setSelectedFood] = useState<FoodItemType | null>(null)
  const { data: stockData, error } = useStock()
  const { mutateAsync: createOrder, isPending: isCreateOrderLoading } = useCreateOrder()
  const { mutateAsync: updateStock, isPending: isUpdateStockLoading } = useUpdateStock()

  useEffect(() => {
    if (id && stockData) {
      const food = stockData.find((item) => item.id === id)
      if (food) {
        setSelectedFood(food)
      } else {
        router.push('/')
      }
    }
  }, [id, stockData, router])

  useEffect(() => {
    if (error) {
      toast.error('There was an error')
    }
  }, [error])

  const addToCart = async (item: FoodItemType, quantity: number) => {
    const subtotal = item.price * quantity

    const orderResult = await tryCatch(
      createOrder({
        created_at: Timestamp.now(),
        paid_at: null,
        paid: false,
        subtotal: subtotal,
        taxes: subtotal * 0.1,
        discount: 0,
        driver: subtotal * 0.05,
        items: [
          {
            name: item.name,
            quantity: quantity,
            total: subtotal,
            price_per_unit: item.price,
            id: item.id,
            image: item.image,
          },
        ],
      })
    )

    if (orderResult.error) return

    const stockResult = await tryCatch(
      updateStock({
        foodId: item.id,
        quantity: item.quantity - quantity,
      })
    )

    if (stockResult.error) return

    toast.success(`${item.name} was added to the cart successfully`)
    router.push('/')
  }

  if (!selectedFood) {
    return <div className='flex justify-center items-center h-screen'>Loading...</div>
  }

  return (
    <FoodDetail
      food={selectedFood}
      onBack={() => router.push('/')}
      onAddToCart={addToCart}
      isLoading={isCreateOrderLoading || isUpdateStockLoading}
    />
  )
}
