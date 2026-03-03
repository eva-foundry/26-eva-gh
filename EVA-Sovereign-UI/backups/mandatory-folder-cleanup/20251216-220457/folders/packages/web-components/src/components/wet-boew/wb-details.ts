import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-Details - Details/Summary Polyfill
 * HTML5 details/summary with progressive enhancement
 */
@customElement('wb-details')
export class WBDetails extends EVAElement {
  static override styles = css`
    :host {
      display: block;
    }

    .details {
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      border-radius: var(--eva-border-radius-sm, 3px);
      margin-bottom: var(--eva-spacing-sm, 0.5rem);
    }

    .summary {
      padding: var(--eva-spacing-md, 1rem);
      background: var(--eva-colors-background-default, #f5f5f5);
      cursor: pointer;
      user-select: none;
      display: flex;
      align-items: center;
      gap: var(--eva-spacing-sm, 0.5rem);
    }

    .summary:hover {
      background: var(--eva-colors-background-hover, #e5e5e5);
    }

    .summary:focus {
      outline: 2px solid var(--eva-colors-focus, #303fc1);
      outline-offset: -2px;
    }

    .icon {
      transition: transform 0.2s;
    }

    .icon.open {
      transform: rotate(90deg);
    }

    .content {
      padding: var(--eva-spacing-md, 1rem);
      display: none;
    }

    .content.open {
      display: block;
    }
  `;

  @property({ type: Boolean, reflect: true })
  open = false;

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-details', {
      'en-CA': {
        expand: 'Expand',
        collapse: 'Collapse',
        expanded: 'Expanded',
        collapsed: 'Collapsed'
      },
      'fr-CA': {
        expand: 'Développer',
        collapse: 'Réduire',
        expanded: 'Développé',
        collapsed: 'Réduit'
      }
    });
  }

  private toggle(): void {
    this.open = !this.open;
    const status = this.open ? 'expanded' : 'collapsed';
    this.emitEvent('wb-details-toggle', { open: this.open });
    this.announce(this.getMessage('wb-details', status));
  }

  override render() {
    const ariaLabel = this.open 
      ? this.getMessage('wb-details', 'collapse')
      : this.getMessage('wb-details', 'expand');

    return html`
      <div class="details">
        <div 
          class="summary"
          role="button"
          tabindex="0"
          aria-expanded="${this.open}"
          aria-label="${ariaLabel}"
          @click="${this.toggle}"
          @keydown="${(e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              this.toggle();
            }
          }}"
        >
          <span class="icon ${this.open ? 'open' : ''}">▶</span>
          <slot name="summary"></slot>
        </div>
        <div class="content ${this.open ? 'open' : ''}" role="region">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-details': WBDetails;
  }
}
