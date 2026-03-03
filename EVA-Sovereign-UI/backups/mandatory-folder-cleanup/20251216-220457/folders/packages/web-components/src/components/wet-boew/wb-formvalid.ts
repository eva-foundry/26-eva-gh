import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * wb-formvalid - Client-Side Form Validation
 * WET-BOEW 4.x plugin reimplemented as Lit 3.x Web Component
 * 
 * Validates form inputs with inline error messages
 * Reference: https://wet-boew.github.io/wet-boew/demos/formvalid/formvalid-en.html
 * 
 * @fires wb-formvalid-submit - Fired when form is submitted (includes validation status)
 * @fires wb-formvalid-error - Fired when validation error occurs
 * @fires wb-formvalid-clear - Fired when errors are cleared
 */
@customElement('wb-formvalid')
export class WBFormValid extends EVAElement {
  static override styles = css`
    :host {
      display: block;
    }

    .error-summary {
      background-color: var(--eva-colors-gc-error-red, #d3080c);
      color: var(--eva-colors-gc-background-white, #fff);
      padding: var(--eva-spacing-spacing-4, 1rem);
      margin-bottom: var(--eva-spacing-spacing-5, 1.5rem);
      border-radius: var(--eva-borderRadius-radius-md, 0.25rem);
    }

    .error-summary h2 {
      margin: 0 0 var(--eva-spacing-spacing-3, 0.75rem) 0;
      font-size: var(--eva-typography-font-size-h5, 1rem);
    }

    .error-summary ul {
      margin: 0;
      padding-left: var(--eva-spacing-spacing-5, 1.5rem);
    }

    .error-summary a {
      color: var(--eva-colors-gc-background-white, #fff);
      text-decoration: underline;
    }

    .field-error {
      color: var(--eva-colors-gc-error-red, #d3080c);
      font-size: var(--eva-typography-font-size-small, 0.875rem);
      margin-top: var(--eva-spacing-spacing-2, 0.5rem);
      display: block;
    }

    ::slotted(input:invalid),
    ::slotted(select:invalid),
    ::slotted(textarea:invalid) {
      border-color: var(--eva-colors-gc-error-red, #d3080c);
      border-width: 2px;
    }
  `;

  /**
   * Enable live validation (validate as user types)
   */
  @property({ type: Boolean, attribute: 'live-validation' })
  liveValidation = false;

  /**
   * Error summary heading text
   */
  @property({ type: String, attribute: 'error-summary-heading' })
  errorSummaryHeading = '';

  /**
   * Current validation errors
   * @internal
   */
  @state()
  private errors: Map<string, string> = new Map();

