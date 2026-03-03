import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

// Register bilingual messages for wb-postback
registerMessages('wb-postback', {
  'en-CA': {
    submitting: 'Submitting form...',
    success: 'Form submitted successfully',
    error: 'An error occurred while submitting the form',
    networkError: 'Network error. Please check your connection.',
    validationError: 'Please fix form errors before submitting',
    tryAgain: 'Try Again',
    close: 'Close'
  },
  'fr-CA': {
    submitting: 'Envoi du formulaire...',
    success: 'Formulaire soumis avec succès',
    error: 'Une erreur s\'est produite lors de l\'envoi du formulaire',
    networkError: 'Erreur réseau. Veuillez vérifier votre connexion.',
    validationError: 'Veuillez corriger les erreurs du formulaire avant de soumettre',
    tryAgain: 'Réessayer',
    close: 'Fermer'
  }
});

/**
 * wb-postback - AJAX Form Submission
 *
 * WET-BOEW 4.x plugin reimplemented as modern Lit 3.x Web Component.
 * Submits forms via AJAX without page reload.
 *
 * @element wb-postback
 *
 * @fires wb-postback-submit - Fired when form submission starts
 * @fires wb-postback-success - Fired when form submission succeeds
 * @fires wb-postback-error - Fired when form submission fails
 *
 * @slot - Form element to submit via AJAX
 *
 * @csspart status - Status message container
 * @csspart spinner - Loading spinner
 *
 * @example
 * ```html
 * <wb-postback
 *   action="/api/submit"
 *   method="POST"
 *   success-message="Thank you for your submission!">
 *   <form>
 *     <label>Name: <input type="text" name="name" required /></label>
 *     <button type="submit">Submit</button>
 *   </form>
 * </wb-postback>
 * ```
 */
@customElement('wb-postback')
export class WBPostback extends EVAElement {
  /** Form action URL */
  @property({ type: String })
  action = '';

  /** HTTP method (GET, POST, PUT, DELETE) */
  @property({ type: String })
  method = 'POST';

  /** Custom success message (overrides default) */
  @property({ type: String, attribute: 'success-message' })
  successMessage = '';

  /** Custom error message (overrides default) */
  @property({ type: String, attribute: 'error-message' })
  errorMessage = '';

  /** Show status messages (can be disabled for custom handling) */
  @property({ type: Boolean, attribute: 'show-status' })
  showStatus = true;

  /** Internal state: Submission status */
  @state()
  private submitting = false;

  @state()
  private status: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  @state()
  private statusMessage = '';

  /** Prevent double submission flag */
  private isSubmitting = false;

  static override styles = css`
    :host {
      display: block;
      font-family: var(--eva-typography-font-family-body, 'Noto Sans', sans-serif);
    }

    .status-message {
      padding: var(--eva-spacing-spacing-4, 1rem);
      margin-bottom: var(--eva-spacing-spacing-4, 1rem);
      border-radius: var(--eva-border-radius-md, 8px);
      display: flex;
      align-items: center;
      gap: var(--eva-spacing-spacing-3, 0.75rem);
    }

    .status-loading {
      background: var(--eva-colors-info-light, #e7f3ff);
      border-left: 4px solid var(--eva-colors-info, #2196f3);
      color: var(--eva-colors-info-dark, #1565c0);
    }

    .status-success {
      background: var(--eva-colors-success-light, #e8f5e9);
      border-left: 4px solid var(--eva-colors-success, #278400);
      color: var(--eva-colors-success-dark, #1e6300);
    }

    .status-error {
      background: var(--eva-colors-error-light, #ffebee);
      border-left: 4px solid var(--eva-colors-gc-error-red, #d3080c);
      color: var(--eva-colors-error-dark, #b71c1c);
    }

    .spinner {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 3px solid rgba(0, 0, 0, 0.1);
      border-top-color: var(--eva-colors-gc-link-blue, #284162);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    .status-icon {
      font-size: 1.25rem;
      line-height: 1;
    }

    .retry-button {
      margin-top: var(--eva-spacing-spacing-3, 0.75rem);
      padding: var(--eva-spacing-spacing-2, 0.5rem) var(--eva-spacing-spacing-4, 1rem);
      background: var(--eva-colors-gc-link-blue, #284162);
      color: var(--eva-colors-white, #fff);
      border: none;
      border-radius: var(--eva-border-radius-md, 8px);
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .retry-button:hover {
      background: var(--eva-colors-gc-link-blue-hover, #1f3350);
    }

    ::slotted(form) {
      position: relative;
    }

    .submitting-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
    }
  `;

