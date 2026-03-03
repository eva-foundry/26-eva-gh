import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../utils/i18n.js';

// Register translations
registerMessages('gc-side-nav', {
  'sidenav.navigation': {
    'en-CA': 'Side navigation',
    'fr-CA': 'Navigation latérale',
  },
  'sidenav.expand': {
    'en-CA': 'Expand',
    'fr-CA': 'Développer',
  },
  'sidenav.collapse': {
    'en-CA': 'Collapse',
    'fr-CA': 'Réduire',
  },
  'sidenav.currentSection': {
    'en-CA': 'Current section',
    'fr-CA': 'Section actuelle',
  },
  'sidenav.currentPage': {
    'en-CA': 'Current page',
    'fr-CA': 'Page actuelle',
  },
});

export interface SideNavItem {
  text: string;
  href?: string;
  id?: string;
  current?: boolean;
  children?: SideNavItem[];
  expanded?: boolean;
  icon?: string;
  badge?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

/**
 * GC Side Navigation Component
 *
 * Secondary/sidebar navigation for multi-level content hierarchies.
 * Follows Government of Canada design patterns for sidebar navigation.
 *
 * @element gc-side-nav
 *
 * @fires {CustomEvent<{item: SideNavItem, path: number[]}>} gc-side-nav-click - Fired when navigation item clicked
 * @fires {CustomEvent<{item: SideNavItem, expanded: boolean}>} gc-side-nav-toggle - Fired when section expanded/collapsed
 *
 * @cssprop [--gc-sidenav-width=250px] - Width of the side navigation
 * @cssprop [--gc-sidenav-bg-color=#f5f5f5] - Background color
 * @cssprop [--gc-sidenav-border-color=#ddd] - Border color
 * @cssprop [--gc-sidenav-link-color=#284162] - Link text color
 * @cssprop [--gc-sidenav-current-bg=#284162] - Current page background
 * @cssprop [--gc-sidenav-current-color=#fff] - Current page text color
 *
 * @csspart container - The main navigation container
 * @csspart nav-list - The navigation list
 * @csspart nav-item - Individual navigation items
 * @csspart nav-link - Navigation links
 * @csspart toggle-button - Expand/collapse buttons
 */
@customElement('gc-side-nav')
export class GCSideNav extends EVAElement {
  static override styles = css`
    :host {
      display: block;
      font-family: Lato, sans-serif;
      font-size: 1rem;
      line-height: 1.5;
    }

    .side-nav {
      width: var(--gc-sidenav-width, 250px);
      background: var(--gc-sidenav-bg-color, #f5f5f5);
      border-right: 1px solid var(--gc-sidenav-border-color, #ddd);
      height: 100%;
      overflow-y: auto;
    }

    .nav-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav-item {
      position: relative;
    }

    .nav-link {
      display: flex;
      align-items: center;
      padding: 0.75rem 1rem;
      color: var(--gc-sidenav-link-color, #284162);
      text-decoration: none;
      cursor: pointer;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      font-size: 1rem;
      font-family: inherit;
      transition: background-color 0.2s ease;
      min-height: 44px;
      gap: 0.5rem;
    }

    .nav-link:hover:not(.disabled) {
      background: rgba(40, 65, 98, 0.1);
    }

    .nav-link:focus {
      outline: 3px solid #0c2447;
      outline-offset: -3px;
      z-index: 1;
    }

    .nav-link.current {
      background: var(--gc-sidenav-current-bg, #284162);
      color: var(--gc-sidenav-current-color, #fff);
      font-weight: 700;
      border-left: 4px solid #0c2447;
    }

    .nav-link.has-children {
      padding-right: 2.5rem;
    }

    .nav-link.disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    .nav-icon {
      flex-shrink: 0;
      width: 1.25rem;
      height: 1.25rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .nav-text {
      flex: 1;
    }

    .nav-badge {
      flex-shrink: 0;
      background: #d32f2f;
      color: white;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.125rem 0.5rem;
      border-radius: 1rem;
      min-width: 1.25rem;
      text-align: center;
    }

    .toggle-button {
      position: absolute;
      right: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.25rem;
      width: 1.5rem;
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: inherit;
      transition: transform 0.2s ease;
    }

    .toggle-button:focus {
      outline: 2px solid #0c2447;
      outline-offset: 2px;
      border-radius: 2px;
    }

    .toggle-button.expanded {
      transform: translateY(-50%) rotate(90deg);
    }

    .toggle-icon {
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0.375rem 0 0.375rem 0.5rem;
      border-color: transparent transparent transparent currentColor;
    }

    .nav-children {
      list-style: none;
      margin: 0;
      padding: 0;
      background: rgba(0, 0, 0, 0.03);
      border-left: 2px solid rgba(40, 65, 98, 0.2);
    }

    .nav-children .nav-link {
      padding-left: 2rem;
      font-size: 0.9375rem;
    }

    .nav-children .nav-children .nav-link {
      padding-left: 3rem;
      font-size: 0.875rem;
    }

    .nav-children .nav-children .nav-children .nav-link {
      padding-left: 4rem;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .nav-link {
        border: 1px solid transparent;
      }

      .nav-link:focus {
        border-color: currentColor;
      }

      .nav-link.current {
        border: 3px solid;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .nav-link,
      .toggle-button {
        transition: none;
      }
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .side-nav {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid var(--gc-sidenav-border-color, #ddd);
      }
    }
  `;