  /**
   * Form element being validated
   * @internal
   */
  private formElement: HTMLFormElement | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    this.componentName = 'wb-formvalid';
  }

  override firstUpdated(): void {
    // Find form element in slot
    const slot = this.shadowRoot?.querySelector('slot');
    const assignedElements = slot?.assignedElements() || [];
    this.formElement = assignedElements.find(el => el.tagName === 'FORM') as HTMLFormElement;

    if (this.formElement) {
      // Prevent default form submission
      this.formElement.addEventListener('submit', this.handleSubmit.bind(this));

      // Setup live validation if enabled
      if (this.liveValidation) {
        this.setupLiveValidation();
      }
    }
  }

  /**
   * Handle form submission
   * @param event - Submit event
   */
  private handleSubmit(event: Event): void {
    event.preventDefault();
    
    const isValid = this.validate();
    
    this.emitEvent('wb-formvalid-submit', {
      valid: isValid,
      errors: Array.from(this.errors.entries()).map(([field, message]) => ({ field, message }))
    });

    if (isValid && this.formElement) {
      // If validation passes, submit the form programmatically
      // (unless prevented by listener)
      this.formElement.submit();
    }
  }

  /**
   * Setup live validation listeners
   */
  private setupLiveValidation(): void {
    if (!this.formElement) return;

    const inputs = this.formElement.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input as HTMLInputElement);
      });
      input.addEventListener('input', () => {
        // Clear error on input change
        const fieldName = (input as HTMLInputElement).name || (input as HTMLInputElement).id;
        if (this.errors.has(fieldName)) {
          this.clearFieldError(fieldName);
        }
      });
    });
  }

  /**
   * Validate entire form
   * @returns True if form is valid
   */
  public validate(): boolean {
    this.errors.clear();

    if (!this.formElement) {
      return true;
    }

    const inputs = this.formElement.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      this.validateField(input as HTMLInputElement);
    });

    this.requestUpdate();

    // Announce errors to screen readers
    if (this.errors.size > 0) {
      this.announce(
        this.t('errorsFound', `The form contains ${this.errors.size} error(s)`),
        'assertive'
      );
      
      // Focus first error field
      const firstErrorField = Array.from(this.errors.keys())[0];
      const field = this.formElement.querySelector(`[name="${firstErrorField}"], #${firstErrorField}`) as HTMLElement;
      if (field) {
        field.focus();
      }
    }

    return this.errors.size === 0;
  }

  /**
   * Validate single field
   * @param input - Input element to validate
   */
  private validateField(input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): void {
    const fieldName = input.name || input.id;
    let errorMessage = '';

    // Required field validation
    if (input.hasAttribute('required') && !input.value.trim()) {
      errorMessage = this.t('requiredField', 'This field is required');
    }
    // Email validation
    else if (input.getAttribute('type') === 'email' && input.value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(input.value)) {
        errorMessage = this.t('invalidEmail', 'Please enter a valid email address');
      }
    }
    // URL validation
    else if (input.getAttribute('type') === 'url' && input.value) {
      try {
        new URL(input.value);
      } catch {
        errorMessage = this.t('invalidUrl', 'Please enter a valid URL');
      }
    }
    // Number range validation
    else if (input.getAttribute('type') === 'number' && input.value) {
      const value = parseFloat(input.value);
      const min = input.getAttribute('min');
      const max = input.getAttribute('max');
      
      if (min && value < parseFloat(min)) {
        errorMessage = this.t('minValue', `Value must be at least ${min}`);
      } else if (max && value > parseFloat(max)) {
        errorMessage = this.t('maxValue', `Value must be at most ${max}`);
      }
    }
    // Pattern validation
    else if (input.hasAttribute('pattern') && input.value) {
      const pattern = new RegExp(input.getAttribute('pattern')!);
      if (!pattern.test(input.value)) {
        errorMessage = this.t('patternMismatch', 'Please match the requested format');
      }
    }

    if (errorMessage) {
      this.showError(fieldName, errorMessage);
    } else {
      this.clearFieldError(fieldName);
    }
  }

  /**
   * Show error for specific field
   * @param fieldName - Field name/id
   * @param message - Error message
   */
  public showError(fieldName: string, message: string): void {
    this.errors.set(fieldName, message);
    this.requestUpdate();

    this.emitEvent('wb-formvalid-error', { field: fieldName, message });
  }

  /**
   * Clear error for specific field
   * @param fieldName - Field name/id
   */
  private clearFieldError(fieldName: string): void {
    this.errors.delete(fieldName);
    this.requestUpdate();
  }

  /**
   * Clear all errors
   */
  public clearErrors(): void {
    this.errors.clear();
    this.requestUpdate();
    this.emitEvent('wb-formvalid-clear');
  }

  override render() {
    const heading = this.errorSummaryHeading || this.t('formErrors', 'The form has errors');

    return html`
      ${this.errors.size > 0 ? html`
        <div 
          class="error-summary" 
          role="alert" 
          aria-live="assertive"
          aria-atomic="true">
          <h2>${heading}</h2>
          <ul>
            ${Array.from(this.errors.entries()).map(([field, message]) => html`
              <li>
                <a href="#${field}" @click=${(e: Event) => this.focusField(e, field)}>
                  ${message}
                </a>
              </li>
            `)}
          </ul>
        </div>
      ` : ''}
      
      <slot></slot>
    `;
  }

  /**
   * Focus field from error summary link
   * @param event - Click event
   * @param fieldName - Field name/id
   */
  private focusField(event: Event, fieldName: string): void {
    event.preventDefault();
    
    if (!this.formElement) return;

    const field = this.formElement.querySelector(`[name="${fieldName}"], #${fieldName}`) as HTMLElement;
    if (field) {
      field.focus();
    }
  }
}

// Register component messages
registerMessages('wb-formvalid', {
  formErrors: {
    'en-CA': 'The form has errors',
    'fr-CA': 'Le formulaire contient des erreurs'
  },
  errorsFound: {
    'en-CA': 'The form contains {count} error(s)',
    'fr-CA': 'Le formulaire contient {count} erreur(s)'
  },
  requiredField: {
    'en-CA': 'This field is required',
    'fr-CA': 'Ce champ est obligatoire'
  },
  invalidEmail: {
    'en-CA': 'Please enter a valid email address',
    'fr-CA': 'Veuillez entrer une adresse courriel valide'
  },
  invalidUrl: {
    'en-CA': 'Please enter a valid URL',
    'fr-CA': 'Veuillez entrer une URL valide'
  },
  minValue: {
    'en-CA': 'Value must be at least {min}',
    'fr-CA': 'La valeur doit être au moins {min}'
  },
  maxValue: {
    'en-CA': 'Value must be at most {max}',
    'fr-CA': 'La valeur doit être au plus {max}'
  },
  patternMismatch: {
    'en-CA': 'Please match the requested format',
    'fr-CA': 'Veuillez respecter le format demandé'
  }
});

declare global {
  interface HTMLElementTagNameMap {
    'wb-formvalid': WBFormValid;
  }
}
