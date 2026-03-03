/**
 * EVA Page Shell Component
 * Semantic page structure with header, main, and footer slots
 */

import { EVABaseComponent } from '../../utils/base-component';
import { gcColors, gcTypography } from '../../tokens';

export class EVAPageShell extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        font-family: ${gcTypography.fontBody};
        color: ${gcColors.text};
        background: ${gcColors.background};
      }

      header {
        flex-shrink: 0;
      }

      main {
        flex: 1 0 auto;
        padding: 0;
      }

      footer {
        flex-shrink: 0;
      }
    `));

    const header = document.createElement('header');
    const headerSlot = document.createElement('slot');
    headerSlot.name = 'header';
    header.appendChild(headerSlot);
    this.shadow.appendChild(header);

    const main = document.createElement('main');
    main.id = 'main-content';
    main.setAttribute('role', 'main');
    const mainSlot = document.createElement('slot');
    main.appendChild(mainSlot);
    this.shadow.appendChild(main);

    const footer = document.createElement('footer');
    const footerSlot = document.createElement('slot');
    footerSlot.name = 'footer';
    footer.appendChild(footerSlot);
    this.shadow.appendChild(footer);
  }
}

customElements.define('eva-page-shell', EVAPageShell);
