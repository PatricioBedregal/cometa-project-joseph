'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import PaymentView from '@/components/features/payment'
import { tryCatch } from '@/hooks/tryCatch'
import { useOrders } from '@/hooks/useOrders'
import { useUpdateOrderPaid } from '@/hooks/useUpdateOrderPaid'
import { Order } from '@/types/orders'

export default function PaymentPage() {
  const router = useRouter()
  const { id } = router.query
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const { data: inProgressOrders } = useOrders(false)
  const { mutateAsync: updateOrderPaid, isPending: isUpdateOrderPaidPending } = useUpdateOrderPaid()

  useEffect(() => {
    if (id && inProgressOrders) {
      const order = inProgressOrders.find((order) => order.id === id)
      if (order) {
        setSelectedOrder(order)
      } else {
        router.push('/cart')
      }
    }
  }, [id, inProgressOrders, router])

  const handleCompleteOrder = async () => {
    if (selectedOrder) {
      const result = await tryCatch(updateOrderPaid(selectedOrder.id))
      if (result.error) return

      toast.success(`The order was completed successfully`)
      router.push('/cart')
    }
  }

  if (!selectedOrder) {
    return <div className='flex justify-center items-center h-screen'>Loading...</div>
  }

  return (
    <PaymentView
      order={selectedOrder}
      onBack={() => router.push('/cart')}
      onCheckout={handleCompleteOrder}
      isLoading={isUpdateOrderPaidPending}
    />
  )
}
