/**
 * EVA Collapsible Component
 * Collapsible content container with Spark styling
 * Features: open/closed states, smooth transitions
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  transitions,
} from '../../tokens';

export class EVACollapsible extends EVABaseComponent {
  private isOpen = false;

  static get observedAttributes() {
    return ['open'];
  }

  attributeChangedCallback() {
    this.isOpen = this.getBoolAttr('open');
    this.updateContent();
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateContent();
  }

  private updateContent() {
    const content = this.querySelector('eva-collapsible-content');
    if (content) {
      if (this.isOpen) {
        content.setAttribute('open', '');
      } else {
        content.removeAttribute('open');
      }
    }
  }

  public toggle() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
    this.emit('toggle', { open: this.isOpen });
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
      }
    `));

    const slot = document.createElement('slot');
    this.shadow.appendChild(slot);
  }
}

export class EVACollapsibleTrigger extends EVABaseComponent {
  connectedCallback() {
    super.connectedCallback();
    
    this.addEventListener('click', () => {
      const collapsible = this.closest('eva-collapsible') as any;
      if (collapsible && collapsible.toggle) {
        collapsible.toggle();
      }
    });
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: contents;
      }
    `));

    const slot = document.createElement('slot');
    this.shadow.appendChild(slot);
  }
}

export class EVACollapsibleContent extends EVABaseComponent {
  private isOpen = false;

  static get observedAttributes() {
    return ['open'];
  }

  attributeChangedCallback() {
    this.isOpen = this.getBoolAttr('open');
    this.render();
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: ${this.isOpen ? 'block' : 'none'};
      }

      .content {
        overflow: hidden;
        transition: ${transitions.all};
        animation: ${this.isOpen ? 'collapsibleDown' : 'collapsibleUp'} 200ms ease-out;
      }

      @keyframes collapsibleDown {
        from {
          height: 0;
          opacity: 0;
        }
        to {
          height: auto;
          opacity: 1;
        }
      }

      @keyframes collapsibleUp {
        from {
          height: auto;
          opacity: 1;
        }
        to {
          height: 0;
          opacity: 0;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .content {
          transition-duration: 0.01ms !important;
          animation-duration: 0.01ms !important;
        }
      }
    `));

    const content = document.createElement('div');
    content.className = 'content';
    
    const slot = document.createElement('slot');
    content.appendChild(slot);

    this.shadow.appendChild(content);
  }
}

customElements.define('eva-collapsible', EVACollapsible);
customElements.define('eva-collapsible-trigger', EVACollapsibleTrigger);
customElements.define('eva-collapsible-content', EVACollapsibleContent);
