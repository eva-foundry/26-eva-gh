import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-Data-Ajax - AJAX Content Loading
 * Load content dynamically via AJAX with caching
 */
@customElement('wb-data-ajax')
export class WBDataAjax extends EVAElement {
  static override styles = css`
    :host {
      display: block;
    }

    .ajax-loading {
      padding: var(--eva-spacing-md, 1rem);
      text-align: center;
      color: var(--eva-colors-text-secondary, #666666);
    }

    .ajax-error {
      padding: var(--eva-spacing-md, 1rem);
      background: var(--eva-colors-error-light, #fee);
      border: 1px solid var(--eva-colors-error, #c00);
      border-radius: var(--eva-border-radius-sm, 3px);
      color: var(--eva-colors-error, #c00);
    }

    .ajax-content {
      min-height: 20px;
    }
  `;

  @property({ type: String })
  url = '';

  @property({ type: Boolean })
  cache = true;

  @property({ type: String })
  method = 'GET';

  @property({ type: Boolean, attribute: 'auto-load' })
  autoLoad = true;

  @state()
  private loading = false;

  @state()
  private error = '';

  @state()
  private content = '';

  private static cacheStore = new Map<string, string>();

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-data-ajax', {
      'en-CA': {
        loading: 'Loading content...',
        loadError: 'Error loading content',
        retryButton: 'Retry',
        contentLoaded: 'Content loaded successfully'
      },
      'fr-CA': {
        loading: 'Chargement du contenu...',
        loadError: 'Erreur lors du chargement',
        retryButton: 'Réessayer',
        contentLoaded: 'Contenu chargé avec succès'
      }
    });

    if (this.autoLoad && this.url) {
      this.loadContent();
    }
  }

  async loadContent(): Promise<void> {
    if (!this.url) {
      this.error = 'No URL provided';
      return;
    }

    // Check cache
    if (this.cache && WBDataAjax.cacheStore.has(this.url)) {
      this.content = WBDataAjax.cacheStore.get(this.url)!;
      this.emitEvent('wb-ajax-loaded', { url: this.url, cached: true });
      return;
    }

    this.loading = true;
    this.error = '';

    try {
      const response = await fetch(this.url, {
        method: this.method,
        headers: {
          'Content-Type': 'text/html',
          'Accept': 'text/html'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.text();
      this.content = data;

      if (this.cache) {
        WBDataAjax.cacheStore.set(this.url, data);
      }

      this.emitEvent('wb-ajax-loaded', { url: this.url, cached: false });
      this.announce(this.getMessage('wb-data-ajax', 'contentLoaded'));
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Unknown error';
      this.emitEvent('wb-ajax-error', { url: this.url, error: this.error });
    } finally {
      this.loading = false;
    }
  }

  clearCache(): void {
    WBDataAjax.cacheStore.clear();
  }

  retry(): void {
    this.loadContent();
  }

  override render() {
    if (this.loading) {
      return html`
        <div class="ajax-loading" role="status" aria-live="polite">
          ${this.getMessage('wb-data-ajax', 'loading')}
        </div>
      `;
    }

    if (this.error) {
      return html`
        <div class="ajax-error" role="alert">
          ${this.getMessage('wb-data-ajax', 'loadError')}: ${this.error}
          <br />
          <button @click="${this.retry}" style="margin-top: 0.5rem;">
            ${this.getMessage('wb-data-ajax', 'retryButton')}
          </button>
        </div>
      `;
    }

    return html`
      <div class="ajax-content">
        ${this.content ? html`<div .innerHTML="${this.content}"></div>` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-data-ajax': WBDataAjax;
  }
}
