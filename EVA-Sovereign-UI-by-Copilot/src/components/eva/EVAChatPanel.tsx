import { useState, useRef, useEffect } from 'react'
import { i18nService } from '@/lib/i18n-service'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PaperPlaneRight, Microphone } from '@phosphor-icons/react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useLocaleChange } from '@/hooks/use-locale-change'

interface Message {
    id: string
    sender: 'user' | 'bot'
    text: string
    timestamp: Date
}

const botResponses = [
    'I can help you with that. Let me find the information for you.',
    'That\'s a great question! Here\'s what I found...',
    'I\'d be happy to assist you with your request.',
    'Based on your inquiry, I recommend the following steps...',
    'For more detailed information, please visit our help center.',
]

export function EVAChatPanel() {
    useLocaleChange()
    
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            sender: 'bot',
            text: i18nService.t('chat.welcome'),
            timestamp: new Date(),
        },
    ])
    const [inputValue, setInputValue] = useState('')
    const [isSending, setIsSending] = useState(false)
    const scrollAreaRef = useRef<HTMLDivElement>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isSending) return

        setIsSending(true)
        const userMessage: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: inputValue,
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInputValue('')

        setTimeout(() => {
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'bot',
                text: botResponses[Math.floor(Math.random() * botResponses.length)],
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, botMessage])
            setIsSending(false)
            inputRef.current?.focus()
        }, 1000)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const handleVoiceInput = () => {
        console.log('Voice input requested')
    }

    return (
        <Card className="flex flex-col h-[600px]">
            <CardHeader className="border-b border-border">
                <div className="flex items-center gap-3">
                    <div 
                        className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold"
                        aria-hidden="true"
                    >
                        EVA
                    </div>
                    <div>
                        <CardTitle className="text-lg">
                            {i18nService.t('chat.title')}
                        </CardTitle>
                        <CardDescription>
                            {i18nService.t('chat.subtitle')}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex-1 p-0 overflow-hidden">
                <ScrollArea className="h-full p-4">
                    <div 
                        ref={scrollAreaRef} 
                        className="space-y-4"
                        role="log"
                        aria-label={i18nService.t('chat.messageList')}
                        aria-live="polite"
                        aria-atomic="false"
                    >
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${
                                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                                }`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                        message.sender === 'user'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted text-foreground'
                                    }`}
                                    role={message.sender === 'bot' ? 'article' : undefined}
                                    aria-label={message.sender === 'bot' ? 'EVA response' : undefined}
                                >
                                    <p className="text-sm">{message.text}</p>
                                    <time 
                                        className="text-xs opacity-70 mt-1 block"
                                        dateTime={message.timestamp.toISOString()}
                                    >
                                        {message.timestamp.toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </time>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </ScrollArea>
            </CardContent>

            <CardFooter className="border-t border-border p-4">
                <form 
                    className="flex gap-2 w-full"
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSendMessage()
                    }}
                    aria-label="Send message to EVA"
                >
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={handleVoiceInput}
                        aria-label={i18nService.t('chat.voice')}
                        disabled={isSending}
                    >
                        <Microphone size={20} aria-hidden="true" />
                    </Button>
                    <Input
                        ref={inputRef}
                        id="chat-input"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={i18nService.t('chat.placeholder')}
                        className="flex-1"
                        disabled={isSending}
                        aria-label={i18nService.t('chat.placeholder')}
                        autoComplete="off"
                    />
                    <Button 
                        type="submit"
                        disabled={!inputValue.trim() || isSending}
                        aria-label={isSending ? i18nService.t('chat.sending') : i18nService.t('chat.send')}
                    >
                        <PaperPlaneRight size={20} aria-hidden="true" />
                        <span className="ml-2">{i18nService.t('chat.send')}</span>
                    </Button>
                </form>
                {isSending && (
                    <div className="sr-only" role="status" aria-live="polite">
                        {i18nService.t('chat.sending')}
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}
