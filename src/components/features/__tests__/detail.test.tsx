import { fireEvent, render, screen } from '@testing-library/react'

import FoodDetail from '../detail'
import { FoodItemType } from '@/types/food'

describe('FoodDetail Component', () => {
  const mockFood: FoodItemType = {
    id: '1',
    name: 'Test Food',
    description: 'This is a test food description',
    price: 10.99,
    image: '/test-image.jpg',
    rating: 4.5,
    quantity: 5,
    ingredients: 'Ingredient 1, Ingredient 2, Ingredient 3',
    category: 'test-category',
    is_featured: true,
  }

  const mockOnBack = jest.fn()
  const mockOnAddToCart = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders food details correctly', () => {
    render(
      <FoodDetail
        food={mockFood}
        onBack={mockOnBack}
        onAddToCart={mockOnAddToCart}
        isLoading={false}
      />
    )

    expect(screen.getByText('Test Food')).toBeInTheDocument()
    expect(screen.getByText('This is a test food description')).toBeInTheDocument()
    expect(screen.getByText('Ingredient 1, Ingredient 2, Ingredient 3')).toBeInTheDocument()
    expect(screen.getByText('$10.99')).toBeInTheDocument()
    expect(screen.getByText('Order Now')).toBeInTheDocument()
  })

  it('handles quantity changes correctly', () => {
    render(
      <FoodDetail
        food={mockFood}
        onBack={mockOnBack}
        onAddToCart={mockOnAddToCart}
        isLoading={false}
      />
    )

    expect(screen.getByText('1')).toBeInTheDocument()

    const increaseButton = screen.getByLabelText('Increase quantity')
    fireEvent.click(increaseButton)
    expect(screen.getByText('2')).toBeInTheDocument()

    const decreaseButton = screen.getByLabelText('Decrease quantity')
    fireEvent.click(decreaseButton)
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('prevents quantity from going below 1', () => {
    render(
      <FoodDetail
        food={mockFood}
        onBack={mockOnBack}
        onAddToCart={mockOnAddToCart}
        isLoading={false}
      />
    )

    const decreaseButton = screen.getByLabelText('Decrease quantity')
    fireEvent.click(decreaseButton)
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('prevents quantity from exceeding available stock', () => {
    render(
      <FoodDetail
        food={mockFood}
        onBack={mockOnBack}
        onAddToCart={mockOnAddToCart}
        isLoading={false}
      />
    )

    const increaseButton = screen.getByLabelText('Increase quantity')
    for (let i = 0; i < 5; i++) {
      fireEvent.click(increaseButton)
    }
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('calls onBack when back button is clicked', () => {
    render(
      <FoodDetail
        food={mockFood}
        onBack={mockOnBack}
        onAddToCart={mockOnAddToCart}
        isLoading={false}
      />
    )

    const backButton = screen.getByLabelText('Go back')
    fireEvent.click(backButton)
    expect(mockOnBack).toHaveBeenCalledTimes(1)
  })

  it('calls onAddToCart with correct parameters when order button is clicked', () => {
    render(
      <FoodDetail
        food={mockFood}
        onBack={mockOnBack}
        onAddToCart={mockOnAddToCart}
        isLoading={false}
      />
    )

    const increaseButton = screen.getByLabelText('Increase quantity')
    fireEvent.click(increaseButton)
    fireEvent.click(increaseButton)

    const orderButton = screen.getByText('Order Now')
    fireEvent.click(orderButton)

    expect(mockOnAddToCart).toHaveBeenCalledWith(mockFood, 3)
  })

  it('displays out of stock message when quantity is 0', () => {
    const outOfStockFood = { ...mockFood, quantity: 0 }

    render(
      <FoodDetail
        food={outOfStockFood}
        onBack={mockOnBack}
        onAddToCart={mockOnAddToCart}
        isLoading={false}
      />
    )

    expect(screen.getByText('Out of Stock')).toBeInTheDocument()

    const orderButton = screen.getByText('Out of Stock')
    expect(orderButton).toBeDisabled()
  })

  it('calculates total price correctly based on quantity', () => {
    render(
      <FoodDetail
        food={mockFood}
        onBack={mockOnBack}
        onAddToCart={mockOnAddToCart}
        isLoading={false}
      />
    )

    expect(screen.getByText('$10.99')).toBeInTheDocument()

    const increaseButton = screen.getByLabelText('Increase quantity')
    fireEvent.click(increaseButton)
    fireEvent.click(increaseButton)

    expect(screen.getByText('$32.97')).toBeInTheDocument()
  })
})
