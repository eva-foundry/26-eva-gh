import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from './EVAElement.js';

/**
 * EVA Radio Component
 * GC Design System compliant radio button
 * WCAG 2.2 AAA compliant
 * 
 * @element eva-radio
 * 
 * @fires change - Fires when radio is selected
 * 
 * @example
 * ```html
 * <eva-radio name="option" value="1" checked>Option 1</eva-radio>
 * <eva-radio name="option" value="2">Option 2</eva-radio>
 * ```
 */
@customElement('eva-radio')
export class EVARadio extends EVAElement {
  protected override componentName = 'eva-radio';

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: String })
  value = '';

  @property({ type: String })
  name = '';

  @property({ type: Boolean, reflect: true })
  required = false;

  static override styles = css`
    :host {
      display: inline-flex;
      align-items: flex-start;
      gap: 0.75rem;
      cursor: pointer;
      user-select: none;
      min-height: 44px;
    }

    :host([disabled]) {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .radio-wrapper {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      min-height: 44px;
    }

    .radio-input {
      position: relative;
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }

    input[type='radio'] {
      position: absolute;
      opacity: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      cursor: pointer;
    }

    input[type='radio']:disabled {
      cursor: not-allowed;
    }

    .radio-circle {
      width: 24px;
      height: 24px;
      border: 2px solid #666666;
      border-radius: 50%;
      background-color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 200ms ease-in-out;
      pointer-events: none;
    }

    input[type='radio']:checked + .radio-circle {
      border-color: #284162;
    }

    input[type='radio']:focus-visible + .radio-circle {
      outline: 3px solid #26374A;
      outline-offset: 2px;
    }

    .radio-dot {
      display: none;
      width: 12px;
      height: 12px;
      background-color: #284162;
      border-radius: 50%;
    }

    input[type='radio']:checked + .radio-circle .radio-dot {
      display: block;
    }

    .radio-label {
      font-size: 1rem;
      color: #333333;
      line-height: 1.5;
      display: flex;
      align-items: center;
      min-height: 24px;
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      .radio-circle {
        border-width: 3px;
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .radio-circle {
        transition: none;
      }
    }
  `;

  override render() {
    const radioId = `eva-radio-${this.name}-${this.value || Math.random().toString(36).substr(2, 9)}`;

    return html`
      <label class="radio-wrapper" for="${radioId}">
        <div class="radio-input">
          <input
            type="radio"
            id="${radioId}"
            .checked="${this.checked}"
            .value="${this.value}"
            name="${this.name}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            aria-label="${this.ariaLabel || ''}"
            aria-checked="${this.checked ? 'true' : 'false'}"
            @change="${this._handleChange}"
          />
          <div class="radio-circle">
            <span class="radio-dot"></span>
          </div>
        </div>
        <span class="radio-label">
          <slot></slot>
        </span>
      </label>
    `;
  }

  private _handleChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;

    // Uncheck other radios in the same group
    if (this.checked && this.name) {
      const radios = document.querySelectorAll(`eva-radio[name="${this.name}"]`);
      radios.forEach((radio) => {
        if (radio !== this) {
          (radio as EVARadio).checked = false;
        }
      });
    }

    this.dispatchEvent(
      new CustomEvent('eva-change', {
        detail: { checked: this.checked, value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eva-radio': EVARadio;
  }
}
