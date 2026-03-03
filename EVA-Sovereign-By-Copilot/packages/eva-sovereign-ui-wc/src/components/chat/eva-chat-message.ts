/**
 * EVA Chat Message Component
 * Individual message bubble in chat
 */

import { EVABaseComponent } from '../../utils/base-component';
import { gcColors, gcTypography, gcSpacing } from '../../tokens';

export class EVAChatMessage extends EVABaseComponent {
  static get observedAttributes() {
    return ['type', 'timestamp'];
  }

  attributeChangedCallback() {
    this.render();
  }

  protected render(): void {
    const type = this.getAttr('type', 'user') as 'user' | 'assistant';
    const timestamp = this.getAttr('timestamp');

    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
        margin-bottom: ${gcSpacing.sm};
      }

      .message {
        display: flex;
        flex-direction: column;
        max-width: 70%;
        animation: fadeIn 0.3s ease;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .message.user {
        align-self: flex-end;
        margin-left: auto;
      }

      .message.assistant {
        align-self: flex-start;
      }

      .message-bubble {
        padding: ${gcSpacing.sm};
        border-radius: ${gcSpacing.xs};
        font-family: ${gcTypography.fontBody};
        font-size: ${gcTypography.sizeBody};
        line-height: ${gcTypography.lineHeight};
        white-space: pre-wrap;
      }

      .message.user .message-bubble {
        background: ${gcColors.accent};
        color: ${gcColors.textWhite};
        border-bottom-right-radius: 2px;
      }

      .message.assistant .message-bubble {
        background: ${gcColors.background};
        color: ${gcColors.text};
        border: 1px solid ${gcColors.border};
        border-bottom-left-radius: 2px;
      }

      .message-meta {
        font-size: ${gcTypography.sizeBodySmall};
        color: ${gcColors.textLight};
        margin-top: 4px;
        padding: 0 ${gcSpacing.xs};
      }
    `));

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    const slot = document.createElement('slot');
    bubble.appendChild(slot);
    messageDiv.appendChild(bubble);

    if (timestamp) {
      const meta = document.createElement('div');
      meta.className = 'message-meta';
      const date = new Date(timestamp);
      meta.textContent = date.toLocaleTimeString();
      messageDiv.appendChild(meta);
    }

    this.shadow.appendChild(messageDiv);
  }
}

customElements.define('eva-chat-message', EVAChatMessage);
