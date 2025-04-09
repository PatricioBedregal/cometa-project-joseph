import { toast } from 'react-toastify'

import { tryCatch } from '../tryCatch'

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}))

describe('tryCatch', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns data on success', async () => {
    const mockPromise = Promise.resolve('Success!')
    const result = await tryCatch(mockPromise)

    expect(result).toEqual({ data: 'Success!', error: null })
    expect(toast.error).not.toHaveBeenCalled()
  })

  it('returns error and shows toast on failure', async () => {
    const mockError = new Error('Something went wrong')
    const mockPromise = Promise.reject(mockError)
    const result = await tryCatch(mockPromise)

    expect(result).toEqual({ data: null, error: mockError })
    expect(toast.error).toHaveBeenCalledWith('There was an error')
  })
})
