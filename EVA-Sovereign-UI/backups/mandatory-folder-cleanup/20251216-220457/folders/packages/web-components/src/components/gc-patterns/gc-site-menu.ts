import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../utils/i18n.js';

// Register translations for gc-site-menu
registerMessages('gc-site-menu', {
  'menu.mainNavigation': {
    'en-CA': 'Main navigation',
    'fr-CA': 'Navigation principale',
  },
  'menu.menu': {
    'en-CA': 'Menu',
    'fr-CA': 'Menu',
  },
  'menu.toggleMobileMenu': {
    'en-CA': 'Toggle navigation menu',
    'fr-CA': 'Basculer le menu de navigation',
  },
  'menu.opensInNewWindow': {
    'en-CA': 'Opens in new window',
    'fr-CA': 'Ouvre dans une nouvelle fenêtre',
  },
});

/**
 * Menu item interface
 */
export interface MenuItem {
  /** Menu item label */
  text: string;
  /** Link URL */
  href: string;
  /** Optional sub-menu items */
  children?: MenuItem[];
  /** Unique identifier */
  id?: string;
  /** Current page indicator */
  current?: boolean;
  /** Open in new tab */
  external?: boolean;
  /** ARIA label override */
  ariaLabel?: string;
}

/**
 * GC Site Menu Component
 * MANDATORY Government of Canada main navigation menu
 *
 * Implements: https://design.canada.ca/common-design-patterns/navigation.html
 *
 * Features:
 * - Main navigation structure with nested menus
 * - Full keyboard navigation (Tab, Arrow keys, Enter, Escape)
 * - Mobile hamburger menu (responsive)
 * - ARIA menu patterns (menubar > menuitem > menu)
 * - Current page indicators
 * - External link indicators
 * - Bilingual support
 *
 * @element gc-site-menu
 *
 * @fires gc-menu-item-click - Fires when menu item is clicked
 * @fires gc-mobile-menu-toggle - Fires when mobile menu is toggled
 *
 * @example
 * ```html
 * <gc-site-menu
 *   .items="${[
 *     { text: 'Home', href: '/' },
 *     { text: 'About', href: '/about', children: [
 *       { text: 'History', href: '/about/history' },
 *       { text: 'Team', href: '/about/team' }
 *     ]}
 *   ]}"
 * ></gc-site-menu>
 * ```
 */
@customElement('gc-site-menu')
export class GCSiteMenu extends EVAElement {
  protected override componentName = 'gc-site-menu';

  /**
   * Menu items array
   */
  @property({ type: Array })
  items: MenuItem[] = [];

  /**
   * Vertical orientation (sidebar menu vs horizontal menubar)
   */
  @property({ type: Boolean })
  vertical = false;

  /**
   * Mobile menu open state
   */
  @property({ type: Boolean, reflect: true, attribute: 'mobile-menu-open' })
  mobileMenuOpen = false;

  /**
   * Show mobile hamburger toggle (auto-hides on desktop)
   */
  @property({ type: Boolean, attribute: 'show-mobile-toggle' })
  showMobileToggle = true;

  /**
   * Currently open submenu IDs
   */
  @state()
  private _openSubMenus: Set<string> = new Set();

  /**
   * Currently focused item index path (e.g., [0, 2] = first parent, third child)
   */
  @state()
  private _focusPath: number[] = [];

  /**
   * All menu items flattened for keyboard navigation
   */
  @state()
  private _flatMenuItems: Array<{ item: MenuItem; path: number[] }> = [];

  override connectedCallback(): void {
    super.connectedCallback();
    this._updateFlatMenuItems();
  }

