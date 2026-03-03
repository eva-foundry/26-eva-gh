import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

@customElement('gc-modal')
export class GCModal extends EVAElement {
  static override styles = css`
    :host {
      display: none;
    }

    :host([open]) {
      display: block;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: var(--eva-spacing-lg, 1.5rem);
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }

    :host([closing]) .modal-overlay {
      animation: fadeOut 0.2s ease-out;
    }

    .modal-dialog {
      position: relative;
      background: var(--eva-colors-white, #fff);
      border-radius: 4px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      max-width: var(--modal-max-width, 600px);
      width: 100%;
      max-height: calc(100vh - 3rem);
      display: flex;
      flex-direction: column;
      animation: slideUp 0.2s ease-out;
    }

    @keyframes slideUp {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @keyframes slideDown {
      from {
        transform: translateY(0);
        opacity: 1;
      }
      to {
        transform: translateY(20px);
        opacity: 0;
      }
    }

    :host([closing]) .modal-dialog {
      animation: slideDown 0.2s ease-out;
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--eva-spacing-lg, 1.5rem);
      border-bottom: 1px solid var(--eva-colors-border, #ddd);
    }

    .modal-title {
      margin: 0;
      color: var(--eva-colors-text, #333);
      font-family: var(--eva-fonts-heading);
      font-size: var(--eva-font-size-xl, 1.5rem);
      font-weight: 700;
      line-height: 1.2;
    }

    .modal-close {
      flex-shrink: 0;
      width: 32px;
      height: 32px;
      padding: 0;
      background: none;
      border: none;
      color: var(--eva-colors-text, #333);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: background-color 0.2s;
    }

    .modal-close:hover {
      background: var(--eva-colors-background-light, #f5f5f5);
    }

    .modal-close:focus {
      outline: 3px solid var(--eva-colors-focus, #269abc);
      outline-offset: 2px;
    }

    .modal-close-icon {
      width: 24px;
      height: 24px;
    }

    .modal-body {
      flex: 1;
      overflow-y: auto;
      padding: var(--eva-spacing-lg, 1.5rem);
      color: var(--eva-colors-text, #333);
      font-family: var(--eva-fonts-body);
      font-size: var(--eva-font-size-md, 1rem);
      line-height: 1.5;
    }

    .modal-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--eva-spacing-sm, 0.75rem);
      padding: var(--eva-spacing-lg, 1.5rem);
      border-top: 1px solid var(--eva-colors-border, #ddd);
    }

    :host([size="small"]) {
      --modal-max-width: 400px;
    }

    :host([size="large"]) {
      --modal-max-width: 800px;
    }

    :host([size="fullscreen"]) {
      --modal-max-width: calc(100vw - 3rem);
    }

    :host([size="fullscreen"]) .modal-dialog {
      max-height: calc(100vh - 3rem);
    }

    @media (max-width: 768px) {
      .modal-overlay {
        padding: 0;
        align-items: flex-end;
      }

      .modal-dialog {
        max-width: 100%;
        max-height: 90vh;
        border-radius: 8px 8px 0 0;
      }

      .modal-header {
        padding: var(--eva-spacing-md, 1rem);
      }

      .modal-body {
        padding: var(--eva-spacing-md, 1rem);
      }

      .modal-footer {
        padding: var(--eva-spacing-md, 1rem);
      }

      .modal-title {
        font-size: var(--eva-font-size-lg, 1.125rem);
      }
    }

    @media print {
      :host {
        display: none !important;
      }
    }
  `;

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String })
  heading = '';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' | 'fullscreen' = 'medium';

  @property({ type: Boolean })
  dismissible = true;

  @property({ type: Boolean })
  closeOnOverlayClick = true;

  @property({ type: Boolean, reflect: true })
  closing = false;

  private handleClose() {
    if (!this.dismissible) return;

    this.closing = true;

    setTimeout(() => {
      this.open = false;
      this.closing = false;
      
      this.emitEvent('gc-modal-close', {
        timestamp: new Date().toISOString()
      });
    }, 200);
  }

  private handleOverlayClick(e: Event) {
    if (!this.closeOnOverlayClick) return;
    
    const target = e.target as HTMLElement;
    if (target.classList.contains('modal-overlay')) {
      this.handleClose();
    }
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.dismissible) {
      this.handleClose();
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    
    if (this.open) {
      document.addEventListener('keydown', this.handleKeyDown.bind(this));
      document.body.style.overflow = 'hidden';
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
    document.body.style.overflow = '';
  }

  override updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('open')) {
      if (this.open) {
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.body.style.overflow = 'hidden';
        
        this.emitEvent('gc-modal-open', {
          timestamp: new Date().toISOString()
        });

        setTimeout(() => {
          const closeButton = this.shadowRoot?.querySelector('.modal-close') as HTMLElement;
          if (closeButton) {
            closeButton.focus();
          }
        }, 100);
      } else {
        document.removeEventListener('keydown', this.handleKeyDown.bind(this));
        document.body.style.overflow = '';
      }
    }
  }

  private renderCloseIcon() {
    return html`
      <svg
        class="modal-close-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    `;
  }

  protected override render() {
    if (!this.open && !this.closing) {
      return html``;
    }

    const closeLabel = this.getMessage('closeLabel');

    return html`
      <div
        class="modal-overlay"
        @click="${this.handleOverlayClick}"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div class="modal-dialog">
          <div class="modal-header">
            <h2 id="modal-title" class="modal-title">
              ${this.heading}
            </h2>
            ${this.dismissible ? html`
              <button
                class="modal-close"
                type="button"
                @click="${this.handleClose}"
                aria-label="${closeLabel}"
              >
                ${this.renderCloseIcon()}
              </button>
            ` : ''}
          </div>

          <div class="modal-body">
            <slot></slot>
          </div>

          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

registerMessages('gc-modal', {
  'en-CA': {
    'closeLabel': 'Close modal'
  },
  'fr-CA': {
    'closeLabel': 'Fermer la fenêtre modale'
  }
});
