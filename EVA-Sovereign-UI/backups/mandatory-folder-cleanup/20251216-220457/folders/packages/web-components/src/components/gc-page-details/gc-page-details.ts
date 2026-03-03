import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../utils/i18n.js';

// Register translations
registerMessages('en-CA', {
  'pageDetails.dateModified': 'Date modified:',
  'pageDetails.publisher': 'Publisher:',
  'pageDetails.contentType': 'Content type:',
  'pageDetails.identifier': 'Government of Canada identifier:',
});

registerMessages('fr-CA', {
  'pageDetails.dateModified': 'Date de modification :',
  'pageDetails.publisher': 'Éditeur :',
  'pageDetails.contentType': 'Type de contenu :',
  'pageDetails.identifier': 'Identificateur du gouvernement du Canada :',
});

export interface PageMetadata {
  dateModified?: string; // ISO 8601 date (YYYY-MM-DD)
  publisher?: string;
  contentType?: string;
  identifier?: string;
}

/**
 * GC Page Details Component
 *
 * Displays page metadata including date modified, publisher, content type,
 * and government identifier. Follows GC Design System metadata patterns.
 *
 * @element gc-page-details
 *
 * @prop {string} dateModified - Last modified date (ISO 8601: YYYY-MM-DD)
 * @prop {string} publisher - Publishing organization
 * @prop {string} contentType - Content type (e.g., "Guidance", "Form", "Report")
 * @prop {string} identifier - Government identifier (e.g., ESDC-XXX-123)
 * @prop {boolean} compact - Compact layout for tight spaces
 *
 * @fires gc-page-details-ready - Emitted when component is initialized
 *
 * @example
 * ```html
 * <gc-page-details
 *   date-modified="2025-12-07"
 *   publisher="Employment and Social Development Canada"
 *   content-type="Guidance"
 *   identifier="ESDC-CPP-001"
 * ></gc-page-details>
 * ```
 */
export class GCPageDetails extends EVAElement {
  static styles = css`
    :host {
      display: block;
      font-family: Lato, 'Helvetica Neue', Arial, sans-serif;
      color: #333;
      line-height: 1.5;
    }

    .page-details {
      padding: 1rem 0;
      border-top: 1px solid #e0e0e0;
      margin-top: 2rem;
    }

    :host([compact]) .page-details {
      padding: 0.5rem 0;
      margin-top: 1rem;
    }

    .details-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    :host([compact]) .details-list {
      gap: 0.25rem;
    }

    .detail-item {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      font-size: 0.875rem;
    }

    :host([compact]) .detail-item {
      font-size: 0.8125rem;
    }

    .detail-label {
      font-weight: 700;
      color: #284162;
    }

    .detail-value {
      color: #333;
    }

    .detail-value time {
      font-weight: 400;
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      .page-details {
        border-top-width: 3px;
        border-top-color: #000;
      }

      .detail-label,
      .detail-value {
        color: #000;
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      * {
        transition: none !important;
      }
    }

    /* Print styles */
    @media print {
      .page-details {
        border-top-color: #000;
      }
    }
  `;

  @property({ type: String, attribute: 'date-modified' })
  dateModified?: string;

  @property({ type: String })
  publisher?: string;

  @property({ type: String, attribute: 'content-type' })
  contentType?: string;

  @property({ type: String })
  identifier?: string;

  @property({ type: Boolean, reflect: true })
  compact = false;

  connectedCallback() {
    super.connectedCallback();
    this.dispatchEvent(
      new CustomEvent('gc-page-details-ready', {
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Format date for display based on locale
   */
  private _formatDate(isoDate: string): string {
    try {
      const date = new Date(isoDate);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return isoDate;
      }
      const locale = this.locale === 'fr-CA' ? 'fr-CA' : 'en-CA';

      return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      // Return original if parsing fails
      return isoDate;
    }
  }

  render() {
    const hasAnyDetail =
      this.dateModified || this.publisher || this.contentType || this.identifier;

    if (!hasAnyDetail) {
      return html``;
    }

    return html`
      <section class="page-details" part="container" aria-label="${this.t('pageDetails.dateModified')}">
        <dl class="details-list" part="details-list">
          ${this.dateModified
            ? html`
                <div class="detail-item" part="detail-item">
                  <dt class="detail-label" part="detail-label">
                    ${this.t('pageDetails.dateModified')}
                  </dt>
                  <dd class="detail-value" part="detail-value">
                    <time datetime="${this.dateModified}">
                      ${this._formatDate(this.dateModified)}
                    </time>
                  </dd>
                </div>
              `
            : ''}
          ${this.publisher
            ? html`
                <div class="detail-item" part="detail-item">
                  <dt class="detail-label" part="detail-label">
                    ${this.t('pageDetails.publisher')}
                  </dt>
                  <dd class="detail-value" part="detail-value">${this.publisher}</dd>
                </div>
              `
            : ''}
          ${this.contentType
            ? html`
                <div class="detail-item" part="detail-item">
                  <dt class="detail-label" part="detail-label">
                    ${this.t('pageDetails.contentType')}
                  </dt>
                  <dd class="detail-value" part="detail-value">${this.contentType}</dd>
                </div>
              `
            : ''}
          ${this.identifier
            ? html`
                <div class="detail-item" part="detail-item">
                  <dt class="detail-label" part="detail-label">
                    ${this.t('pageDetails.identifier')}
                  </dt>
                  <dd class="detail-value" part="detail-value">${this.identifier}</dd>
                </div>
              `
            : ''}
        </dl>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gc-page-details': GCPageDetails;
  }
}

customElements.define('gc-page-details', GCPageDetails);
