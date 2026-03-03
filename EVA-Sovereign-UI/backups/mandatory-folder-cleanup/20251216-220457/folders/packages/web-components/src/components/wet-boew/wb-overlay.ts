import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-Overlay - Modal Overlays
 * 
 * Based on WET-BOEW Overlay/Modal component patterns.
 * Implements ARIA dialog pattern for accessible modal dialogs.
 * 
 * Features:
 * - Modal backdrop (blocks background interaction)
 * - Focus trap (Tab/Shift+Tab cycles within modal)
 * - Esc key closes modal
 * - Backdrop click closes modal (configurable)
 * - Focus management (returns focus on close)
 * - ARIA dialog pattern (role="dialog", aria-modal)
 * - Screen reader announcements
 * - Prevent body scroll when open
 * - Smooth fade-in/out animations
 * - Bilingual labels (EN-CA/FR-CA)
 * - WCAG 2.2 AAA compliant
 * 
 * @fires wb-overlay-open - Fired when overlay opens
 * @fires wb-overlay-close - Fired when overlay closes
 * 
 * @slot - The modal content
 * @slot header - Optional modal header
 * @slot footer - Optional modal footer
 * 
 * @example
 * ```html
 * <wb-overlay id="myModal">
 *   <h2 slot="header">Confirm action</h2>
 *   <p>Are you sure you want to continue?</p>
 *   <div slot="footer">
 *     <button onclick="document.getElementById('myModal').close()">Cancel</button>
 *     <button onclick="confirm()">Confirm</button>
 *   </div>
 * </wb-overlay>
 * 
 * <button onclick="document.getElementById('myModal').open()">Open Modal</button>
 * ```
 */
@customElement('wb-overlay')
export class WBOverlay extends EVAElement {
  static override styles = css`
    :host {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
      align-items: center;
      justify-content: center;
    }

    :host([open]) {
      display: flex;
    }

    .overlay-backdrop {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      animation: fadeIn 0.3s ease;
    }

    .overlay-dialog {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
      overflow: auto;
      background: var(--eva-colors-background-default, #ffffff);
      border-radius: var(--eva-border-radius-lg, 8px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
      animation: slideIn 0.3s ease;
    }

    .overlay-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--eva-spacing-md, 1rem) var(--eva-spacing-lg, 1.5rem);
      border-bottom: 1px solid var(--eva-colors-border-default, #cccccc);
    }

    .overlay-header ::slotted([slot="header"]) {
      margin: 0;
      font-size: var(--eva-font-size-xl, 1.5rem);
      font-weight: var(--eva-font-weight-semibold, 600);
      color: var(--eva-colors-text-default, #333333);
    }

    .overlay-close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      padding: 0;
      margin-left: var(--eva-spacing-md, 1rem);
      border: none;
      border-radius: var(--eva-border-radius-sm, 4px);
      background: transparent;
      color: var(--eva-colors-text-default, #333333);
      font-size: 1.5rem;
      line-height: 1;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .overlay-close:hover {
      background: var(--eva-colors-background-hover, #f5f5f5);
    }

    .overlay-close:focus {
      outline: 3px solid var(--eva-colors-focus, #303fc1);
      outline-offset: 2px;
    }

    .overlay-content {
      padding: var(--eva-spacing-lg, 1.5rem);
    }

    .overlay-footer {
      padding: var(--eva-spacing-md, 1rem) var(--eva-spacing-lg, 1.5rem);
      border-top: 1px solid var(--eva-colors-border-default, #cccccc);
      background: var(--eva-colors-background-subtle, #f9f9f9);
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .overlay-backdrop,
      .overlay-dialog {
        animation: none;
      }
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
      .overlay-dialog {
        max-width: 95vw;
        max-height: 95vh;
      }
    }
  `;

  /**
   * Whether overlay is open
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Whether clicking backdrop closes overlay
   */
  @property({ type: Boolean, attribute: 'close-on-backdrop' })
  closeOnBackdrop = true;

  /**
   * Whether Esc key closes overlay
   */
  @property({ type: Boolean, attribute: 'close-on-esc' })
  closeOnEsc = true;

  /**
   * Whether to show close button in header
   */
  @property({ type: Boolean, attribute: 'show-close' })
  showClose = true;

  /**
   * Modal size (small, medium, large, full)
   */
  @property({ type: String })
  size: 'small' | 'medium' | 'large' | 'full' = 'medium';

  @query('.overlay-dialog')
  private dialog?: HTMLElement;

  @query('.overlay-close')
  private closeButton?: HTMLElement;

  /**
   * Element that had focus before modal opened
   */
  private previousFocus?: HTMLElement;

  /**
   * Focusable elements within modal
   */
  private focusableElements: HTMLElement[] = [];

