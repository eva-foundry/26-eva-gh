import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../utils/i18n.js';

// Register translations
registerMessages('gc-action-menu', {
  'actionmenu.actions': {
    'en-CA': 'Actions',
    'fr-CA': 'Actions',
  },
  'actionmenu.moreActions': {
    'en-CA': 'More actions',
    'fr-CA': 'Plus d\'actions',
  },
  'actionmenu.close': {
    'en-CA': 'Close menu',
    'fr-CA': 'Fermer le menu',
  },
});

export interface ActionMenuItem {
  text: string;
  id?: string;
  icon?: string;
  disabled?: boolean;
  divider?: boolean;
  href?: string;
  ariaLabel?: string;
  danger?: boolean;
}

/**
 * GC Action Menu Component
 *
 * Contextual action dropdown menus following Government of Canada design patterns.
 * Used for overflow actions, context menus, and action buttons.
 *
 * @element gc-action-menu
 *
 * @fires {CustomEvent<{item: ActionMenuItem}>} gc-action-select - Fired when menu item selected
 * @fires {CustomEvent<{open: boolean}>} gc-action-menu-toggle - Fired when menu opens/closes
 *
 * @cssprop [--gc-action-menu-bg-color=#fff] - Menu background color
 * @cssprop [--gc-action-menu-border-color=#ddd] - Menu border color
 * @cssprop [--gc-action-menu-item-hover=#f5f5f5] - Item hover background
 * @cssprop [--gc-action-menu-danger-color=#d32f2f] - Danger action text color
 *
 * @csspart trigger - The trigger button
 * @csspart menu - The dropdown menu container
 * @csspart menu-item - Individual menu items
 */
@customElement('gc-action-menu')
export class GCActionMenu extends EVAElement {
  static override styles = css`
    :host {
      display: inline-block;
      position: relative;
      font-family: Lato, sans-serif;
      font-size: 1rem;
      line-height: 1.5;
    }

    .trigger {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: #284162;
      color: white;
      border: 2px solid #284162;
      border-radius: 0.25rem;
      font-size: 1rem;
      font-family: inherit;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease, border-color 0.2s ease;
      min-height: 44px;
      min-width: 44px;
    }

    .trigger:hover {
      background: #0c2447;
      border-color: #0c2447;
    }

    .trigger:focus {
      outline: 3px solid #0c2447;
      outline-offset: 2px;
    }

    .trigger.open {
      background: #0c2447;
      border-color: #0c2447;
    }

    .trigger.icon-only {
      padding: 0.5rem;
      min-width: 44px;
    }

    .trigger-icon {
      width: 1.25rem;
      height: 1.25rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .trigger-text {
      white-space: nowrap;
    }

    .caret {
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0.375rem 0.375rem 0 0.375rem;
      border-color: currentColor transparent transparent transparent;
      transition: transform 0.2s ease;
    }

    .caret.open {
      transform: rotate(180deg);
    }

    .menu {
      position: absolute;
      top: calc(100% + 0.5rem);
      left: 0;
      min-width: 200px;
      background: var(--gc-action-menu-bg-color, #fff);
      border: 1px solid var(--gc-action-menu-border-color, #ddd);
      border-radius: 0.25rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-0.5rem);
      transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
      max-height: 400px;
      overflow-y: auto;
    }

    .menu.open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .menu.align-right {
      left: auto;
      right: 0;
    }

    .menu.align-center {
      left: 50%;
      transform: translateX(-50%) translateY(-0.5rem);
    }

    .menu.align-center.open {
      transform: translateX(-50%) translateY(0);
    }

    .menu-list {
      list-style: none;
      margin: 0;
      padding: 0.5rem 0;
    }

    .menu-item {
      margin: 0;
    }

    .menu-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      color: #333;
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
    }

    .menu-link:hover:not(.disabled) {
      background: var(--gc-action-menu-item-hover, #f5f5f5);
    }

    .menu-link:focus {
      outline: 2px solid #0c2447;
      outline-offset: -2px;
      z-index: 1;
    }

    .menu-link.disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    .menu-link.danger {
      color: var(--gc-action-menu-danger-color, #d32f2f);
    }

    .menu-icon {
      flex-shrink: 0;
      width: 1.25rem;
      height: 1.25rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .menu-text {
      flex: 1;
    }

    .divider {
      height: 1px;
      background: #ddd;
      margin: 0.5rem 0;
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
      .trigger {
        border-width: 3px;
      }

      .menu {
        border-width: 2px;
      }

      .menu-link:focus {
        outline-width: 3px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .trigger,
      .caret,
      .menu,
      .menu-link {
        transition: none;
      }
    }

    /* Mobile adjustments */
    @media (max-width: 768px) {
      .menu {
        min-width: 180px;
      }
    }
  `;

  /**
   * Menu items array
   */
  @property({ type: Array })
  items: ActionMenuItem[] = [];

  /**
   * Trigger button text
   */
  @property({ type: String, attribute: 'trigger-text' })
  triggerText = '';

  /**
   * Trigger button icon
   */
  @property({ type: String, attribute: 'trigger-icon' })
  triggerIcon = '';

  /**
   * Icon-only trigger (no text)
   */
  @property({ type: Boolean, attribute: 'icon-only' })
  iconOnly = false;

  /**
   * Show caret/arrow on trigger
   */
  @property({ type: Boolean, attribute: 'show-caret' })
  showCaret = true;

  /**
   * Menu alignment: left, right, center
   */
  @property({ type: String })
  align: 'left' | 'right' | 'center' = 'left';

  /**
   * Menu open state
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Close on item click
   */
  @property({ type: Boolean, attribute: 'close-on-select' })
  closeOnSelect = true;

