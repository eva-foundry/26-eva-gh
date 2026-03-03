export interface KnowledgeSpace {
  id: string
  name: string
  description: string
  locale: 'en-CA' | 'fr-CA'
  documentCount?: number
  lastUpdated?: Date
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  knowledgeSpaceId?: string
  metadata?: Record<string, unknown>
}

export interface ChatRequest {
  message: string
  knowledgeSpaceId: string
  locale: 'en-CA' | 'fr-CA'
  conversationId?: string
  userId?: string
}

export interface ChatResponse {
  id: string
  content: string
  knowledgeSpaceId: string
  timestamp: Date
  sources?: DocumentSource[]
  metadata?: Record<string, unknown>
}

export interface DocumentSource {
  id: string
  title: string
  excerpt: string
  url?: string
  relevanceScore?: number
}

export interface StreamChunk {
  delta: string
  done: boolean
  messageId?: string
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
  timestamp: Date
}

export interface ApiConfig {
  baseUrl: string
  timeout: number
  retryAttempts: number
  retryDelay: number
}
