import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Timestamp, doc, updateDoc } from 'firebase/firestore'

import { db } from '@/lib/firebase'

const updateOrderPaid = async (orderId: string) => {
  const orderRef = doc(db, 'order', orderId)
  const paid_at = Timestamp.now()
  await updateDoc(orderRef, { paid: true, paid_at })
  return { orderId, paid: true, paid_at }
}

export function useUpdateOrderPaid() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateOrderPaid,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })
}
