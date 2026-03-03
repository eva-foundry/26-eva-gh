import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-Dismissable - User-Dismissible Content
 * Content that users can dismiss, with state saved in localStorage
 */
@customElement('wb-dismissable')
export class WBDismissable extends EVAElement {
  static override styles = css`
    :host {
      display: block;
    }

    :host([hidden]) {
      display: none;
    }

    .container {
      position: relative;
      padding: var(--eva-spacing-md, 1rem);
      background: var(--eva-colors-background-default, #f5f5f5);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      border-radius: var(--eva-border-radius-md, 4px);
    }

    .dismiss-button {
      position: absolute;
      top: var(--eva-spacing-xs, 0.25rem);
      right: var(--eva-spacing-xs, 0.25rem);
      background: transparent;
      border: none;
      cursor: pointer;
      padding: var(--eva-spacing-xs, 0.25rem) var(--eva-spacing-sm, 0.5rem);
      color: var(--eva-colors-text-secondary, #666666);
      font-size: 1.25rem;
      line-height: 1;
    }

    .dismiss-button:hover {
      color: var(--eva-colors-text-primary, #333333);
      background: var(--eva-colors-background-hover, #e5e5e5);
      border-radius: var(--eva-border-radius-sm, 3px);
    }

    .dismiss-button:focus {
      outline: 2px solid var(--eva-colors-focus, #303fc1);
      outline-offset: 2px;
    }

    .content {
      padding-right: var(--eva-spacing-lg, 1.5rem);
    }
  `;

  @property({ type: String })
  storageKey = 'wb-dismissable';

  @property({ type: Boolean })
  persistent = true;

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-dismissable', {
      'en-CA': {
        dismiss: 'Dismiss',
        dismissed: 'Content dismissed'
      },
      'fr-CA': {
        dismiss: 'Ignorer',
        dismissed: 'Contenu ignoré'
      }
    });

    if (this.persistent && this.storageKey) {
      const dismissed = localStorage.getItem(this.storageKey);
      if (dismissed === 'true') {
        this.hidden = true;
      }
    }
  }

  private handleDismiss(): void {
    if (this.persistent && this.storageKey) {
      localStorage.setItem(this.storageKey, 'true');
    }
    
    this.hidden = true;
    this.emitEvent('wb-dismissable-dismissed', { persistent: this.persistent });
    this.announce(this.getMessage('wb-dismissable', 'dismissed'));
  }

  override render() {
    return html`
      <div class="container">
        <button
          class="dismiss-button"
          @click="${this.handleDismiss}"
          aria-label="${this.getMessage('wb-dismissable', 'dismiss')}"
        >×</button>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-dismissable': WBDismissable;
  }
}
