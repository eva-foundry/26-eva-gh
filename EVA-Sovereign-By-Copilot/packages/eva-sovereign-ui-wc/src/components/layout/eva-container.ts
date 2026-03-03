/**
 * EVA Container Component
 * Content wrapper with max-width enforcement (GC requirement: 65ch)
 */

import { EVABaseComponent } from '../../utils/base-component';
import { gcLayout, gcSpacing } from '../../tokens';

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
      }

      .container {
        max-width: ${maxWidth};
        margin: 0 auto;
        padding: ${gcSpacing.lg} ${gcSpacing.containerPadding};
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
