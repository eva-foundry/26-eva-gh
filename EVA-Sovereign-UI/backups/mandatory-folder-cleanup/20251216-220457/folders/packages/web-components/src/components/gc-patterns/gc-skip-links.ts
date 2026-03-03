import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';

/**
 * Skip link interface
 */
export interface SkipLink {
  /**
   * Display text for the skip link
   */
  text: string;

  /**
   * Target element ID or selector
   */
  target: string;

  /**
   * Unique identifier for the skip link
   */
  id?: string;
}

/**
 * GC Skip Links Component
 * 
 * Accessibility skip navigation links that allow keyboard and screen reader users
 * to bypass repetitive navigation and jump directly to main content areas.
 * 
 * Links are visually hidden until focused, ensuring they don't interfere with
 * visual layout while remaining accessible to assistive technology.
 * 
 * @element gc-skip-links
 * 
 * @fires {CustomEvent<{link: SkipLink, targetElement: HTMLElement | null}>} gc-skip-link-activated - Fired when a skip link is activated
 * 
 * @cssprop --gc-skip-link-bg-color - Background color of skip link
 * @cssprop --gc-skip-link-text-color - Text color of skip link
 * @cssprop --gc-skip-link-focus-outline-color - Focus outline color
 * 
 * @example
 * ```html
 * <gc-skip-links
 *   .links="${[
 *     { text: 'Skip to main content', target: '#main-content' },
 *     { text: 'Skip to footer', target: '#footer' }
 *   ]}"
 * ></gc-skip-links>
 * ```
 */
