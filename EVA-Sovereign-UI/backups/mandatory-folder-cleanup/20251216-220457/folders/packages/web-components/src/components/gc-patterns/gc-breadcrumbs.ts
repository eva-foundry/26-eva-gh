import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * Breadcrumb navigation item
 */
interface BreadcrumbItem {
  /** Display text for the breadcrumb */
  text: string;
  /** Optional link URL (omit for current page) */
  href?: string;
}

/**
 * GC Breadcrumbs Component
 * MANDATORY Government of Canada breadcrumb navigation pattern
 * 
 * Provides hierarchical navigation trail showing user's current location
 * in the site structure. Implements WCAG 2.2 AAA accessibility standards
 * with proper ARIA landmarks and semantic HTML.
 * 
 * Implements: https://design.canada.ca/common-design-patterns/breadcrumb-trail.html
 * 
 * @element gc-breadcrumbs
 * 
 * @fires gc-breadcrumb-click - Fires when a breadcrumb link is clicked. Detail: { item: BreadcrumbItem, index: number }
 * 
 * @example
 * ```html
 * <!-- Basic breadcrumb trail -->
 * <gc-breadcrumbs
 *   .items="${[
 *     { text: 'Home', href: '/' },
 *     { text: 'Services', href: '/services' },
 *     { text: 'Current Page' }
 *   ]}"
 * ></gc-breadcrumbs>
 * ```
 * 
 * @example
 * ```html
 * <!-- With custom ARIA label -->
 * <gc-breadcrumbs
 *   aria-label="Site navigation"
 *   .items="${[
 *     { text: 'Canada.ca', href: 'https://canada.ca' },
 *     { text: 'Benefits', href: '/benefits' },
 *     { text: 'Employment Insurance' }
 *   ]}"
 * ></gc-breadcrumbs>
 * ```
 * 
 * @example
 * ```html
 * <!-- French locale -->
 * <gc-breadcrumbs
 *   locale="fr-CA"
 *   .items="${[
 *     { text: 'Accueil', href: '/' },
 *     { text: 'Services', href: '/services' },
 *     { text: 'Page actuelle' }
 *   ]}"
 * ></gc-breadcrumbs>
 * ```
 */
@customElement('gc-breadcrumbs')
export class GCBreadcrumbs extends EVAElement {
  /**
   * Component name for i18n lookup
   */
  protected override componentName = 'gc-breadcrumbs';

  static override styles = css`
    :host {
      display: block;
      font-family: var(--eva-fonts-body);
    }

    nav {
      padding: var(--eva-spacing-md, 1rem) 0;
    }

    .breadcrumbs {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: var(--eva-spacing-sm, 0.75rem);
    }

    .breadcrumb-item {
      display: flex;
      align-items: center;
    }

    .breadcrumb-link {
      color: var(--eva-colors-link, #295376);
      text-decoration: underline;
      transition: color 0.2s;
    }

    .breadcrumb-link:hover {
      color: var(--eva-colors-link-hover, #0535d2);
    }

    .breadcrumb-link:focus {
      outline: 3px solid var(--eva-colors-focus, #269abc);
      outline-offset: 2px;
    }

    .breadcrumb-link:visited {
      color: var(--eva-colors-link-visited, #7834bc);
    }

    .breadcrumb-current {
      color: var(--eva-colors-text, #333);
      font-weight: 600;
    }

    .breadcrumb-separator {
      margin: 0 var(--eva-spacing-xs, 0.5rem);
      color: var(--eva-colors-text-muted, #666);
      user-select: none;
    }

    @media (max-width: 768px) {
      .breadcrumbs {
        font-size: var(--eva-font-size-sm, 0.875rem);
      }

      .breadcrumb-separator {
        margin: 0 var(--eva-spacing-2xs, 0.25rem);
      }
    }

    /* Compact mode */
    :host([compact]) nav {
      padding: var(--eva-spacing-sm, 0.75rem) 0;
    }

    :host([compact]) .breadcrumbs {
      font-size: var(--eva-font-size-sm, 0.875rem);
    }

    /* Inverted colors */
    :host([inverted]) .breadcrumb-link {
      color: var(--eva-colors-link-inverted, #fff);
    }

    :host([inverted]) .breadcrumb-link:hover {
      color: var(--eva-colors-link-inverted-hover, #ccc);
    }

    :host([inverted]) .breadcrumb-current {
      color: var(--eva-colors-text-inverted, #fff);
    }

    :host([inverted]) .breadcrumb-separator {
      color: var(--eva-colors-text-inverted-muted, #ccc);
    }

    /* Ellipsis button for collapsed breadcrumbs */
    .breadcrumb-ellipsis {
      background: none;
      border: none;
      color: var(--eva-colors-link, #295376);
      text-decoration: underline;
      cursor: pointer;
      padding: 0;
      font: inherit;
    }

    .breadcrumb-ellipsis:hover {
      color: var(--eva-colors-link-hover, #0535d2);
    }

    .breadcrumb-ellipsis:focus {
      outline: 3px solid var(--eva-colors-focus, #269abc);
      outline-offset: 2px;
    }

    :host([inverted]) .breadcrumb-ellipsis {
      color: var(--eva-colors-link-inverted, #fff);
    }

    :host([inverted]) .breadcrumb-ellipsis:hover {
      color: var(--eva-colors-link-inverted-hover, #ccc);
    }

    /* Hidden screen reader text */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    @media print {
      :host {
        display: none;
      }
    }
  `;

