import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

interface FieldFlowStep {
  id: string;
  question: string;
  options: Array<{
    value: string;
    label: string;
    next?: string; // Next step ID or 'result'
    result?: string; // Final result message
  }>;
}

/**
 * WB-FieldFlow - Form Wizard & Decision Tree
 * Multi-step form wizard with conditional navigation
 */
@customElement('wb-fieldflow')
export class WBFieldFlow extends EVAElement {
  static override styles = css`
    :host {
      display: block;
    }

    .wizard {
      max-width: 600px;
      margin: 0 auto;
    }

    .progress {
      display: flex;
      gap: var(--eva-spacing-xs, 0.25rem);
      margin-bottom: var(--eva-spacing-lg, 1.5rem);
    }

    .progress-step {
      flex: 1;
      height: 4px;
      background: var(--eva-colors-background-default, #e5e5e5);
      border-radius: 2px;
    }

    .progress-step.active,
    .progress-step.complete {
      background: var(--eva-colors-primary, #26374a);
    }

    .step {
      background: white;
      padding: var(--eva-spacing-lg, 1.5rem);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      border-radius: var(--eva-border-radius-md, 4px);
    }

    .question {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: var(--eva-spacing-md, 1rem);
      color: var(--eva-colors-text-primary, #333333);
    }

    .options {
      display: flex;
      flex-direction: column;
      gap: var(--eva-spacing-sm, 0.5rem);
      margin-bottom: var(--eva-spacing-md, 1rem);
    }

    .option {
      display: flex;
      align-items: center;
      gap: var(--eva-spacing-sm, 0.5rem);
    }

    .option input[type="radio"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .option label {
      cursor: pointer;
      flex: 1;
    }

    .controls {
      display: flex;
      justify-content: space-between;
      gap: var(--eva-spacing-sm, 0.5rem);
    }

    button {
      padding: var(--eva-spacing-sm, 0.5rem) var(--eva-spacing-md, 1rem);
      background: var(--eva-colors-primary, #26374a);
      color: white;
      border: none;
      border-radius: var(--eva-border-radius-sm, 3px);
      cursor: pointer;
      font-size: 1rem;
    }

    button:hover {
      background: var(--eva-colors-primary-hover, #1c2938);
    }

    button:focus {
      outline: 2px solid var(--eva-colors-focus, #303fc1);
      outline-offset: 2px;
    }

    button:disabled {
      background: var(--eva-colors-background-disabled, #cccccc);
      cursor: not-allowed;
    }

    button.secondary {
      background: transparent;
      color: var(--eva-colors-primary, #26374a);
      border: 1px solid var(--eva-colors-primary, #26374a);
    }

    button.secondary:hover {
      background: var(--eva-colors-background-hover, #f5f5f5);
    }

    .result {
      padding: var(--eva-spacing-lg, 1.5rem);
      background: var(--eva-colors-success-light, #d4edda);
      border: 1px solid var(--eva-colors-success, #28a745);
      border-radius: var(--eva-border-radius-md, 4px);
      margin-top: var(--eva-spacing-md, 1rem);
    }

    .result-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: var(--eva-spacing-sm, 0.5rem);
      color: var(--eva-colors-success-dark, #155724);
    }

    .result-message {
      color: var(--eva-colors-text-primary, #333333);
    }
  `;

  @property({ type: Array })
  steps: FieldFlowStep[] = [];

  @state()
  private currentStepId = '';

  @state()
  private selectedValue = '';

  @state()
  private history: string[] = [];

