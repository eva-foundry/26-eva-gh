import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-Country-Content - Geolocation-Based Content
 * Display content based on user's country/region
 */
@customElement('wb-country-content')
export class WBCountryContent extends EVAElement {
  static override styles = css`
    :host {
      display: block;
    }

    .loading {
      padding: var(--eva-spacing-md, 1rem);
      text-align: center;
      color: var(--eva-colors-text-secondary, #666666);
      background: var(--eva-colors-background-default, #f5f5f5);
      border-radius: var(--eva-border-radius-md, 4px);
    }

    ::slotted(*) {
      display: none;
    }

    ::slotted([data-country-match]) {
      display: block;
    }

    ::slotted([data-default]) {
      display: block;
    }
  `;

  @property({ type: String })
  apiUrl = 'https://ipapi.co/json/';

  @property({ type: String })
  fallbackCountry = 'CA';

  @state()
  private detectedCountry = '';

  @state()
  private loading = true;

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-country-content', {
      'en-CA': {
        detecting: 'Detecting your location...',
        detected: 'Location detected',
        error: 'Unable to detect location',
        showing: 'Showing content for'
      },
      'fr-CA': {
        detecting: 'Détection de votre emplacement...',
        detected: 'Emplacement détecté',
        error: 'Impossible de détecter l\'emplacement',
        showing: 'Affichage du contenu pour'
      }
    });

    this.detectCountry();
  }

  private async detectCountry(): Promise<void> {
    try {
      const response = await fetch(this.apiUrl);
      const data = await response.json();
      
      this.detectedCountry = data.country_code || this.fallbackCountry;
      this.loading = false;
      
      this.updateContent();
      this.emitEvent('wb-country-detected', { 
        country: this.detectedCountry,
        countryName: data.country_name 
      });
      this.announce(`${this.getMessage('wb-country-content', 'detected')}: ${data.country_name}`);
    } catch (error) {
      this.detectedCountry = this.fallbackCountry;
      this.loading = false;
      
      this.updateContent();
      this.emitEvent('wb-country-error', { fallback: this.fallbackCountry });
      this.announce(this.getMessage('wb-country-content', 'error'));
    }
  }

  private updateContent(): void {
    const slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement;
    if (!slot) return;

    const elements = slot.assignedElements();
    let matchFound = false;

    elements.forEach((el) => {
      const countryAttr = el.getAttribute('data-country');
      const isDefault = el.hasAttribute('data-default');

      // Remove previous match
      el.removeAttribute('data-country-match');

      // Check if this element matches the detected country
      if (countryAttr) {
        const countries = countryAttr.split(',').map(c => c.trim().toUpperCase());
        if (countries.includes(this.detectedCountry.toUpperCase())) {
          el.setAttribute('data-country-match', '');
          matchFound = true;
        }
      }
    });

    // If no match found, hide default content
    if (matchFound) {
      elements.forEach((el) => {
        if (el.hasAttribute('data-default')) {
          el.removeAttribute('data-default');
        }
      });
    }
  }

  public setCountry(countryCode: string): void {
    this.detectedCountry = countryCode.toUpperCase();
    this.updateContent();
    this.emitEvent('wb-country-changed', { country: this.detectedCountry });
  }

  override render() {
    if (this.loading) {
      return html`
        <div class="loading" role="status" aria-live="polite">
          ${this.getMessage('wb-country-content', 'detecting')}
        </div>
      `;
    }

    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-country-content': WBCountryContent;
  }
}
