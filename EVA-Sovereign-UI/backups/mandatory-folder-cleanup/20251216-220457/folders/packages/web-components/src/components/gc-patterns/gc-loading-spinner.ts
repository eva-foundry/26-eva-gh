import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

@customElement('gc-loading-spinner')
export class GCLoadingSpinner extends EVAElement {
  static override styles = css`
    :host {
      display: inline-block;
    }

    .spinner-container {
      display: inline-flex;
      align-items: center;
      gap: var(--eva-spacing-sm, 0.75rem);
    }

    .spinner {
      width: var(--spinner-size, 40px);
      height: var(--spinner-size, 40px);
      border: 4px solid var(--eva-colors-border-light, #f0f0f0);
      border-top-color: var(--eva-colors-primary, #26374a);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    .spinner-text {
      color: var(--eva-colors-text, #333);
      font-family: var(--eva-fonts-body);
      font-size: var(--eva-font-size-md, 1rem);
      line-height: 1.5;
    }

    /* Size variants */
    :host([size="small"]) {
      --spinner-size: 24px;
    }

    :host([size="small"]) .spinner {
      border-width: 3px;
    }

    :host([size="small"]) .spinner-text {
      font-size: var(--eva-font-size-sm, 0.875rem);
    }

    :host([size="large"]) {
      --spinner-size: 56px;
    }

    :host([size="large"]) .spinner {
      border-width: 5px;
    }

    :host([size="large"]) .spinner-text {
      font-size: var(--eva-font-size-lg, 1.125rem);
    }

    /* Color variants */
    :host([variant="light"]) .spinner {
      border-color: rgba(255, 255, 255, 0.3);
      border-top-color: var(--eva-colors-white, #fff);
    }

    :host([variant="light"]) .spinner-text {
      color: var(--eva-colors-white, #fff);
    }

    :host([variant="primary"]) .spinner {
      border-top-color: var(--eva-colors-primary, #26374a);
    }

    :host([variant="success"]) .spinner {
      border-top-color: var(--eva-colors-success, #278400);
    }

    :host([variant="warning"]) .spinner {
      border-top-color: var(--eva-colors-warning, #ee7100);
    }

    :host([variant="error"]) .spinner {
      border-top-color: var(--eva-colors-error, #d3080c);
    }

    /* Centered layout */
    :host([centered]) {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: var(--eva-spacing-lg, 1.5rem) 0;
    }

    /* Overlay mode */
    :host([overlay]) {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(255, 255, 255, 0.9);
      z-index: 9998;
    }

    :host([overlay]) .spinner-container {
      flex-direction: column;
      gap: var(--eva-spacing-md, 1rem);
      padding: var(--eva-spacing-xl, 2rem);
      background: var(--eva-colors-white, #fff);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    @media print {
      :host {
        display: none;
      }
    }
  `;

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: String })
  variant: 'default' | 'light' | 'primary' | 'success' | 'warning' | 'error' = 'default';

  @property({ type: String })
  text = '';

  @property({ type: Boolean })
  centered = false;

  @property({ type: Boolean })
  overlay = false;

  protected override render() {
    const loadingText = this.text || this.getMessage('loading');

    return html`
      <div class="spinner-container">
        <div
          class="spinner"
          role="status"
          aria-label="${loadingText}"
          aria-live="polite"
        ></div>
        ${this.text || !this.overlay ? html`
          <span class="spinner-text" aria-hidden="true">
            ${loadingText}
          </span>
        ` : ''}
      </div>
    `;
  }
}

registerMessages('gc-loading-spinner', {
  'en-CA': {
    'loading': 'Loading...'
  },
  'fr-CA': {
    'loading': 'Chargement...'
  }
});
