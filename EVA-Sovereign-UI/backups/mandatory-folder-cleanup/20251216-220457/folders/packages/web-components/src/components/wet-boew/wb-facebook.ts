import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-Facebook - Facebook Embedded Pages
 * Embed Facebook page plugins
 */
@customElement('wb-facebook')
export class WBFacebook extends EVAElement {
  static override styles = css`
    :host {
      display: block;
    }

    .container {
      max-width: 500px;
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      border-radius: var(--eva-border-radius-md, 4px);
      overflow: hidden;
    }

    iframe {
      width: 100%;
      border: none;
      display: block;
    }

    .loading {
      padding: var(--eva-spacing-lg, 1.5rem);
      text-align: center;
      color: var(--eva-colors-text-secondary, #666666);
      background: var(--eva-colors-background-default, #f5f5f5);
    }

    .error {
      padding: var(--eva-spacing-lg, 1.5rem);
      background: var(--eva-colors-error-light, #f8d7da);
      color: var(--eva-colors-error-dark, #721c24);
      border: 1px solid var(--eva-colors-error, #dc3545);
    }
  `;

  @property({ type: String })
  pageUrl = '';

  @property({ type: Number })
  width = 340;

  @property({ type: Number })
  height = 500;

  @property({ type: Boolean })
  showFaces = true;

  @property({ type: Boolean })
  showHeader = true;

  @property({ type: Boolean })
  smallHeader = false;

  @state()
  private loading = true;

  @state()
  private error = false;

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-facebook', {
      'en-CA': {
        loading: 'Loading Facebook content...',
        error: 'Unable to load Facebook content',
        loaded: 'Facebook content loaded'
      },
      'fr-CA': {
        loading: 'Chargement du contenu Facebook...',
        error: 'Impossible de charger le contenu Facebook',
        loaded: 'Contenu Facebook chargé'
      }
    });
  }

  private get embedUrl(): string {
    if (!this.pageUrl) return '';

    const params = new URLSearchParams({
      href: this.pageUrl,
      width: this.width.toString(),
      height: this.height.toString(),
      show_faces: this.showFaces.toString(),
      hide_cover: (!this.showHeader).toString(),
      small_header: this.smallHeader.toString()
    });

    return `https://www.facebook.com/plugins/page.php?${params.toString()}`;
  }

  private handleLoad(): void {
    this.loading = false;
    this.error = false;
    this.emitEvent('wb-facebook-loaded', { url: this.pageUrl });
    this.announce(this.getMessage('wb-facebook', 'loaded'));
  }

  private handleError(): void {
    this.loading = false;
    this.error = true;
    this.emitEvent('wb-facebook-error', { url: this.pageUrl });
    this.announce(this.getMessage('wb-facebook', 'error'));
  }

  override render() {
    if (!this.pageUrl) {
      return html`
        <div class="error">
          ${this.getMessage('wb-facebook', 'error')}
        </div>
      `;
    }

    return html`
      <div class="container" style="width: ${this.width}px;">
        ${this.loading ? html`
          <div class="loading" role="status" aria-live="polite">
            ${this.getMessage('wb-facebook', 'loading')}
          </div>
        ` : ''}
        
        ${this.error ? html`
          <div class="error" role="alert">
            ${this.getMessage('wb-facebook', 'error')}
          </div>
        ` : ''}

        <iframe
          src="${this.embedUrl}"
          width="${this.width}"
          height="${this.height}"
          style="display: ${this.loading || this.error ? 'none' : 'block'};"
          scrolling="no"
          frameborder="0"
          allowfullscreen="true"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title="Facebook Page"
          @load="${this.handleLoad}"
          @error="${this.handleError}"
        ></iframe>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-facebook': WBFacebook;
  }
}
