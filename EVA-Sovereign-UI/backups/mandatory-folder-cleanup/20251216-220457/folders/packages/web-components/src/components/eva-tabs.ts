import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from './EVAElement.js';

/**
 * EVA Tabs Component
 * GC Design System compliant tabs navigation
 * WCAG 2.2 AAA compliant with keyboard navigation
 * 
 * @element eva-tabs
 * 
 * @fires tab-change - Fires when active tab changes
 * 
 * @example
 * ```html
 * <eva-tabs>
 *   <eva-tab label="Tab 1">Content 1</eva-tab>
 *   <eva-tab label="Tab 2">Content 2</eva-tab>
 * </eva-tabs>
 * ```
 */
@customElement('eva-tabs')
export class EVATabs extends EVAElement {
  protected override componentName = 'eva-tabs';

  @property({ type: Number })
  activeIndex = 0;

  @property({ type: Number })
  activeTab = 0;

  @property({ type: String })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  @state()
  private _tabs: EVATab[] = [];

  static override styles = css`
    :host {
      display: block;
    }

    .tabs-container {
      border-bottom: 2px solid #e5e5e5;
    }

    .tabs-list {
      display: flex;
      gap: 0;
      list-style: none;
      margin: 0;
      padding: 0;
      overflow-x: auto;
      overflow-y: hidden;
    }

    .tab-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 1rem 1.5rem;
      font-size: 1rem;
      font-family: Noto Sans, sans-serif;
      color: #666666;
      border-bottom: 3px solid transparent;
      transition: all 200ms ease-in-out;
      white-space: nowrap;
      min-height: 44px;
    }

    .tab-button:hover {
      color: #333333;
      background-color: #f5f5f5;
    }

    .tab-button[aria-selected='true'] {
      color: #284162;
      border-bottom-color: #284162;
      font-weight: 700;
    }

    .tab-button:focus-visible {
      outline: 3px solid #26374A;
      outline-offset: -3px;
    }

    .tab-panels {
      padding: 1.5rem 0;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .tab-button {
        transition: none;
      }
    }
  `;

  override render() {
    // Sync activeIndex with activeTab  
    if (this.activeTab !== this.activeIndex) {
      this.activeIndex = this.activeTab;
    }

    return html`
      <div class="tabs-container">
        <div
          role="tablist"
          aria-label="${this.ariaLabel || 'Tabs'}"
          aria-orientation="${this.orientation}"
          class="tabs-list"
        >
          ${this._tabs.map(
            (tab, index) => html`
              <button
                role="tab"
                class="tab-button"
                id="tab-${index}"
                aria-selected="${index === this.activeIndex}"
                aria-controls="panel-${index}"
                tabindex="${index === this.activeIndex ? 0 : -1}"
                @click="${() => this._handleTabClick(index)}"
                @keydown="${(e: KeyboardEvent) => this._handleKeydown(e, index)}"
              >
                ${tab.label}
              </button>
            `
          )}
        </div>
      </div>
      <div class="tab-panels">
        <slot></slot>
      </div>
    `;
  }

  override firstUpdated(): void {
    this._updateTabs();
  }

  private _updateTabs(): void {
    const slot = this.shadowRoot?.querySelector('slot');
    if (slot) {
      const nodes = slot.assignedElements();
      this._tabs = nodes.filter((node) => node.tagName === 'EVA-TAB') as EVATab[];
      
      this._tabs.forEach((tab, index) => {
        tab.active = index === this.activeIndex;
        tab.setAttribute('role', 'tabpanel');
        tab.setAttribute('id', `panel-${index}`);
        tab.setAttribute('aria-labelledby', `tab-${index}`);
      });
      
      this.requestUpdate();
    }
  }

  private _handleTabClick(index: number): void {
    this.activeIndex = index;
    this.activeTab = index;
    this._updateTabs();
    
    this.dispatchEvent(
      new CustomEvent('eva-tab-change', {
        detail: { activeIndex: this.activeIndex },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleKeydown(event: KeyboardEvent, currentIndex: number): void {
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : this._tabs.length - 1;
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        newIndex = currentIndex < this._tabs.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = this._tabs.length - 1;
        break;
      default:
        return;
    }

    this.activeIndex = newIndex;
    this.activeTab = newIndex;
    this._updateTabs();
    
    // Focus the new tab
    const tabButton = this.shadowRoot?.querySelector(`#tab-${newIndex}`) as HTMLButtonElement;
    if (tabButton) {
      tabButton.focus();
    }

    this.dispatchEvent(
      new CustomEvent('eva-tab-change', {
        detail: { activeIndex: this.activeIndex, activeTab: this.activeTab },
        bubbles: true,
        composed: true,
      })
    );
  }

  protected override updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);
    
    // Sync activeTab and activeIndex
    if (changedProperties.has('activeTab') && this.activeTab !== this.activeIndex) {
      this.activeIndex = this.activeTab;
      this._updateTabs();
      this.dispatchEvent(
        new CustomEvent('eva-tab-change', {
          detail: { activeIndex: this.activeIndex, activeTab: this.activeTab },
          bubbles: true,
          composed: true,
        })
      );
    }
    
    if (changedProperties.has('orientation')) {
      this.setAttribute('orientation', this.orientation);
    }
  }
}

/**
 * EVA Tab Component
 * Individual tab panel for use with eva-tabs
 * 
 * @element eva-tab
 */
@customElement('eva-tab')
export class EVATab extends EVAElement {
  protected override componentName = 'eva-tab';

  @property({ type: String })
  label = '';

  @property({ type: Boolean, reflect: true })
  active = false;

  static override styles = css`
    :host {
      display: none;
    }

    :host([active]) {
      display: block;
    }
  `;

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eva-tabs': EVATabs;
    'eva-tab': EVATab;
  }
}
