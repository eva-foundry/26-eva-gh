import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-Favicon - Dynamic Favicon
 * Change favicon dynamically for notifications or status updates
 */
@customElement('wb-favicon')
export class WBFavicon extends EVAElement {
  static override styles = css`
    :host {
      display: none;
    }
  `;

  @property({ type: String })
  src = '';

  @property({ type: String })
  type = 'image/png';

  @property({ type: String })
  badge = '';

  private originalFavicon = '';
  private canvas: HTMLCanvasElement | null = null;

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-favicon', {
      'en-CA': {
        faviconChanged: 'Favicon changed',
        badgeAdded: 'Badge added to favicon'
      },
      'fr-CA': {
        faviconChanged: 'Favicon modifié',
        badgeAdded: 'Badge ajouté au favicon'
      }
    });

    this.saveFavicon();
    this.updateFavicon();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.restoreFavicon();
  }

  private saveFavicon(): void {
    const link = document.querySelector<HTMLLinkElement>('link[rel*="icon"]');
    if (link?.href) {
      this.originalFavicon = link.href;
    }
  }

  private restoreFavicon(): void {
    if (this.originalFavicon) {
      this.setFavicon(this.originalFavicon);
    }
  }

  private setFavicon(href: string): void {
    let link = document.querySelector<HTMLLinkElement>('link[rel*="icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.type = this.type;
    link.href = href;
  }

  private async updateFavicon(): Promise<void> {
    if (!this.src) return;

    try {
      if (this.badge) {
        const badgedIcon = await this.addBadge(this.src, this.badge);
        this.setFavicon(badgedIcon);
        this.emitEvent('wb-favicon-changed', { src: this.src, badge: this.badge });
        this.announce(this.getMessage('wb-favicon', 'badgeAdded'));
      } else {
        this.setFavicon(this.src);
        this.emitEvent('wb-favicon-changed', { src: this.src });
        this.announce(this.getMessage('wb-favicon', 'faviconChanged'));
      }
    } catch (error) {
      this.emitEvent('wb-favicon-error', { error: String(error) });
    }
  }

  private async addBadge(iconSrc: string, badgeText: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        this.canvas = document.createElement('canvas');
        const size = 32;
        this.canvas.width = size;
        this.canvas.height = size;
        
        const ctx = this.canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        // Draw original icon
        ctx.drawImage(img, 0, 0, size, size);

        // Draw badge background
        const badgeSize = size * 0.6;
        const badgeX = size - badgeSize;
        const badgeY = size - badgeSize;
        
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.arc(badgeX + badgeSize/2, badgeY + badgeSize/2, badgeSize/2, 0, 2 * Math.PI);
        ctx.fill();

        // Draw badge text
        ctx.fillStyle = 'white';
        ctx.font = `bold ${badgeSize * 0.6}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(badgeText, badgeX + badgeSize/2, badgeY + badgeSize/2);

        resolve(this.canvas.toDataURL('image/png'));
      };

      img.onerror = () => reject(new Error('Failed to load icon'));
      img.src = iconSrc;
    });
  }

  protected override updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);
    if (changedProperties.has('src') || changedProperties.has('badge')) {
      this.updateFavicon();
    }
  }

  override render() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-favicon': WBFavicon;
  }
}
