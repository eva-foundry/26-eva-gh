import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from './EVAElement.js';
import { repeat } from 'lit/directives/repeat.js';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  type?: 'text' | 'error' | 'info';
}

/**
 * EVA Chat Panel Component
 * Signature component for EVA Suite - RAG chatbot UI
 * GC Design System compliant, WCAG 2.2 AAA
 * 
 * @element eva-chat-panel
 * 
 * @fires message-send - Fires when user sends a message
 * @fires message-retry - Fires when user retries a failed message
 * 
 * @example
 * ```html
 * <eva-chat-panel
 *   greeting="Hello! I'm EVA, your Government of Canada assistant."
 * ></eva-chat-panel>
 * ```
 */
@customElement('eva-chat-panel')
export class EVAChatPanel extends EVAElement {
  protected override componentName = 'eva-chat-panel';

  @property({ type: String })
  greeting = '';

  @property({ type: Boolean })
  isTyping = false;

  @property({ type: Array })
  messages: ChatMessage[] = [];

  @state()
  private _inputValue = '';

  @state()
  private _messagesEndRef: HTMLDivElement | null = null;

  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 600px;
      max-width: 800px;
      margin: 0 auto;
      border: 1px solid #e5e5e5;
      border-radius: 0.5rem;
      background-color: #ffffff;
      overflow: hidden;
    }

    .chat-header {
      padding: 1rem 1.5rem;
      background-color: #26374A;
      color: #ffffff;
      font-weight: 700;
      font-size: 1.125rem;
      border-bottom: 2px solid #1C578A;
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background-color: #f9f9f9;
    }

    .message {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      max-width: 75%;
      animation: slideIn 200ms ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .message.user {
      align-self: flex-end;
    }

    .message.assistant,
    .message.system {
      align-self: flex-start;
    }

    .message-bubble {
      padding: 1rem 1.25rem;
      border-radius: 1rem;
      line-height: 1.6;
      word-wrap: break-word;
    }

    .message.user .message-bubble {
      background-color: #284162;
      color: #ffffff;
      border-bottom-right-radius: 0.25rem;
    }

    .message.assistant .message-bubble {
      background-color: #ffffff;
      color: #333333;
      border: 1px solid #e5e5e5;
      border-bottom-left-radius: 0.25rem;
    }

    .message.system .message-bubble {
      background-color: #f0f7fb;
      color: #284162;
      border: 1px solid #cce7f3;
      font-style: italic;
      text-align: center;
      border-radius: 1rem;
    }

    .message-meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.75rem;
      color: #666666;
    }

    .message.user .message-meta {
      justify-content: flex-end;
    }

    .sender-label {
      font-weight: 700;
    }

    .typing-indicator {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 1.25rem;
      background-color: #ffffff;
      border: 1px solid #e5e5e5;
      border-radius: 1rem;
      max-width: 75px;
      animation: slideIn 200ms ease-out;
    }

    .typing-dot {
      width: 8px;
      height: 8px;
      background-color: #666666;
      border-radius: 50%;
      animation: typing 1.5s infinite;
    }

    .typing-dot:nth-child(2) {
      animation-delay: 0.2s;
    }

    .typing-dot:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes typing {
      0%, 60%, 100% {
        opacity: 0.3;
        transform: translateY(0);
      }
      30% {
        opacity: 1;
        transform: translateY(-8px);
      }
    }

    .chat-input-container {
      padding: 1rem 1.5rem;
      border-top: 1px solid #e5e5e5;
      background-color: #ffffff;
      display: flex;
      gap: 0.75rem;
      align-items: center;
    }

    .chat-input {
      flex: 1;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      font-family: Noto Sans, sans-serif;
      line-height: 1.5;
      color: #333333;
      background-color: #f9f9f9;
      border: 2px solid #e5e5e5;
      border-radius: 1.5rem;
      transition: border-color 200ms ease-in-out;
      min-height: 44px;
    }

    .chat-input:focus {
      outline: none;
      border-color: #284162;
      background-color: #ffffff;
    }

    .chat-input::placeholder {
      color: #999999;
    }

    .send-button {
      background-color: #284162;
      color: #ffffff;
      border: none;
      border-radius: 50%;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 200ms ease-in-out;
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    .send-button:hover:not(:disabled) {
      background-color: #1C578A;
    }

    .send-button:focus-visible {
      outline: 3px solid #26374A;
      outline-offset: 2px;
    }

    .send-button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }

    .greeting-message {
      padding: 1.5rem;
      background-color: #f0f7fb;
      border: 1px solid #cce7f3;
      border-radius: 0.5rem;
      color: #284162;
      text-align: center;
      font-size: 1.125rem;
      line-height: 1.6;
    }

    /* Scrollbar styling */
    .chat-messages::-webkit-scrollbar {
      width: 8px;
    }

    .chat-messages::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    .chat-messages::-webkit-scrollbar-thumb {
      background: #cccccc;
      border-radius: 4px;
    }

    .chat-messages::-webkit-scrollbar-thumb:hover {
      background: #999999;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .message,
      .typing-indicator {
        animation: none;
      }

      .typing-dot {
        animation: none;
        opacity: 0.6;
      }

      .chat-input,
      .send-button {
        transition: none;
      }
    }
  `;

  override render() {
    return html`
      <div class="chat-header">
        ${this.t('eva-chat-panel.title', 'EVA Assistant')}
      </div>

      <div class="chat-messages" @scroll="${this._handleScroll}">
        ${this.greeting && this.messages.length === 0
          ? html`<div class="greeting-message">${this.greeting}</div>`
          : ''}

        ${repeat(
          this.messages,
          (msg) => msg.id,
          (msg) => html`
            <div class="message ${msg.sender}" role="article">
              <div class="message-bubble">${msg.content}</div>
              <div class="message-meta">
                <span class="sender-label">
                  ${msg.sender === 'user'
                    ? this.t('eva-chat-panel.you', 'You')
                    : msg.sender === 'assistant'
                    ? this.t('eva-chat-panel.eva', 'EVA')
                    : this.t('eva-chat-panel.system', 'System')}
                </span>
                <span class="timestamp">${this._formatTime(msg.timestamp)}</span>
              </div>
            </div>
          `
        )}

        ${this.isTyping
          ? html`
              <div class="typing-indicator" role="status" aria-live="polite">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
              </div>
            `
          : ''}

        <div style="height: 1px;" ${this._setMessagesEndRef}></div>
      </div>

      <div class="chat-input-container">
        <input
          type="text"
          class="chat-input"
          .value="${this._inputValue}"
          placeholder="${this.t('eva-chat-panel.placeholder', 'Type your message...')}"
          aria-label="${this.t('eva-chat-panel.input-label', 'Chat message input')}"
          @input="${this._handleInput}"
          @keydown="${this._handleKeydown}"
        />
        <button
          class="send-button"
          aria-label="${this.t('eva-chat-panel.send', 'Send message')}"
          ?disabled="${!this._inputValue.trim() || this.isTyping}"
          @click="${this._handleSend}"
        >
          ➤
        </button>
      </div>
    `;
  }

  override updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('messages') || changedProperties.has('isTyping')) {
      this._scrollToBottom();
    }
  }

  private _setMessagesEndRef = (el: Element): void => {
    this._messagesEndRef = el as HTMLDivElement;
  };

  private _scrollToBottom(): void {
    if (this._messagesEndRef) {
      this._messagesEndRef.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  private _handleScroll(): void {
    // Future: Implement scroll-to-top load more messages
  }

  private _handleInput(event: InputEvent): void {
    const input = event.target as HTMLInputElement;
    this._inputValue = input.value;
  }

  private _handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this._handleSend();
    }
  }

  private _handleSend(): void {
    if (!this._inputValue.trim() || this.isTyping) return;

    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: this._inputValue.trim(),
      timestamp: new Date(),
      type: 'text',
    };

    this.messages = [...this.messages, message];
    this._inputValue = '';

    this.dispatchEvent(
      new CustomEvent('eva-message-send', {
        detail: { message },
        bubbles: true,
        composed: true,
      })
    );

    this.announce(
      this.t('eva-chat-panel.message-sent', 'Message sent'),
      'polite'
    );
  }

  private _formatTime(date: Date): string {
    return date.toLocaleTimeString(this.locale, {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  /**
   * Public method to add assistant response
   */
  public addMessage(message: Omit<ChatMessage, 'id' | 'timestamp'>): void {
    const fullMessage: ChatMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: new Date(),
    };
    this.messages = [...this.messages, fullMessage];
  }

  /**
   * Public method to clear all messages
   */
  public clearMessages(): void {
    this.messages = [];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eva-chat-panel': EVAChatPanel;
  }
}
