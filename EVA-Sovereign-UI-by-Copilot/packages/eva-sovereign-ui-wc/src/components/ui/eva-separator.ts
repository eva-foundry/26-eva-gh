/**
 * EVA Separator Component
 * Visual divider with Spark styling
 * Features: horizontal/vertical orientation
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
} from '../../tokens';

export type SeparatorOrientation = 'horizontal' | 'vertical';

export class EVASeparator extends EVABaseComponent {
  static get observedAttributes() {
    return ['orientation'];
  }

  attributeChangedCallback() {
    this.render();
  }

  protected render(): void {
    const orientation = this.getAttr('orientation', 'horizontal') as SeparatorOrientation;

    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
      }

      .separator {
        flex-shrink: 0;
        background: ${modernColors.border};
      }

      .separator[data-orientation="horizontal"] {
        height: 1px;
        width: 100%;
      }

      .separator[data-orientation="vertical"] {
        height: 100%;
        width: 1px;
      }
    `));

    const separator = document.createElement('div');
    separator.className = 'separator';
    separator.setAttribute('role', 'separator');
    separator.setAttribute('data-orientation', orientation);
    separator.setAttribute('aria-orientation', orientation);

    this.shadow.appendChild(separator);
  }
}

customElements.define('eva-separator', EVASeparator);
