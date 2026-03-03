import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-Zebra - Zebra Striping
 * Automatically apply alternating row colors to tables and lists
 */
@customElement('wb-zebra')
export class WBZebra extends EVAElement {
  static override styles = css`
    :host {
      display: contents;
    }

    ::slotted(table tr:nth-child(even)),
    ::slotted(tbody tr:nth-child(even)) {
      background-color: var(--eva-colors-background-zebra, #f5f5f5);
    }

    ::slotted(table tr:nth-child(odd)),
    ::slotted(tbody tr:nth-child(odd)) {
      background-color: var(--eva-colors-background-default, #ffffff);
    }

    ::slotted(ul li:nth-child(even)),
    ::slotted(ol li:nth-child(even)) {
      background-color: var(--eva-colors-background-zebra, #f5f5f5);
    }

    ::slotted(ul li:nth-child(odd)),
    ::slotted(ol li:nth-child(odd)) {
      background-color: var(--eva-colors-background-default, #ffffff);
    }
  `;

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-zebra', {
      'en-CA': {
        zebraApplied: 'Zebra striping applied',
        evenRow: 'Even row',
        oddRow: 'Odd row'
      },
      'fr-CA': {
        zebraApplied: 'Rayures zebra appliquées',
        evenRow: 'Ligne paire',
        oddRow: 'Ligne impaire'
      }
    });
  }

  override firstUpdated(): void {
    this.applyZebra();
  }

  private applyZebra(): void {
    const tables = this.querySelectorAll('table');
    const lists = this.querySelectorAll('ul, ol');

    let totalRows = 0;

    tables.forEach(table => {
      const rows = table.querySelectorAll('tr');
      rows.forEach((row, index) => {
        row.classList.add(index % 2 === 0 ? 'zebra-odd' : 'zebra-even');
        totalRows++;
      });
    });

    lists.forEach(list => {
      const items = list.querySelectorAll('li');
      items.forEach((item, index) => {
        item.classList.add(index % 2 === 0 ? 'zebra-odd' : 'zebra-even');
        totalRows++;
      });
    });

    this.emitEvent('wb-zebra-applied', { rows: totalRows });
    this.announce(this.getMessage('wb-zebra', 'zebraApplied'));
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-zebra': WBZebra;
  }
}
