import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

export interface StepFormData {
  currentStep: number;
  formData: Record<string, unknown>;
}

export interface Step {
  id: string;
  title: string;
  description?: string;
  fields: string;
}

@customElement('gc-steps-form')
export class GCStepsForm extends EVAElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--eva-fonts-family-base, 'Lato', sans-serif);
    }

    .steps-container {
      max-width: 900px;
      margin: 0 auto;
    }

    .progress-indicator {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--eva-spacing-xl, 24px);
      position: relative;
    }

    .progress-indicator::before {
      content: '';
      position: absolute;
      top: 16px;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--eva-colors-border-primary, #e1e4e7);
      z-index: 0;
    }

    .step-indicator {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      position: relative;
      z-index: 1;
    }

    .step-number {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--eva-colors-surface-secondary, #f5f5f5);
      border: 2px solid var(--eva-colors-border-primary, #e1e4e7);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: var(--eva-fonts-weight-bold, 700);
      font-size: var(--eva-fonts-size-sm, 0.875rem);
      color: var(--eva-colors-text-secondary, #666);
      margin-bottom: var(--eva-spacing-xs, 4px);
    }

    .step-indicator.current .step-number {
      background: var(--eva-colors-primary, #26374a);
      border-color: var(--eva-colors-primary, #26374a);
      color: var(--eva-colors-text-on-primary, #fff);
    }

    .step-indicator.completed .step-number {
      background: var(--eva-colors-success, #2e8540);
      border-color: var(--eva-colors-success, #2e8540);
      color: var(--eva-colors-text-on-primary, #fff);
    }

    .step-indicator.completed .step-number::before {
      content: '✓';
    }

    .step-title {
      font-size: var(--eva-fonts-size-sm, 0.875rem);
      text-align: center;
      color: var(--eva-colors-text-secondary, #666);
      max-width: 120px;
    }

    .step-indicator.current .step-title {
      color: var(--eva-colors-text-primary, #333);
      font-weight: var(--eva-fonts-weight-bold, 700);
    }

    .step-content {
      background: var(--eva-colors-surface-primary, #fff);
      border: 1px solid var(--eva-colors-border-primary, #e1e4e7);
      border-radius: 4px;
      padding: var(--eva-spacing-xl, 24px);
      margin-bottom: var(--eva-spacing-lg, 16px);
    }

    .step-header h2 {
      margin: 0 0 var(--eva-spacing-sm, 8px) 0;
      color: var(--eva-colors-text-primary, #333);
      font-size: var(--eva-fonts-size-xl, 1.5rem);
    }

    .step-description {
      margin: 0 0 var(--eva-spacing-lg, 16px) 0;
      color: var(--eva-colors-text-secondary, #666);
    }

    .navigation-buttons {
      display: flex;
      gap: var(--eva-spacing-md, 12px);
      justify-content: space-between;
      margin-top: var(--eva-spacing-lg, 16px);
    }

    .btn {
      padding: var(--eva-spacing-md, 12px) var(--eva-spacing-lg, 16px);
      font-size: var(--eva-fonts-size-base, 1rem);
      font-weight: var(--eva-fonts-weight-bold, 700);
      border-radius: 4px;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn:focus-visible {
      outline: 3px solid var(--eva-colors-focus, #0535d2);
      outline-offset: 2px;
    }

    .btn-primary {
      background: var(--eva-colors-primary, #26374a);
      color: var(--eva-colors-text-on-primary, #fff);
    }

    .btn-primary:hover:not(:disabled) {
      background: var(--eva-colors-primary-dark, #1a2633);
    }

    .btn-secondary {
      background: var(--eva-colors-surface-secondary, #f5f5f5);
      color: var(--eva-colors-text-primary, #333);
      border: 1px solid var(--eva-colors-border-primary, #e1e4e7);
    }

    .btn-secondary:hover:not(:disabled) {
      background: var(--eva-colors-surface-hover, #e8e8e8);
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .validation-errors {
      background: var(--eva-colors-error-light, #f8d7da);
      border: 1px solid var(--eva-colors-error, #d3080c);
      border-radius: 4px;
      padding: var(--eva-spacing-md, 12px);
      margin-bottom: var(--eva-spacing-lg, 16px);
      color: var(--eva-colors-error-dark, #721c24);
    }

    .validation-errors h3 {
      margin: 0 0 var(--eva-spacing-sm, 8px) 0;
      font-size: var(--eva-fonts-size-base, 1rem);
    }

    .validation-errors ul {
      margin: 0;
      padding-left: var(--eva-spacing-lg, 16px);
    }

    @media (max-width: 768px) {
      .progress-indicator {
        flex-direction: column;
        gap: var(--eva-spacing-md, 12px);
      }

      .progress-indicator::before {
        display: none;
      }

      .step-indicator {
        flex-direction: row;
        justify-content: flex-start;
        gap: var(--eva-spacing-md, 12px);
      }

      .step-title {
        text-align: left;
        max-width: none;
      }

      .navigation-buttons {
        flex-direction: column-reverse;
      }

      .btn {
        width: 100%;
      }
    }
  `;

  @property({ type: Array })
  steps: Step[] = [];

  @state()
  private currentStep: number = 0;

  @state()
  private formData: Record<string, unknown> = {};

  @state()
  private validationErrors: string[] = [];

  /**
   * Navigate to next step
   */
  public nextStep(): void {
    if (this.currentStep < this.steps.length - 1) {
      if (this.validateStep(this.currentStep)) {
        this.currentStep++;
        this.validationErrors = [];
        this.requestUpdate();
        this.emitEvent('gc-step-change', { 
          step: this.currentStep,
          direction: 'next'
        });
        this.announce(this.getMessage('stepChanged').replace('{step}', (this.currentStep + 1).toString()));
      }
    }
  }

  /**
   * Navigate to previous step
   */
  public previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.validationErrors = [];
      this.requestUpdate();
      this.emitEvent('gc-step-change', { 
        step: this.currentStep,
        direction: 'previous'
      });
      this.announce(this.getMessage('stepChanged').replace('{step}', (this.currentStep + 1).toString()));
    }
  }

  /**
   * Go to specific step
   */
  public goToStep(stepIndex: number): void {
    if (stepIndex >= 0 && stepIndex < this.steps.length) {
      this.currentStep = stepIndex;
      this.validationErrors = [];
      this.requestUpdate();
      this.emitEvent('gc-step-change', { 
        step: this.currentStep,
        direction: 'direct'
      });
    }
  }

  /**
   * Submit the form
   */
  public submitForm(): void {
    if (this.validateStep(this.currentStep)) {
      this.emitEvent('gc-form-submit', { 
        formData: this.formData 
      });
      this.announce(this.getMessage('formSubmitted'));
    }
  }

  /**
   * Validate current step
   */
  private validateStep(_stepIndex: number): boolean {
    // Basic validation - in real implementation, would validate based on step
    this.validationErrors = [];
    
    // Emit validation event to allow external validation
    const validationEvent = new CustomEvent('gc-step-validate', {
      detail: { step: _stepIndex, formData: this.formData },
      cancelable: true
    });
    
    this.dispatchEvent(validationEvent);
    
    return this.validationErrors.length === 0;
  }

  /**
   * Add validation error
   */
  public addValidationError(error: string): void {
    this.validationErrors = [...this.validationErrors, error];
    this.requestUpdate();
  }

  /**
   * Clear validation errors
   */
  public clearValidationErrors(): void {
    this.validationErrors = [];
    this.requestUpdate();
  }

  protected override render() {
    const currentStepData = this.steps[this.currentStep];
    const isFirstStep = this.currentStep === 0;
    const isLastStep = this.currentStep === this.steps.length - 1;

    return html`
      <div class="steps-container">
        <!-- Progress Indicator -->
        <div class="progress-indicator" role="navigation" aria-label="${this.getMessage('progressIndicator')}">
          ${this.steps.map((step, index) => {
            const isCurrent = index === this.currentStep;
            const isCompleted = index < this.currentStep;
            const classes = ['step-indicator'];
            if (isCurrent) classes.push('current');
            if (isCompleted) classes.push('completed');

            return html`
              <div class="${classes.join(' ')}">
                <div class="step-number" aria-label="${this.getMessage('stepNumber').replace('{number}', (index + 1).toString())}">
                  ${isCompleted ? '' : index + 1}
                </div>
                <div class="step-title">${step.title}</div>
              </div>
            `;
          })}
        </div>

        <!-- Validation Errors -->
        ${this.validationErrors.length > 0 ? html`
          <div class="validation-errors" role="alert" aria-live="assertive">
            <h3>${this.getMessage('validationErrors')}</h3>
            <ul>
              ${this.validationErrors.map(error => html`<li>${error}</li>`)}
            </ul>
          </div>
        ` : ''}

        <!-- Step Content -->
        ${currentStepData ? html`
          <div class="step-content">
            <div class="step-header">
              <h2>${currentStepData.title}</h2>
              ${currentStepData.description ? html`
                <p class="step-description">${currentStepData.description}</p>
              ` : ''}
            </div>

            <div class="step-fields">
              ${currentStepData.fields}
            </div>

            <!-- Navigation Buttons -->
            <div class="navigation-buttons">
              <button
                class="btn btn-secondary"
                @click="${this.previousStep}"
                ?disabled="${isFirstStep}"
              >
                ${this.getMessage('previous')}
              </button>

              ${isLastStep ? html`
                <button
                  class="btn btn-primary"
                  @click="${this.submitForm}"
                >
                  ${this.getMessage('submit')}
                </button>
              ` : html`
                <button
                  class="btn btn-primary"
                  @click="${this.nextStep}"
                >
                  ${this.getMessage('next')}
                </button>
              `}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gc-steps-form': GCStepsForm;
  }
}

registerMessages('gc-steps-form', {
  'en-CA': {
    progressIndicator: 'Form progress',
    stepNumber: 'Step {number}',
    stepChanged: 'Now on step {step}',
    validationErrors: 'Please correct the following errors:',
    previous: 'Previous',
    next: 'Next',
    submit: 'Submit',
    formSubmitted: 'Form submitted successfully'
  },
  'fr-CA': {
    progressIndicator: 'Progrès du formulaire',
    stepNumber: 'Étape {number}',
    stepChanged: 'Maintenant à l\'étape {step}',
    validationErrors: 'Veuillez corriger les erreurs suivantes :',
    previous: 'Précédent',
    next: 'Suivant',
    submit: 'Soumettre',
    formSubmitted: 'Formulaire soumis avec succès'
  }
});
