import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from './EVAElement.js';
import { classMap } from 'lit/directives/class-map.js';

export interface NavItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  active?: boolean;
  children?: NavItem[];
}

/**
 * EVA Navigation Shell Component
 * Main navigation container with sidebar/tabs modes
 * WCAG 2.2 AAA compliant, keyboard navigable
 * 
 * @element eva-nav-shell
 * 
 * @slot - Main content area
 * @slot nav-items - Navigation items
 * @slot header - Optional header content
 * 
 * @fires nav-change - Fires when navigation item is selected
 * @fires nav-toggle - Fires when sidebar is toggled open/closed
 * 
 * @example
 * ```html
 * <eva-nav-shell mode="sidebar">
 *   <div slot="nav-items">
 *     <eva-nav-item label="Dashboard" icon="home"></eva-nav-item>
 *     <eva-nav-item label="Settings" icon="settings"></eva-nav-item>
 *   </div>
 *   <main>Content here</main>
 * </eva-nav-shell>
 * ```
 */
@customElement('eva-nav-shell')
export class EVANavShell extends EVAElement {
  protected override componentName = 'eva-nav-shell';

  /**
   * Navigation mode (sidebar or tabs)
   */
  @property({ type: String, reflect: true })
  mode: 'sidebar' | 'tabs' = 'sidebar';

  /**
   * Whether sidebar is open (sidebar mode only)
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Navigation label for ARIA
   */
  @property({ type: String })
  navLabel = '';

  /**
   * Whether sidebar is collapsed (desktop only)
   */
  @property({ type: Boolean, reflect: true })
  collapsed = false;

  /**
   * Navigation items (can be set programmatically)
   */
  @property({ type: Array })
  items: NavItem[] = [];

  @state()
  private _focusedIndex = 0;

  static override styles = css`
    :host {
      display: block;
      position: relative;
      height: 100%;
    }

    .nav-shell {
      display: flex;
      height: 100%;
      position: relative;
    }

    /* Sidebar Mode */
    :host([mode='sidebar']) .nav-shell {
      flex-direction: row;
    }

    .sidebar {
      display: flex;
      flex-direction: column;
      background-color: #26374A;
      color: #ffffff;
      width: 280px;
      height: 100%;
      transition: transform 300ms ease-in-out, width 300ms ease-in-out;
      position: relative;
      z-index: 100;
    }

    :host([mode='sidebar'][collapsed]) .sidebar {
      width: 64px;
    }

    /* Mobile: sidebar slides in from left */
    @media (max-width: 768px) {
      .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        transform: translateX(-100%);
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
      }

      :host([open]) .sidebar {
        transform: translateX(0);
      }
    }

    /* Desktop: always visible */
    @media (min-width: 769px) {
      .sidebar {
        position: relative;
        transform: translateX(0);
      }
    }

    .sidebar-header {
      padding: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .sidebar-toggle {
      background: none;
      border: none;
      color: #ffffff;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 44px;
      min-height: 44px;
      transition: background-color 200ms ease-in-out;
    }

    .sidebar-toggle:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .sidebar-toggle:focus-visible {
      outline: 3px solid #ffffff;
      outline-offset: 2px;
    }

    /* Hamburger icon */
    .hamburger {
      width: 24px;
      height: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: stretch;
    }

    .hamburger span {
      display: block;
      height: 3px;
      background-color: currentColor;
      border-radius: 2px;
      transition: transform 200ms ease-in-out, opacity 200ms ease-in-out;
    }

    :host([open]) .hamburger span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }

    :host([open]) .hamburger span:nth-child(2) {
      opacity: 0;
    }

    :host([open]) .hamburger span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }

    .sidebar-nav {
      flex: 1;
      overflow-y: auto;
      padding: 0.5rem 0;
    }

    nav {
      display: flex;
      flex-direction: column;
    }

    /* Tabs Mode */
    :host([mode='tabs']) .nav-shell {
      flex-direction: column;
    }

    .tabs {
      display: flex;
      background-color: #26374A;
      border-bottom: 2px solid #1C578A;
      overflow-x: auto;
      scrollbar-width: thin;
    }

    .tabs nav {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
    }

    /* Content area */
    .content {
      flex: 1;
      overflow: auto;
      position: relative;
    }

    /* Overlay for mobile when sidebar is open */
    .overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 99;
      animation: fadeIn 200ms ease-in-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @media (max-width: 768px) {
      :host([open]) .overlay {
        display: block;
      }
    }

    /* Accessibility: Skip to content link */
    .skip-link {
      position: absolute;
      top: -100px;
      left: 0;
      background-color: #284162;
      color: #ffffff;
      padding: 0.75rem 1rem;
      text-decoration: none;
      border-radius: 0 0 0.25rem 0;
      z-index: 1000;
      transition: top 200ms ease-in-out;
    }

    .skip-link:focus {
      top: 0;
      outline: 3px solid #ffffff;
      outline-offset: 2px;
    }

    /* Collapsed sidebar styles */
    :host([collapsed]) .sidebar-header slot[name='header'] {
      display: none;
    }

    :host([collapsed]) .sidebar-nav ::slotted(*) {
      text-align: center;
    }

    /* Screen reader only text */
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
  `;

