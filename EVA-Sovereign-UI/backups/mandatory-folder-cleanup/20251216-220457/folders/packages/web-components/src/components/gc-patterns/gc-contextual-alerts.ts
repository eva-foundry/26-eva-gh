import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * gc-contextual-alerts - Contextual Alert Pattern
 * 
 * In-page alerts for warnings, errors, info, and success messages.
 * 
 * @element gc-contextual-alerts
 * 
 * @fires gc-contextual-alert-close - Fired when alert is dismissed
 * 
 * @example
 * ```html
 * <gc-contextual-alerts
 *   variant="success"
 *   heading="Success"
 *   message="Your application has been submitted.">
 * </gc-contextual-alerts>
 * ```
 */
@customElement('gc-contextual-alerts')
export class GCContextualAlerts extends EVAElement {
  static override styles = css`
      :host {
        display: block;
        margin: var(--eva-spacing-md, 1rem) 0;
      }

      :host([hidden]) {
        display: none;
      }

      .alert {
        padding: var(--eva-spacing-lg, 1.5rem);
        border-left: 4px solid;
        border-radius: var(--eva-border-radius-sm, 4px);
        display: flex;
        gap: var(--eva-spacing-md, 1rem);
        align-items: flex-start;
        animation: fadeIn 0.3s ease;
        position: relative;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
      }

      .alert.hiding {
        animation: fadeOut 0.3s ease forwards;
      }

      .alert.error {
        background: #fef6f5;
        border-color: #d3080c;
      }

      .alert.warning {
        background: #fef9f3;
        border-color: #ff9900;
      }

      .alert.info {
        background: #f5f9fc;
        border-color: #2572b4;
      }

      .alert.success {
        background: #f3f9f5;
        border-color: #4CAF50;
      }

      .icon {
        flex-shrink: 0;
        width: 1.5rem;
        height: 1.5rem;
        font-size: 1.5rem;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .icon.error {
        color: #d3080c;
      }

      .icon.warning {
        color: #ff9900;
      }

      .icon.info {
        color: #2572b4;
      }

      .icon.success {
        color: #4CAF50;
      }

      .content {
        flex: 1;
      }

      .heading {
        font-size: var(--eva-font-size-lg, 1.25rem);
        font-weight: var(--eva-font-weight-bold, 700);
        margin: 0 0 var(--eva-spacing-sm, 0.5rem);
        color: var(--eva-colors-text-primary, #333);
      }

      .message {
        margin: 0;
        color: var(--eva-colors-text-primary, #333);
        line-height: 1.5;
      }

      .close-button {
        background: transparent;
        border: none;
        padding: var(--eva-spacing-xs, 0.25rem);
        cursor: pointer;
        color: var(--eva-colors-text-secondary, #666);
        font-size: 1.5rem;
        line-height: 1;
        flex-shrink: 0;
        border-radius: var(--eva-border-radius-sm, 4px);
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .close-button:hover {
        background: rgba(0, 0, 0, 0.05);
      }

      .close-button:focus-visible {
        outline: 3px solid var(--eva-colors-focus, #4CAF50);
        outline-offset: 2px;
      }

      ::slotted(*) {
        margin: 0;
      }
    `;

  /**
   * Alert variant type
   */
  @property({ type: String })
  variant: 'error' | 'warning' | 'info' | 'success' = 'info';

  /**
   * Alert heading
   */
  @property({ type: String })
  heading?: string;

  /**
   * Alert message
   */
  @property({ type: String })
  message: string = '';

  /**
   * Whether alert can be dismissed
   */
  @property({ type: Boolean })
  dismissible: boolean = true;

  /**
   * Whether alert is visible
   */
  @property({ type: Boolean, reflect: true })
  visible: boolean = true;

  private getIcon(): string {
    switch (this.variant) {
      case 'error': return '✖';
      case 'warning': return '⚠';
      case 'info': return 'ℹ';
      case 'success': return '✓';
      default: return 'ℹ';
    }
  }

  private getAriaRole(): string {
    return this.variant === 'error' ? 'alert' : 'status';
  }

  private getAriaLive(): 'assertive' | 'polite' {
    return this.variant === 'error' ? 'assertive' : 'polite';
  }

  private handleClose(): void {
    const alert = this.shadowRoot?.querySelector('.alert');
    alert?.classList.add('hiding');

    setTimeout(() => {
      this.hide();
      this.emitEvent('gc-contextual-alert-close', {
        variant: this.variant,
        heading: this.heading,
        message: this.message
      });
      this.announce(this.getMessage('alertDismissed'));
    }, 300);
  }

  /**
   * Show the alert
   */
  public show(): void {
    this.visible = true;
    this.removeAttribute('hidden');
  }

  /**
   * Hide the alert
   */
  public hide(): void {
    this.visible = false;
    this.setAttribute('hidden', '');
  }

  protected override render() {
    if (!this.visible) {
      return html``;
    }

    const hasSlot = this.childElementCount > 0;
    const displayHeading = this.heading || this.getMessage(`${this.variant}Heading`);

    return html`
      <div 
        class="alert ${this.variant}"
        role="${this.getAriaRole()}"
        aria-live="${this.getAriaLive()}"
        aria-atomic="true"
      >
        <span class="icon ${this.variant}" aria-hidden="true">
          ${this.getIcon()}
        </span>
        <div class="content">
          <h2 class="heading">${displayHeading}</h2>
          ${hasSlot ? html`
            <div class="message">
              <slot></slot>
            </div>
          ` : html`
            <p class="message">${this.message}</p>
          `}
        </div>
        ${this.dismissible ? html`
          <button
            class="close-button"
            type="button"
            aria-label="${this.getMessage('dismiss')}"
            @click="${this.handleClose}"
          >
            ×
          </button>
        ` : ''}
      </div>
    `;
  }
}

// Register i18n messages
registerMessages('gc-contextual-alerts', {
  'en-CA': {
    errorHeading: 'Error',
    warningHeading: 'Warning',
    infoHeading: 'Information',
    successHeading: 'Success',
    dismiss: 'Dismiss alert',
    alertDismissed: 'Alert dismissed'
  },
  'fr-CA': {
    errorHeading: 'Erreur',
    warningHeading: 'Avertissement',
    infoHeading: 'Information',
    successHeading: 'Succès',
    dismiss: 'Fermer l\'alerte',
    alertDismissed: 'Alerte fermée'
  }
});

declare global {
  interface HTMLElementTagNameMap {
    'gc-contextual-alerts': GCContextualAlerts;
  }
}
