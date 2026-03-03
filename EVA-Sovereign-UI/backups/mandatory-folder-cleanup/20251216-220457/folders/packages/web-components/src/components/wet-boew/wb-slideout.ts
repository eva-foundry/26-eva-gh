import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-Slideout - Slide-Out Panels
 * Panels that slide in from left/right/top/bottom with overlay
 */
@customElement('wb-slideout')
export class WBSlideout extends EVAElement {
  static override styles = css`
    :host {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9998;
    }

    :host([open]) {
      display: block;
    }

    .slideout-backdrop {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      animation: fadeIn 0.3s ease;
    }

    .slideout-panel {
      position: absolute;
      background: var(--eva-colors-background-default, #ffffff);
      box-shadow: 0 0 24px rgba(0, 0, 0, 0.3);
      overflow: auto;
    }

    .slideout-panel.left {
      top: 0;
      bottom: 0;
      left: 0;
      width: 400px;
      max-width: 90vw;
      animation: slideInLeft 0.3s ease;
    }

    .slideout-panel.right {
      top: 0;
      bottom: 0;
      right: 0;
      width: 400px;
      max-width: 90vw;
      animation: slideInRight 0.3s ease;
    }

    .slideout-panel.top {
      top: 0;
      left: 0;
      right: 0;
      height: 300px;
      max-height: 90vh;
      animation: slideInTop 0.3s ease;
    }

    .slideout-panel.bottom {
      bottom: 0;
      left: 0;
      right: 0;
      height: 300px;
      max-height: 90vh;
      animation: slideInBottom 0.3s ease;
    }

    .slideout-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--eva-spacing-md, 1rem);
      border-bottom: 1px solid var(--eva-colors-border-default, #cccccc);
    }

    .slideout-close {
      width: 36px;
      height: 36px;
      padding: 0;
      border: none;
      border-radius: var(--eva-border-radius-sm, 4px);
      background: transparent;
      font-size: 1.5rem;
      cursor: pointer;
    }

    .slideout-close:hover {
      background: var(--eva-colors-background-hover, #f5f5f5);
    }

    .slideout-close:focus {
      outline: 3px solid var(--eva-colors-focus, #303fc1);
    }

    .slideout-content {
      padding: var(--eva-spacing-md, 1rem);
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideInLeft {
      from { transform: translateX(-100%); }
      to { transform: translateX(0); }
    }

    @keyframes slideInRight {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }

    @keyframes slideInTop {
      from { transform: translateY(-100%); }
      to { transform: translateY(0); }
    }

    @keyframes slideInBottom {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }

    @media (prefers-reduced-motion: reduce) {
      .slideout-backdrop,
      .slideout-panel {
        animation: none;
      }
    }
  `;

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String })
  position: 'left' | 'right' | 'top' | 'bottom' = 'right';

  @property({ type: Boolean, attribute: 'close-on-backdrop' })
  closeOnBackdrop = true;

  @property({ type: Boolean, attribute: 'show-close' })
  showClose = true;

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-slideout', {
      'en-CA': {
        close: 'Close panel',
        panelOpened: 'Panel opened',
        panelClosed: 'Panel closed'
      },
      'fr-CA': {
        close: 'Fermer le panneau',
        panelOpened: 'Panneau ouvert',
        panelClosed: 'Panneau fermé'
      }
    });

    document.addEventListener('keydown', this.handleEscKey.bind(this));
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.handleEscKey.bind(this));
  }

  override updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('open')) {
      if (this.open) {
        document.body.style.overflow = 'hidden';
        this.emitEvent('wb-slideout-open', {});
        this.announce(this.getMessage('wb-slideout', 'panelOpened'));
      } else {
        document.body.style.overflow = '';
        this.emitEvent('wb-slideout-close', {});
        this.announce(this.getMessage('wb-slideout', 'panelClosed'));
      }
    }
  }

  showPanel(): void {
    this.open = true;
  }

  close(): void {
    this.open = false;
  }

  toggle(): void {
    this.open = !this.open;
  }

  private handleEscKey(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.open) {
      this.close();
    }
  }

  private handleBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget && this.closeOnBackdrop) {
      this.close();
    }
  }

  override render() {
    return html`
      <div class="slideout-backdrop" @click="${this.handleBackdropClick}">
        <div class="slideout-panel ${this.position}" role="dialog" aria-modal="true" @click="${(e: Event) => e.stopPropagation()}">
          ${this.showClose ? html`
            <div class="slideout-header">
              <slot name="header"></slot>
              <button class="slideout-close" aria-label="${this.getMessage('wb-slideout', 'close')}" @click="${this.close}">×</button>
            </div>
          ` : ''}
          <div class="slideout-content">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-slideout': WBSlideout;
  }
}
