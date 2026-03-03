import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

export interface Tab {
  id: string;
  label: string;
  content: string;
  disabled?: boolean;
}

@customElement('gc-tabbed-interface')
export class GCTabbedInterface extends EVAElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--eva-fonts-family-base, 'Lato', sans-serif);
    }

    .tablist {
      display: flex;
      border-bottom: 2px solid var(--eva-colors-border-primary, #e1e4e7);
      margin: 0;
      padding: 0;
      list-style: none;
      gap: 0;
    }

    .tab {
      background: var(--eva-colors-surface-secondary, #f5f5f5);
      border: 1px solid var(--eva-colors-border-primary, #e1e4e7);
      border-bottom: none;
      color: var(--eva-colors-text-primary, #333);
      cursor: pointer;
      font-size: var(--eva-fonts-size-base, 1rem);
      font-weight: var(--eva-fonts-weight-bold, 700);
      padding: var(--eva-spacing-md, 12px) var(--eva-spacing-lg, 16px);
      position: relative;
      transition: all 0.2s ease;
      margin-right: -1px;
    }

    .tab:hover:not([aria-selected="true"]):not([aria-disabled="true"]) {
      background: var(--eva-colors-surface-hover, #e8e8e8);
    }

    .tab:focus-visible {
      outline: 3px solid var(--eva-colors-focus, #0535d2);
      outline-offset: -3px;
      z-index: 1;
    }

    .tab[aria-selected="true"] {
      background: var(--eva-colors-surface-primary, #fff);
      border-bottom: 3px solid var(--eva-colors-primary, #26374a);
      margin-bottom: -3px;
      z-index: 2;
    }

    .tab[aria-disabled="true"] {
      color: var(--eva-colors-text-disabled, #999);
      cursor: not-allowed;
      opacity: 0.6;
    }

    .tabpanel {
      padding: var(--eva-spacing-lg, 16px);
      border: 1px solid var(--eva-colors-border-primary, #e1e4e7);
      border-top: none;
      background: var(--eva-colors-surface-primary, #fff);
    }

    .tabpanel[hidden] {
      display: none;
    }

    @media (max-width: 768px) {
      .tablist {
        flex-direction: column;
        border-bottom: none;
      }

      .tab {
        border-bottom: 1px solid var(--eva-colors-border-primary, #e1e4e7);
        margin-right: 0;
      }

      .tab[aria-selected="true"] {
        border-bottom: 1px solid var(--eva-colors-border-primary, #e1e4e7);
        border-left: 3px solid var(--eva-colors-primary, #26374a);
        margin-bottom: 0;
        margin-left: -3px;
      }

      .tabpanel {
        border-top: 1px solid var(--eva-colors-border-primary, #e1e4e7);
      }
    }
  `;

  @property({ type: Array })
  tabs: Tab[] = [];

  @state()
  private selectedTabId: string = '';

  protected override firstUpdated(): void {
    if (this.tabs.length > 0 && !this.selectedTabId) {
      const firstEnabledTab = this.tabs.find(tab => !tab.disabled);
      if (firstEnabledTab) {
        this.selectedTabId = firstEnabledTab.id;
      }
    }
  }

  /**
   * Select a tab by ID
   */
  public selectTab(id: string): void {
    const tab = this.tabs.find(t => t.id === id);
    if (!tab || tab.disabled) return;

    this.selectedTabId = id;
    this.requestUpdate();
    this.emitEvent('gc-tab-change', { id, label: tab.label });
    this.announce(this.getMessage('tabSelected').replace('{label}', tab.label));
  }

  private handleTabClick(id: string): void {
    this.selectTab(id);
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const enabledTabs = this.tabs.filter(tab => !tab.disabled);
    const currentEnabledIndex = enabledTabs.findIndex(tab => tab.id === this.selectedTabId);
    
    let newIndex = currentEnabledIndex;
    
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        newIndex = (currentEnabledIndex + 1) % enabledTabs.length;
        break;
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = (currentEnabledIndex - 1 + enabledTabs.length) % enabledTabs.length;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = enabledTabs.length - 1;
        break;
      default:
        return;
    }

    const newTab = enabledTabs[newIndex];
    if (newTab) {
      this.selectTab(newTab.id);
      
      // Focus the newly selected tab
      this.updateComplete.then(() => {
        const tabButton = this.shadowRoot?.querySelector(`[role="tab"][data-tab-id="${newTab.id}"]`) as HTMLElement;
        tabButton?.focus();
      });
    }
  }

  protected override render() {
    const tabbedInterface = this.getMessage('tabbedInterface');

    return html`
      <div class="tabs-container">
        <div role="tablist" aria-label="${tabbedInterface}" class="tablist">
          ${this.tabs.map(tab => html`
            <button
              role="tab"
              aria-selected="${tab.id === this.selectedTabId}"
              aria-controls="panel-${tab.id}"
              aria-disabled="${tab.disabled || false}"
              data-tab-id="${tab.id}"
              id="tab-${tab.id}"
              tabindex="${tab.id === this.selectedTabId ? 0 : -1}"
              class="tab"
              @click="${() => this.handleTabClick(tab.id)}"
              @keydown="${(e: KeyboardEvent) => this.handleKeyDown(e)}"
            >
              ${tab.label}
            </button>
          `)}
        </div>

        ${this.tabs.map(tab => html`
          <div
            role="tabpanel"
            id="panel-${tab.id}"
            aria-labelledby="tab-${tab.id}"
            class="tabpanel"
            ?hidden="${tab.id !== this.selectedTabId}"
            tabindex="0"
          >
            ${tab.content}
          </div>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gc-tabbed-interface': GCTabbedInterface;
  }
}

registerMessages('gc-tabbed-interface', {
  'en-CA': {
    tabbedInterface: 'Tabbed interface',
    tabSelected: 'Tab {label} selected'
  },
  'fr-CA': {
    tabbedInterface: 'Interface à onglets',
    tabSelected: 'Onglet {label} sélectionné'
  }
});
