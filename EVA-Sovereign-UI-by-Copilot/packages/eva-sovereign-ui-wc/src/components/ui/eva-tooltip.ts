/**
 * EVA Tooltip Component
 * Floating tooltips with Spark styling
 * Features: positioned content, arrow, animations
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
} from '../../tokens';

export class EVATooltip extends EVABaseComponent {
  private isOpen = false;
  private triggerEl?: HTMLElement;
  private contentEl?: HTMLDivElement;
  private timeoutId?: number;

  connectedCallback() {
    super.connectedCallback();
    this.setupTrigger();
  }

  private setupTrigger() {
    const trigger = this.querySelector('[slot="trigger"]');
    if (trigger) {
      this.triggerEl = trigger as HTMLElement;
      
      trigger.addEventListener('mouseenter', () => {
        this.timeoutId = window.setTimeout(() => this.show(), 0);
      });
      
      trigger.addEventListener('mouseleave', () => {
        if (this.timeoutId) clearTimeout(this.timeoutId);
        this.hide();
      });
      
      trigger.addEventListener('focus', () => this.show());
      trigger.addEventListener('blur', () => this.hide());
    }
  }

  private show() {
    this.isOpen = true;
    this.render();
    requestAnimationFrame(() => this.positionContent());
  }

  private hide() {
    this.isOpen = false;
    this.render();
  }

  private positionContent() {
    if (!this.contentEl || !this.triggerEl) return;
    
    const triggerRect = this.triggerEl.getBoundingClientRect();
    const contentRect = this.contentEl.getBoundingClientRect();
    
    // Position above trigger by default
    let top = triggerRect.top - contentRect.height - 8;
    let left = triggerRect.left + (triggerRect.width / 2) - (contentRect.width / 2);
    
    // Adjust if would go off screen
    if (top < 0) {
      top = triggerRect.bottom + 8;
    }
    
    if (left < 8) left = 8;
    if (left + contentRect.width > window.innerWidth - 8) {
      left = window.innerWidth - contentRect.width - 8;
    }
    
    this.contentEl.style.top = `${top}px`;
    this.contentEl.style.left = `${left}px`;
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: inline-block;
        position: relative;
      }

      .trigger {
        display: contents;
      }

      .content {
        display: ${this.isOpen ? 'block' : 'none'};
        position: fixed;
        z-index: 50;
        width: fit-content;
        max-width: 20rem;
        border-radius: ${gcSpacing[2]};
        background: ${modernColors.primary};
        color: ${modernColors.primaryForeground};
        padding: ${gcSpacing[2]} ${gcSpacing[3]};
        font-size: 0.75rem;
        line-height: 1.4;
        text-align: center;
        animation: ${this.isOpen ? 'tooltipIn' : 'tooltipOut'} 150ms;
        pointer-events: none;
      }

      @keyframes tooltipIn {
        from { 
          opacity: 0;
          transform: scale(0.95);
        }
        to { 
          opacity: 1;
          transform: scale(1);
        }
      }

      @keyframes tooltipOut {
        from { 
          opacity: 1;
          transform: scale(1);
        }
        to { 
          opacity: 0;
          transform: scale(0.95);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .content {
          animation-duration: 0.01ms !important;
        }
      }
    `));

    const trigger = document.createElement('div');
    trigger.className = 'trigger';
    const triggerSlot = document.createElement('slot');
    triggerSlot.name = 'trigger';
    trigger.appendChild(triggerSlot);
    this.shadow.appendChild(trigger);

    if (this.isOpen) {
      const content = document.createElement('div');
      content.className = 'content';
      content.setAttribute('role', 'tooltip');
      
      const slot = document.createElement('slot');
      content.appendChild(slot);

      this.shadow.appendChild(content);
      this.contentEl = content;
    }
  }
}

customElements.define('eva-tooltip', EVATooltip);
