import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { EVAElement } from '../EVAElement';
import { registerMessages } from '../../utils/i18n';

// Register translations
registerMessages('gc-report-problem', {
  'en-CA': {
    'reportProblem.heading': 'Report a problem on this page',
    'reportProblem.intro': 'Please select all that apply:',
    'reportProblem.categories.incorrect': 'Something is broken or incorrect',
    'reportProblem.categories.unclear': 'The information is unclear',
    'reportProblem.categories.missing': 'Something is missing',
    'reportProblem.categories.outdated': 'The information is outdated',
    'reportProblem.categories.other': 'Other issue',
    'reportProblem.descriptionLabel': 'Describe the problem (required)',
    'reportProblem.descriptionPlaceholder': 'Please describe the issue you found...',
    'reportProblem.privacyNote': 'Do not include personal information (telephone, email, SIN, financial, medical, or work details).',
    'reportProblem.submitButton': 'Submit',
    'reportProblem.cancelButton': 'Cancel',
    'reportProblem.successMessage': 'Thank you for your feedback!',
    'reportProblem.errorMessage': 'Please select at least one issue and provide a description.',
    'reportProblem.requiredField': 'This field is required'
  },
  'fr-CA': {
    'reportProblem.heading': 'Signaler un problème sur cette page',
    'reportProblem.intro': 'Veuillez sélectionner toutes les options pertinentes :',
    'reportProblem.categories.incorrect': 'Quelque chose est brisé ou incorrect',
    'reportProblem.categories.unclear': 'L\'information n\'est pas claire',
    'reportProblem.categories.missing': 'Il manque quelque chose',
    'reportProblem.categories.outdated': 'L\'information est désuète',
    'reportProblem.categories.other': 'Autre problème',
    'reportProblem.descriptionLabel': 'Décrivez le problème (obligatoire)',
    'reportProblem.descriptionPlaceholder': 'Veuillez décrire le problème que vous avez trouvé...',
    'reportProblem.privacyNote': 'N\'incluez pas de renseignements personnels (téléphone, courriel, NAS, renseignements financiers, médicaux ou professionnels).',
    'reportProblem.submitButton': 'Soumettre',
    'reportProblem.cancelButton': 'Annuler',
    'reportProblem.successMessage': 'Merci pour vos commentaires!',
    'reportProblem.errorMessage': 'Veuillez sélectionner au moins un problème et fournir une description.',
    'reportProblem.requiredField': 'Ce champ est obligatoire'
  }
});

/**
 * Types of issues that can be reported
 */
export type ProblemCategory = 'incorrect' | 'unclear' | 'missing' | 'outdated' | 'other';

/**
 * Problem report data structure
 */
export interface ProblemReport {
  categories: ProblemCategory[];
  description: string;
  url?: string;
  timestamp?: string;
}

/**
 * GC Report Problem Component
 * 
 * Provides a form for users to report issues with page content.
 * Used throughout GC websites to collect user feedback.
 * 
 * @element gc-report-problem
 * @fires gc-report-problem-submit - Fired when form is submitted with {categories: string[], description: string, url: string, timestamp: string}
 * @fires gc-report-problem-cancel - Fired when form is cancelled
 * @fires gc-report-problem-success - Fired after successful submission animation
 * @fires gc-report-problem-ready - Fired when component is initialized
 */
@customElement('gc-report-problem')
export class GCReportProblem extends EVAElement {
  /**
   * Component name for i18n lookup
   */
  protected override componentName = 'gc-report-problem';

  /**
   * Page URL for the report (defaults to current page)
   */
  @property({ type: String })
  url = '';

  /**
   * Show compact version (smaller for sidebars)
   */
  @property({ type: Boolean, reflect: true })
  compact = false;

  /**
   * Success message display duration (milliseconds)
   */
  @property({ type: Number, attribute: 'success-duration' })
  successDuration = 5000;

  /**
   * Form submission state
   */
  @state()
  private _submitted = false;

  /**
   * Error state
   */
  @state()
  private _error = false;

  /**
   * Selected problem categories
   */
  @state()
  private _selectedCategories: Set<ProblemCategory> = new Set();

  /**
   * Problem description text
   */
  @state()
  private _description = '';

  /**
   * Success message timeout ID
   */
  private _successTimeoutId: number | null = null;

