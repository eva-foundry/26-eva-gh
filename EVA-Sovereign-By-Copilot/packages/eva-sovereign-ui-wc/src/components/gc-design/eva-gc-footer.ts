/**
 * EVA GC Footer Component
 * Official Government of Canada footer with legal text and links
 */

import { EVABaseComponent } from '../../utils/base-component';
import { gcColors, gcTypography, gcSpacing } from '../../tokens';
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
        background: ${profile.colors.primary};
        color: ${gcColors.textWhite};
        font-family: ${gcTypography.fontBody};
        margin-top: ${gcSpacing.xxl};
      }

      .footer-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: ${gcSpacing.lg} ${gcSpacing.containerPadding};
      }

      .copyright {
        font-size: ${gcTypography.sizeBodySmall};
        margin: 0 0 ${gcSpacing.md} 0;
      }

      .links {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        gap: ${gcSpacing.md};
      }

      .links li {
        margin: 0;
      }

      .links a {
        color: ${gcColors.textWhite};
        text-decoration: underline;
        font-size: ${gcTypography.sizeBodySmall};
      }

      .links a:hover {
        text-decoration: none;
      }

      .links a:focus {
        outline: 3px solid ${gcColors.focusOutline};
        outline-offset: 2px;
      }

      @media (max-width: 768px) {
        .links {
          flex-direction: column;
          gap: ${gcSpacing.sm};
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
