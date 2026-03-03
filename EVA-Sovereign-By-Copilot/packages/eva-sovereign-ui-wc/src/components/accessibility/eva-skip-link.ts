/**
 * EVA Skip Link Component
 * Accessibility navigation - visually hidden until focused
 */

import { EVABaseComponent } from '../../utils/base-component';
import { gcColors, gcTypography, gcSpacing } from '../../tokens';

export class EVASkipLink extends EVABaseComponent {
  static get observedAttributes() {
    return ['target'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupEventListener();
  }

  private setupEventListener() {
    this.shadow.addEventListener('click', (e) => {
      e.preventDefault();
      const target = this.getAttr('target', '#main-content');
      const targetEl = document.querySelector(target) || 
                       document.querySelector('main') ||
                       this.getRootNode() && (this.getRootNode() as any).querySelector(target);
      
      if (targetEl) {
        (targetEl as HTMLElement).focus();
        (targetEl as HTMLElement).scrollIntoView();
      }
    });
  }

  protected render(): void {
    const target = this.getAttr('target', '#main-content');

    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
      }

      .skip-link {
        position: absolute;
        left: -9999px;
        z-index: 999;
        padding: ${gcSpacing.sm} ${gcSpacing.md};
        background: ${gcColors.accent};
        color: ${gcColors.textWhite};
        font-family: ${gcTypography.fontBody};
        font-size: ${gcTypography.sizeBody};
        font-weight: ${gcTypography.weightBold};
        text-decoration: underline;
        border-radius: 0 0 4px 4px;
      }

      .skip-link:focus {
        left: ${gcSpacing.sm};
        top: ${gcSpacing.sm};
        outline: 3px solid ${gcColors.focusOutline};
        outline-offset: 2px;
      }
    `));

    const link = document.createElement('a');
    link.className = 'skip-link';
    link.href = target;
    const slot = document.createElement('slot');
    slot.textContent = this.t('nav.skipToContent');
    link.appendChild(slot);

    this.shadow.appendChild(link);
  }
}

customElements.define('eva-skip-link', EVASkipLink);
