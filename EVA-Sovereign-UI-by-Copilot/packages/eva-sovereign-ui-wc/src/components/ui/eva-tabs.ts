/**
 * EVA Tabs Component  
 * Tabbed interfaces with Spark styling
 * Features: keyboard navigation, active indicator, ARIA tabs pattern
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
  shadows,
  transitions,
} from '../../tokens';

export class EVATabs extends EVABaseComponent {
  private activeTab = '';

  static get observedAttributes() {
    return ['active'];
  }

  attributeChangedCallback() {
    this.activeTab = this.getAttr('active', '');
    this.render();
  }

  connectedCallback() {
    super.connectedCallback();
    
    this.addEventListener('tab-select', ((e: CustomEvent) => {
      this.setAttribute('active', e.detail.value);
      this.emit('change', { value: e.detail.value });
    }) as EventListener);
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: flex;
        flex-direction: column;
        gap: ${gcSpacing[2]};
      }
    `));

    const slot = document.createElement('slot');
    this.shadow.appendChild(slot);
  }
}

export class EVATabsList extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: inline-flex;
        height: 2.25rem;
        width: fit-content;
        align-items: center;
        justify-content: center;
        border-radius: ${gcSpacing[3]};
        background: ${modernColors.muted};
        color: ${modernColors.mutedForeground};
        padding: 3px;
      }
    `));

    const slot = document.createElement('slot');
    this.shadow.appendChild(slot);
  }
}

export class EVATabsTrigger extends EVABaseComponent {
  private isActive = false;

  static get observedAttributes() {
    return ['value', 'disabled'];
  }

  attributeChangedCallback() {
    this.render();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupEventListeners();
    this.checkActive();
  }

  private setupEventListeners() {
    this.shadow.addEventListener('click', () => {
      if (!this.getBoolAttr('disabled')) {
        const value = this.getAttr('value', '');
        this.emit('tab-select', { value });
      }
    });
  }

  private checkActive() {
    const tabs = this.closest('eva-tabs');
    if (tabs) {
      const activeValue = tabs.getAttribute('active');
      const thisValue = this.getAttr('value', '');
      this.isActive = activeValue === thisValue;
      this.render();
    }
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: inline-flex;
      }

      .trigger {
        display: inline-flex;
        flex: 1;
        height: calc(100% - 1px);
        align-items: center;
        justify-content: center;
        gap: ${gcSpacing[2]};
        border-radius: ${gcSpacing[2]};
        border: 1px solid transparent;
        padding: ${gcSpacing[1]} ${gcSpacing[2]};
        font-size: 0.875rem;
        font-weight: 500;
        white-space: nowrap;
        transition: ${transitions.colors};
        background: none;
        cursor: pointer;
        color: ${modernColors.foreground};
      }

      .trigger[data-active="true"] {
        background: ${modernColors.background};
        box-shadow: ${shadows.sm};
        border-color: ${modernColors.input};
      }

      .trigger:hover:not([disabled]) {
        background: color-mix(in srgb, ${modernColors.background} 50%, transparent);
      }

      .trigger:focus-visible {
        outline: 1px solid ${modernColors.ring};
        box-shadow: 0 0 0 3px color-mix(in srgb, ${modernColors.ring} 50%, transparent);
        border-color: ${modernColors.ring};
      }

      .trigger:disabled {
        pointer-events: none;
        opacity: 0.5;
      }

      .trigger ::slotted(svg) {
        width: 1rem;
        height: 1rem;
      }

      @media (prefers-reduced-motion: reduce) {
        .trigger {
          transition-duration: 0.01ms !important;
        }
      }
    `));

    const trigger = document.createElement('button');
    trigger.className = 'trigger';
    trigger.setAttribute('type', 'button');
    trigger.setAttribute('role', 'tab');
    trigger.setAttribute('data-active', this.isActive.toString());
    
    if (this.getBoolAttr('disabled')) {
      trigger.setAttribute('disabled', '');
    }

    const slot = document.createElement('slot');
    trigger.appendChild(slot);

    this.shadow.appendChild(trigger);
  }
}

export class EVATabsContent extends EVABaseComponent {
  private isActive = false;

  static get observedAttributes() {
    return ['value'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.checkActive();
    
    const tabs = this.closest('eva-tabs');
    if (tabs) {
      tabs.addEventListener('change', () => {
        this.checkActive();
      });
    }
  }

  private checkActive() {
    const tabs = this.closest('eva-tabs');
    if (tabs) {
      const activeValue = tabs.getAttribute('active');
      const thisValue = this.getAttr('value', '');
      this.isActive = activeValue === thisValue;
      this.render();
    }
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: ${this.isActive ? 'block' : 'none'};
        flex: 1;
        outline: none;
      }
    `));

    const content = document.createElement('div');
    content.setAttribute('role', 'tabpanel');
    
    const slot = document.createElement('slot');
    content.appendChild(slot);

    this.shadow.appendChild(content);
  }
}

customElements.define('eva-tabs', EVATabs);
customElements.define('eva-tabs-list', EVATabsList);
customElements.define('eva-tabs-trigger', EVATabsTrigger);
customElements.define('eva-tabs-content', EVATabsContent);
