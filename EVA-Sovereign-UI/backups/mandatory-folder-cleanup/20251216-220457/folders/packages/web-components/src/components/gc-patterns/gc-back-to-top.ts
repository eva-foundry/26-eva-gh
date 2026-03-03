import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

@customElement('gc-back-to-top')
export class GCBackToTop extends EVAElement {
  static override styles = css`
    :host {
      position: fixed;
      bottom: var(--eva-spacing-xl, 32px);
      right: var(--eva-spacing-xl, 32px);
      z-index: 1000;
    }

    .back-to-top-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      background-color: var(--eva-colors-primary, #26374a);
      color: var(--eva-colors-white, #fff);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
      transition: all 0.3s ease;
      opacity: 0;
      transform: translateY(20px);
      pointer-events: none;
    }

    .back-to-top-button.visible {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    .back-to-top-button:hover {
      background-color: var(--eva-colors-primary-dark, #1a2633);
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }

    .back-to-top-button:focus {
      outline: 2px solid var(--eva-colors-focus, #26374a);
      outline-offset: 2px;
    }

    .back-to-top-button:active {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .arrow-icon {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }

    @media (max-width: 768px) {
      :host {
        bottom: var(--eva-spacing-lg, 24px);
        right: var(--eva-spacing-lg, 24px);
      }

      .back-to-top-button {
        width: 48px;
        height: 48px;
      }

      .arrow-icon {
        width: 20px;
        height: 20px;
      }
    }
  `;

  @property({ type: Number })
  scrollThreshold: number = 300;

  @property({ type: String })
  scrollBehavior: 'smooth' | 'auto' = 'smooth';

  @state()
  private isVisible: boolean = false;

  private scrollHandler = (): void => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.isVisible = scrollY > this.scrollThreshold;
  };

  override connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
    this.scrollHandler();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this.scrollHandler);
  }

  protected override render() {
    return html`
      <button
        class="back-to-top-button ${this.isVisible ? 'visible' : ''}"
        @click="${this.scrollToTop}"
        aria-label="${this.getMessage('gc-back-to-top.ariaLabel')}"
        title="${this.getMessage('gc-back-to-top.title')}"
      >
        <svg class="arrow-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
        </svg>
        <span class="sr-only">${this.getMessage('gc-back-to-top.text')}</span>
      </button>
    `;
  }

  private scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: this.scrollBehavior
    });

    this.emitEvent('gc-scroll-to-top', {
      timestamp: Date.now()
    });

    this.announce(this.getMessage('gc-back-to-top.announcement'));
  }

  public show(): void {
    this.isVisible = true;
  }

  public hide(): void {
    this.isVisible = false;
  }
}

registerMessages('gc-back-to-top', {
  'en-CA': {
    ariaLabel: 'Back to top',
    title: 'Return to top of page',
    text: 'Top',
    announcement: 'Scrolled to top of page'
  },
  'fr-CA': {
    ariaLabel: 'Haut de la page',
    title: 'Retourner en haut de la page',
    text: 'Haut',
    announcement: 'Défilement vers le haut de la page'
  }
});
