/**
 * EVA GC Header Component
 * Official Government of Canada header with Spark styling
 * Features: oklch() colors, smooth transitions, shadow-md, enhanced responsive
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcColors, 
  gcTypography, 
  gcSpacing,
  shadows,
  transitions,
} from '../../tokens';
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
        background: ${modernColors.primary};
        color: ${modernColors.primaryForeground};
        font-family: ${gcTypography.fontBody};
        box-shadow: ${shadows.md};
        position: relative;
        z-index: 50;
      }

      .header-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 ${gcSpacing[4]};
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${gcSpacing[4]};
        height: 4rem;
      }

      .logo-section {
        display: flex;
        align-items: center;
        gap: ${gcSpacing[4]};
      }

      .logo-placeholder {
        width: 2.5rem;
        height: 2.5rem;
        background: color-mix(in srgb, ${modernColors.primaryForeground} 20%, transparent);
        border-radius: ${gcSpacing[2]};
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: ${gcTypography.weightBold};
        font-size: 1.125rem;
      }

      .wordmark {
        height: 40px;
        width: auto;
        transition: ${transitions.transform};
      }
      
      .wordmark:hover {
        transform: scale(1.02);
      }

      .flag {
        height: 32px;
        width: auto;
      }

      .app-title {
        font-family: ${gcTypography.fontHeading};
        font-size: 1.125rem;
        font-weight: 600;
        margin: 0;
        color: ${modernColors.primaryForeground};
      }

      .actions-section {
        display: flex;
        align-items: center;
        gap: ${gcSpacing[4]};
      }

      nav {
        display: flex;
        align-items: center;
        gap: ${gcSpacing[4]};
      }

      @media (max-width: 768px) {
        .header-container {
          height: auto;
          min-height: 4rem;
          flex-wrap: wrap;
          padding: ${gcSpacing[3]} ${gcSpacing[4]};
        }
        
        .logo-section {
          flex: 1;
        }

        .app-title {
          font-size: 1rem;
        }
        
        .actions-section {
          width: 100%;
          justify-content: flex-end;
        }
      }
      
      /* Accessibility: Reduced motion */
      @media (prefers-reduced-motion: reduce) {
        .wordmark,
        * {
          transition-duration: 0.01ms !important;
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
    } else {
      // Placeholder logo
      const logoPlaceholder = document.createElement('div');
      logoPlaceholder.className = 'logo-placeholder';
      logoPlaceholder.textContent = 'GC';
      logoPlaceholder.setAttribute('aria-hidden', 'true');
      logoSection.appendChild(logoPlaceholder);
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
    const actionsSection = document.createElement('nav');
    actionsSection.className = 'actions-section';
    actionsSection.setAttribute('aria-label', this.t('header.navigation') || 'Header navigation');
    const slot = document.createElement('slot');
    slot.name = 'actions';
    actionsSection.appendChild(slot);
    container.appendChild(actionsSection);

    this.shadow.appendChild(container);
  }
}

customElements.define('eva-gc-header', EVAGCHeader);
