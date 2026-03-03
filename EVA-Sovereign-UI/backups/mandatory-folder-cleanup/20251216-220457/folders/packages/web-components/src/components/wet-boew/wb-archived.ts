import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-Archived - Archived Content Warning
 * Display warning banner for archived/outdated content
 */
@customElement('wb-archived')
export class WBArchived extends EVAElement {
  static override styles = css`
    :host {
      display: block;
      margin-bottom: var(--eva-spacing-lg, 1.5rem);
    }

    .banner {
      padding: var(--eva-spacing-md, 1rem);
      background: var(--eva-colors-warning-light, #fff3cd);
      border: 2px solid var(--eva-colors-warning, #ffc107);
      border-radius: var(--eva-border-radius-md, 4px);
      display: flex;
      align-items: flex-start;
      gap: var(--eva-spacing-md, 1rem);
    }

    .icon {
      font-size: 1.5rem;
      color: var(--eva-colors-warning-dark, #856404);
      flex-shrink: 0;
    }

    .content {
      flex: 1;
    }

    .title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--eva-colors-warning-dark, #856404);
      margin: 0 0 var(--eva-spacing-xs, 0.25rem) 0;
    }

    .message {
      color: var(--eva-colors-text-primary, #333333);
      margin: 0;
    }

    .date {
      font-style: italic;
      color: var(--eva-colors-text-secondary, #666666);
      margin-top: var(--eva-spacing-xs, 0.25rem);
    }

    .dismiss {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: var(--eva-spacing-xs, 0.25rem);
      color: var(--eva-colors-warning-dark, #856404);
      font-size: 1.25rem;
      line-height: 1;
      flex-shrink: 0;
    }

    .dismiss:hover {
      color: var(--eva-colors-text-primary, #333333);
    }

    .dismiss:focus {
      outline: 2px solid var(--eva-colors-focus, #303fc1);
      outline-offset: 2px;
    }

    :host([hidden]) {
      display: none;
    }
  `;

  @property({ type: String })
  archivedDate = '';

  @property({ type: Boolean })
  dismissible = false;

  @property({ type: String })
  storageKey = 'wb-archived-dismissed';

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-archived', {
      'en-CA': {
        title: 'Archived Content',
        defaultMessage: 'This content has been archived and may be outdated.',
        archivedOn: 'Archived on:',
        dismiss: 'Dismiss this notice',
        dismissed: 'Archived content notice dismissed'
      },
      'fr-CA': {
        title: 'Contenu archivé',
        defaultMessage: 'Ce contenu a été archivé et pourrait être désuet.',
        archivedOn: 'Archivé le :',
        dismiss: 'Ignorer cet avis',
        dismissed: 'Avis de contenu archivé ignoré'
      }
    });

    if (this.dismissible && this.storageKey) {
      const dismissed = localStorage.getItem(this.storageKey);
      if (dismissed === 'true') {
        this.hidden = true;
      }
    }
  }

  private handleDismiss(): void {
    if (this.storageKey) {
      localStorage.setItem(this.storageKey, 'true');
    }
    this.hidden = true;
    this.emitEvent('wb-archived-dismissed', {});
    this.announce(this.getMessage('wb-archived', 'dismissed'));
  }

  override render() {
    return html`
      <div class="banner" role="alert">
        <div class="icon">⚠️</div>
        <div class="content">
          <div class="title">${this.getMessage('wb-archived', 'title')}</div>
          <p class="message">
            <slot>${this.getMessage('wb-archived', 'defaultMessage')}</slot>
          </p>
          ${this.archivedDate ? html`
            <div class="date">
              ${this.getMessage('wb-archived', 'archivedOn')} ${this.archivedDate}
            </div>
          ` : ''}
        </div>
        ${this.dismissible ? html`
          <button
            class="dismiss"
            @click="${this.handleDismiss}"
            aria-label="${this.getMessage('wb-archived', 'dismiss')}"
          >×</button>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-archived': WBArchived;
  }
}
