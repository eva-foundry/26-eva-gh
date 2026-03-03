import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-Feedback - Page Feedback Form
 * Collect user feedback about page content
 */
@customElement('wb-feedback')
export class WBFeedback extends EVAElement {
  static override styles = css`
    :host {
      display: block;
    }

    .feedback-toggle {
      padding: var(--eva-spacing-sm, 0.5rem) var(--eva-spacing-md, 1rem);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      border-radius: var(--eva-border-radius-sm, 3px);
      background: var(--eva-colors-background-primary, #26374a);
      color: white;
      cursor: pointer;
      font-size: 1em;
    }

    .feedback-toggle:hover {
      background: var(--eva-colors-background-primary-hover, #1c2934);
    }

    .feedback-toggle:focus {
      outline: 2px solid var(--eva-colors-focus, #303fc1);
      outline-offset: 2px;
    }

    .feedback-form {
      margin-top: var(--eva-spacing-md, 1rem);
      padding: var(--eva-spacing-lg, 2rem);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      border-radius: var(--eva-border-radius-md, 4px);
      background: var(--eva-colors-background-default, #f5f5f5);
    }

    .form-group {
      margin-bottom: var(--eva-spacing-md, 1rem);
    }

    label {
      display: block;
      margin-bottom: var(--eva-spacing-xs, 0.25rem);
      font-weight: bold;
    }

    input[type="text"],
    input[type="email"],
    textarea {
      width: 100%;
      padding: var(--eva-spacing-sm, 0.5rem);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      border-radius: var(--eva-border-radius-sm, 3px);
      font-family: inherit;
      font-size: 1em;
    }

    textarea {
      min-height: 120px;
      resize: vertical;
    }

    .radio-group {
      display: flex;
      gap: var(--eva-spacing-md, 1rem);
    }

    .radio-label {
      display: flex;
      align-items: center;
      gap: var(--eva-spacing-xs, 0.25rem);
      font-weight: normal;
    }

    .form-buttons {
      display: flex;
      gap: var(--eva-spacing-sm, 0.5rem);
    }

    .button {
      padding: var(--eva-spacing-sm, 0.5rem) var(--eva-spacing-md, 1rem);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      border-radius: var(--eva-border-radius-sm, 3px);
      cursor: pointer;
      font-size: 1em;
    }

    .button-primary {
      background: var(--eva-colors-background-primary, #26374a);
      color: white;
    }

    .button-secondary {
      background: white;
    }

    .button:hover {
      opacity: 0.9;
    }

    .button:focus {
      outline: 2px solid var(--eva-colors-focus, #303fc1);
    }

    .success-message {
      padding: var(--eva-spacing-md, 1rem);
      background: #d4edda;
      border: 1px solid #c3e6cb;
      border-radius: var(--eva-border-radius-sm, 3px);
      color: #155724;
    }
  `;

  @property({ type: Boolean })
  showForm = false;

  @state()
  private submitted = false;

  @state()
  private rating = '';

  @state()
  private comments = '';

