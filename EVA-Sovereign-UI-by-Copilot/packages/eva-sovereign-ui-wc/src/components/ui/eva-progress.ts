/**
 * EVA Progress Component
 * Progress bar with Spark styling
 * Features: animated indicator, percentage-based
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  transitions,
} from '../../tokens';

export class EVAProgress extends EVABaseComponent {
  static get observedAttributes() {
    return ['value', 'max'];
  }

  attributeChangedCallback() {
    this.render();
  }

  protected render(): void {
    const value = parseFloat(this.getAttr('value', '0'));
    const max = parseFloat(this.getAttr('max', '100'));
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
        width: 100%;
      }

      .progress {
        position: relative;
        height: 0.5rem;
        width: 100%;
        overflow: hidden;
        border-radius: 9999px;
        background: color-mix(in srgb, ${modernColors.primary} 20%, transparent);
      }

      .indicator {
        height: 100%;
        width: 100%;
        flex: 1 1 0%;
        background: ${modernColors.primary};
        transition: ${transitions.all};
        transform: translateX(-${100 - percentage}%);
      }

      @media (prefers-reduced-motion: reduce) {
        .indicator {
          transition-duration: 0.01ms !important;
        }
      }
    `));

    const progress = document.createElement('div');
    progress.className = 'progress';
    progress.setAttribute('role', 'progressbar');
    progress.setAttribute('aria-valuemin', '0');
    progress.setAttribute('aria-valuemax', max.toString());
    progress.setAttribute('aria-valuenow', value.toString());

    const indicator = document.createElement('div');
    indicator.className = 'indicator';
    progress.appendChild(indicator);

    this.shadow.appendChild(progress);
  }
}

customElements.define('eva-progress', EVAProgress);
