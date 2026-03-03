import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

@customElement('gc-breadcrumb')
export class GCBreadcrumb extends EVAElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--eva-fonts-body);
      font-size: var(--eva-font-size-sm, 0.875rem);
      line-height: 1.5;
    }

    nav {
      padding: var(--eva-spacing-md, 1rem) 0;
    }

    .breadcrumb-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--eva-spacing-xs, 0.5rem);
      list-style: none;
      margin: 0;
      padding: 0;
      align-items: center;
    }

    .breadcrumb-item {
      display: flex;
      align-items: center;
      gap: var(--eva-spacing-xs, 0.5rem);
    }

    .breadcrumb-link {
      color: var(--eva-colors-link, #26374a);
      text-decoration: underline;
      transition: color 0.2s ease;
    }

    .breadcrumb-link:hover,
    .breadcrumb-link:focus {
      color: var(--eva-colors-link-hover, #0535d2);
      text-decoration: none;
    }

    .breadcrumb-link:focus {
      outline: 2px solid var(--eva-colors-focus, #0535d2);
      outline-offset: 2px;
      border-radius: 2px;
    }

    .breadcrumb-current {
      color: var(--eva-colors-text, #333);
      font-weight: 600;
    }

    .separator {
      color: var(--eva-colors-text-light, #666);
      user-select: none;
      flex-shrink: 0;
    }

    .separator::before {
      content: '›';
      font-size: 1.2em;
      line-height: 1;
    }

    /* Responsive: stack on small screens if needed */
    @media (max-width: 768px) {
      .breadcrumb-list {
        font-size: var(--eva-font-size-xs, 0.75rem);
      }
    }

    /* Print styles */
    @media print {
      nav {
        padding: 0.5rem 0;
      }

      .breadcrumb-link {
        color: #000;
        text-decoration: none;
      }

      .separator::before {
        content: ' > ';
      }
    }
  `;

  @property({ type: Array })
  items: BreadcrumbItem[] = [];

  @property({ type: Boolean })
  hideHomeLink = false;

  protected override render() {
    const homeItem: BreadcrumbItem = {
      label: this.getMessage('homeLabel'),
      href: '/'
    };

    const allItems = this.hideHomeLink ? this.items : [homeItem, ...this.items];

    if (allItems.length === 0) {
      return html``;
    }

    return html`
      <nav aria-label="${this.getMessage('ariaLabel')}">
        <ol class="breadcrumb-list">
          ${allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            
            return html`
              <li class="breadcrumb-item">
                ${isLast
                  ? html`
                      <span class="breadcrumb-current" aria-current="page">
                        ${item.label}
                      </span>
                    `
                  : html`
                      <a
                        href="${item.href || '#'}"
                        class="breadcrumb-link"
                        @click="${(e: MouseEvent) => this.handleLinkClick(e, item, index)}"
                      >
                        ${item.label}
                      </a>
                    `
                }
                ${!isLast ? html`<span class="separator" aria-hidden="true"></span>` : ''}
              </li>
            `;
          })}
        </ol>
      </nav>
    `;
  }

  private handleLinkClick(e: MouseEvent, item: BreadcrumbItem, index: number): void {
    this.emitEvent('gc-breadcrumb-click', {
      item,
      index,
      href: item.href
    });
  }
}

registerMessages('gc-breadcrumb', {
  'en-CA': {
    'homeLabel': 'Home',
    'ariaLabel': 'Breadcrumb navigation'
  },
  'fr-CA': {
    'homeLabel': 'Accueil',
    'ariaLabel': 'Fil d\'ariane'
  }
});
