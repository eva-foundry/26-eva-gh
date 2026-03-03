/**
 * EVA Alert Dialog Component
 * Confirmation/alert dialogs (similar to dialog but for critical actions)
 * Features: Modal overlay, action/cancel buttons, keyboard support
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
  shadows,
  transitions,
} from '../../tokens';

export class EVAAlertDialog extends EVABaseComponent {
  private isOpen = false;

  static get observedAttributes() {
    return ['open'];
  }

  attributeChangedCallback() {
    this.isOpen = this.getBoolAttr('open');
    this.render();
    
    if (this.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  public close() {
    this.removeAttribute('open');
    this.emit('close', {});
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: ${this.isOpen ? 'block' : 'none'};
        position: fixed;
        inset: 0;
        z-index: 50;
      }

      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        animation: fadeIn 200ms;
      }

      .content {
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 50;
        display: grid;
        width: calc(100% - 2rem);
        max-width: 32rem;
        transform: translate(-50%, -50%);
        gap: ${gcSpacing[4]};
        border: 1px solid ${modernColors.border};
        background: ${modernColors.background};
        padding: ${gcSpacing[6]};
        border-radius: ${gcSpacing[3]};
        box-shadow: ${shadows.lg};
        animation: dialogIn 200ms;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes dialogIn {
        from { 
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.95);
        }
        to { 
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }
    `));

    if (!this.isOpen) return;

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    this.shadow.appendChild(overlay);

    const content = document.createElement('div');
    content.className = 'content';
    content.setAttribute('role', 'alertdialog');
    content.setAttribute('aria-modal', 'true');
    
    const slot = document.createElement('slot');
    content.appendChild(slot);

    this.shadow.appendChild(content);
  }
}

customElements.define('eva-alert-dialog', EVAAlertDialog);