  /**
   * Component styles
   */
  static styles = css`
    :host {
      display: block;
      font-family: Lato, sans-serif;
      font-size: 1rem;
      line-height: 1.5;
      color: #333;
    }

    :host([compact]) {
      font-size: 0.875rem;
    }

    .container {
      border: 2px solid #284162;
      border-radius: 0.25rem;
      padding: 1.5rem;
      background: white;
    }

    :host([compact]) .container {
      padding: 1rem;
    }

    .heading {
      margin: 0 0 1rem 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: #284162;
    }

    :host([compact]) .heading {
      font-size: 1.125rem;
    }

    .intro {
      margin: 0 0 1rem 0;
      color: #333;
    }

    .categories {
      margin: 0 0 1.5rem 0;
      padding: 0;
      list-style: none;
    }

    .category-item {
      margin: 0 0 0.5rem 0;
    }

    .category-label {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.25rem;
      transition: background-color 0.2s ease;
    }

    .category-label:hover {
      background-color: #f5f5f5;
    }

    .category-checkbox {
      width: 24px;
      height: 24px;
      margin-right: 0.75rem;
      cursor: pointer;
      accent-color: #284162;
    }

    .category-text {
      flex: 1;
    }

    .description-group {
      margin: 0 0 1rem 0;
    }

    .description-label {
      display: block;
      margin: 0 0 0.5rem 0;
      font-weight: 700;
      color: #284162;
    }

    .required-indicator {
      color: #d3080c;
      margin-left: 0.25rem;
    }

    .description-textarea {
      width: 100%;
      min-height: 120px;
      padding: 0.75rem;
      border: 2px solid #666;
      border-radius: 0.25rem;
      font-family: Lato, sans-serif;
      font-size: 1rem;
      line-height: 1.5;
      resize: vertical;
      transition: border-color 0.2s ease;
    }

    .description-textarea:focus {
      outline: none;
      border-color: #284162;
      box-shadow: 0 0 0 3px rgba(40, 65, 98, 0.2);
    }

    .description-textarea.error {
      border-color: #d3080c;
    }

    .privacy-note {
      margin: 0.5rem 0 0 0;
      font-size: 0.875rem;
      color: #666;
      font-style: italic;
    }

    .buttons {
      display: flex;
      gap: 0.75rem;
      margin-top: 1.5rem;
    }

    .button {
      min-height: 44px;
      padding: 0.75rem 1.5rem;
      border: 2px solid transparent;
      border-radius: 0.25rem;
      font-family: Lato, sans-serif;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .button-primary {
      background-color: #284162;
      color: white;
    }

    .button-primary:hover {
      background-color: #0c2447;
    }

    .button-primary:focus {
      outline: none;
      box-shadow: 0 0 0 3px #0535d2;
    }

    .button-secondary {
      background-color: white;
      color: #284162;
      border-color: #284162;
    }

    .button-secondary:hover {
      background-color: #f5f5f5;
    }

    .button-secondary:focus {
      outline: none;
      box-shadow: 0 0 0 3px #0535d2;
    }

    .success-message {
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;
      background-color: #d8eeca;
      border: 2px solid #5a8c3a;
      border-radius: 0.25rem;
      color: #333;
      font-weight: 600;
    }

    .success-icon {
      width: 24px;
      height: 24px;
      margin-right: 0.75rem;
      fill: #5a8c3a;
    }

    .error-message {
      margin: 0 0 1rem 0;
      padding: 0.75rem 1rem;
      background-color: #f3e9e8;
      border: 2px solid #d3080c;
      border-radius: 0.25rem;
      color: #d3080c;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .buttons {
        flex-direction: column;
      }

      .button {
        width: 100%;
      }
    }
  `;

  /**
   * Initialize component
   */
  connectedCallback(): void {
    super.connectedCallback();
    this._emitReadyEvent();
  }

  /**
   * Cleanup on disconnect
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._successTimeoutId) {
      window.clearTimeout(this._successTimeoutId);
    }
  }

  /**
   * Handle category checkbox change
   */
  private _handleCategoryChange(category: ProblemCategory, checked: boolean): void {
    if (checked) {
      this._selectedCategories.add(category);
    } else {
      this._selectedCategories.delete(category);
    }
    this.requestUpdate();
    this._error = false; // Clear error when user makes selection
  }

  /**
   * Handle description input
   */
  private _handleDescriptionInput(e: Event): void {
    this._description = (e.target as HTMLTextAreaElement).value;
    this._error = false; // Clear error when user types
  }

  /**
   * Validate form
   */
  private _validateForm(): boolean {
    return this._selectedCategories.size > 0 && this._description.trim().length > 0;
  }