  /**
   * Navigation items array
   */
  @property({ type: Array })
  items: SideNavItem[] = [];

  /**
   * Collapse all sections by default
   */
  @property({ type: Boolean, attribute: 'collapse-all' })
  collapseAll = false;

  /**
   * Expand all sections by default
   */
  @property({ type: Boolean, attribute: 'expand-all' })
  expandAll = false;

  /**
   * Show icons if provided in items
   */
  @property({ type: Boolean, attribute: 'show-icons' })
  showIcons = true;

  /**
   * Show badges if provided in items
   */
  @property({ type: Boolean, attribute: 'show-badges' })
  showBadges = true;

  /**
   * Allow multiple sections expanded simultaneously
   */
  @property({ type: Boolean, attribute: 'multi-expand' })
  multiExpand = true;

  /**
   * Internal state tracking expanded sections
   */
  @state()
  private _expandedSections: Set<string> = new Set();

  override connectedCallback() {
    super.connectedCallback();
    this._initializeExpandedState();
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('items') || changedProperties.has('expandAll') || changedProperties.has('collapseAll')) {
      this._initializeExpandedState();
    }
  }

  /**
   * Initialize which sections are expanded based on properties
   */
  private _initializeExpandedState() {
    this._expandedSections.clear();

    if (this.expandAll) {
      this._expandAllSections(this.items);
    } else if (!this.collapseAll) {
      this._expandSectionsWithCurrent(this.items);
      this._expandItemsWithExpandedFlag(this.items);
    }
  }

  /**
   * Recursively expand all sections
   */
  private _expandAllSections(items: SideNavItem[]) {
    items.forEach((item) => {
      if (item.children && item.children.length > 0) {
        const id = item.id || item.text;
        this._expandedSections.add(id);
        this._expandAllSections(item.children);
      }
    });
  }

