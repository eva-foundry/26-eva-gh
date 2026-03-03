import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

interface Step {
  label: string;
  description?: string;
  status?: 'completed' | 'current' | 'pending';
}

@customElement('gc-stepper')
export class GCStepper extends EVAElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--eva-fonts-body);
    }

    .stepper {
      display: flex;
      align-items: flex-start;
      position: relative;
      padding: var(--eva-spacing-lg, 1.5rem) 0;
    }

    .step {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: relative;
    }

    .step-indicator {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--eva-colors-background-light, #f5f5f5);
      border: 2px solid var(--eva-colors-border, #ccc);
      color: var(--eva-colors-text-muted, #666);
      font-weight: 600;
      font-size: var(--eva-font-size-md, 1rem);
      transition: all 0.3s;
      z-index: 2;
      position: relative;
    }

    .step.completed .step-indicator {
      background: var(--eva-colors-success, #2e7d32);
      border-color: var(--eva-colors-success, #2e7d32);
      color: var(--eva-colors-white, #fff);
    }

    .step.current .step-indicator {
      background: var(--eva-colors-primary, #26374a);
      border-color: var(--eva-colors-primary, #26374a);
      color: var(--eva-colors-white, #fff);
      box-shadow: 0 0 0 4px rgba(38, 55, 74, 0.1);
    }

    .step-content {
      margin-top: var(--eva-spacing-sm, 0.75rem);
    }

    .step-label {
      font-weight: 600;
      color: var(--eva-colors-text, #333);
      margin-bottom: var(--eva-spacing-2xs, 0.25rem);
    }

    .step.pending .step-label {
      color: var(--eva-colors-text-muted, #666);
    }

    .step-description {
      font-size: var(--eva-font-size-sm, 0.875rem);
      color: var(--eva-colors-text-muted, #666);
    }

    .step-connector {
      position: absolute;
      top: 20px;
      left: 50%;
      right: -50%;
      height: 2px;
      background: var(--eva-colors-border, #ccc);
      z-index: 1;
    }

    .step:last-child .step-connector {
      display: none;
    }

    .step.completed .step-connector {
      background: var(--eva-colors-success, #2e7d32);
    }

    .check-icon {
      width: 20px;
      height: 20px;
    }

    @media (max-width: 768px) {
      .stepper {
        flex-direction: column;
        gap: var(--eva-spacing-lg, 1.5rem);
      }

      .step {
        flex-direction: row;
        text-align: left;
        width: 100%;
      }

      .step-content {
        margin-top: 0;
        margin-left: var(--eva-spacing-md, 1rem);
        flex: 1;
      }

      .step-connector {
        top: 60px;
        left: 20px;
        right: auto;
        width: 2px;
        height: calc(100% + var(--eva-spacing-lg, 1.5rem));
      }

      .step:last-child .step-connector {
        display: block;
      }
    }

    @media print {
      .stepper {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .step-indicator {
        width: 30px;
        height: 30px;
        font-size: 0.875rem;
      }

      .step-connector {
        display: none;
      }
    }
  `;

  @property({ type: Array })
  steps: Step[] = [];

  @property({ type: Number })
  currentStep = 0;

  protected override render() {
    const hasSteps = this.steps.length > 0;
    const defaultSteps: Step[] = hasSteps ? this.steps : [
      { label: this.getMessage('step1'), status: 'completed' },
      { label: this.getMessage('step2'), status: 'current' },
      { label: this.getMessage('step3'), status: 'pending' }
    ];

    return html`
      <div class="stepper" role="list" aria-label="${this.getMessage('stepperLabel')}">
        ${defaultSteps.map((step, index) => {
          let status = step.status;
          if (!status) {
            if (index < this.currentStep) {
              status = 'completed';
            } else if (index === this.currentStep) {
              status = 'current';
            } else {
              status = 'pending';
            }
          }

          const stepNumber = index + 1;
          const totalSteps = defaultSteps.length;

          return html`
            <div 
              class="step ${status}" 
              role="listitem"
              aria-current="${status === 'current' ? 'step' : 'false'}"
            >
              <div 
                class="step-indicator"
                aria-label="${status === 'completed' 
                  ? this.getMessage('completedStep').replace('{step}', step.label) 
                  : status === 'current'
                  ? this.getMessage('currentStep').replace('{step}', step.label)
                  : this.getMessage('pendingStep').replace('{step}', step.label)}"
              >
                ${status === 'completed'
                  ? html`
                      <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    `
                  : stepNumber
                }
              </div>

              <div class="step-content">
                <div class="step-label">${step.label}</div>
                ${step.description
                  ? html`<div class="step-description">${step.description}</div>`
                  : null
                }
              </div>

              ${index < totalSteps - 1
                ? html`<div class="step-connector" aria-hidden="true"></div>`
                : null
              }
            </div>
          `;
        })}
      </div>
    `;
  }
}

registerMessages('gc-stepper', {
  'en-CA': {
    stepperLabel: 'Process steps',
    step1: 'Step 1',
    step2: 'Step 2',
    step3: 'Step 3',
    completedStep: 'Completed: {step}',
    currentStep: 'Current step: {step}',
    pendingStep: 'Upcoming: {step}'
  },
  'fr-CA': {
    stepperLabel: 'Étapes du processus',
    step1: 'Étape 1',
    step2: 'Étape 2',
    step3: 'Étape 3',
    completedStep: 'Terminée : {step}',
    currentStep: 'Étape actuelle : {step}',
    pendingStep: 'À venir : {step}'
  }
});