  @state()
  private resultMessage = '';

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-fieldflow', {
      'en-CA': {
        next: 'Next',
        back: 'Back',
        reset: 'Start Over',
        result: 'Result',
        stepOf: 'Step {current} of {total}',
        selectOption: 'Please select an option',
        completed: 'You have completed the wizard'
      },
      'fr-CA': {
        next: 'Suivant',
        back: 'Retour',
        reset: 'Recommencer',
        result: 'Résultat',
        stepOf: 'Étape {current} de {total}',
        selectOption: 'Veuillez sélectionner une option',
        completed: 'Vous avez terminé l\'assistant'
      }
    });

    if (this.steps.length > 0 && !this.currentStepId) {
      this.currentStepId = this.steps[0].id;
    }
  }

  private handleOptionChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.selectedValue = target.value;
  }

  private handleNext(): void {
    if (!this.selectedValue) {
      this.announce(this.getMessage('wb-fieldflow', 'selectOption'));
      return;
    }

    const currentStep = this.steps.find(s => s.id === this.currentStepId);
    if (!currentStep) return;

    const selectedOption = currentStep.options.find(o => o.value === this.selectedValue);
    if (!selectedOption) return;

    this.history.push(this.currentStepId);

    if (selectedOption.result) {
      this.resultMessage = selectedOption.result;
      this.emitEvent('wb-fieldflow-complete', { result: selectedOption.result });
      this.announce(this.getMessage('wb-fieldflow', 'completed'));
    } else if (selectedOption.next) {
      this.currentStepId = selectedOption.next;
      this.selectedValue = '';
      this.emitEvent('wb-fieldflow-step', { stepId: this.currentStepId });
      const stepIndex = this.steps.findIndex(s => s.id === this.currentStepId) + 1;
      this.announce(`Step ${stepIndex} of ${this.steps.length}`);
    }
  }

  private handleBack(): void {
    if (this.history.length > 0) {
      const previousStepId = this.history.pop()!;
      this.currentStepId = previousStepId;
      this.selectedValue = '';
      this.emitEvent('wb-fieldflow-back', { stepId: this.currentStepId });
    }
  }

  private handleReset(): void {
    this.currentStepId = this.steps[0]?.id || '';
    this.selectedValue = '';
    this.history = [];
    this.resultMessage = '';
    this.emitEvent('wb-fieldflow-reset', {});
    this.announce('Wizard reset to beginning');
  }

  private renderProgress(): unknown {
    if (this.resultMessage) return '';

    const currentIndex = this.steps.findIndex(s => s.id === this.currentStepId);
    
    return html`
      <div class="progress" role="progressbar" aria-valuenow="${currentIndex + 1}" aria-valuemin="1" aria-valuemax="${this.steps.length}">
        ${this.steps.map((_, index) => html`
          <div class="progress-step ${index <= currentIndex ? 'active' : ''}"></div>
        `)}
      </div>
    `;
  }

  override render() {
    if (this.resultMessage) {
      return html`
        <div class="wizard">
          <div class="result" role="status">
            <div class="result-title">${this.getMessage('wb-fieldflow', 'result')}</div>
            <div class="result-message">${this.resultMessage}</div>
            <button @click="${this.handleReset}" style="margin-top: 1rem;">
              ${this.getMessage('wb-fieldflow', 'reset')}
            </button>
          </div>
        </div>
      `;
    }

    const currentStep = this.steps.find(s => s.id === this.currentStepId);
    if (!currentStep) return html`<div>No steps configured</div>`;

    const currentIndex = this.steps.findIndex(s => s.id === this.currentStepId);

    return html`
      <div class="wizard">
        ${this.renderProgress()}
        
        <div class="step" role="form">
          <div class="question">
            ${currentStep.question}
          </div>

          <div class="options" role="radiogroup">
            ${currentStep.options.map(option => html`
              <div class="option">
                <input
                  type="radio"
                  name="fieldflow-option"
                  id="option-${option.value}"
                  value="${option.value}"
                  .checked="${this.selectedValue === option.value}"
                  @change="${this.handleOptionChange}"
                />
                <label for="option-${option.value}">${option.label}</label>
              </div>
            `)}
          </div>

          <div class="controls">
            <button
              class="secondary"
              @click="${this.handleBack}"
              ?disabled="${this.history.length === 0}"
            >
              ${this.getMessage('wb-fieldflow', 'back')}
            </button>
            <button
              @click="${this.handleNext}"
              ?disabled="${!this.selectedValue}"
            >
              ${this.getMessage('wb-fieldflow', 'next')}
            </button>
          </div>
        </div>

        <div style="margin-top: 1rem; text-align: center; color: #666;">
          Step ${currentIndex + 1} of ${this.steps.length}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-fieldflow': WBFieldFlow;
  }
}