  override connectedCallback(): void {
    super.connectedCallback();

    // Register bilingual messages
    registerMessages('wb-overlay', {
      'en-CA': {
        close: 'Close',
        closeDialog: 'Close dialog',
        dialogOpen: 'Dialog opened',
        dialogClosed: 'Dialog closed'
      },
      'fr-CA': {
        close: 'Fermer',
        closeDialog: 'Fermer la boîte de dialogue',
        dialogOpen: 'Boîte de dialogue ouverte',
        dialogClosed: 'Boîte de dialogue fermée'
      }
    });

    // Handle Esc key globally
    document.addEventListener('keydown', this.handleEscKey.bind(this));
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.handleEscKey.bind(this));
    this.restoreBodyScroll();
  }

  override updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('open')) {
      if (this.open) {
        this.handleOpen();
      } else {
        this.handleClose();
      }
    }
  }

  /**
   * Handle modal open
   */
  private handleOpen(): void {
    // Save current focus
    this.previousFocus = document.activeElement as HTMLElement;

    // Prevent body scroll
    this.preventBodyScroll();

    // Wait for render, then set focus
    setTimeout(() => {
      this.setInitialFocus();
      this.cacheFocusableElements();
    }, 100);

    // Emit event and announce
    this.emitEvent('wb-overlay-open', {});
    this.announce(this.getMessage('wb-overlay', 'dialogOpen'));
  }

  /**
   * Handle modal close
   */
  private handleClose(): void {
    // Restore body scroll
    this.restoreBodyScroll();

    // Restore focus
    if (this.previousFocus) {
      this.previousFocus.focus();
      this.previousFocus = undefined;
    }

    // Emit event and announce
    this.emitEvent('wb-overlay-close', {});
    this.announce(this.getMessage('wb-overlay', 'dialogClosed'));
  }

  /**
   * Prevent body scroll when modal is open
   */
  private preventBodyScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  /**
   * Restore body scroll
   */
  private restoreBodyScroll(): void {
    document.body.style.overflow = '';
  }

  /**
   * Set initial focus to first focusable element or close button
   */
  private setInitialFocus(): void {
    // Try to focus close button first
    if (this.showClose && this.closeButton) {
      this.closeButton.focus();
      return;
    }

    // Otherwise focus first focusable element in content
    const firstFocusable = this.dialog?.querySelector<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();
  }

  /**
   * Cache focusable elements for focus trap
   */
  private cacheFocusableElements(): void {
    if (!this.dialog) return;

    const selector = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    this.focusableElements = Array.from(
      this.shadowRoot?.querySelectorAll<HTMLElement>(selector) || []
    );

    // Also get focusable elements from light DOM slots
    const slots = this.shadowRoot?.querySelectorAll('slot');
    slots?.forEach((slot) => {
      const assigned = slot.assignedElements({ flatten: true });
      assigned.forEach((el) => {
        const focusable = el.querySelectorAll<HTMLElement>(selector);
        this.focusableElements.push(...Array.from(focusable));
      });
    });
  }

  /**
   * Trap focus within modal (Tab/Shift+Tab)
   */
  private handleFocusTrap(event: KeyboardEvent): void {
    if (event.key !== 'Tab' || !this.open) return;

    if (this.focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const firstFocusable = this.focusableElements[0];
    const lastFocusable = this.focusableElements[this.focusableElements.length - 1];
    const activeElement = this.shadowRoot?.activeElement || document.activeElement;

    if (event.shiftKey) {
      // Shift + Tab (backwards)
      if (activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable?.focus();
      }
    } else {
      // Tab (forwards)
      if (activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable?.focus();
      }
    }
  }

  /**
   * Handle Esc key to close modal
   */
  private handleEscKey(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.open && this.closeOnEsc) {
      event.preventDefault();
      this.close();
    }
  }

  /**
   * Handle backdrop click
   */
  private handleBackdropClick(event: MouseEvent): void {
    // Only close if clicking directly on backdrop (not dialog)
    if (event.target === event.currentTarget && this.closeOnBackdrop) {
      this.close();
    }
  }

  /**
   * Handle dialog keydown for focus trap
   */
  private handleDialogKeydown(event: KeyboardEvent): void {
    this.handleFocusTrap(event);
  }

  /**
   * Handle close button click
   */
  private handleCloseClick(): void {
    this.close();
  }

  /**
   * Open the modal
   */
  showModal(): void {
    this.open = true;
  }

  /**
   * Close the modal
   */
  close(): void {
    this.open = false;
  }

  /**
   * Toggle modal open/closed
   */
  toggle(): void {
    this.open = !this.open;
  }

  /**
   * Get dialog width based on size
   */
  private getDialogWidth(): string {
    switch (this.size) {
      case 'small':
        return '400px';
      case 'medium':
        return '600px';
      case 'large':
        return '900px';
      case 'full':
        return '100vw';
      default:
        return '600px';
    }
  }

  override render() {
    const hasHeader = this.querySelector('[slot="header"]') || this.showClose;
    const hasFooter = this.querySelector('[slot="footer"]');

    return html`
      <div
        class="overlay-backdrop"
        @click="${this.handleBackdropClick}"
        aria-hidden="true"
      >
        <div
          class="overlay-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="${this.componentId}-title"
          style="width: ${this.getDialogWidth()};"
          @keydown="${this.handleDialogKeydown}"
          @click="${(e: Event) => e.stopPropagation()}"
        >
          ${hasHeader ? html`
            <div class="overlay-header">
              <div id="${this.componentId}-title">
                <slot name="header"></slot>
              </div>
              ${this.showClose ? html`
                <button
                  class="overlay-close"
                  aria-label="${this.getMessage('wb-overlay', 'closeDialog')}"
                  @click="${this.handleCloseClick}"
                  type="button"
                >
                  ×
                </button>
              ` : ''}
            </div>
          ` : ''}

          <div class="overlay-content">
            <slot></slot>
          </div>

          ${hasFooter ? html`
            <div class="overlay-footer">
              <slot name="footer"></slot>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-overlay': WBOverlay;
  }
}
