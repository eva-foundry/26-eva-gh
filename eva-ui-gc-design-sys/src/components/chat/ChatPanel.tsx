import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PaperPlaneRight, Copy, User, Robot } from "@phosphor-icons/react"
import { useKV } from "@github/spark/hooks"
import { useTranslation } from "@/hooks/useTranslation"
import { toast } from "sonner"
import { chatService, knowledgeSpaceService } from "@/services/api"
import type { KnowledgeSpace } from "@/services/api"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  isStreaming?: boolean
}

export function ChatPanel() {
  const { t, locale } = useTranslation()
  
  const [messages, setMessages] = useKV<Message[]>("chat-messages", [])
  const messageList = (messages || []).map(msg => ({
    ...msg,
    timestamp: msg.timestamp instanceof Date ? msg.timestamp : new Date(msg.timestamp)
  }))
  const [inputValue, setInputValue] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [selectedSpace, setSelectedSpace] = useKV<string>("selected-knowledge-space", "general")
  const [knowledgeSpaces, setKnowledgeSpaces] = useState<KnowledgeSpace[]>([])
  const [isLoadingSpaces, setIsLoadingSpaces] = useState(true)
  
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const loadKnowledgeSpaces = async () => {
      setIsLoadingSpaces(true)
      try {
        const spaces = await knowledgeSpaceService.listKnowledgeSpaces(
          locale === 'en' ? 'en-CA' : 'fr-CA'
        )
        setKnowledgeSpaces(spaces)
      } catch (error) {
        console.error('Failed to load knowledge spaces:', error)
        toast.error(t('chat.error'))
      } finally {
        setIsLoadingSpaces(false)
      }
    }
    loadKnowledgeSpaces()
  }, [locale, t])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messageList])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isStreaming) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date()
    }

    setMessages((prev) => [...(prev || []), userMessage])
    setInputValue("")
    setIsStreaming(true)

    const assistantMessageId = `assistant-${Date.now()}`
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isStreaming: true
    }

    setMessages((prev) => [...(prev || []), assistantMessage])

    try {
      const stream = chatService.streamMessage({
        message: userMessage.content,
        knowledgeSpaceId: selectedSpace || 'general',
        locale: locale === 'en' ? 'en-CA' : 'fr-CA',
      })

      for await (const chunk of stream) {
        if (chunk.done) {
          setMessages((prev) =>
            (prev || []).map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, isStreaming: false }
                : msg
            )
          )
          break
        }

        setMessages((prev) =>
          (prev || []).map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: msg.content + chunk.delta }
              : msg
          )
        )
      }
    } catch (error) {
      toast.error(t('chat.error'))
      console.error("Chat error:", error)
      setMessages((prev) => (prev || []).filter((msg) => msg.id !== assistantMessageId))
    } finally {
      setIsStreaming(false)
      inputRef.current?.focus()
    }
  }

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    toast.success(t('chat.copied'))
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-2">{t('chat.title')}</h1>
        <p className="text-lg text-muted-foreground mb-4">{t('chat.subtitle')}</p>
        
        <div className="max-w-md">
          <label htmlFor="knowledge-space" className="block text-sm font-semibold text-foreground mb-2">
            {t('chat.knowledgeSpace')}
          </label>
          <Select value={selectedSpace} onValueChange={setSelectedSpace}>
            <SelectTrigger id="knowledge-space" className="w-full">
              <SelectValue placeholder={isLoadingSpaces ? t('chat.loading') : t('chat.selectSpace')} />
            </SelectTrigger>
            <SelectContent>
              {knowledgeSpaces.map((space) => (
                <SelectItem key={space.id} value={space.id}>
                  <div className="flex flex-col">
                    <span className="font-semibold">{space.name}</span>
                    <span className="text-xs text-muted-foreground">{space.description}</span>
                    {space.documentCount && (
                      <span className="text-xs text-muted-foreground mt-1">
                        {space.documentCount} {t('chat.documents')}
                      </span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 p-6" ref={scrollRef}>
          <div className="space-y-6">
            {messageList.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Robot size={64} className="mx-auto mb-4 opacity-50" weight="duotone" />
                <p className="text-lg">{t('chat.empty.message')}</p>
              </div>
            ) : (
              messageList.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                    }`}>
                      {message.role === "user" ? (
                        <User size={20} weight="bold" aria-label={t('chat.you')} />
                      ) : (
                        <Robot size={20} weight="bold" aria-label={t('chat.eva')} />
                      )}
                    </div>
                    
                    <div className={`flex-1 ${message.role === "user" ? "text-right" : "text-left"}`}>
                      <div className={`inline-block p-4 rounded-lg ${
                        message.role === "user" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-secondary text-secondary-foreground"
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs opacity-70">
                          <time dateTime={message.timestamp.toISOString()}>
                            {new Date(message.timestamp).toLocaleTimeString(locale === "en" ? "en-CA" : "fr-CA", {
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </time>
                          <button
                            onClick={() => handleCopyMessage(message.content)}
                            className="ml-2 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring rounded"
                            aria-label={t('chat.copy')}
                          >
                            <Copy size={14} weight="bold" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            
            {isStreaming && (
              <div className="flex gap-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-secondary text-secondary-foreground">
                    <Robot size={20} weight="bold" />
                  </div>
                  <div className="flex items-center gap-1 p-4 bg-secondary rounded-lg">
                    <span className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t bg-card p-4">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              id="chat-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('chat.placeholder')}
              disabled={isStreaming}
              className="flex-1"
              aria-label={t('chat.placeholder')}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isStreaming}
              size="lg"
              aria-label={t('chat.send')}
            >
              <PaperPlaneRight size={20} weight="bold" />
              <span className="ml-2 hidden sm:inline">{isStreaming ? t('chat.sending') : t('chat.send')}</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
