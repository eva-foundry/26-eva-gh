import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-Twitter - Twitter Embedded Timelines
 * Embed Twitter timelines using Twitter's embed API
 */
@customElement('wb-twitter')
export class WBTwitter extends EVAElement {
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

    .timeline {
      width: 100%;
      min-height: 400px;
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
  username = '';

  @property({ type: Number })
  width = 400;

  @property({ type: Number })
  height = 600;

  @property({ type: Number })
  tweetLimit = 5;

  @property({ type: String })
  theme: 'light' | 'dark' = 'light';

  @state()
  private loading = true;

  @state()
  private error = false;

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-twitter', {
      'en-CA': {
        loading: 'Loading Twitter timeline...',
        error: 'Unable to load Twitter timeline',
        loaded: 'Twitter timeline loaded',
        followOn: 'Follow on Twitter'
      },
      'fr-CA': {
        loading: 'Chargement de la chronologie Twitter...',
        error: 'Impossible de charger la chronologie Twitter',
        loaded: 'Chronologie Twitter chargée',
        followOn: 'Suivre sur Twitter'
      }
    });

    this.loadTwitterScript();
  }

  private loadTwitterScript(): void {
    if (window.twttr && window.twttr.widgets) {
      this.renderTimeline();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.onload = () => this.renderTimeline();
    script.onerror = () => this.handleError();
    document.head.appendChild(script);
  }

  private async renderTimeline(): Promise<void> {
    if (!this.username || !window.twttr || !window.twttr.widgets) {
      this.handleError();
      return;
    }

    const container = this.shadowRoot?.querySelector('.timeline');
    if (!container) return;

    try {
      await window.twttr.widgets.createTimeline(
        {
          sourceType: 'profile',
          screenName: this.username
        },
        container,
        {
          width: this.width,
          height: this.height,
          tweetLimit: this.tweetLimit,
          theme: this.theme
        }
      );
      
      this.loading = false;
      this.error = false;
      this.emitEvent('wb-twitter-loaded', { username: this.username });
      this.announce(this.getMessage('wb-twitter', 'loaded'));
    } catch (err) {
      this.handleError();
    }
  }

  private handleError(): void {
    this.loading = false;
    this.error = true;
    this.emitEvent('wb-twitter-error', { username: this.username });
    this.announce(this.getMessage('wb-twitter', 'error'));
  }

  override render() {
    if (!this.username) {
      return html`
        <div class="container">
          <div class="error" role="alert">
            ${this.getMessage('wb-twitter', 'error')}
          </div>
        </div>
      `;
    }

    return html`
      <div class="container" style="width: ${this.width}px;">
        ${this.loading ? html`
          <div class="loading" role="status" aria-live="polite">
            ${this.getMessage('wb-twitter', 'loading')}
          </div>
        ` : ''}
        
        ${this.error ? html`
          <div class="error" role="alert">
            ${this.getMessage('wb-twitter', 'error')}
            <div style="margin-top: 1rem;">
              <a
                href="https://twitter.com/${this.username}"
                target="_blank"
                rel="noopener noreferrer"
                style="color: #1da1f2; text-decoration: underline;"
              >
                ${this.getMessage('wb-twitter', 'followOn')} @${this.username}
              </a>
            </div>
          </div>
        ` : ''}

        <div class="timeline"></div>
      </div>
    `;
  }
}

// Extend Window interface for Twitter widget
declare global {
  interface HTMLElementTagNameMap {
    'wb-twitter': WBTwitter;
  }

  interface Window {
    twttr?: {
      widgets: {
        createTimeline(
          source: { sourceType: string; screenName: string },
          element: Element,
          options: {
            width?: number;
            height?: number;
            tweetLimit?: number;
            theme?: string;
          }
        ): Promise<Element>;
      };
    };
  }
}
