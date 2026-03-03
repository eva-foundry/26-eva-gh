import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

interface SubwayStep {
  label: string;
  href?: string;
  status: 'completed' | 'current' | 'future';
}

/**
 * gc-subway-nav - Steps Navigation Pattern (Subway Pattern)
 * 
 * Multi-step process navigation with visual progress indicator.
 * Shows completed, current, and future steps with connecting lines.
 * 
 * @element gc-subway-nav
 * 
 * @fires gc-subway-step-click - Fired when a step is clicked
 * 
 * @example
 * ```html
 * <gc-subway-nav
 *   .steps="${[
 *     { label: 'Gather documents', status: 'completed' },
 *     { label: 'Fill out form', status: 'current' },
 *     { label: 'Submit', status: 'future' }
 *   ]}"
 *   allowNavigation>
 * </gc-subway-nav>
 * ```
 */
@customElement('gc-subway-nav')
export class GCSubwayNav extends EVAElement {
  static override styles = css`
      :host {
        display: block;
        margin: var(--eva-spacing-xl, 2rem) 0;
      }

      .subway-container {
        position: relative;
      }

      .subway-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0;
      }

      .subway-step {
        position: relative;
        display: flex;
        align-items: flex-start;
        gap: var(--eva-spacing-md, 1rem);
        padding: var(--eva-spacing-md, 1rem) 0;
        min-height: 60px;
      }

      .subway-step:not(:last-child)::before {
        content: '';
        position: absolute;
        left: 19px;
        top: 48px;
        width: 2px;
        height: calc(100% - 8px);
        background: var(--eva-colors-border, #ddd);
      }

      .step-marker {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: var(--eva-font-weight-bold, 700);
        font-size: var(--eva-font-size-base, 1rem);
        position: relative;
        z-index: 1;
        border: 3px solid;
        background: white;
      }

      .step-marker.completed {
        background: var(--eva-colors-success, #4CAF50);
        border-color: var(--eva-colors-success, #4CAF50);
        color: white;
      }

      .step-marker.current {
        background: var(--eva-colors-primary, #2572b4);
        border-color: var(--eva-colors-primary, #2572b4);
        color: white;
      }

      .step-marker.future {
        background: white;
        border-color: var(--eva-colors-border, #ddd);
        color: var(--eva-colors-text-disabled, #999);
      }

      .step-content {
        flex: 1;
        padding-top: 8px;
      }

      .step-label {
        font-size: var(--eva-font-size-lg, 1.25rem);
        font-weight: var(--eva-font-weight-medium, 500);
        margin: 0;
        line-height: 1.4;
      }

      .step-label.completed {
        color: var(--eva-colors-text-primary, #333);
      }

      .step-label.current {
        color: var(--eva-colors-primary, #2572b4);
        font-weight: var(--eva-font-weight-bold, 700);
      }

      .step-label.future {
        color: var(--eva-colors-text-disabled, #999);
      }

      .step-link {
        color: inherit;
        text-decoration: none;
        display: block;
      }

      .step-link:hover .step-label,
      .step-link:focus .step-label {
        text-decoration: underline;
      }

      .step-link:focus-visible {
        outline: 3px solid var(--eva-colors-focus, #4CAF50);
        outline-offset: 2px;
        border-radius: var(--eva-border-radius-sm, 4px);
      }

      .progress-text {
        font-size: var(--eva-font-size-sm, 0.875rem);
        color: var(--eva-colors-text-secondary, #666);
        margin-top: var(--eva-spacing-xs, 0.25rem);
      }

      .checkmark {
        font-size: 1.5rem;
        line-height: 1;
      }

      /* Responsive: horizontal layout on mobile (optional) */
      @media (max-width: 576px) {
        .step-label {
          font-size: var(--eva-font-size-base, 1rem);
        }

        .step-marker {
          width: 36px;
          height: 36px;
          font-size: var(--eva-font-size-sm, 0.875rem);
        }

        .subway-step:not(:last-child)::before {
          left: 17px;
          top: 44px;
        }
      }
    `;

  /**
   * Array of steps in the process
   */
  @property({ type: Array })
  steps: SubwayStep[] = [];

  /**
   * Current step number (1-indexed)
   */
  @property({ type: Number })
  currentStep: number = 1;

  /**
   * Allow clicking to navigate to different steps
   */
  @property({ type: Boolean })
  allowNavigation: boolean = false;

  @state()
  private totalSteps: number = 0;

  protected override updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('steps')) {
      this.totalSteps = this.steps.length;
    }
  }

  private handleStepClick(event: MouseEvent, index: number, step: SubwayStep): void {
    if (!this.allowNavigation || !step.href) {
      event.preventDefault();
    }

    this.currentStep = index + 1;
    this.emitEvent('gc-subway-step-click', {
      step: index + 1,
      label: step.label,
      status: step.status
    });

    const stepMsg = this.getMessage('stepChanged').replace('{step}', String(index + 1)).replace('{total}', String(this.totalSteps));
    this.announce(stepMsg);
  }

  protected override render() {
    return html`
      <nav aria-label="${this.getMessage('stepsNavigation')}" role="navigation">
        <ol class="subway-list">
          ${this.steps.map((step, index) => {
            const isCurrent = step.status === 'current';
            const stepNumber = index + 1;

            return html`
              <li class="subway-step">
                <div class="step-marker ${step.status}">
                  ${step.status === 'completed' 
                    ? html`<span class="checkmark" aria-hidden="true">✓</span>`
                    : html`<span>${stepNumber}</span>`
                  }
                </div>
                <div class="step-content">
                  ${this.allowNavigation && step.href ? html`
                    <a 
                      href="${step.href}"
                      class="step-link"
                      aria-current="${isCurrent ? 'step' : 'false'}"
                      @click="${(e: MouseEvent) => this.handleStepClick(e, index, step)}"
                    >
                      <div class="step-label ${step.status}">${step.label}</div>
                    </a>
                  ` : html`
                    <div 
                      class="step-label ${step.status}"
                      aria-current="${isCurrent ? 'step' : 'false'}"
                    >
                      ${step.label}
                    </div>
                  `}
                  ${isCurrent ? html`
                    <div class="progress-text" aria-live="polite">
                      ${this.getMessage('stepProgress').replace('{current}', String(stepNumber)).replace('{total}', String(this.totalSteps))}
                    </div>
                  ` : ''}
                </div>
              </li>
            `;
          })}
        </ol>
      </nav>
    `;
  }
}

// Register i18n messages
registerMessages('gc-subway-nav', {
  'en-CA': {
    stepsNavigation: 'Steps navigation',
    stepProgress: 'Step {current} of {total}',
    stepChanged: 'Now on step {step} of {total}',
    completed: 'Completed',
    current: 'Current step',
    future: 'Future step'
  },
  'fr-CA': {
    stepsNavigation: 'Navigation par étapes',
    stepProgress: 'Étape {current} de {total}',
    stepChanged: 'Maintenant à l\'étape {step} de {total}',
    completed: 'Terminé',
    current: 'Étape actuelle',
    future: 'Étape future'
  }
});

declare global {
  interface HTMLElementTagNameMap {
    'gc-subway-nav': GCSubwayNav;
  }
}
