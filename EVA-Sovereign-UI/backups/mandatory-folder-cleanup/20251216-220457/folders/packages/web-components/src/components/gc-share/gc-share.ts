import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../utils/i18n.js';

// Register translations
registerMessages('en-CA', {
  'gc.share.heading': 'Share this page',
  'share.facebook': 'Share on Facebook',
  'share.twitter': 'Share on Twitter',
  'share.linkedin': 'Share on LinkedIn',
  'share.email': 'Share by email',
  'gc.share.copyLink': 'Copy link',
  'share.linkCopied': 'Link copied!',
});

registerMessages('fr-CA', {
  'gc.share.heading': 'Partager cette page',
  'share.facebook': 'Partager sur Facebook',
  'share.twitter': 'Partager sur Twitter',
  'share.linkedin': 'Partager sur LinkedIn',
  'share.email': 'Partager par courriel',
  'gc.share.copyLink': 'Copier le lien',
  'share.linkCopied': 'Lien copié!',
});

export type SharePlatform = 'facebook' | 'twitter' | 'linkedin' | 'email' | 'copy';

export interface ShareConfig {
  url?: string;
  title?: string;
  description?: string;
}

/**
 * GC Share Component
 *
 * Social sharing buttons for government content.
 * Provides sharing to Facebook, Twitter, LinkedIn, email, and copy link.
 *
 * @element gc-share
 *
 * @prop {string} url - URL to share (defaults to current page)
 * @prop {string} title - Title for sharing (defaults to page title)
 * @prop {string} description - Description for sharing
 * @prop {SharePlatform[]} platforms - Platforms to show (default: all)
 * @prop {boolean} hideHeading - Hide the "Share this page" heading
 * @prop {boolean} compact - Compact layout for tight spaces
 *
 * @fires gc-share-click - Emitted when share button is clicked
 * @fires gc-share-success - Emitted when sharing succeeds (e.g., link copied)
 *
 * @example
 * ```html
 * <gc-share
 *   url="https://canada.ca/en/services/benefits/ei"
 *   title="Employment Insurance Benefits"
 * ></gc-share>
 * ```
 */
export class GCShare extends EVAElement {
  static styles = css`
    :host {
      display: block;
      font-family: Lato, 'Helvetica Neue', Arial, sans-serif;
      color: #333;
    }

    .share-container {
      padding: 1rem 0;
    }

    :host([compact]) .share-container {
      padding: 0.5rem 0;
    }

    .share-heading {
      margin: 0 0 1rem 0;
      font-size: 1.125rem;
      font-weight: 700;
      color: #284162;
    }

    :host([compact]) .share-heading {
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }

    .share-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      align-items: center;
    }

    :host([compact]) .share-buttons {
      gap: 0.5rem;
    }

    .share-button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      min-height: 44px;
      border: 2px solid #284162;
      border-radius: 0.25rem;
      background: white;
      color: #284162;
      font-family: Lato, 'Helvetica Neue', Arial, sans-serif;
      font-size: 0.875rem;
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
      transition: background-color 0.2s, color 0.2s;
    }

    :host([compact]) .share-button {
      padding: 0.375rem 0.75rem;
      min-height: 36px;
      font-size: 0.8125rem;
    }

    .share-button:hover {
      background: #284162;
      color: white;
    }

    .share-button:focus {
      outline: 3px solid #0535d2;
      outline-offset: 2px;
    }

    .share-button:active {
      background: #0c2447;
      border-color: #0c2447;
      color: white;
    }

    .share-icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    :host([compact]) .share-icon {
      width: 16px;
      height: 16px;
    }

    .copy-feedback {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: #d8eeca;
      color: #2b542c;
      border: 2px solid #278400;
      border-radius: 0.25rem;
      font-size: 0.875rem;
      font-weight: 700;
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      .share-button {
        border-width: 3px;
      }

      .share-button:hover {
        border-color: #000;
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      * {
        transition: none !important;
        animation: none !important;
      }
    }

    /* Print - hide social sharing buttons */
    @media print {
      :host {
        display: none;
      }
    }
  `;

  @property({ type: String })
  url?: string;

  @property({ type: String })
  title?: string;

  @property({ type: String })
  description?: string;

