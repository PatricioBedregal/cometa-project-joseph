import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addDoc, collection } from 'firebase/firestore'

import { db } from '@/lib/firebase'
import { Order } from '@/types/orders'

const createOrder = async (data: Partial<Order>) => {
  const ref = await addDoc(collection(db, 'order'), data)
  return ref.id
}

export function useCreateOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })
}
