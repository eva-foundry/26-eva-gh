/**
 * EVA Container Component
 * Content wrapper with Spark styling
 * Features: responsive padding, max-width enforcement, modern spacing
 */

import { EVABaseComponent } from '../../utils/base-component';
import { gcLayout, gcSpacing, modernColors } from '../../tokens';

export class EVAContainer extends EVABaseComponent {
  static get observedAttributes() {
    return ['max-width'];
  }

  attributeChangedCallback() {
    this.render();
  }

  protected render(): void {
    const maxWidth = this.getAttr('max-width', gcLayout.contentMaxWidth);

    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
        width: 100%;
      }

      .container {
        max-width: ${maxWidth};
        margin: 0 auto;
        padding: ${gcSpacing[8]} ${gcSpacing[4]};
      }
      
      @media (max-width: 768px) {
        .container {
          padding: ${gcSpacing[6]} ${gcSpacing[4]};
        }
      }
      
      @media (max-width: 640px) {
        .container {
          padding: ${gcSpacing[4]} ${gcSpacing[4]};
        }
      }
    `));

    const container = document.createElement('div');
    container.className = 'container';
    const slot = document.createElement('slot');
    container.appendChild(slot);

    this.shadow.appendChild(container);
  }
}

customElements.define('eva-container', EVAContainer);
