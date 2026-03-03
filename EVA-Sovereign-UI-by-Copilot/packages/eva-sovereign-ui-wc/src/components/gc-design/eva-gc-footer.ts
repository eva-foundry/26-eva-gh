/**
 * EVA GC Footer Component
 * Official Government of Canada footer with Spark styling
 * Features: oklch() colors, smooth link transitions, enhanced spacing
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcColors, 
  gcTypography, 
  gcSpacing,
  transitions,
} from '../../tokens';
import { getProfile } from '../../tokens/sovereign-profiles';

export class EVAGCFooter extends EVABaseComponent {
  static get observedAttributes() {
    return ['profile'];
  }

  attributeChangedCallback() {
    this.render();
  }

  protected render(): void {
    const profile = getProfile(this.getAttr('profile', 'canada_gc'));

    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
        background: ${modernColors.primary};
        color: ${modernColors.primaryForeground};
        font-family: ${gcTypography.fontBody};
        margin-top: auto;
        border-top: 1px solid color-mix(in srgb, ${modernColors.primaryForeground} 10%, transparent);
      }

      .footer-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: ${gcSpacing[8]} ${gcSpacing[4]};
      }

      .copyright {
        font-size: 0.875rem;
        margin: 0 0 ${gcSpacing[4]} 0;
        color: color-mix(in srgb, ${modernColors.primaryForeground} 90%, transparent);
      }

      .links {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        gap: ${gcSpacing[6]};
      }

      .links li {
        margin: 0;
      }

      .links a {
        color: ${modernColors.primaryForeground};
        text-decoration: underline;
        text-underline-offset: 4px;
        font-size: 0.875rem;
        transition: ${transitions.colors};
      }

      .links a:hover {
        text-decoration: none;
        color: color-mix(in srgb, ${modernColors.primaryForeground} 80%, transparent);
      }

      .links a:focus-visible {
        outline: 3px solid ${modernColors.ring};
        outline-offset: 3px;
        border-radius: ${gcSpacing[1]};
      }

      @media (max-width: 768px) {
        .footer-container {
          padding: ${gcSpacing[6]} ${gcSpacing[4]};
        }
        
        .links {
          flex-direction: column;
          gap: ${gcSpacing[3]};
        }
      }
      
      /* Accessibility: Reduced motion */
      @media (prefers-reduced-motion: reduce) {
        .links a {
          transition-duration: 0.01ms !important;
        }
      }
    `));

    const container = document.createElement('div');
    container.className = 'footer-container';
    container.setAttribute('role', 'contentinfo');

    // Copyright
    const copyright = document.createElement('p');
    copyright.className = 'copyright';
    copyright.textContent = profile.footer.copyright;
    container.appendChild(copyright);

    // Links
    const linksNav = document.createElement('nav');
    linksNav.setAttribute('aria-label', 'Footer navigation');
    
    const linksList = document.createElement('ul');
    linksList.className = 'links';

    profile.footer.links.forEach(link => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link.url;
      a.textContent = this.t(`footer.${link.label.toLowerCase().replace(/\s+/g, '')}`) || link.label;
      li.appendChild(a);
      linksList.appendChild(li);
    });

    linksNav.appendChild(linksList);
    container.appendChild(linksNav);

    this.shadow.appendChild(container);
  }
}

customElements.define('eva-gc-footer', EVAGCFooter);
