/**
 * EVA Table Component
 * Data table with Spark styling
 * Features: Header, body, rows, cells, responsive
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
} from '../../tokens';

export class EVATable extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
        width: 100%;
        overflow: auto;
      }

      .table-wrapper {
        width: 100%;
        overflow: auto;
      }

      table {
        width: 100%;
        caption-side: bottom;
        font-size: 0.875rem;
        border-collapse: collapse;
      }
    `));

    const wrapper = document.createElement('div');
    wrapper.className = 'table-wrapper';

    const table = document.createElement('table');
    const slot = document.createElement('slot');
    table.appendChild(slot);
    wrapper.appendChild(table);

    this.shadow.appendChild(wrapper);
  }
}

export class EVATableHeader extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: table-header-group;
      }

      thead {
        display: contents;
      }
    `));

    const thead = document.createElement('thead');
    const slot = document.createElement('slot');
    thead.appendChild(slot);

    this.shadow.appendChild(thead);
  }
}

export class EVATableBody extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: table-row-group;
      }

      tbody {
        display: contents;
      }
    `));

    const tbody = document.createElement('tbody');
    const slot = document.createElement('slot');
    tbody.appendChild(slot);

    this.shadow.appendChild(tbody);
  }
}

export class EVATableRow extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: table-row;
        border-bottom: 1px solid ${modernColors.border};
        transition: background-color 200ms;
      }

      :host(:hover) {
        background: ${modernColors.muted};
      }

      tr {
        display: contents;
      }
    `));

    const tr = document.createElement('tr');
    const slot = document.createElement('slot');
    tr.appendChild(slot);

    this.shadow.appendChild(tr);
  }
}

export class EVATableHead extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: table-cell;
        height: 3rem;
        padding: 0 ${gcSpacing[4]};
        text-align: left;
        font-weight: 500;
        color: ${modernColors.mutedForeground};
        vertical-align: middle;
      }

      th {
        display: contents;
      }
    `));

    const th = document.createElement('th');
    const slot = document.createElement('slot');
    th.appendChild(slot);

    this.shadow.appendChild(th);
  }
}

export class EVATableCell extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: table-cell;
        padding: ${gcSpacing[4]};
        vertical-align: middle;
      }

      td {
        display: contents;
      }
    `));

    const td = document.createElement('td');
    const slot = document.createElement('slot');
    td.appendChild(slot);

    this.shadow.appendChild(td);
  }
}

customElements.define('eva-table', EVATable);
customElements.define('eva-table-header', EVATableHeader);
customElements.define('eva-table-body', EVATableBody);
customElements.define('eva-table-row', EVATableRow);
customElements.define('eva-table-head', EVATableHead);
customElements.define('eva-table-cell', EVATableCell);
