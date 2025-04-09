import { Timestamp } from 'firebase/firestore'

export interface OrderItem {
  name: string
  quantity: number
  total: number
  image: string
  price_per_unit: number
  id: string
}

export interface Order {
  id: string
  created_at: Timestamp
  paid_at: Timestamp | null
  discount: number
  taxes: number
  items: OrderItem[]
  paid: boolean
  subtotal: number
  driver: number
}
