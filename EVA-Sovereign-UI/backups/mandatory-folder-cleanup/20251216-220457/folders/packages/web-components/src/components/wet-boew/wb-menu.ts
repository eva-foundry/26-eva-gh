import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-Menu - Dropdown Navigation Menus
 * 
 * Based on WET-BOEW Menu component:
 * https://wet-boew.github.io/wet-boew/demos/menu/menu-en.html
 * 
 * Features:
 * - Opens on click or hover (configurable)
 * - Closes on Esc or outside click
 * - Arrow keys navigate menu items
 * - Enter/Space activates menu item
 * - Tab moves to next menu
 * - Supports nested submenus
 * - Focus management (returns to trigger on close)
 * - ARIA menu pattern (role="menu", role="menuitem")
 * - Touch-friendly (44px targets)
 * - Bilingual labels (EN-CA/FR-CA)
 * - WCAG 2.2 AAA compliant
 * 
 * @fires wb-menu-open - Fired when menu opens
 * @fires wb-menu-close - Fired when menu closes
 * @fires wb-menu-select - Fired when menu item is selected
 * 
 * @slot trigger - The button/link that triggers the menu
 * @slot - The menu items (wb-menu-item elements)
 * 
 * @example
 * ```html
 * <wb-menu>
 *   <button slot="trigger">Services</button>
 *   <wb-menu-item href="/benefits">Benefits</wb-menu-item>
 *   <wb-menu-item href="/taxes">Taxes</wb-menu-item>
 * </wb-menu>
 * ```
 */
@customElement('wb-menu')
export class WBMenu extends EVAElement {
  static override styles = css`
    :host {
      position: relative;
      display: inline-block;
    }

    .menu-trigger {
      display: block;
    }

    .menu-panel {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1000;
      min-width: 200px;
      margin-top: var(--eva-spacing-xs, 0.25rem);
      padding: var(--eva-spacing-xs, 0.25rem) 0;
      background: var(--eva-colors-background-default, #ffffff);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      border-radius: var(--eva-border-radius-md, 4px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      opacity: 0;
      transform: translateY(-10px);
      transition: opacity 0.2s ease, transform 0.2s ease;
      pointer-events: none;
    }

    .menu-panel.open {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    ::slotted(wb-menu-item) {
      display: block;
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .menu-panel {
        transition: none;
      }
    }
  `;

  /**
   * Whether menu opens on hover (true) or click only (false)
   */
  @property({ type: Boolean })
  hover = false;

  /**
   * Menu alignment (left or right)
   */
  @property({ type: String })
  align: 'left' | 'right' = 'left';

  /**
   * Whether menu is currently open
   */
  @state()
  private isOpen = false;

  /**
   * Index of currently focused menu item
   */
  @state()
  private focusedIndex = -1;

  @query('.menu-trigger')
  private trigger?: HTMLElement;

  @query('.menu-panel')
  private panel?: HTMLElement;

  /**
   * Cached menu items
   */
  private menuItems: WBMenuItem[] = [];

