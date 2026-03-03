import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

@customElement('gc-footer')
export class GCFooter extends EVAElement {
  static override styles = css`
    :host {
      display: block;
    }

    .footer {
      background: var(--eva-colors-background-dark, #26374a);
      color: var(--eva-colors-white, #fff);
      font-family: var(--eva-fonts-body);
    }

    .footer-main {
      padding: var(--eva-spacing-xl, 2rem) var(--eva-spacing-lg, 1.5rem);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }

    .footer-links {
      display: flex;
      flex-wrap: wrap;
      gap: var(--eva-spacing-xl, 2rem);
      margin-bottom: var(--eva-spacing-xl, 2rem);
    }

    .footer-section {
      flex: 1;
      min-width: 200px;
    }

    .footer-section h3 {
      margin: 0 0 var(--eva-spacing-md, 1rem) 0;
      font-size: var(--eva-font-size-md, 1rem);
      font-weight: 600;
    }

    .footer-section ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .footer-section li {
      margin-bottom: var(--eva-spacing-sm, 0.75rem);
    }

    .footer-section a {
      color: var(--eva-colors-white, #fff);
      text-decoration: none;
      transition: text-decoration 0.2s;
    }

    .footer-section a:hover {
      text-decoration: underline;
    }

    .footer-section a:focus {
      outline: 3px solid var(--eva-colors-focus, #269abc);
      outline-offset: 2px;
    }

    .footer-bottom {
      padding: var(--eva-spacing-lg, 1.5rem);
      background: var(--eva-colors-background-darker, #1a2533);
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: var(--eva-spacing-md, 1rem);
    }

    .footer-logo {
      height: 40px;
    }

    .footer-sub-links {
      display: flex;
      flex-wrap: wrap;
      gap: var(--eva-spacing-md, 1rem);
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .footer-sub-links a {
      color: var(--eva-colors-white, #fff);
      text-decoration: none;
      font-size: var(--eva-font-size-sm, 0.875rem);
    }

    .footer-sub-links a:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .footer-links {
        flex-direction: column;
        gap: var(--eva-spacing-lg, 1.5rem);
      }

      .footer-bottom {
        flex-direction: column;
        align-items: flex-start;
      }

      .footer-sub-links {
        flex-direction: column;
        gap: var(--eva-spacing-sm, 0.75rem);
      }
    }

    @media print {
      .footer-main {
        display: none;
      }

      .footer-bottom {
        background: transparent;
        color: #000;
      }

      .footer-sub-links {
        display: none;
      }
    }
  `;

  @property({ type: Array })
  sections: Array<{ heading: string; links: Array<{ text: string; href: string }> }> = [];

  @property({ type: String })
  logoSrc = '';

  @property({ type: String })
  logoAlt = '';

  @property({ type: Array })
  subLinks: Array<{ text: string; href: string }> = [];

  protected override render() {
    const defaultSections = this.sections.length > 0 ? this.sections : [
      {
        heading: this.getMessage('aboutHeading'),
        links: [
          { text: this.getMessage('contactUs'), href: '#' },
          { text: this.getMessage('aboutGov'), href: '#' }
        ]
      },
      {
        heading: this.getMessage('themesHeading'),
        links: [
          { text: this.getMessage('jobs'), href: '#' },
          { text: this.getMessage('immigration'), href: '#' }
        ]
      }
    ];

    const defaultSubLinks = this.subLinks.length > 0 ? this.subLinks : [
      { text: this.getMessage('social'), href: '#' },
      { text: this.getMessage('mobile'), href: '#' },
      { text: this.getMessage('about'), href: '#' },
      { text: this.getMessage('terms'), href: '#' },
      { text: this.getMessage('privacy'), href: '#' }
    ];

    return html`
      <footer class="footer">
        <div class="footer-main">
          <div class="footer-links">
            ${defaultSections.map(section => html`
              <div class="footer-section">
                <h3>${section.heading}</h3>
                <ul>
                  ${section.links.map(link => html`
                    <li>
                      <a href="${link.href}">${link.text}</a>
                    </li>
                  `)}
                </ul>
              </div>
            `)}
          </div>
        </div>

        <div class="footer-bottom">
          ${this.logoSrc
            ? html`
                <img 
                  class="footer-logo" 
                  src="${this.logoSrc}" 
                  alt="${this.logoAlt || this.getMessage('logoAlt')}"
                />
              `
            : null}
          
          <ul class="footer-sub-links">
            ${defaultSubLinks.map(link => html`
              <li>
                <a href="${link.href}">${link.text}</a>
              </li>
            `)}
          </ul>
        </div>
      </footer>
    `;
  }
}

registerMessages('gc-footer', {
  'en-CA': {
    aboutHeading: 'About government',
    themesHeading: 'Themes and topics',
    contactUs: 'Contact us',
    aboutGov: 'About government',
    jobs: 'Jobs',
    immigration: 'Immigration and citizenship',
    social: 'Social media',
    mobile: 'Mobile applications',
    about: 'About Canada.ca',
    terms: 'Terms and conditions',
    privacy: 'Privacy',
    logoAlt: 'Symbol of the Government of Canada'
  },
  'fr-CA': {
    aboutHeading: 'À propos du gouvernement',
    themesHeading: 'Thèmes et sujets',
    contactUs: 'Contactez-nous',
    aboutGov: 'À propos du gouvernement',
    jobs: 'Emplois',
    immigration: 'Immigration et citoyenneté',
    social: 'Médias sociaux',
    mobile: 'Applications mobiles',
    about: 'À propos de Canada.ca',
    terms: 'Avis',
    privacy: 'Confidentialité',
    logoAlt: 'Symbole du gouvernement du Canada'
  }
});
