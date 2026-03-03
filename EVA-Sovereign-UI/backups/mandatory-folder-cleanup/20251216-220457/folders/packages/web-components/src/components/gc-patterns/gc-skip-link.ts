import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

@customElement('gc-skip-link')
export class GCSkipLink extends EVAElement {
  static override styles = css`
    :host {
      display: block;
    }

    .skip-link {
      position: absolute;
      left: -9999px;
      top: 0;
      z-index: 9999;
      padding: var(--eva-spacing-md, 1rem) var(--eva-spacing-lg, 1.5rem);
      background: var(--eva-colors-primary, #26374a);
      color: var(--eva-colors-white, #fff);
      font-family: var(--eva-fonts-body);
      font-size: var(--eva-font-size-md, 1rem);
      font-weight: 600;
      text-decoration: none;
      border-radius: 0 0 4px 0;
    }

    .skip-link:focus {
      left: 0;
      outline: 3px solid var(--eva-colors-focus, #269abc);
      outline-offset: 2px;
    }

    .skip-link:hover {
      background: var(--eva-colors-primary-dark, #1a2533);
    }

    @media print {
      .skip-link {
        display: none !important;
      }
    }
  `;

  @property({ type: String })
  href = '#main';

  @property({ type: String })
  label = '';

  private handleClick(e: MouseEvent) {
    e.preventDefault();

    const targetId = this.href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.focus();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

      this.emitEvent('gc-skip-link-activated', {
        targetId,
        timestamp: new Date().toISOString()
      });
    }
  }

  protected override render() {
    const linkLabel = this.label || this.getMessage('skipToContent');

    return html`
      <a
        class="skip-link"
        href="${this.href}"
        @click="${this.handleClick}"
      >
        ${linkLabel}
      </a>
    `;
  }
}

registerMessages('gc-skip-link', {
  'en-CA': {
    skipToContent: 'Skip to main content'
  },
  'fr-CA': {
    skipToContent: 'Passer au contenu principal'
  }
});
