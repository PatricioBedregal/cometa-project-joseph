import { fireEvent, render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'

import { useStock } from '../../../hooks/useStock'
import Home from '../home'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}))

jest.mock('../../../hooks/useStock', () => ({
  useStock: jest.fn(),
}))

describe('Home Component', () => {
  const mockRouter = {
    push: jest.fn(),
  }

  const mockStockData = [
    {
      id: '1',
      name: 'Food Item 1',
      image: '/food1.jpg',
      rating: 4.5,
      price: 10.99,
      is_featured: true,
      category: 'new-taste',
    },
    {
      id: '2',
      name: 'Food Item 2',
      image: '/food2.jpg',
      rating: 3.8,
      price: 8.99,
      is_featured: true,
      category: 'popular',
    },
    {
      id: '3',
      name: 'Food Item 3',
      image: '/food3.jpg',
      rating: 4.2,
      price: 12.99,
      is_featured: false,
      category: 'popular',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    ;(useStock as jest.Mock).mockReturnValue({
      data: mockStockData,
      isLoading: false,
      error: null,
    })
  })

  test('renders the component with titles', () => {
    render(<Home />)

    expect(screen.getByText('FoodMarket')).toBeInTheDocument()
    expect(screen.getByText("Let's get some foods")).toBeInTheDocument()
  })

  test('displays featured items correctly', () => {
    render(<Home />)

    expect(screen.getAllByText('Food Item 1')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Food Item 2')[0]).toBeInTheDocument()
  })

  test('changes tab when clicking on tab buttons', () => {
    render(<Home />)

    expect(screen.getByText('New Taste').className).toContain('border-red-500')

    fireEvent.click(screen.getByText('Popular'))

    expect(screen.getByText('Popular').className).toContain('border-red-500')
    expect(screen.getByText('New Taste').className).not.toContain('border-red-500')
  })

  test('navigates to detail page when clicking on a food item', () => {
    render(<Home />)

    fireEvent.click(screen.getAllByText('Food Item 1')[0])

    expect(mockRouter.push).toHaveBeenCalledWith('/detail/1')
  })
})
