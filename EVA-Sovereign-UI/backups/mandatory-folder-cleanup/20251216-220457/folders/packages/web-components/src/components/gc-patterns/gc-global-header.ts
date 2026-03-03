import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';

/**
 * GC Global Header Component
 * MANDATORY Government of Canada global header
 * 
 * Implements: https://design.canada.ca/common-design-patterns/site-header.html
 * 
 * @element gc-global-header
 * 
 * @slot - Main navigation menu items
 * @slot search - Custom search implementation
 * 
 * @fires gc-language-change - Fires when language is toggled
 * @fires gc-search - Fires when search is submitted
 * @fires gc-menu-toggle - Fires when mobile menu is toggled
 * 
 * @example
 * ```html
 * <gc-global-header>
 *   <a href="/en/services">Services</a>
 *   <a href="/en/departments">Departments</a>
 * </gc-global-header>
 * ```
 */
@customElement('gc-global-header')
export class GCGlobalHeader extends EVAElement {
  protected override componentName = 'gc-global-header';

  /**
   * Site title/name
   */
  @property({ type: String })
  siteTitle = '';

  /**
   * Show search widget
   */
  @property({ type: Boolean })
  showSearch = true;

  /**
   * Show language toggle
   */
  @property({ type: Boolean })
  showLanguageToggle = true;

  /**
   * Mobile menu open state
   */
  @property({ type: Boolean, reflect: true, attribute: 'mobile-menu-open' })
  mobileMenuOpen = false;

  /**
   * Search query
   */
  @property({ type: String })
  searchQuery = '';

  static override styles = css`
    :host {
      display: block;
      background-color: #ffffff;
      border-bottom: 4px solid #af3c43; /* FIP red */
    }

    /* Skip to main content link */
    .skip-to-content {
      position: absolute;
      left: -10000px;
      top: auto;
      width: 1px;
      height: 1px;
      overflow: hidden;
      background-color: #ffffff;
      padding: 0.75rem 1rem;
      border: 2px solid #284162;
      color: #284162;
      font-weight: 700;
      z-index: 10000;
    }

    .skip-to-content:focus {
      position: static;
      width: auto;
      height: auto;
    }

    /* Header container */
    .header-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    /* Top bar with signature and language toggle */
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
      min-height: 60px;
    }

    /* Government of Canada signature */
    .gc-signature {
      display: flex;
      align-items: center;
      gap: 1rem;
      text-decoration: none;
    }

    .gc-signature:focus-visible {
      outline: 3px solid #26374A;
      outline-offset: 2px;
    }

    .flag-icon {
      width: 32px;
      height: 24px;
      background-color: #af3c43;
      position: relative;
      flex-shrink: 0;
    }

    /* Simplified flag representation */
    .flag-icon::before {
      content: '';
      position: absolute;
      width: 12px;
      height: 12px;
      background-color: #ffffff;
      top: 6px;
      left: 10px;
      clip-path: polygon(50% 0%, 61% 35%, 100% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 0% 35%, 39% 35%);
    }

    .gc-wordmark {
      font-family: Lato, sans-serif;
      font-weight: 700;
      font-size: 1.25rem;
      color: #333333;
      line-height: 1.2;
    }

    .gc-wordmark span {
      display: block;
      font-size: 0.875rem;
      font-weight: 400;
    }

    /* Language toggle */
    .language-toggle {
      background: none;
      border: none;
      font-family: Lato, sans-serif;
      font-size: 1rem;
      color: #284162;
      cursor: pointer;
      padding: 0.5rem 1rem;
      min-height: 44px;
      min-width: 44px;
      text-decoration: underline;
      transition: background-color 200ms ease-in-out;
    }

    .language-toggle:hover {
      background-color: #f5f5f5;
    }

    .language-toggle:focus-visible {
      outline: 3px solid #26374A;
      outline-offset: 2px;
    }

    /* Navigation bar */
    .nav-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 0;
      gap: 1rem;
      border-top: 1px solid #e5e5e5;
    }

    /* Site title */
    .site-title {
      font-family: Lato, sans-serif;
      font-weight: 700;
      font-size: 1.125rem;
      color: #333333;
      margin: 0;
    }

    /* Navigation menu */
    .nav-menu {
      display: flex;
      gap: 0;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav-menu ::slotted(a) {
      display: block;
      padding: 0.75rem 1rem;
      color: #284162;
      text-decoration: none;
      font-size: 1rem;
      min-height: 44px;
      transition: background-color 200ms ease-in-out;
    }

    .nav-menu ::slotted(a:hover) {
      background-color: #f5f5f5;
    }

    .nav-menu ::slotted(a:focus-visible) {
      outline: 3px solid #26374A;
      outline-offset: -3px;
    }

    /* Search widget */
    .search-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .search-input {
      padding: 0.75rem 1rem;
      border: 2px solid #666666;
      border-radius: 0.25rem;
      font-size: 1rem;
      font-family: Noto Sans, sans-serif;
      min-width: 200px;
      min-height: 44px;
    }

    .search-input:focus {
      outline: none;
      border-color: #284162;
      box-shadow: 0 0 0 3px rgba(40, 65, 98, 0.2);
    }

    .search-button {
      background-color: #284162;
      color: #ffffff;
      border: none;
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      border-radius: 0.25rem;
      min-height: 44px;
      transition: background-color 200ms ease-in-out;
    }

    .search-button:hover {
      background-color: #1a2633;
    }

    .search-button:focus-visible {
      outline: 3px solid #26374A;
      outline-offset: 2px;
    }

    /* Mobile menu toggle */
    .mobile-menu-toggle {
      display: none;
      background: none;
      border: 2px solid #284162;
      color: #284162;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      border-radius: 0.25rem;
      min-height: 44px;
      min-width: 44px;
    }

    .mobile-menu-toggle:focus-visible {
      outline: 3px solid #26374A;
      outline-offset: 2px;
    }

    /* Mobile styles */
    @media (max-width: 768px) {
      .nav-menu {
        display: none;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: #ffffff;
        border-top: 1px solid #e5e5e5;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
      }

      :host([mobile-menu-open]) .nav-menu {
        display: flex;
      }

      .mobile-menu-toggle {
        display: block;
      }

      .search-input {
        min-width: 150px;
      }

      .gc-wordmark {
        font-size: 1rem;
      }

      .gc-wordmark span {
        font-size: 0.75rem;
      }
    }

    /* Tablet styles */
    @media (min-width: 769px) and (max-width: 1024px) {
      .search-input {
        min-width: 180px;
      }
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      :host {
        border-bottom-width: 6px;
      }

      .language-toggle,
      .mobile-menu-toggle,
      .search-input {
        border-width: 3px;
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      * {
        transition: none !important;
      }
    }
  `;

