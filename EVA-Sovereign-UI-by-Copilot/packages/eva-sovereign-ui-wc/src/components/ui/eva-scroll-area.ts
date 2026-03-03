/**
 * EVA Scroll Area Component  
 * Custom scrollbar styling
 * Features: Styled scrollbars, smooth scrolling
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
} from '../../tokens';

export class EVAScrollArea extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
        position: relative;
        overflow: hidden;
      }

      .scroll-area {
        width: 100%;
        height: 100%;
        overflow: auto;
        scroll-behavior: smooth;
      }

      /* Custom scrollbar */
      .scroll-area::-webkit-scrollbar {
        width: 0.75rem;
        height: 0.75rem;
      }

      .scroll-area::-webkit-scrollbar-track {
        background: transparent;
      }

      .scroll-area::-webkit-scrollbar-thumb {
        background: ${modernColors.border};
        border-radius: ${gcSpacing[2]};
        border: 2px solid ${modernColors.background};
      }

      .scroll-area::-webkit-scrollbar-thumb:hover {
        background: ${modernColors.mutedForeground};
      }

      /* Firefox */
      .scroll-area {
        scrollbar-width: thin;
        scrollbar-color: ${modernColors.border} transparent;
      }
    `));

    const scrollArea = document.createElement('div');
    scrollArea.className = 'scroll-area';
    
    const slot = document.createElement('slot');
    scrollArea.appendChild(slot);

    this.shadow.appendChild(scrollArea);
  }
}

customElements.define('eva-scroll-area', EVAScrollArea);
