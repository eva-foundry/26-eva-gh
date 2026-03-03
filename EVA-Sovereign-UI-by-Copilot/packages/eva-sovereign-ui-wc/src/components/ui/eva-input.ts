/**
 * EVA Input Component
 * Text input fields with Spark styling
 * Features: focus states, validation states, file input support
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
  shadows,
  transitions,
} from '../../tokens';

export class EVAInput extends EVABaseComponent {
  private inputEl?: HTMLInputElement;
  private labelId?: string;
  private errorId?: string;

  static get observedAttributes() {
    return ['type', 'value', 'placeholder', 'disabled', 'readonly', 'label', 'error'];
  }

  attributeChangedCallback() {
    if (this.inputEl) {
      const type = this.getAttr('type', 'text');
      const value = this.getAttr('value', '');
      const placeholder = this.getAttr('placeholder', '');
      const label = this.getAttr('label', '');
      const error = this.getAttr('error', '');

      this.inputEl.type = type;
      this.inputEl.value = value;
      this.inputEl.placeholder = placeholder;
      this.inputEl.disabled = this.getBoolAttr('disabled');
      this.inputEl.readOnly = this.getBoolAttr('readonly');

      // Accessible name via label
      if (label && this.labelId) {
        this.inputEl.setAttribute('aria-labelledby', this.labelId);
      } else {
        this.inputEl.removeAttribute('aria-labelledby');
      }

      // Error message association
      if (error && this.errorId) {
        this.inputEl.setAttribute('aria-describedby', this.errorId);
        this.inputEl.setAttribute('aria-invalid', 'true');
      } else {
        this.inputEl.removeAttribute('aria-describedby');
        this.inputEl.removeAttribute('aria-invalid');
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupInput();
  }

  private setupInput() {
    if (this.inputEl) {
      this.inputEl.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        this.setAttribute('value', target.value);
        this.emit('input', { value: target.value });
      });

      this.inputEl.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        this.emit('change', { value: target.value });
      });
    }
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: inline-block;
        width: 100%;
      }

      .input {
        display: flex;
        height: 2.25rem;
        width: 100%;
        min-width: 0;
        border-radius: ${gcSpacing[2]};
        border: 1px solid ${modernColors.input};
        background: transparent;
        padding: ${gcSpacing[1]} ${gcSpacing[3]};
        font-size: 0.875rem;
        box-shadow: ${shadows.xs};
        transition: ${transitions.colors};
        outline: none;
        color: ${modernColors.foreground};
      }

      .input::placeholder {
        color: ${modernColors.mutedForeground};
      }

      .input::selection {
        background: ${modernColors.primary};
        color: ${modernColors.primaryForeground};
      }

      .input:hover {
        background: color-mix(in srgb, ${modernColors.input} 30%, transparent);
      }

      .input:focus-visible {
        border-color: ${modernColors.ring};
        box-shadow: 0 0 0 3px color-mix(in srgb, ${modernColors.ring} 50%, transparent);
      }

      .input:disabled {
        pointer-events: none;
        cursor: not-allowed;
        opacity: 0.5;
      }

      .input[aria-invalid="true"] {
        box-shadow: 0 0 0 3px color-mix(in srgb, ${modernColors.destructive} 20%, transparent);
        border-color: ${modernColors.destructive};
      }

      .input[type="file"] {
        cursor: pointer;
      }

      .input[type="file"]::file-selector-button {
        display: inline-flex;
        height: 1.75rem;
        border: 0;
        background: transparent;
        font-size: 0.875rem;
        font-weight: 500;
        margin-right: ${gcSpacing[2]};
        cursor: pointer;
        color: ${modernColors.foreground};
      }

      @media (prefers-reduced-motion: reduce) {
        .input {
          transition-duration: 0.01ms !important;
        }
      }

      @media (min-width: 768px) {
        .input {
          font-size: 0.875rem;
        }
      }
    `));

    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = gcSpacing[1];

    const labelText = this.getAttr('label', '');
    let labelEl: HTMLLabelElement | undefined;
    if (labelText) {
      labelEl = document.createElement('label');
      this.labelId = this.labelId || `inp-label-${Math.random().toString(36).slice(2)}`;
      labelEl.id = this.labelId;
      labelEl.textContent = labelText;
      labelEl.style.fontSize = '0.75rem';
      labelEl.style.fontWeight = '500';
      labelEl.style.color = modernColors.mutedForeground;
      wrapper.appendChild(labelEl);
    } else {
      this.labelId = undefined;
    }

    const input = document.createElement('input');
    input.className = 'input';
    const inputId = `inp-${Math.random().toString(36).slice(2)}`;
    input.id = inputId;
    input.type = this.getAttr('type', 'text');
    input.value = this.getAttr('value', '');
    input.placeholder = this.getAttr('placeholder', '');
    input.disabled = this.getBoolAttr('disabled');
    input.readOnly = this.getBoolAttr('readonly');

    if (labelEl) {
      labelEl.htmlFor = inputId;
      input.setAttribute('aria-labelledby', this.labelId!);
    }

    const errorText = this.getAttr('error', '');
    if (errorText) {
      this.errorId = this.errorId || `inp-err-${Math.random().toString(36).slice(2)}`;
      input.setAttribute('aria-describedby', this.errorId);
      input.setAttribute('aria-invalid', 'true');
    } else {
      this.errorId = undefined;
    }

    wrapper.appendChild(input);

    if (errorText) {
      const errorEl = document.createElement('div');
      errorEl.id = this.errorId!;
      errorEl.textContent = errorText;
      errorEl.style.fontSize = '0.75rem';
      errorEl.style.color = modernColors.destructive;
      wrapper.appendChild(errorEl);
    }

    this.shadow.appendChild(wrapper);
    this.inputEl = input;
    this.setupInput();
  }
}

customElements.define('eva-input', EVAInput);
