import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../utils/i18n.js';

// Register translations
registerMessages('en-CA', {
  'dateModified.label': 'Date modified:',
});

registerMessages('fr-CA', {
  'dateModified.label': 'Date de modification :',
});

export type DateFormat = 'long' | 'short' | 'iso';

/**
 * GC Date Modified Component
 *
 * Displays "Date modified" label with formatted date timestamp.
 * Standard GC Design System pattern for page metadata.
 *
 * @element gc-date-modified
 *
 * @prop {string} date - Date in ISO 8601 format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss)
 * @prop {DateFormat} format - Display format: 'long', 'short', or 'iso' (default: 'long')
 * @prop {boolean} hideLabel - Hide the "Date modified:" label (default: false)
 * @prop {boolean} inline - Display label and date on same line (default: false)
 *
 * @fires gc-date-modified-ready - Emitted when component is initialized
 *
 * @example
 * ```html
 * <gc-date-modified date="2025-12-07"></gc-date-modified>
 * <gc-date-modified date="2025-12-07" format="short"></gc-date-modified>
 * <gc-date-modified date="2025-12-07T14:30:00" hide-label></gc-date-modified>
 * ```
 */
export class GCDateModified extends EVAElement {
  static styles = css`
    :host {
      display: block;
      font-family: Lato, 'Helvetica Neue', Arial, sans-serif;
      color: #333;
      line-height: 1.5;
    }

    :host([inline]) {
      display: inline-block;
    }

    .date-modified {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      font-size: 0.875rem;
    }

    :host([inline]) .date-modified {
      flex-direction: row;
      gap: 0.5rem;
    }

    .date-label {
      font-weight: 700;
      color: #284162;
    }

    .date-value {
      color: #333;
    }

    .date-value time {
      font-weight: 400;
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      .date-label,
      .date-value {
        color: #000;
        font-weight: 700;
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
      .date-modified {
        font-size: 0.75rem;
      }
    }
  `;

  @property({ type: String })
  date?: string;

  @property({ type: String })
  format: DateFormat = 'long';

  @property({ type: Boolean, attribute: 'hide-label' })
  hideLabel = false;

  @property({ type: Boolean, reflect: true })
  inline = false;

  connectedCallback() {
    super.connectedCallback();
    this.dispatchEvent(
      new CustomEvent('gc-date-modified-ready', {
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Format date for display based on locale and format option
   */
  private _formatDate(isoDate: string): string {
    try {
      const date = new Date(isoDate);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return isoDate;
      }

      const locale = this.locale === 'fr-CA' ? 'fr-CA' : 'en-CA';

      switch (this.format) {
        case 'short':
          // Numeric format: YYYY-MM-DD
          return date.toLocaleDateString(locale, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });

        case 'iso':
          // ISO 8601 format
          return isoDate.split('T')[0]; // Return YYYY-MM-DD part

        case 'long':
        default:
          // Full text format: Month DD, YYYY
          return date.toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
      }
    } catch (error) {
      // Return original if parsing fails
      return isoDate;
    }
  }

  render() {
    if (!this.date) {
      return html``;
    }

    return html`
      <div class="date-modified" part="container">
        ${!this.hideLabel
          ? html`<span class="date-label" part="label">${this.t('dateModified.label')}</span>`
          : ''}
        <span class="date-value" part="value">
          <time datetime="${this.date}" part="time">${this._formatDate(this.date)}</time>
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gc-date-modified': GCDateModified;
  }
}

customElements.define('gc-date-modified', GCDateModified);