  @property({ type: Array })
  platforms: SharePlatform[] = ['facebook', 'twitter', 'linkedin', 'email', 'copy'];

  @property({ type: Boolean, attribute: 'hide-heading' })
  hideHeading = false;

  @property({ type: Boolean, reflect: true })
  compact = false;

  @property({ type: Boolean })
  private _showCopyFeedback = false;

  /**
   * Get the URL to share (defaults to current page URL)
   */
  private _getShareUrl(): string {
    return this.url || window.location.href;
  }

  /**
   * Get the title to share (defaults to page title)
   */
  private _getShareTitle(): string {
    return this.title || document.title;
  }

  /**
   * Get the description to share
   */
  private _getShareDescription(): string {
    return this.description || '';
  }

  /**
   * Handle share button click
   */
  private _handleShare(platform: SharePlatform, event: Event) {
    event.preventDefault();

    const shareUrl = this._getShareUrl();
    const shareTitle = this._getShareTitle();
    const shareDescription = this._getShareDescription();

    // Emit share click event
    this.dispatchEvent(
      new CustomEvent('gc-share-click', {
        bubbles: true,
        composed: true,
        detail: { platform, url: shareUrl, title: shareTitle },
      })
    );

    switch (platform) {
      case 'facebook':
        this._shareToFacebook(shareUrl);
        break;
      case 'twitter':
        this._shareToTwitter(shareUrl, shareTitle);
        break;
      case 'linkedin':
        this._shareToLinkedIn(shareUrl);
        break;
      case 'email':
        this._shareByEmail(shareUrl, shareTitle, shareDescription);
        break;
      case 'copy':
        this._copyLink(shareUrl);
        break;
    }
  }

  /**
   * Share to Facebook
   */
  private _shareToFacebook(url: string) {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }

  /**
   * Share to Twitter
   */
  private _shareToTwitter(url: string, title: string) {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }

  /**
   * Share to LinkedIn
   */
  private _shareToLinkedIn(url: string) {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }

  /**
   * Share by email
   */
  private _shareByEmail(url: string, title: string, description: string) {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`${description}\n\n${url}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }

  /**
   * Copy link to clipboard
   */
  private async _copyLink(url: string) {
    try {
      await navigator.clipboard.writeText(url);

      // Show success feedback
      this._showCopyFeedback = true;
      this.requestUpdate();

      // Emit success event
      this.dispatchEvent(
        new CustomEvent('gc-share-success', {
          bubbles: true,
          composed: true,
          detail: { platform: 'copy', url },
        })
      );

      // Hide feedback after 3 seconds
      setTimeout(() => {
        this._showCopyFeedback = false;
        this.requestUpdate();
      }, 3000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  }

  /**
   * Render share button for a platform
   */
  private _renderShareButton(platform: SharePlatform) {
    const icons: Record<SharePlatform, string> = {
      facebook: '📘',
      twitter: '🐦',
      linkedin: '💼',
      email: '✉️',
      copy: '🔗',
    };

    const labels: Record<SharePlatform, string> = {
      facebook: this.t('share.facebook'),
      twitter: this.t('share.twitter'),
      linkedin: this.t('share.linkedin'),
      email: this.t('share.email'),
      copy: this.t('gc.share.copyLink'),
    };

    return html`
      <button
        class="share-button"
        part="share-button"
        data-platform="${platform}"
        @click="${(e: Event) => this._handleShare(platform, e)}"
        aria-label="${labels[platform]}"
      >
        <span class="share-icon" part="share-icon" aria-hidden="true">${icons[platform]}</span>
        <span class="share-label" part="share-label">${labels[platform]}</span>
      </button>
    `;
  }

  override render() {
    return html`
      <div class="share-container" part="container">
        ${!this.hideHeading
          ? html`<h2 class="share-heading" part="heading">${this.t('gc.share.heading')}</h2>`
          : ''}

        <div class="share-buttons" part="buttons">
          ${this.platforms.map((platform) => this._renderShareButton(platform))}
          ${this._showCopyFeedback
            ? html`
                <div class="copy-feedback" part="copy-feedback" role="status" aria-live="polite">
                  ✓ ${this.t('share.linkCopied')}
                </div>
              `
            : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gc-share': GCShare;
  }
}

customElements.define('gc-share', GCShare);

