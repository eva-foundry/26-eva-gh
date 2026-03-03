/**
 * EVA Toggle Group Component
 * Group of toggle buttons (radio-like behavior)
 * Features: Single/multiple selection, variants
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
  shadows,
  transitions,
} from '../../tokens';

export class EVAToggleGroup extends EVABaseComponent {
  private value = '';
  private type: 'single' | 'multiple' = 'single';

  static get observedAttributes() {
    return ['value', 'type'];
  }

  attributeChangedCallback() {
    this.value = this.getAttr('value', '');
    this.type = this.getAttr('type', 'single') as 'single' | 'multiple';
  }

  connectedCallback() {
    super.connectedCallback();
    
    this.addEventListener('toggle-item', ((e: CustomEvent) => {
      if (this.type === 'single') {
        this.value = e.detail.value;
        this.setAttribute('value', this.value);
        this.updateItems();
      }
      this.emit('change', { value: this.value });
    }) as EventListener);
  }

  private updateItems() {
    const items = this.querySelectorAll('eva-toggle-group-item');
    items.forEach((item) => {
      const itemValue = item.getAttribute('value') || '';
      if (itemValue === this.value) {
        item.setAttribute('pressed', '');
      } else {
        item.removeAttribute('pressed');
      }
    });
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: inline-flex;
        border-radius: ${gcSpacing[2]};
        background: ${modernColors.muted};
        padding: ${gcSpacing[1]};
      }

      .group {
        display: contents;
      }
    `));

    const group = document.createElement('div');
    group.className = 'group';
    group.setAttribute('role', 'group');
    
    const slot = document.createElement('slot');
    group.appendChild(slot);

    this.shadow.appendChild(group);
  }
}

export class EVAToggleGroupItem extends EVABaseComponent {
  private pressed = false;

  static get observedAttributes() {
    return ['value', 'pressed', 'disabled'];
  }

  attributeChangedCallback() {
    this.pressed = this.getBoolAttr('pressed');
    this.render();
  }

  connectedCallback() {
    super.connectedCallback();
    
    this.shadow.addEventListener('click', () => {
      if (!this.getBoolAttr('disabled')) {
        const value = this.getAttr('value', '');
        this.emit('toggle-item', { value });
      }
    });
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: inline-flex;
      }

      .item {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: ${gcSpacing[2]};
        height: 2.25rem;
        min-width: 2.25rem;
        padding: 0 ${gcSpacing[3]};
        border-radius: ${gcSpacing[2]};
        border: 1px solid transparent;
        font-size: 0.875rem;
        font-weight: 500;
        white-space: nowrap;
        transition: ${transitions.colors};
        cursor: pointer;
        background: transparent;
        color: ${modernColors.foreground};
      }

      .item:hover:not(:disabled) {
        background: color-mix(in srgb, ${modernColors.muted} 80%, black);
      }

      .item[data-pressed="true"] {
        background: ${modernColors.background};
        color: ${modernColors.foreground};
        box-shadow: ${shadows.sm};
      }

      .item:focus-visible {
        outline: none;
        border-color: ${modernColors.ring};
        box-shadow: 0 0 0 2px color-mix(in srgb, ${modernColors.ring} 50%, transparent);
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
    button.type = 'button';
    button.setAttribute('data-pressed', this.pressed.toString());
    button.setAttribute('aria-pressed', this.pressed.toString());
    
    if (this.getBoolAttr('disabled')) {
      button.disabled = true;
    }

    const slot = document.createElement('slot');
    button.appendChild(slot);

    this.shadow.appendChild(button);
  }
}

customElements.define('eva-toggle-group', EVAToggleGroup);
customElements.define('eva-toggle-group-item', EVAToggleGroupItem);
