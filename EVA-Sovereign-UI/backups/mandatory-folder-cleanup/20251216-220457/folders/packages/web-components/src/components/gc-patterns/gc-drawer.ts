import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

@customElement('gc-drawer')
export class GCDrawer extends EVAElement {
  static override styles = css`
    :host {
      display: none;
    }

    :host([open]) {
      display: block;
    }

    .drawer-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 9999;
      animation: fadeIn 0.3s ease-out;
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

    :host([closing]) .drawer-overlay {
      animation: fadeOut 0.3s ease-out;
    }

    .drawer-panel {
      position: fixed;
      background: var(--eva-colors-white, #fff);
      box-shadow: -4px 0 16px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      z-index: 10000;
    }

    :host([position="left"]) .drawer-panel {
      top: 0;
      left: 0;
      bottom: 0;
      width: var(--drawer-width, 320px);
      animation: slideInLeft 0.3s ease-out;
    }

    :host([position="right"]) .drawer-panel {
      top: 0;
      right: 0;
      bottom: 0;
      width: var(--drawer-width, 320px);
      animation: slideInRight 0.3s ease-out;
    }

    :host([position="top"]) .drawer-panel {
      top: 0;
      left: 0;
      right: 0;
      height: var(--drawer-height, 320px);
      animation: slideInTop 0.3s ease-out;
    }

    :host([position="bottom"]) .drawer-panel {
      bottom: 0;
      left: 0;
      right: 0;
      height: var(--drawer-height, 320px);
      animation: slideInBottom 0.3s ease-out;
    }

    @keyframes slideInLeft {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(0);
      }
    }

    @keyframes slideInRight {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(0);
      }
    }

    @keyframes slideInTop {
      from {
        transform: translateY(-100%);
      }
      to {
        transform: translateY(0);
      }
    }

    @keyframes slideInBottom {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }

    @keyframes slideOutLeft {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-100%);
      }
    }

    @keyframes slideOutRight {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(100%);
      }
    }

    @keyframes slideOutTop {
      from {
        transform: translateY(0);
      }
      to {
        transform: translateY(-100%);
      }
    }

    @keyframes slideOutBottom {
      from {
        transform: translateY(0);
      }
      to {
        transform: translateY(100%);
      }
    }

    :host([closing][position="left"]) .drawer-panel {
      animation: slideOutLeft 0.3s ease-out;
    }

    :host([closing][position="right"]) .drawer-panel {
      animation: slideOutRight 0.3s ease-out;
    }

    :host([closing][position="top"]) .drawer-panel {
      animation: slideOutTop 0.3s ease-out;
    }

    :host([closing][position="bottom"]) .drawer-panel {
      animation: slideOutBottom 0.3s ease-out;
    }

    .drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--eva-spacing-lg, 1.5rem);
      border-bottom: 1px solid var(--eva-colors-border, #ddd);
      flex-shrink: 0;
    }

    .drawer-title {
      margin: 0;
      color: var(--eva-colors-text, #333);
      font-family: var(--eva-fonts-heading);
      font-size: var(--eva-font-size-xl, 1.5rem);
      font-weight: 700;
      line-height: 1.2;
    }

    .drawer-close {
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

    .drawer-close:hover {
      background: var(--eva-colors-background-light, #f5f5f5);
    }

    .drawer-close:focus {
      outline: 3px solid var(--eva-colors-focus, #269abc);
      outline-offset: 2px;
    }

    .drawer-close-icon {
      width: 24px;
      height: 24px;
    }

    .drawer-body {
      flex: 1;
      overflow-y: auto;
      padding: var(--eva-spacing-lg, 1.5rem);
      color: var(--eva-colors-text, #333);
      font-family: var(--eva-fonts-body);
      font-size: var(--eva-font-size-md, 1rem);
      line-height: 1.5;
    }

    .drawer-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--eva-spacing-sm, 0.75rem);
      padding: var(--eva-spacing-lg, 1.5rem);
      border-top: 1px solid var(--eva-colors-border, #ddd);
      flex-shrink: 0;
    }

    :host([size="small"]) {
      --drawer-width: 240px;
      --drawer-height: 240px;
    }

    :host([size="large"]) {
      --drawer-width: 480px;
      --drawer-height: 480px;
    }

    :host([size="full"]) {
      --drawer-width: 100vw;
      --drawer-height: 100vh;
    }

    @media (max-width: 768px) {
      :host([position="left"]) .drawer-panel,
      :host([position="right"]) .drawer-panel {
        width: 100%;
        max-width: 90vw;
      }

      :host([position="top"]) .drawer-panel,
      :host([position="bottom"]) .drawer-panel {
        height: 100%;
        max-height: 90vh;
      }

      .drawer-header {
        padding: var(--eva-spacing-md, 1rem);
      }

      .drawer-body {
        padding: var(--eva-spacing-md, 1rem);
      }

      .drawer-footer {
        padding: var(--eva-spacing-md, 1rem);
      }

      .drawer-title {
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
  position: 'left' | 'right' | 'top' | 'bottom' = 'right';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' | 'full' = 'medium';

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
      
      this.emitEvent('gc-drawer-close', {
        timestamp: new Date().toISOString()
      });
    }, 300);
  }

  private handleOverlayClick(e: Event) {
    if (!this.closeOnOverlayClick) return;
    
    const target = e.target as HTMLElement;
    if (target.classList.contains('drawer-overlay')) {
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
        
        this.emitEvent('gc-drawer-open', {
          timestamp: new Date().toISOString()
        });

        setTimeout(() => {
          const closeButton = this.shadowRoot?.querySelector('.drawer-close') as HTMLElement;
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
        class="drawer-close-icon"
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
        class="drawer-overlay"
        @click="${this.handleOverlayClick}"
      ></div>
      <div
        class="drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div class="drawer-header">
          <h2 id="drawer-title" class="drawer-title">
            ${this.heading}
          </h2>
          ${this.dismissible ? html`
            <button
              class="drawer-close"
              type="button"
              @click="${this.handleClose}"
              aria-label="${closeLabel}"
            >
              ${this.renderCloseIcon()}
            </button>
          ` : ''}
        </div>

        <div class="drawer-body">
          <slot></slot>
        </div>

        <div class="drawer-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

registerMessages('gc-drawer', {
  'en-CA': {
    'closeLabel': 'Close drawer'
  },
  'fr-CA': {
    'closeLabel': 'Fermer le panneau'
  }
});
