import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'

import { db } from '@/lib/firebase'
import { FoodItemType } from '@/types/food'

const fetchStock = async (): Promise<FoodItemType[]> => {
  const snapshot = await getDocs(collection(db, 'Stock'))

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as FoodItemType[]

  return data
}

export function useStock() {
  return useQuery({
    queryKey: ['stock'],
    queryFn: fetchStock,
  })
}