  @state()
  private email = '';

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-feedback', {
      'en-CA': {
        toggleButton: 'Give feedback',
        formTitle: 'Page feedback',
        ratingLabel: 'How would you rate this page?',
        ratingExcellent: 'Excellent',
        ratingGood: 'Good',
        ratingFair: 'Fair',
        ratingPoor: 'Poor',
        commentsLabel: 'Additional comments (optional)',
        emailLabel: 'Email (optional)',
        submitButton: 'Submit feedback',
        cancelButton: 'Cancel',
        successMessage: 'Thank you for your feedback!',
        feedbackSubmitted: 'Feedback submitted successfully'
      },
      'fr-CA': {
        toggleButton: 'Donner votre avis',
        formTitle: 'Commentaires sur la page',
        ratingLabel: 'Comment évalueriez-vous cette page?',
        ratingExcellent: 'Excellent',
        ratingGood: 'Bien',
        ratingFair: 'Passable',
        ratingPoor: 'Mauvais',
        commentsLabel: 'Commentaires supplémentaires (facultatif)',
        emailLabel: 'Courriel (facultatif)',
        submitButton: 'Soumettre les commentaires',
        cancelButton: 'Annuler',
        successMessage: 'Merci pour vos commentaires!',
        feedbackSubmitted: 'Commentaires soumis avec succès'
      }
    });
  }

  private toggleForm(): void {
    this.showForm = !this.showForm;
    this.submitted = false;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.rating = '';
    this.comments = '';
    this.email = '';
  }

  private submitFeedback(e: Event): void {
    e.preventDefault();

    const feedback = {
      rating: this.rating,
      comments: this.comments,
      email: this.email,
      page: window.location.href,
      timestamp: new Date().toISOString()
    };

    this.emitEvent('wb-feedback-submit', feedback);
    this.announce(this.getMessage('wb-feedback', 'feedbackSubmitted'));
    this.submitted = true;

    setTimeout(() => {
      this.showForm = false;
      this.submitted = false;
      this.resetForm();
    }, 3000);
  }

  override render() {
    return html`
      <button 
        class="feedback-toggle"
        @click="${this.toggleForm}"
        aria-expanded="${this.showForm}"
        aria-label="${this.getMessage('wb-feedback', 'toggleButton')}"
      >
        ${this.getMessage('wb-feedback', 'toggleButton')}
      </button>

      ${this.showForm ? html`
        <div class="feedback-form" role="region" aria-labelledby="feedback-title">
          ${this.submitted ? html`
            <div class="success-message">
              ${this.getMessage('wb-feedback', 'successMessage')}
            </div>
          ` : html`
            <form @submit="${this.submitFeedback}">
              <h3 id="feedback-title">${this.getMessage('wb-feedback', 'formTitle')}</h3>
              
              <div class="form-group">
                <label>${this.getMessage('wb-feedback', 'ratingLabel')}</label>
                <div class="radio-group">
                  <label class="radio-label">
                    <input 
                      type="radio" 
                      name="rating" 
                      value="excellent"
                      @change="${(e: Event) => this.rating = (e.target as HTMLInputElement).value}"
                      required
                    />
                    ${this.getMessage('wb-feedback', 'ratingExcellent')}
                  </label>
                  <label class="radio-label">
                    <input 
                      type="radio" 
                      name="rating" 
                      value="good"
                      @change="${(e: Event) => this.rating = (e.target as HTMLInputElement).value}"
                    />
                    ${this.getMessage('wb-feedback', 'ratingGood')}
                  </label>
                  <label class="radio-label">
                    <input 
                      type="radio" 
                      name="rating" 
                      value="fair"
                      @change="${(e: Event) => this.rating = (e.target as HTMLInputElement).value}"
                    />
                    ${this.getMessage('wb-feedback', 'ratingFair')}
                  </label>
                  <label class="radio-label">
                    <input 
                      type="radio" 
                      name="rating" 
                      value="poor"
                      @change="${(e: Event) => this.rating = (e.target as HTMLInputElement).value}"
                    />
                    ${this.getMessage('wb-feedback', 'ratingPoor')}
                  </label>
                </div>
              </div>

              <div class="form-group">
                <label for="comments">${this.getMessage('wb-feedback', 'commentsLabel')}</label>
                <textarea 
                  id="comments"
                  @input="${(e: Event) => this.comments = (e.target as HTMLTextAreaElement).value}"
                  .value="${this.comments}"
                ></textarea>
              </div>

              <div class="form-group">
                <label for="email">${this.getMessage('wb-feedback', 'emailLabel')}</label>
                <input 
                  type="email" 
                  id="email"
                  @input="${(e: Event) => this.email = (e.target as HTMLInputElement).value}"
                  .value="${this.email}"
                />
              </div>

              <div class="form-buttons">
                <button type="submit" class="button button-primary">
                  ${this.getMessage('wb-feedback', 'submitButton')}
                </button>
                <button type="button" class="button button-secondary" @click="${this.toggleForm}">
                  ${this.getMessage('wb-feedback', 'cancelButton')}
                </button>
              </div>
            </form>
          `}
        </div>
      ` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-feedback': WBFeedback;
  }
}
