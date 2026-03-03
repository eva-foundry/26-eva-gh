import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-BgImg - Background Image Lazy Loading
 * Lazy load background images using IntersectionObserver
 */
@customElement('wb-bgimg')
export class WBBgImg extends EVAElement {
  static override styles = css`
    :host {
      display: block;
      position: relative;
    }

    .bg-container {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .bg-container.loading {
      background-color: var(--eva-colors-background-default, #f5f5f5);
    }

    .placeholder {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--eva-colors-text-secondary, #666666);
    }
  `;

  @property({ type: String })
  src = '';

  @property({ type: String })
  placeholder = '';

  @property({ type: Number })
  threshold = 0.1;

  @state()
  private loaded = false;

  @state()
  private inView = false;

  private observer: IntersectionObserver | null = null;

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-bgimg', {
      'en-CA': {
        loading: 'Loading image...',
        loaded: 'Image loaded',
        error: 'Failed to load image'
      },
      'fr-CA': {
        loading: 'Chargement de l\'image...',
        loaded: 'Image chargée',
        error: 'Échec du chargement de l\'image'
      }
    });

    this.setupObserver();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  private setupObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.loaded) {
            this.inView = true;
            this.loadImage();
          }
        });
      },
      { threshold: this.threshold }
    );

    this.observer.observe(this);
  }

  private async loadImage(): Promise<void> {
    if (!this.src || this.loaded) return;

    try {
      const img = new Image();
      img.src = this.src;
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Image load failed'));
      });

      this.loaded = true;
      this.emitEvent('wb-bgimg-loaded', { src: this.src });
      this.announce(this.getMessage('wb-bgimg', 'loaded'));

      if (this.observer) {
        this.observer.disconnect();
      }
    } catch (error) {
      this.emitEvent('wb-bgimg-error', { src: this.src, error: String(error) });
    }
  }

  override render() {
    const backgroundImage = this.loaded ? `url(${this.src})` : 'none';
    const showPlaceholder = !this.loaded && this.placeholder;

    return html`
      <div 
        class="bg-container ${this.loaded ? '' : 'loading'}"
        style="background-image: ${backgroundImage};"
        role="img"
        aria-label="${this.loaded ? this.getMessage('wb-bgimg', 'loaded') : this.getMessage('wb-bgimg', 'loading')}"
      >
        ${showPlaceholder ? html`
          <div class="placeholder">${this.placeholder}</div>
        ` : ''}
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-bgimg': WBBgImg;
  }
}
