import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

export interface SocialPlatform {
  name: string;
  url: string;
  icon?: string;
}

@customElement('gc-social-share')
export class GCSocialShare extends EVAElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--eva-fonts-body-family, 'Noto Sans', 'Arial', sans-serif);
    }

    .share-container {
      padding: var(--eva-spacing-md, 16px);
      background-color: var(--eva-colors-gray-50, #f5f5f5);
      border-radius: var(--eva-border-radius-md, 4px);
    }

    .share-heading {
      margin: 0 0 var(--eva-spacing-md, 16px) 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--eva-colors-gray-900, #333);
    }

    .share-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: var(--eva-spacing-sm, 12px);
    }

    .share-button {
      display: inline-flex;
      align-items: center;
      gap: var(--eva-spacing-xs, 8px);
      padding: var(--eva-spacing-sm, 12px) var(--eva-spacing-md, 16px);
      background-color: var(--eva-colors-white, #fff);
      border: 1px solid var(--eva-colors-gray-300, #ccc);
      border-radius: var(--eva-border-radius-sm, 2px);
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--eva-colors-gray-900, #333);
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .share-button:hover {
      background-color: var(--eva-colors-gray-50, #f9f9f9);
      border-color: var(--eva-colors-gray-400, #999);
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .share-button:focus {
      outline: 2px solid var(--eva-colors-focus, #26374a);
      outline-offset: 2px;
    }

    .share-button:active {
      transform: translateY(0);
      box-shadow: none;
    }

    .share-button.facebook {
      background-color: #1877f2;
      border-color: #1877f2;
      color: #fff;
    }

    .share-button.facebook:hover {
      background-color: #145dbf;
      border-color: #145dbf;
    }

    .share-button.twitter {
      background-color: #1da1f2;
      border-color: #1da1f2;
      color: #fff;
    }

    .share-button.twitter:hover {
      background-color: #1a91da;
      border-color: #1a91da;
    }

    .share-button.linkedin {
      background-color: #0a66c2;
      border-color: #0a66c2;
      color: #fff;
    }

    .share-button.linkedin:hover {
      background-color: #004182;
      border-color: #004182;
    }

    .share-button.email {
      background-color: var(--eva-colors-gray-700, #555);
      border-color: var(--eva-colors-gray-700, #555);
      color: #fff;
    }

    .share-button.email:hover {
      background-color: var(--eva-colors-gray-800, #444);
      border-color: var(--eva-colors-gray-800, #444);
    }

    .share-button.copy {
      background-color: var(--eva-colors-primary, #26374a);
      border-color: var(--eva-colors-primary, #26374a);
      color: #fff;
    }

    .share-button.copy:hover {
      background-color: var(--eva-colors-primary-dark, #1a2633);
      border-color: var(--eva-colors-primary-dark, #1a2633);
    }

    .share-button.copied {
      background-color: var(--eva-colors-success, #278400);
      border-color: var(--eva-colors-success, #278400);
      color: #fff;
    }

    .share-icon {
      width: 16px;
      height: 16px;
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
      .share-buttons {
        flex-direction: column;
      }

      .share-button {
        width: 100%;
        justify-content: center;
      }
    }
  `;

  @property({ type: String })
  pageUrl: string = '';

  @property({ type: String })
  pageTitle: string = '';

  @property({ type: String })
  description: string = '';

  @property({ type: Boolean })
  showHeading: boolean = true;

  @property({ type: Array })
  platforms: string[] = ['facebook', 'twitter', 'linkedin', 'email', 'copy'];

  @property({ type: Boolean })
  private copied: boolean = false;

  protected override render() {
    const url = this.pageUrl || window.location.href;
    const title = this.pageTitle || document.title;

    return html`
      <div class="share-container">
        ${this.showHeading ? html`
          <h3 class="share-heading">${this.getMessage('gc-social-share.heading')}</h3>
        ` : ''}
        
        <div class="share-buttons" role="group" aria-label="${this.getMessage('gc-social-share.ariaLabel')}">
          ${this.platforms.includes('facebook') ? html`
            <a
              href="${this.getFacebookUrl(url)}"
              target="_blank"
              rel="noopener noreferrer"
              class="share-button facebook"
              @click="${() => this.handleShare('facebook')}"
            >
              ${this.getFacebookIcon()}
              <span>${this.getMessage('gc-social-share.facebook')}</span>
            </a>
          ` : ''}

          ${this.platforms.includes('twitter') ? html`
            <a
              href="${this.getTwitterUrl(url, title)}"
              target="_blank"
              rel="noopener noreferrer"
              class="share-button twitter"
              @click="${() => this.handleShare('twitter')}"
            >
              ${this.getTwitterIcon()}
              <span>${this.getMessage('gc-social-share.twitter')}</span>
            </a>
          ` : ''}

          ${this.platforms.includes('linkedin') ? html`
            <a
              href="${this.getLinkedInUrl(url)}"
              target="_blank"
              rel="noopener noreferrer"
              class="share-button linkedin"
              @click="${() => this.handleShare('linkedin')}"
            >
              ${this.getLinkedInIcon()}
              <span>${this.getMessage('gc-social-share.linkedin')}</span>
            </a>
          ` : ''}

          ${this.platforms.includes('email') ? html`
            <a
              href="${this.getEmailUrl(url, title, this.description)}"
              class="share-button email"
              @click="${() => this.handleShare('email')}"
            >
              ${this.getEmailIcon()}
              <span>${this.getMessage('gc-social-share.email')}</span>
            </a>
          ` : ''}

          ${this.platforms.includes('copy') ? html`
            <button
              class="share-button copy ${this.copied ? 'copied' : ''}"
              @click="${this.copyToClipboard}"
              aria-label="${this.getMessage('gc-social-share.copyLink')}"
            >
              ${this.copied ? this.getCheckIcon() : this.getCopyIcon()}
              <span>${this.copied ? this.getMessage('gc-social-share.copied') : this.getMessage('gc-social-share.copy')}</span>
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }

  private getFacebookUrl(url: string): string {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  }

  private getTwitterUrl(url: string, title: string): string {
    return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  }

  private getLinkedInUrl(url: string): string {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  }

  private getEmailUrl(url: string, title: string, description: string): string {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`${description}\n\n${url}`);
    return `mailto:?subject=${subject}&body=${body}`;
  }

  private async copyToClipboard(): Promise<void> {
    const url = this.pageUrl || window.location.href;
    
    try {
      await navigator.clipboard.writeText(url);
      this.copied = true;
      
      this.emitEvent('gc-share-copy', { url });
      this.announce(this.getMessage('gc-social-share.copyAnnouncement'));
      
      setTimeout(() => {
        this.copied = false;
      }, 3000);
    } catch (error) {
      console.error('Failed to copy:', error);
      this.emitEvent('gc-share-copy-error', { error });
    }
  }

  private handleShare(platform: string): void {
    this.emitEvent('gc-share', {
      platform,
      url: this.pageUrl || window.location.href,
      title: this.pageTitle || document.title
    });
  }

  private getFacebookIcon() {
    return html`
      <svg class="share-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    `;
  }

  private getTwitterIcon() {
    return html`
      <svg class="share-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    `;
  }

  private getLinkedInIcon() {
    return html`
      <svg class="share-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    `;
  }

  private getEmailIcon() {
    return html`
      <svg class="share-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    `;
  }

  private getCopyIcon() {
    return html`
      <svg class="share-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
      </svg>
    `;
  }

  private getCheckIcon() {
    return html`
      <svg class="share-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    `;
  }
}

registerMessages('gc-social-share', {
  'en-CA': {
    heading: 'Share this page',
    ariaLabel: 'Share on social media',
    facebook: 'Facebook',
    twitter: 'Twitter',
    linkedin: 'LinkedIn',
    email: 'Email',
    copy: 'Copy link',
    copied: 'Copied!',
    copyLink: 'Copy link to clipboard',
    copyAnnouncement: 'Link copied to clipboard'
  },
  'fr-CA': {
    heading: 'Partagez cette page',
    ariaLabel: 'Partager sur les médias sociaux',
    facebook: 'Facebook',
    twitter: 'Twitter',
    linkedin: 'LinkedIn',
    email: 'Courriel',
    copy: 'Copier le lien',
    copied: 'Copié!',
    copyLink: 'Copier le lien dans le presse-papiers',
    copyAnnouncement: 'Lien copié dans le presse-papiers'
  }
});