  override connectedCallback(): void {
    super.connectedCallback();

    // Register bilingual messages
    registerMessages('wb-menu', {
      'en-CA': {
        openMenu: 'Open menu',
        closeMenu: 'Close menu',
        submenu: 'Submenu'
      },
      'fr-CA': {
        openMenu: 'Ouvrir le menu',
        closeMenu: 'Fermer le menu',
        submenu: 'Sous-menu'
      }
    });

    // Close on outside click
    document.addEventListener('click', this.handleOutsideClick.bind(this));
    
    // Close on Esc key
    document.addEventListener('keydown', this.handleEscKey.bind(this));
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleOutsideClick.bind(this));
    document.removeEventListener('keydown', this.handleEscKey.bind(this));
  }

  override firstUpdated(): void {
    // Cache menu items
    this.updateMenuItems();
  }

  /**
   * Update cached menu items from slot
   */
  private updateMenuItems(): void {
    const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
    if (slot) {
      this.menuItems = slot.assignedElements().filter(
        (el) => el instanceof WBMenuItem
      ) as WBMenuItem[];
    }
  }

  /**
   * Open the menu
   */
  open(): void {
    if (this.isOpen) return;

    this.isOpen = true;
    this.focusedIndex = -1;
    this.updateMenuItems();

    this.emitEvent('wb-menu-open', {});
    this.announce(this.getMessage('wb-menu', 'openMenu'));
  }

  /**
   * Close the menu
   */
  close(): void {
    if (!this.isOpen) return;

    this.isOpen = false;
    this.focusedIndex = -1;

    // Return focus to trigger
    this.trigger?.focus();

    this.emitEvent('wb-menu-close', {});
    this.announce(this.getMessage('wb-menu', 'closeMenu'));
  }

  /**
   * Toggle menu open/closed
   */
  toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Handle trigger click
   */
  private handleTriggerClick(event: Event): void {
    event.stopPropagation();
    this.toggle();
  }

  /**
   * Handle trigger hover (if hover mode enabled)
   */
  private handleTriggerMouseEnter(): void {
    if (this.hover) {
      this.open();
    }
  }

  /**
   * Handle menu leave (if hover mode enabled)
   */
  private handleMenuMouseLeave(): void {
    if (this.hover) {
      this.close();
    }
  }

  /**
   * Handle keyboard navigation
   */
  private handleTriggerKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
      event.preventDefault();
      this.open();
      this.focusMenuItem(0);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.open();
      this.focusMenuItem(this.menuItems.length - 1);
    }
  }

  /**
   * Handle menu panel keyboard navigation
   */
  private handleMenuKeydown(event: KeyboardEvent): void {
    if (!this.isOpen) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusNextItem();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusPreviousItem();
        break;
      case 'Home':
        event.preventDefault();
        this.focusMenuItem(0);
        break;
      case 'End':
        event.preventDefault();
        this.focusMenuItem(this.menuItems.length - 1);
        break;
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
      case 'Tab':
        // Allow Tab to close menu and move focus
        this.close();
        break;
    }
  }

  /**
   * Focus next menu item
   */
  private focusNextItem(): void {
    const nextIndex = (this.focusedIndex + 1) % this.menuItems.length;
    this.focusMenuItem(nextIndex);
  }

  /**
   * Focus previous menu item
   */
  private focusPreviousItem(): void {
    const prevIndex = this.focusedIndex - 1 < 0
      ? this.menuItems.length - 1
      : this.focusedIndex - 1;
    this.focusMenuItem(prevIndex);
  }

  /**
   * Focus menu item by index
   */
  private focusMenuItem(index: number): void {
    if (index >= 0 && index < this.menuItems.length) {
      this.focusedIndex = index;
      this.menuItems[index].focus();
    }
  }

  /**
   * Handle menu item selection
   */
  private handleMenuItemSelect(event: CustomEvent): void {
    this.emitEvent('wb-menu-select', event.detail);
    
    // Close menu on selection (unless it's a submenu trigger)
    if (!event.detail.hasSubmenu) {
      this.close();
    }
  }

  /**
   * Handle outside click to close menu
   */
  private handleOutsideClick(event: Event): void {
    if (!this.isOpen) return;

    const path = event.composedPath();
    if (!path.includes(this)) {
      this.close();
    }
  }

  /**
   * Handle Esc key to close menu
   */
  private handleEscKey(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isOpen) {
      this.close();
    }
  }

  override render() {
    const menuId = `${this.componentId}-menu`;
    const panelStyle = this.align === 'right' ? 'right: 0; left: auto;' : '';

    return html`
      <div
        class="menu-trigger"
        @click="${this.handleTriggerClick}"
        @mouseenter="${this.handleTriggerMouseEnter}"
        @keydown="${this.handleTriggerKeydown}"
        role="button"
        aria-haspopup="true"
        aria-expanded="${this.isOpen}"
        aria-controls="${menuId}"
        tabindex="0"
      >
        <slot name="trigger"></slot>
      </div>

      <div
        id="${menuId}"
        class="menu-panel ${this.isOpen ? 'open' : ''}"
        style="${panelStyle}"
        role="menu"
        aria-hidden="${!this.isOpen}"
        @keydown="${this.handleMenuKeydown}"
        @mouseleave="${this.handleMenuMouseLeave}"
        @wb-menu-item-select="${this.handleMenuItemSelect}"
      >
        <slot @slotchange="${this.updateMenuItems}"></slot>
      </div>
    `;
  }
}

