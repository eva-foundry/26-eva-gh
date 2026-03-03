/**
 * EVA Checkbox Component
 * Checkbox input with Spark styling
 * Features: checked/unchecked states, custom indicator, validation
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
  shadows,
  transitions,
} from '../../tokens';

export class EVACheckbox extends EVABaseComponent {
  private checked = false;
  private inputEl?: HTMLInputElement;
  private labelId?: string;

  static get observedAttributes() {
    return ['checked', 'disabled', 'value', 'name', 'label'];
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
        this.checked = target.checked;
        if (this.checked) {
          this.setAttribute('checked', '');
        } else {
          this.removeAttribute('checked');
        }
        this.emit('change', { checked: this.checked });
        this.render();
      });
    }
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: inline-flex;
      }

      .checkbox-wrapper {
        position: relative;
        display: inline-flex;
      }

      .checkbox {
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
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
        border-radius: 4px;
        border: 1px solid ${modernColors.input};
        background: transparent;
        box-shadow: ${shadows.xs};
        transition: ${transitions.colors};
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .checkbox:checked + .visual {
        background: ${modernColors.primary};
        border-color: ${modernColors.primary};
        color: ${modernColors.primaryForeground};
      }

      .checkbox:focus-visible + .visual {
        outline: none;
        border-color: ${modernColors.ring};
        box-shadow: 0 0 0 3px color-mix(in srgb, ${modernColors.ring} 50%, transparent);
      }

      .checkbox:disabled + .visual {
        cursor: not-allowed;
        opacity: 0.5;
      }

      .checkbox[aria-invalid="true"] + .visual {
        box-shadow: 0 0 0 3px color-mix(in srgb, ${modernColors.destructive} 20%, transparent);
        border-color: ${modernColors.destructive};
      }

      .checkbox:hover:not(:disabled) + .visual {
        background: color-mix(in srgb, ${modernColors.input} 30%, transparent);
      }

      .indicator {
        display: ${this.checked ? 'flex' : 'none'};
        align-items: center;
        justify-content: center;
        width: 0.875rem;
        height: 0.875rem;
        transition: none;
      }

      @media (prefers-reduced-motion: reduce) {
        .visual,
        .indicator {
          transition-duration: 0.01ms !important;
        }
      }
    `));

    const wrapper = document.createElement('div');
    wrapper.className = 'checkbox-wrapper';
    wrapper.style.display = 'inline-flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.gap = gcSpacing[2];

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'checkbox';
    input.checked = this.checked;
    input.disabled = this.getBoolAttr('disabled');
    const inputId = `chk-${Math.random().toString(36).slice(2)}`;
    input.id = inputId;
    
    const name = this.getAttr('name', '');
    const value = this.getAttr('value', '');
    if (name) input.name = name;
    if (value) input.value = value;

    wrapper.appendChild(input);

    const visual = document.createElement('div');
    visual.className = 'visual';
    visual.setAttribute('role', 'checkbox');
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
    indicator.innerHTML = '✓';
    visual.appendChild(indicator);

    wrapper.appendChild(visual);

    const labelText = this.getAttr('label', '');
    if (labelText) {
      this.labelId = this.labelId || `chk-label-${Math.random().toString(36).slice(2)}`;
      const labelEl = document.createElement('label');
      labelEl.id = this.labelId;
      labelEl.htmlFor = inputId;
      labelEl.textContent = labelText;
      labelEl.style.fontSize = '0.75rem';
      labelEl.style.fontWeight = '500';
      labelEl.style.cursor = 'pointer';
      wrapper.appendChild(labelEl);
      visual.setAttribute('aria-labelledby', this.labelId);
    } else {
      visual.removeAttribute('aria-labelledby');
      this.labelId = undefined;
    }

    this.shadow.appendChild(wrapper);
    this.inputEl = input;
    this.setupInput();
  }
}

customElements.define('eva-checkbox', EVACheckbox);
