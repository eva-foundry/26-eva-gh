import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

@customElement('gc-print-page')
export class GCPrintPage extends EVAElement {
  static override styles = css`
    :host {
      display: inline-block;
    }

    .print-button {
      display: inline-flex;
      align-items: center;
      gap: var(--eva-spacing-xs, 8px);
      padding: var(--eva-spacing-sm, 12px) var(--eva-spacing-md, 16px);
      background-color: var(--eva-colors-white, #fff);
      border: 1px solid var(--eva-colors-gray-300, #ccc);
      border-radius: var(--eva-border-radius-sm, 2px);
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--eva-colors-gray-900, #333);
      transition: all 0.2s ease;
    }

    .print-button:hover {
      background-color: var(--eva-colors-gray-50, #f9f9f9);
      border-color: var(--eva-colors-gray-400, #999);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .print-button:focus {
      outline: 2px solid var(--eva-colors-focus, #26374a);
      outline-offset: 2px;
    }

    .print-button:active {
      transform: translateY(1px);
      box-shadow: none;
    }

    .print-button.primary {
      background-color: var(--eva-colors-primary, #26374a);
      border-color: var(--eva-colors-primary, #26374a);
      color: var(--eva-colors-white, #fff);
    }

    .print-button.primary:hover {
      background-color: var(--eva-colors-primary-dark, #1a2633);
      border-color: var(--eva-colors-primary-dark, #1a2633);
    }

    .print-icon {
      width: 18px;
      height: 18px;
      fill: currentColor;
    }

    @media print {
      :host {
        display: none;
      }
    }
  `;

  @property({ type: String })
  variant: 'default' | 'primary' = 'default';

  @property({ type: Boolean })
  showIcon: boolean = true;

  @property({ type: String })
  printSelector?: string;

  protected override render() {
    return html`
      <button
        class="print-button ${this.variant}"
        @click="${this.handlePrint}"
        aria-label="${this.getMessage('gc-print-page.ariaLabel')}"
      >
        ${this.showIcon ? html`
          <svg class="print-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/>
          </svg>
        ` : ''}
        <span>${this.getMessage('gc-print-page.text')}</span>
      </button>
    `;
  }

  private handlePrint(): void {
    if (this.printSelector) {
      this.printSection(this.printSelector);
    } else {
      window.print();
    }

    this.emitEvent('gc-print', {
      timestamp: Date.now(),
      selector: this.printSelector
    });

    this.announce(this.getMessage('gc-print-page.announcement'));
  }

  private printSection(selector: string): void {
    const element = document.querySelector(selector);
    if (!element) {
      console.warn(`Print selector "${selector}" not found`);
      window.print();
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      console.warn('Could not open print window');
      window.print();
      return;
    }

    const title = document.title;
    const styles = Array.from(document.styleSheets)
      .map(styleSheet => {
        try {
          return Array.from(styleSheet.cssRules)
            .map(rule => rule.cssText)
            .join('\n');
        } catch {
          return '';
        }
      })
      .join('\n');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="${document.documentElement.lang}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
          ${styles}
          @media print {
            body { margin: 0; padding: 20px; }
          }
        </style>
      </head>
      <body>
        ${element.outerHTML}
      </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  }

  public print(): void {
    this.handlePrint();
  }
}

registerMessages('gc-print-page', {
  'en-CA': {
    text: 'Print',
    ariaLabel: 'Print this page',
    announcement: 'Print dialog opened'
  },
  'fr-CA': {
    text: 'Imprimer',
    ariaLabel: 'Imprimer cette page',
    announcement: 'Boîte de dialogue d\'impression ouverte'
  }
});
