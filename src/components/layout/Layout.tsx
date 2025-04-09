import { ReactNode } from 'react'

import BottomNavigation from './components/bottomNavigation'
import { useSyncCartWithOrders } from '@/context/CartContext'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  useSyncCartWithOrders()

  return (
    <div className='flex flex-col min-h-screen max-h-screen'>
      <main className='flex-1'>{children}</main>
      <BottomNavigation />
    </div>
  )
}
