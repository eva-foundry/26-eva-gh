import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-Collapsible-Alerts - Collapsible Alert Boxes
 * Alerts that can be dismissed or collapsed with localStorage persistence
 */
@customElement('wb-collapsible-alerts')
export class WBCollapsibleAlerts extends EVAElement {
  static override styles = css`
    :host {
      display: block;
      margin: var(--eva-spacing-md, 1rem) 0;
    }

    :host([hidden]) {
      display: none;
    }

    .alert {
      position: relative;
      padding: var(--eva-spacing-md, 1rem);
      border: 1px solid transparent;
      border-radius: var(--eva-border-radius-md, 4px);
      margin-bottom: var(--eva-spacing-sm, 0.5rem);
      display: flex;
      align-items: flex-start;
      gap: var(--eva-spacing-sm, 0.5rem);
      transition: max-height 0.3s ease, opacity 0.3s ease, margin 0.3s ease, padding 0.3s ease;
      overflow: hidden;
    }

    .alert.info {
      background-color: var(--eva-colors-background-info, #d9edf7);
      border-color: var(--eva-colors-border-info, #bce8f1);
      color: var(--eva-colors-text-info, #31708f);
    }

    .alert.success {
      background-color: var(--eva-colors-background-success, #dff0d8);
      border-color: var(--eva-colors-border-success, #d6e9c6);
      color: var(--eva-colors-text-success, #3c763d);
    }

    .alert.warning {
      background-color: var(--eva-colors-background-warning, #fcf8e3);
      border-color: var(--eva-colors-border-warning, #faebcc);
      color: var(--eva-colors-text-warning, #8a6d3b);
    }

    .alert.danger {
      background-color: var(--eva-colors-background-danger, #f2dede);
      border-color: var(--eva-colors-border-danger, #ebccd1);
      color: var(--eva-colors-text-danger, #a94442);
    }

    .alert.collapsed {
      max-height: 0;
      opacity: 0;
      padding: 0 var(--eva-spacing-md, 1rem);
      margin-bottom: 0;
    }

    .alert-icon {
      flex-shrink: 0;
      font-size: 1.2rem;
      margin-top: 0.125rem;
    }

    .alert-content {
      flex: 1;
    }

    .alert-actions {
      display: flex;
      gap: var(--eva-spacing-xs, 0.25rem);
      margin-left: auto;
    }

    .alert-btn {
      width: 28px;
      height: 28px;
      padding: 0;
      border: none;
      background: transparent;
      font-size: 1.25rem;
      line-height: 1;
      cursor: pointer;
      border-radius: var(--eva-border-radius-sm, 3px);
      opacity: 0.7;
    }

    .alert-btn:hover {
      opacity: 1;
      background: rgba(0, 0, 0, 0.05);
    }

    .alert-btn:focus {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }

    .collapse-btn {
      transform: rotate(0deg);
      transition: transform 0.3s ease;
    }

    .alert.collapsed .collapse-btn {
      transform: rotate(180deg);
    }

    @media (prefers-reduced-motion: reduce) {
      .alert,
      .collapse-btn {
        transition: none;
      }
    }
  `;

  @property({ type: String })
  type: 'info' | 'success' | 'warning' | 'danger' = 'info';

  @property({ type: Boolean })
  dismissible = false;

  @property({ type: Boolean })
  collapsible = false;

  @property({ type: String, attribute: 'storage-key' })
  storageKey = '';

  @state()
  private isCollapsed = false;

  @state()
  private isDismissed = false;

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-collapsible-alerts', {
      'en-CA': {
        dismiss: 'Dismiss alert',
        collapse: 'Collapse alert',
        expand: 'Expand alert',
        alertDismissed: 'Alert dismissed',
        alertCollapsed: 'Alert collapsed',
        alertExpanded: 'Alert expanded'
      },
      'fr-CA': {
        dismiss: 'Ignorer l\'alerte',
        collapse: 'Réduire l\'alerte',
        expand: 'Agrandir l\'alerte',
        alertDismissed: 'Alerte ignorée',
        alertCollapsed: 'Alerte réduite',
        alertExpanded: 'Alerte agrandie'
      }
    });

    if (this.storageKey) {
      const stored = localStorage.getItem(this.storageKey);
      if (stored === 'dismissed') {
        this.isDismissed = true;
      } else if (stored === 'collapsed') {
        this.isCollapsed = true;
      }
    }
  }

  dismiss(): void {
    this.isDismissed = true;
    if (this.storageKey) {
      localStorage.setItem(this.storageKey, 'dismissed');
    }
    this.emitEvent('wb-alert-dismiss', {});
    this.announce(this.getMessage('wb-collapsible-alerts', 'alertDismissed'));
  }

  collapse(): void {
    this.isCollapsed = !this.isCollapsed;
    if (this.storageKey) {
      localStorage.setItem(this.storageKey, this.isCollapsed ? 'collapsed' : 'expanded');
    }
    this.emitEvent(this.isCollapsed ? 'wb-alert-collapse' : 'wb-alert-expand', {});
    this.announce(this.getMessage('wb-collapsible-alerts', this.isCollapsed ? 'alertCollapsed' : 'alertExpanded'));
  }

  reset(): void {
    this.isDismissed = false;
    this.isCollapsed = false;
    if (this.storageKey) {
      localStorage.removeItem(this.storageKey);
    }
  }

  private getIcon(): string {
    const icons = {
      info: 'ℹ️',
      success: '✓',
      warning: '⚠',
      danger: '✕'
    };
    return icons[this.type];
  }

  override render() {
    if (this.isDismissed) {
      return null;
    }

    const classes = `alert ${this.type} ${this.isCollapsed ? 'collapsed' : ''}`;

    return html`
      <div class="${classes}" role="alert">
        <span class="alert-icon">${this.getIcon()}</span>
        <div class="alert-content">
          <slot></slot>
        </div>
        <div class="alert-actions">
          ${this.collapsible ? html`
            <button
              class="alert-btn collapse-btn"
              aria-label="${this.isCollapsed ? this.getMessage('wb-collapsible-alerts', 'expand') : this.getMessage('wb-collapsible-alerts', 'collapse')}"
              @click="${this.collapse}"
            >▲</button>
          ` : ''}
          ${this.dismissible ? html`
            <button
              class="alert-btn"
              aria-label="${this.getMessage('wb-collapsible-alerts', 'dismiss')}"
              @click="${this.dismiss}"
            >×</button>
          ` : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-collapsible-alerts': WBCollapsibleAlerts;
  }
}
