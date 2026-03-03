/**
 * EVA Skeleton Component
 * Loading placeholder with Spark styling
 * Features: pulse animation for loading states
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
} from '../../tokens';

export class EVASkeleton extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
      }

      .skeleton {
        background: ${modernColors.accent};
        border-radius: ${gcSpacing[2]};
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .skeleton {
          animation-duration: 0.01ms !important;
        }
      }
    `));

    const skeleton = document.createElement('div');
    skeleton.className = 'skeleton';
    
    const slot = document.createElement('slot');
    skeleton.appendChild(slot);

    this.shadow.appendChild(skeleton);
  }
}

customElements.define('eva-skeleton', EVASkeleton);
