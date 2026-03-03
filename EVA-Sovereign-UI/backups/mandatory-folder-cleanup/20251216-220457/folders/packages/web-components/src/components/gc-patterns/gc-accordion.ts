import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

@customElement('gc-accordion')
export class GCAccordion extends EVAElement {
  static override styles = css`
    :host {
      display: block;
    }

    .accordion {
      border: 1px solid var(--eva-colors-border, #ddd);
      border-radius: 4px;
    }

    .accordion-item {
      border-bottom: 1px solid var(--eva-colors-border, #ddd);
    }

    .accordion-item:last-child {
      border-bottom: none;
    }

    .accordion-header {
      width: 100%;
      padding: var(--eva-spacing-md, 1rem) var(--eva-spacing-lg, 1.5rem);
      background: var(--eva-colors-background-light, #f5f5f5);
      border: none;
      text-align: left;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--eva-spacing-md, 1rem);
      font-family: var(--eva-fonts-heading);
      font-size: var(--eva-font-size-md, 1rem);
      font-weight: 700;
      color: var(--eva-colors-text, #333);
      transition: background-color 0.2s;
    }

    .accordion-header:hover {
      background: var(--eva-colors-background, #e8e8e8);
    }

    .accordion-header:focus {
      outline: 3px solid var(--eva-colors-focus, #269abc);
      outline-offset: -3px;
    }

    .accordion-header[aria-expanded="true"] {
      background: var(--eva-colors-primary, #26374a);
      color: var(--eva-colors-white, #fff);
    }

    .accordion-icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      transition: transform 0.2s;
    }

    .accordion-header[aria-expanded="true"] .accordion-icon {
      transform: rotate(180deg);
    }

    .accordion-panel {
      overflow: hidden;
      transition: max-height 0.3s ease-out;
      max-height: 0;
    }

    .accordion-panel[aria-hidden="false"] {
      max-height: 2000px;
    }

    .accordion-content {
      padding: var(--eva-spacing-lg, 1.5rem);
      color: var(--eva-colors-text, #333);
      font-family: var(--eva-fonts-body);
      font-size: var(--eva-font-size-md, 1rem);
      line-height: 1.5;
    }

    @media (max-width: 768px) {
      .accordion-header {
        padding: var(--eva-spacing-sm, 0.75rem) var(--eva-spacing-md, 1rem);
        font-size: var(--eva-font-size-sm, 0.875rem);
      }

      .accordion-content {
        padding: var(--eva-spacing-md, 1rem);
      }
    }

    @media print {
      .accordion-header {
        background: none;
        color: var(--eva-colors-text, #333);
      }

      .accordion-panel {
        max-height: none !important;
      }

      .accordion-icon {
        display: none;
      }
    }
  `;

  @property({ type: Array })
  items: Array<{ id: string; heading: string; content: string; expanded?: boolean }> = [];

  @property({ type: Boolean })
  allowMultiple = false;

  private expandedItems = new Set<string>();

  private handleToggle(itemId: string) {
    if (this.expandedItems.has(itemId)) {
      this.expandedItems.delete(itemId);
    } else {
      if (!this.allowMultiple) {
        this.expandedItems.clear();
      }
      this.expandedItems.add(itemId);
    }

    this.requestUpdate();

    this.emitEvent('gc-accordion-toggle', {
      itemId,
      expanded: this.expandedItems.has(itemId),
      expandedItems: Array.from(this.expandedItems),
      timestamp: new Date().toISOString()
    });
  }

  override connectedCallback() {
    super.connectedCallback();
    
    this.items.forEach(item => {
      if (item.expanded) {
        this.expandedItems.add(item.id);
      }
    });
  }

  private renderIcon() {
    return html`
      <svg
        class="accordion-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M7 10l5 5 5-5z"/>
      </svg>
    `;
  }

  protected override render() {
    return html`
      <div class="accordion" role="region">
        ${this.items.map(item => {
          const isExpanded = this.expandedItems.has(item.id);
          const panelId = `panel-${item.id}`;
          const headerId = `header-${item.id}`;

          return html`
            <div class="accordion-item">
              <h3 style="margin: 0;">
                <button
                  id="${headerId}"
                  class="accordion-header"
                  type="button"
                  aria-expanded="${isExpanded}"
                  aria-controls="${panelId}"
                  @click="${() => this.handleToggle(item.id)}"
                >
                  <span>${item.heading}</span>
                  ${this.renderIcon()}
                </button>
              </h3>
              <div
                id="${panelId}"
                class="accordion-panel"
                role="region"
                aria-labelledby="${headerId}"
                aria-hidden="${!isExpanded}"
              >
                <div class="accordion-content">
                  ${item.content}
                </div>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }
}

registerMessages('gc-accordion', {
  'en-CA': {},
  'fr-CA': {}
});
