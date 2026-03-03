/**
 * EVA Input OTP Component
 * One-time password / PIN input
 * Features: Auto-focus next, paste support, validation
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
  shadows,
  transitions,
} from '../../tokens';

export class EVAInputOTP extends EVABaseComponent {
  private inputs: HTMLInputElement[] = [];
  private maxLength = 6;

  static get observedAttributes() {
    return ['max-length', 'value'];
  }

  attributeChangedCallback() {
    this.maxLength = parseInt(this.getAttr('max-length', '6'), 10);
    this.render();
  }

  private handleInput(index: number, e: Event) {
    const input = e.target as HTMLInputElement;
    const value = input.value;

    if (value && index < this.maxLength - 1) {
      this.inputs[index + 1]?.focus();
    }

    this.emitValue();
  }

  private handleKeyDown(index: number, e: KeyboardEvent) {
    const input = e.target as HTMLInputElement;

    if (e.key === 'Backspace' && !input.value && index > 0) {
      this.inputs[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      this.inputs[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < this.maxLength - 1) {
      this.inputs[index + 1]?.focus();
    }
  }

  private handlePaste(e: ClipboardEvent) {
    e.preventDefault();
    const paste = e.clipboardData?.getData('text') || '';
    const chars = paste.split('').slice(0, this.maxLength);

    chars.forEach((char, i) => {
      if (this.inputs[i]) {
        this.inputs[i].value = char;
      }
    });

    const lastIndex = Math.min(chars.length, this.maxLength - 1);
    this.inputs[lastIndex]?.focus();

    this.emitValue();
  }

  private emitValue() {
    const value = this.inputs.map(input => input.value).join('');
    this.emit('change', { value });
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: inline-flex;
        gap: ${gcSpacing[2]};
      }

      .input {
        width: 2.5rem;
        height: 2.5rem;
        text-align: center;
        font-size: 1rem;
        font-weight: 600;
        border: 1px solid ${modernColors.input};
        border-radius: ${gcSpacing[2]};
        background: ${modernColors.background};
        color: ${modernColors.foreground};
        box-shadow: ${shadows.xs};
        transition: ${transitions.colors};
      }

      .input:hover {
        border-color: ${modernColors.ring};
      }

      .input:focus {
        outline: none;
        border-color: ${modernColors.ring};
        box-shadow: 0 0 0 2px color-mix(in srgb, ${modernColors.ring} 50%, transparent);
      }

      .input:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `));

    const container = document.createElement('div');
    container.style.display = 'contents';

    this.inputs = [];

    for (let i = 0; i < this.maxLength; i++) {
      const input = document.createElement('input');
      input.className = 'input';
      input.type = 'text';
      input.inputMode = 'numeric';
      input.maxLength = 1;
      input.pattern = '[0-9]';
      
      if (this.getBoolAttr('disabled')) {
        input.disabled = true;
      }

      input.addEventListener('input', (e) => this.handleInput(i, e));
      input.addEventListener('keydown', (e) => this.handleKeyDown(i, e));
      
      if (i === 0) {
        input.addEventListener('paste', (e) => this.handlePaste(e));
      }

      this.inputs.push(input);
      container.appendChild(input);
    }

    this.shadow.appendChild(container);
  }
}

customElements.define('eva-input-otp', EVAInputOTP);
