/**
 * EVA Hover Card Component
 * Preview card on hover with Spark styling
 * Features: Hover trigger, positioned content, animations
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
  shadows,
} from '../../tokens';

export class EVAHoverCard extends EVABaseComponent {
  private isOpen = false;
  private triggerEl?: HTMLElement;
  private contentEl?: HTMLDivElement;
  private hoverTimeoutId?: number;

  connectedCallback() {
    super.connectedCallback();
    this.setupTrigger();
  }

  private setupTrigger() {
    const trigger = this.querySelector('[slot="trigger"]');
    if (trigger) {
      this.triggerEl = trigger as HTMLElement;
      
      trigger.addEventListener('mouseenter', () => {
        this.hoverTimeoutId = window.setTimeout(() => {
          this.isOpen = true;
          this.render();
          requestAnimationFrame(() => this.positionContent());
        }, 200);
      });
      
      trigger.addEventListener('mouseleave', () => {
        if (this.hoverTimeoutId) clearTimeout(this.hoverTimeoutId);
        this.isOpen = false;
        this.render();
      });
    }
  }

  private positionContent() {
    if (!this.contentEl || !this.triggerEl) return;
    
    const triggerRect = this.triggerEl.getBoundingClientRect();
    const contentRect = this.contentEl.getBoundingClientRect();
    
    let top = triggerRect.bottom + 4;
    let left = triggerRect.left + (triggerRect.width / 2) - (contentRect.width / 2);
    
    if (top + contentRect.height > window.innerHeight) {
      top = triggerRect.top - contentRect.height - 4;
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
        width: 16rem;
        border-radius: ${gcSpacing[2]};
        border: 1px solid ${modernColors.border};
        background: ${modernColors.popover};
        color: ${modernColors.popoverForeground};
        padding: ${gcSpacing[4]};
        box-shadow: ${shadows.md};
        outline: none;
        animation: hoverCardIn 200ms;
      }

      @keyframes hoverCardIn {
        from { 
          opacity: 0;
          transform: scale(0.95) translateY(-0.5rem);
        }
        to { 
          opacity: 1;
          transform: scale(1) translateY(0);
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
      
      const slot = document.createElement('slot');
      content.appendChild(slot);

      this.shadow.appendChild(content);
      this.contentEl = content;

      content.addEventListener('mouseenter', () => {
        if (this.hoverTimeoutId) clearTimeout(this.hoverTimeoutId);
      });

      content.addEventListener('mouseleave', () => {
        this.isOpen = false;
        this.render();
      });
    }
  }
}

customElements.define('eva-hover-card', EVAHoverCard);
