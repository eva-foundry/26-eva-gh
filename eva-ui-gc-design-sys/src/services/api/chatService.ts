import { evaApiClient } from './evaApiClient'
import type { ChatRequest, ChatResponse, StreamChunk, ChatMessage } from './types'

export class ChatService {
  private useProductionAPI = false

  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    if (!this.useProductionAPI) {
      return this.sendMessageFallback(request)
    }

    try {
      return await evaApiClient.post<ChatResponse>('/api/v1/chat', request)
    } catch (error) {
      console.error('Failed to send message via API, falling back to LLM:', error)
      return this.sendMessageFallback(request)
    }
  }

  async *streamMessage(request: ChatRequest): AsyncGenerator<StreamChunk, void, undefined> {
    if (!this.useProductionAPI) {
      yield* this.streamMessageFallback(request)
      return
    }

    try {
      const response = await fetch(`${evaApiClient.getConfig().baseUrl}/api/v1/chat/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('No response body reader available')
      }

      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          yield { delta: '', done: true }
          break
        }

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') {
              yield { delta: '', done: true }
              return
            }

            try {
              const chunk = JSON.parse(data) as StreamChunk
              yield chunk
            } catch (error) {
              console.error('Failed to parse SSE chunk:', error)
            }
          }
        }
      }
    } catch (error) {
      console.error('Streaming failed, falling back to LLM:', error)
      yield* this.streamMessageFallback(request)
    }
  }

  private async sendMessageFallback(request: ChatRequest): Promise<ChatResponse> {
    const prompt = `You are EVA, a helpful Government of Canada assistant. Answer the following question based on the ${request.knowledgeSpaceId} knowledge space. Keep responses professional, accurate, and concise.

User question: ${request.message}

Respond in ${request.locale === 'en-CA' ? 'English' : 'French'}.`

    const content = await window.spark.llm(prompt, 'gpt-4o')

    return {
      id: `msg-${Date.now()}`,
      content,
      knowledgeSpaceId: request.knowledgeSpaceId,
      timestamp: new Date(),
      metadata: {
        source: 'fallback-llm',
        model: 'gpt-4o',
      },
    }
  }

  private async *streamMessageFallback(request: ChatRequest): AsyncGenerator<StreamChunk, void, undefined> {
    const response = await this.sendMessageFallback(request)
    
    const words = response.content.split(' ')
    for (let i = 0; i < words.length; i++) {
      const delta = i === 0 ? words[i] : ' ' + words[i]
      yield {
        delta,
        done: false,
        messageId: response.id,
      }
      await this.delay(30)
    }

    yield {
      delta: '',
      done: true,
      messageId: response.id,
    }
  }

  async getChatHistory(
    conversationId: string,
    limit = 100
  ): Promise<ChatMessage[]> {
    if (!this.useProductionAPI) {
      return []
    }

    try {
      return await evaApiClient.get<ChatMessage[]>(
        `/api/v1/chat/history/${conversationId}?limit=${limit}`
      )
    } catch (error) {
      console.error('Failed to fetch chat history:', error)
      return []
    }
  }

  async deleteConversation(conversationId: string): Promise<void> {
    if (!this.useProductionAPI) {
      return
    }

    await evaApiClient.delete<void>(`/api/v1/chat/conversations/${conversationId}`)
  }

  setUseProductionAPI(value: boolean): void {
    this.useProductionAPI = value
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const chatService = new ChatService()
