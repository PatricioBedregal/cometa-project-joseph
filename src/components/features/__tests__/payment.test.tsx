import { fireEvent, render, screen } from '@testing-library/react'
import { Timestamp } from 'firebase/firestore'

import PaymentView from '../payment'
import { Order } from '@/types/orders'

describe('PaymentView', () => {
  const mockOrder: Order = {
    id: '1',
    created_at: Timestamp.now(),
    paid_at: Timestamp.now(),
    discount: 0,
    paid: true,
    subtotal: 25.99,
    driver: 5.0,
    taxes: 3.1,
    items: [
      {
        id: '101',
        name: 'Burger',
        price_per_unit: 12.99,
        quantity: 2,
        image: '/burger.jpg',
        total: 25.99,
      },
      {
        id: '102',
        name: 'Fries',
        price_per_unit: 4.99,
        quantity: 1,
        image: '/fries.jpg',
        total: 4.99,
      },
    ],
  }

  const mockOnBack = jest.fn()
  const mockOnCheckout = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the payment view correctly', () => {
    render(
      <PaymentView
        order={mockOrder}
        onBack={mockOnBack}
        onCheckout={mockOnCheckout}
        isLoading={false}
      />
    )

    expect(screen.getByText('Payment')).toBeInTheDocument()

    expect(screen.getByText('Burger')).toBeInTheDocument()
    expect(screen.getByText('Fries')).toBeInTheDocument()

    expect(screen.getByText('$12.99')).toBeInTheDocument()
    expect(screen.getByText('$4.99')).toBeInTheDocument()

    expect(screen.getByText('2 items')).toBeInTheDocument()
    expect(screen.getByText('1 items')).toBeInTheDocument()

    expect(screen.getByText('Subtotal')).toBeInTheDocument()
    expect(screen.getByText('$25.99')).toBeInTheDocument()
    expect(screen.getByText('Driver')).toBeInTheDocument()
    expect(screen.getByText('$5.00')).toBeInTheDocument()
    expect(screen.getByText('Tax 10%')).toBeInTheDocument()
    expect(screen.getByText('$3.10')).toBeInTheDocument()
    expect(screen.getByText('Total Price')).toBeInTheDocument()
    expect(screen.getByText('$34.09')).toBeInTheDocument()

    expect(screen.getByText('Checkout Now')).toBeInTheDocument()
    expect(screen.getByLabelText('Go back')).toBeInTheDocument()
  })

  it('calls onBack when back button is clicked', () => {
    render(
      <PaymentView
        order={mockOrder}
        onBack={mockOnBack}
        onCheckout={mockOnCheckout}
        isLoading={false}
      />
    )

    fireEvent.click(screen.getByLabelText('Go back'))
    expect(mockOnBack).toHaveBeenCalledTimes(1)
  })

  it('calls onCheckout when checkout button is clicked', () => {
    render(
      <PaymentView
        order={mockOrder}
        onBack={mockOnBack}
        onCheckout={mockOnCheckout}
        isLoading={false}
      />
    )

    fireEvent.click(screen.getByText('Checkout Now'))
    expect(mockOnCheckout).toHaveBeenCalledTimes(1)
  })
})
