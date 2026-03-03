import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';

/**
 * GC Global Footer Component
 * MANDATORY Government of Canada global footer
 * 
 * Implements: https://design.canada.ca/common-design-patterns/site-footer.html
 * 
 * @element gc-global-footer
 * 
 * @slot bands - Custom footer bands/sections before the main footer
 * @slot corporate - Additional corporate links
 * 
 * @fires gc-link-click - Fires when a footer link is clicked
 * 
 * @example
 * ```html
 * <gc-global-footer></gc-global-footer>
 * ```
 */
@customElement('gc-global-footer')
export class GCGlobalFooter extends EVAElement {
  protected override componentName = 'gc-global-footer';

  /**
   * Show all footer links (true) or compact version (false)
   */
  @property({ type: Boolean })
  expanded = true;

  /**
   * Show context-specific footer band
   */
  @property({ type: Boolean })
  showContextBand = false;

  /**
   * Context band title
   */
  @property({ type: String })
  contextBandTitle = '';

  static override styles = css`
    :host {
      display: block;
      background-color: #f8f8f8;
      border-top: 4px solid #af3c43; /* FIP red */
      margin-top: auto; /* Push to bottom of page */
    }

    /* Context band (optional section above main footer) */
    .context-band {
      background-color: #ebebeb;
      border-bottom: 1px solid #d1d1d1;
    }

    .context-band-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    .context-band-title {
      font-family: Lato, sans-serif;
      font-size: 1.5rem;
      font-weight: 700;
      color: #333333;
      margin: 0 0 1rem 0;
    }

    /* Main footer container */
    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    /* Footer sections layout */
    .footer-sections {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .footer-section {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .footer-section-title {
      font-family: Lato, sans-serif;
      font-size: 1.125rem;
      font-weight: 700;
      color: #333333;
      margin: 0 0 0.5rem 0;
    }

    /* Footer links */
    .footer-link {
      color: #284162;
      text-decoration: underline;
      font-size: 1rem;
      padding: 0.25rem 0;
      transition: color 200ms ease-in-out;
      cursor: pointer;
    }

    .footer-link:hover,
    .footer-link:focus {
      color: #0535d2;
    }

    .footer-link:focus-visible {
      outline: 3px solid #26374A;
      outline-offset: 2px;
    }

    /* Brand section (GC wordmark) */
    .brand-section {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 2rem 0;
      border-top: 1px solid #d1d1d1;
    }

    .gc-wordmark-footer {
      width: 150px;
      height: auto;
    }

    /* Wordmark SVG styling */
    .wordmark-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .wordmark-flag {
      width: 28px;
      height: 21px;
      background-color: #af3c43;
      position: relative;
      flex-shrink: 0;
    }

    .wordmark-flag::before {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: #ffffff;
      top: 5.5px;
      left: 9px;
      clip-path: polygon(50% 0%, 61% 35%, 100% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 0% 35%, 39% 35%);
    }

    .wordmark-text {
      font-family: Lato, sans-serif;
      font-weight: 400;
      font-size: 1rem;
      color: #333333;
      line-height: 1.2;
    }

    /* Compact footer (minimal links) */
    .footer-compact {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      align-items: center;
      padding: 1.5rem 0;
    }

    .footer-compact .footer-link {
      padding: 0.5rem;
      min-height: 44px;
      display: flex;
      align-items: center;
    }

    /* Mandatory GC links */
    .mandatory-links {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      padding: 1rem 0;
      border-top: 1px solid #d1d1d1;
      font-size: 0.875rem;
    }

    .mandatory-links a {
      color: #284162;
      text-decoration: underline;
      transition: color 200ms ease-in-out;
    }

    .mandatory-links a:hover,
    .mandatory-links a:focus {
      color: #0535d2;
    }

    .mandatory-links a:focus-visible {
      outline: 3px solid #26374A;
      outline-offset: 2px;
    }

    /* Mobile styles */
    @media (max-width: 768px) {
      .footer-sections {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .brand-section {
        flex-direction: column;
        align-items: flex-start;
        padding: 1.5rem 0;
      }

      .footer-compact {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .mandatory-links {
        flex-direction: column;
        gap: 0.75rem;
      }
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      :host {
        border-top-width: 6px;
      }

      .footer-link,
      .mandatory-links a {
        text-decoration-thickness: 2px;
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
      :host {
        border-top: 2px solid #000;
      }

      .footer-link,
      .mandatory-links a {
        color: #000;
        text-decoration: underline;
      }
    }
  `;

