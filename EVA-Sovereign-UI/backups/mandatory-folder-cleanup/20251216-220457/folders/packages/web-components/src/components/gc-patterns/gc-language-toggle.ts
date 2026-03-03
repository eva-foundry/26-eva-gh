import { html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';

/**
 * GC Language Toggle Component
 * 
 * Official Government of Canada language switcher component.
 * Allows users to switch between English and French.
 * 
 * @element gc-language-toggle
 * 
 * @fires {CustomEvent<{from: string, to: string}>} gc-language-change - Fired when language is changed
 * 
 * @cssprop --gc-lang-toggle-text-color - Text color
 * @cssprop --gc-lang-toggle-hover-color - Hover state color
 * @cssprop --gc-lang-toggle-focus-outline-color - Focus outline color
 * @cssprop --gc-lang-toggle-abbr-bg-color - Abbreviation background color
 * 
 * @example
 * ```html
 * <gc-language-toggle current="en-CA"></gc-language-toggle>
 * 
 * <gc-language-toggle 
 *   current="fr-CA" 
 *   size="large"
 *   display-mode="abbreviated">
 * </gc-language-toggle>
 * ```
 */
@customElement('gc-language-toggle')
export class GCLanguageToggle extends EVAElement {
  static override styles = css`
    :host {
      display: inline-block;
      font-family: 'Lato', 'Noto Sans', sans-serif;
    }

    .lang-toggle {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .lang-toggle a {
      color: var(--gc-lang-toggle-text-color, #284162);
      text-decoration: none;
      font-weight: 700;
      transition: color 0.2s ease;
      cursor: pointer;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
    }

    .lang-toggle a:hover {
      color: var(--gc-lang-toggle-hover-color, #0535d2);
      text-decoration: underline;
    }

    .lang-toggle a:focus {
      outline: 3px solid var(--gc-lang-toggle-focus-outline-color, #303fc1);
      outline-offset: 2px;
    }

    /* Size variants */
    :host([size="small"]) .lang-toggle a {
      font-size: 0.875rem;
      padding: 0.125rem 0.375rem;
    }

    :host([size="medium"]) .lang-toggle a {
      font-size: 1rem;
      padding: 0.25rem 0.5rem;
    }

    :host([size="large"]) .lang-toggle a {
      font-size: 1.125rem;
      padding: 0.375rem 0.75rem;
    }

    /* Abbreviated mode */
    .lang-toggle--abbreviated a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      background-color: var(--gc-lang-toggle-abbr-bg-color, #f8f8f8);
      border: 2px solid #284162;
      border-radius: 4px;
      padding: 0;
    }

    :host([size="small"]) .lang-toggle--abbreviated a {
      width: 2rem;
      height: 2rem;
      font-size: 0.75rem;
    }

    :host([size="large"]) .lang-toggle--abbreviated a {
      width: 3rem;
      height: 3rem;
      font-size: 1rem;
    }

    .lang-toggle--abbreviated a:hover {
      background-color: #e8e8e8;
      border-color: #0535d2;
    }

    /* Inverted colors for dark backgrounds */
    :host([inverted]) .lang-toggle a {
      color: var(--gc-lang-toggle-text-color, #ffffff);
    }

    :host([inverted]) .lang-toggle a:hover {
      color: var(--gc-lang-toggle-hover-color, #d0d0d0);
    }

    :host([inverted]) .lang-toggle--abbreviated a {
      background-color: rgba(255, 255, 255, 0.1);
      border-color: #ffffff;
      color: #ffffff;
    }

    :host([inverted]) .lang-toggle--abbreviated a:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    /* Prefix/suffix labels */
    .lang-toggle__label {
      color: var(--gc-lang-toggle-text-color, #284162);
      font-size: 0.875rem;
      margin-right: 0.5rem;
    }

    :host([inverted]) .lang-toggle__label {
      color: #ffffff;
    }

    /* Screen reader only text */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `;

  /**
   * Current locale (e.g., 'en-CA' or 'fr-CA')
   */
  @property({ type: String, reflect: true })
  current: string = 'en-CA';

  /**
   * Size variant: 'small', 'medium', or 'large'
   */
  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Display mode: 'full' (e.g., "English") or 'abbreviated' (e.g., "EN")
   */
  @property({ type: String, attribute: 'display-mode', reflect: true })
  displayMode: 'full' | 'abbreviated' = 'full';

  /**
   * Use inverted colors for dark backgrounds
   */
  @property({ type: Boolean, reflect: true })
  inverted: boolean = false;

  /**
   * Optional prefix label (e.g., "Language:")
   */
  @property({ type: String, attribute: 'prefix-label' })
  prefixLabel?: string;

  /**
   * Show language abbreviation in parentheses (e.g., "English (EN)")
   */
  @property({ type: Boolean, attribute: 'show-abbr' })
  showAbbr: boolean = false;

  /**
   * Enable animated transition on language change
   */
  @property({ type: Boolean, attribute: 'animated' })
  animated: boolean = true;

  /**
   * Custom ARIA label for the toggle link
   */
  @property({ type: String, attribute: 'aria-label' })
  ariaLabel?: string;

  @state()
  private _isAnimating = false;

  /**
   * Get the language code (e.g., 'en' from 'en-CA')
   */
  private get _langCode(): string {
    return this.current.split('-')[0].toLowerCase();
  }

  /**
   * Get the opposite language code
   */
  private get _targetLangCode(): string {
    return this._langCode === 'en' ? 'fr' : 'en';
  }

  /**
   * Get the full locale string for the target language
   */
  private get _targetLocale(): string {
    return this._targetLangCode === 'en' ? 'en-CA' : 'fr-CA';
  }

  /**
   * Get the display text for the target language
   */
  private get _targetDisplayText(): string {
    const isEnglish = this._langCode === 'en';
    
    if (this.displayMode === 'abbreviated') {
      return isEnglish ? 'FR' : 'EN';
    }
    
    // Full text mode
    if (isEnglish) {
      return this.showAbbr ? 'Français (FR)' : 'Français';
    } else {
      return this.showAbbr ? 'English (EN)' : 'English';
    }
  }

  /**
   * Get the ARIA label for the toggle link
   */
  private get _computedAriaLabel(): string {
    if (this.ariaLabel) {
      return this.ariaLabel;
    }

    const isEnglish = this._langCode === 'en';
    return isEnglish
      ? 'Switch to French / Passer au français'
      : 'Passer à l\'anglais / Switch to English';
  }

  /**
   * Handle language toggle click
   */
  private _handleToggle(e: Event): void {
    e.preventDefault();
    
    const fromLang = this.current;
    const toLang = this._targetLocale;

    // Trigger animation if enabled
    if (this.animated) {
      this._isAnimating = true;
      setTimeout(() => {
        this._isAnimating = false;
      }, 300);
    }

    // Emit language change event
    this.dispatchEvent(
      new CustomEvent('gc-language-change', {
        detail: {
          from: fromLang,
          to: toLang,
        },
        bubbles: true,
        composed: true,
      })
    );

    // Update current locale
    this.current = toLang;

    // Announce to screen readers
    this._announceLanguageChange(toLang);
  }

  /**
   * Announce language change to screen readers
   */
  private _announceLanguageChange(newLocale: string): void {
    const isEnglish = newLocale.startsWith('en');
    const announcement = isEnglish
      ? 'Language switched to English'
      : 'La langue a été changée au français';

    // Create temporary live region
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.className = 'sr-only';
    liveRegion.textContent = announcement;
    
    this.shadowRoot?.appendChild(liveRegion);
    
    setTimeout(() => {
      liveRegion.remove();
    }, 1000);
  }

  override render() {
    const containerClasses = [
      'lang-toggle',
      this.displayMode === 'abbreviated' && 'lang-toggle--abbreviated',
      this._isAnimating && 'lang-toggle--animating',
    ].filter(Boolean).join(' ');

    return html`
      <div class="${containerClasses}" part="container">
        ${this.prefixLabel ? html`
          <span class="lang-toggle__label" part="label">
            ${this.prefixLabel}
          </span>
        ` : nothing}

        <a
          href="#"
          part="link"
          role="button"
          aria-label="${this._computedAriaLabel}"
          lang="${this._targetLangCode}"
          @click="${this._handleToggle}"
        >
          ${this._targetDisplayText}
        </a>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gc-language-toggle': GCLanguageToggle;
  }

  interface HTMLElementEventMap {
    'gc-language-change': CustomEvent<{ from: string; to: string }>;
  }
}
