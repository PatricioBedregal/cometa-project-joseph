import { useQuery } from '@tanstack/react-query'
import { compareDesc } from 'date-fns'
import { collection, getDocs, query, where } from 'firebase/firestore'

import { db } from '@/lib/firebase'
import { Order } from '@/types/orders'

const fetchOrders = async (paid: boolean): Promise<Order[]> => {
  const ordersRef = collection(db, 'order')
  const q = query(ordersRef, where('paid', '==', paid))
  const snapshot = await getDocs(q)
  const orders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Order[]

  return orders.sort((a, b) => {
    if (paid) {
      if (a.paid_at && b.paid_at) {
        const dateA = a.paid_at ? a.paid_at.toDate() : new Date(0)
        const dateB = b.paid_at ? b.paid_at.toDate() : new Date(0)
        return compareDesc(dateA, dateB)
      }
      if (a.paid_at && !b.paid_at) return -1
      if (!a.paid_at && b.paid_at) return 1
      return 0
    }

    const dateA = a.created_at ? a.created_at.toDate() : new Date(0)
    const dateB = b.created_at ? b.created_at.toDate() : new Date(0)
    return compareDesc(dateA, dateB)
  })
}

export function useOrders(paid: boolean) {
  return useQuery({
    queryKey: ['orders', paid],
    queryFn: () => fetchOrders(paid),
  })
}
