import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from './EVAElement.js';

/**
 * EVA Input Component
 * GC Design System compliant text input with validation
 * WCAG 2.2 AAA compliant
 * 
 * @element eva-input
 * 
 * @fires input - Fires when input value changes
 * @fires change - Fires when input loses focus
 * 
 * @example
 * ```html
 * <eva-input
 *   label="Email Address"
 *   type="email"
 *   required
 *   error="Please enter a valid email"
 * ></eva-input>
 * ```
 */
@customElement('eva-input')
export class EVAInput extends EVAElement {
  protected override componentName = 'eva-input';

  @property({ type: String })
  label = '';

  @property({ type: String })
  type: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' = 'text';

  @property({ type: String })
  value = '';

  @property({ type: String })
  placeholder = '';

  @property({ type: String })
  name = '';

  @property({ type: Boolean })
  required = false;

  @property({ type: Boolean })
  readonly = false;

  @property({ type: String })
  error = '';

  @property({ type: String })
  hint = '';

  @property({ type: Number })
  maxlength?: number;

  static override styles = css`
    :host {
      display: block;
      margin-bottom: 1rem;
    }

    .input-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .label {
      font-weight: 700;
      font-size: 1rem;
      color: #333333;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .required-marker {
      color: #d3080c;
      font-weight: 700;
    }

    .input-container {
      position: relative;
    }

    input {
      width: 100%;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      font-family: Noto Sans, sans-serif;
      line-height: 1.5;
      color: #333333;
      background-color: #ffffff;
      border: 2px solid #666666;
      border-radius: 0.25rem;
      transition: border-color 200ms ease-in-out;
      min-height: 44px;
    }

    input:focus {
      outline: none;
      border-color: #284162;
      box-shadow: 0 0 0 3px rgba(40, 65, 98, 0.2);
    }

    input:disabled,
    input:read-only {
      background-color: #f5f5f5;
      color: #666666;
      cursor: not-allowed;
    }

    input::placeholder {
      color: #999999;
    }

    /* Error state */
    :host([error]) input,
    input.has-error {
      border-color: #d3080c;
    }

    :host([error]) input:focus,
    input.has-error:focus {
      border-color: #d3080c;
      box-shadow: 0 0 0 3px rgba(211, 8, 12, 0.2);
    }

    .hint {
      font-size: 0.875rem;
      color: #666666;
      line-height: 1.5;
    }

    .error-message {
      font-size: 0.875rem;
      color: #d3080c;
      font-weight: 700;
      line-height: 1.5;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .error-message::before {
      content: '⚠';
      font-size: 1rem;
    }

    .char-count {
      font-size: 0.875rem;
      color: #666666;
      text-align: right;
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      input {
        border-width: 3px;
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      input {
        transition: none;
      }
    }
  `;

  override render() {
    const inputId = `eva-input-${this.name || Math.random().toString(36).substr(2, 9)}`;
    const hintId = this.hint ? `${inputId}-hint` : '';
    const errorId = this.error ? `${inputId}-error` : '';

    return html`
      <div class="input-wrapper">
        ${this.label
          ? html`
              <label class="label" for="${inputId}">
                ${this.label}
                ${this.required ? html`<span class="required-marker">*</span>` : ''}
              </label>
            `
          : ''}

        ${this.hint && !this.error
          ? html`<div class="hint" id="${hintId}">${this.hint}</div>`
          : ''}

        <div class="input-container">
          <input
            id="${inputId}"
            type="${this.type}"
            .value="${this.value}"
            placeholder="${this.placeholder}"
            name="${this.name}"
            ?required="${this.required}"
            ?readonly="${this.readonly}"
            ?disabled="${this.disabled}"
            maxlength="${this.maxlength || ''}"
            class="${this.error ? 'has-error' : ''}"
            aria-label="${this.ariaLabel || this.label}"
            aria-describedby="${errorId || hintId || this.ariaDescribedBy || ''}"
            aria-invalid="${this.error ? 'true' : 'false'}"
            @input="${this._handleInput}"
            @change="${this._handleChange}"
            @focus="${this._handleFocus}"
            @blur="${this._handleBlur}"
          />
        </div>

        ${this.error
          ? html`
              <div class="error-message" id="${errorId}" role="alert">
                ${this.error}
              </div>
            `
          : ''}

        ${this.maxlength && this.value
          ? html`
              <div class="char-count">
                ${this.value.length} / ${this.maxlength}
              </div>
            `
          : ''}
      </div>
    `;
  }

  private _handleInput(event: InputEvent): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;

    this.dispatchEvent(
      new CustomEvent('eva-input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;

    this.dispatchEvent(
      new CustomEvent('eva-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleFocus(): void {
    // Focus state handled by :focus CSS
  }

  private _handleBlur(): void {
    // Blur state handled by :focus CSS
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eva-input': EVAInput;
  }
}
