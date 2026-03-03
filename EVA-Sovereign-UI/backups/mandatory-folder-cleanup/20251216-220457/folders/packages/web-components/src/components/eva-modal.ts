import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from './EVAElement.js';
import { FocusTrap } from '../utils/accessibility.js';

/**
 * EVA Modal Component
 * GC Design System compliant modal dialog
 * WCAG 2.2 AAA compliant with focus trap
 * 
 * @element eva-modal
 * 
 * @fires close - Fires when modal is closed
 * 
 * @example
 * ```html
 * <eva-modal open>
 *   <h2 slot="header">Modal Title</h2>
 *   <p>Modal content goes here</p>
 *   <eva-button slot="footer" variant="primary">Confirm</eva-button>
 * </eva-modal>
 * ```
 */
@customElement('eva-modal')
export class EVAModal extends EVAElement {
  protected override componentName = 'eva-modal';

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String })
  label = '';

  @property({ type: Boolean })
  noCloseOnBackdrop = false;

  @property({ type: Boolean })
  noCloseOnEscape = false;

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  private _focusTrap: FocusTrap | null = null;
  private _previousActiveElement: HTMLElement | null = null;

  static override styles = css`
    :host {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
    }

    :host([open]) {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
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

    .modal {
      position: relative;
      background-color: #ffffff;
      border-radius: 0.5rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      max-height: 90vh;
      overflow-y: auto;
      animation: slideIn 200ms ease-in-out;
      z-index: 1001;
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

    .modal[data-size='small'] {
      width: 90%;
      max-width: 400px;
    }

    .modal[data-size='medium'] {
      width: 90%;
      max-width: 600px;
    }

    .modal[data-size='large'] {
      width: 90%;
      max-width: 900px;
    }

    .modal-header {
      padding: 1.5rem;
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    .modal-header ::slotted(h2) {
      margin: 0;
      font-size: 1.5rem;
      color: #333333;
    }

    .close-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      font-size: 1.5rem;
      color: #666666;
      line-height: 1;
      border-radius: 0.25rem;
      min-width: 44px;
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 200ms ease-in-out;
    }

    .close-button:hover {
      background-color: #f5f5f5;
    }

    .close-button:focus-visible {
      outline: 3px solid #26374A;
      outline-offset: 2px;
    }

    .modal-body {
      padding: 1.5rem;
      color: #333333;
      line-height: 1.6;
    }

    .modal-footer {
      padding: 1.5rem;
      border-top: 1px solid #e5e5e5;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 1rem;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .backdrop,
      .modal {
        animation: none;
      }
    }
  `;

  override render() {
    if (!this.open) return html``;

    return html`
      <div class="backdrop modal-backdrop" @click="${this._handleBackdropClick}"></div>
      <dialog
        class="modal"
        data-size="${this.size}"
        ?open="${this.open}"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-header"
        aria-label="${this.label || this.ariaLabel || 'Modal dialog'}"
      >
        <div class="modal-header" id="modal-header">
          <slot name="header"></slot>
          <button
            class="close-button modal-close"
            aria-label="${this.t('eva-modal.close', 'Close modal')}"
            @click="${this.close}"
          >
            ×
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </dialog>
    `;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (this.open) {
      this._setupFocusTrap();
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._teardownFocusTrap();
  }

  override updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('open')) {
      if (this.open) {
        this._setupFocusTrap();
        this._previousActiveElement = document.activeElement as HTMLElement;
        document.body.style.overflow = 'hidden';
        
        this.dispatchEvent(
          new CustomEvent('eva-open', {
            bubbles: true,
            composed: true,
          })
        );
      } else {
        this._teardownFocusTrap();
        if (this._previousActiveElement) {
          this._previousActiveElement.focus();
        }
        document.body.style.overflow = '';
      }
    }
  }

  private _setupFocusTrap(): void {
    const modal = this.shadowRoot?.querySelector('.modal');
    if (modal) {
      this._focusTrap = new FocusTrap(modal as HTMLElement);
      this._focusTrap.activate();
    }

    if (!this.noCloseOnEscape) {
      document.addEventListener('keydown', this._handleKeydown);
    }
  }

  private _teardownFocusTrap(): void {
    if (this._focusTrap) {
      this._focusTrap.deactivate();
      this._focusTrap = null;
    }
    document.removeEventListener('keydown', this._handleKeydown);
  }

  private _handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && !this.noCloseOnEscape) {
      event.preventDefault();
      this.close();
    }
  };

  private _handleBackdropClick(event: MouseEvent): void {
    if (!this.noCloseOnBackdrop && event.target === event.currentTarget) {
      this.close();
    }
  }

  public close(): void {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent('eva-close', {
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eva-modal': EVAModal;
  }
}
