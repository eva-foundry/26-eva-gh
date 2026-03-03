/**
 * EVA Dropdown Menu Component
 * Context menus with Spark styling
 * Features: positioned menus, keyboard nav, checkboxes/radios, separators
 * Note: Simplified version focusing on core menu functionality
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
  shadows,
  transitions,
} from '../../tokens';

export class EVADropdownMenu extends EVABaseComponent {
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
      
      let top = triggerRect.bottom + 4;
      let left = triggerRect.left;
      
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
        min-width: 8rem;
        max-height: var(--radix-dropdown-menu-content-available-height, 24rem);
        overflow-x: hidden;
        overflow-y: auto;
        border-radius: ${gcSpacing[2]};
        border: 1px solid ${modernColors.border};
        background: ${modernColors.popover};
        color: ${modernColors.popoverForeground};
        padding: ${gcSpacing[1]};
        box-shadow: ${shadows.md};
        animation: ${this.isOpen ? 'menuIn' : 'menuOut'} 200ms;
      }

      @keyframes menuIn {
        from { 
          opacity: 0;
          transform: scale(0.95) translateY(-0.5rem);
        }
        to { 
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      @keyframes menuOut {
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
      content.setAttribute('role', 'menu');
      content.addEventListener('keydown', (e) => this.handleMenuKeydown(e as KeyboardEvent));
      content.addEventListener('click', (e) => {
        // Close menu when item clicked (host element or inner .item div)
        const target = e.target as HTMLElement;
        if (target.closest('eva-dropdown-menu-item') || target.classList.contains('item')) {
          this.close();
        }
      });
      
      const slot = document.createElement('slot');
      content.appendChild(slot);

      this.shadow.appendChild(content);
      this.contentEl = content;
      
      requestAnimationFrame(() => {
        this.positionContent();
        // Second frame to ensure item shadows rendered
        requestAnimationFrame(() => this.initializeRovingItems());
      });
    }
  }

  private getMenuItemButtons(): HTMLElement[] {
    return Array.from(this.querySelectorAll('eva-dropdown-menu-item'))
      .map(i => (i as any).shadowRoot?.querySelector('.item') as HTMLElement | null)
      .filter(Boolean) as HTMLElement[];
  }

  private initializeRovingItems() {
    const items = this.getMenuItemButtons();
    items.forEach((item, i) => {
      item.setAttribute('tabindex', i === 0 ? '0' : '-1');
      item.setAttribute('role', 'menuitem');
    });
    if (items[0]) items[0].focus();
  }

  private moveItemFocus(delta: number) {
    const items = this.getMenuItemButtons();
    if (!items.length) return;
    const currentIndex = items.findIndex(i => i === document.activeElement);
    const targetIndex = currentIndex === -1 ? 0 : Math.min(Math.max(currentIndex + delta, 0), items.length - 1);
    items.forEach((i, idx) => i.setAttribute('tabindex', idx === targetIndex ? '0' : '-1'));
    items[targetIndex].focus();
  }

  private handleMenuKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
      case 'Down':
        this.moveItemFocus(1);
        e.preventDefault();
        break;
      case 'ArrowUp':
      case 'Up':
        this.moveItemFocus(-1);
        e.preventDefault();
        break;
      case 'Home':
        this.moveItemFocus(-9999);
        e.preventDefault();
        break;
      case 'End':
        this.moveItemFocus(9999);
        e.preventDefault();
        break;
      case 'Escape':
        this.close();
        e.preventDefault();
        break;
      case 'Enter':
      case ' ': {
        const el = document.activeElement as HTMLElement | null;
        if (el && el.classList.contains('item')) {
          el.click();
          e.preventDefault();
        }
        break;
      }
      default:
        break;
    }
  }
}

export class EVADropdownMenuItem extends EVABaseComponent {
  static get observedAttributes() {
    return ['variant', 'disabled'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.shadow.addEventListener('click', () => {
      if (!this.getBoolAttr('disabled')) {
        this.emit('select', {});
      }
    });
  }

  protected render(): void {
    const variant = this.getAttr('variant', 'default');
    
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
      }

      .item {
        position: relative;
        display: flex;
        align-items: center;
        gap: ${gcSpacing[2]};
        border-radius: ${gcSpacing[1]};
        padding: ${gcSpacing[2]};
        font-size: 0.875rem;
        outline: none;
        user-select: none;
        cursor: pointer;
        transition: ${transitions.colors};
        color: ${variant === 'destructive' ? modernColors.destructive : modernColors.foreground};
      }

      .item:hover {
        background: ${variant === 'destructive' ? 
          'color-mix(in srgb, ' + modernColors.destructive + ' 10%, transparent)' : 
          modernColors.accent};
        color: ${variant === 'destructive' ? modernColors.destructive : modernColors.accentForeground};
      }

      .item:focus-visible {
        background: ${modernColors.accent};
      }

      .item[disabled] {
        pointer-events: none;
        opacity: 0.5;
      }

      .item ::slotted(svg) {
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
        pointer-events: none;
        color: ${modernColors.mutedForeground};
      }

      @media (prefers-reduced-motion: reduce) {
        .item {
          transition-duration: 0.01ms !important;
        }
      }
    `));

    const item = document.createElement('div');
    item.className = 'item';
    item.setAttribute('role', 'menuitem');
    if (!item.hasAttribute('tabindex')) {
      item.setAttribute('tabindex', '-1');
    }
    
    if (this.getBoolAttr('disabled')) {
      item.setAttribute('disabled', '');
    }

    const slot = document.createElement('slot');
    item.appendChild(slot);

    this.shadow.appendChild(item);
  }
}

export class EVADropdownMenuSeparator extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
      }

      .separator {
        background: ${modernColors.border};
        height: 1px;
        margin: ${gcSpacing[1]} -${gcSpacing[1]};
        pointer-events: none;
      }
    `));

    const separator = document.createElement('div');
    separator.className = 'separator';
    separator.setAttribute('role', 'separator');

    this.shadow.appendChild(separator);
  }
}

export class EVADropdownMenuLabel extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
      }

      .label {
        padding: ${gcSpacing[2]};
        font-size: 0.875rem;
        font-weight: 500;
        color: ${modernColors.foreground};
      }
    `));

    const label = document.createElement('div');
    label.className = 'label';
    
    const slot = document.createElement('slot');
    label.appendChild(slot);

    this.shadow.appendChild(label);
  }
}

customElements.define('eva-dropdown-menu', EVADropdownMenu);
customElements.define('eva-dropdown-menu-item', EVADropdownMenuItem);
customElements.define('eva-dropdown-menu-separator', EVADropdownMenuSeparator);
customElements.define('eva-dropdown-menu-label', EVADropdownMenuLabel);