  override updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);
    if (changedProperties.has('items')) {
      this._updateFlatMenuItems();
    }
  }

  /**
   * Flatten menu items for keyboard navigation
   */
  private _updateFlatMenuItems(): void {
    const flattened: Array<{ item: MenuItem; path: number[] }> = [];
    const traverse = (items: MenuItem[], parentPath: number[] = []) => {
      items.forEach((item, index) => {
        const path = [...parentPath, index];
        flattened.push({ item, path });
        if (item.children?.length && this._openSubMenus.has(item.id || `${path.join('-')}`)) {
          traverse(item.children, path);
        }
      });
    };
    traverse(this.items);
    this._flatMenuItems = flattened;
  }

  /**
   * Toggle mobile menu
   */
  private _toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    this.dispatchEvent(
      new CustomEvent('gc-mobile-menu-toggle', {
        detail: { open: this.mobileMenuOpen },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Toggle submenu expansion
   */
  private _toggleSubMenu(item: MenuItem, path: number[]): void {
    const id = item.id || path.join('-');
    if (this._openSubMenus.has(id)) {
      this._openSubMenus.delete(id);
    } else {
      this._openSubMenus.add(id);
    }
    this._openSubMenus = new Set(this._openSubMenus); // Trigger reactivity
    this._updateFlatMenuItems();
  }

  /**
   * Handle menu item click
   */
  private _handleItemClick(item: MenuItem, path: number[], event: MouseEvent): void {
    // If item has children, toggle submenu instead of navigating
    if (item.children?.length) {
      event.preventDefault();
      this._toggleSubMenu(item, path);
      return;
    }

    this.dispatchEvent(
      new CustomEvent('gc-menu-item-click', {
        detail: { item, path },
        bubbles: true,
        composed: true,
      })
    );

    // Close mobile menu on navigation
    if (this.mobileMenuOpen) {
      this.mobileMenuOpen = false;
    }
  }

  /**
   * Handle keyboard navigation
   */
  private _handleKeyDown(event: KeyboardEvent, item: MenuItem, path: number[]): void {
    const key = event.key;

    // Handle Enter/Space on items
    if (key === 'Enter' || key === ' ') {
      event.preventDefault();
      if (item.children?.length) {
        this._toggleSubMenu(item, path);
      } else {
        // Simulate click for navigation
        const link = event.target as HTMLElement;
        link.click();
      }
      return;
    }

    // Arrow key navigation
    if (key === 'ArrowDown' || key === 'ArrowUp' || key === 'ArrowRight' || key === 'ArrowLeft') {
      event.preventDefault();
      this._handleArrowNavigation(key, path);
    }

    // Escape closes submenu
    if (key === 'Escape' && path.length > 1 && path[0] !== undefined) {
      event.preventDefault();
      const parentId = this.items[path[0]].id || `${path[0]}`;
      this._openSubMenus.delete(parentId);
      this._openSubMenus = new Set(this._openSubMenus);
      this._updateFlatMenuItems();
    }
  }

  /**
   * Handle arrow key navigation
   */
  private _handleArrowNavigation(key: string, currentPath: number[]): void {
    const currentIndex = this._flatMenuItems.findIndex(
      ({ path }) => path.join('-') === currentPath.join('-')
    );

    if (currentIndex === -1) return;

    let targetIndex: number;

    if (key === 'ArrowDown' || key === 'ArrowRight') {
      targetIndex = (currentIndex + 1) % this._flatMenuItems.length;
    } else {
      targetIndex = (currentIndex - 1 + this._flatMenuItems.length) % this._flatMenuItems.length;
    }

    const targetItem = this._flatMenuItems[targetIndex];
    if (!targetItem) return;
    
    const targetPath = targetItem.path;
    this._focusPath = targetPath;

    // Focus the target element
    this.updateComplete.then(() => {
      const linkId = `menu-item-${targetPath.join('-')}`;
      const link = this.shadowRoot?.querySelector(`#${linkId}`) as HTMLElement;
      link?.focus();
    });
  }

  /**
   * Get menu item ID
   */
  private _getMenuItemId(item: MenuItem, path: number[]): string {
    return item.id || `menu-item-${path.join('-')}`;
  }

  /**
   * Render a single menu item
   */
  private _renderMenuItem(item: MenuItem, path: number[], level: number = 0): unknown {
    const id = this._getMenuItemId(item, path);
    const hasChildren = !!item.children?.length;
    const isOpen = this._openSubMenus.has(item.id || path.join('-'));
    const isCurrent = item.current;

    const itemClasses = {
      'menu-item': true,
      'has-children': hasChildren,
      'is-open': isOpen,
      'is-current': !!isCurrent,
      [`level-${level}`]: true,
    };

    const linkClasses = {
      'menu-link': true,
      'is-current': !!isCurrent,
    };

    return html`
      <li class="${classMap(itemClasses)}" role="none">
        <a
          id="${id}"
          class="${classMap(linkClasses)}"
          href="${item.href}"
          role="menuitem"
          aria-label="${item.ariaLabel || item.text}"
          aria-current="${isCurrent ? 'page' : 'false'}"
          aria-haspopup="${hasChildren ? 'true' : 'false'}"
          aria-expanded="${hasChildren ? (isOpen ? 'true' : 'false') : 'false'}"
          target="${item.external ? '_blank' : '_self'}"
          rel="${item.external ? 'noopener noreferrer' : ''}"
          @click="${(e: MouseEvent) => this._handleItemClick(item, path, e)}"
          @keydown="${(e: KeyboardEvent) => this._handleKeyDown(e, item, path)}"
          part="menu-link"
        >
          <span class="menu-text">${item.text}</span>
          ${hasChildren
            ? html`<span class="submenu-indicator" aria-hidden="true">
                ${isOpen ? '▼' : '▶'}
              </span>`
            : ''}
          ${item.external
            ? html`<span class="external-indicator" aria-hidden="true" title="${this.t('menu.opensInNewWindow')}">
                ↗
              </span>`
            : ''}
        </a>

        ${hasChildren && isOpen
          ? html`
              <ul class="submenu" role="menu" aria-label="${item.text} submenu" part="submenu">
                ${item.children!.map((child, idx) =>
                  this._renderMenuItem(child, [...path, idx], level + 1)
                )}
              </ul>
            `
          : ''}
      </li>
    `;
  }

  /**
   * Render mobile hamburger toggle button
   */
  private _renderMobileToggle(): unknown {
    if (!this.showMobileToggle) return '';

    return html`
      <button
        class="mobile-toggle"
        type="button"
        aria-label="${this.t('menu.toggleMobileMenu')}"
        aria-expanded="${this.mobileMenuOpen ? 'true' : 'false'}"
        aria-controls="site-menu"
        @click="${this._toggleMobileMenu}"
        part="mobile-toggle"
      >
        <span class="hamburger-icon" aria-hidden="true">
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
        </span>
        <span class="sr-only">${this.t('menu.menu')}</span>
      </button>
    `;
  }

  protected override render(): unknown {
    const navClasses = {
      'site-menu': true,
      'vertical': this.vertical,
      'mobile-open': this.mobileMenuOpen,
    };

    return html`
      <nav class="${classMap(navClasses)}" aria-label="${this.t('menu.mainNavigation')}" part="container">
        ${this._renderMobileToggle()}
        <ul
          id="site-menu"
          class="menu-list"
          role="menubar"
          aria-orientation="${this.vertical ? 'vertical' : 'horizontal'}"
          part="menu-list"
        >
          ${this.items.map((item, index) => this._renderMenuItem(item, [index], 0))}
        </ul>
      </nav>
    `;
  }



  static override styles = css`
    :host {
      display: block;
      font-family: Lato, sans-serif;
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
      border: 0;
    }

    /* Mobile toggle button */
    .mobile-toggle {
      display: none;
      background: none;
      border: 2px solid #284162;
      padding: 0.5rem;
      cursor: pointer;
      border-radius: 0.25rem;
      min-height: 44px;
      min-width: 44px;
      transition: background-color 200ms ease-in-out;
    }

    .mobile-toggle:hover {
      background-color: #f5f5f5;
    }

    .mobile-toggle:focus-visible {
      outline: 3px solid #284162;
      outline-offset: 2px;
    }

    .hamburger-icon {
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 24px;
    }

    .hamburger-icon .line {
      display: block;
      height: 3px;
      background-color: #284162;
      transition: transform 200ms ease-in-out;
    }

    :host([mobile-menu-open]) .hamburger-icon .line:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }

    :host([mobile-menu-open]) .hamburger-icon .line:nth-child(2) {
      opacity: 0;
    }

    :host([mobile-menu-open]) .hamburger-icon .line:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }

    /* Navigation container */
    .site-menu {
      position: relative;
    }

    .menu-list {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 0;
    }

    .site-menu.vertical .menu-list {
      flex-direction: column;
    }

    /* Menu items */
    .menu-item {
      position: relative;
    }

    .menu-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      color: #284162;
      text-decoration: none;
      font-size: 1rem;
      font-weight: 400;
      min-height: 44px;
      transition: background-color 200ms ease-in-out, color 200ms ease-in-out;
      white-space: nowrap;
      cursor: pointer;
    }

    .menu-link:hover {
      background-color: #f5f5f5;
      color: #0c2447;
    }

    .menu-link:focus-visible {
      outline: 3px solid #284162;
      outline-offset: -3px;
      z-index: 1;
    }

    .menu-link.is-current {
      font-weight: 700;
      background-color: #284162;
      color: #ffffff;
    }

    .menu-link.is-current:hover {
      background-color: #0c2447;
    }

    /* Submenu indicator */
    .submenu-indicator {
      font-size: 0.75rem;
      transition: transform 200ms ease-in-out;
    }

    .has-children.is-open .submenu-indicator {
      transform: rotate(90deg);
    }

    .vertical .has-children.is-open .submenu-indicator {
      transform: rotate(0deg);
    }

    /* External link indicator */
    .external-indicator {
      font-size: 0.875rem;
      opacity: 0.7;
    }

    /* Submenu */
    .submenu {
      list-style: none;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
      border-left: 4px solid #284162;
    }

    .site-menu:not(.vertical) .submenu {
      position: absolute;
      top: 100%;
      left: 0;
      min-width: 200px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      z-index: 100;
    }

    .site-menu.vertical .submenu {
      padding-left: 1rem;
    }

    .submenu .menu-link {
      padding-left: 1.5rem;
    }

    .submenu .submenu .menu-link {
      padding-left: 2.5rem;
    }

    /* Level-based styling */
    .level-1 .menu-link {
      font-size: 0.9375rem;
    }

    .level-2 .menu-link {
      font-size: 0.875rem;
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
      .mobile-toggle {
        display: flex;
      }

      .menu-list {
        display: none;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: #ffffff;
        border: 2px solid #284162;
        border-top: none;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        max-height: calc(100vh - 200px);
        overflow-y: auto;
      }

      :host([mobile-menu-open]) .menu-list {
        display: flex;
      }

      .site-menu:not(.vertical) .submenu {
        position: static;
        box-shadow: none;
        width: 100%;
      }

      .submenu {
        border-left: 4px solid #284162;
        margin-left: 1rem;
      }

      .menu-link {
        white-space: normal;
        word-wrap: break-word;
      }
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .menu-link {
        border: 1px solid transparent;
      }

      .menu-link:focus-visible {
        border-color: currentColor;
      }

      .menu-link.is-current {
        border: 2px solid currentColor;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .menu-link,
      .mobile-toggle,
      .submenu-indicator,
      .hamburger-icon .line {
        transition: none;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'gc-site-menu': GCSiteMenu;
  }
}
