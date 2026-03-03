/**
 * EVA Hero Banner Component
 * Hero section with internationalized title and description
 */

import { EVABaseComponent } from '../../utils/base-component';
import { gcColors, gcTypography, gcSpacing } from '../../tokens';

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
    const background = this.getAttr('background', gcColors.accent);

    const title = this.t(titleKey);
    const description = this.t(descriptionKey);

    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
        background: ${background};
        color: ${gcColors.textWhite};
      }

      .hero-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: ${gcSpacing.xxl} ${gcSpacing.containerPadding};
        text-align: center;
      }

      .hero-title {
        font-family: ${gcTypography.fontHeading};
        font-size: ${gcTypography.sizeH1};
        font-weight: ${gcTypography.weightBold};
        margin: 0 0 ${gcSpacing.md} 0;
        line-height: ${gcTypography.lineHeightTight};
      }

      .hero-description {
        font-size: ${gcTypography.sizeBodyLarge};
        margin: 0;
        line-height: ${gcTypography.lineHeight};
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
      }

      @media (max-width: 768px) {
        .hero-container {
          padding: ${gcSpacing.lg} ${gcSpacing.containerPadding};
        }

        .hero-title {
          font-size: ${gcTypography.sizeH2};
        }

        .hero-description {
          font-size: ${gcTypography.sizeBody};
        }
      }
    `));

    const container = document.createElement('div');
    container.className = 'hero-container';

    const titleEl = document.createElement('h2');
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