  /**
   * Array of breadcrumb items to display in navigation trail.
   * Last item (without href) is treated as current page.
   */
  @property({ type: Array })
  items: BreadcrumbItem[] = [];

  /**
   * Character or string used to separate breadcrumb items
   * @default '›'
   */
  @property({ type: String })
  separator = '›';

  /**
   * Whether to automatically collapse breadcrumbs when exceeding maxItems
   * @default true
   */
  @property({ type: Boolean, attribute: 'auto-collapse' })
  autoCollapse = true;

  /**
   * Maximum number of breadcrumb items to show before collapsing
   * @default 3
   */
  @property({ type: Number, attribute: 'max-items' })
  maxItems = 3;

  /**
   * Whether to use compact styling
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  compact = false;

  /**
   * Whether to use inverted color scheme
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  inverted = false;

  /**
   * Whether to include structured data (JSON-LD) for breadcrumbs
   * @default true
   */
  @property({ type: Boolean, attribute: 'show-structured-data' })
  showStructuredData = true;

  /**
   * Locale for i18n messages
   * @default 'en-CA'
   */
  @property({ type: String })
  locale = 'en-CA';

  /**
   * Internal state for collapsed breadcrumbs
   */
  private _isExpanded = false;

  protected override render() {
    const hasItems = this.items.length > 0;
    
    if (!hasItems) {
      // Return empty for no items
      return html``;
    }

    const breadcrumbItems = this.items;
    const shouldCollapse = this.autoCollapse && breadcrumbItems.length > this.maxItems && !this._isExpanded;
    
    let displayItems = breadcrumbItems;
    if (shouldCollapse) {
      // Show first item, ellipsis, and last 2 items
      const firstItem = breadcrumbItems[0];
      const lastItems = breadcrumbItems.slice(-2);
      displayItems = [firstItem, ...lastItems];
    }

    return html`
      <span class="sr-only">${this.getMessage('youAreHere')}</span>
      <nav aria-label="${this.getMessage('breadcrumbLabel')}">
        <ol class="breadcrumbs">
          ${displayItems.map((item, index, array) => {
            const isLast = index === array.length - 1;
            const isFirst = index === 0;
            const shouldShowEllipsis = shouldCollapse && isFirst && breadcrumbItems.length > this.maxItems;
            
            return html`
              <li class="breadcrumb-item ${isLast ? 'current' : ''}">
                ${!isLast && item.href
                  ? html`
                      <a 
                        href="${item.href}" 
                        class="breadcrumb-link"
                        @click="${this._handleLinkClick}"
                        data-index="${this._getOriginalIndex(item)}"
                      >
                        ${item.text.trim()}
                      </a>
                    `
                  : html`<span 
                        class="breadcrumb-current" 
                        aria-current="${isLast ? 'page' : 'false'}"
                      >${item.text.trim()}</span>`
                }
                ${shouldShowEllipsis
                  ? html`
                      <span class="breadcrumb-separator" aria-hidden="true">${this.separator}</span>
                      <li class="breadcrumb-item">
                        <button 
                          class="breadcrumb-ellipsis"
                          aria-label="${this.getMessage('showAllLevels')}"
                          @click="${this._toggleExpanded}"
                        >
                          …
                        </button>
                      </li>
                      <span class="breadcrumb-separator" aria-hidden="true">${this.separator}</span>
                    `
                  : !isLast
                    ? html`
                        <span class="breadcrumb-separator" aria-hidden="true">
                          ${this.separator}
                        </span>
                      `
                    : null
                }
              </li>
            `;
          })}
        </ol>
      </nav>
      ${this.showStructuredData ? this._renderStructuredData() : ''}
    `;
  }

  private _getOriginalIndex(item: BreadcrumbItem): number {
    return this.items.findIndex(originalItem => originalItem === item);
  }

  private _handleLinkClick(event: Event) {
    const link = event.target as HTMLAnchorElement;
    const index = parseInt(link.dataset.index || '0');
    const item = this.items[index];
    
    const clickEvent = new CustomEvent('gc-breadcrumb-click', {
      detail: { item, index },
      bubbles: true,
      composed: true
    });
    
    this.dispatchEvent(clickEvent);
  }

  private _toggleExpanded() {
    this._isExpanded = !this._isExpanded;
    // When expanding, disable autoCollapse as per test expectations
    if (this._isExpanded) {
      this.autoCollapse = false;
    }
    this.requestUpdate();
  }

  private _renderStructuredData() {
    if (!this.items.length) return '';

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': this.items.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.text,
        ...(item.href && { 'item': item.href })
      }))
    };

    return html`
      <script type="application/ld+json">
        ${JSON.stringify(structuredData)}
      </script>
    `;
  }
}

registerMessages('gc-breadcrumbs', {
  'en-CA': {
    breadcrumbLabel: 'You are here:',
    home: 'Home',
    youAreHere: 'You are here:',
    showAllLevels: 'Show all breadcrumb levels'
  },
  'fr-CA': {
    breadcrumbLabel: 'Vous êtes ici :',
    home: 'Accueil', 
    youAreHere: 'Vous êtes ici :',
    showAllLevels: 'Afficher tous les niveaux'
  }
});
