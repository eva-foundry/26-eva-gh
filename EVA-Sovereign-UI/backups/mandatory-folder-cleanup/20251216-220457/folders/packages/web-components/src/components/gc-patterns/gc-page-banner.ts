import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

@customElement('gc-page-banner')
export class GCPageBanner extends EVAElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--eva-fonts-body);
    }

    .banner {
      padding: var(--eva-spacing-lg, 1.5rem) 0;
      background: var(--eva-colors-info-light, #d9eaf7);
      border-left: 4px solid var(--eva-colors-info, #269abc);
    }

    .banner-container {
      max-width: var(--eva-container-max-width, 1200px);
      margin: 0 auto;
      padding: 0 var(--eva-spacing-md, 1rem);
    }

    .banner-content {
      display: flex;
      align-items: flex-start;
      gap: var(--eva-spacing-md, 1rem);
    }

    .banner-icon {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      margin-top: 2px;
    }

    .banner-icon svg {
      width: 100%;
      height: 100%;
      fill: var(--eva-colors-info, #269abc);
    }

    .banner-text {
      flex: 1;
      color: var(--eva-colors-text, #333);
      font-size: var(--eva-font-size-md, 1rem);
      line-height: 1.6;
    }

    .banner-heading {
      margin: 0 0 var(--eva-spacing-xs, 0.5rem) 0;
      font-size: var(--eva-font-size-lg, 1.125rem);
      font-weight: 700;
      color: var(--eva-colors-text, #333);
    }

    .banner-description {
      margin: 0;
    }

    .banner-link {
      color: var(--eva-colors-link, #26374a);
      text-decoration: underline;
      transition: color 0.2s ease;
    }

    .banner-link:hover,
    .banner-link:focus {
      color: var(--eva-colors-link-hover, #0535d2);
    }

    .banner-link:focus {
      outline: 2px solid var(--eva-colors-focus, #0535d2);
      outline-offset: 2px;
      border-radius: 2px;
    }

    .banner-close {
      flex-shrink: 0;
      padding: var(--eva-spacing-xs, 0.5rem);
      background: transparent;
      border: none;
      cursor: pointer;
      color: var(--eva-colors-text, #333);
      font-size: 1.5rem;
      line-height: 1;
      transition: color 0.2s ease;
      margin: -0.25rem -0.25rem 0 0;
    }

    .banner-close:hover,
    .banner-close:focus {
      color: var(--eva-colors-text-dark, #000);
    }

    .banner-close:focus {
      outline: 2px solid var(--eva-colors-focus, #0535d2);
      outline-offset: 2px;
      border-radius: 2px;
    }

    /* Variant: success */
    :host([variant="success"]) .banner {
      background: var(--eva-colors-success-light, #d8eeca);
      border-left-color: var(--eva-colors-success, #278400);
    }

    :host([variant="success"]) .banner-icon svg {
      fill: var(--eva-colors-success, #278400);
    }

    /* Variant: warning */
    :host([variant="warning"]) .banner {
      background: var(--eva-colors-warning-light, #f9f4d4);
      border-left-color: var(--eva-colors-warning, #ee7100);
    }

    :host([variant="warning"]) .banner-icon svg {
      fill: var(--eva-colors-warning, #ee7100);
    }

    /* Variant: error */
    :host([variant="error"]) .banner {
      background: var(--eva-colors-error-light, #f3e9e8);
      border-left-color: var(--eva-colors-error, #d3080c);
    }

    :host([variant="error"]) .banner-icon svg {
      fill: var(--eva-colors-error, #d3080c);
    }

    /* Hidden state */
    :host([hidden]) {
      display: none;
    }

    @media print {
      :host([variant="info"]) .banner,
      :host([variant="warning"]) .banner {
        display: none;
      }

      .banner-close {
        display: none;
      }
    }
  `;

  @property({ type: String })
  variant: 'info' | 'success' | 'warning' | 'error' = 'info';

  @property({ type: String })
  heading = '';

  @property({ type: String })
  description = '';

  @property({ type: Boolean })
  dismissible = false;

  @property({ type: Boolean })
  showIcon = true;

  protected override render() {
    return html`
      <div class="banner" role="alert" aria-live="polite">
        <div class="banner-container">
          <div class="banner-content">
            ${this.showIcon ? this.renderIcon() : ''}
            
            <div class="banner-text">
              ${this.heading ? html`<p class="banner-heading">${this.heading}</p>` : ''}
              <div class="banner-description">
                <slot>${this.description}</slot>
              </div>
            </div>

            ${this.dismissible ? this.renderCloseButton() : ''}
          </div>
        </div>
      </div>
    `;
  }

  private renderIcon() {
    const icons = {
      info: html`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
      `,
      success: html`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      `,
      warning: html`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
        </svg>
      `,
      error: html`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
      `
    };

    return html`
      <div class="banner-icon" aria-hidden="true">
        ${icons[this.variant]}
      </div>
    `;
  }

  private renderCloseButton() {
    return html`
      <button
        class="banner-close"
        type="button"
        aria-label="${this.getMessage('closeLabel')}"
        @click="${this.handleClose}"
      >
        ×
      </button>
    `;
  }

  private handleClose(): void {
    this.emitEvent('gc-banner-close', {
      variant: this.variant,
      timestamp: new Date().toISOString()
    });

    this.setAttribute('hidden', '');
  }
}

registerMessages('gc-page-banner', {
  'en-CA': {
    'closeLabel': 'Close banner'
  },
  'fr-CA': {
    'closeLabel': 'Fermer la bannière'
  }
});
