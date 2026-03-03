/**
 * EVA GC Button Component
 * Government of Canada button with enhanced Spark styling
 * Features: oklch() colors, smooth transitions, modern shadows
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors, 
  gcColors, 
  gcTypography, 
  gcSpacing,
  shadows,
  transitions,
  generateHoverColor,
} from '../../tokens';

export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

export class EVAGCButton extends EVABaseComponent {
  static get observedAttributes() {
    return ['variant', 'size', 'disabled', 'loading'];
  }

  attributeChangedCallback() {
    this.render();
  }

  protected render(): void {
    const variant = this.getAttr('variant', 'default') as ButtonVariant;
    const size = this.getAttr('size', 'default') as ButtonSize;
    const disabled = this.getBoolAttr('disabled');
    const loading = this.getBoolAttr('loading');

    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: inline-block;
      }

      button {
        /* Base styles */
        display: inline-flex;
        align-items: center;
        justify-center: center;
        gap: 0.5rem;
        white-space: nowrap;
        border-radius: ${gcSpacing[2]};
        font-family: ${gcTypography.fontBody};
        font-size: 0.875rem;
        font-weight: ${gcTypography.weightNormal};
        transition: ${transitions.all};
        cursor: pointer;
        border: 1px solid transparent;
        outline: none;
        
        /* Disabled state */
        &:disabled {
          pointer-events: none;
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        /* SVG handling */
        & svg {
          pointer-events: none;
          width: 1rem;
          height: 1rem;
          flex-shrink: 0;
        }
        
        /* Focus visible state (WCAG 2.2) */
        &:focus-visible {
          outline: 3px solid ${modernColors.ring};
          outline-offset: 3px;
          border-color: ${modernColors.ring};
          box-shadow: 0 0 0 3px color-mix(in srgb, ${modernColors.ring} 20%, transparent);
        }
        
        /* Invalid state */
        &[aria-invalid="true"] {
          box-shadow: 0 0 0 3px color-mix(in srgb, ${modernColors.destructive} 20%, transparent);
          border-color: ${modernColors.destructive};
        }
      }

      /* Default variant - Primary blue */
      button.default {
        background: ${modernColors.primary};
        color: ${modernColors.primaryForeground};
        box-shadow: ${shadows.xs};
      }
      
      button.default:hover:not(:disabled) {
        background: ${generateHoverColor(modernColors.primary, 10)};
      }

      /* Destructive variant - Red */
      button.destructive {
        background: ${modernColors.destructive};
        color: ${modernColors.destructiveForeground};
        box-shadow: ${shadows.xs};
      }
      
      button.destructive:hover:not(:disabled) {
        background: ${generateHoverColor(modernColors.destructive, 10)};
      }
      
      button.destructive:focus-visible {
        box-shadow: 0 0 0 3px color-mix(in srgb, ${modernColors.destructive} 20%, transparent);
      }

      /* Outline variant */
      button.outline {
        border: 1px solid ${modernColors.border};
        background: ${modernColors.background};
        box-shadow: ${shadows.xs};
      }
      
      button.outline:hover:not(:disabled) {
        background: ${modernColors.accent};
        color: ${modernColors.accentForeground};
      }

      /* Secondary variant */
      button.secondary {
        background: ${modernColors.secondary};
        color: ${modernColors.secondaryForeground};
        box-shadow: ${shadows.xs};
      }
      
      button.secondary:hover:not(:disabled) {
        background: ${generateHoverColor(modernColors.secondary, 20)};
      }

      /* Ghost variant - Transparent */
      button.ghost:hover:not(:disabled) {
        background: ${modernColors.accent};
        color: ${modernColors.accentForeground};
      }

      /* Link variant */
      button.link {
        color: ${modernColors.primary};
        text-decoration: underline;
        text-underline-offset: 4px;
      }
      
      button.link:hover:not(:disabled) {
        text-decoration: none;
      }

      /* Size variants */
      button.size-default {
        height: 2.25rem;
        padding: 0.5rem 1rem;
      }
      
      button.size-default:has(svg) {
        padding-left: 0.75rem;
        padding-right: 0.75rem;
      }
      
      button.size-sm {
        height: 2rem;
        border-radius: ${gcSpacing[2]};
        gap: 0.375rem;
        padding: 0 0.75rem;
      }
      
      button.size-sm:has(svg) {
        padding-left: 0.625rem;
        padding-right: 0.625rem;
      }
      
      button.size-lg {
        height: 2.5rem;
        border-radius: ${gcSpacing[2]};
        padding: 0 1.5rem;
      }
      
      button.size-lg:has(svg) {
        padding-left: 1rem;
        padding-right: 1rem;
      }
      
      button.size-icon {
        width: 2.25rem;
        height: 2.25rem;
        padding: 0;
      }

      /* Loading spinner */
      .spinner {
        width: 1rem;
        height: 1rem;
        border: 2px solid currentColor;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      /* Accessibility: Reduced motion */
      @media (prefers-reduced-motion: reduce) {
        button {
          transition-duration: 0.01ms !important;
        }
        
        .spinner {
          animation-duration: 0.01ms !important;
        }
      }
      
      /* High contrast mode */
      @media (prefers-contrast: high) {
        button {
          border-width: 2px;
        }
        
        button:focus-visible {
          outline-width: 4px;
        }
      }
    `));

    const button = document.createElement('button');
    button.className = `${variant} size-${size}`;
    button.disabled = disabled || loading;
    button.setAttribute('type', 'button');
    // Minimal ARIA attributes
    button.setAttribute('aria-disabled', (disabled || loading) ? 'true' : 'false');
    button.setAttribute('aria-busy', loading ? 'true' : 'false');
    // Provide accessible name for icon-only buttons when no text
    const hasLightText = (this.textContent || '').trim().length > 0;
    if (size === 'icon' && !hasLightText) {
      button.setAttribute('aria-label', this.getAttr('aria-label', 'Button'));
    }

    if (loading) {
      const spinner = document.createElement('span');
      spinner.className = 'spinner';
      spinner.setAttribute('role', 'status');
      spinner.setAttribute('aria-label', this.t('accessibility.loading'));
      button.appendChild(spinner);
    }

    const slot = document.createElement('slot');
    button.appendChild(slot);
    // Mirror light DOM text into a span to ensure text presence and respond to slot changes
    const textSpan = document.createElement('span');
    const updateText = () => {
      const assigned = (slot as HTMLSlotElement).assignedNodes({ flatten: true });
      const text = assigned.map(n => n.textContent || '').join('').trim();
      textSpan.textContent = text;
    };
    updateText();
    slot.addEventListener('slotchange', updateText);
    button.appendChild(textSpan);

    this.shadow.appendChild(button);
  }
}

customElements.define('eva-gc-button', EVAGCButton);

