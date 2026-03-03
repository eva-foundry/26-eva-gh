import { useState, useRef, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { PaperPlaneRight, User, Robot } from '@phosphor-icons/react'

declare const spark: {
  llmPrompt: (strings: TemplateStringsArray, ...values: unknown[]) => string
  llm: (prompt: string, model?: string) => Promise<string>
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export function ChatDemo() {
  const [messages, setMessages] = useKV<Message[]>('chat-messages', [])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: Date.now()
    }

    setMessages((current) => [...(current || []), userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const prompt = spark.llmPrompt`You are a helpful assistant. Respond to the user's message in a friendly and concise way.

User message: ${input.trim()}`
      
      const response = await spark.llm(prompt, 'gpt-4o-mini')

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: Date.now()
      }

      setMessages((current) => [...(current || []), assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now()
      }
      setMessages((current) => [...(current || []), errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-semibold">Chat Demo</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Try out the AI chat assistant
          </p>
        </div>
        {messages && messages.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearChat}>
            Clear Chat
          </Button>
        )}
      </div>

      <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-6" ref={scrollRef}>
            {!messages || messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Robot size={32} className="text-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    Start a conversation by typing a message below
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Robot size={18} />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg px-4 py-3 max-w-[80%] ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words">
                        {message.content}
                      </p>
                    </div>
                    {message.role === 'user' && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-secondary text-secondary-foreground">
                          <User size={18} />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Robot size={18} />
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg px-4 py-3 bg-muted">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="icon"
              >
                <PaperPlaneRight size={20} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
