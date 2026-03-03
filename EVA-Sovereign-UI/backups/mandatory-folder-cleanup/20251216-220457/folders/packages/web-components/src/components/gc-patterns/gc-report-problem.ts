import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

export interface ProblemCategory {
  id: string;
  label: string;
}

@customElement('gc-report-problem')
export class GCReportProblem extends EVAElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--eva-fonts-body-family, 'Noto Sans', 'Arial', sans-serif);
    }

    .report-container {
      padding: var(--eva-spacing-lg, 24px);
      background-color: var(--eva-colors-gray-50, #f5f5f5);
      border-radius: var(--eva-border-radius-md, 4px);
      border-left: 4px solid var(--eva-colors-warning, #ff9900);
    }

    .report-heading {
      margin: 0 0 var(--eva-spacing-md, 16px) 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--eva-colors-gray-900, #333);
    }

    .report-description {
      margin: 0 0 var(--eva-spacing-lg, 24px) 0;
      color: var(--eva-colors-gray-700, #555);
      line-height: 1.6;
    }

    .form-group {
      margin-bottom: var(--eva-spacing-md, 16px);
    }

    .form-label {
      display: block;
      margin-bottom: var(--eva-spacing-xs, 8px);
      font-weight: 500;
      color: var(--eva-colors-gray-900, #333);
    }

    .required {
      color: var(--eva-colors-error, #d3080c);
    }

    .radio-group {
      display: flex;
      flex-direction: column;
      gap: var(--eva-spacing-sm, 12px);
    }

    .radio-option {
      display: flex;
      align-items: center;
      gap: var(--eva-spacing-xs, 8px);
    }

    .radio-option input[type="radio"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }

    .radio-option label {
      cursor: pointer;
      color: var(--eva-colors-gray-800, #444);
    }

    .textarea {
      width: 100%;
      min-height: 120px;
      padding: var(--eva-spacing-sm, 12px);
      border: 1px solid var(--eva-colors-gray-300, #ccc);
      border-radius: var(--eva-border-radius-sm, 2px);
      font-family: inherit;
      font-size: 1rem;
      resize: vertical;
    }

    .textarea:focus {
      outline: 2px solid var(--eva-colors-focus, #26374a);
      outline-offset: 2px;
      border-color: var(--eva-colors-focus, #26374a);
    }

    .privacy-notice {
      margin: var(--eva-spacing-md, 16px) 0;
      padding: var(--eva-spacing-md, 16px);
      background-color: var(--eva-colors-info-light, #d9eaf7);
      border-radius: var(--eva-border-radius-sm, 2px);
      font-size: 0.875rem;
      color: var(--eva-colors-gray-800, #444);
    }

    .privacy-notice a {
      color: var(--eva-colors-link, #0535d2);
      text-decoration: underline;
    }

    .button-group {
      display: flex;
      gap: var(--eva-spacing-sm, 12px);
      margin-top: var(--eva-spacing-lg, 24px);
    }

    .submit-button,
    .cancel-button {
      padding: var(--eva-spacing-sm, 12px) var(--eva-spacing-lg, 24px);
      border: 1px solid var(--eva-colors-gray-300, #ccc);
      border-radius: var(--eva-border-radius-sm, 2px);
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .submit-button {
      background-color: var(--eva-colors-primary, #26374a);
      border-color: var(--eva-colors-primary, #26374a);
      color: var(--eva-colors-white, #fff);
    }

    .submit-button:hover:not(:disabled) {
      background-color: var(--eva-colors-primary-dark, #1a2633);
      border-color: var(--eva-colors-primary-dark, #1a2633);
    }

    .submit-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .submit-button:focus {
      outline: 2px solid var(--eva-colors-focus, #26374a);
      outline-offset: 2px;
    }

    .cancel-button {
      background-color: var(--eva-colors-white, #fff);
      color: var(--eva-colors-gray-900, #333);
    }

    .cancel-button:hover {
      background-color: var(--eva-colors-gray-50, #f9f9f9);
    }

    .cancel-button:focus {
      outline: 2px solid var(--eva-colors-focus, #26374a);
      outline-offset: 2px;
    }

    .success-message {
      padding: var(--eva-spacing-lg, 24px);
      background-color: var(--eva-colors-success-light, #d8eeca);
      border-left: 4px solid var(--eva-colors-success, #278400);
      border-radius: var(--eva-border-radius-md, 4px);
    }

    .success-message h3 {
      margin: 0 0 var(--eva-spacing-sm, 12px) 0;
      color: var(--eva-colors-success-dark, #1f6600);
    }

    .success-message p {
      margin: 0;
      color: var(--eva-colors-gray-800, #444);
    }

    .error-message {
      padding: var(--eva-spacing-md, 16px);
      background-color: var(--eva-colors-error-light, #f3e9e8);
      border-left: 4px solid var(--eva-colors-error, #d3080c);
      border-radius: var(--eva-border-radius-sm, 2px);
      color: var(--eva-colors-error-dark, #a10c0c);
      margin-bottom: var(--eva-spacing-md, 16px);
    }

    @media (max-width: 768px) {
      .button-group {
        flex-direction: column;
      }

      .submit-button,
      .cancel-button {
        width: 100%;
      }
    }
  `;

  @property({ type: String })
  pageUrl: string = '';

  @property({ type: String })
  apiEndpoint?: string;

  @property({ type: Array })
  categories: ProblemCategory[] = [];

  @property({ type: Boolean })
  showPrivacyNotice: boolean = true;

  @state()
  private selectedCategory: string = '';

  @state()
  private description: string = '';

  @state()
  private submitted: boolean = false;

  @state()
  private submitting: boolean = false;

  @state()
  private errorMessage: string = '';

  protected override render() {
    if (this.submitted) {
      return html`
        <div class="success-message" role="status" aria-live="polite">
          <h3>${this.getMessage('gc-report-problem.successTitle')}</h3>
          <p>${this.getMessage('gc-report-problem.successMessage')}</p>
        </div>
      `;
    }

    const defaultCategories: ProblemCategory[] = this.categories.length > 0 ? this.categories : [
      { id: 'incorrect', label: this.getMessage('gc-report-problem.categoryIncorrect') },
      { id: 'outdated', label: this.getMessage('gc-report-problem.categoryOutdated') },
      { id: 'confusing', label: this.getMessage('gc-report-problem.categoryConfusing') },
      { id: 'missing', label: this.getMessage('gc-report-problem.categoryMissing') },
      { id: 'broken', label: this.getMessage('gc-report-problem.categoryBroken') },
      { id: 'other', label: this.getMessage('gc-report-problem.categoryOther') }
    ];

    return html`
      <div class="report-container">
        <h2 class="report-heading">${this.getMessage('gc-report-problem.heading')}</h2>
        <p class="report-description">${this.getMessage('gc-report-problem.description')}</p>

        ${this.errorMessage ? html`
          <div class="error-message" role="alert">
            ${this.errorMessage}
          </div>
        ` : ''}

        <form @submit="${this.handleSubmit}">
          <div class="form-group">
            <label class="form-label">
              ${this.getMessage('gc-report-problem.categoryLabel')}
              <span class="required">*</span>
            </label>
            <div class="radio-group" role="radiogroup" aria-required="true">
              ${defaultCategories.map(category => html`
                <div class="radio-option">
                  <input
                    type="radio"
                    id="category-${category.id}"
                    name="problem-category"
                    value="${category.id}"
                    @change="${() => this.selectedCategory = category.id}"
                    .checked="${this.selectedCategory === category.id}"
                  />
                  <label for="category-${category.id}">${category.label}</label>
                </div>
              `)}
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="problem-description">
              ${this.getMessage('gc-report-problem.descriptionLabel')}
              <span class="required">*</span>
            </label>
            <textarea
              id="problem-description"
              class="textarea"
              .value="${this.description}"
              @input="${(e: InputEvent) => this.description = (e.target as HTMLTextAreaElement).value}"
              placeholder="${this.getMessage('gc-report-problem.descriptionPlaceholder')}"
              required
              aria-required="true"
            ></textarea>
          </div>

          ${this.showPrivacyNotice ? html`
            <div class="privacy-notice">
              ${this.getMessage('gc-report-problem.privacyNotice')}
              <a href="https://www.canada.ca/en/transparency/privacy.html" target="_blank" rel="noopener noreferrer">
                ${this.getMessage('gc-report-problem.privacyLink')}
              </a>
            </div>
          ` : ''}

          <div class="button-group">
            <button
              type="submit"
              class="submit-button"
              ?disabled="${this.submitting || !this.isFormValid()}"
            >
              ${this.submitting ? this.getMessage('gc-report-problem.submitting') : this.getMessage('gc-report-problem.submit')}
            </button>
            <button
              type="button"
              class="cancel-button"
              @click="${this.handleCancel}"
              ?disabled="${this.submitting}"
            >
              ${this.getMessage('gc-report-problem.cancel')}
            </button>
          </div>
        </form>
      </div>
    `;
  }

  private isFormValid(): boolean {
    return this.selectedCategory !== '' && this.description.trim() !== '';
  }

  private async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    if (!this.isFormValid()) {
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    const reportData = {
      category: this.selectedCategory,
      description: this.description,
      pageUrl: this.pageUrl || window.location.href,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    };

    this.emitEvent('gc-problem-submit', reportData);

    if (this.apiEndpoint) {
      try {
        const response = await fetch(this.apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reportData)
        });

        if (!response.ok) {
          throw new Error('Submission failed');
        }

        this.submitted = true;
        this.announce(this.getMessage('gc-report-problem.successAnnouncement'));
      } catch (error) {
        this.errorMessage = this.getMessage('gc-report-problem.errorMessage');
        this.emitEvent('gc-problem-error', { error });
      } finally {
        this.submitting = false;
      }
    } else {
      this.submitted = true;
      this.submitting = false;
      this.announce(this.getMessage('gc-report-problem.successAnnouncement'));
    }
  }

  private handleCancel(): void {
    this.selectedCategory = '';
    this.description = '';
    this.errorMessage = '';
    this.emitEvent('gc-problem-cancel', {});
  }

  public reset(): void {
    this.selectedCategory = '';
    this.description = '';
    this.submitted = false;
    this.submitting = false;
    this.errorMessage = '';
  }
}

registerMessages('gc-report-problem', {
  'en-CA': {
    heading: 'Report a problem on this page',
    description: 'Please select all that apply:',
    categoryLabel: 'What is wrong with this page?',
    categoryIncorrect: 'The information is incorrect',
    categoryOutdated: 'The information is outdated',
    categoryConfusing: 'The information is confusing',
    categoryMissing: 'Important information is missing',
    categoryBroken: 'A link, button or video is not working',
    categoryOther: 'Other issue not in this list',
    descriptionLabel: 'Please provide more details',
    descriptionPlaceholder: 'Describe the problem you found...',
    privacyNotice: 'You will not receive a reply. Do not include personal information (telephone, email, SIN, financial, medical, or work details). For more information, see our ',
    privacyLink: 'Privacy statement',
    submit: 'Submit',
    submitting: 'Submitting...',
    cancel: 'Cancel',
    successTitle: 'Thank you for your help!',
    successMessage: 'Your report has been submitted. We use your feedback to improve our website.',
    successAnnouncement: 'Problem report submitted successfully',
    errorMessage: 'There was a problem submitting your report. Please try again later.'
  },
  'fr-CA': {
    heading: 'Signaler un problème sur cette page',
    description: 'Veuillez sélectionner toutes les réponses pertinentes :',
    categoryLabel: 'Quel est le problème avec cette page?',
    categoryIncorrect: 'L\'information est incorrecte',
    categoryOutdated: 'L\'information est dépassée',
    categoryConfusing: 'L\'information est confuse',
    categoryMissing: 'Il manque de l\'information importante',
    categoryBroken: 'Un lien, un bouton ou une vidéo ne fonctionne pas',
    categoryOther: 'Autre problème ne figurant pas dans cette liste',
    descriptionLabel: 'Veuillez fournir plus de détails',
    descriptionPlaceholder: 'Décrivez le problème que vous avez trouvé...',
    privacyNotice: 'Vous ne recevrez pas de réponse. N\'incluez pas de renseignements personnels (téléphone, courriel, NAS, renseignements financiers, médicaux ou professionnels). Pour en savoir plus, consultez notre ',
    privacyLink: 'Déclaration de confidentialité',
    submit: 'Soumettre',
    submitting: 'Envoi en cours...',
    cancel: 'Annuler',
    successTitle: 'Merci de votre aide!',
    successMessage: 'Votre rapport a été soumis. Nous utilisons vos commentaires pour améliorer notre site Web.',
    successAnnouncement: 'Rapport de problème soumis avec succès',
    errorMessage: 'Un problème est survenu lors de la soumission de votre rapport. Veuillez réessayer plus tard.'
  }
});
