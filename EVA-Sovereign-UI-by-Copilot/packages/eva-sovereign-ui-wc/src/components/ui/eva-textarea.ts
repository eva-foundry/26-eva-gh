/**
 * EVA Textarea Component
 * Multi-line text input with Spark styling
 * Features: auto-growing, focus states, validation states
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
  shadows,
  transitions,
} from '../../tokens';

export class EVATextarea extends EVABaseComponent {
  private textareaEl?: HTMLTextAreaElement;

  static get observedAttributes() {
    return ['value', 'placeholder', 'disabled', 'readonly', 'rows'];
  }

  attributeChangedCallback() {
    if (this.textareaEl) {
      const value = this.getAttr('value', '');
      const placeholder = this.getAttr('placeholder', '');
      const rows = this.getAttr('rows', '4');
      
      this.textareaEl.value = value;
      this.textareaEl.placeholder = placeholder;
      this.textareaEl.rows = parseInt(rows);
      this.textareaEl.disabled = this.getBoolAttr('disabled');
      this.textareaEl.readOnly = this.getBoolAttr('readonly');
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupTextarea();
  }

  private setupTextarea() {
    if (this.textareaEl) {
      this.textareaEl.addEventListener('input', (e) => {
        const target = e.target as HTMLTextAreaElement;
        this.setAttribute('value', target.value);
        this.emit('input', { value: target.value });
      });

      this.textareaEl.addEventListener('change', (e) => {
        const target = e.target as HTMLTextAreaElement;
        this.emit('change', { value: target.value });
      });
    }
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
        width: 100%;
      }

      .textarea {
        display: flex;
        min-height: 4rem;
        width: 100%;
        border-radius: ${gcSpacing[2]};
        border: 1px solid ${modernColors.input};
        background: transparent;
        padding: ${gcSpacing[2]} ${gcSpacing[3]};
        font-size: 0.875rem;
        line-height: 1.5;
        box-shadow: ${shadows.xs};
        transition: ${transitions.colors};
        outline: none;
        resize: vertical;
        font-family: inherit;
        color: ${modernColors.foreground};
      }

      .textarea::placeholder {
        color: ${modernColors.mutedForeground};
      }

      .textarea:hover {
        background: color-mix(in srgb, ${modernColors.input} 30%, transparent);
      }

      .textarea:focus-visible {
        border-color: ${modernColors.ring};
        box-shadow: 0 0 0 3px color-mix(in srgb, ${modernColors.ring} 50%, transparent);
      }

      .textarea:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      .textarea[aria-invalid="true"] {
        box-shadow: 0 0 0 3px color-mix(in srgb, ${modernColors.destructive} 20%, transparent);
        border-color: ${modernColors.destructive};
      }

      @media (prefers-reduced-motion: reduce) {
        .textarea {
          transition-duration: 0.01ms !important;
        }
      }

      @media (min-width: 768px) {
        .textarea {
          font-size: 0.875rem;
        }
      }
    `));

    const textarea = document.createElement('textarea');
    textarea.className = 'textarea';
    textarea.value = this.getAttr('value', '');
    textarea.placeholder = this.getAttr('placeholder', '');
    textarea.rows = parseInt(this.getAttr('rows', '4'));
    textarea.disabled = this.getBoolAttr('disabled');
    textarea.readOnly = this.getBoolAttr('readonly');

    this.shadow.appendChild(textarea);
    this.textareaEl = textarea;
    this.setupTextarea();
  }
}

customElements.define('eva-textarea', EVATextarea);