  override render() {
    const isEnglish = this.locale === 'en-CA';

    // Footer sections content (bilingual)
    const sections = {
      aboutGov: {
        title: isEnglish ? 'About government' : 'Au sujet du gouvernement',
        links: [
          { text: isEnglish ? 'Contact us' : 'Contactez-nous', href: isEnglish ? '/en/contact' : '/fr/contact' },
          { text: isEnglish ? 'Departments and agencies' : 'Ministères et organismes', href: isEnglish ? '/en/government/dept' : '/fr/gouvernement/min' },
          { text: isEnglish ? 'Public service and military' : 'Fonction publique et force militaire', href: isEnglish ? '/en/government/publicservice' : '/fr/gouvernement/fonctionpublique' },
          { text: isEnglish ? 'News' : 'Nouvelles', href: isEnglish ? '/en/news' : '/fr/nouvelles' },
          { text: isEnglish ? 'Treaties, laws and regulations' : 'Traités, lois et règlements', href: isEnglish ? '/en/government/system/laws' : '/fr/gouvernement/systeme/lois' },
          { text: isEnglish ? 'Government-wide reporting' : 'Rapports à l\'échelle du gouvernement', href: isEnglish ? '/en/transparency/reporting' : '/fr/transparence/rapports' },
          { text: isEnglish ? 'Prime Minister' : 'Premier ministre', href: isEnglish ? '/en/government/ministers' : '/fr/gouvernement/ministres' },
          { text: isEnglish ? 'How government works' : 'Comment le gouvernement fonctionne', href: isEnglish ? '/en/government/system' : '/fr/gouvernement/systeme' },
          { text: isEnglish ? 'Open government' : 'Gouvernement ouvert', href: isEnglish ? '/en/open' : '/fr/ouvert' },
        ],
      },
      aboutSite: {
        title: isEnglish ? 'About this site' : 'À propos de ce site',
        links: [
          { text: isEnglish ? 'Social media' : 'Médias sociaux', href: isEnglish ? '/en/social' : '/fr/medias-sociaux' },
          { text: isEnglish ? 'Mobile applications' : 'Applications mobiles', href: isEnglish ? '/en/mobile' : '/fr/mobile' },
          { text: isEnglish ? 'About Canada.ca' : 'À propos de Canada.ca', href: isEnglish ? '/en/about' : '/fr/apropos' },
          { text: isEnglish ? 'Terms and conditions' : 'Avis', href: isEnglish ? '/en/transparency/terms' : '/fr/transparence/avis' },
          { text: isEnglish ? 'Privacy' : 'Confidentialité', href: isEnglish ? '/en/transparency/privacy' : '/fr/transparence/confidentialite' },
        ],
      },
    };

    return html`
      ${this.showContextBand && this.contextBandTitle
        ? html`
            <div class="context-band">
              <div class="context-band-container">
                <h2 class="context-band-title">${this.contextBandTitle}</h2>
                <slot name="bands"></slot>
              </div>
            </div>
          `
        : ''}

      <footer role="contentinfo">
        <div class="footer-container">
          ${this.expanded
            ? html`
                <!-- Expanded footer with all sections -->
                <div class="footer-sections">
                  <!-- About Government section -->
                  <div class="footer-section">
                    <h3 class="footer-section-title">${sections.aboutGov.title}</h3>
                    ${sections.aboutGov.links.map(
                      (link) => html`
                        <a
                          href="${link.href}"
                          class="footer-link"
                          @click="${this._handleLinkClick}"
                        >
                          ${link.text}
                        </a>
                      `
                    )}
                  </div>

                  <!-- About Site section -->
                  <div class="footer-section">
                    <h3 class="footer-section-title">${sections.aboutSite.title}</h3>
                    ${sections.aboutSite.links.map(
                      (link) => html`
                        <a
                          href="${link.href}"
                          class="footer-link"
                          @click="${this._handleLinkClick}"
                        >
                          ${link.text}
                        </a>
                      `
                    )}
                  </div>

                  <!-- Corporate links slot -->
                  <div class="footer-section">
                    <slot name="corporate"></slot>
                  </div>
                </div>
              `
            : html`
                <!-- Compact footer -->
                <div class="footer-compact">
                  <a href="${isEnglish ? '/en/contact' : '/fr/contact'}" class="footer-link">
                    ${isEnglish ? 'Contact us' : 'Contactez-nous'}
                  </a>
                  <a href="${isEnglish ? '/en/government/dept' : '/fr/gouvernement/min'}" class="footer-link">
                    ${isEnglish ? 'Departments' : 'Ministères'}
                  </a>
                  <a href="${isEnglish ? '/en/about' : '/fr/apropos'}" class="footer-link">
                    ${isEnglish ? 'About Canada.ca' : 'À propos de Canada.ca'}
                  </a>
                </div>
              `}

          <!-- Government of Canada brand -->
          <div class="brand-section">
            <div class="wordmark-container" role="img" aria-label="${isEnglish ? 'Symbol of the Government of Canada' : 'Symbole du gouvernement du Canada'}">
              <div class="wordmark-flag" aria-hidden="true"></div>
              <div class="wordmark-text">
                ${isEnglish ? 'Government of Canada' : 'Gouvernement du Canada'}
              </div>
            </div>
          </div>

          <!-- Mandatory links -->
          <nav class="mandatory-links" aria-label="${isEnglish ? 'Footer navigation' : 'Navigation de bas de page'}">
            <a href="${isEnglish ? '/en/social' : '/fr/medias-sociaux'}">
              ${isEnglish ? 'Social media' : 'Médias sociaux'}
            </a>
            <a href="${isEnglish ? '/en/mobile' : '/fr/mobile'}">
              ${isEnglish ? 'Mobile applications' : 'Applications mobiles'}
            </a>
            <a href="${isEnglish ? '/en/about' : '/fr/apropos'}">
              ${isEnglish ? 'About Canada.ca' : 'À propos de Canada.ca'}
            </a>
            <a href="${isEnglish ? '/en/transparency/terms' : '/fr/transparence/avis'}">
              ${isEnglish ? 'Terms and conditions' : 'Avis'}
            </a>
            <a href="${isEnglish ? '/en/transparency/privacy' : '/fr/transparence/confidentialite'}">
              ${isEnglish ? 'Privacy' : 'Confidentialité'}
            </a>
          </nav>
        </div>
      </footer>
    `;
  }

  private _handleLinkClick(event: Event): void {
    const link = event.target as HTMLAnchorElement;
    
    this.dispatchEvent(
      new CustomEvent('gc-link-click', {
        detail: {
          href: link.href,
          text: link.textContent?.trim(),
        },
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gc-global-footer': GCGlobalFooter;
  }
}
