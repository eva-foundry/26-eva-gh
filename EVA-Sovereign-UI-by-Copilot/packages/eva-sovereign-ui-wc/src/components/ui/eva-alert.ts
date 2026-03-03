/**
 * EVA Alert Component
 * Status messages with Spark styling
 * Features: variants (default/destructive), icon support, ARIA role
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
  shadows,
} from '../../tokens';

export type AlertVariant = 'default' | 'destructive';

export class EVAAlert extends EVABaseComponent {
  static get observedAttributes() {
    return ['variant'];
  }

  attributeChangedCallback() {
    this.render();
  }

  protected render(): void {
    const variant = this.getAttr('variant', 'default') as AlertVariant;

    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
      }

      .alert {
        position: relative;
        width: 100%;
        border-radius: ${gcSpacing[3]};
        border: 1px solid ${modernColors.border};
        padding: ${gcSpacing[4]};
        font-size: 0.875rem;
        display: grid;
        grid-template-columns: auto 1fr;
        gap: ${gcSpacing[3]};
        align-items: flex-start;
      }

      .alert.default {
        background: ${modernColors.card};
        color: ${modernColors.cardForeground};
      }

      .alert.destructive {
        color: ${modernColors.destructive};
        background: ${modernColors.card};
        border-color: ${modernColors.destructive};
      }

      .icon {
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
        transform: translateY(0.125rem);
        color: currentColor;
      }

      .icon ::slotted(svg) {
        width: 1rem;
        height: 1rem;
      }

      .content {
        display: grid;
        gap: ${gcSpacing[2]};
      }

      .title {
        min-height: 1rem;
        font-weight: 500;
        line-height: 1;
        letter-spacing: -0.01em;
      }

      .description {
        color: ${modernColors.mutedForeground};
        font-size: 0.875rem;
        line-height: 1.5;
      }

      .alert.destructive .description {
        color: color-mix(in srgb, ${modernColors.destructive} 90%, transparent);
      }
    `));

    const alert = document.createElement('div');
    alert.className = `alert ${variant}`;
    alert.setAttribute('role', 'alert');

    const icon = document.createElement('div');
    icon.className = 'icon';
    const iconSlot = document.createElement('slot');
    iconSlot.name = 'icon';
    icon.appendChild(iconSlot);
    alert.appendChild(icon);

    const content = document.createElement('div');
    content.className = 'content';

    const title = document.createElement('div');
    title.className = 'title';
    const titleSlot = document.createElement('slot');
    titleSlot.name = 'title';
    title.appendChild(titleSlot);
    content.appendChild(title);

    const description = document.createElement('div');
    description.className = 'description';
    const descSlot = document.createElement('slot');
    description.appendChild(descSlot);
    content.appendChild(description);

    alert.appendChild(content);

    this.shadow.appendChild(alert);
  }
}

customElements.define('eva-alert', EVAAlert);
