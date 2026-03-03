import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-Data-InView - Lazy Loading
 * Load content when scrolled into viewport (performance optimization)
 */
@customElement('wb-data-inview')
export class WBDataInView extends EVAElement {
  static override styles = css`
    :host {
      display: block;
      min-height: 100px;
    }

    .placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100px;
      background: var(--eva-colors-background-default, #f5f5f5);
      border: 1px dashed var(--eva-colors-border-default, #cccccc);
      color: var(--eva-colors-text-secondary, #666666);
    }
  `;

  @property({ type: String })
  url = '';

  @property({ type: String })
  threshold = '0.1';

  @property({ type: Boolean })
  once = true;

  @state()
  private inView = false;

  @state()
  private content = '';

  @state()
  private loaded = false;

  private observer?: IntersectionObserver;

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-data-inview', {
      'en-CA': {
        loading: 'Loading content...',
        loadError: 'Error loading content',
        contentLoaded: 'Content loaded into view'
      },
      'fr-CA': {
        loading: 'Chargement du contenu...',
        loadError: 'Erreur lors du chargement',
        contentLoaded: 'Contenu chargé dans la vue'
      }
    });

    this.setupObserver();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.observer?.disconnect();
  }

  private setupObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.loaded) {
            this.inView = true;
            this.loadContent();

            if (this.once) {
              this.observer?.disconnect();
            }
          }
        });
      },
      {
        threshold: parseFloat(this.threshold)
      }
    );

    this.observer.observe(this);
  }

  async loadContent(): Promise<void> {
    if (this.loaded) return;

    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      this.content = await response.text();
      this.loaded = true;

      this.emitEvent('wb-inview-loaded', { url: this.url });
      this.announce(this.getMessage('wb-data-inview', 'contentLoaded'));
    } catch (err) {
      this.emitEvent('wb-inview-error', { url: this.url, error: err });
    }
  }

  override render() {
    if (!this.inView || !this.loaded) {
      return html`
        <div class="placeholder" role="status" aria-live="polite">
          ${this.getMessage('wb-data-inview', 'loading')}
        </div>
      `;
    }

    return html`
      <div .innerHTML="${this.content}"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-data-inview': WBDataInView;
  }
}
