'use client'

import { useEffect } from 'react'

import { toast } from 'react-toastify'
import { create } from 'zustand'

import { useOrders } from '@/hooks/useOrders'

interface CartState {
  totalCartItems: number
  setTotalCartItems: (count: number) => void
}

export const useCartStore = create<CartState>((set) => ({
  totalCartItems: 0,
  setTotalCartItems: (count: number) => set({ totalCartItems: count }),
}))

export function useSyncCartWithOrders() {
  const { data: inProgressOrders, error } = useOrders(false)
  const setTotalCartItems = useCartStore((state) => state.setTotalCartItems)

  useEffect(() => {
    if (error) {
      toast.error('There was an error')
    }
    setTotalCartItems(inProgressOrders?.length || 0)
  }, [inProgressOrders, setTotalCartItems, error])
}

export function useCart() {
  return {
    totalCartItems: useCartStore((state) => state.totalCartItems),
  }
}
