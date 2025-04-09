import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { Timestamp } from 'firebase/firestore'

import Cart from '../cart'
import { Order } from '@/types/orders'

describe('Cart Component', () => {
  const mockOnBack = jest.fn()
  const mockOnViewOrder = jest.fn()

  const mockInProgressOrders: Order[] = [
    {
      id: '1',
      items: [
        {
          id: '101',
          name: 'Burger',
          quantity: 2,
          price_per_unit: 9.99,
          image: '/burger.jpg',
          total: 19.98,
        },
      ],
      created_at: Timestamp.now(),
      paid_at: Timestamp.now(),
      discount: 0,
      taxes: 0,
      paid: true,
      subtotal: 19.98,
      driver: 1,
    },
  ]

  const mockPastOrders: Order[] = [
    {
      id: '2',
      items: [
        {
          id: '201',
          name: 'Pizza',
          quantity: 1,
          price_per_unit: 12.99,
          image: '/pizza.jpg',
          total: 12.99,
        },
      ],
      created_at: Timestamp.now(),
      paid_at: Timestamp.now(),
      discount: 0,
      taxes: 0,
      paid: true,
      subtotal: 19.98,
      driver: 1,
    },
  ]

  const renderCart = (props = {}) => {
    return render(
      <Cart
        onBack={mockOnBack}
        inProgressOrders={[]}
        pastOrders={[]}
        onViewOrder={mockOnViewOrder}
        {...props}
      />
    )
  }

  test('renders the cart component with title', () => {
    renderCart()
    expect(screen.getByText('Your Orders')).toBeInTheDocument()
    expect(screen.getByText('Wait for the best beer')).toBeInTheDocument()
  })

  test('shows empty state for in-progress orders when none exist', () => {
    renderCart()
    expect(screen.getByText('No orders in progress')).toBeInTheDocument()
    expect(screen.getByText('Your orders will appear here once you place them')).toBeInTheDocument()
  })

  test('shows empty state for past orders when none exist', () => {
    renderCart()
    fireEvent.click(screen.getByText('Past Orders'))
    expect(screen.getByText('No past orders')).toBeInTheDocument()
    expect(screen.getByText('Your completed orders will appear here')).toBeInTheDocument()
  })

  test('displays in-progress orders when they exist', () => {
    renderCart({ inProgressOrders: mockInProgressOrders })
    expect(screen.getByText('Burger')).toBeInTheDocument()
    expect(screen.getByText(/2 items/)).toBeInTheDocument()
  })

  test('displays past orders when they exist and tab is selected', () => {
    renderCart({ pastOrders: mockPastOrders })
    fireEvent.click(screen.getByText('Past Orders'))
    expect(screen.getByText('Pizza')).toBeInTheDocument()
    expect(screen.getByText(/1 items/)).toBeInTheDocument()
  })

  test('calls onBack when back to home button is clicked', () => {
    renderCart()
    fireEvent.click(screen.getByText('Back to home'))
    expect(mockOnBack).toHaveBeenCalledTimes(1)
  })

  test('switches between tabs correctly', () => {
    renderCart({
      inProgressOrders: mockInProgressOrders,
      pastOrders: mockPastOrders,
    })

    expect(screen.getByText('Burger')).toBeInTheDocument()
    expect(screen.queryByText('Pizza')).not.toBeInTheDocument()

    fireEvent.click(screen.getByText('Past Orders'))
    expect(screen.queryByText('Burger')).not.toBeInTheDocument()
    expect(screen.getByText('Pizza')).toBeInTheDocument()

    fireEvent.click(screen.getByText('In Progress'))
    expect(screen.getByText('Burger')).toBeInTheDocument()
    expect(screen.queryByText('Pizza')).not.toBeInTheDocument()
  })

  test('displays loading skeletons when isLoading is true', () => {
    renderCart({ isLoading: true })
    const skeletonElements = document.querySelectorAll('.animate-pulse')
    expect(skeletonElements.length).toBeGreaterThan(0)
  })
})
