/**
 * EVA Drawer Component
 * Slide-out panel (similar to Sheet but simplified)
 * Features: 4 sides, overlay, ESC to close
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
  shadows,
} from '../../tokens';

export class EVADrawer extends EVABaseComponent {
  private isOpen = false;

  static get observedAttributes() {
    return ['open', 'side'];
  }

  attributeChangedCallback() {
    this.isOpen = this.getBoolAttr('open');
    this.render();
  }

  connectedCallback() {
    super.connectedCallback();
    
    this.shadow.addEventListener('keydown', (e: Event) => {
      const ke = e as KeyboardEvent;
      if (ke.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  private close() {
    this.isOpen = false;
    this.removeAttribute('open');
    this.emit('close');
    this.render();
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    
    const side = this.getAttr('side', 'right');
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: ${this.isOpen ? 'block' : 'none'};
      }

      .overlay {
        position: fixed;
        inset: 0;
        z-index: 50;
        background: rgba(0, 0, 0, 0.5);
        animation: fadeIn 200ms;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .drawer {
        position: fixed;
        z-index: 51;
        background: ${modernColors.background};
        box-shadow: ${shadows.xl};
        display: flex;
        flex-direction: column;
        gap: ${gcSpacing[6]};
        padding: ${gcSpacing[6]};
        animation: slideIn 300ms ease-out;
        
        ${side === 'right' ? `
          top: 0;
          right: 0;
          bottom: 0;
          width: min(100%, 24rem);
        ` : side === 'left' ? `
          top: 0;
          left: 0;
          bottom: 0;
          width: min(100%, 24rem);
        ` : side === 'top' ? `
          top: 0;
          left: 0;
          right: 0;
          height: min(100%, 24rem);
        ` : `
          bottom: 0;
          left: 0;
          right: 0;
          height: min(100%, 24rem);
        `}
      }

      @keyframes slideIn {
        from {
          transform: ${
            side === 'right' ? 'translateX(100%)' :
            side === 'left' ? 'translateX(-100%)' :
            side === 'top' ? 'translateY(-100%)' :
            'translateY(100%)'
          };
        }
        to {
          transform: translate(0);
        }
      }
    `));

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.addEventListener('click', () => this.close());

    const drawer = document.createElement('div');
    drawer.className = 'drawer';
    
    const slot = document.createElement('slot');
    drawer.appendChild(slot);

    this.shadow.appendChild(overlay);
    this.shadow.appendChild(drawer);
  }
}

customElements.define('eva-drawer', EVADrawer);
