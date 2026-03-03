import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-PII-Scrub - PII Removal Before Submit
 * Detects and removes personally identifiable information before form submission
 */
@customElement('wb-pii-scrub')
export class WBPIIScrub extends EVAElement {
  static override styles = css`
    :host {
      display: block;
    }

    .pii-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
      display: none;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.5);
    }

    .pii-modal.open {
      display: flex;
    }

    .pii-dialog {
      background: var(--eva-colors-background-default, #ffffff);
      padding: var(--eva-spacing-lg, 1.5rem);
      border-radius: var(--eva-border-radius-md, 4px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
      max-width: 600px;
      width: 90%;
    }

    .pii-header {
      display: flex;
      align-items: center;
      gap: var(--eva-spacing-sm, 0.5rem);
      margin-bottom: var(--eva-spacing-md, 1rem);
    }

    .pii-icon {
      font-size: 2rem;
      color: var(--eva-colors-text-warning, #8a6d3b);
    }

    .pii-title {
      font-size: 1.25rem;
      font-weight: bold;
      margin: 0;
    }

    .pii-content {
      margin-bottom: var(--eva-spacing-md, 1rem);
    }

    .pii-list {
      list-style: none;
      padding: 0;
      margin: var(--eva-spacing-sm, 0.5rem) 0;
      background: var(--eva-colors-background-warning, #fcf8e3);
      padding: var(--eva-spacing-md, 1rem);
      border-radius: var(--eva-border-radius-sm, 3px);
    }

    .pii-list li {
      padding: var(--eva-spacing-xs, 0.25rem) 0;
    }

    .pii-actions {
      display: flex;
      gap: var(--eva-spacing-sm, 0.5rem);
      justify-content: flex-end;
    }

    .pii-btn {
      padding: var(--eva-spacing-sm, 0.5rem) var(--eva-spacing-md, 1rem);
      border: 1px solid transparent;
      border-radius: var(--eva-border-radius-sm, 3px);
      font-size: 1rem;
      cursor: pointer;
    }

    .pii-btn-cancel {
      background: var(--eva-colors-background-default, #f5f5f5);
      border-color: var(--eva-colors-border-default, #cccccc);
    }

    .pii-btn-cancel:hover {
      background: var(--eva-colors-background-hover, #e0e0e0);
    }

    .pii-btn-scrub {
      background: var(--eva-colors-background-primary, #335075);
      border-color: var(--eva-colors-background-primary, #335075);
      color: #ffffff;
    }

    .pii-btn-scrub:hover {
      background: var(--eva-colors-background-primary-hover, #26416d);
    }

    .pii-btn:focus {
      outline: 3px solid var(--eva-colors-focus, #303fc1);
    }
  `;

  @property({ type: Boolean, attribute: 'auto-detect' })
  autoDetect = true;

  @property({ type: String })
  target = '';

  @state()
  private modalOpen = false;

  @state()
  private detectedPII: Array<{ field: string; type: string; value: string }> = [];

  private formElement: HTMLFormElement | null = null;
  private originalSubmit: ((event?: Event) => void) | null = null;