  /**
   * Expand sections containing current page
   */
  private _expandSectionsWithCurrent(items: SideNavItem[], parentIds: string[] = []): boolean {
    for (const item of items) {
      const id = item.id || item.text;
      const currentPath = [...parentIds, id];

      if (item.current) {
        // Expand all parent sections
        parentIds.forEach((parentId) => this._expandedSections.add(parentId));
        return true;
      }

      if (item.children && item.children.length > 0) {
        if (this._expandSectionsWithCurrent(item.children, currentPath)) {
          this._expandedSections.add(id);
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Expand items that have expanded flag
   */
  private _expandItemsWithExpandedFlag(items: SideNavItem[]) {
    items.forEach((item) => {
      if (item.expanded && item.children && item.children.length > 0) {
        const id = item.id || item.text;
        this._expandedSections.add(id);
      }
      if (item.children) {
        this._expandItemsWithExpandedFlag(item.children);
      }
    });
  }

  /**
   * Toggle section expanded/collapsed state
   */
  private _toggleSection(item: SideNavItem, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const id = item.id || item.text;
    const isExpanded = this._expandedSections.has(id);

    if (!this.multiExpand && !isExpanded) {
      // Close all other sections
      this._expandedSections.clear();
    }

    if (isExpanded) {
      this._expandedSections.delete(id);
    } else {
      this._expandedSections.add(id);
    }

    this.requestUpdate();

    // Emit toggle event
    this.dispatchEvent(
      new CustomEvent('gc-side-nav-toggle', {
        detail: { item, expanded: !isExpanded },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Handle navigation item click
   */
  private _handleItemClick(item: SideNavItem, path: number[], event: Event) {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    // If has children, toggle instead of navigate
    if (item.children && item.children.length > 0 && !item.href) {
      this._toggleSection(item, event);
      return;
    }

    event.preventDefault();

    // Emit click event
    this.dispatchEvent(
      new CustomEvent('gc-side-nav-click', {
        detail: { item, path },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Handle keyboard navigation
   */
  private _handleKeyDown(item: SideNavItem, path: number[], event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this._handleItemClick(item, path, event);
    }
  }

  /**
   * Check if section is expanded
   */
  private _isExpanded(item: SideNavItem): boolean {
    const id = item.id || item.text;
    return this._expandedSections.has(id);
  }

  /**
   * Render a navigation item
   */
  private _renderItem(item: SideNavItem, path: number[], level: number = 0) {
    const hasChildren = !!(item.children && item.children.length > 0);
    const isExpanded = hasChildren && this._isExpanded(item);

    const linkClasses = {
      'nav-link': true,
      current: !!item.current,
      'has-children': hasChildren,
      disabled: !!item.disabled,
    };

    const itemRole = hasChildren ? 'button' : 'link';
    const ariaLabel =
      item.ariaLabel ||
      (item.current ? `${item.text} - ${this.t('sidenav.currentPage')}` : item.text);
    const ariaExpanded = hasChildren ? String(isExpanded) : undefined;

    return html`
      <li class="nav-item" part="nav-item">
        <a
          href="${item.href || '#'}"
          class="${classMap(linkClasses)}"
          part="nav-link"
          role="${itemRole}"
          aria-label="${ariaLabel}"
          aria-current="${item.current ? 'page' : undefined}"
          aria-expanded="${ariaExpanded}"
          @click="${(e: Event) => this._handleItemClick(item, path, e)}"
          @keydown="${(e: KeyboardEvent) => this._handleKeyDown(item, path, e)}"
        >
          ${this.showIcons && item.icon
            ? html`<span class="nav-icon" aria-hidden="true">${item.icon}</span>`
            : ''}
          <span class="nav-text">${item.text}</span>
          ${this.showBadges && item.badge
            ? html`<span class="nav-badge" aria-label="${item.badge} notifications"
                >${item.badge}</span
              >`
            : ''}
        </a>

        ${hasChildren
          ? html`
              <button
                type="button"
                class="toggle-button ${classMap({ expanded: isExpanded })}"
                part="toggle-button"
                aria-label="${isExpanded
                  ? this.t('sidenav.collapse')
                  : this.t('sidenav.expand')} ${item.text}"
                @click="${(e: Event) => this._toggleSection(item, e)}"
              >
                <span class="toggle-icon" aria-hidden="true"></span>
              </button>
            `
          : ''}

        ${hasChildren && isExpanded
          ? html`
              <ul class="nav-children" role="group" aria-label="${item.text}">
                ${item.children!.map((child, index) =>
                  this._renderItem(child, [...path, index], level + 1)
                )}
              </ul>
            `
          : ''}
      </li>
    `;
  }

  override render() {
    return html`
      <nav
        class="side-nav"
        part="container"
        role="navigation"
        aria-label="${this.t('sidenav.navigation')}"
      >
        <ul class="nav-list" part="nav-list" role="list">
          ${this.items.map((item, index) => this._renderItem(item, [index], 0))}
        </ul>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gc-side-nav': GCSideNav;
  }
}
