import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

interface ServiceSection {
  heading: string;
  links: Array<{ label: string; href: string; icon?: string }>;
}

/**
 * gc-services-info - Services and Information Doormat Pattern
 * 
 * Government of Canada design pattern for service discovery.
 * Displays topic sections with lists of related links in a responsive grid.
 * 
 * @element gc-services-info
 * 
 * @slot - Custom content (overrides sections property)
 * 
 * @fires gc-services-link-click - Fired when a service link is clicked
 * 
 * @example
 * ```html
 * <gc-services-info
 *   .sections="${[
 *     {
 *       heading: 'Jobs and workplace',
 *       links: [
 *         { label: 'Find a job', href: '/jobs/find' },
 *         { label: 'Training', href: '/jobs/training' },
 *         { label: 'Hiring programs', href: '/jobs/hiring' }
 *       ]
 *     }
 *   ]}"
 *   columns="3">
 * </gc-services-info>
 * ```
 */
@customElement('gc-services-info')
export class GCServicesInfo extends EVAElement {
  static override styles = css`
      :host {
        display: block;
        margin: var(--eva-spacing-xl, 2rem) 0;
      }

      .services-grid {
        display: grid;
        grid-template-columns: repeat(var(--gc-services-columns, 3), 1fr);
        gap: var(--eva-spacing-xl, 2rem);
        margin: 0;
        padding: 0;
      }

      .service-section {
        display: flex;
        flex-direction: column;
      }

      .section-heading {
        font-size: var(--eva-font-size-lg, 1.25rem);
        font-weight: var(--eva-font-weight-bold, 700);
        margin: 0 0 var(--eva-spacing-md, 1rem);
        color: var(--eva-colors-text-primary, #333);
        font-family: var(--gc-font-family, Lato, sans-serif);
      }

      .links-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: var(--eva-spacing-sm, 0.5rem);
      }

      .link-item {
        margin: 0;
      }

      .service-link {
        color: var(--eva-colors-link, #2572b4);
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: var(--eva-spacing-xs, 0.25rem);
        font-size: var(--eva-font-size-base, 1rem);
        line-height: 1.5;
        transition: color 0.2s ease, text-decoration 0.2s ease;
      }

      .service-link:hover,
      .service-link:focus {
        color: var(--eva-colors-link-hover, #0535d2);
        text-decoration: underline;
        text-decoration-thickness: 2px;
        text-underline-offset: 3px;
      }

      .service-link:focus-visible {
        outline: 3px solid var(--eva-colors-focus, #4CAF50);
        outline-offset: 2px;
        border-radius: var(--eva-border-radius-sm, 4px);
      }

      .link-icon {
        width: 1.25rem;
        height: 1.25rem;
        flex-shrink: 0;
      }

      /* Responsive: 2 columns on tablet */
      @media (max-width: 992px) {
        .services-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: var(--eva-spacing-lg, 1.5rem);
        }
      }

      /* Responsive: 1 column on mobile */
      @media (max-width: 576px) {
        .services-grid {
          grid-template-columns: 1fr;
          gap: var(--eva-spacing-lg, 1.5rem);
        }

        .section-heading {
          font-size: var(--eva-font-size-md, 1.125rem);
        }
      }
    `;

  /**
   * Service sections to display
   */
  @property({ type: Array })
  sections: ServiceSection[] = [];

  /**
   * Number of columns in desktop layout (2 or 3)
   */
  @property({ type: Number })
  columns: 2 | 3 = 3;

  protected override firstUpdated(): void {
    this.style.setProperty('--gc-services-columns', this.columns.toString());
  }

  protected override updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('columns')) {
      this.style.setProperty('--gc-services-columns', this.columns.toString());
    }
  }

  private handleLinkClick(event: MouseEvent, section: string, link: string): void {
    this.emitEvent('gc-services-link-click', {
      section,
      link,
      href: (event.currentTarget as HTMLAnchorElement).href
    });
  }

  protected override render() {
    const hasSlot = this.childElementCount > 0;

    if (hasSlot) {
      return html`
        <nav aria-label="${this.getMessage('servicesAndInfo')}" role="navigation">
          <slot></slot>
        </nav>
      `;
    }

    return html`
      <nav aria-label="${this.getMessage('servicesAndInfo')}" role="navigation">
        <div class="services-grid">
          ${this.sections.map(section => html`
            <div class="service-section">
              <h2 class="section-heading">${section.heading}</h2>
              <ul class="links-list">
                ${section.links.map(link => html`
                  <li class="link-item">
                    <a 
                      href="${link.href}"
                      class="service-link"
                      @click="${(e: MouseEvent) => this.handleLinkClick(e, section.heading, link.label)}"
                    >
                      ${link.icon ? html`
                        <span class="link-icon" aria-hidden="true">${link.icon}</span>
                      ` : ''}
                      ${link.label}
                    </a>
                  </li>
                `)}
              </ul>
            </div>
          `)}
        </div>
      </nav>
    `;
  }
}

// Register i18n messages
registerMessages('gc-services-info', {
  'en-CA': {
    servicesAndInfo: 'Services and information'
  },
  'fr-CA': {
    servicesAndInfo: 'Services et renseignements'
  }
});

declare global {
  interface HTMLElementTagNameMap {
    'gc-services-info': GCServicesInfo;
  }
}
