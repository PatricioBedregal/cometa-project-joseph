import { useMutation, useQueryClient } from '@tanstack/react-query'
import { doc, updateDoc } from 'firebase/firestore'

import { db } from '@/lib/firebase'

const updateStock = async ({ foodId, quantity }: { foodId: string; quantity: number }) => {
  const foodRef = doc(db, 'Stock', foodId)
  await updateDoc(foodRef, { quantity })
  return { foodId, quantity }
}

export function useUpdateStock() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateStock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stock'] })
    },
  })
}