  override render() {
    const navLabel = this.navLabel || this.t('nav.label', 'Main navigation');

    return html`
      <a href="#main-content" class="skip-link">
        ${this.t('nav.skipToContent', 'Skip to main content')}
      </a>

      <div class="nav-shell">
        ${this.mode === 'sidebar' ? this.renderSidebar(navLabel) : this.renderTabs(navLabel)}
        ${this.mode === 'sidebar' && this.open ? this.renderOverlay() : ''}
        
        <div class="content" id="main-content">
          <slot></slot>
        </div>
      </div>
    `;
  }

  private renderSidebar(navLabel: string) {
    return html`
      <aside class="sidebar" role="navigation" aria-label="${navLabel}">
        <div class="sidebar-header">
          <slot name="header"></slot>
          
          <button
            class="sidebar-toggle"
            @click="${this.toggleSidebar}"
            aria-expanded="${this.open}"
            aria-label="${this.open ? this.t('nav.closeSidebar', 'Close sidebar') : this.t('nav.openSidebar', 'Open sidebar')}"
          >
            <div class="hamburger" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>

        <div class="sidebar-nav" role="list">
          <nav @keydown="${this.handleKeyDown}">
            <slot name="nav-items"></slot>
          </nav>
        </div>
      </aside>
    `;
  }

  private renderTabs(navLabel: string) {
    return html`
      <div class="tabs" role="navigation" aria-label="${navLabel}">
        <nav @keydown="${this.handleKeyDown}">
          <slot name="nav-items"></slot>
        </nav>
      </div>
    `;
  }

  private renderOverlay() {
    return html`
      <div
        class="overlay"
        @click="${this.closeSidebar}"
        aria-hidden="true"
      ></div>
    `;
  }

  private toggleSidebar() {
    this.open = !this.open;
    this.dispatchEvent(
      new CustomEvent('nav-toggle', {
        detail: { open: this.open },
        bubbles: true,
        composed: true,
      })
    );
  }

  private closeSidebar() {
    if (this.open) {
      this.open = false;
      this.dispatchEvent(
        new CustomEvent('nav-toggle', {
          detail: { open: this.open },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  /**
   * Keyboard navigation handler
   * Supports: Tab, Arrow keys, Enter, Escape
   */
  private handleKeyDown(e: KeyboardEvent) {
    const navItems = Array.from(
      this.shadowRoot?.querySelectorAll('slot[name="nav-items"]')?.assignedElements() || []
    );

    if (navItems.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        this._focusedIndex = (this._focusedIndex + 1) % navItems.length;
        (navItems[this._focusedIndex] as HTMLElement).focus();
        break;

      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        this._focusedIndex = (this._focusedIndex - 1 + navItems.length) % navItems.length;
        (navItems[this._focusedIndex] as HTMLElement).focus();
        break;

      case 'Home':
        e.preventDefault();
        this._focusedIndex = 0;
        (navItems[0] as HTMLElement).focus();
        break;

      case 'End':
        e.preventDefault();
        this._focusedIndex = navItems.length - 1;
        (navItems[navItems.length - 1] as HTMLElement).focus();
        break;

      case 'Escape':
        if (this.mode === 'sidebar' && this.open) {
          e.preventDefault();
          this.closeSidebar();
        }
        break;
    }
  }

  /**
   * Get translated message
   */
  private t(key: string, defaultValue: string): string {
    return this.getMessage(`${this.componentName}.${key}`, defaultValue);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eva-nav-shell': EVANavShell;
  }
}
