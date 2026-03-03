/**
 * EVA Menubar Component
 * Application-style horizontal menu bar
 * Features: Dropdown menus, keyboard navigation
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
  shadows,
  transitions,
} from '../../tokens';

export class EVAMenubar extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: flex;
        height: 2.5rem;
        border: 1px solid ${modernColors.border};
        border-radius: ${gcSpacing[2]};
        background: ${modernColors.background};
        padding: ${gcSpacing[1]};
      }

      .menubar {
        display: flex;
        align-items: center;
        gap: ${gcSpacing[1]};
        width: 100%;
      }
    `));

    const menubar = document.createElement('div');
    menubar.className = 'menubar';
    menubar.setAttribute('role', 'menubar');
    menubar.addEventListener('keydown', (e) => this.handleMenubarKeydown(e as KeyboardEvent));
    
    const slot = document.createElement('slot');
    slot.addEventListener('slotchange', () => this.initializeMenubarRoving());
    menubar.appendChild(slot);

    this.shadow.appendChild(menubar);

    // Initialize roving tabindex across menu triggers after slot distribution
    requestAnimationFrame(() => this.initializeMenubarRoving());
  }

  private getMenuTriggers(): HTMLButtonElement[] {
    return Array.from(this.querySelectorAll('eva-menubar-menu'))
      .map(m => (m as any).shadowRoot?.querySelector('button.trigger') as HTMLButtonElement | null)
      .filter(Boolean) as HTMLButtonElement[];
  }

  private initializeMenubarRoving() {
    const triggers = this.getMenuTriggers();
    if (!triggers.length) return;
    triggers.forEach((t, i) => {
      t.setAttribute('tabindex', i === 0 ? '0' : '-1');
      t.setAttribute('role', 'menuitem');
    });
  }

  private moveMenubarFocus(delta: number) {
    const triggers = this.getMenuTriggers();
    if (!triggers.length) return;
    const currentIndex = triggers.findIndex(t => t === document.activeElement);
    const targetIndex = currentIndex === -1 ? 0 : Math.min(Math.max(currentIndex + delta, 0), triggers.length - 1);
    triggers.forEach((t, i) => t.setAttribute('tabindex', i === targetIndex ? '0' : '-1'));
    triggers[targetIndex].focus();
  }

  private handleMenubarKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowRight':
      case 'Right':
        this.moveMenubarFocus(1);
        e.preventDefault();
        break;
      case 'ArrowLeft':
      case 'Left':
        this.moveMenubarFocus(-1);
        e.preventDefault();
        break;
      case 'Home':
        this.moveMenubarFocus(-9999);
        e.preventDefault();
        break;
      case 'End':
        this.moveMenubarFocus(9999);
        e.preventDefault();
        break;
      case 'Enter':
      case ' ': {
        const el = document.activeElement as HTMLElement | null;
        if (el && el.classList.contains('trigger')) {
          el.click();
          e.preventDefault();
        }
        break;
      }
      case 'ArrowDown':
      case 'Down': {
        // If menu just opened, move focus into first item
        const openMenu = Array.from(this.querySelectorAll('eva-menubar-menu'))
          .find(m => (m as any).shadowRoot?.querySelector('button.trigger')?.getAttribute('data-open') === 'true');
        if (openMenu) {
          const firstItem = (openMenu as any).shadowRoot?.querySelector('div.content slot')
            ? (openMenu as any).querySelector('eva-menubar-item') as HTMLElement | null
            : null;
          // We cannot directly access distributed nodes inside closed content until open; rely on item button focus
          const itemButton = firstItem?.shadowRoot?.querySelector('button.item') as HTMLButtonElement | null;
          if (itemButton) {
            itemButton.focus();
            e.preventDefault();
          }
        }
        break;
      }
      default:
        break;
    }
  }
}

export class EVAMenubarMenu extends EVABaseComponent {
  private isOpen = false;

  connectedCallback() {
    super.connectedCallback();
    
    document.addEventListener('click', (e) => {
      if (!this.contains(e.target as Node) && this.isOpen) {
        this.isOpen = false;
        this.render();
      }
    });
  }

  private toggle() {
    this.isOpen = !this.isOpen;
    this.render();
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        position: relative;
        display: inline-flex;
      }

      .trigger {
        display: inline-flex;
        align-items: center;
        gap: ${gcSpacing[2]};
        height: 2rem;
        padding: 0 ${gcSpacing[3]};
        border-radius: ${gcSpacing[1]};
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: ${transitions.colors};
        background: transparent;
        border: none;
        color: ${modernColors.foreground};
      }

      .trigger:hover {
        background: ${modernColors.accent};
      }

      .trigger[data-open="true"] {
        background: ${modernColors.accent};
      }

      .content {
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 50;
        min-width: 12rem;
        margin-top: ${gcSpacing[1]};
        padding: ${gcSpacing[1]};
        background: ${modernColors.popover};
        border: 1px solid ${modernColors.border};
        border-radius: ${gcSpacing[2]};
        box-shadow: ${shadows.lg};
        display: ${this.isOpen ? 'block' : 'none'};
        animation: menuIn 150ms ease-out;
      }

      @keyframes menuIn {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
    `));

    const trigger = document.createElement('button');
    trigger.className = 'trigger';
    trigger.setAttribute('data-open', this.isOpen.toString());
    trigger.setAttribute('role', 'menuitem');
    if (!trigger.hasAttribute('tabindex')) {
      trigger.setAttribute('tabindex', '-1');
    }
    trigger.addEventListener('click', () => this.toggle());
    
    const triggerSlot = document.createElement('slot');
    triggerSlot.name = 'trigger';
    trigger.appendChild(triggerSlot);

    const content = document.createElement('div');
    content.className = 'content';
    content.setAttribute('role', 'menu');
    const contentSlot = document.createElement('slot');
    content.appendChild(contentSlot);

    this.shadow.appendChild(trigger);
    this.shadow.appendChild(content);
  }
}

export class EVAMenubarItem extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    const variant = this.getAttr('variant', 'default');
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
      }

      .item {
        display: flex;
        align-items: center;
        gap: ${gcSpacing[2]};
        width: 100%;
        padding: ${gcSpacing[2]} ${gcSpacing[3]};
        border-radius: ${gcSpacing[1]};
        font-size: 0.875rem;
        cursor: pointer;
        transition: ${transitions.colors};
        background: transparent;
        border: none;
        text-align: left;
        color: ${variant === 'destructive' ? modernColors.destructive : modernColors.foreground};
      }

      .item:hover:not(:disabled) {
        background: ${variant === 'destructive' 
          ? 'color-mix(in srgb, ' + modernColors.destructive + ' 10%, transparent)'
          : modernColors.accent};
      }

      .item:focus-visible {
        outline: none;
        background: ${modernColors.accent};
      }

      .item:disabled {
        pointer-events: none;
        opacity: 0.5;
      }

      .item ::slotted(svg) {
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
      }
    `));

    const button = document.createElement('button');
    button.className = 'item';
    
    if (this.getBoolAttr('disabled')) {
      button.disabled = true;
    }

    const slot = document.createElement('slot');
    button.appendChild(slot);

    this.shadow.appendChild(button);
  }
}

customElements.define('eva-menubar', EVAMenubar);
customElements.define('eva-menubar-menu', EVAMenubarMenu);
customElements.define('eva-menubar-item', EVAMenubarItem);