  override connectedCallback(): void {
    super.connectedCallback();

    // Attach submit handler to form
    this.addEventListener('submit', this.handleSubmit as EventListener);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('submit', this.handleSubmit as EventListener);
  }

  /**
   * Handle form submission
   */
  private handleSubmit = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();

    // Prevent double submission
    if (this.isSubmitting) {
      return;
    }

    const form = e.target as HTMLFormElement;

    // Validate form before submission
    if (!form.checkValidity()) {
      this.showErrorStatus(this.getMessage('wb-postback', 'validationError'));
      return;
    }

    // Start submission
    this.isSubmitting = true;
    this.submitting = true;
    this.status = 'loading';
    this.statusMessage = this.getMessage('wb-postback', 'submitting');

    // Emit submit event
    this.emitEvent('wb-postback-submit', { form });

    // Announce to screen readers
    this.announce(this.statusMessage, 'polite');

    try {
      // Prepare form data
      const formData = new FormData(form);

      // Determine submission URL
      const url = this.action || form.action || window.location.href;

      // Submit via fetch
      const response = await fetch(url, {
        method: this.method,
        body: this.method === 'GET' ? undefined : formData,
        headers: this.method === 'GET' ? undefined : {
          // Let browser set Content-Type for FormData (multipart/form-data)
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // Parse response (try JSON first, fallback to text)
      let responseData: any;
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      // Success!
      this.showSuccessStatus(
        this.successMessage || responseData.message || this.getMessage('wb-postback', 'success')
      );

      // Emit success event
      this.emitEvent('wb-postback-success', { response: responseData });

      // Reset form on success
      form.reset();

    } catch (error) {
      // Error handling
      const errorMsg = error instanceof Error ? error.message : String(error);
      
      this.showErrorStatus(
        this.errorMessage || 
        (errorMsg.includes('Failed to fetch') 
          ? this.getMessage('wb-postback', 'networkError')
          : this.getMessage('wb-postback', 'error'))
      );

      // Emit error event
      this.emitEvent('wb-postback-error', { error: errorMsg });

    } finally {
      // Re-enable submission
      this.isSubmitting = false;
      this.submitting = false;
    }
  };

  /**
   * Show success status message
   */
  private showSuccessStatus(message: string): void {
    this.status = 'success';
    this.statusMessage = message;
    this.announce(message, 'assertive');
  }

  /**
   * Show error status message
   */
  private showErrorStatus(message: string): void {
    this.status = 'error';
    this.statusMessage = message;
    this.announce(message, 'assertive');
  }

  /**
   * Clear status message
   */
  clearStatus(): void {
    this.status = 'idle';
    this.statusMessage = '';
  }

  /**
   * Retry form submission (re-trigger submit event)
   */
  retrySubmit(): void {
    const form = this.querySelector('form');
    if (form) {
      form.dispatchEvent(new SubmitEvent('submit', { cancelable: true, bubbles: true }));
    }
  }

  override render() {
    return html`
      <!-- Status Message -->
      ${this.showStatus && this.status !== 'idle' ? html`
        <div
          class="status-message status-${this.status}"
          part="status"
          role="status"
          aria-live="polite"
        >
          ${this.status === 'loading' ? html`
            <span class="spinner" part="spinner" aria-hidden="true"></span>
          ` : html`
            <span class="status-icon" aria-hidden="true">
              ${this.status === 'success' ? '✓' : '⚠'}
            </span>
          `}
          
          <span>${this.statusMessage}</span>

          ${this.status === 'error' ? html`
            <button
              class="retry-button"
              @click=${this.retrySubmit}
              aria-label="${this.getMessage('wb-postback', 'tryAgain')}"
            >
              ${this.getMessage('wb-postback', 'tryAgain')}
            </button>
          ` : ''}
        </div>
      ` : ''}

      <!-- Form Slot -->
      <div style="position: relative;">
        <slot></slot>

        <!-- Submitting Overlay (prevents interaction during submit) -->
        ${this.submitting ? html`
          <div class="submitting-overlay" aria-hidden="true">
            <span class="spinner" part="spinner"></span>
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-postback': WBPostback;
  }
}
