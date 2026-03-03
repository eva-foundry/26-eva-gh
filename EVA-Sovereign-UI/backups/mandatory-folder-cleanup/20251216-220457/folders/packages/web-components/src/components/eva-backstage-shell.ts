import { html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { EVAElement } from './EVAElement.js';

/**
 * EVA Backstage Shell Component
 * Slide-in customization panel for EVA Suite applications
 * WCAG 2.2 AAA compliant with focus trap and keyboard navigation
 * 
 * @element eva-backstage-shell
 * 
 * @slot - Main content panel (customization panels)
 * @slot trigger - Custom trigger button (defaults to gear icon)
 * @slot nav - Navigation tabs for different panels
 * 
 * @fires backstage-open - Fires when panel opens
 * @fires backstage-close - Fires when panel closes
 * 
 * @example
 * ```html
 * <eva-backstage-shell>
 *   <eva-a11y-panel slot="content"></eva-a11y-panel>
 *   <eva-theme-panel slot="content"></eva-theme-panel>
 * </eva-backstage-shell>
 * ```
 */
@customElement('eva-backstage-shell')
export class EVABackstageShell extends EVAElement {
  protected override componentName = 'eva-backstage-shell';

  /**
   * Whether backstage panel is open
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Panel position (right or left)
   */
  @property({ type: String, reflect: true })
  position: 'right' | 'left' = 'right';

  /**
   * Panel width (in pixels or CSS units)
   */
  @property({ type: String })
  width = '480px';

  /**
   * Panel title
   */
  @property({ type: String })
  title = '';

  /**
   * Whether to show the default gear icon trigger
   */
  @property({ type: Boolean })
  showTrigger = true;

  /**
   * Trigger label for accessibility
   */
  @property({ type: String })
  triggerLabel = '';

  @query('.backstage-panel')
  private _panel?: HTMLElement;

  @query('.close-button')
  private _closeButton?: HTMLButtonElement;

  @state()
  private _previousFocus?: HTMLElement;

  private _focusableElements: HTMLElement[] = [];

  static override styles = css`
    :host {
      display: contents;
    }

    /* Trigger button */
    .backstage-trigger {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.25rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 44px;
      min-height: 44px;
      transition: background-color 200ms ease-in-out;
      position: relative;
    }

    .backstage-trigger:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    .backstage-trigger:focus-visible {
      outline: 3px solid #26374A;
      outline-offset: 2px;
    }

    .trigger-icon {
      width: 24px;
      height: 24px;
      display: block;
    }

    /* Overlay */
    .backstage-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 999;
      animation: fadeIn 200ms ease-in-out;
    }

    :host([open]) .backstage-overlay {
      display: block;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    /* Panel */
    .backstage-panel {
      position: fixed;
      top: 0;
      bottom: 0;
      width: var(--backstage-width, 480px);
      max-width: 90vw;
      background-color: #ffffff;
      box-shadow: -4px 0 16px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      transition: transform 300ms ease-in-out;
    }

    :host([position='right']) .backstage-panel {
      right: 0;
      transform: translateX(100%);
    }

    :host([position='left']) .backstage-panel {
      left: 0;
      transform: translateX(-100%);
      box-shadow: 4px 0 16px rgba(0, 0, 0, 0.2);
    }

    :host([open][position='right']) .backstage-panel {
      transform: translateX(0);
    }

    :host([open][position='left']) .backstage-panel {
      transform: translateX(0);
    }

    /* Panel header */
    .backstage-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #e5e5e5;
      background-color: #f9f9f9;
    }

    .backstage-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #26374A;
      margin: 0;
    }

    .close-button {
      background: none;
      border: none;
      color: #26374A;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 44px;
      min-height: 44px;
      font-size: 1.5rem;
      line-height: 1;
      transition: background-color 200ms ease-in-out;
    }

    .close-button:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    .close-button:focus-visible {
      outline: 3px solid #26374A;
      outline-offset: 2px;
    }

    /* Panel navigation */
    .backstage-nav {
      border-bottom: 1px solid #e5e5e5;
      background-color: #ffffff;
    }

    /* Panel content */
    .backstage-content {
      flex: 1;
      overflow-y: auto;
      padding: 1.5rem;
    }

    /* Screen reader only */
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

    /* Mobile responsive */
    @media (max-width: 768px) {
      .backstage-panel {
        max-width: 100vw;
        width: 100vw;
      }
    }
  `;

  override render() {
    const panelTitle = this.title || this.t('title', 'Customization');
    const triggerLabel = this.triggerLabel || this.t('trigger.label', 'Open customization panel');

    return html`
      ${this.showTrigger
        ? html`
            <button
              class="backstage-trigger"
              @click="${this.open ? this.close : this.openPanel}"
              aria-label="${triggerLabel}"
              aria-expanded="${this.open}"
              aria-controls="backstage-panel"
            >
              <slot name="trigger">
                <svg
                  class="trigger-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path
                    d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                  />
                  <path
                    d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
                  />
                </svg>
              </slot>
            </button>
          `
        : ''}

      <div
        class="backstage-overlay"
        @click="${this.close}"
        aria-hidden="true"
      ></div>

      <aside
        id="backstage-panel"
        class="backstage-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="backstage-title"
        style="--backstage-width: ${this.width}"
      >
        <header class="backstage-header">
          <h2 id="backstage-title" class="backstage-title">
            ${panelTitle}
          </h2>
          
          <button
            class="close-button"
            @click="${this.close}"
            aria-label="${this.t('close.label', 'Close customization panel')}"
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        ${this.renderNav()}

        <div class="backstage-content">
          <slot></slot>
        </div>
      </aside>
    `;
  }

  private renderNav() {
    const navSlot = this.querySelector('[slot="nav"]');
    if (!navSlot) return '';

    return html`
      <nav class="backstage-nav" aria-label="${this.t('nav.label', 'Panel navigation')}">
        <slot name="nav"></slot>
      </nav>
    `;
  }

  /**
   * Open the backstage panel
   */
  public openPanel() {
    if (this.open) return;

    // Store current focus
    this._previousFocus = document.activeElement as HTMLElement;

    this.open = true;

    // Wait for render, then focus close button
    this.updateComplete.then(() => {
      this._closeButton?.focus();
      this._setupFocusTrap();
    });

    this.dispatchEvent(
      new CustomEvent('backstage-open', {
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Close the backstage panel
   */
  public close() {
    if (!this.open) return;

    this.open = false;

    // Restore previous focus
    if (this._previousFocus && this._previousFocus.focus) {
      this._previousFocus.focus();
    }

    this.dispatchEvent(
      new CustomEvent('backstage-close', {
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Setup focus trap inside panel
   */
  private _setupFocusTrap() {
    if (!this._panel) return;

    // Get all focusable elements
    this._focusableElements = Array.from(
      this._panel.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    );

    // Add keyboard listener
    this._panel.addEventListener('keydown', this._handlePanelKeyDown);
  }

  /**
   * Handle keyboard navigation in panel
   */
  private _handlePanelKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      this.close();
      return;
    }

    if (e.key === 'Tab') {
      // Trap focus inside panel
      const firstElement = this._focusableElements[0];
      const lastElement = this._focusableElements[this._focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  };

  override disconnectedCallback() {
    super.disconnectedCallback();
    
    // Clean up event listener
    if (this._panel) {
      this._panel.removeEventListener('keydown', this._handlePanelKeyDown);
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
    'eva-backstage-shell': EVABackstageShell;
  }
}
