import { describe, it, expect, beforeEach, vi } from 'vitest'
import { chatService } from '@/services/api/chatService'
import { evaApiClient } from '@/services/api/evaApiClient'
import type { ChatRequest, ChatResponse } from '@/services/api/types'

vi.mock('@/services/api/evaApiClient', () => ({
  evaApiClient: {
    post: vi.fn(),
    get: vi.fn(),
    delete: vi.fn(),
    getConfig: vi.fn(() => ({ baseUrl: 'https://api.eva.gc.ca' })),
  },
}))

global.window = {
  spark: {
    llm: vi.fn(),
  },
} as any

describe('ChatService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    chatService.setUseProductionAPI(false)
  })

  describe('sendMessage (fallback mode)', () => {
    it('should send message using Spark LLM fallback', async () => {
      const request: ChatRequest = {
        message: 'What are the HR policies?',
        knowledgeSpaceId: 'hr-policies',
        locale: 'en-CA',
      }

      const mockResponse = 'Here are the HR policies...'
      ;(window.spark.llm as any).mockResolvedValueOnce(mockResponse)

      const result = await chatService.sendMessage(request)

      expect(result.content).toBe(mockResponse)
      expect(result.knowledgeSpaceId).toBe('hr-policies')
      expect(result.metadata?.source).toBe('fallback-llm')
      expect(window.spark.llm).toHaveBeenCalled()
    })

    it('should format prompt correctly for English', async () => {
      const request: ChatRequest = {
        message: 'Test question',
        knowledgeSpaceId: 'general',
        locale: 'en-CA',
      }

      ;(window.spark.llm as any).mockResolvedValueOnce('Response')

      await chatService.sendMessage(request)

      const promptCall = (window.spark.llm as any).mock.calls[0][0]
      expect(promptCall).toContain('English')
      expect(promptCall).toContain('Test question')
      expect(promptCall).toContain('general')
    })

    it('should format prompt correctly for French', async () => {
      const request: ChatRequest = {
        message: 'Question test',
        knowledgeSpaceId: 'general',
        locale: 'fr-CA',
      }

      ;(window.spark.llm as any).mockResolvedValueOnce('Réponse')

      await chatService.sendMessage(request)

      const promptCall = (window.spark.llm as any).mock.calls[0][0]
      expect(promptCall).toContain('French')
      expect(promptCall).toContain('Question test')
    })
  })

  describe('sendMessage (production mode)', () => {
    it('should use production API when enabled', async () => {
      chatService.setUseProductionAPI(true)

      const request: ChatRequest = {
        message: 'Test',
        knowledgeSpaceId: 'general',
        locale: 'en-CA',
      }

      const mockResponse: ChatResponse = {
        id: 'msg-1',
        content: 'API response',
        knowledgeSpaceId: 'general',
        timestamp: new Date(),
      }

      ;(evaApiClient.post as any).mockResolvedValueOnce(mockResponse)

      const result = await chatService.sendMessage(request)

      expect(result).toEqual(mockResponse)
      expect(evaApiClient.post).toHaveBeenCalledWith('/api/v1/chat', request)
    })

    it('should fallback to LLM when API fails', async () => {
      chatService.setUseProductionAPI(true)

      const request: ChatRequest = {
        message: 'Test',
        knowledgeSpaceId: 'general',
        locale: 'en-CA',
      }

      ;(evaApiClient.post as any).mockRejectedValueOnce(new Error('API error'))
      ;(window.spark.llm as any).mockResolvedValueOnce('Fallback response')

      const result = await chatService.sendMessage(request)

      expect(result.content).toBe('Fallback response')
      expect(result.metadata?.source).toBe('fallback-llm')
    })
  })

  describe('streamMessage (fallback mode)', () => {
    it('should stream message word by word', async () => {
      const request: ChatRequest = {
        message: 'Test',
        knowledgeSpaceId: 'general',
        locale: 'en-CA',
      }

      ;(window.spark.llm as any).mockResolvedValueOnce('Hello world test')

      const chunks: string[] = []
      for await (const chunk of chatService.streamMessage(request)) {
        if (!chunk.done) {
          chunks.push(chunk.delta)
        }
      }

      expect(chunks.join('')).toBe('Hello world test')
      expect(chunks.length).toBe(3)
    })

    it('should emit done signal when complete', async () => {
      const request: ChatRequest = {
        message: 'Test',
        knowledgeSpaceId: 'general',
        locale: 'en-CA',
      }

      ;(window.spark.llm as any).mockResolvedValueOnce('Response')

      let doneReceived = false
      for await (const chunk of chatService.streamMessage(request)) {
        if (chunk.done) {
          doneReceived = true
        }
      }

      expect(doneReceived).toBe(true)
    })

    it('should include messageId in chunks', async () => {
      const request: ChatRequest = {
        message: 'Test',
        knowledgeSpaceId: 'general',
        locale: 'en-CA',
      }

      ;(window.spark.llm as any).mockResolvedValueOnce('Hello')

      const chunks = []
      for await (const chunk of chatService.streamMessage(request)) {
        chunks.push(chunk)
      }

      const firstChunk = chunks[0]
      expect(firstChunk.messageId).toBeDefined()
    })
  })

  describe('streamMessage (production mode)', () => {
    it('should parse SSE stream from production API', async () => {
      chatService.setUseProductionAPI(true)

      const mockStream = new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode('data: {"delta":"Hello","done":false}\n'))
          controller.enqueue(new TextEncoder().encode('data: {"delta":" world","done":false}\n'))
          controller.enqueue(new TextEncoder().encode('data: [DONE]\n'))
          controller.close()
        },
      })

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        body: mockStream,
      })

      const request: ChatRequest = {
        message: 'Test',
        knowledgeSpaceId: 'general',
        locale: 'en-CA',
      }

      const chunks: string[] = []
      for await (const chunk of chatService.streamMessage(request)) {
        if (!chunk.done) {
          chunks.push(chunk.delta)
        }
      }

      expect(chunks).toEqual(['Hello', ' world'])
    })

    it('should fallback to LLM when streaming fails', async () => {
      chatService.setUseProductionAPI(true)

      global.fetch = vi.fn().mockRejectedValueOnce(new Error('Stream error'))
      ;(window.spark.llm as any).mockResolvedValueOnce('Fallback response')

      const request: ChatRequest = {
        message: 'Test',
        knowledgeSpaceId: 'general',
        locale: 'en-CA',
      }

      const chunks: string[] = []
      for await (const chunk of chatService.streamMessage(request)) {
        if (!chunk.done) {
          chunks.push(chunk.delta)
        }
      }

      expect(chunks.join('')).toContain('Fallback')
    })
  })

  describe('getChatHistory', () => {
    it('should fetch chat history when production API enabled', async () => {
      chatService.setUseProductionAPI(true)

      const mockHistory = [
        { id: 'msg-1', role: 'user', content: 'Question', timestamp: new Date() },
        { id: 'msg-2', role: 'assistant', content: 'Answer', timestamp: new Date() },
      ]

      ;(evaApiClient.get as any).mockResolvedValueOnce(mockHistory)

      const result = await chatService.getChatHistory('conv-123')

      expect(result).toEqual(mockHistory)
      expect(evaApiClient.get).toHaveBeenCalledWith('/api/v1/chat/history/conv-123?limit=100')
    })

    it('should return empty array in fallback mode', async () => {
      const result = await chatService.getChatHistory('conv-123')
      expect(result).toEqual([])
    })

    it('should handle errors gracefully', async () => {
      chatService.setUseProductionAPI(true)
      ;(evaApiClient.get as any).mockRejectedValueOnce(new Error('Network error'))

      const result = await chatService.getChatHistory('conv-123')
      expect(result).toEqual([])
    })

    it('should support custom limit parameter', async () => {
      chatService.setUseProductionAPI(true)
      ;(evaApiClient.get as any).mockResolvedValueOnce([])

      await chatService.getChatHistory('conv-123', 50)

      expect(evaApiClient.get).toHaveBeenCalledWith('/api/v1/chat/history/conv-123?limit=50')
    })
  })

  describe('deleteConversation', () => {
    it('should delete conversation when production API enabled', async () => {
      chatService.setUseProductionAPI(true)
      ;(evaApiClient.delete as any).mockResolvedValueOnce(undefined)

      await chatService.deleteConversation('conv-123')

      expect(evaApiClient.delete).toHaveBeenCalledWith('/api/v1/chat/conversations/conv-123')
    })

    it('should do nothing in fallback mode', async () => {
      await chatService.deleteConversation('conv-123')
      expect(evaApiClient.delete).not.toHaveBeenCalled()
    })
  })

  describe('Configuration', () => {
    it('should toggle between production and fallback mode', () => {
      chatService.setUseProductionAPI(true)
      expect((chatService as any).useProductionAPI).toBe(true)

      chatService.setUseProductionAPI(false)
      expect((chatService as any).useProductionAPI).toBe(false)
    })
  })
})
