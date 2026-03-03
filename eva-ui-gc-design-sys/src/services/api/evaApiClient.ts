import type { ApiConfig, ApiError } from './types'

class EvaApiClient {
  private config: ApiConfig
  private abortControllers: Map<string, AbortController>

  constructor(config?: Partial<ApiConfig>) {
    this.config = {
      baseUrl: config?.baseUrl || import.meta.env.VITE_EVA_API_URL || 'https://api.eva.gc.ca',
      timeout: config?.timeout || 10000,
      retryAttempts: config?.retryAttempts || 2,
      retryDelay: config?.retryDelay || 1000,
    }
    this.abortControllers = new Map()
  }

  private async fetchWithRetry<T>(
    url: string,
    options: RequestInit,
    attempt = 1
  ): Promise<T> {
    const requestId = `${Date.now()}-${Math.random()}`
    const controller = new AbortController()
    this.abortControllers.set(requestId, controller)

    const timeoutId = setTimeout(() => {
      controller.abort()
    }, this.config.timeout)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...options.headers,
        },
      })

      clearTimeout(timeoutId)
      this.abortControllers.delete(requestId)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const apiError: ApiError = {
          code: errorData.code || `HTTP_${response.status}`,
          message: errorData.message || response.statusText,
          details: errorData.details,
          timestamp: new Date(),
        }

        if (response.status >= 500 && attempt < this.config.retryAttempts) {
          await this.delay(this.config.retryDelay * attempt)
          return this.fetchWithRetry<T>(url, options, attempt + 1)
        }

        throw apiError
      }

      return await response.json() as T
    } catch (error) {
      clearTimeout(timeoutId)
      this.abortControllers.delete(requestId)

      if (error instanceof Error && error.name === 'AbortError') {
        const timeoutError: ApiError = {
          code: 'TIMEOUT',
          message: 'Request timed out',
          timestamp: new Date(),
        }
        throw timeoutError
      }

      if (attempt < this.config.retryAttempts) {
        await this.delay(this.config.retryDelay * attempt)
        return this.fetchWithRetry<T>(url, options, attempt + 1)
      }

      throw error
    }
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`
    return this.fetchWithRetry<T>(url, {
      ...options,
      method: 'GET',
    })
  }

  async post<T>(endpoint: string, body: unknown, options?: RequestInit): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`
    return this.fetchWithRetry<T>(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  async put<T>(endpoint: string, body: unknown, options?: RequestInit): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`
    return this.fetchWithRetry<T>(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    })
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`
    return this.fetchWithRetry<T>(url, {
      ...options,
      method: 'DELETE',
    })
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  abortAll(): void {
    this.abortControllers.forEach(controller => controller.abort())
    this.abortControllers.clear()
  }

  setBaseUrl(url: string): void {
    this.config.baseUrl = url
  }

  getConfig(): Readonly<ApiConfig> {
    return { ...this.config }
  }
}

export const evaApiClient = new EvaApiClient()
