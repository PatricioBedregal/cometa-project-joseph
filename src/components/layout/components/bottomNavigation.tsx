import { Menu, ShoppingBasket } from 'lucide-react'
import { useRouter } from 'next/router'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useCart } from '@/context/CartContext'

export default function BottomNavigation() {
  const router = useRouter()
  const { totalCartItems } = useCart()

  return (
    <div className='h-16 border-t border-gray-200 flex items-center justify-around px-5 bg-white'>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className='w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 relative cursor-pointer'
            onClick={() => router.push('/')}
            aria-label='Home'
          >
            <Menu color='white' />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Home</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className='w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 relative cursor-pointer'
            aria-label='View cart'
            onClick={() => router.push('/cart')}
          >
            <ShoppingBasket color='white' />
            {totalCartItems > 0 && (
              <span className='absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                {totalCartItems}
              </span>
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Cart</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
