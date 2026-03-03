import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

@customElement('gc-tabs')
export class GCTabs extends EVAElement {
  static override styles = css`
    :host {
      display: block;
    }

    .tabs-container {
      border: 1px solid var(--eva-colors-border, #ddd);
      border-radius: 4px;
    }

    .tab-list {
      display: flex;
      gap: 0;
      margin: 0;
      padding: 0;
      list-style: none;
      border-bottom: 2px solid var(--eva-colors-border, #ddd);
      background: var(--eva-colors-background-light, #f5f5f5);
    }

    .tab {
      flex: 1;
      padding: var(--eva-spacing-md, 1rem) var(--eva-spacing-lg, 1.5rem);
      background: transparent;
      border: none;
      border-bottom: 3px solid transparent;
      color: var(--eva-colors-text, #333);
      font-family: var(--eva-fonts-body);
      font-size: var(--eva-font-size-md, 1rem);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      text-align: center;
    }

    .tab:hover {
      background: var(--eva-colors-background, #e8e8e8);
    }

    .tab:focus {
      outline: 3px solid var(--eva-colors-focus, #269abc);
      outline-offset: -3px;
    }

    .tab[aria-selected="true"] {
      background: var(--eva-colors-white, #fff);
      border-bottom-color: var(--eva-colors-primary, #26374a);
      color: var(--eva-colors-primary, #26374a);
    }

    .tab-panel {
      padding: var(--eva-spacing-lg, 1.5rem);
      color: var(--eva-colors-text, #333);
      font-family: var(--eva-fonts-body);
      font-size: var(--eva-font-size-md, 1rem);
      line-height: 1.5;
    }

    .tab-panel[hidden] {
      display: none;
    }

    @media (max-width: 768px) {
      .tab-list {
        flex-direction: column;
      }

      .tab {
        padding: var(--eva-spacing-sm, 0.75rem) var(--eva-spacing-md, 1rem);
        text-align: left;
        border-bottom: 1px solid var(--eva-colors-border, #ddd);
        border-left: 3px solid transparent;
      }

      .tab[aria-selected="true"] {
        border-bottom: 1px solid var(--eva-colors-border, #ddd);
        border-left-color: var(--eva-colors-primary, #26374a);
      }

      .tab-panel {
        padding: var(--eva-spacing-md, 1rem);
      }
    }

    @media print {
      .tab-list {
        display: none;
      }

      .tab-panel[hidden] {
        display: block !important;
      }
    }
  `;

  @property({ type: Array })
  tabs: Array<{ id: string; label: string; content: string }> = [];

  @property({ type: String })
  activeTab = '';

  override connectedCallback() {
    super.connectedCallback();
    
    if (!this.activeTab && this.tabs.length > 0) {
      const firstTab = this.tabs[0];
      if (firstTab) {
        this.activeTab = firstTab.id;
      }
    }
  }

  private handleTabClick(tabId: string) {
    this.activeTab = tabId;

    this.emitEvent('gc-tab-change', {
      tabId,
      timestamp: new Date().toISOString()
    });
  }

  private handleKeyDown(e: KeyboardEvent, currentIndex: number) {
    let newIndex = currentIndex;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      newIndex = (currentIndex + 1) % this.tabs.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      newIndex = currentIndex === 0 ? this.tabs.length - 1 : currentIndex - 1;
    } else if (e.key === 'Home') {
      e.preventDefault();
      newIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      newIndex = this.tabs.length - 1;
    } else {
      return;
    }

    const newTabData = this.tabs[newIndex];
    if (!newTabData) {
      return;
    }

    this.activeTab = newTabData.id;

    this.updateComplete.then(() => {
      const newTabButton = this.shadowRoot?.querySelectorAll('.tab')[newIndex] as HTMLButtonElement;
      if (newTabButton) {
        newTabButton.focus();
      }
    });
  }

  protected override render() {
    return html`
      <div class="tabs-container">
        <ul class="tab-list" role="tablist">
          ${this.tabs.map((tab, index) => {
            const isActive = tab.id === this.activeTab;
            const tabId = `tab-${tab.id}`;
            const panelId = `panel-${tab.id}`;

            return html`
              <li role="presentation">
                <button
                  id="${tabId}"
                  class="tab"
                  role="tab"
                  type="button"
                  aria-selected="${isActive}"
                  aria-controls="${panelId}"
                  tabindex="${isActive ? '0' : '-1'}"
                  @click="${() => this.handleTabClick(tab.id)}"
                  @keydown="${(e: KeyboardEvent) => this.handleKeyDown(e, index)}"
                >
                  ${tab.label}
                </button>
              </li>
            `;
          })}
        </ul>

        ${this.tabs.map(tab => {
          const isActive = tab.id === this.activeTab;
          const tabId = `tab-${tab.id}`;
          const panelId = `panel-${tab.id}`;

          return html`
            <div
              id="${panelId}"
              class="tab-panel"
              role="tabpanel"
              aria-labelledby="${tabId}"
              ?hidden="${!isActive}"
              tabindex="0"
            >
              ${tab.content}
            </div>
          `;
        })}
      </div>
    `;
  }
}

registerMessages('gc-tabs', {
  'en-CA': {},
  'fr-CA': {}
});
