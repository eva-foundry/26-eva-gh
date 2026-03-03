import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-Toggle - Show/Hide Content Toggle
 * 
 * Based on WET-BOEW Toggle component:
 * https://wet-boew.github.io/wet-boew/demos/toggle/toggle-en.html
 * 
 * Features:
 * - Click button to show/hide content
 * - Smooth CSS transitions (height animation)
 * - Keyboard accessible (Enter/Space)
 * - Screen reader support (ARIA expanded state)
 * - Bilingual button labels (EN-CA/FR-CA)
 * - Optional toggle groups (only one open at a time)
 * - Icon rotation on toggle
 * - Print-friendly (shows all content when printing)
 * - WCAG 2.2 AAA compliant
 * 
 * @fires wb-toggle-show - Fired when content is shown
 * @fires wb-toggle-hide - Fired when content is hidden
 * 
 * @slot - The content to toggle visibility
 * 
 * @example
 * ```html
 * <wb-toggle label="Show details">
 *   <p>Hidden content here...</p>
 * </wb-toggle>
 * ```
 */
@customElement('wb-toggle')
export class WBToggle extends EVAElement {
  static override styles = css`
    :host {
      display: block;
      margin-bottom: var(--eva-spacing-md, 1rem);
    }

    .toggle-button {
      display: flex;
      align-items: center;
      gap: var(--eva-spacing-sm, 0.5rem);
      width: 100%;
      padding: var(--eva-spacing-sm, 0.5rem) var(--eva-spacing-md, 1rem);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      border-radius: var(--eva-border-radius-md, 4px);
      background: var(--eva-colors-background-default, #ffffff);
      color: var(--eva-colors-text-default, #333333);
      font-family: var(--eva-font-family-sans, sans-serif);
      font-size: var(--eva-font-size-md, 1rem);
      text-align: left;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .toggle-button:hover {
      background: var(--eva-colors-background-hover, #f5f5f5);
      border-color: var(--eva-colors-border-hover, #999999);
    }

    .toggle-button:focus {
      outline: 3px solid var(--eva-colors-focus, #303fc1);
      outline-offset: 2px;
      border-color: var(--eva-colors-border-focus, #303fc1);
    }

    .toggle-button:active {
      background: var(--eva-colors-background-active, #e0e0e0);
    }

    .toggle-icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      transition: transform 0.3s ease;
    }

    .toggle-icon.expanded {
      transform: rotate(180deg);
    }

    .toggle-icon svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }

    .toggle-label {
      flex: 1;
      font-weight: var(--eva-font-weight-semibold, 600);
    }

    .toggle-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }

    .toggle-content.expanded {
      max-height: 5000px; /* Large enough for most content */
    }

    .toggle-content-inner {
      padding: var(--eva-spacing-md, 1rem);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      border-top: none;
      border-bottom-left-radius: var(--eva-border-radius-md, 4px);
      border-bottom-right-radius: var(--eva-border-radius-md, 4px);
    }

    /* Print styles - show all content when printing */
    @media print {
      .toggle-content {
        max-height: none !important;
        overflow: visible !important;
      }

      .toggle-button {
        display: none;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .toggle-button,
      .toggle-icon,
      .toggle-content {
        transition: none;
      }
    }
  `;

  /**
   * Button label text
   */
  @property({ type: String })
  label = '';

  /**
   * Whether content is initially expanded
   */
  @property({ type: Boolean })
  expanded = false;

  /**
   * Toggle group name - only one toggle in the group can be open at a time
   */
  @property({ type: String })
  group = '';

  /**
   * Show/hide icon in button
   */
  @property({ type: Boolean, attribute: 'show-icon' })
  showIcon = true;

  /**
   * Internal state tracking if content is expanded
   */
  @state()
  private isExpanded = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.isExpanded = this.expanded;

    // Register bilingual messages
    registerMessages('wb-toggle', {
      'en-CA': {
        show: 'Show',
        hide: 'Hide',
        toggleContent: 'Toggle content visibility'
      },
      'fr-CA': {
        show: 'Afficher',
        hide: 'Masquer',
        toggleContent: 'Basculer la visibilité du contenu'
      }
    });

    // Listen for group toggle events
    if (this.group) {
      window.addEventListener('wb-toggle-group-change', this.handleGroupChange.bind(this));
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.group) {
      window.removeEventListener('wb-toggle-group-change', this.handleGroupChange.bind(this));
    }
  }

  /**
   * Toggle the content visibility
   */
  toggle(): void {
    this.isExpanded = !this.isExpanded;

    // Notify group if part of a toggle group
    if (this.group && this.isExpanded) {
      window.dispatchEvent(new CustomEvent('wb-toggle-group-change', {
        detail: { group: this.group, toggle: this }
      }));
    }

    // Emit custom event
    const eventName = this.isExpanded ? 'wb-toggle-show' : 'wb-toggle-hide';
    this.emitEvent(eventName, { expanded: this.isExpanded });

    // Screen reader announcement
    const message = this.isExpanded
      ? this.getMessage('wb-toggle', 'show')
      : this.getMessage('wb-toggle', 'hide');
    this.announce(`${this.label} ${message}`);
  }

  /**
   * Show the content
   */
  show(): void {
    if (!this.isExpanded) {
      this.toggle();
    }
  }

  /**
   * Hide the content
   */
  hide(): void {
    if (this.isExpanded) {
      this.toggle();
    }
  }

  /**
   * Handle group toggle changes (close others in the same group)
   */
  private handleGroupChange(event: Event): void {
    const customEvent = event as CustomEvent<{ group: string; toggle: WBToggle }>;
    if (customEvent.detail.group === this.group && customEvent.detail.toggle !== this) {
      this.isExpanded = false;
    }
  }

  /**
   * Handle button click
   */
  private handleClick(): void {
    this.toggle();
  }

  /**
   * Handle keyboard events
   */
  private handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle();
    }
  }

  /**
   * Get the toggle button label
   */
  private getButtonLabel(): string {
    if (this.label) {
      return this.label;
    }

    const action = this.isExpanded
      ? this.getMessage('wb-toggle', 'hide')
      : this.getMessage('wb-toggle', 'show');
    return `${action} ${this.getMessage('wb-toggle', 'toggleContent')}`;
  }

  /**
   * Render chevron icon
   */
  private renderIcon() {
    if (!this.showIcon) return '';

    return html`
      <span class="toggle-icon ${this.isExpanded ? 'expanded' : ''}" aria-hidden="true">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
        </svg>
      </span>
    `;
  }

  override render() {
    const contentId = `${this.componentId}-content`;

    return html`
      <button
        class="toggle-button"
        aria-expanded="${this.isExpanded}"
        aria-controls="${contentId}"
        @click="${this.handleClick}"
        @keydown="${this.handleKeydown}"
        type="button"
      >
        ${this.renderIcon()}
        <span class="toggle-label">${this.getButtonLabel()}</span>
      </button>

      <div
        id="${contentId}"
        class="toggle-content ${this.isExpanded ? 'expanded' : ''}"
        role="region"
        aria-hidden="${!this.isExpanded}"
      >
        <div class="toggle-content-inner">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-toggle': WBToggle;
  }
}
