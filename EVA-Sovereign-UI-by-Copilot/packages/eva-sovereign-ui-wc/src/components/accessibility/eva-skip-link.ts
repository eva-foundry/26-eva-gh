/**
 * EVA Skip Link Component
 * Accessibility navigation with Spark styling
 * Features: smooth slide-in animation, enhanced focus state, oklch() colors
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcColors, 
  gcTypography, 
  gcSpacing,
  shadows,
  transitions,
  animations,
} from '../../tokens';

export class EVASkipLink extends EVABaseComponent {
  static get observedAttributes() {
    return ['target'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupEventListener();
  }

  private setupEventListener() {
    this.shadow.addEventListener('click', (e) => {
      e.preventDefault();
      const target = this.getAttr('target', '#main-content');
      const targetEl = document.querySelector(target) || 
                       document.querySelector('main') ||
                       this.getRootNode() && (this.getRootNode() as any).querySelector(target);
      
      if (targetEl) {
        (targetEl as HTMLElement).focus();
        (targetEl as HTMLElement).scrollIntoView();
      }
    });
  }

  protected render(): void {
    const target = this.getAttr('target', '#main-content');

    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
      }

      .skip-link {
        position: fixed;
        left: -9999px;
        top: ${gcSpacing[2]};
        z-index: 9999;
        padding: ${gcSpacing[3]} ${gcSpacing[6]};
        background: ${modernColors.accent};
        color: ${modernColors.accentForeground};
        font-family: ${gcTypography.fontBody};
        font-size: 0.875rem;
        font-weight: 600;
        text-decoration: none;
        border-radius: ${gcSpacing[2]};
        box-shadow: ${shadows.lg};
        transition: ${transitions.all};
      }

      .skip-link:focus {
        left: ${gcSpacing[2]};
        outline: 3px solid ${modernColors.ring};
        outline-offset: 2px;
        animation: ${animations.slideInFromTop.name} ${animations.slideInFromTop.duration} ${transitions.easeInOut};
        box-shadow: ${shadows.xl}, 0 0 0 3px color-mix(in srgb, ${modernColors.ring} 20%, transparent);
      }
      
      @keyframes ${animations.slideInFromTop.name} {
        from {
          transform: translateY(-100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      
      /* Accessibility: Reduced motion */
      @media (prefers-reduced-motion: reduce) {
        .skip-link {
          transition-duration: 0.01ms !important;
        }
        
        .skip-link:focus {
          animation: none;
        }
      }
    `));

    const link = document.createElement('a');
    link.className = 'skip-link';
    link.href = target;
    const slot = document.createElement('slot');
    slot.textContent = this.t('nav.skipToContent');
    link.appendChild(slot);

    this.shadow.appendChild(link);
  }
}

customElements.define('eva-skip-link', EVASkipLink);
