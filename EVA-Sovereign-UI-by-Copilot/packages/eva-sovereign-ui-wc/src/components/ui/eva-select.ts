/**
 * EVA Select Component
 * Custom select dropdown with Spark styling
 * Features: styled dropdown, keyboard navigation, chevron indicator
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
  shadows,
  transitions,
} from '../../tokens';

export type SelectSize = 'sm' | 'default';

export class EVASelect extends EVABaseComponent {
  private value = '';
  private isOpen = false;
  private size: SelectSize = 'default';

  static get observedAttributes() {
    return ['value', 'size', 'disabled', 'placeholder'];
  }

  attributeChangedCallback() {
    this.value = this.getAttr('value', '');
    this.size = this.getAttr('size', 'default') as SelectSize;
    this.render();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupEventListeners();
  }

  private setupEventListeners() {
    document.addEventListener('click', (e) => {
      if (!this.contains(e.target as Node) && this.isOpen) {
        this.isOpen = false;
        this.render();
      }
    });
  }

  private handleSelect(value: string) {
    this.value = value;
    this.isOpen = false;
    this.setAttribute('value', value);
    this.emit('change', { value });
    this.render();
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    
    const heightClass = this.size === 'sm' ? '2rem' : '2.25rem';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: inline-block;
        position: relative;
      }

      .trigger {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${gcSpacing[2]};
        width: fit-content;
        min-width: 8rem;
        height: ${heightClass};
        border-radius: ${gcSpacing[2]};
        border: 1px solid ${modernColors.input};
        background: transparent;
        padding: ${gcSpacing[2]} ${gcSpacing[3]};
        font-size: 0.875rem;
        white-space: nowrap;
        box-shadow: ${shadows.xs};
        transition: ${transitions.colors};
        cursor: pointer;
        color: ${this.value ? modernColors.foreground : modernColors.mutedForeground};
      }

      .trigger:hover {
        background: ${modernColors.input};
      }

      .trigger:focus-visible {
        outline: none;
        border-color: ${modernColors.ring};
        box-shadow: 0 0 0 3px color-mix(in srgb, ${modernColors.ring} 50%, transparent);
      }

      .trigger:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      .trigger[aria-invalid="true"] {
        box-shadow: 0 0 0 3px color-mix(in srgb, ${modernColors.destructive} 20%, transparent);
        border-color: ${modernColors.destructive};
      }

      .chevron {
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
        opacity: 0.5;
        color: ${modernColors.mutedForeground};
        transition: transform 200ms;
      }

      .trigger[data-open="true"] .chevron {
        transform: rotate(180deg);
      }

      .dropdown {
        display: ${this.isOpen ? 'block' : 'none'};
        position: absolute;
        z-index: 50;
        top: calc(100% + 0.25rem);
        left: 0;
        right: 0;
        min-width: 8rem;
        max-height: 24rem;
        overflow-x: hidden;
        overflow-y: auto;
        border-radius: ${gcSpacing[2]};
        border: 1px solid ${modernColors.border};
        background: ${modernColors.popover};
        color: ${modernColors.popoverForeground};
        padding: ${gcSpacing[1]};
        box-shadow: ${shadows.md};
        animation: dropdownIn 200ms;
      }

      @keyframes dropdownIn {
        from { 
          opacity: 0;
          transform: scale(0.95) translateY(-0.5rem);
        }
        to { 
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .chevron,
        .dropdown {
          transition-duration: 0.01ms !important;
          animation-duration: 0.01ms !important;
        }
      }
    `));

    const trigger = document.createElement('button');
    trigger.className = 'trigger';
    trigger.setAttribute('type', 'button');
    trigger.setAttribute('data-open', this.isOpen.toString());
    
    if (this.getBoolAttr('disabled')) {
      trigger.setAttribute('disabled', '');
    }

    const valueText = document.createElement('span');
    valueText.textContent = this.value || this.getAttr('placeholder', 'Select...');
    trigger.appendChild(valueText);

    const chevron = document.createElement('span');
    chevron.className = 'chevron';
    chevron.innerHTML = '▼';
    trigger.appendChild(chevron);

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.isOpen = !this.isOpen;
      this.render();
    });

    this.shadow.appendChild(trigger);

    if (this.isOpen) {
      const dropdown = document.createElement('div');
      dropdown.className = 'dropdown';
      dropdown.addEventListener('click', (e) => e.stopPropagation());
      
      const slot = document.createElement('slot');
      dropdown.appendChild(slot);

      this.shadow.appendChild(dropdown);
    }
  }
}

export class EVASelectItem extends EVABaseComponent {
  static get observedAttributes() {
    return ['value', 'disabled'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.shadow.addEventListener('click', () => {
      if (!this.getBoolAttr('disabled')) {
        const value = this.getAttr('value', '');
        this.emit('select-item', { value });
        
        const select = this.closest('eva-select');
        if (select) {
          (select as any).handleSelect?.(value);
        }
      }
    });
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
      }

      .item {
        position: relative;
        display: flex;
        width: 100%;
        align-items: center;
        gap: ${gcSpacing[2]};
        border-radius: ${gcSpacing[1]};
        padding: ${gcSpacing[2]};
        font-size: 0.875rem;
        outline: none;
        user-select: none;
        cursor: pointer;
        transition: ${transitions.colors};
        color: ${modernColors.foreground};
      }

      .item:hover {
        background: ${modernColors.accent};
        color: ${modernColors.accentForeground};
      }

      .item:focus-visible {
        background: ${modernColors.accent};
        color: ${modernColors.accentForeground};
      }

      .item[disabled] {
        pointer-events: none;
        opacity: 0.5;
      }

      .item ::slotted(svg) {
        width: 1rem;
        height: 1rem;
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
    item.setAttribute('role', 'option');
    
    if (this.getBoolAttr('disabled')) {
      item.setAttribute('disabled', '');
    }

    const slot = document.createElement('slot');
    item.appendChild(slot);

    this.shadow.appendChild(item);
  }
}

customElements.define('eva-select', EVASelect);
customElements.define('eva-select-item', EVASelectItem);
