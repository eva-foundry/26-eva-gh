/**
 * EVA Language Switcher Component
 * Toggle between available locales
 */

import { EVABaseComponent } from '../../utils/base-component';
import { gcColors, gcTypography, gcSpacing } from '../../tokens';
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
        gap: ${gcSpacing.xs};
        align-items: center;
      }

      .lang-button {
        font-family: ${gcTypography.fontBody};
        font-size: ${gcTypography.sizeBodySmall};
        font-weight: ${gcTypography.weightBold};
        padding: ${gcSpacing.xs} ${gcSpacing.sm};
        border: 2px solid ${gcColors.textWhite};
        background: transparent;
        color: ${gcColors.textWhite};
        cursor: pointer;
        border-radius: 4px;
        text-transform: uppercase;
        min-height: ${gcSpacing.touchTargetSmall};
      }

      .lang-button:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      .lang-button:focus {
        outline: 3px solid ${gcColors.focusOutline};
        outline-offset: 2px;
      }

      .lang-button[aria-current="true"] {
        background: ${gcColors.textWhite};
        color: ${gcColors.accent};
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
