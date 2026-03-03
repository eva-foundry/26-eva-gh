import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

export interface Notification {
  id: string;
  message: string;
  variant: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  dismissible?: boolean;
}

@customElement('gc-notification-toast')
export class GCNotificationToast extends EVAElement {
  static override styles = css`
    :host {
      display: block;
      position: fixed;
      top: var(--eva-spacing-lg, 1.5rem);
      right: var(--eva-spacing-lg, 1.5rem);
      z-index: 9999;
      max-width: 400px;
      font-family: var(--eva-fonts-body);
    }

    .toast-container {
      display: flex;
      flex-direction: column;
      gap: var(--eva-spacing-sm, 0.75rem);
    }

    .toast {
      display: flex;
      align-items: flex-start;
      gap: var(--eva-spacing-sm, 0.75rem);
      padding: var(--eva-spacing-md, 1rem);
      background: var(--eva-colors-white, #fff);
      border-left: 4px solid var(--eva-colors-info, #269abc);
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .toast.removing {
      animation: slideOut 0.3s ease-out;
    }

    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }

    .toast-icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      margin-top: 2px;
    }

    .toast-icon svg {
      width: 100%;
      height: 100%;
      fill: var(--eva-colors-info, #269abc);
    }

    .toast-content {
      flex: 1;
      color: var(--eva-colors-text, #333);
      font-size: var(--eva-font-size-sm, 0.875rem);
      line-height: 1.5;
    }

    .toast-close {
      flex-shrink: 0;
      padding: 0;
      background: transparent;
      border: none;
      cursor: pointer;
      color: var(--eva-colors-text, #333);
      font-size: 1.25rem;
      line-height: 1;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s ease;
    }

    .toast-close:hover,
    .toast-close:focus {
      color: var(--eva-colors-text-dark, #000);
    }

    .toast-close:focus {
      outline: 2px solid var(--eva-colors-focus, #0535d2);
      outline-offset: 2px;
      border-radius: 2px;
    }

    /* Variant: success */
    .toast.success {
      border-left-color: var(--eva-colors-success, #278400);
    }

    .toast.success .toast-icon svg {
      fill: var(--eva-colors-success, #278400);
    }

    /* Variant: warning */
    .toast.warning {
      border-left-color: var(--eva-colors-warning, #ee7100);
    }

    .toast.warning .toast-icon svg {
      fill: var(--eva-colors-warning, #ee7100);
    }

    /* Variant: error */
    .toast.error {
      border-left-color: var(--eva-colors-error, #d3080c);
    }

    .toast.error .toast-icon svg {
      fill: var(--eva-colors-error, #d3080c);
    }

    @media (max-width: 768px) {
      :host {
        top: auto;
        bottom: var(--eva-spacing-lg, 1.5rem);
        right: var(--eva-spacing-md, 1rem);
        left: var(--eva-spacing-md, 1rem);
        max-width: none;
      }

      @keyframes slideIn {
        from {
          transform: translateY(100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @keyframes slideOut {
        from {
          transform: translateY(0);
          opacity: 1;
        }
        to {
          transform: translateY(100%);
          opacity: 0;
        }
      }
    }

    @media print {
      :host {
        display: none;
      }
    }
  `;

  @state()
  private notifications: Array<Notification & { removing?: boolean }> = [];

  @property({ type: Number })
  defaultDuration = 5000;

  protected override render() {
    if (this.notifications.length === 0) {
      return html``;
    }

    return html`
      <div class="toast-container" role="region" aria-live="polite" aria-label="${this.getMessage('ariaLabel')}">
        ${this.notifications.map(notification => this.renderToast(notification))}
      </div>
    `;
  }

  private renderToast(notification: Notification & { removing?: boolean }) {
    const isDismissible = notification.dismissible !== false;

    return html`
      <div
        class="toast ${notification.variant} ${notification.removing ? 'removing' : ''}"
        role="alert"
      >
        ${this.renderIcon(notification.variant)}
        
        <div class="toast-content">
          ${notification.message}
        </div>

        ${isDismissible ? html`
          <button
            class="toast-close"
            type="button"
            aria-label="${this.getMessage('closeLabel')}"
            @click="${() => this.dismiss(notification.id)}"
          >
            ×
          </button>
        ` : ''}
      </div>
    `;
  }

  private renderIcon(variant: 'info' | 'success' | 'warning' | 'error') {
    const icons = {
      info: html`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
      `,
      success: html`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      `,
      warning: html`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
        </svg>
      `,
      error: html`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
      `
    };

    return html`
      <div class="toast-icon" aria-hidden="true">
        ${icons[variant]}
      </div>
    `;
  }

  public show(message: string, variant: 'info' | 'success' | 'warning' | 'error' = 'info', options: { duration?: number; dismissible?: boolean } = {}): string {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const duration = options.duration ?? this.defaultDuration;
    const dismissible = options.dismissible ?? true;

    const notification: Notification = {
      id,
      message,
      variant,
      duration,
      dismissible
    };

    this.notifications = [...this.notifications, notification];
    this.requestUpdate();

    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, duration);
    }

    this.emitEvent('gc-toast-show', {
      id,
      message,
      variant,
      timestamp: new Date().toISOString()
    });

    return id;
  }

  public dismiss(id: string): void {
    const notification = this.notifications.find(n => n.id === id);
    if (!notification) return;

    // Mark as removing to trigger exit animation
    notification.removing = true;
    this.requestUpdate();

    // Remove after animation completes
    setTimeout(() => {
      this.notifications = this.notifications.filter(n => n.id !== id);
      this.requestUpdate();

      this.emitEvent('gc-toast-dismiss', {
        id,
        timestamp: new Date().toISOString()
      });
    }, 300);
  }

  public dismissAll(): void {
    const ids = this.notifications.map(n => n.id);
    ids.forEach(id => this.dismiss(id));
  }

  public info(message: string, options?: { duration?: number; dismissible?: boolean }): string {
    return this.show(message, 'info', options);
  }

  public success(message: string, options?: { duration?: number; dismissible?: boolean }): string {
    return this.show(message, 'success', options);
  }

  public warning(message: string, options?: { duration?: number; dismissible?: boolean }): string {
    return this.show(message, 'warning', options);
  }

  public error(message: string, options?: { duration?: number; dismissible?: boolean }): string {
    return this.show(message, 'error', options);
  }
}

registerMessages('gc-notification-toast', {
  'en-CA': {
    'ariaLabel': 'Notifications',
    'closeLabel': 'Dismiss notification'
  },
  'fr-CA': {
    'ariaLabel': 'Notifications',
    'closeLabel': 'Ignorer la notification'
  }
});
