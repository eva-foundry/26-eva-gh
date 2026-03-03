/**
 * EVA Label Component
 * Form labels with Spark styling
 * Features: peer-disabled support, group states
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
} from '../../tokens';

export class EVALabel extends EVABaseComponent {
  static get observedAttributes() {
    return ['for'];
  }

  connectedCallback() {
    super.connectedCallback();
    
    const forId = this.getAttr('for', '');
    if (forId) {
      this.addEventListener('click', () => {
        const target = document.getElementById(forId);
        if (target) {
          target.focus();
          target.click?.();
        }
      });
    }
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: inline-flex;
      }

      .label {
        display: flex;
        align-items: center;
        gap: ${gcSpacing[2]};
        font-size: 0.875rem;
        line-height: 1;
        font-weight: 500;
        user-select: none;
        cursor: pointer;
        color: ${modernColors.foreground};
      }

      :host([disabled]) .label,
      .label:has(+ :disabled) {
        pointer-events: none;
        opacity: 0.5;
      }

      .label ::slotted(svg) {
        width: 1rem;
        height: 1rem;
      }
    `));

    const label = document.createElement('label');
    label.className = 'label';
    
    const forId = this.getAttr('for', '');
    if (forId) {
      label.setAttribute('for', forId);
    }

    const slot = document.createElement('slot');
    label.appendChild(slot);

    this.shadow.appendChild(label);
  }
}

customElements.define('eva-label', EVALabel);