  /**
   * Internal state for managing focus
   */
  @state()
  private _focusedIndex = -1;

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleClickOutside);
    document.addEventListener('keydown', this._handleEscapeKey);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleClickOutside);
    document.removeEventListener('keydown', this._handleEscapeKey);
  }

  /**
   * Handle click outside to close menu
   */
  private _handleClickOutside = (event: MouseEvent) => {
    if (this.open && !event.composedPath().includes(this)) {
      this.open = false;
      this._emitToggleEvent();
    }
  };

  /**
   * Handle Escape key to close menu
   */
  private _handleEscapeKey = (event: KeyboardEvent) => {
    if (this.open && event.key === 'Escape') {
      event.preventDefault();
      this.open = false;
      this._emitToggleEvent();
      // Return focus to trigger
      const trigger = this.shadowRoot!.querySelector('.trigger') as HTMLButtonElement;
      trigger?.focus();
    }
  };

  /**
   * Toggle menu open/closed
   */
  private _toggleMenu() {
    this.open = !this.open;
    this._focusedIndex = -1;
    this._emitToggleEvent();

    if (this.open) {
      // Focus first item after menu opens
      this.updateComplete.then(() => {
        this._focusMenuItem(0);
      });
    }
  }

  /**
   * Emit toggle event
   */
  private _emitToggleEvent() {
    this.dispatchEvent(
      new CustomEvent('gc-action-menu-toggle', {
        detail: { open: this.open },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Handle menu item click
   */
  private _handleItemClick(item: ActionMenuItem, event: Event) {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    event.preventDefault();

    // Emit select event
    this.dispatchEvent(
      new CustomEvent('gc-action-select', {
        detail: { item },
        bubbles: true,
        composed: true,
      })
    );

    // Close menu if configured
    if (this.closeOnSelect) {
      this.open = false;
      this._emitToggleEvent();
    }
  }

  /**
   * Handle keyboard navigation in menu
   */
  private _handleMenuKeyDown(event: KeyboardEvent) {
    const menuItems = this.items.filter((item) => !item.divider && !item.disabled);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this._focusedIndex = Math.min(this._focusedIndex + 1, menuItems.length - 1);
        this._focusMenuItem(this._focusedIndex);
        break;

      case 'ArrowUp':
        event.preventDefault();
        this._focusedIndex = Math.max(this._focusedIndex - 1, 0);
        this._focusMenuItem(this._focusedIndex);
        break;

      case 'Home':
        event.preventDefault();
        this._focusedIndex = 0;
        this._focusMenuItem(0);
        break;

      case 'End':
        event.preventDefault();
        this._focusedIndex = menuItems.length - 1;
        this._focusMenuItem(this._focusedIndex);
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        const focusedLink = this.shadowRoot!.querySelector(
          `.menu-link:nth-of-type(${this._focusedIndex + 1})`
        ) as HTMLElement;
        focusedLink?.click();
        break;
    }
  }

  /**
   * Focus a menu item by index
   */
  private _focusMenuItem(index: number) {
    const menuLinks = this.shadowRoot!.querySelectorAll('.menu-link:not(.disabled)');
    const link = menuLinks[index] as HTMLElement;
    link?.focus();
  }

  /**
   * Render trigger button
   */
  private _renderTrigger() {
    const triggerClasses = {
      trigger: true,
      open: this.open,
      'icon-only': this.iconOnly,
    };

    const ariaLabel = this.triggerText || this.t('actionmenu.moreActions');

    return html`
      <button
        type="button"
        class="${classMap(triggerClasses)}"
        part="trigger"
        aria-label="${ariaLabel}"
        aria-haspopup="true"
        aria-expanded="${this.open}"
        @click="${this._toggleMenu}"
      >
        ${this.triggerIcon
          ? html`<span class="trigger-icon" aria-hidden="true">${this.triggerIcon}</span>`
          : ''}
        ${!this.iconOnly && this.triggerText
          ? html`<span class="trigger-text">${this.triggerText}</span>`
          : ''}
        ${this.showCaret && !this.iconOnly
          ? html`<span class="caret ${classMap({ open: this.open })}" aria-hidden="true"></span>`
          : ''}
      </button>
    `;
  }

  /**
   * Render a menu item
   */
  private _renderItem(item: ActionMenuItem) {
    if (item.divider) {
      return html`<li role="separator" class="divider"></li>`;
    }

    const linkClasses = {
      'menu-link': true,
      disabled: !!item.disabled,
      danger: !!item.danger,
    };

    const ariaLabel = item.ariaLabel || item.text;

    return html`
      <li class="menu-item" part="menu-item">
        <a
          href="${item.href || '#'}"
          class="${classMap(linkClasses)}"
          role="menuitem"
          aria-label="${ariaLabel}"
          aria-disabled="${item.disabled ? 'true' : undefined}"
          @click="${(e: Event) => this._handleItemClick(item, e)}"
        >
          ${item.icon
            ? html`<span class="menu-icon" aria-hidden="true">${item.icon}</span>`
            : ''}
          <span class="menu-text">${item.text}</span>
        </a>
      </li>
    `;
  }

  override render() {
    const menuClasses = {
      menu: true,
      open: this.open,
      'align-right': this.align === 'right',
      'align-center': this.align === 'center',
    };

    return html`
      ${this._renderTrigger()}

      <div
        class="${classMap(menuClasses)}"
        part="menu"
        role="menu"
        aria-label="${this.t('actionmenu.actions')}"
        @keydown="${this._handleMenuKeyDown}"
      >
        <ul class="menu-list" role="none">
          ${this.items.map((item) => this._renderItem(item))}
        </ul>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gc-action-menu': GCActionMenu;
  }
}