@customElement('gc-skip-links')
export class GCSkipLinks extends EVAElement {
  static override styles = css`
    :host {
      display: block;
      position: relative;
      z-index: 10000;
    }

    .skip-links {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }

    .skip-link {
      position: absolute;
      top: -100px;
      left: 0;
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background-color: var(--gc-skip-link-bg-color, #fff);
      color: var(--gc-skip-link-text-color, #284162);
      text-decoration: underline;
      font-weight: 700;
      font-size: 1rem;
      font-family: 'Lato', 'Noto Sans', sans-serif;
      border: 3px solid #284162;
      border-radius: 0 0 4px 4px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      z-index: 10001;
      transition: top 0.2s ease;
      white-space: nowrap;
    }

    .skip-link:focus {
      top: 0;
      outline: 3px solid var(--gc-skip-link-focus-outline-color, #303fc1);
      outline-offset: 2px;
    }

    /* Positioning for multiple skip links */
    .skip-link:nth-child(1) {
      left: 0.5rem;
    }

    .skip-link:nth-child(2) {
      left: 15rem;
    }

    .skip-link:nth-child(3) {
      left: 29rem;
    }

    .skip-link:nth-child(4) {
      left: 43rem;
    }

    /* Mobile responsive stacking */
    @media (max-width: 768px) {
      .skip-link:nth-child(n) {
        left: 0.5rem !important;
      }

      .skip-link:nth-child(2):focus {
        top: 3.5rem;
      }

      .skip-link:nth-child(3):focus {
        top: 7rem;
      }

      .skip-link:nth-child(4):focus {
        top: 10.5rem;
      }
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      .skip-link {
        border-width: 4px;
      }

      .skip-link:focus {
        outline-width: 4px;
      }
    }

    /* Inverted colors for dark backgrounds */
    :host([inverted]) .skip-link {
      background-color: var(--gc-skip-link-bg-color, #1a1a1a);
      color: var(--gc-skip-link-text-color, #ffffff);
      border-color: #ffffff;
    }

    /* Screen reader announcement */
    .sr-announcement {
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
   * Array of skip link configurations
   */
  @property({ type: Array })
  links: SkipLink[] = [];

  /**
   * Current locale for localized text
   */
  @property({ type: String })
  locale: string = 'en-CA';

  /**
   * Use inverted colors for dark backgrounds
   */
  @property({ type: Boolean, reflect: true })
  inverted: boolean = false;

  /**
   * Enable smooth scrolling to target
   */
  @property({ type: Boolean, attribute: 'smooth-scroll' })
  smoothScroll: boolean = true;

  /**
   * Focus target element after navigation
   */
  @property({ type: Boolean, attribute: 'focus-target' })
  focusTarget: boolean = true;

  /**
   * Scroll offset from top (in pixels) when navigating to target
   */
  @property({ type: Number, attribute: 'scroll-offset' })
  scrollOffset: number = 0;

  /**
   * Get default skip links if none provided
   */
  private get _defaultLinks(): SkipLink[] {
    const isFrench = this.locale.startsWith('fr');
    
    return [
      {
        text: isFrench ? 'Passer au contenu principal' : 'Skip to main content',
        target: '#main-content',
        id: 'skip-to-main',
      },
      {
        text: isFrench ? 'Passer au pied de page' : 'Skip to footer',
        target: '#footer',
        id: 'skip-to-footer',
      },
    ];
  }

  /**
   * Get links to render (use defaults if none provided)
   */
  private get _linksToRender(): SkipLink[] {
    return this.links.length > 0 ? this.links : this._defaultLinks;
  }

  /**
   * Handle skip link activation
   */
  private _handleSkipLinkClick(e: Event, link: SkipLink): void {
    e.preventDefault();

    // Find target element
    const targetElement = this._findTargetElement(link.target);

    if (!targetElement) {
      console.warn(`Skip link target not found: ${link.target}`);
      this._announceToScreenReader(
        this.locale.startsWith('fr')
          ? 'Élément cible introuvable'
          : 'Target element not found'
      );
      return;
    }

    // Scroll to target
    this._scrollToTarget(targetElement);

    // Focus target if enabled
    if (this.focusTarget) {
      this._focusTarget(targetElement);
    }

    // Emit event
    this.dispatchEvent(
      new CustomEvent('gc-skip-link-activated', {
        detail: {
          link,
          targetElement,
        },
        bubbles: true,
        composed: true,
      })
    );

    // Announce navigation to screen readers
    const announcement = this.locale.startsWith('fr')
      ? `Navigation vers ${link.text.toLowerCase()}`
      : `Navigated to ${link.text.toLowerCase()}`;
    
    this._announceToScreenReader(announcement);
  }

  /**
   * Find target element in document or shadow roots
   */
  private _findTargetElement(selector: string): HTMLElement | null {
    // Try to find in main document
    let element = document.querySelector(selector) as HTMLElement | null;

    // If not found and selector is an ID, try getElementById
    if (!element && selector.startsWith('#')) {
      element = document.getElementById(selector.substring(1));
    }

    return element;
  }

  /**
   * Scroll to target element
   */
  private _scrollToTarget(element: HTMLElement): void {
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - this.scrollOffset;

    if (this.smoothScroll) {
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo(0, targetPosition);
    }
  }

  /**
   * Focus target element
   */
  private _focusTarget(element: HTMLElement): void {
    // Make element focusable if it isn't already
    if (!element.hasAttribute('tabindex')) {
      element.setAttribute('tabindex', '-1');
    }

    // Small delay to ensure scroll completes
    setTimeout(() => {
      element.focus();
      
      // Remove temporary tabindex after focus
      if (element.getAttribute('tabindex') === '-1') {
        element.removeAttribute('tabindex');
      }
    }, this.smoothScroll ? 300 : 0);
  }

  /**
   * Announce message to screen readers
   */
  private _announceToScreenReader(message: string): void {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.className = 'sr-announcement';
    liveRegion.textContent = message;
    
    this.shadowRoot?.appendChild(liveRegion);
    
    setTimeout(() => {
      liveRegion.remove();
    }, 1000);
  }

  /**
   * Handle keyboard navigation
   */
  private _handleKeyDown(e: KeyboardEvent, link: SkipLink): void {
    // Allow Enter and Space to activate skip links
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleSkipLinkClick(e, link);
    }
  }

  override render() {
    const linksToRender = this._linksToRender;

    if (linksToRender.length === 0) {
      return html``;
    }

    return html`
      <div class="skip-links" part="container" role="navigation" aria-label="Skip links">
        ${linksToRender.map((link, index) => html`
          <a
            href="${link.target}"
            class="skip-link"
            part="link"
            id="${link.id || `skip-link-${index}`}"
            @click="${(e: Event) => this._handleSkipLinkClick(e, link)}"
            @keydown="${(e: KeyboardEvent) => this._handleKeyDown(e, link)}"
          >
            ${link.text}
          </a>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gc-skip-links': GCSkipLinks;
  }

  interface HTMLElementEventMap {
    'gc-skip-link-activated': CustomEvent<{ link: SkipLink; targetElement: HTMLElement | null }>;
  }
}