/**
 * WB-Menu-Item - Individual menu item
 * 
 * @fires wb-menu-item-select - Fired when item is selected
 * 
 * @slot - The menu item label
 * @slot submenu - Optional submenu (wb-menu element)
 * 
 * @example
 * ```html
 * <wb-menu-item href="/services">Services</wb-menu-item>
 * ```
 */
@customElement('wb-menu-item')
export class WBMenuItem extends EVAElement {
  static override styles = css`
    :host {
      display: block;
    }

    .menu-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      min-height: 44px; /* Touch-friendly target size */
      padding: var(--eva-spacing-sm, 0.5rem) var(--eva-spacing-md, 1rem);
      border: none;
      background: transparent;
      color: var(--eva-colors-text-default, #333333);
      font-family: var(--eva-font-family-sans, sans-serif);
      font-size: var(--eva-font-size-md, 1rem);
      text-align: left;
      text-decoration: none;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .menu-item:hover,
    .menu-item:focus {
      background: var(--eva-colors-background-hover, #f5f5f5);
      outline: none;
    }

    .menu-item:focus {
      outline: 2px solid var(--eva-colors-focus, #303fc1);
      outline-offset: -2px;
    }

    .menu-item:active {
      background: var(--eva-colors-background-active, #e0e0e0);
    }

    .menu-item.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .submenu-indicator {
      margin-left: var(--eva-spacing-sm, 0.5rem);
      font-size: 0.8em;
    }
  `;

  /**
   * Link href (if menu item is a link)
   */
  @property({ type: String })
  href = '';

  /**
   * Link target
   */
  @property({ type: String })
  target = '';

  /**
   * Whether item is disabled
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * Whether item has a submenu
   */
  @property({ type: Boolean, attribute: 'has-submenu' })
  hasSubmenu = false;

  /**
   * Handle click/activation
   */
  private handleClick(event: Event): void {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    // Emit selection event
    this.emitEvent('wb-menu-item-select', {
      href: this.href,
      target: this.target,
      hasSubmenu: this.hasSubmenu
    });

    // If it's a link, let it navigate naturally
    if (this.href && !this.hasSubmenu) {
      // Browser will handle navigation
    } else if (!this.href) {
      // Prevent default for non-link items
      event.preventDefault();
    }
  }

  /**
   * Handle keyboard activation
   */
  private handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleClick(event);
    }
  }

  /**
   * Focus this menu item
   */
  override focus(): void {
    const item = this.shadowRoot?.querySelector('.menu-item') as HTMLElement;
    item?.focus();
  }

  override render() {
    return this.href ? html`
      <a
        class="menu-item ${this.disabled ? 'disabled' : ''}"
        href="${this.href}"
        target="${this.target || undefined}"
        role="menuitem"
        tabindex="${this.disabled ? '-1' : '0'}"
        aria-disabled="${this.disabled}"
        @click="${this.handleClick}"
        @keydown="${this.handleKeydown}"
      >
        <slot></slot>
        ${this.hasSubmenu ? html`<span class="submenu-indicator" aria-hidden="true">▶</span>` : ''}
      </a>
    ` : html`
      <button
        class="menu-item ${this.disabled ? 'disabled' : ''}"
        role="menuitem"
        tabindex="${this.disabled ? '-1' : '0'}"
        aria-disabled="${this.disabled}"
        @click="${this.handleClick}"
        @keydown="${this.handleKeydown}"
      >
        <slot></slot>
        ${this.hasSubmenu ? html`<span class="submenu-indicator" aria-hidden="true">▶</span>` : ''}
      </button>
    `;
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-menu': WBMenu;
    'wb-menu-item': WBMenuItem;
  }
}
