import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from './EVAElement.js';

/**
 * EVA Button Component
 * GC Design System compliant button with 6 variants
 * WCAG 2.2 AAA compliant
 * 
 * @element eva-button
 * 
 * @slot - Button content (text, icons)
 * 
 * @fires click - Fires when button is clicked
 * 
 * @example
 * ```html
 * <eva-button variant="primary">Submit</eva-button>
 * <eva-button variant="secondary" disabled>Cancel</eva-button>
 * ```
 */
@customElement('eva-button')
export class EVAButton extends EVAElement {
  protected override componentName = 'eva-button';

  /**
   * Button variant (GC Design System button types)
   */
  @property({ type: String, reflect: true })
  variant: 'supertask' | 'primary' | 'secondary' | 'danger' | 'link' | 'contextual-signin' =
    'primary';

  /**
   * Button type (for form submission)
   */
  @property({ type: String })
  type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * Button size
   */
  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Full width button
   */
  @property({ type: Boolean, reflect: true })
  fullWidth = false;

  static override styles = css`
    :host {
      display: inline-block;
    }

    :host([full-width]) {
      display: block;
    }

    button {
      /* Reset default button styles */
      margin: 0;
      border: none;
      background: none;
      font-family: Noto Sans, sans-serif;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition-property: background-color, border-color, color, box-shadow;
      transition-duration: 200ms;
      transition-timing-function: ease-in-out;

      /* WCAG 2.2 AAA: 44px minimum touch target */
      min-height: 44px;
      min-width: 44px;
      padding: 0.75rem 1rem;
      border-radius: 0.25rem;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;

      /* Focus outline (WCAG 2.2 AAA: 3px minimum) */
      outline-offset: 2px;
    }

    button:focus-visible {
      outline: 3px solid #26374A;
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    /* Full width */
    :host([full-width]) button {
      width: 100%;
    }

    /* Size variants */
    :host([size='small']) button {
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
    }

    :host([size='large']) button {
      padding: 1rem 1.5rem;
      font-size: 1.25rem;
    }

    /* Variant: Supertask (most prominent) */
    :host([variant='supertask']) button {
      background-color: #af3c43;
      color: #ffffff;
      font-weight: 700;
      border: 2px solid #af3c43;
    }

    :host([variant='supertask']) button:hover:not(:disabled) {
      background-color: #8c2f35;
      border-color: #8c2f35;
    }

    :host([variant='supertask']) button:active:not(:disabled) {
      background-color: #6d2429;
      border-color: #6d2429;
    }

    /* Variant: Primary */
    :host([variant='primary']) button {
      background-color: #284162;
      color: #ffffff;
      border: 2px solid #284162;
    }

    :host([variant='primary']) button:hover:not(:disabled) {
      background-color: #1c2d46;
      border-color: #1c2d46;
    }

    :host([variant='primary']) button:active:not(:disabled) {
      background-color: #15202f;
      border-color: #15202f;
    }

    /* Variant: Secondary */
    :host([variant='secondary']) button {
      background-color: #ffffff;
      color: #284162;
      border: 2px solid #284162;
    }

    :host([variant='secondary']) button:hover:not(:disabled) {
      background-color: #f5f5f5;
    }

    :host([variant='secondary']) button:active:not(:disabled) {
      background-color: #e1e4e7;
    }

    /* Variant: Danger */
    :host([variant='danger']) button {
      background-color: #d3080c;
      color: #ffffff;
      border: 2px solid #d3080c;
    }

    :host([variant='danger']) button:hover:not(:disabled) {
      background-color: #a90609;
      border-color: #a90609;
    }

    :host([variant='danger']) button:active:not(:disabled) {
      background-color: #800507;
      border-color: #800507;
    }

    /* Variant: Link (looks like a hyperlink) */
    :host([variant='link']) button {
      background-color: transparent;
      color: #284162;
      border: none;
      text-decoration: underline;
      min-height: auto;
      min-width: auto;
      padding: 0.25rem 0.5rem;
    }

    :host([variant='link']) button:hover:not(:disabled) {
      color: #1c2d46;
    }

    /* Variant: Contextual Sign-in */
    :host([variant='contextual-signin']) button {
      background-color: #f5f5f5;
      color: #333333;
      border: 1px solid #666666;
    }

    :host([variant='contextual-signin']) button:hover:not(:disabled) {
      background-color: #e1e4e7;
    }

    /* High contrast mode support (Windows High Contrast) */
    @media (prefers-contrast: high) {
      button {
        border-width: 2px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      button {
        transition: none;
      }
    }
  `;

  override render() {
    return html`
      <button
        type="${this.type}"
        ?disabled="${this.disabled}"
        aria-label="${this.ariaLabel || ''}"
        aria-describedby="${this.ariaDescribedBy || ''}"
        @click="${this._handleClick}"
        @keydown="${this._handleKeydown}"
      >
        <slot></slot>
      </button>
    `;
  }

  private _handleClick(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Dispatch custom event
    this.dispatchEvent(
      new CustomEvent('eva-click', {
        detail: { originalEvent: event },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleKeydown(event: KeyboardEvent): void {
    // Enter and Space activate buttons (standard behavior)
    if (event.key === 'Enter' || event.key === ' ') {
      if (this.disabled) {
        event.preventDefault();
        return;
      }

      // Prevent default space scroll behavior
      if (event.key === ' ') {
        event.preventDefault();
      }

      // Trigger click
      (event.target as HTMLButtonElement).click();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eva-button': EVAButton;
  }
}
