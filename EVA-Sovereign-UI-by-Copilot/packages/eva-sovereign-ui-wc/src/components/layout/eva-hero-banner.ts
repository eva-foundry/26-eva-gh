/**
 * EVA Hero Banner Component
 * Hero section with Spark styling
 * Features: gradient backgrounds, enhanced typography, smooth fade-in
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcColors, 
  gcTypography, 
  gcSpacing,
  animations,
} from '../../tokens';

export class EVAHeroBanner extends EVABaseComponent {
  static get observedAttributes() {
    return ['title-key', 'description-key', 'background'];
  }

  attributeChangedCallback() {
    this.render();
  }

  protected render(): void {
    const titleKey = this.getAttr('title-key', 'esdc.hero.title');
    const descriptionKey = this.getAttr('description-key', 'esdc.hero.description');
    const background = this.getAttr('background', modernColors.primary);

    const title = this.t(titleKey);
    const description = this.t(descriptionKey);

    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
        background: ${background};
        background: linear-gradient(135deg, ${background} 0%, color-mix(in srgb, ${background} 85%, black) 100%);
        color: ${modernColors.primaryForeground};
        position: relative;
        overflow: hidden;
      }
      
      :host::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at top right, color-mix(in srgb, ${modernColors.primaryForeground} 5%, transparent) 0%, transparent 50%);
        pointer-events: none;
      }

      .hero-container {
        position: relative;
        max-width: 1200px;
        margin: 0 auto;
        padding: ${gcSpacing[20]} ${gcSpacing[4]};
        text-align: center;
        animation: ${animations.fadeIn.name} 0.6s ease-out;
      }

      @keyframes ${animations.fadeIn.name} {
        from { 
          opacity: 0; 
          transform: translateY(1rem);
        }
        to { 
          opacity: 1; 
          transform: translateY(0);
        }
      }

      .hero-title {
        font-family: ${gcTypography.fontHeading};
        font-size: clamp(2rem, 5vw, 2.5625rem);
        font-weight: ${gcTypography.weightBold};
        margin: 0 0 ${gcSpacing[6]} 0;
        line-height: 1.2;
        letter-spacing: -0.02em;
      }

      .hero-description {
        font-size: clamp(1rem, 2.5vw, 1.25rem);
        margin: 0;
        line-height: 1.6;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
        color: color-mix(in srgb, ${modernColors.primaryForeground} 95%, transparent);
      }

      @media (max-width: 768px) {
        .hero-container {
          padding: ${gcSpacing[12]} ${gcSpacing[4]};
        }
      }
      
      /* Accessibility: Reduced motion */
      @media (prefers-reduced-motion: reduce) {
        .hero-container {
          animation: none;
        }
      }
    `));

    const container = document.createElement('div');
    container.className = 'hero-container';

    const titleEl = document.createElement('h1');
    titleEl.className = 'hero-title';
    titleEl.textContent = title;
    container.appendChild(titleEl);

    const descriptionEl = document.createElement('p');
    descriptionEl.className = 'hero-description';
    descriptionEl.textContent = description;
    container.appendChild(descriptionEl);

    this.shadow.appendChild(container);
  }
}

customElements.define('eva-hero-banner', EVAHeroBanner);
