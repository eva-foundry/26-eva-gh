import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

export interface Contributor {
  name: string;
  role?: string;
}

@customElement('gc-page-details')
export class GCPageDetails extends EVAElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--eva-fonts-family-base, 'Lato', sans-serif);
    }

    .page-details {
      border-top: 1px solid var(--eva-colors-border-primary, #e1e4e7);
      padding-top: var(--eva-spacing-lg, 16px);
      margin-top: var(--eva-spacing-xl, 24px);
      color: var(--eva-colors-text-secondary, #666);
      font-size: var(--eva-fonts-size-sm, 0.875rem);
    }

    .detail-item {
      margin-bottom: var(--eva-spacing-sm, 8px);
    }

    .detail-label {
      font-weight: var(--eva-fonts-weight-bold, 700);
      color: var(--eva-colors-text-primary, #333);
    }

    .detail-value {
      display: inline;
      margin-left: var(--eva-spacing-xs, 4px);
    }

    .contributors-list {
      display: inline;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .contributors-list li {
      display: inline;
    }

    .contributors-list li:not(:last-child)::after {
      content: ', ';
    }

    .contributor-role {
      font-style: italic;
      color: var(--eva-colors-text-secondary, #666);
    }

    @media (max-width: 768px) {
      .page-details {
        font-size: var(--eva-fonts-size-xs, 0.75rem);
      }
    }
  `;

  @property({ type: String })
  publishedDate: string = '';

  @property({ type: String })
  modifiedDate: string = '';

  @property({ type: Array })
  contributors: Contributor[] = [];

  @property({ type: String })
  contentId: string = '';

  /**
   * Format date to display format (YYYY-MM-DD)
   */
  private formatDate(isoDate: string): string {
    if (!isoDate) return '';
    
    try {
      const date = new Date(isoDate);
      const formatted = date.toISOString().split('T')[0];
      return formatted || '';
    } catch {
      return isoDate;
    }
  }

  /**
   * Format date for screen readers (long format)
   */
  private formatDateLong(isoDate: string): string {
    if (!isoDate) return '';
    
    try {
      const date = new Date(isoDate);
      const locale = this.locale === 'fr-CA' ? 'fr-CA' : 'en-CA';
      return date.toLocaleDateString(locale, { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return isoDate;
    }
  }

  protected override render() {
    return html`
      <div class="page-details">
        ${this.publishedDate ? html`
          <div class="detail-item">
            <span class="detail-label">${this.getMessage('publishedDate')}:</span>
            <time class="detail-value" datetime="${this.publishedDate}" aria-label="${this.formatDateLong(this.publishedDate)}">
              ${this.formatDate(this.publishedDate)}
            </time>
          </div>
        ` : ''}

        ${this.modifiedDate ? html`
          <div class="detail-item">
            <span class="detail-label">${this.getMessage('modifiedDate')}:</span>
            <time class="detail-value" datetime="${this.modifiedDate}" aria-label="${this.formatDateLong(this.modifiedDate)}">
              ${this.formatDate(this.modifiedDate)}
            </time>
          </div>
        ` : ''}

        ${this.contributors.length > 0 ? html`
          <div class="detail-item">
            <span class="detail-label">${this.getMessage('contributors')}:</span>
            <ul class="contributors-list detail-value">
              ${this.contributors.map(contributor => html`
                <li>
                  ${contributor.name}${contributor.role ? html` <span class="contributor-role">(${contributor.role})</span>` : ''}
                </li>
              `)}
            </ul>
          </div>
        ` : ''}

        ${this.contentId ? html`
          <div class="detail-item">
            <span class="detail-label">${this.getMessage('contentId')}:</span>
            <span class="detail-value">${this.contentId}</span>
          </div>
        ` : ''}
      </div>
    `;
  }
}

registerMessages('gc-page-details', {
  'en-CA': {
    publishedDate: 'Date published',
    modifiedDate: 'Date modified',
    contributors: 'Contributors',
    contentId: 'Content ID'
  },
  'fr-CA': {
    publishedDate: 'Date de publication',
    modifiedDate: 'Date de modification',
    contributors: 'Contributeurs',
    contentId: 'ID de contenu'
  }
});
