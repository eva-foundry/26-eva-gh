/**
 * EVA GC Header Component
 * Official Government of Canada header with wordmark and language switcher
 */

import { EVABaseComponent } from '../../utils/base-component';
import { gcColors, gcTypography, gcSpacing } from '../../tokens';
import { getProfile } from '../../tokens/sovereign-profiles';

export class EVAGCHeader extends EVABaseComponent {
  static get observedAttributes() {
    return ['profile', 'app-name-key', 'logo-url', 'flag-url'];
  }

  attributeChangedCallback() {
    this.render();
  }

  protected render(): void {
    const profile = getProfile(this.getAttr('profile', 'canada_gc'));
    const appNameKey = this.getAttr('app-name-key', 'esdc.title');
    const appName = this.t(appNameKey);

    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
        background: ${profile.colors.primary};
        color: ${gcColors.textWhite};
        font-family: ${gcTypography.fontBody};
      }

      .header-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: ${gcSpacing.sm} ${gcSpacing.containerPadding};
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${gcSpacing.md};
      }

      .logo-section {
        display: flex;
        align-items: center;
        gap: ${gcSpacing.md};
      }

      .wordmark {
        height: 40px;
        width: auto;
      }

      .flag {
        height: 32px;
        width: auto;
      }

      .app-title {
        font-family: ${gcTypography.fontHeading};
        font-size: ${gcTypography.sizeH5};
        font-weight: ${gcTypography.weightBold};
        margin: 0;
        color: ${gcColors.textWhite};
      }

      .actions-section {
        display: flex;
        align-items: center;
        gap: ${gcSpacing.sm};
      }

      @media (max-width: 768px) {
        .header-container {
          flex-direction: column;
          align-items: flex-start;
        }

        .app-title {
          font-size: ${gcTypography.sizeBodyLarge};
        }
      }
    `));

    const container = document.createElement('div');
    container.className = 'header-container';
    container.setAttribute('role', 'banner');

    const logoSection = document.createElement('div');
    logoSection.className = 'logo-section';

    // Wordmark/Logo
    const logoUrl = this.getAttr('logo-url') || profile.assets.wordmark || profile.assets.logo;
    if (logoUrl) {
      const logo = document.createElement('img');
      logo.src = logoUrl;
      logo.alt = profile.name;
      logo.className = 'wordmark';
      logoSection.appendChild(logo);
    }

    // Flag
    const flagUrl = this.getAttr('flag-url') || profile.assets.flag;
    if (flagUrl) {
      const flag = document.createElement('img');
      flag.src = flagUrl;
      flag.alt = `${profile.name} flag`;
      flag.className = 'flag';
      logoSection.appendChild(flag);
    }

    // App title
    const title = document.createElement('h1');
    title.className = 'app-title';
    title.textContent = appName;
    logoSection.appendChild(title);

    container.appendChild(logoSection);

    // Actions slot (for language switcher, etc.)
    const actionsSection = document.createElement('div');
    actionsSection.className = 'actions-section';
    const slot = document.createElement('slot');
    slot.name = 'actions';
    actionsSection.appendChild(slot);
    container.appendChild(actionsSection);

    this.shadow.appendChild(container);
  }
}

customElements.define('eva-gc-header', EVAGCHeader);
