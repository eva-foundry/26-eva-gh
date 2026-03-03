/**
 * EVA Sheet Component
 * Side panels with Spark styling
 * Features: slide from any side, overlay backdrop, ESC to close
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
  shadows,
  transitions,
} from '../../tokens';

export type SheetSide = 'top' | 'right' | 'bottom' | 'left';

export class EVASheet extends EVABaseComponent {
  private isOpen = false;
  private side: SheetSide = 'right';

  static get observedAttributes() {
    return ['open', 'side'];
  }

  attributeChangedCallback() {
    this.isOpen = this.getBoolAttr('open');
    this.side = this.getAttr('side', 'right') as SheetSide;
    this.render();
    
    if (this.isOpen) {
      document.body.style.overflow = 'hidden';
      this.emit('open', {});
    } else {
      document.body.style.overflow = '';
      this.emit('close', {});
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

  public open() {
    this.setAttribute('open', '');
  }

  public close() {
    this.removeAttribute('open');
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    
    const sideStyles = {
      right: `
        inset-y: 0;
        right: 0;
        height: 100%;
        width: 75%;
        max-width: 24rem;
        border-left: 1px solid ${modernColors.border};
        animation: ${this.isOpen ? 'slideInFromRight' : 'slideOutToRight'} ${this.isOpen ? '500ms' : '300ms'};
      `,
      left: `
        inset-y: 0;
        left: 0;
        height: 100%;
        width: 75%;
        max-width: 24rem;
        border-right: 1px solid ${modernColors.border};
        animation: ${this.isOpen ? 'slideInFromLeft' : 'slideOutToLeft'} ${this.isOpen ? '500ms' : '300ms'};
      `,
      top: `
        inset-x: 0;
        top: 0;
        height: auto;
        border-bottom: 1px solid ${modernColors.border};
        animation: ${this.isOpen ? 'slideInFromTop' : 'slideOutToTop'} ${this.isOpen ? '500ms' : '300ms'};
      `,
      bottom: `
        inset-x: 0;
        bottom: 0;
        height: auto;
        border-top: 1px solid ${modernColors.border};
        animation: ${this.isOpen ? 'slideInFromBottom' : 'slideOutToBottom'} ${this.isOpen ? '500ms' : '300ms'};
      `
    };
    
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
        z-index: 50;
        display: flex;
        flex-direction: column;
        gap: ${gcSpacing[4]};
        background: ${modernColors.background};
        box-shadow: ${shadows.lg};
        transition: ease-in-out;
        ${sideStyles[this.side]}
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
        background: ${modernColors.secondary};
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

      @keyframes slideInFromRight {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
      }

      @keyframes slideOutToRight {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
      }

      @keyframes slideInFromLeft {
        from { transform: translateX(-100%); }
        to { transform: translateX(0); }
      }

      @keyframes slideOutToLeft {
        from { transform: translateX(0); }
        to { transform: translateX(-100%); }
      }

      @keyframes slideInFromTop {
        from { transform: translateY(-100%); }
        to { transform: translateY(0); }
      }

      @keyframes slideOutToTop {
        from { transform: translateY(0); }
        to { transform: translateY(-100%); }
      }

      @keyframes slideInFromBottom {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
      }

      @keyframes slideOutToBottom {
        from { transform: translateY(0); }
        to { transform: translateY(100%); }
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

    const content = document.createElement('div');
    content.className = 'content';
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
  }
}

export class EVASheetHeader extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: flex;
        flex-direction: column;
        gap: ${gcSpacing[2]};
        padding: ${gcSpacing[4]};
      }
    `));

    const slot = document.createElement('slot');
    this.shadow.appendChild(slot);
  }
}

export class EVASheetFooter extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: flex;
        flex-direction: column;
        gap: ${gcSpacing[2]};
        margin-top: auto;
        padding: ${gcSpacing[4]};
      }
    `));

    const slot = document.createElement('slot');
    this.shadow.appendChild(slot);
  }
}

export class EVASheetTitle extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
        color: ${modernColors.foreground};
        font-weight: 600;
      }
    `));

    const slot = document.createElement('slot');
    this.shadow.appendChild(slot);
  }
}

export class EVASheetDescription extends EVABaseComponent {
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

customElements.define('eva-sheet', EVASheet);
customElements.define('eva-sheet-header', EVASheetHeader);
customElements.define('eva-sheet-footer', EVASheetFooter);
customElements.define('eva-sheet-title', EVASheetTitle);
customElements.define('eva-sheet-description', EVASheetDescription);
