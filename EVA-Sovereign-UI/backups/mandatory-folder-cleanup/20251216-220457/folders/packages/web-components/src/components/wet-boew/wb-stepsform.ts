import { html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

// Register bilingual messages for wb-stepsform
registerMessages('wb-stepsform', {
  'en-CA': {
    stepOf: 'Step {current} of {total}',
    next: 'Next Step',
    previous: 'Previous Step',
    finish: 'Complete Form',
    stepComplete: 'Step {step} complete',
    jumpToStep: 'Go to Step {step}',
    currentStep: 'Current step',
    completedStep: 'Completed step',
    futureStep: 'Future step',
    progressSaved: 'Progress saved',
    progressRestored: 'Progress restored from previous session'
  },
  'fr-CA': {
    stepOf: 'Étape {current} de {total}',
    next: 'Étape suivante',
    previous: 'Étape précédente',
    finish: 'Soumettre le formulaire',
    stepComplete: 'Étape {step} complétée',
    jumpToStep: 'Aller à l\'étape {step}',
    currentStep: 'Étape actuelle',
    completedStep: 'Étape complétée',
    futureStep: 'Étape future',
    progressSaved: 'Progrès sauvegardé',
    progressRestored: 'Progrès restauré de la session précédente'
  }
});

/**
 * wb-stepsform - Multi-Step Wizard Forms
 *
 * WET-BOEW 4.x plugin reimplemented as modern Lit 3.x Web Component.
 * Breaks long forms into multiple steps with progress indicator.
 *
 * @element wb-stepsform
 *
 * @fires wb-stepsform-next - Fired when moving to next step
 * @fires wb-stepsform-previous - Fired when moving to previous step
 * @fires wb-stepsform-complete - Fired when wizard is completed
 *
 * @slot - Form steps (each wrapped in a container with data-step attribute)
 *
 * @csspart progress - Progress indicator container
 * @csspart step-indicator - Individual step indicator
 * @csspart step-label - Step label text
 * @csspart navigation - Navigation buttons container
 *
 * @example
 * ```html
 * <wb-stepsform
 *   current-step="1"
 *   total-steps="3"
 *   save-progress
 *   step-labels='["Personal Info", "Address", "Review"]'>
 *   <div data-step="1">
 *     <label>Name: <input type="text" name="name" required /></label>
 *   </div>
 *   <div data-step="2">
 *     <label>Address: <input type="text" name="address" required /></label>
 *   </div>
 *   <div data-step="3">
 *     <p>Review your information...</p>
 *   </div>
 * </wb-stepsform>
 * ```
 *
 * @reference https://wet-boew.github.io/wet-boew/demos/stepsform/stepsform-en.html
 */
@customElement('wb-stepsform')
export class WBStepsForm extends EVAElement {
  /** Current active step (1-indexed) */
  @property({ type: Number, attribute: 'current-step' })
  currentStep = 1;

  /** Total number of steps */
  @property({ type: Number, attribute: 'total-steps' })
  totalSteps = 3;

  /** Save progress to localStorage */
  @property({ type: Boolean, attribute: 'save-progress' })
  saveProgress = false;

  /** Labels for each step (array of strings) */
  @property({ type: Array, attribute: 'step-labels' })
  stepLabels: string[] = [];

  /** Internal state: Completed steps (for jump navigation) */
  @state()
  private completedSteps: Set<number> = new Set();

  /** Storage key for saving progress */
  private readonly STORAGE_KEY = 'wb-stepsform-progress';

  static override styles = css`
    :host {
      display: block;
      font-family: var(--eva-typography-font-family-body, 'Noto Sans', sans-serif);
    }

    .progress-indicator {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--eva-spacing-spacing-6, 2rem);
      padding: var(--eva-spacing-spacing-4, 1rem);
      background: var(--eva-colors-gc-background-light, #f5f5f5);
      border-radius: var(--eva-border-radius-md, 8px);
    }

    .step-indicator {
      flex: 1;
      text-align: center;
      position: relative;
      cursor: pointer;
    }

    .step-indicator:not(:last-child)::after {
      content: '';
      position: absolute;
      top: 15px;
      right: -50%;
      width: 100%;
      height: 2px;
      background: var(--eva-colors-neutral-300, #ccc);
      z-index: 0;
    }

    .step-indicator.completed:not(:last-child)::after {
      background: var(--eva-colors-gc-link-blue, #284162);
    }

    .step-number {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--eva-colors-neutral-300, #ccc);
      color: var(--eva-colors-neutral-700, #333);
      font-weight: 700;
      position: relative;
      z-index: 1;
      transition: all 0.3s ease;
    }

    .step-indicator.active .step-number {
      background: var(--eva-colors-gc-link-blue, #284162);
      color: var(--eva-colors-white, #fff);
      transform: scale(1.2);
    }

    .step-indicator.completed .step-number {
      background: var(--eva-colors-gc-link-blue, #284162);
      color: var(--eva-colors-white, #fff);
    }

    .step-indicator.completed .step-number::before {
      content: '✓';
    }

    .step-indicator.future .step-number {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .step-label {
      display: block;
      margin-top: var(--eva-spacing-spacing-2, 0.5rem);
      font-size: 0.875rem;
      color: var(--eva-colors-neutral-600, #666);
    }

    .step-indicator.active .step-label {
      color: var(--eva-colors-gc-link-blue, #284162);
      font-weight: 700;
    }

    .step-content {
      min-height: 200px;
      padding: var(--eva-spacing-spacing-4, 1rem);
      border: 1px solid var(--eva-colors-neutral-300, #ccc);
      border-radius: var(--eva-border-radius-md, 8px);
      margin-bottom: var(--eva-spacing-spacing-4, 1rem);
    }

    .step-content ::slotted([data-step]) {
      display: none;
    }

    .step-content ::slotted([data-step].active) {
      display: block;
    }

    .navigation {
      display: flex;
      justify-content: space-between;
      gap: var(--eva-spacing-spacing-4, 1rem);
    }

    .button {
      padding: var(--eva-spacing-spacing-3, 0.75rem) var(--eva-spacing-spacing-5, 1.5rem);
      border: none;
      border-radius: var(--eva-border-radius-md, 8px);
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .button-previous {
      background: var(--eva-colors-neutral-200, #e0e0e0);
      color: var(--eva-colors-neutral-700, #333);
    }

    .button-previous:hover:not(:disabled) {
      background: var(--eva-colors-neutral-300, #ccc);
    }

    .button-next {
      background: var(--eva-colors-gc-link-blue, #284162);
      color: var(--eva-colors-white, #fff);
    }

    .button-next:hover:not(:disabled) {
      background: var(--eva-colors-gc-link-blue-hover, #1f3350);
    }

    .button-finish {
      background: var(--eva-colors-success, #278400);
      color: var(--eva-colors-white, #fff);
    }

    .button-finish:hover:not(:disabled) {
      background: var(--eva-colors-success-dark, #1e6300);
    }

    .sr-status {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
      .progress-indicator {
        flex-direction: column;
        gap: var(--eva-spacing-spacing-3, 0.75rem);
      }

      .step-indicator:not(:last-child)::after {
        display: none;
      }

      .navigation {
        flex-direction: column;
      }

      .button {
        width: 100%;
      }
    }
  `;

  override connectedCallback(): void {
    super.connectedCallback();
    
    // Restore progress if enabled
    if (this.saveProgress) {
      this.restoreState();
    }

    // Setup keyboard shortcuts
    this.addEventListener('keydown', this.handleKeyboard);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.handleKeyboard);
  }

  override firstUpdated(): void {
    // Show current step
    this.updateStepVisibility();

    // Auto-save on step change if enabled
    if (this.saveProgress) {
      this.addEventListener('wb-stepsform-next', () => this.saveState());
      this.addEventListener('wb-stepsform-previous', () => this.saveState());
    }
  }

  override updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('currentStep')) {
      this.updateStepVisibility();
    }
  }

  /**
   * Move to next step (validates current step first)
   */
  nextStep(): void {
    if (this.currentStep >= this.totalSteps) return;

    // Validate current step before advancing
    if (!this.validateCurrentStep()) {
      this.announce(this.getMessage('wb-stepsform', 'stepComplete')
        .replace('{step}', this.currentStep.toString()), 'assertive');
      return;
    }

    const from = this.currentStep;
    const to = this.currentStep + 1;

    // Mark current step as completed
    this.completedSteps.add(from);

    this.currentStep = to;

    // Emit event
    this.emitEvent('wb-stepsform-next', { from, to });

    // Announce to screen readers
    this.announce(
      this.getMessage('wb-stepsform', 'stepOf')
        .replace('{current}', to.toString())
        .replace('{total}', this.totalSteps.toString()),
      'polite'
    );
  }

  /**
   * Move to previous step
   */
  previousStep(): void {
    if (this.currentStep <= 1) return;

    const from = this.currentStep;
    const to = this.currentStep - 1;

    this.currentStep = to;

    // Emit event
    this.emitEvent('wb-stepsform-previous', { from, to });

    // Announce to screen readers
    this.announce(
      this.getMessage('wb-stepsform', 'stepOf')
        .replace('{current}', to.toString())
        .replace('{total}', this.totalSteps.toString()),
      'polite'
    );
  }

  /**
   * Jump to specific step (only if already completed or current)
   */
  goToStep(stepNumber: number): void {
    if (stepNumber < 1 || stepNumber > this.totalSteps) return;
    if (stepNumber > this.currentStep && !this.completedSteps.has(stepNumber)) {
      // Cannot jump to future steps
      return;
    }

    const from = this.currentStep;
    this.currentStep = stepNumber;

    // Emit appropriate event
    const eventName = stepNumber > from ? 'wb-stepsform-next' : 'wb-stepsform-previous';
    this.emitEvent(eventName, { from, to: stepNumber });

    // Announce to screen readers
    this.announce(
      this.getMessage('wb-stepsform', 'jumpToStep')
        .replace('{step}', stepNumber.toString()),
      'polite'
    );
  }

  /**
   * Complete the wizard (called when user finishes last step)
   */
  completeWizard(): void {
    // Validate final step
    if (!this.validateCurrentStep()) {
      return;
    }

    // Collect all form data
    const formData = this.collectFormData();

    // Emit completion event
    this.emitEvent('wb-stepsform-complete', { data: formData });

    // Clear saved progress
    if (this.saveProgress) {
      localStorage.removeItem(this.STORAGE_KEY);
    }

    // Announce completion
    this.announce(this.getMessage('wb-stepsform', 'finish'), 'assertive');
  }

  /**
   * Save current progress to localStorage
   */
  saveState(): void {
    if (!this.saveProgress) return;

    const state = {
      currentStep: this.currentStep,
      completedSteps: Array.from(this.completedSteps),
      formData: this.collectFormData()
    };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
    this.announce(this.getMessage('wb-stepsform', 'progressSaved'), 'polite');
  }

  /**
   * Restore progress from localStorage
   */
  restoreState(): void {
    if (!this.saveProgress) return;

    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (!saved) return;

    try {
      const state = JSON.parse(saved);
      this.currentStep = state.currentStep || 1;
      this.completedSteps = new Set(state.completedSteps || []);

      // Restore form data if available
      if (state.formData) {
        this.restoreFormData(state.formData);
      }

      this.announce(this.getMessage('wb-stepsform', 'progressRestored'), 'polite');
    } catch (e) {
      console.error('[wb-stepsform] Failed to restore state:', e);
    }
  }

  /**
   * Validate current step (basic required field check)
   */
  private validateCurrentStep(): boolean {
    const currentStepElement = this.querySelector(`[data-step="${this.currentStep}"]`);
    if (!currentStepElement) return true;

    const requiredFields = currentStepElement.querySelectorAll<HTMLInputElement>('[required]');
    let valid = true;

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        valid = false;
        field.setAttribute('aria-invalid', 'true');
      } else {
        field.removeAttribute('aria-invalid');
      }
    });

    return valid;
  }

  /**
   * Update visibility of step containers
   */
  private updateStepVisibility(): void {
    const allSteps = this.querySelectorAll('[data-step]');
    allSteps.forEach((step, index) => {
      const stepNumber = parseInt(step.getAttribute('data-step') || '0', 10);
      if (stepNumber === this.currentStep) {
        step.classList.add('active');
        step.removeAttribute('hidden');
      } else {
        step.classList.remove('active');
        step.setAttribute('hidden', '');
      }
    });
  }

  /**
   * Collect form data from all steps
   */
  private collectFormData(): Record<string, any> {
    const formData: Record<string, any> = {};
    const inputs = this.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      'input, textarea, select'
    );

    inputs.forEach(input => {
      if (input.name) {
        formData[input.name] = input.value;
      }
    });

    return formData;
  }

  /**
   * Restore form data from saved state
   */
  private restoreFormData(data: Record<string, any>): void {
    Object.entries(data).forEach(([name, value]) => {
      const input = this.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
        `[name="${name}"]`
      );
      if (input) {
        input.value = value;
      }
    });
  }

  /**
   * Handle keyboard shortcuts (Ctrl+Left/Right for Prev/Next)
   */
  private handleKeyboard = (e: KeyboardEvent): void => {
    if (!e.ctrlKey) return;

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.previousStep();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.nextStep();
    }
  };

  /**
   * Determine CSS class for step indicator
   */
  private getStepClass(stepNumber: number): string {
    if (stepNumber === this.currentStep) return 'active';
    if (this.completedSteps.has(stepNumber)) return 'completed';
    return 'future';
  }

  /**
   * Get ARIA label for step indicator
   */
  private getStepAriaLabel(stepNumber: number): string {
    if (stepNumber === this.currentStep) {
      return this.getMessage('wb-stepsform', 'currentStep');
    }
    if (this.completedSteps.has(stepNumber)) {
      return this.getMessage('wb-stepsform', 'completedStep');
    }
    return this.getMessage('wb-stepsform', 'futureStep');
  }

  override render() {
    const isLastStep = this.currentStep === this.totalSteps;

    return html`
      <!-- Screen reader status -->
      <div class="sr-status" role="status" aria-live="polite" aria-atomic="true">
        ${this.getMessage('wb-stepsform', 'stepOf')
          .replace('{current}', this.currentStep.toString())
          .replace('{total}', this.totalSteps.toString())}
      </div>

      <!-- Progress Indicator -->
      <div class="progress-indicator" part="progress" role="navigation" aria-label="Form progress">
        ${Array.from({ length: this.totalSteps }, (_, i) => i + 1).map(stepNumber => html`
          <div
            class="step-indicator ${this.getStepClass(stepNumber)}"
            part="step-indicator"
            @click=${() => this.goToStep(stepNumber)}
            role="button"
            tabindex="${this.completedSteps.has(stepNumber) || stepNumber === this.currentStep ? '0' : '-1'}"
            aria-label="${this.getStepAriaLabel(stepNumber)} ${stepNumber}"
            aria-current="${stepNumber === this.currentStep ? 'step' : 'false'}"
          >
            <span class="step-number" aria-hidden="true">
              ${this.completedSteps.has(stepNumber) ? '' : stepNumber}
            </span>
            <span class="step-label" part="step-label">
              ${this.stepLabels[stepNumber - 1] || `Step ${stepNumber}`}
            </span>
          </div>
        `)}
      </div>

      <!-- Step Content -->
      <div class="step-content">
        <slot></slot>
      </div>

      <!-- Navigation Buttons -->
      <div class="navigation" part="navigation">
        <button
          class="button button-previous"
          @click=${this.previousStep}
          ?disabled=${this.currentStep === 1}
          aria-label="${this.getMessage('wb-stepsform', 'previous')}"
        >
          ${this.getMessage('wb-stepsform', 'previous')}
        </button>

        ${isLastStep ? html`
          <button
            class="button button-finish"
            @click=${this.completeWizard}
            aria-label="${this.getMessage('wb-stepsform', 'finish')}"
          >
            ${this.getMessage('wb-stepsform', 'finish')}
          </button>
        ` : html`
          <button
            class="button button-next"
            @click=${this.nextStep}
            aria-label="${this.getMessage('wb-stepsform', 'next')}"
          >
            ${this.getMessage('wb-stepsform', 'next')}
          </button>
        `}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-stepsform': WBStepsForm;
  }
}
