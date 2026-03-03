/**
 * EVA Toggle Component
 * Toggle button with Spark styling
 * Features: pressed/unpressed states, variants, sizes
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
  shadows,
  transitions,
} from '../../tokens';

export type ToggleVariant = 'default' | 'outline';
export type ToggleSize = 'sm' | 'default' | 'lg';

export class EVAToggle extends EVABaseComponent {
  private pressed = false;

  static get observedAttributes() {
    return ['variant', 'size', 'disabled'];
  }

  attributeChangedCallback(name: string) {
    if (name === 'variant' || name === 'size' || name === 'disabled') {
      this.render();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    // Initial render already sets up button; event listener bound in render
  }

  private handlePress() {
    if (this.getBoolAttr('disabled')) return;
    this.pressed = !this.pressed;
    if (this.pressed) {
      this.setAttribute('pressed', '');
    } else {
      this.removeAttribute('pressed');
    }
    const button = this.shadow.querySelector('.toggle');
    if (button) {
      button.setAttribute('data-pressed', this.pressed.toString());
      button.setAttribute('aria-pressed', this.pressed.toString());
    }
    this.emit('toggle', { pressed: this.pressed });
  }

  protected render(): void {
    const variant = this.getAttr('variant', 'default') as ToggleVariant;
    const size = this.getAttr('size', 'default') as ToggleSize;

    const heights = {
      sm: '2rem',
      default: '2.25rem',
      lg: '2.5rem'
    };

    const minWidths = {
      sm: '2rem',
      default: '2.25rem',
      lg: '2.5rem'
    };

    const paddings = {
      sm: gcSpacing[2],
      default: gcSpacing[2],
      lg: gcSpacing[3]
    };

    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: inline-flex;
      }

      .toggle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: ${gcSpacing[2]};
        border-radius: ${gcSpacing[2]};
        font-size: 0.875rem;
        font-weight: 500;
        white-space: nowrap;
        transition: ${transitions.colors};
        outline: none;
        cursor: pointer;
        height: ${heights[size]};
        min-width: ${minWidths[size]};
        padding: 0 ${paddings[size]};
        border: 1px solid transparent;
        background: ${variant === 'outline' ? 'transparent' : 'transparent'};
        color: ${modernColors.foreground};
      }

      .toggle[data-variant="outline"] {
        border-color: ${modernColors.input};
        background: transparent;
        box-shadow: ${shadows.xs};
      }

      .toggle:hover:not(:disabled) {
        background: ${modernColors.muted};
        color: ${modernColors.mutedForeground};
      }

      .toggle[data-variant="outline"]:hover:not(:disabled) {
        background: ${modernColors.accent};
        color: ${modernColors.accentForeground};
      }

      .toggle[data-pressed="true"] {
        background: ${modernColors.accent};
        color: ${modernColors.accentForeground};
      }

      .toggle:focus-visible {
        border-color: ${modernColors.ring};
        box-shadow: 0 0 0 3px color-mix(in srgb, ${modernColors.ring} 50%, transparent);
      }

      .toggle:disabled {
        pointer-events: none;
        opacity: 0.5;
      }

      .toggle[aria-invalid="true"] {
        box-shadow: 0 0 0 3px color-mix(in srgb, ${modernColors.destructive} 20%, transparent);
        border-color: ${modernColors.destructive};
      }

      .toggle ::slotted(svg) {
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
        pointer-events: none;
      }

      @media (prefers-reduced-motion: reduce) {
        .toggle {
          transition-duration: 0.01ms !important;
        }
      }
    `));

    const button = document.createElement('button');
    button.className = 'toggle';
    button.type = 'button';
    button.setAttribute('data-variant', variant);
    button.setAttribute('data-pressed', this.pressed.toString());
    button.setAttribute('aria-pressed', this.pressed.toString());
    button.addEventListener('click', () => this.handlePress());
    button.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.handlePress();
      }
    });
    
    if (this.getBoolAttr('disabled')) {
      button.disabled = true;
    }

    const slot = document.createElement('slot');
    button.appendChild(slot);

    this.shadow.appendChild(button);
  }
}

customElements.define('eva-toggle', EVAToggle);
