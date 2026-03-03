import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';

/**
 * GC Signature Component
 * Government of Canada official signature block
 * 
 * Implements: https://design.canada.ca/common-design-patterns/canada-ca-signature.html
 * 
 * @element gc-signature
 * 
 * @fires gc-signature-click - Fires when signature is clicked
 * 
 * @example
 * ```html
 * <gc-signature></gc-signature>
 * ```
 */
@customElement('gc-signature')
export class GCSignature extends EVAElement {
  protected override componentName = 'gc-signature';

  /**
   * Signature size variant
   */
  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Link URL for signature
   */
  @property({ type: String })
  href = '/';

  /**
   * Show link (true) or static signature (false)
   */
  @property({ type: Boolean })
  linked = true;

  /**
   * Inverted color scheme (white on dark background)
   */
  @property({ type: Boolean, reflect: true })
  inverted = false;

  static override styles = css`
    :host {
      display: inline-block;
    }

    /* Signature container */
    .signature-container {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      transition: opacity 200ms ease-in-out;
    }

    .signature-container:hover {
      opacity: 0.8;
    }

    .signature-container:focus-visible {
      outline: 3px solid #26374A;
      outline-offset: 4px;
    }

    /* Flag icon */
    .flag-icon {
      position: relative;
      background-color: #af3c43; /* FIP red */
      flex-shrink: 0;
    }

    /* Maple leaf inside flag */
    .flag-icon::before {
      content: '';
      position: absolute;
      background-color: #ffffff;
      clip-path: polygon(50% 0%, 61% 35%, 100% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 0% 35%, 39% 35%);
    }

    /* Wordmark text */
    .wordmark {
      font-family: Lato, sans-serif;
      color: #333333;
      line-height: 1.2;
      display: flex;
      flex-direction: column;
    }

    .wordmark-main {
      font-weight: 700;
    }

    .wordmark-sub {
      font-weight: 400;
      font-size: 0.875em;
    }

    /* Size variants */
    :host([size="small"]) .flag-icon {
      width: 24px;
      height: 18px;
    }

    :host([size="small"]) .flag-icon::before {
      width: 9px;
      height: 9px;
      top: 4.5px;
      left: 7.5px;
    }

    :host([size="small"]) .wordmark {
      font-size: 0.875rem;
    }

    :host([size="medium"]) .flag-icon {
      width: 32px;
      height: 24px;
    }

    :host([size="medium"]) .flag-icon::before {
      width: 12px;
      height: 12px;
      top: 6px;
      left: 10px;
    }

    :host([size="medium"]) .wordmark {
      font-size: 1rem;
    }

    :host([size="large"]) .flag-icon {
      width: 40px;
      height: 30px;
    }

    :host([size="large"]) .flag-icon::before {
      width: 15px;
      height: 15px;
      top: 7.5px;
      left: 12.5px;
    }

    :host([size="large"]) .wordmark {
      font-size: 1.25rem;
    }

    /* Inverted colors (for dark backgrounds) */
    :host([inverted]) .flag-icon {
      background-color: #ffffff;
    }

    :host([inverted]) .flag-icon::before {
      background-color: #af3c43;
    }

    :host([inverted]) .wordmark {
      color: #ffffff;
    }

    :host([inverted]) .signature-container:focus-visible {
      outline-color: #ffffff;
    }

    /* Static (non-linked) signature */
    .signature-static {
      cursor: default;
    }

    .signature-static:hover {
      opacity: 1;
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      .signature-container:focus-visible {
        outline-width: 4px;
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      * {
        transition: none !important;
      }
    }

    /* Print styles */
    @media print {
      .flag-icon {
        border: 1px solid #000;
      }

      .wordmark {
        color: #000 !important;
      }
    }
  `;

  override render() {
    const canadaText = 'Canada.ca';
    const govText = this.locale === 'fr-CA' 
      ? 'Gouvernement du Canada' 
      : 'Government of Canada';
    
    const ariaLabel = this.locale === 'fr-CA'
      ? 'Gouvernement du Canada'
      : 'Government of Canada';

    const content = html`
      <div class="flag-icon" role="img" aria-label="${this.locale === 'fr-CA' ? 'Drapeau du Canada' : 'Canadian flag'}"></div>
      <div class="wordmark">
        <span class="wordmark-main">${canadaText}</span>
        <span class="wordmark-sub">${govText}</span>
      </div>
    `;

    if (this.linked) {
      return html`
        <a
          href="${this.href}"
          class="signature-container"
          aria-label="${ariaLabel}"
          @click="${this._handleClick}"
        >
          ${content}
        </a>
      `;
    }

    return html`
      <div class="signature-container signature-static" role="img" aria-label="${ariaLabel}">
        ${content}
      </div>
    `;
  }

  private _handleClick(event: MouseEvent): void {
    this.dispatchEvent(
      new CustomEvent('gc-signature-click', {
        detail: {
          href: this.href,
          locale: this.locale,
        },
        bubbles: true,
        composed: true,
      })
    );

    // Allow default navigation behavior unless prevented
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gc-signature': GCSignature;
  }
}
