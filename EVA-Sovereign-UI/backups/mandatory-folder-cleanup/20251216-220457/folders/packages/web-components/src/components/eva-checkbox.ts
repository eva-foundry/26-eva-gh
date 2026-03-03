import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from './EVAElement.js';

/**
 * EVA Checkbox Component
 * GC Design System compliant checkbox
 * WCAG 2.2 AAA compliant
 * 
 * @element eva-checkbox
 * 
 * @fires change - Fires when checkbox state changes
 * 
 * @example
 * ```html
 * <eva-checkbox checked>I agree to the terms</eva-checkbox>
 * ```
 */
@customElement('eva-checkbox')
export class EVACheckbox extends EVAElement {
  protected override componentName = 'eva-checkbox';

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  @property({ type: String })
  value = '';

  @property({ type: String })
  name = '';

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

    .checkbox-wrapper {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      min-height: 44px;
    }

    .checkbox-input {
      position: relative;
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }

    input[type='checkbox'] {
      position: absolute;
      opacity: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      cursor: pointer;
    }

    input[type='checkbox']:disabled {
      cursor: not-allowed;
    }

    .checkbox-box {
      width: 24px;
      height: 24px;
      border: 2px solid #666666;
      border-radius: 0.25rem;
      background-color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 200ms ease-in-out;
      pointer-events: none;
    }

    input[type='checkbox']:checked + .checkbox-box {
      background-color: #284162;
      border-color: #284162;
    }

    input[type='checkbox']:focus-visible + .checkbox-box {
      outline: 3px solid #26374A;
      outline-offset: 2px;
    }

    .checkbox-checkmark {
      display: none;
      width: 16px;
      height: 16px;
      color: #ffffff;
      font-weight: 700;
      font-size: 1.25rem;
      line-height: 1;
    }

    input[type='checkbox']:checked + .checkbox-box .checkbox-checkmark {
      display: block;
    }

    .checkbox-label {
      font-size: 1rem;
      color: #333333;
      line-height: 1.5;
      display: flex;
      align-items: center;
      min-height: 24px;
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      .checkbox-box {
        border-width: 3px;
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .checkbox-box {
        transition: none;
      }
    }
  `;

  override render() {
    const checkboxId = `eva-checkbox-${this.name || Math.random().toString(36).substr(2, 9)}`;

    return html`
      <label class="checkbox-wrapper">
        <div class="checkbox-input">
          <input
            type="checkbox"
            id="${checkboxId}"
            .checked="${this.checked}"
            .indeterminate="${this.indeterminate}"
            .value="${this.value}"
            name="${this.name}"
            ?disabled="${this.disabled}"
            aria-label="${this.ariaLabel || ''}"
            aria-checked="${this.indeterminate ? 'mixed' : this.checked ? 'true' : 'false'}"
            @change="${this._handleChange}"
          />
          <div class="checkbox-box">
            <span class="checkbox-checkmark">✓</span>
          </div>
        </div>
        <span class="checkbox-label">
          <slot></slot>
        </span>
      </label>
    `;
  }

  private _handleChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
    this.indeterminate = false; // Clear indeterminate on user interaction

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
    'eva-checkbox': EVACheckbox;
  }
}
