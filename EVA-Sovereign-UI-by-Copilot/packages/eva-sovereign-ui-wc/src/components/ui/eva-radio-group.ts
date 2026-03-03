/**
 * EVA Radio Group Component
 * Radio button group with Spark styling
 * Features: single selection, keyboard navigation, custom indicator
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
  shadows,
  transitions,
} from '../../tokens';

export class EVARadioGroup extends EVABaseComponent {
  private value = '';

  static get observedAttributes() {
    return ['value', 'name'];
  }

  attributeChangedCallback() {
    this.value = this.getAttr('value', '');
    this.updateItems();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupItems();
  }

  private setupItems() {
    this.addEventListener('radio-select', ((e: CustomEvent) => {
      this.value = e.detail.value;
      this.setAttribute('value', this.value);
      this.emit('change', { value: this.value });
      this.updateItems();
    }) as EventListener);
  }

  private updateItems() {
    const items = this.querySelectorAll('eva-radio-group-item');
    items.forEach((item) => {
      const itemValue = item.getAttribute('value') || '';
      if (itemValue === this.value) {
        item.setAttribute('checked', '');
      } else {
        item.removeAttribute('checked');
      }
    });
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: grid;
        gap: ${gcSpacing[3]};
      }
    `));

    const slot = document.createElement('slot');
    this.shadow.appendChild(slot);
  }
}

export class EVARadioGroupItem extends EVABaseComponent {
  private checked = false;
  private inputEl?: HTMLInputElement;

  static get observedAttributes() {
    return ['value', 'checked', 'disabled'];
  }

  attributeChangedCallback() {
    this.checked = this.getBoolAttr('checked');
    this.render();
    
    if (this.inputEl) {
      this.inputEl.checked = this.checked;
      this.inputEl.disabled = this.getBoolAttr('disabled');
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupInput();
  }

  private setupInput() {
    if (this.inputEl) {
      this.inputEl.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        if (target.checked) {
          const value = this.getAttr('value', '');
          this.emit('radio-select', { value });
        }
      });
    }
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: inline-flex;
      }

      .radio-wrapper {
        position: relative;
        display: inline-flex;
      }

      .radio {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }

      .visual {
        aspect-ratio: 1;
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
        border-radius: 9999px;
        border: 1px solid ${modernColors.input};
        background: transparent;
        box-shadow: ${shadows.xs};
        transition: ${transitions.colors};
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${modernColors.primary};
      }

      .radio:focus-visible + .visual {
        outline: none;
        border-color: ${modernColors.ring};
        box-shadow: 0 0 0 3px color-mix(in srgb, ${modernColors.ring} 50%, transparent);
      }

      .radio:disabled + .visual {
        cursor: not-allowed;
        opacity: 0.5;
      }

      .radio[aria-invalid="true"] + .visual {
        box-shadow: 0 0 0 3px color-mix(in srgb, ${modernColors.destructive} 20%, transparent);
        border-color: ${modernColors.destructive};
      }

      .radio:hover:not(:disabled) + .visual {
        background: color-mix(in srgb, ${modernColors.input} 30%, transparent);
      }

      .indicator {
        position: relative;
        display: ${this.checked ? 'flex' : 'none'};
        align-items: center;
        justify-content: center;
      }

      .indicator-dot {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 9999px;
        background: ${modernColors.primary};
        transform: translate(-50%, -50%);
      }

      @media (prefers-reduced-motion: reduce) {
        .visual {
          transition-duration: 0.01ms !important;
        }
      }
    `));

    const wrapper = document.createElement('div');
    wrapper.className = 'radio-wrapper';

    const group = this.closest('eva-radio-group');
    const name = group?.getAttribute('name') || 'radio-group';

    const input = document.createElement('input');
    input.type = 'radio';
    input.className = 'radio';
    input.name = name;
    input.checked = this.checked;
    input.disabled = this.getBoolAttr('disabled');
    
    const value = this.getAttr('value', '');
    if (value) input.value = value;

    wrapper.appendChild(input);

    const visual = document.createElement('div');
    visual.className = 'visual';
    visual.setAttribute('role', 'radio');
    visual.setAttribute('aria-checked', this.checked.toString());
    visual.setAttribute('tabindex', '0');

    visual.addEventListener('click', () => {
      if (!this.getBoolAttr('disabled')) {
        input.click();
      }
    });

    visual.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        input.click();
      }
    });

    const indicator = document.createElement('div');
    indicator.className = 'indicator';
    
    const dot = document.createElement('div');
    dot.className = 'indicator-dot';
    indicator.appendChild(dot);
    
    visual.appendChild(indicator);

    wrapper.appendChild(visual);

    this.shadow.appendChild(wrapper);
    this.inputEl = input;
    this.setupInput();
  }
}

customElements.define('eva-radio-group', EVARadioGroup);
customElements.define('eva-radio-group-item', EVARadioGroupItem);
