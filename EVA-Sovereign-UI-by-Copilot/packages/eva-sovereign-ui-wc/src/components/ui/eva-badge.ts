/**
 * EVA Badge Component
 * Labels and tags with Spark styling
 * Features: 4 variants, icon support, small compact design
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
  transitions,
} from '../../tokens';

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

export class EVABadge extends EVABaseComponent {
  static get observedAttributes() {
    return ['variant'];
  }

  attributeChangedCallback() {
    this.render();
  }

  protected render(): void {
    const variant = this.getAttr('variant', 'default') as BadgeVariant;

    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: inline-flex;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: ${gcSpacing[2]};
        border: 1px solid transparent;
        padding: 0.125rem ${gcSpacing[2]};
        font-size: 0.75rem;
        font-weight: 500;
        width: fit-content;
        white-space: nowrap;
        flex-shrink: 0;
        gap: ${gcSpacing[1]};
        transition: ${transitions.colors};
        overflow: hidden;
      }

      .badge ::slotted(svg) {
        width: 0.75rem;
        height: 0.75rem;
        pointer-events: none;
      }

      .badge:focus-visible {
        outline: none;
        border-color: ${modernColors.ring};
        box-shadow: 0 0 0 3px color-mix(in srgb, ${modernColors.ring} 20%, transparent);
      }

      .badge[aria-invalid="true"] {
        box-shadow: 0 0 0 3px color-mix(in srgb, ${modernColors.destructive} 20%, transparent);
        border-color: ${modernColors.destructive};
      }

      /* Variants */
      .badge.default {
        border-color: transparent;
        background: ${modernColors.primary};
        color: ${modernColors.primaryForeground};
      }

      a.badge.default:hover {
        background: color-mix(in srgb, ${modernColors.primary} 90%, black);
      }

      .badge.secondary {
        border-color: transparent;
        background: ${modernColors.secondary};
        color: ${modernColors.secondaryForeground};
      }

      a.badge.secondary:hover {
        background: color-mix(in srgb, ${modernColors.secondary} 90%, black);
      }

      .badge.destructive {
        border-color: transparent;
        background: ${modernColors.destructive};
        color: white;
      }

      a.badge.destructive:hover {
        background: color-mix(in srgb, ${modernColors.destructive} 90%, black);
      }

      .badge.destructive:focus-visible {
        box-shadow: 0 0 0 3px color-mix(in srgb, ${modernColors.destructive} 20%, transparent);
      }

      .badge.outline {
        color: ${modernColors.foreground};
        border-color: ${modernColors.border};
      }

      a.badge.outline:hover {
        background: ${modernColors.accent};
        color: ${modernColors.accentForeground};
      }

      @media (prefers-reduced-motion: reduce) {
        .badge {
          transition-duration: 0.01ms !important;
        }
      }
    `));

    const badge = document.createElement('span');
    badge.className = `badge ${variant}`;
    badge.setAttribute('data-slot', 'badge');

    const slot = document.createElement('slot');
    badge.appendChild(slot);

    this.shadow.appendChild(badge);
  }
}

customElements.define('eva-badge', EVABadge);
