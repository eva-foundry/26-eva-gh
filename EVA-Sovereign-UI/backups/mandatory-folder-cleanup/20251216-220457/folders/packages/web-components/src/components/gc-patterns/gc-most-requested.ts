import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

interface MostRequestedLink {
  label: string;
  href: string;
  icon?: string;
}

/**
 * gc-most-requested - Most Requested Links Pattern
 * 
 * Highlights top services/tasks on Government of Canada pages.
 * Displays 5-7 prominent links with optional icons.
 * 
 * @element gc-most-requested
 * 
 * @slot - Custom content (overrides links property)
 * 
 * @fires gc-most-requested-click - Fired when a link is clicked
 * 
 * @example
 * ```html
 * <gc-most-requested
 *   heading="Most requested"
 *   .links="${[
 *     { label: 'Employment Insurance', href: '/ei', icon: '💼' },
 *     { label: 'Passports', href: '/passports', icon: '🛂' }
 *   ]}">
 * </gc-most-requested>
 * ```
 */
@customElement('gc-most-requested')
export class GCMostRequested extends EVAElement {
  static override styles = css`
      :host {
        display: block;
        margin: var(--eva-spacing-xl, 2rem) 0;
      }

      .most-requested-container {
        background: var(--gc-most-requested-bg, #f5f5f5);
        padding: var(--eva-spacing-lg, 1.5rem) var(--eva-spacing-xl, 2rem);
        border-radius: var(--eva-border-radius-md, 8px);
        border-left: 4px solid var(--eva-colors-primary, #2572b4);
      }

      .heading {
        font-size: var(--eva-font-size-xl, 1.5rem);
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
        flex-wrap: wrap;
        gap: var(--eva-spacing-md, 1rem);
      }

      .link-item {
        margin: 0;
        flex: 0 0 auto;
      }

      .most-requested-link {
        display: inline-flex;
        align-items: center;
        gap: var(--eva-spacing-sm, 0.5rem);
        padding: var(--eva-spacing-sm, 0.5rem) var(--eva-spacing-md, 1rem);
        background: white;
        color: var(--eva-colors-link, #2572b4);
        text-decoration: none;
        border-radius: var(--eva-border-radius-sm, 4px);
        font-size: var(--eva-font-size-base, 1rem);
        font-weight: var(--eva-font-weight-medium, 500);
        transition: all 0.2s ease;
        border: 1px solid var(--eva-colors-border, #ddd);
        min-height: 44px;
      }

      .most-requested-link:hover {
        background: var(--eva-colors-link, #2572b4);
        color: white;
        text-decoration: none;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .most-requested-link:focus-visible {
        outline: 3px solid var(--eva-colors-focus, #4CAF50);
        outline-offset: 2px;
      }

      .link-icon {
        font-size: 1.25rem;
        flex-shrink: 0;
        width: 1.5rem;
        height: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* Responsive: scroll on very small screens */
      @media (max-width: 576px) {
        .links-list {
          flex-wrap: nowrap;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scroll-snap-type: x mandatory;
          scrollbar-width: thin;
        }

        .link-item {
          scroll-snap-align: start;
        }

        .most-requested-link {
          white-space: nowrap;
        }

        .heading {
          font-size: var(--eva-font-size-lg, 1.25rem);
        }
      }
    `;

  /**
   * Heading text for the section
   */
  @property({ type: String })
  heading: string = '';

  /**
   * Array of links to display
   */
  @property({ type: Array })
  links: MostRequestedLink[] = [];

  private handleLinkClick(event: MouseEvent, link: MostRequestedLink): void {
    this.emitEvent('gc-most-requested-click', {
      label: link.label,
      href: (event.currentTarget as HTMLAnchorElement).href,
      icon: link.icon
    });
  }

  protected override render() {
    const hasSlot = this.childElementCount > 0;
    const displayHeading = this.heading || this.getMessage('mostRequested');

    if (hasSlot) {
      return html`
        <section aria-labelledby="most-requested-heading">
          <h2 id="most-requested-heading" class="heading">${displayHeading}</h2>
          <slot></slot>
        </section>
      `;
    }

    return html`
      <section aria-labelledby="most-requested-heading">
        <div class="most-requested-container">
          <h2 id="most-requested-heading" class="heading">${displayHeading}</h2>
          <ul class="links-list" role="list">
            ${this.links.map(link => html`
              <li class="link-item">
                <a 
                  href="${link.href}"
                  class="most-requested-link"
                  @click="${(e: MouseEvent) => this.handleLinkClick(e, link)}"
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
      </section>
    `;
  }
}

// Register i18n messages
registerMessages('gc-most-requested', {
  'en-CA': {
    mostRequested: 'Most requested'
  },
  'fr-CA': {
    mostRequested: 'En demande'
  }
});

declare global {
  interface HTMLElementTagNameMap {
    'gc-most-requested': GCMostRequested;
  }
}
