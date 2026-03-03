import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-ExitScript - Exit Confirmation
 * Warn users when clicking external links
 */
@customElement('wb-exitscript')
export class WBExitScript extends EVAElement {
  static override styles = css`
    :host {
      display: contents;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
    }

    .modal {
      background: white;
      padding: var(--eva-spacing-lg, 2rem);
      border-radius: var(--eva-border-radius-md, 4px);
      max-width: 500px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .modal-title {
      font-size: 1.5em;
      font-weight: bold;
      margin-bottom: var(--eva-spacing-md, 1rem);
    }

    .modal-message {
      margin-bottom: var(--eva-spacing-lg, 2rem);
      line-height: 1.5;
    }

    .modal-buttons {
      display: flex;
      gap: var(--eva-spacing-sm, 0.5rem);
      justify-content: flex-end;
    }

    .button {
      padding: var(--eva-spacing-sm, 0.5rem) var(--eva-spacing-md, 1rem);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      border-radius: var(--eva-border-radius-sm, 3px);
      cursor: pointer;
      font-size: 1em;
    }

    .button-primary {
      background: var(--eva-colors-background-primary, #26374a);
      color: white;
      border-color: var(--eva-colors-background-primary, #26374a);
    }

    .button-secondary {
      background: white;
      color: var(--eva-colors-text-default, #000000);
    }

    .button:hover {
      opacity: 0.9;
    }

    .button:focus {
      outline: 2px solid var(--eva-colors-focus, #303fc1);
      outline-offset: 2px;
    }
  `;

  @property({ type: Boolean })
  showModal = false;

  @property({ type: String })
  private pendingUrl = '';

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-exitscript', {
      'en-CA': {
        title: 'You are about to leave this site',
        message: 'You are about to leave a Government of Canada website. The external link may contain content that is not available in both official languages.',
        continue: 'Continue to external site',
        cancel: 'Stay on this page',
        externalLinkWarning: 'External link warning shown'
      },
      'fr-CA': {
        title: 'Vous êtes sur le point de quitter ce site',
        message: 'Vous êtes sur le point de quitter un site Web du gouvernement du Canada. Le lien externe peut contenir du contenu qui n\'est pas disponible dans les deux langues officielles.',
        continue: 'Continuer vers le site externe',
        cancel: 'Rester sur cette page',
        externalLinkWarning: 'Avertissement de lien externe affiché'
      }
    });

    this.setupExternalLinks();
  }

  private setupExternalLinks(): void {
    this.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href]') as HTMLAnchorElement;
      
      if (!link) return;

      const href = link.getAttribute('href') || '';
      if (this.isExternalLink(href)) {
        e.preventDefault();
        this.pendingUrl = href;
        this.showModal = true;
        this.emitEvent('wb-exitscript-shown', { url: href });
        this.announce(this.getMessage('wb-exitscript', 'externalLinkWarning'));
      }
    });
  }

  private isExternalLink(href: string): boolean {
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return false;
    }

    try {
      const url = new URL(href, window.location.origin);
      return url.hostname !== window.location.hostname;
    } catch {
      return false;
    }
  }

  private continueToExternal(): void {
    if (this.pendingUrl) {
      this.emitEvent('wb-exitscript-continue', { url: this.pendingUrl });
      window.open(this.pendingUrl, '_blank', 'noopener,noreferrer');
    }
    this.closeModal();
  }

  private closeModal(): void {
    this.showModal = false;
    this.pendingUrl = '';
    this.emitEvent('wb-exitscript-cancel');
  }

  override render() {
    return html`
      <slot></slot>
      ${this.showModal ? html`
        <div class="modal-overlay" @click="${this.closeModal}">
          <div 
            class="modal" 
            role="dialog" 
            aria-modal="true"
            aria-labelledby="exit-title"
            @click="${(e: Event) => e.stopPropagation()}"
          >
            <div id="exit-title" class="modal-title">
              ${this.getMessage('wb-exitscript', 'title')}
            </div>
            <div class="modal-message">
              ${this.getMessage('wb-exitscript', 'message')}
            </div>
            <div class="modal-buttons">
              <button 
                class="button button-secondary"
                @click="${this.closeModal}"
              >
                ${this.getMessage('wb-exitscript', 'cancel')}
              </button>
              <button 
                class="button button-primary"
                @click="${this.continueToExternal}"
              >
                ${this.getMessage('wb-exitscript', 'continue')}
              </button>
            </div>
          </div>
        </div>
      ` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-exitscript': WBExitScript;
  }
}
