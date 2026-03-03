/**
 * EVA Language Switcher Component
 * Toggle between locales with Spark's modern styling
 * Features: oklch() colors, smooth transitions, enhanced focus states
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcColors, 
  gcTypography, 
  gcSpacing,
  transitions,
} from '../../tokens';
import { i18n } from '../../i18n/i18n-service';

export class EVALanguageSwitcher extends EVABaseComponent {
  static get observedAttributes() {
    return ['current-locale', 'available-locales'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupEventListeners();
  }

  attributeChangedCallback() {
    this.render();
  }

  private setupEventListeners() {
    this.shadow.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('lang-button')) {
        const locale = target.dataset.locale;
        if (locale) {
          i18n.setLocale(locale);
          this.emit('language-changed', { locale });
        }
      }
    });
  }

  protected render(): void {
    const currentLocale = i18n.getLocale();
    const availableLocalesAttr = this.getAttr('available-locales', '["en-CA", "fr-CA"]');
    const availableLocales = JSON.parse(availableLocalesAttr);

    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: inline-block;
      }

      .switcher {
        display: flex;
        gap: ${gcSpacing[2]};
        align-items: center;
      }

      .lang-button {
        font-family: ${gcTypography.fontBody};
        font-size: 0.875rem;
        font-weight: 600;
        padding: ${gcSpacing[2]} ${gcSpacing[3]};
        border: 2px solid ${modernColors.primaryForeground};
        background: transparent;
        color: ${modernColors.primaryForeground};
        cursor: pointer;
        border-radius: ${gcSpacing[1]};
        text-transform: uppercase;
        min-height: 2rem;
        transition: ${transitions.all};
      }

      .lang-button:hover {
        background: color-mix(in srgb, ${modernColors.primaryForeground} 10%, transparent);
        transform: translateY(-1px);
      }

      .lang-button:focus-visible {
        outline: 3px solid ${modernColors.ring};
        outline-offset: 2px;
        box-shadow: 0 0 0 3px color-mix(in srgb, ${modernColors.ring} 20%, transparent);
      }

      .lang-button[aria-current="true"] {
        background: ${modernColors.primaryForeground};
        color: ${modernColors.primary};
        border-color: ${modernColors.primaryForeground};
      }
      
      .lang-button[aria-current="true"]:hover {
        background: color-mix(in srgb, ${modernColors.primaryForeground} 95%, ${modernColors.primary});
        transform: none;
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }
      
      /* Accessibility: Reduced motion */
      @media (prefers-reduced-motion: reduce) {
        .lang-button {
          transition-duration: 0.01ms !important;
        }
        
        .lang-button:hover {
          transform: none;
        }
      }
    `));

    const switcher = document.createElement('div');
    switcher.className = 'switcher';
    switcher.setAttribute('role', 'group');
    switcher.setAttribute('aria-label', this.t('accessibility.language'));

    availableLocales.forEach((locale: string) => {
      const isCurrent = locale === currentLocale;
      const button = document.createElement('button');
      button.className = 'lang-button';
      button.dataset.locale = locale;
      button.setAttribute('aria-current', isCurrent.toString());
      button.setAttribute('lang', locale);
      
      if (isCurrent) {
        const srText = document.createElement('span');
        srText.className = 'sr-only';
        srText.textContent = this.t('language.current');
        button.appendChild(srText);
      }

      const langCode = locale.split('-')[0].toUpperCase();
      button.appendChild(document.createTextNode(langCode));

      switcher.appendChild(button);
    });

    this.shadow.appendChild(switcher);
  }
}

customElements.define('eva-language-switcher', EVALanguageSwitcher);
