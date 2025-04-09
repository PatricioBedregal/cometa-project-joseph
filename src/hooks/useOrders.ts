import { useQuery } from '@tanstack/react-query'
import { collection, getDocs, query, where } from 'firebase/firestore'

import { db } from '@/lib/firebase'
import { Order } from '@/types/orders'

const fetchOrders = async (paid: boolean): Promise<Order[]> => {
  const ordersRef = collection(db, 'order')
  const q = query(ordersRef, where('paid', '==', paid))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Order[]
}

export function useOrders(paid: boolean) {
  return useQuery({
    queryKey: ['orders', paid],
    queryFn: () => fetchOrders(paid),
  })
}