  // PII detection patterns
  private readonly patterns = {
    sin: /\b\d{3}[-\s]?\d{3}[-\s]?\d{3}\b/g,
    creditCard: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g,
    email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    phone: /\b(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g
  };

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-pii-scrub', {
      'en-CA': {
        warning: 'Potential Personal Information Detected',
        message: 'The following fields may contain personal information that should not be submitted:',
        scrubButton: 'Remove and Submit',
        cancelButton: 'Cancel',
        sin: 'Social Insurance Number',
        creditCard: 'Credit Card Number',
        email: 'Email Address',
        phone: 'Phone Number',
        piiDetected: 'Personal information detected',
        piiScrubbed: 'Personal information removed'
      },
      'fr-CA': {
        warning: 'Information personnelle potentielle détectée',
        message: 'Les champs suivants peuvent contenir des informations personnelles qui ne devraient pas être soumises :',
        scrubButton: 'Supprimer et soumettre',
        cancelButton: 'Annuler',
        sin: 'Numéro d\'assurance sociale',
        creditCard: 'Numéro de carte de crédit',
        email: 'Adresse courriel',
        phone: 'Numéro de téléphone',
        piiDetected: 'Information personnelle détectée',
        piiScrubbed: 'Information personnelle supprimée'
      }
    });

    if (this.autoDetect) {
      this.attachToForm();
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.detachFromForm();
  }

  private attachToForm(): void {
    const form = this.target ? 
      document.querySelector(this.target) as HTMLFormElement :
      this.closest('form');

    if (form) {
      this.formElement = form;
      this.originalSubmit = form.onsubmit;
      form.addEventListener('submit', this.handleSubmit.bind(this));
    }
  }

  private detachFromForm(): void {
    if (this.formElement) {
      this.formElement.removeEventListener('submit', this.handleSubmit.bind(this));
      if (this.originalSubmit) {
        this.formElement.onsubmit = this.originalSubmit;
      }
    }
  }

  private handleSubmit(event: Event): void {
    event.preventDefault();

    if (this.autoDetect) {
      this.detectPII();
      if (this.detectedPII.length > 0) {
        this.modalOpen = true;
        this.announce(this.getMessage('wb-pii-scrub', 'piiDetected'));
      } else {
        this.submitForm();
      }
    }
  }

  detectPII(): void {
    this.detectedPII = [];

    if (!this.formElement) return;

    const inputs = this.formElement.querySelectorAll('input, textarea');
    inputs.forEach((input) => {
      const element = input as HTMLInputElement | HTMLTextAreaElement;
      const value = element.value;

      Object.entries(this.patterns).forEach(([type, pattern]) => {
        if (pattern.test(value)) {
          this.detectedPII.push({
            field: element.name || element.id || 'unnamed',
            type,
            value
          });
        }
      });
    });
  }

  scrubPII(): void {
    if (!this.formElement) return;

    const inputs = this.formElement.querySelectorAll('input, textarea');
    inputs.forEach((input) => {
      const element = input as HTMLInputElement | HTMLTextAreaElement;
      let value = element.value;

      Object.values(this.patterns).forEach((pattern) => {
        value = value.replace(pattern, '[REDACTED]');
      });

      element.value = value;
    });

    this.announce(this.getMessage('wb-pii-scrub', 'piiScrubbed'));
    this.emitEvent('wb-pii-scrubbed', { fields: this.detectedPII });
  }

  private handleScrub(): void {
    this.scrubPII();
    this.modalOpen = false;
    this.submitForm();
  }

  private handleCancel(): void {
    this.modalOpen = false;
    this.emitEvent('wb-pii-cancel', {});
  }

  private submitForm(): void {
    if (this.formElement) {
      // Remove our listener temporarily to avoid infinite loop
      this.formElement.removeEventListener('submit', this.handleSubmit.bind(this));
      
      // Submit the form
      if (this.originalSubmit) {
        this.originalSubmit.call(this.formElement);
      } else {
        this.formElement.submit();
      }

      // Re-attach listener
      this.formElement.addEventListener('submit', this.handleSubmit.bind(this));
    }
  }

  override render() {
    return html`
      <slot></slot>
      <div class="pii-modal ${this.modalOpen ? 'open' : ''}" role="dialog" aria-modal="true" aria-labelledby="pii-title">
        <div class="pii-dialog">
          <div class="pii-header">
            <span class="pii-icon">⚠</span>
            <h2 class="pii-title" id="pii-title">${this.getMessage('wb-pii-scrub', 'warning')}</h2>
          </div>
          <div class="pii-content">
            <p>${this.getMessage('wb-pii-scrub', 'message')}</p>
            <ul class="pii-list">
              ${this.detectedPII.map(item => html`
                <li><strong>${item.field}:</strong> ${this.getMessage('wb-pii-scrub', item.type)}</li>
              `)}
            </ul>
          </div>
          <div class="pii-actions">
            <button class="pii-btn pii-btn-cancel" @click="${this.handleCancel}">
              ${this.getMessage('wb-pii-scrub', 'cancelButton')}
            </button>
            <button class="pii-btn pii-btn-scrub" @click="${this.handleScrub}">
              ${this.getMessage('wb-pii-scrub', 'scrubButton')}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-pii-scrub': WBPIIScrub;
  }
}
