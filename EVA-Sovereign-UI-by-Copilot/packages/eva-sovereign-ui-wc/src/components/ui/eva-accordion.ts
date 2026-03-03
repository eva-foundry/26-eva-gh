/**
 * EVA Accordion Component
 * Collapsible content sections with Spark styling
 * Features: smooth animations, keyboard navigation, ARIA support
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
  gcTypography,
  transitions,
} from '../../tokens';

export class EVAAccordion extends EVABaseComponent {
  private items: EVAAccordionItem[] = [];
  private allowMultiple = false;

  static get observedAttributes() {
    return ['allow-multiple'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.allowMultiple = this.getBoolAttr('allow-multiple');
    this.setupItems();
  }

  private setupItems() {
    const itemElements = this.querySelectorAll('eva-accordion-item');
    this.items = Array.from(itemElements) as EVAAccordionItem[];
    
    this.items.forEach((item, index) => {
      item.setAttribute('accordion-id', index.toString());
      item.addEventListener('toggle', ((e: CustomEvent) => {
        if (!this.allowMultiple && e.detail.open) {
          this.items.forEach((otherItem, otherIndex) => {
            if (otherIndex !== index) {
              otherItem.close();
            }
          });
        }
      }) as EventListener);
    });
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
        border-radius: ${gcSpacing[2]};
      }
    `));

    const slot = document.createElement('slot');
    this.shadow.appendChild(slot);
  }
}

export class EVAAccordionItem extends EVABaseComponent {
  private isOpen = false;
  private triggerEl?: HTMLButtonElement;
  private contentEl?: HTMLDivElement;
  private panelId?: string;

  connectedCallback() {
    super.connectedCallback();
    // Base component renders; we ensure ARIA after initial render
  }

  public open() {
    if (!this.isOpen) {
      this.isOpen = true;
      this.setAttribute('open', '');
      this.emit('toggle', { open: true });
      this.emit('accordion-toggle', { open: true });
      this.updateUI();
    }
  }

  public close() {
    if (this.isOpen) {
      this.isOpen = false;
      this.removeAttribute('open');
      this.emit('toggle', { open: false });
      this.emit('accordion-toggle', { open: false });
      this.updateUI();
    }
  }

  private toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    const accordionId = this.getAttribute('accordion-id') || Math.random().toString(36).slice(2);
    this.panelId = `panel-${accordionId}`;
    const triggerId = `trigger-${accordionId}`;

    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
        border-bottom: 1px solid ${modernColors.border};
      }

      :host(:last-child) {
        border-bottom: none;
      }

      .trigger {
        display: flex;
        width: 100%;
        align-items: flex-start;
        justify-content: space-between;
        gap: ${gcSpacing[4]};
        padding: ${gcSpacing[4]} 0;
        font-family: ${gcTypography.fontBody};
        font-size: 0.875rem;
        font-weight: 500;
        text-align: left;
        background: none;
        border: none;
        cursor: pointer;
        transition: ${transitions.all};
        border-radius: ${gcSpacing[2]};
        color: ${modernColors.foreground};
      }

      .trigger:hover {
        text-decoration: underline;
      }

      .trigger:focus-visible {
        outline: none;
        border-color: ${modernColors.ring};
        box-shadow: 0 0 0 3px color-mix(in srgb, ${modernColors.ring} 20%, transparent);
      }

      .trigger:disabled {
        pointer-events: none;
        opacity: 0.5;
      }

      .chevron {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
        transform: translateY(0.125rem);
        transition: transform 200ms;
        color: ${modernColors.mutedForeground};
      }

      .trigger[aria-expanded="true"] .chevron {
        transform: translateY(0.125rem) rotate(180deg);
      }

      .content {
        overflow: hidden;
        font-size: 0.875rem;
        transition: height 200ms ease-out;
      }

      .content[data-state="closed"] {
        height: 0;
        animation: accordion-up 200ms ease-out;
      }

      .content[data-state="open"] {
        animation: accordion-down 200ms ease-out;
      }

      @keyframes accordion-down {
        from {
          height: 0;
          opacity: 0;
        }
        to {
          height: var(--accordion-height);
          opacity: 1;
        }
      }

      @keyframes accordion-up {
        from {
          height: var(--accordion-height);
          opacity: 1;
        }
        to {
          height: 0;
          opacity: 0;
        }
      }

      .content-inner {
        padding-top: 0;
        padding-bottom: ${gcSpacing[4]};
      }

      @media (prefers-reduced-motion: reduce) {
        .trigger,
        .chevron,
        .content {
          transition-duration: 0.01ms !important;
          animation-duration: 0.01ms !important;
        }
      }
    `));

    const trigger = document.createElement('button');
    trigger.className = 'trigger';
    trigger.id = triggerId;
    trigger.setAttribute('aria-expanded', this.isOpen.toString());
    trigger.setAttribute('aria-controls', this.panelId);
    trigger.setAttribute('type', 'button');
    trigger.setAttribute('role', 'button');

    const triggerSlot = document.createElement('slot');
    triggerSlot.name = 'trigger';
    trigger.appendChild(triggerSlot);

    const chevron = document.createElement('span');
    chevron.className = 'chevron';
    chevron.innerHTML = '▼';
    chevron.setAttribute('aria-hidden', 'true');
    trigger.appendChild(chevron);

    this.shadow.appendChild(trigger);

    const content = document.createElement('div');
    content.className = 'content';
    content.id = this.panelId;
    content.setAttribute('data-state', this.isOpen ? 'open' : 'closed');
    content.setAttribute('role', 'region');
    content.setAttribute('aria-labelledby', triggerId);
    if (!this.isOpen) {
      content.setAttribute('hidden', '');
    } else {
      content.removeAttribute('hidden');
    }
    content.style.height = this.isOpen ? 'auto' : '0';

    const contentInner = document.createElement('div');
    contentInner.className = 'content-inner';
    const contentSlot = document.createElement('slot');
    contentInner.appendChild(contentSlot);
    content.appendChild(contentInner);

    this.shadow.appendChild(content);
    this.contentEl = content as HTMLDivElement;
    this.triggerEl = trigger;

    // Event listeners (rebound each render to fresh elements)
    trigger.addEventListener('click', () => this.toggle());
    trigger.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggle();
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const parent = this.parentElement as EVAAccordion | null;
        if (!parent) return;
        const items = parent.querySelectorAll('eva-accordion-item');
        const triggers: HTMLElement[] = [];
        items.forEach(i => {
          const t = (i as EVAAccordionItem).shadowRoot?.querySelector('.trigger');
          if (t) triggers.push(t as HTMLElement);
        });
        const currentIndex = triggers.indexOf(trigger);
        if (currentIndex !== -1) {
          const nextIndex = e.key === 'ArrowDown' ? currentIndex + 1 : currentIndex - 1;
          if (triggers[nextIndex]) {
            (triggers[nextIndex] as HTMLElement).focus();
          }
        }
      }
    });
  }

  private updateUI() {
    if (!this.triggerEl || !this.contentEl) return;
    this.triggerEl.setAttribute('aria-expanded', this.isOpen.toString());
    if (this.isOpen) {
      this.contentEl.setAttribute('data-state', 'open');
      this.contentEl.removeAttribute('hidden');
      this.contentEl.style.height = 'auto';
    } else {
      this.contentEl.setAttribute('data-state', 'closed');
      this.contentEl.setAttribute('hidden', '');
      this.contentEl.style.height = '0';
    }
  }
}

customElements.define('eva-accordion', EVAAccordion);
customElements.define('eva-accordion-item', EVAAccordionItem);
