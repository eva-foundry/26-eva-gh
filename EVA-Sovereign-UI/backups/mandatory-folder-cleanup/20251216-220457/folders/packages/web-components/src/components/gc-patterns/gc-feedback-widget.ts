import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

@customElement('gc-feedback-widget')
export class GCFeedbackWidget extends EVAElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--eva-fonts-family-base, 'Lato', sans-serif);
    }

    .feedback-widget {
      background: var(--eva-colors-surface-secondary, #f5f5f5);
      border: 1px solid var(--eva-colors-border-primary, #e1e4e7);
      border-radius: 4px;
      padding: var(--eva-spacing-lg, 16px);
      margin-top: var(--eva-spacing-xl, 24px);
    }

    .feedback-question {
      font-size: var(--eva-fonts-size-lg, 1.125rem);
      font-weight: var(--eva-fonts-weight-bold, 700);
      margin: 0 0 var(--eva-spacing-md, 12px) 0;
      color: var(--eva-colors-text-primary, #333);
    }

    .feedback-buttons {
      display: flex;
      gap: var(--eva-spacing-md, 12px);
      margin-bottom: var(--eva-spacing-md, 12px);
    }

    .btn {
      padding: var(--eva-spacing-sm, 8px) var(--eva-spacing-lg, 16px);
      font-size: var(--eva-fonts-size-base, 1rem);
      font-weight: var(--eva-fonts-weight-bold, 700);
      border-radius: 4px;
      border: 2px solid var(--eva-colors-primary, #26374a);
      cursor: pointer;
      transition: all 0.2s ease;
      background: var(--eva-colors-surface-primary, #fff);
      color: var(--eva-colors-primary, #26374a);
    }

    .btn:hover {
      background: var(--eva-colors-primary, #26374a);
      color: var(--eva-colors-text-on-primary, #fff);
    }

    .btn:focus-visible {
      outline: 3px solid var(--eva-colors-focus, #0535d2);
      outline-offset: 2px;
    }

    .btn.selected {
      background: var(--eva-colors-primary, #26374a);
      color: var(--eva-colors-text-on-primary, #fff);
    }

    .follow-up {
      margin-top: var(--eva-spacing-md, 12px);
    }

    .follow-up-label {
      display: block;
      font-weight: var(--eva-fonts-weight-bold, 700);
      margin-bottom: var(--eva-spacing-sm, 8px);
      color: var(--eva-colors-text-primary, #333);
    }

    .feedback-textarea {
      width: 100%;
      min-height: 100px;
      padding: var(--eva-spacing-sm, 8px);
      border: 1px solid var(--eva-colors-border-primary, #e1e4e7);
      border-radius: 4px;
      font-family: inherit;
      font-size: var(--eva-fonts-size-base, 1rem);
      resize: vertical;
    }

    .feedback-textarea:focus {
      outline: 3px solid var(--eva-colors-focus, #0535d2);
      outline-offset: 2px;
    }

    .submit-btn {
      margin-top: var(--eva-spacing-md, 12px);
      background: var(--eva-colors-primary, #26374a);
      color: var(--eva-colors-text-on-primary, #fff);
      border: none;
    }

    .submit-btn:hover {
      background: var(--eva-colors-primary-dark, #1a2633);
    }

    .thank-you-message {
      background: var(--eva-colors-success-light, #d4edda);
      border: 1px solid var(--eva-colors-success, #2e8540);
      border-radius: 4px;
      padding: var(--eva-spacing-lg, 16px);
      color: var(--eva-colors-success-dark, #1e5a2e);
    }

    .thank-you-message h3 {
      margin: 0 0 var(--eva-spacing-sm, 8px) 0;
      font-size: var(--eva-fonts-size-lg, 1.125rem);
    }

    .privacy-notice {
      margin-top: var(--eva-spacing-md, 12px);
      font-size: var(--eva-fonts-size-sm, 0.875rem);
      color: var(--eva-colors-text-secondary, #666);
    }

    @media (max-width: 768px) {
      .feedback-buttons {
        flex-direction: column;
      }

      .btn {
        width: 100%;
      }
    }
  `;

  @property({ type: String })
  apiEndpoint: string = '';

  @property({ type: Boolean })
  showPrivacyNotice: boolean = true;

  @state()
  private submitted: boolean = false;

  @state()
  private helpful: boolean | null = null;

  @state()
  private comments: string = '';

  @state()
  private isSubmitting: boolean = false;

  /**
   * Handle Yes/No button click
   */
  private handleHelpfulClick(isHelpful: boolean): void {
    this.helpful = isHelpful;
    this.requestUpdate();
    this.announce(
      this.getMessage(isHelpful ? 'selectedYes' : 'selectedNo')
    );
  }

  /**
   * Handle comments input
   */
  private handleCommentsInput(event: InputEvent): void {
    const target = event.target as HTMLTextAreaElement;
    this.comments = target.value;
  }

  /**
   * Submit feedback
   */
  public async submitFeedback(): Promise<void> {
    if (this.helpful === null) return;

    this.isSubmitting = true;
    const feedbackData = {
      helpful: this.helpful,
      comments: this.comments,
      timestamp: new Date().toISOString(),
      url: window.location.href
    };

    try {
      // Emit event for external handling
      this.emitEvent('gc-feedback-submit', feedbackData);

      // If API endpoint is provided, POST the data
      if (this.apiEndpoint) {
        await fetch(this.apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(feedbackData)
        });
      }

      this.submitted = true;
      this.announce(this.getMessage('thankYouMessage'));
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      this.announce(this.getMessage('submissionError'));
    } finally {
      this.isSubmitting = false;
      this.requestUpdate();
    }
  }

  /**
   * Reset the widget
   */
  public reset(): void {
    this.submitted = false;
    this.helpful = null;
    this.comments = '';
    this.isSubmitting = false;
    this.requestUpdate();
  }

  protected override render() {
    if (this.submitted) {
      return html`
        <div class="feedback-widget">
          <div class="thank-you-message" role="alert">
            <h3>${this.getMessage('thankYouTitle')}</h3>
            <p>${this.getMessage('thankYouMessage')}</p>
          </div>
        </div>
      `;
    }

    return html`
      <div class="feedback-widget">
        <h2 class="feedback-question">${this.getMessage('question')}</h2>

        <div class="feedback-buttons">
          <button
            class="btn ${this.helpful === true ? 'selected' : ''}"
            @click="${() => this.handleHelpfulClick(true)}"
            aria-pressed="${this.helpful === true}"
          >
            ${this.getMessage('yes')}
          </button>
          <button
            class="btn ${this.helpful === false ? 'selected' : ''}"
            @click="${() => this.handleHelpfulClick(false)}"
            aria-pressed="${this.helpful === false}"
          >
            ${this.getMessage('no')}
          </button>
        </div>

        ${this.helpful !== null ? html`
          <div class="follow-up">
            <label class="follow-up-label" for="feedback-comments">
              ${this.helpful ? this.getMessage('whatWorked') : this.getMessage('whatWrong')}
            </label>
            <textarea
              id="feedback-comments"
              class="feedback-textarea"
              .value="${this.comments}"
              @input="${this.handleCommentsInput}"
              placeholder="${this.getMessage('commentsPlaceholder')}"
            ></textarea>

            <button
              class="btn submit-btn"
              @click="${this.submitFeedback}"
              ?disabled="${this.isSubmitting}"
            >
              ${this.getMessage('submit')}
            </button>

            ${this.showPrivacyNotice ? html`
              <p class="privacy-notice">${this.getMessage('privacyNotice')}</p>
            ` : ''}
          </div>
        ` : ''}

        <div role="status" aria-live="polite" aria-atomic="true" class="sr-only">
          ${this.helpful !== null ? this.getMessage('feedbackFormVisible') : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gc-feedback-widget': GCFeedbackWidget;
  }
}

registerMessages('gc-feedback-widget', {
  'en-CA': {
    question: 'Did you find what you were looking for?',
    yes: 'Yes',
    no: 'No',
    selectedYes: 'Selected Yes',
    selectedNo: 'Selected No',
    whatWorked: 'Please share what worked well (optional)',
    whatWrong: 'What was wrong?',
    commentsPlaceholder: 'Enter your feedback here...',
    submit: 'Submit',
    thankYouTitle: 'Thank you for your feedback',
    thankYouMessage: 'Your feedback will help us improve this page.',
    privacyNotice: 'Your feedback is anonymous and will not include any personal information.',
    feedbackFormVisible: 'Feedback form now visible',
    submissionError: 'Failed to submit feedback. Please try again.'
  },
  'fr-CA': {
    question: 'Avez-vous trouvé ce que vous cherchiez?',
    yes: 'Oui',
    no: 'Non',
    selectedYes: 'Oui sélectionné',
    selectedNo: 'Non sélectionné',
    whatWorked: 'Veuillez partager ce qui a bien fonctionné (facultatif)',
    whatWrong: 'Qu\'est-ce qui n\'allait pas?',
    commentsPlaceholder: 'Entrez vos commentaires ici...',
    submit: 'Soumettre',
    thankYouTitle: 'Merci pour vos commentaires',
    thankYouMessage: 'Vos commentaires nous aideront à améliorer cette page.',
    privacyNotice: 'Vos commentaires sont anonymes et ne comprendront aucun renseignement personnel.',
    feedbackFormVisible: 'Formulaire de commentaires maintenant visible',
    submissionError: 'Échec de l\'envoi des commentaires. Veuillez réessayer.'
  }
});
