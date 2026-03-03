/**
 * EVA Chat Message Component
 * Individual message bubble with Spark styling
 * Features: elegant bubbles, smooth fade-in, modern colors
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcColors, 
  gcTypography, 
  gcSpacing,
  shadows,
  animations,
} from '../../tokens';

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
        margin-bottom: ${gcSpacing[4]};
      }

      .message {
        display: flex;
        flex-direction: column;
        max-width: 75%;
        animation: ${animations.fadeIn.name} ${animations.fadeIn.duration} ease-out;
      }

      @keyframes ${animations.fadeIn.name} {
        from { 
          opacity: 0; 
          transform: translateY(0.5rem);
        }
        to { 
          opacity: 1; 
          transform: translateY(0);
        }
      }

      .message.user {
        align-self: flex-end;
        margin-left: auto;
      }

      .message.assistant {
        align-self: flex-start;
      }

      .message-bubble {
        padding: ${gcSpacing[3]} ${gcSpacing[4]};
        border-radius: ${gcSpacing[3]};
        font-family: ${gcTypography.fontBody};
        font-size: 0.875rem;
        line-height: 1.5;
        white-space: pre-wrap;
        word-wrap: break-word;
      }

      .message.user .message-bubble {
        background: ${modernColors.primary};
        color: ${modernColors.primaryForeground};
        border-bottom-right-radius: ${gcSpacing[1]};
        box-shadow: ${shadows.sm};
      }

      .message.assistant .message-bubble {
        background: ${modernColors.card};
        color: ${modernColors.cardForeground};
        border: 1px solid ${modernColors.border};
        border-bottom-left-radius: ${gcSpacing[1]};
        box-shadow: ${shadows.xs};
      }

      .message-meta {
        font-size: 0.75rem;
        color: ${modernColors.mutedForeground};
        margin-top: ${gcSpacing[1]};
        padding: 0 ${gcSpacing[2]};
      }
      
      /* Accessibility: Reduced motion */
      @media (prefers-reduced-motion: reduce) {
        .message {
          animation: none;
        }
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