  override render() {
    const canadaText = this.locale === 'fr-CA' ? 'Canada.ca' : 'Canada.ca';
    const govOfCanada = this.locale === 'fr-CA' 
      ? 'Gouvernement du Canada' 
      : 'Government of Canada';
    const searchLabel = this.locale === 'fr-CA' ? 'Recherche' : 'Search';
    const searchPlaceholder = this.locale === 'fr-CA' 
      ? 'Rechercher dans Canada.ca' 
      : 'Search Canada.ca';
    const menuLabel = this.locale === 'fr-CA' ? 'Menu' : 'Menu';
    const languageLabel = this.locale === 'fr-CA' ? 'English' : 'Français';
    const skipToMain = this.locale === 'fr-CA' 
      ? 'Passer au contenu principal' 
      : 'Skip to main content';

    return html`
      <header role="banner">
        <a href="#main-content" class="skip-to-content">
          ${skipToMain}
        </a>

        <div class="header-container">
          <!-- Top bar with GC signature and language toggle -->
          <div class="top-bar">
            <a href="/" class="gc-signature" aria-label="${govOfCanada}">
              <div class="flag-icon" role="img" aria-label="Canadian flag"></div>
              <div class="gc-wordmark">
                ${canadaText}
                <span>${govOfCanada}</span>
              </div>
            </a>

            ${this.showLanguageToggle
              ? html`
                  <button
                    class="language-toggle"
                    @click="${this._handleLanguageToggle}"
                    aria-label="${this.t('gc-header.toggle-language', `Switch to ${languageLabel}`)}"
                  >
                    ${languageLabel}
                  </button>
                `
              : ''}
          </div>

          <!-- Navigation bar -->
          <nav class="nav-bar" role="navigation" aria-label="${this.t('gc-header.main-navigation', 'Main navigation')}">
            ${this.siteTitle
              ? html`<h1 class="site-title">${this.siteTitle}</h1>`
              : ''}

            <button
              class="mobile-menu-toggle"
              @click="${this._handleMenuToggle}"
              aria-expanded="${this.mobileMenuOpen}"
              aria-label="${menuLabel}"
            >
              ${menuLabel}
            </button>

            <div class="nav-menu">
              <slot></slot>
            </div>

            ${this.showSearch
              ? html`
                  <div class="search-container">
                    <slot name="search">
                      <input
                        type="search"
                        class="search-input"
                        .value="${this.searchQuery}"
                        @input="${this._handleSearchInput}"
                        placeholder="${searchPlaceholder}"
                        aria-label="${searchLabel}"
                      />
                      <button
                        class="search-button"
                        @click="${this._handleSearch}"
                        aria-label="${searchLabel}"
                      >
                        ${searchLabel}
                      </button>
                    </slot>
                  </div>
                `
              : ''}
          </nav>
        </div>
      </header>
    `;
  }

  private _handleLanguageToggle(): void {
    const newLocale = this.locale === 'en-CA' ? 'fr-CA' : 'en-CA';
    
    this.dispatchEvent(
      new CustomEvent('gc-language-change', {
        detail: { locale: newLocale, previousLocale: this.locale },
        bubbles: true,
        composed: true,
      })
    );

    // Update locale (will be handled by global locale context)
    this.locale = newLocale;
  }

  private _handleMenuToggle(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    
    this.dispatchEvent(
      new CustomEvent('gc-menu-toggle', {
        detail: { open: this.mobileMenuOpen },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
  }

  private _handleSearch(): void {
    this.dispatchEvent(
      new CustomEvent('gc-search', {
        detail: { query: this.searchQuery },
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gc-global-header': GCGlobalHeader;
  }
}
