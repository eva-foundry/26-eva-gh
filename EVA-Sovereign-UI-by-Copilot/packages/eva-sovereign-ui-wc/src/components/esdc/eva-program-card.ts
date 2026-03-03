/**
 * EVA Program Card Component
 * Card for ESDC programs with Spark styling
 * Features: modern shadows, smooth hover, enhanced focus states
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

export class EVAProgramCard extends EVABaseComponent {
  static get observedAttributes() {
    return ['title-key', 'description-key', 'icon', 'link'];
  }

  attributeChangedCallback() {
    this.render();
  }

  protected render(): void {
    const titleKey = this.getAttr('title-key');
    const descriptionKey = this.getAttr('description-key');
    const icon = this.getAttr('icon', '📄');
    const link = this.getAttr('link', '#');

    const title = this.t(titleKey);
    const description = this.t(descriptionKey);

    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
        height: 100%;
      }

      .card {
        background: ${modernColors.card};
        border: 1px solid ${modernColors.border};
        border-radius: ${gcSpacing[3]};
        padding: ${gcSpacing[6]};
        transition: ${transitions.all};
        text-decoration: none;
        display: flex;
        flex-direction: column;
        height: 100%;
        box-shadow: ${shadows.sm};
      }

      .card:hover {
        border-color: ${modernColors.primary};
        box-shadow: ${shadows.lg};
        transform: translateY(-4px);
      }

      .card:focus-visible {
        outline: 3px solid ${modernColors.ring};
        outline-offset: 2px;
        box-shadow: ${shadows.lg}, 0 0 0 3px color-mix(in srgb, ${modernColors.ring} 20%, transparent);
      }

      .icon {
        font-size: 3rem;
        margin-bottom: ${gcSpacing[4]};
        display: block;
        line-height: 1;
      }

      .title {
        font-family: ${gcTypography.fontHeading};
        font-size: 1.5rem;
        font-weight: ${gcTypography.weightBold};
        color: ${modernColors.primary};
        margin: 0 0 ${gcSpacing[3]} 0;
        line-height: 1.3;
        transition: ${transitions.colors};
      }

      .description {
        font-family: ${gcTypography.fontBody};
        font-size: 0.875rem;
        color: ${modernColors.mutedForeground};
        line-height: 1.6;
        margin: 0;
        flex: 1;
      }

      .card:hover .title {
        color: color-mix(in srgb, ${modernColors.primary} 85%, black);
        text-decoration: underline;
        text-underline-offset: 4px;
      }
      
      /* Accessibility: Reduced motion */
      @media (prefers-reduced-motion: reduce) {
        .card,
        .title {
          transition-duration: 0.01ms !important;
        }
        
        .card:hover {
          transform: none;
        }
      }
    `));

    const card = document.createElement('a');
    card.className = 'card';
    card.href = link;

    const iconEl = document.createElement('span');
    iconEl.className = 'icon';
    iconEl.textContent = icon;
    iconEl.setAttribute('aria-hidden', 'true');
    card.appendChild(iconEl);

    const titleEl = document.createElement('h3');
    titleEl.className = 'title';
    titleEl.textContent = title;
    card.appendChild(titleEl);

    const descriptionEl = document.createElement('p');
    descriptionEl.className = 'description';
    descriptionEl.textContent = description;
    card.appendChild(descriptionEl);

    this.shadow.appendChild(card);
  }
}

customElements.define('eva-program-card', EVAProgramCard);
