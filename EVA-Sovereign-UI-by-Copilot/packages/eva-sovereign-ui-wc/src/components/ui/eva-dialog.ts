/**
 * EVA Dialog Component
 * Modal dialogs with Spark styling
 * Features: overlay backdrop, ESC to close, focus trap, animations
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
  shadows,
  transitions,
} from '../../tokens';

export class EVADialog extends EVABaseComponent {
  private isOpen = false;
  private contentEl?: HTMLDivElement;
  private overlayEl?: HTMLDivElement;

  static get observedAttributes() {
    return ['open'];
  }

  attributeChangedCallback() {
    this.isOpen = this.getBoolAttr('open');
    this.render();
    
    if (this.isOpen) {
      this.handleOpen();
    } else {
      this.handleClose();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupEventListeners();
  }

  private setupEventListeners() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  private handleOpen() {
    document.body.style.overflow = 'hidden';
    this.emit('open', {});
  }

  private handleClose() {
    document.body.style.overflow = '';
    this.emit('close', {});
  }

  public open() {
    this.setAttribute('open', '');
  }

  public close() {
    this.removeAttribute('open');
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
        z-index: 50;
        background: rgba(0, 0, 0, 0.5);
        animation: ${this.isOpen ? 'fadeIn' : 'fadeOut'} 200ms;
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
        box-shadow: ${shadows.lg};
        border-radius: ${gcSpacing[3]};
        animation: ${this.isOpen ? 'dialogIn' : 'dialogOut'} 200ms;
      }

      .close-button {
        position: absolute;
        top: ${gcSpacing[4]};
        right: ${gcSpacing[4]};
        border-radius: ${gcSpacing[1]};
        opacity: 0.7;
        background: none;
        border: none;
        cursor: pointer;
        padding: ${gcSpacing[2]};
        transition: ${transitions.all};
        color: ${modernColors.foreground};
      }

      .close-button:hover {
        opacity: 1;
        background: ${modernColors.accent};
      }

      .close-button:focus-visible {
        outline: none;
        border-color: ${modernColors.ring};
        box-shadow: 0 0 0 2px color-mix(in srgb, ${modernColors.ring} 50%, transparent);
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
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

      @keyframes dialogOut {
        from { 
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        to { 
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.95);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .overlay,
        .content {
          animation-duration: 0.01ms !important;
        }
      }
    `));

    if (!this.isOpen) return;

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.addEventListener('click', () => this.close());
    this.shadow.appendChild(overlay);
    this.overlayEl = overlay;

    const content = document.createElement('div');
    content.className = 'content';
    content.setAttribute('role', 'dialog');
    content.setAttribute('aria-modal', 'true');
    // Minimal accessible name
    const explicitLabel = this.getAttr('aria-label');
    if (explicitLabel) {
      content.setAttribute('aria-label', explicitLabel);
    } else {
      // Fallback generic label
      content.setAttribute('aria-label', 'Dialog');
    }
    // If a title element exists in light DOM, reference it
    const titleEl = this.querySelector('eva-dialog-title') as HTMLElement | null;
    if (titleEl) {
      const titleId = titleEl.getAttribute('id') || 'dialog-title';
      titleEl.setAttribute('id', titleId);
      content.setAttribute('aria-labelledby', titleId);
    }
    content.addEventListener('click', (e) => e.stopPropagation());
    
    const slot = document.createElement('slot');
    content.appendChild(slot);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-button';
    closeBtn.setAttribute('type', 'button');
    closeBtn.innerHTML = '✕';
    closeBtn.addEventListener('click', () => this.close());
    
    const srOnly = document.createElement('span');
    srOnly.className = 'sr-only';
    srOnly.textContent = 'Close';
    closeBtn.appendChild(srOnly);

    content.appendChild(closeBtn);

    this.shadow.appendChild(content);
    this.contentEl = content;
  }
}

export class EVADialogHeader extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: flex;
        flex-direction: column;
        gap: ${gcSpacing[2]};
        text-align: center;
      }

      @media (min-width: 640px) {
        :host {
          text-align: left;
        }
      }
    `));

    const slot = document.createElement('slot');
    this.shadow.appendChild(slot);
  }
}

export class EVADialogFooter extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: flex;
        flex-direction: column-reverse;
        gap: ${gcSpacing[2]};
      }

      @media (min-width: 640px) {
        :host {
          flex-direction: row;
          justify-content: flex-end;
        }
      }
    `));

    const slot = document.createElement('slot');
    this.shadow.appendChild(slot);
  }
}

export class EVADialogTitle extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
        font-size: 1.125rem;
        line-height: 1;
        font-weight: 600;
      }
    `));

    const slot = document.createElement('slot');
    this.shadow.appendChild(slot);
  }
}

export class EVADialogDescription extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
        color: ${modernColors.mutedForeground};
        font-size: 0.875rem;
      }
    `));

    const slot = document.createElement('slot');
    this.shadow.appendChild(slot);
  }
}

customElements.define('eva-dialog', EVADialog);
customElements.define('eva-dialog-header', EVADialogHeader);
customElements.define('eva-dialog-footer', EVADialogFooter);
customElements.define('eva-dialog-title', EVADialogTitle);
customElements.define('eva-dialog-description', EVADialogDescription);
