import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '../i18n/i18n';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const GCChatFrame: React.FC = () => {
  const { lang, setLang } = useI18n();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: lang === 'fr' 
        ? 'Bonjour! Je suis EVA, votre assistant IA du gouvernement du Canada. Comment puis-je vous aider aujourd\'hui?'
        : 'Hello! I\'m EVA, your Government of Canada AI assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sampleQuestions = [
    lang === 'fr' ? 'Quels sont les critères d\'admissibilité au RPC?' : 'What are the CPP eligibility criteria?',
    lang === 'fr' ? 'Comment faire une demande d\'assurance-emploi?' : 'How do I apply for Employment Insurance?',
    lang === 'fr' ? 'Où puis-je trouver des services gouvernementaux?' : 'Where can I find government services?',
  ];

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        lang === 'fr'
          ? `Merci pour votre question sur "${messageText}". Voici quelques informations basées sur les politiques du gouvernement du Canada...`
          : `Thank you for your question about "${messageText}". Here is some information based on Government of Canada policies...`,
        lang === 'fr'
          ? `D'après les directives officielles, je peux vous fournir les détails suivants concernant "${messageText}"...`
          : `According to official guidelines, I can provide you with the following details regarding "${messageText}"...`,
        lang === 'fr'
          ? `C'est une excellente question. Selon les règlements en vigueur, voici ce que vous devez savoir sur "${messageText}"...`
          : `That's a great question. According to current regulations, here's what you need to know about "${messageText}"...`,
      ];

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '600px',
        background: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '2px solid #0535d2',
        overflow: 'hidden',
      }}
    >
      {/* Header - GC Style */}
      <div
        style={{
          background: '#26374a',
          color: '#ffffff',
          padding: '1rem 1.5rem',
          borderBottom: '3px solid #ffbf47',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '2rem' }}>🍁</div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 600 }}>
              {lang === 'fr' ? 'Chatbot du gouvernement du Canada' : 'Government of Canada Chatbot'}
            </h2>
            <div style={{ fontSize: '0.8rem', opacity: 0.85 }}>
              {lang === 'fr' ? 'Assistance bilingue alimentée par l\'IA' : 'Bilingual AI-Powered Assistance'}
            </div>
          </div>
        </div>
        
        {/* Language Toggle */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setLang('en')}
            style={{
              padding: '0.5rem 1rem',
              background: lang === 'en' ? '#0535d2' : 'transparent',
              color: '#ffffff',
              border: '1px solid #ffffff',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            EN
          </button>
          <button
            onClick={() => setLang('fr')}
            style={{
              padding: '0.5rem 1rem',
              background: lang === 'fr' ? '#0535d2' : 'transparent',
              color: '#ffffff',
              border: '1px solid #ffffff',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            FR
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.5rem',
          background: '#f5f5f5',
        }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              display: 'flex',
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '1rem',
            }}
          >
            <div
              style={{
                maxWidth: '75%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: message.role === 'user' ? '#0535d2' : '#ffffff',
                color: message.role === 'user' ? '#ffffff' : '#26374a',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: message.role === 'assistant' ? '1px solid #e0e0e0' : 'none',
              }}
            >
              <div style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>
                {message.content}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  marginTop: '0.5rem',
                  opacity: 0.7,
                }}
              >
                {message.timestamp.toLocaleTimeString(lang === 'fr' ? 'fr-CA' : 'en-CA', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem' }}>
            <div
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: '#ffffff',
                border: '1px solid #e0e0e0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <div style={{ fontSize: '0.9rem', color: '#605e5c' }}>
                  {lang === 'fr' ? 'EVA tape' : 'EVA is typing'}
                </div>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0535d2', animation: 'pulse 1.5s infinite' }} />
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0535d2', animation: 'pulse 1.5s infinite 0.2s' }} />
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0535d2', animation: 'pulse 1.5s infinite 0.4s' }} />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Sample Questions */}
      {messages.length === 1 && (
        <div
          style={{
            padding: '1rem 1.5rem',
            background: '#ffffff',
            borderTop: '1px solid #e0e0e0',
          }}
        >
          <div style={{ fontSize: '0.85rem', color: '#605e5c', marginBottom: '0.75rem', fontWeight: 600 }}>
            {lang === 'fr' ? 'Questions suggérées:' : 'Suggested questions:'}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {sampleQuestions.map((question, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(question)}
                style={{
                  padding: '0.5rem 0.75rem',
                  background: '#f5f5f5',
                  border: '1px solid #0535d2',
                  borderRadius: '999px',
                  color: '#0535d2',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#0535d2';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f5f5f5';
                  e.currentTarget.style.color = '#0535d2';
                }}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div
        style={{
          padding: '1rem 1.5rem',
          background: '#ffffff',
          borderTop: '2px solid #e0e0e0',
        }}
      >
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={lang === 'fr' ? 'Tapez votre question ici...' : 'Type your question here...'}
            disabled={isTyping}
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              border: '2px solid #e0e0e0',
              borderRadius: '4px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#0535d2')}
            onBlur={(e) => (e.target.style.borderColor = '#e0e0e0')}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            style={{
              padding: '0.75rem 1.5rem',
              background: input.trim() && !isTyping ? '#0535d2' : '#e0e0e0',
              color: input.trim() && !isTyping ? '#ffffff' : '#999999',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (input.trim() && !isTyping) {
                e.currentTarget.style.background = '#26374a';
              }
            }}
            onMouseLeave={(e) => {
              if (input.trim() && !isTyping) {
                e.currentTarget.style.background = '#0535d2';
              }
            }}
          >
            {lang === 'fr' ? 'Envoyer' : 'Send'}
          </button>
        </div>
        
        {/* Footer Notice */}
        <div
          style={{
            marginTop: '0.75rem',
            fontSize: '0.75rem',
            color: '#605e5c',
            textAlign: 'center',
            padding: '0.5rem',
            background: '#f9f4d4',
            borderRadius: '4px',
            borderLeft: '3px solid #ffbf47',
          }}
        >
          {lang === 'fr'
            ? '⚠️ Ceci est une démo. Les réponses sont simulées à des fins de démonstration.'
            : '⚠️ This is a demo. Responses are simulated for demonstration purposes.'}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default GCChatFrame;
