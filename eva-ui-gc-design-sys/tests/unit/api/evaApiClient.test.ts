import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { evaApiClient } from '@/services/api/evaApiClient'
import type { ApiError } from '@/services/api/types'

describe('EvaApiClient', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  describe('GET requests', () => {
    it('should successfully fetch data', async () => {
      const mockData = { id: '1', name: 'Test' }
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })

      const result = await evaApiClient.get('/test')
      
      expect(result).toEqual(mockData)
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.objectContaining({ method: 'GET' })
      )
    })

    it('should include proper headers', async () => {
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      })

      await evaApiClient.get('/test')

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }),
        })
      )
    })
  })

  describe('POST requests', () => {
    it('should successfully post data', async () => {
      const requestBody = { message: 'Hello' }
      const mockResponse = { id: 'msg-1', content: 'Response' }
      
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await evaApiClient.post('/chat', requestBody)
      
      expect(result).toEqual(mockResponse)
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/chat'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(requestBody),
        })
      )
    })
  })

  describe('Error handling', () => {
    it('should handle HTTP 404 errors', async () => {
      const errorData = {
        code: 'NOT_FOUND',
        message: 'Resource not found',
      }

      ;(global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => errorData,
      })

      try {
        await evaApiClient.get('/missing')
        expect.fail('Should have thrown error')
      } catch (error) {
        const apiError = error as ApiError
        expect(apiError.code).toBe('NOT_FOUND')
        expect(apiError.message).toBe('Resource not found')
      }
    })

    it('should retry on 500 errors', async () => {
      ;(global.fetch as any)
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
          statusText: 'Internal Server Error',
          json: async () => ({}),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true }),
        })

      const result = await evaApiClient.get('/retry-test')
      
      expect(result).toEqual({ success: true })
      expect(global.fetch).toHaveBeenCalledTimes(2)
    })

    it('should handle timeout errors', async () => {
      ;(global.fetch as any).mockImplementationOnce(() => 
        new Promise((resolve) => {
          setTimeout(resolve, 35000)
        })
      )

      const promise = evaApiClient.get('/slow-endpoint')
      
      await vi.advanceTimersByTimeAsync(31000)

      try {
        await promise
        expect.fail('Should have thrown timeout error')
      } catch (error) {
        const apiError = error as ApiError
        expect(apiError.code).toBe('TIMEOUT')
        expect(apiError.message).toBe('Request timed out')
      }
    })
  })

  describe('Configuration', () => {
    it('should use custom base URL when provided', async () => {
      const customClient = new (evaApiClient.constructor as any)({
        baseUrl: 'https://custom.api.com',
      })

      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      })

      await customClient.get('/test')

      expect(global.fetch).toHaveBeenCalledWith(
        'https://custom.api.com/test',
        expect.any(Object)
      )
    })

    it('should update base URL dynamically', () => {
      const newUrl = 'https://new.api.com'
      evaApiClient.setBaseUrl(newUrl)
      
      const config = evaApiClient.getConfig()
      expect(config.baseUrl).toBe(newUrl)
    })
  })

  describe('Request cancellation', () => {
    it('should abort all pending requests', async () => {
      const abortSpy = vi.fn()
      
      global.AbortController = class {
        signal = { aborted: false }
        abort = abortSpy
      } as any

      ;(global.fetch as any).mockImplementationOnce(() => 
        new Promise((resolve) => setTimeout(resolve, 5000))
      )

      evaApiClient.get('/test')
      evaApiClient.abortAll()

      expect(abortSpy).toHaveBeenCalled()
    })
  })

  describe('PUT requests', () => {
    it('should successfully update data', async () => {
      const updates = { name: 'Updated Name' }
      const mockResponse = { id: '1', name: 'Updated Name' }
      
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await evaApiClient.put('/spaces/1', updates)
      
      expect(result).toEqual(mockResponse)
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/spaces/1'),
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(updates),
        })
      )
    })
  })

  describe('DELETE requests', () => {
    it('should successfully delete resources', async () => {
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      })

      const result = await evaApiClient.delete('/spaces/1')
      
      expect(result).toEqual({ success: true })
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/spaces/1'),
        expect.objectContaining({ method: 'DELETE' })
      )
    })
  })
})
