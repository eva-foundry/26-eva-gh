import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { PaperPlaneRight, Robot, User, Sparkle } from '@phosphor-icons/react';
import { getEVAResponse } from '@/lib/eva/eva-responses';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  suggestions?: string[];
}

interface EVAChatProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  className?: string;
}

export function EVAChat({ title = 'Ask EVA', subtitle = 'Employment Virtual Assistant', placeholder = 'How can I help you today?', className }: EVAChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const response = getEVAResponse(textToSend);
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.text,
        timestamp: Date.now(),
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  };

  return (
    <Card className={cn('max-w-3xl mx-auto', className)}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Robot size={28} weight="duotone" className="text-primary" aria-hidden="true" />
          </div>
          <div>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription className="text-base">{subtitle}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-[400px] pr-4" ref={scrollRef}>
          <div className="space-y-4" role="log" aria-live="polite" aria-label="Chat messages">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-[350px] text-center">
                <div className="space-y-3">
                  <Sparkle size={48} weight="duotone" className="text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">
                    Ask me about Employment Insurance, Old Age Security, Canada Pension Plan, or job search resources
                  </p>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-3 items-start',
                  message.role === 'user' && 'flex-row-reverse'
                )}
              >
                <div className={cn(
                  'p-2 rounded-full shrink-0',
                  message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                )}>
                  {message.role === 'user' ? (
                    <User size={20} weight="duotone" aria-hidden="true" />
                  ) : (
                    <Robot size={20} weight="duotone" aria-hidden="true" />
                  )}
                </div>
                <div className={cn(
                  'flex-1 space-y-2',
                  message.role === 'user' && 'flex flex-col items-end'
                )}>
                  <div className={cn(
                    'rounded-lg px-4 py-3 max-w-[85%] text-base',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {message.suggestions.map((suggestion, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="cursor-pointer hover:bg-accent transition-colors text-xs"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 items-start">
                <div className="p-2 rounded-full bg-muted shrink-0">
                  <Robot size={20} weight="duotone" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <div className="rounded-lg px-4 py-3 bg-muted max-w-[85%]">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={isLoading}
            className="flex-1 text-base"
            aria-label="Chat message input"
          />
          <Button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            size="icon"
            aria-label="Send message"
          >
            <PaperPlaneRight size={20} weight="fill" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
