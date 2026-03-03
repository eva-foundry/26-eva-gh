import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

interface ErrorMessage {
  id: string;
  field: string;
  message: string;
  href?: string;
}

@customElement('gc-error-summary')
export class GCErrorSummary extends EVAElement {
  static override styles = css`
    :host {
      display: block;
      margin: var(--eva-spacing-lg, 1.5rem) 0;
    }

    .error-summary {
      padding: var(--eva-spacing-lg, 1.5rem);
      background: var(--eva-colors-error-light, #f3e9e8);
      border: 3px solid var(--eva-colors-error, #d3080c);
      border-radius: 4px;
    }

    .error-heading {
      display: flex;
      align-items: center;
      gap: var(--eva-spacing-sm, 0.75rem);
      margin: 0 0 var(--eva-spacing-md, 1rem) 0;
      color: var(--eva-colors-error, #d3080c);
      font-family: var(--eva-fonts-heading);
      font-size: var(--eva-font-size-xl, 1.5rem);
      font-weight: 700;
      line-height: 1.2;
    }

    .error-icon {
      flex-shrink: 0;
      width: 32px;
      height: 32px;
    }

    .error-description {
      margin: 0 0 var(--eva-spacing-md, 1rem) 0;
      color: var(--eva-colors-text, #333);
      font-family: var(--eva-fonts-body);
      font-size: var(--eva-font-size-md, 1rem);
      line-height: 1.5;
    }

    .error-list {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .error-item {
      margin-bottom: var(--eva-spacing-sm, 0.75rem);
    }

    .error-item:last-child {
      margin-bottom: 0;
    }

    .error-link {
      color: var(--eva-colors-error, #d3080c);
      font-family: var(--eva-fonts-body);
      font-size: var(--eva-font-size-md, 1rem);
      line-height: 1.5;
      text-decoration: underline;
      cursor: pointer;
    }

    .error-link:hover,
    .error-link:focus {
      color: var(--eva-colors-error-dark, #a30000);
      text-decoration: none;
    }

    .error-link:focus {
      outline: 3px solid var(--eva-colors-focus, #269abc);
      outline-offset: 2px;
    }

    .error-text {
      color: var(--eva-colors-text, #333);
      font-family: var(--eva-fonts-body);
      font-size: var(--eva-font-size-md, 1rem);
      line-height: 1.5;
    }

    @media (max-width: 768px) {
      .error-summary {
        padding: var(--eva-spacing-md, 1rem);
      }

      .error-heading {
        font-size: var(--eva-font-size-lg, 1.125rem);
      }

      .error-icon {
        width: 24px;
        height: 24px;
      }
    }

    @media print {
      .error-summary {
        border: 2px solid var(--eva-colors-error, #d3080c);
      }
    }
  `;

  @property({ type: Array })
  errors: ErrorMessage[] = [];

  @property({ type: String })
  heading = '';

  @property({ type: String })
  description = '';

  private handleErrorClick(error: ErrorMessage) {
    this.emitEvent('gc-error-click', {
      error,
      timestamp: new Date().toISOString()
    });

    if (error.href) {
      const target = document.querySelector(error.href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        if (target instanceof HTMLElement) {
          target.focus();
          
          if (!target.hasAttribute('tabindex')) {
            target.setAttribute('tabindex', '-1');
            setTimeout(() => {
              target.removeAttribute('tabindex');
            }, 100);
          }
        }
      }
    }
  }

  private renderIcon() {
    return html`
      <svg
        class="error-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
    `;
  }

  protected override render() {
    if (this.errors.length === 0) {
      return html``;
    }

    const headingText = this.heading || this.getMessage('heading');
    const descriptionText = this.description || this.getMessage('description');

    return html`
      <div
        class="error-summary"
        role="alert"
        aria-labelledby="error-heading"
        aria-describedby="error-description"
      >
        <h2 id="error-heading" class="error-heading">
          ${this.renderIcon()}
          ${headingText}
        </h2>

        ${descriptionText ? html`
          <p id="error-description" class="error-description">
            ${descriptionText}
          </p>
        ` : ''}

        <ul class="error-list">
          ${this.errors.map((error) => html`
            <li class="error-item">
              ${error.href ? html`
                <a
                  href="${error.href}"
                  class="error-link"
                  @click="${(e: Event) => {
                    e.preventDefault();
                    this.handleErrorClick(error);
                  }}"
                >
                  ${error.message}
                </a>
              ` : html`
                <span class="error-text">${error.message}</span>
              `}
            </li>
          `)}
        </ul>
      </div>
    `;
  }
}

registerMessages('gc-error-summary', {
  'en-CA': {
    'heading': 'There is a problem',
    'description': 'Please correct the following errors:'
  },
  'fr-CA': {
    'heading': 'Il y a un problème',
    'description': 'Veuillez corriger les erreurs suivantes :'
  }
});
