'use client'

import { useRouter } from 'next/router'

import Cart from '@/components/features/cart'
import Layout from '@/components/layout/Layout'
import { useOrders } from '@/hooks/useOrders'
import { Order } from '@/types/orders'

export default function CartPage() {
  const router = useRouter()
  const { data: pastOrders, isLoading: isPastOrdersLoading } = useOrders(true)
  const { data: inProgressOrders, isLoading: isInProgressOrdersLoading } = useOrders(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleViewOrder = (order: Order) => {
    router.push(`/payment/${order.id}`)
  }

  return (
    <Layout>
      <Cart
        onBack={() => router.push('/')}
        formatPrice={formatPrice}
        inProgressOrders={inProgressOrders || []}
        pastOrders={pastOrders || []}
        onViewOrder={handleViewOrder}
        isLoading={isPastOrdersLoading || isInProgressOrdersLoading}
      />
    </Layout>
  )
}
