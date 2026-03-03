import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { EVAElement } from '../EVAElement';
import { registerMessages } from '../../utils/i18n';

// Register translations
registerMessages('en-CA', {
  pageNav: {
    previous: 'Previous',
    next: 'Next',
    pagination: 'Page navigation'
  }
});

registerMessages('fr-CA', {
  pageNav: {
    previous: 'Précédent',
    next: 'Suivant',
    pagination: 'Navigation de page'
  }
});

/**
 * GC Page Navigation Component
 * 
 * Provides previous/next page navigation links.
 * Commonly used at the bottom of multi-page articles and guides.
 * 
 * @element gc-page-navigation
 * @fires gc-page-navigation-click - Fired when navigation link is clicked with {direction: 'previous'|'next', url: string}
 * @fires gc-page-navigation-ready - Fired when component is initialized
 */
@customElement('gc-page-navigation')
export class GCPageNavigation extends EVAElement {
  /**
   * Previous page URL
   */
  @property({ type: String, attribute: 'previous-url' })
  previousUrl = '';

  /**
   * Previous page title
   */
  @property({ type: String, attribute: 'previous-title' })
  previousTitle = '';

  /**
   * Next page URL
   */
  @property({ type: String, attribute: 'next-url' })
  nextUrl = '';

  /**
   * Next page title
   */
  @property({ type: String, attribute: 'next-title' })
  nextTitle = '';

  /**
   * Show compact version (smaller for space-constrained layouts)
   */
  @property({ type: Boolean, reflect: true })
  compact = false;

  /**
   * Component styles
   */
  static styles = css`
    :host {
      display: block;
      font-family: Lato, sans-serif;
      font-size: 1rem;
      line-height: 1.5;
    }

    :host([compact]) {
      font-size: 0.875rem;
    }

    .nav-container {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      padding: 1.5rem 0;
      border-top: 2px solid #e1e4e7;
      border-bottom: 2px solid #e1e4e7;
    }

    :host([compact]) .nav-container {
      padding: 1rem 0;
      border-width: 1px;
    }

    .nav-link {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      flex: 1;
      max-width: 45%;
      padding: 1rem;
      border: 2px solid #284162;
      border-radius: 0.25rem;
      background: white;
      text-decoration: none;
      color: #284162;
      transition: all 0.2s ease;
    }

    .nav-link:hover {
      background-color: #f5f5f5;
      border-color: #0c2447;
    }

    .nav-link:focus {
      outline: none;
      box-shadow: 0 0 0 3px #0535d2;
    }

    .nav-link.previous {
      align-items: flex-start;
    }

    .nav-link.next {
      align-items: flex-end;
      text-align: right;
    }

    :host([compact]) .nav-link {
      padding: 0.75rem;
      border-width: 1px;
    }

    .nav-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .nav-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: #284162;
      line-height: 1.4;
    }

    :host([compact]) .nav-title {
      font-size: 1rem;
    }

    .nav-icon {
      width: 20px;
      height: 20px;
      fill: #284162;
      transition: transform 0.2s ease;
    }

    .nav-link:hover .nav-icon {
      transform: translateX(-3px);
    }

    .nav-link.next:hover .nav-icon {
      transform: translateX(3px);
    }

    .nav-content {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .nav-link.previous .nav-content {
      flex-direction: row;
    }

    .nav-link.next .nav-content {
      flex-direction: row-reverse;
    }

    @media (max-width: 768px) {
      .nav-container {
        flex-direction: column;
      }

      .nav-link {
        max-width: 100%;
      }
    }
  `;

  /**
   * Initialize component
   */
  connectedCallback(): void {
    super.connectedCallback();
    this._emitReadyEvent();
  }

  /**
   * Handle navigation link click
   */
  private _handleClick(e: Event, direction: 'previous' | 'next', url: string): void {
    e.preventDefault();
    
    this.dispatchEvent(
      new CustomEvent('gc-page-navigation-click', {
        detail: { direction, url },
        bubbles: true,
        composed: true
      })
    );

    // Navigate after event
    window.location.href = url;
  }

  /**
   * Emit ready event
   */
  private _emitReadyEvent(): void {
    this.dispatchEvent(
      new CustomEvent('gc-page-navigation-ready', {
        bubbles: true,
        composed: true
      })
    );
  }

  /**
   * Render previous link
   */
  private _renderPrevious() {
    if (!this.previousUrl) return null;

    return html`
      <a
        href="${this.previousUrl}"
        class="nav-link previous"
        part="nav-link previous-link"
        aria-label="${this.t('pageNav.previous')}: ${this.previousTitle || this.previousUrl}"
        @click="${(e: Event) => this._handleClick(e, 'previous', this.previousUrl)}"
      >
        <div class="nav-label" part="nav-label">${this.t('pageNav.previous')}</div>
        <div class="nav-content" part="nav-content">
          <svg class="nav-icon" part="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"/>
          </svg>
          ${this.previousTitle ? html`
            <div class="nav-title" part="nav-title">${this.previousTitle}</div>
          ` : ''}
        </div>
      </a>
    `;
  }

  /**
   * Render next link
   */
  private _renderNext() {
    if (!this.nextUrl) return null;

    return html`
      <a
        href="${this.nextUrl}"
        class="nav-link next"
        part="nav-link next-link"
        aria-label="${this.t('pageNav.next')}: ${this.nextTitle || this.nextUrl}"
        @click="${(e: Event) => this._handleClick(e, 'next', this.nextUrl)}"
      >
        <div class="nav-label" part="nav-label">${this.t('pageNav.next')}</div>
        <div class="nav-content" part="nav-content">
          ${this.nextTitle ? html`
            <div class="nav-title" part="nav-title">${this.nextTitle}</div>
          ` : ''}
          <svg class="nav-icon" part="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/>
          </svg>
        </div>
      </a>
    `;
  }

  /**
   * Render component
   */
  render() {
    // Don't render if no navigation links
    if (!this.previousUrl && !this.nextUrl) {
      return html``;
    }

    return html`
      <nav 
        class="nav-container" 
        part="container"
        aria-label="${this.t('pageNav.pagination')}"
      >
        ${this._renderPrevious()}
        ${this._renderNext()}
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gc-page-navigation': GCPageNavigation;
  }
}
