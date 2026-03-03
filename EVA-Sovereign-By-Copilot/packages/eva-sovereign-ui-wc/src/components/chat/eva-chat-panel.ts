/**
 * EVA Chat Panel Component
 * Complete chat interface with message history and input
 */

import { EVABaseComponent } from '../../utils/base-component';
import { gcColors, gcTypography, gcSpacing } from '../../tokens';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export class EVAChatPanel extends EVABaseComponent {
  private messages: Message[] = [];
  private messageContainer?: HTMLDivElement;
  private inputField?: HTMLInputElement;

  static get observedAttributes() {
    return ['title-key', 'placeholder-key', 'assistant-name'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupEventListeners();
    this.addWelcomeMessage();
  }

  attributeChangedCallback() {
    this.render();
  }

  private addWelcomeMessage() {
    this.addMessage('assistant', this.t('chat.welcome'));
  }

  private setupEventListeners() {
    this.shadow.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSend();
    });

    this.shadow.addEventListener('keydown', (e: Event) => {
      const keyEvent = e as KeyboardEvent;
      if (keyEvent.key === 'Enter' && !keyEvent.shiftKey) {
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT') {
          e.preventDefault();
          this.handleSend();
        }
      }
    });
  }

  private handleSend() {
    if (!this.inputField) return;

    const message = this.inputField.value.trim();
    if (!message) return;

    this.addMessage('user', message);
    this.inputField.value = '';

    // Simulate AI response
    setTimeout(() => {
      const response = this.getEVAResponse(message);
      this.addMessage('assistant', response);
    }, 500);
  }

  private addMessage(type: 'user' | 'assistant', content: string) {
    const message: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
    };

    this.messages.push(message);
    this.renderMessages();
  }

  private getEVAResponse(userMessage: string): string {
    const msg = userMessage.toLowerCase();

    // Employment Insurance
    if (msg.includes('employment insurance') || msg.includes('ei')) {
      return 'Employment Insurance (EI) provides temporary financial assistance to unemployed Canadians while they look for work or upgrade their skills. You may be eligible if you have lost your job through no fault of your own and have worked enough insurable hours.';
    }

    // Old Age Security
    if (msg.includes('old age security') || msg.includes('oas') || msg.includes('pension')) {
      return 'Old Age Security (OAS) is a monthly payment available to most Canadians 65 years of age or older. You do not need to have worked to receive OAS. The amount depends on how long you have lived in Canada after age 18.';
    }

    // Canada Pension Plan
    if (msg.includes('canada pension') || msg.includes('cpp')) {
      return 'Canada Pension Plan (CPP) is a contributory, earnings-related social insurance program. It provides retirement pensions, disability benefits, and survivor benefits. You contribute to CPP through payroll deductions during your working years.';
    }

    // Job search
    if (msg.includes('job') || msg.includes('work') || msg.includes('employment')) {
      return 'ESDC offers many job search resources including Job Bank (jobbank.gc.ca), skills training programs, and employment services. I can help you find the right program for your needs.';
    }

    // Benefits
    if (msg.includes('benefit')) {
      return 'ESDC administers several benefit programs including Employment Insurance (EI), Canada Pension Plan (CPP), Old Age Security (OAS), and the Canada Child Benefit. Which program would you like to know more about?';
    }

    // Default
    return 'I can help you with information about ESDC programs and services. Try asking about:\n• Employment Insurance (EI)\n• Old Age Security (OAS)\n• Canada Pension Plan (CPP)\n• Job search resources\n• Benefits programs';
  }

  private renderMessages() {
    if (!this.messageContainer) return;

    this.messageContainer.innerHTML = '';

    this.messages.forEach(message => {
      const messageEl = document.createElement('eva-chat-message');
      messageEl.setAttribute('type', message.type);
      messageEl.setAttribute('timestamp', message.timestamp.toISOString());
      messageEl.textContent = message.content;
      this.messageContainer!.appendChild(messageEl);
    });

    // Scroll to bottom
    this.messageContainer.scrollTop = this.messageContainer.scrollHeight;

    // Announce new message to screen readers
    const liveRegion = this.shadow.querySelector('[role="log"]');
    if (liveRegion && this.messages.length > 0) {
      const lastMessage = this.messages[this.messages.length - 1];
      liveRegion.textContent = `${lastMessage.type === 'user' ? 'You' : 'EVA'}: ${lastMessage.content}`;
    }
  }

  protected render(): void {
    const titleKey = this.getAttr('title-key', 'chat.title');
    const placeholderKey = this.getAttr('placeholder-key', 'chat.placeholder');

    const title = this.t(titleKey);
    const placeholder = this.t(placeholderKey);

    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
        margin-top: ${gcSpacing.xxl};
      }

      .chat-panel {
        max-width: 800px;
        margin: 0 auto;
        border: 2px solid ${gcColors.border};
        border-radius: ${gcSpacing.xs};
        background: ${gcColors.background};
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .chat-header {
        background: ${gcColors.accent};
        color: ${gcColors.textWhite};
        padding: ${gcSpacing.md};
        font-family: ${gcTypography.fontHeading};
        font-size: ${gcTypography.sizeH4};
        font-weight: ${gcTypography.weightBold};
      }

      .chat-messages {
        height: 400px;
        overflow-y: auto;
        padding: ${gcSpacing.md};
        background: ${gcColors.backgroundGrey};
      }

      .chat-form {
        display: flex;
        gap: ${gcSpacing.sm};
        padding: ${gcSpacing.md};
        border-top: 1px solid ${gcColors.border};
      }

      .chat-input {
        flex: 1;
        padding: ${gcSpacing.inputPadding};
        border: 2px solid ${gcColors.border};
        border-radius: 4px;
        font-family: ${gcTypography.fontBody};
        font-size: ${gcTypography.sizeBody};
        min-height: ${gcSpacing.touchTarget};
      }

      .chat-input:focus {
        outline: 3px solid ${gcColors.focusOutline};
        outline-offset: 0;
        border-color: ${gcColors.focusOutline};
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }
    `));

    const panel = document.createElement('div');
    panel.className = 'chat-panel';

    // Header
    const header = document.createElement('div');
    header.className = 'chat-header';
    header.textContent = title;
    panel.appendChild(header);

    // Messages container
    this.messageContainer = document.createElement('div');
    this.messageContainer.className = 'chat-messages';
    this.messageContainer.setAttribute('role', 'log');
    this.messageContainer.setAttribute('aria-live', 'polite');
    this.messageContainer.setAttribute('aria-atomic', 'false');
    panel.appendChild(this.messageContainer);

    // Screen reader live region
    const liveRegion = document.createElement('div');
    liveRegion.className = 'sr-only';
    liveRegion.setAttribute('role', 'log');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    panel.appendChild(liveRegion);

    // Input form
    const form = document.createElement('form');
    form.className = 'chat-form';

    this.inputField = document.createElement('input');
    this.inputField.type = 'text';
    this.inputField.className = 'chat-input';
    this.inputField.placeholder = placeholder;
    this.inputField.setAttribute('aria-label', placeholder);
    form.appendChild(this.inputField);

    const sendButton = document.createElement('eva-gc-button');
    sendButton.setAttribute('variant', 'primary');
    sendButton.setAttribute('type', 'submit');
    sendButton.textContent = this.t('chat.send');
    form.appendChild(sendButton);

    panel.appendChild(form);

    this.shadow.appendChild(panel);

    // Render existing messages
    this.renderMessages();
  }
}

customElements.define('eva-chat-panel', EVAChatPanel);
