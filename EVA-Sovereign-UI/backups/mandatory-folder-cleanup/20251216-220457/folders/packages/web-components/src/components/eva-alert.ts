import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from './EVAElement.js';

/**
 * EVA Alert Component
 * GC Design System compliant alert/notification
 * WCAG 2.2 AAA compliant with ARIA live regions
 * 
 * @element eva-alert
 * 
 * @slot - Alert message content
 * @slot title - Alert title (optional)
 * 
 * @fires dismiss - Fires when alert is dismissed
 * 
 * @example
 * ```html
 * <eva-alert type="success" dismissible>
 *   <strong slot="title">Success!</strong>
 *   Your changes have been saved.
 * </eva-alert>
 * ```
 */
@customElement('eva-alert')
export class EVAAlert extends EVAElement {
  protected override componentName = 'eva-alert';

  /**
   * Alert type (determines color and icon)
   */
  @property({ type: String, reflect: true })
  type: 'success' | 'info' | 'warning' | 'danger' = 'info';

  /**
   * Can the alert be dismissed?
   */
  @property({ type: Boolean, reflect: true })
  dismissible = false;

  /**
   * Is the alert currently visible?
   */
  @property({ type: Boolean, reflect: true })
  visible = true;

  /**
   * ARIA live region priority
   */
  @property({ type: String })
  live: 'polite' | 'assertive' = 'polite';

  static override styles = css`
    :host {
      display: block;
      margin: 1rem 0;
    }

    :host([visible='false']) {
      display: none;
    }

    .alert-container {
      display: flex;
      align-items: flex-start;
      padding: 1rem;
      border-left: 4px solid;
      border-radius: 0.25rem;
      position: relative;
    }

    .alert-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .alert-title {
      font-weight: 700;
      font-size: 1rem;
      line-height: 1.5;
    }

    .alert-title:empty {
      display: none;
    }

    .alert-message {
      font-size: 1rem;
      line-height: 1.5;
    }

    .alert-dismiss {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.25rem;
      margin-left: 1rem;
      color: inherit;
      font-size: 1.25rem;
      line-height: 1;
      opacity: 0.7;
      transition: opacity 200ms ease-in-out;
      min-height: 44px;
      min-width: 44px;
    }

    .alert-dismiss:hover {
      opacity: 1;
    }

    .alert-dismiss:focus-visible {
      outline: 3px solid #26374A;
      outline-offset: 2px;
    }

    /* Type: Success */
    :host([type='success']) .alert-container {
      background-color: #d4edda;
      color: #155724;
      border-left-color: #278400;
    }

    /* Type: Info */
    :host([type='info']) .alert-container {
      background-color: #d1ecf1;
      color: #0c5460;
      border-left-color: #269abc;
    }

    /* Type: Warning */
    :host([type='warning']) .alert-container {
      background-color: #fff3cd;
      color: #856404;
      border-left-color: #ff9900;
    }

    /* Type: Danger */
    :host([type='danger']) .alert-container {
      background-color: #f8d7da;
      color: #721c24;
      border-left-color: #d3080c;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .alert-container {
        border: 2px solid currentColor;
        border-left-width: 4px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .alert-dismiss {
        transition: none;
      }
    }
  `;

  override render() {
    return html`
      <div
        class="alert-container"
        role="alert"
        aria-live="${this.live}"
        aria-atomic="true"
      >
        <div class="alert-content">
          <div class="alert-title">
            <slot name="title"></slot>
          </div>
          <div class="alert-message">
            <slot></slot>
          </div>
        </div>
        ${this.dismissible
          ? html`
              <button
                class="alert-dismiss"
                aria-label="${this.t('dismiss-alert', 'Dismiss alert')}"
                @click="${this._handleDismiss}"
              >
                ×
              </button>
            `
          : ''}
      </div>
    `;
  }

  private _handleDismiss(): void {
    this.visible = false;

    // Announce to screen readers
    this.announce(this.t('alert-dismissed', 'Alert dismissed'), 'polite');

    // Dispatch custom event
    this.dispatchEvent(
      new CustomEvent('eva-dismiss', {
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eva-alert': EVAAlert;
  }
}
