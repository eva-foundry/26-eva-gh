/**
 * EVA Program Card Component
 * Card for displaying ESDC programs
 */

import { EVABaseComponent } from '../../utils/base-component';
import { gcColors, gcTypography, gcSpacing } from '../../tokens';

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
      }

      .card {
        background: ${gcColors.background};
        border: 2px solid ${gcColors.border};
        border-radius: ${gcSpacing.xs};
        padding: ${gcSpacing.cardPadding};
        transition: all 0.2s ease;
        text-decoration: none;
        display: block;
        height: 100%;
      }

      .card:hover {
        border-color: ${gcColors.linkBlue};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
      }

      .card:focus {
        outline: 3px solid ${gcColors.focusOutline};
        outline-offset: 2px;
      }

      .icon {
        font-size: 48px;
        margin-bottom: ${gcSpacing.sm};
        display: block;
      }

      .title {
        font-family: ${gcTypography.fontHeading};
        font-size: ${gcTypography.sizeH3};
        font-weight: ${gcTypography.weightBold};
        color: ${gcColors.linkBlue};
        margin: 0 0 ${gcSpacing.sm} 0;
      }

      .description {
        font-family: ${gcTypography.fontBody};
        font-size: ${gcTypography.sizeBody};
        color: ${gcColors.text};
        line-height: ${gcTypography.lineHeight};
        margin: 0;
      }

      .card:hover .title {
        color: ${gcColors.linkHover};
        text-decoration: underline;
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