  /**
   * Handle form submission
   */
  private _handleSubmit(): void {
    if (!this._validateForm()) {
      this._error = true;
      return;
    }

    const report: ProblemReport = {
      categories: Array.from(this._selectedCategories),
      description: this._description.trim(),
      url: this.url || window.location.href,
      timestamp: new Date().toISOString()
    };

    // Emit submit event
    this.dispatchEvent(
      new CustomEvent('gc-report-problem-submit', {
        detail: report,
        bubbles: true,
        composed: true
      })
    );

    // Show success message
    this._submitted = true;
    this._error = false;

    // Auto-hide success message after duration
    this._successTimeoutId = window.setTimeout(() => {
      this._resetForm();
      this.dispatchEvent(
        new CustomEvent('gc-report-problem-success', {
          bubbles: true,
          composed: true
        })
      );
    }, this.successDuration);
  }

  /**
   * Handle form cancellation
   */
  private _handleCancel(): void {
    this._resetForm();
    this.dispatchEvent(
      new CustomEvent('gc-report-problem-cancel', {
        bubbles: true,
        composed: true
      })
    );
  }

  /**
   * Reset form to initial state
   */
  private _resetForm(): void {
    this._submitted = false;
    this._error = false;
    this._selectedCategories.clear();
    this._description = '';
    if (this._successTimeoutId) {
      window.clearTimeout(this._successTimeoutId);
      this._successTimeoutId = null;
    }
  }

  /**
   * Emit ready event
   */
  private _emitReadyEvent(): void {
    this.dispatchEvent(
      new CustomEvent('gc-report-problem-ready', {
        bubbles: true,
        composed: true
      })
    );
  }

  /**
   * Render success message
   */
  private _renderSuccess() {
    return html`
      <div class="success-message" part="success" role="status" aria-live="polite">
        <svg class="success-icon" part="success-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
        </svg>
        <span>${this.t('reportProblem.successMessage')}</span>
      </div>
    `;
  }

  /**
   * Render form
   */
  private _renderForm() {
    const categories: ProblemCategory[] = ['incorrect', 'unclear', 'missing', 'outdated', 'other'];

    return html`
      <div class="container" part="container">
        <h2 class="heading" part="heading">${this.t('reportProblem.heading')}</h2>
        
        ${this._error ? html`
          <div class="error-message" part="error" role="alert">
            ${this.t('reportProblem.errorMessage')}
          </div>
        ` : ''}

        <p class="intro" part="intro">${this.t('reportProblem.intro')}</p>

        <ul class="categories" part="categories" role="group" aria-label="${this.t('reportProblem.intro')}">
          ${categories.map(category => html`
            <li class="category-item" part="category-item">
              <label class="category-label" part="category-label">
                <input
                  type="checkbox"
                  class="category-checkbox"
                  part="category-checkbox"
                  .checked="${this._selectedCategories.has(category)}"
                  @change="${(e: Event) => this._handleCategoryChange(category, (e.target as HTMLInputElement).checked)}"
                  aria-label="${this.t(`reportProblem.categories.${category}`)}"
                />
                <span class="category-text" part="category-text">
                  ${this.t(`reportProblem.categories.${category}`)}
                </span>
              </label>
            </li>
          `)}
        </ul>

        <div class="description-group" part="description-group">
          <label class="description-label" part="description-label" for="description">
            ${this.t('reportProblem.descriptionLabel')}
            <span class="required-indicator" aria-label="${this.t('reportProblem.requiredField')}">*</span>
          </label>
          <textarea
            id="description"
            class=${classMap({ 'description-textarea': true, error: this._error && !this._description.trim() })}
            part="description-textarea"
            placeholder="${this.t('reportProblem.descriptionPlaceholder')}"
            .value="${this._description}"
            @input="${this._handleDescriptionInput}"
            aria-required="true"
            aria-invalid="${this._error && !this._description.trim()}"
          ></textarea>
          <p class="privacy-note" part="privacy-note">${this.t('reportProblem.privacyNote')}</p>
        </div>

        <div class="buttons" part="buttons">
          <button
            type="button"
            class="button button-primary"
            part="button submit-button"
            @click="${this._handleSubmit}"
          >
            ${this.t('reportProblem.submitButton')}
          </button>
          <button
            type="button"
            class="button button-secondary"
            part="button cancel-button"
            @click="${this._handleCancel}"
          >
            ${this.t('reportProblem.cancelButton')}
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Render component
   */
  render() {
    return this._submitted ? this._renderSuccess() : this._renderForm();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gc-report-problem': GCReportProblem;
  }
}
