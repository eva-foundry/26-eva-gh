/**
 * EVA Popover Component
 * Floating content popovers with Spark styling
 * Features: positioned content, close on outside click, animations
 */

import { EVABaseComponent } from '../../utils/base-component';
import {
  modernColors,
  gcSpacing,
  shadows,
} from '../../tokens';export class EVAPopover extends EVABaseComponent {
  private isOpen = false;
  private triggerEl?: HTMLElement;
  private contentEl?: HTMLDivElement;

  static get observedAttributes() {
    return ['open'];
  }

  attributeChangedCallback() {
    this.isOpen = this.getBoolAttr('open');
    this.render();
    
    if (this.isOpen) {
      this.positionContent();
      document.addEventListener('click', this.handleOutsideClick);
    } else {
      document.removeEventListener('click', this.handleOutsideClick);
    }
  }

  private handleOutsideClick = (e: MouseEvent) => {
    if (!this.contains(e.target as Node)) {
      this.close();
    }
  };

  connectedCallback() {
    super.connectedCallback();
    this.setupTrigger();
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  private setupTrigger() {
    const trigger = this.querySelector('[slot="trigger"]');
    if (trigger) {
      this.triggerEl = trigger as HTMLElement;
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
    }
  }

  private positionContent() {
    if (!this.contentEl || !this.triggerEl) return;
    
    requestAnimationFrame(() => {
      const triggerRect = this.triggerEl!.getBoundingClientRect();
      const contentRect = this.contentEl!.getBoundingClientRect();
      
      // Position below trigger by default
      let top = triggerRect.bottom + 4;
      let left = triggerRect.left;
      
      // Adjust if would go off screen
      if (top + contentRect.height > window.innerHeight) {
        top = triggerRect.top - contentRect.height - 4;
      }
      
      if (left + contentRect.width > window.innerWidth) {
        left = window.innerWidth - contentRect.width - 8;
      }
      
      this.contentEl!.style.top = `${top}px`;
      this.contentEl!.style.left = `${left}px`;
    });
  }

  public open() {
    this.setAttribute('open', '');
  }

  public close() {
    this.removeAttribute('open');
  }

  public toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
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
        width: 18rem;
        border-radius: ${gcSpacing[2]};
        border: 1px solid ${modernColors.border};
        background: ${modernColors.popover};
        color: ${modernColors.popoverForeground};
        padding: ${gcSpacing[4]};
        box-shadow: ${shadows.md};
        outline: none;
        animation: ${this.isOpen ? 'popoverIn' : 'popoverOut'} 200ms;
      }

      @keyframes popoverIn {
        from { 
          opacity: 0;
          transform: scale(0.95) translateY(-0.5rem);
        }
        to { 
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      @keyframes popoverOut {
        from { 
          opacity: 1;
          transform: scale(1) translateY(0);
        }
        to { 
          opacity: 0;
          transform: scale(0.95) translateY(-0.5rem);
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
      content.addEventListener('click', (e) => e.stopPropagation());
      
      const slot = document.createElement('slot');
      content.appendChild(slot);

      this.shadow.appendChild(content);
      this.contentEl = content;
      
      requestAnimationFrame(() => this.positionContent());
    }
  }
}

customElements.define('eva-popover', EVAPopover);
