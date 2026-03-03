import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-Share - Social Media Sharing
 * Share buttons for Facebook, Twitter, LinkedIn, email
 */
@customElement('wb-share')
export class WBShare extends EVAElement {
  static override styles = css`
    :host {
      display: block;
    }

    .share-container {
      display: flex;
      gap: var(--eva-spacing-xs, 0.25rem);
      flex-wrap: wrap;
    }

    .share-button {
      display: inline-flex;
      align-items: center;
      gap: var(--eva-spacing-xs, 0.25rem);
      padding: var(--eva-spacing-xs, 0.25rem) var(--eva-spacing-sm, 0.5rem);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      border-radius: var(--eva-border-radius-sm, 3px);
      background: white;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
    }

    .share-button:hover {
      background: var(--eva-colors-background-hover, #f5f5f5);
    }

    .share-button:focus {
      outline: 2px solid var(--eva-colors-focus, #303fc1);
    }

    .share-button.facebook {
      background: #1877f2;
      color: white;
      border-color: #1877f2;
    }

    .share-button.twitter {
      background: #1da1f2;
      color: white;
      border-color: #1da1f2;
    }

    .share-button.linkedin {
      background: #0077b5;
      color: white;
      border-color: #0077b5;
    }

    .share-button.email {
      background: #666666;
      color: white;
      border-color: #666666;
    }
  `;

  @property({ type: String })
  url = '';

  @property({ type: String })
  override title = '';

  @property({ type: String })
  description = '';

  @property({ type: Array })
  platforms: string[] = ['facebook', 'twitter', 'linkedin', 'email'];

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-share', {
      'en-CA': {
        shareOn: 'Share on',
        facebook: 'Facebook',
        twitter: 'Twitter',
        linkedin: 'LinkedIn',
        email: 'Email',
        shared: 'Shared on'
      },
      'fr-CA': {
        shareOn: 'Partager sur',
        facebook: 'Facebook',
        twitter: 'Twitter',
        linkedin: 'LinkedIn',
        email: 'Courriel',
        shared: 'Partagé sur'
      }
    });

    if (!this.url) {
      this.url = window.location.href;
    }

    if (!this.title) {
      this.title = document.title;
    }
  }

  private getFacebookUrl(): string {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.url)}`;
  }

  private getTwitterUrl(): string {
    const text = this.title ? `${this.title} - ${this.url}` : this.url;
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  }

  private getLinkedInUrl(): string {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.url)}`;
  }

  private getEmailUrl(): string {
    const subject = this.title || 'Check out this page';
    const body = this.description ? `${this.description}\n\n${this.url}` : this.url;
    return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  private share(platform: string): void {
    let url = '';

    switch (platform) {
      case 'facebook':
        url = this.getFacebookUrl();
        break;
      case 'twitter':
        url = this.getTwitterUrl();
        break;
      case 'linkedin':
        url = this.getLinkedInUrl();
        break;
      case 'email':
        url = this.getEmailUrl();
        break;
    }

    if (url) {
      if (platform === 'email') {
        window.location.href = url;
      } else {
        window.open(url, '_blank', 'width=600,height=400');
      }
      this.emitEvent('wb-share', { platform, url: this.url });
      this.announce(`${this.getMessage('wb-share', 'shared')} ${this.getMessage('wb-share', platform)}`);
    }
  }

  private renderShareButton(platform: string) {
    const label = `${this.getMessage('wb-share', 'shareOn')} ${this.getMessage('wb-share', platform)}`;

    return html`
      <a
        class="share-button ${platform}"
        @click="${(e: Event) => {
          e.preventDefault();
          this.share(platform);
        }}"
        href="#"
        aria-label="${label}"
        title="${label}"
      >
        ${this.getMessage('wb-share', platform)}
      </a>
    `;
  }

  override render() {
    return html`
      <div class="share-container" role="group" aria-label="${this.getMessage('wb-share', 'shareOn')}">
        ${this.platforms.map(platform => this.renderShareButton(platform))}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-share': WBShare;
  }
}
