import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from './EVAElement.js';

/**
 * EVA Select Component
 * GC Design System compliant select dropdown
 * WCAG 2.2 AAA compliant
 * 
 * @element eva-select
 * 
 * @fires change - Fires when selection changes
 * 
 * @example
 * ```html
 * <eva-select label="Province">
 *   <option value="ON">Ontario</option>
 *   <option value="QC">Quebec</option>
 * </eva-select>
 * ```
 */
@customElement('eva-select')
export class EVASelect extends EVAElement {
  protected override componentName = 'eva-select';

  @property({ type: String })
  label = '';

  @property({ type: String })
  value = '';

  @property({ type: String })
  placeholder = '';

  @property({ type: String })
  name = '';

  @property({ type: Boolean })
  required = false;

  @property({ type: String })
  error = '';

  @property({ type: String })
  hint = '';

  static override styles = css`
    :host {
      display: block;
      margin-bottom: 1rem;
    }

    .select-wrapper {
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

    .select-container {
      position: relative;
    }

    select {
      width: 100%;
      padding: 0.75rem 2.5rem 0.75rem 1rem;
      font-size: 1rem;
      font-family: Noto Sans, sans-serif;
      line-height: 1.5;
      color: #333333;
      background-color: #ffffff;
      border: 2px solid #666666;
      border-radius: 0.25rem;
      cursor: pointer;
      transition: border-color 200ms ease-in-out;
      min-height: 44px;
      appearance: none;
    }

    select:focus {
      outline: none;
      border-color: #284162;
      box-shadow: 0 0 0 3px rgba(40, 65, 98, 0.2);
    }

    select:disabled {
      background-color: #f5f5f5;
      color: #666666;
      cursor: not-allowed;
    }

    /* Custom arrow icon */
    .arrow-icon {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid #333333;
    }

    select:disabled + .arrow-icon {
      border-top-color: #666666;
    }

    /* Error state */
    :host([error]) select,
    select.has-error {
      border-color: #d3080c;
    }

    :host([error]) select:focus,
    select.has-error:focus {
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

    /* High contrast mode */
    @media (prefers-contrast: high) {
      select {
        border-width: 3px;
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      select {
        transition: none;
      }
    }
  `;

  override render() {
    const selectId = `eva-select-${this.name || Math.random().toString(36).substr(2, 9)}`;
    const hintId = this.hint ? `${selectId}-hint` : '';
    const errorId = this.error ? `${selectId}-error` : '';

    return html`
      <div class="select-wrapper">
        ${this.label
          ? html`
              <label class="label" for="${selectId}">
                ${this.label}
                ${this.required ? html`<span class="required-marker">*</span>` : ''}
              </label>
            `
          : ''}

        ${this.hint && !this.error
          ? html`<div class="hint" id="${hintId}">${this.hint}</div>`
          : ''}

        <div class="select-container">
          <select
            id="${selectId}"
            .value="${this.value}"
            name="${this.name}"
            ?required="${this.required}"
            ?disabled="${this.disabled}"
            class="${this.error ? 'has-error' : ''}"
            aria-label="${this.ariaLabel || this.label}"
            aria-describedby="${errorId || hintId || this.ariaDescribedBy || ''}"
            aria-invalid="${this.error ? 'true' : 'false'}"
            @change="${this._handleChange}"
          >
            ${this.placeholder
              ? html`<option value="" disabled selected>${this.placeholder}</option>`
              : ''}
            <slot></slot>
          </select>
          <div class="arrow-icon"></div>
        </div>

        ${this.error
          ? html`
              <div class="error-message" id="${errorId}" role="alert">
                ${this.error}
              </div>
            `
          : ''}
      </div>
    `;
  }

  private _handleChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.value = select.value;

    // Also emit native change event for compatibility
    this.dispatchEvent(
      new Event('change', {
        bubbles: true,
        composed: true,
      })
    );

    this.dispatchEvent(
      new CustomEvent('eva-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eva-select': EVASelect;
  }
}
