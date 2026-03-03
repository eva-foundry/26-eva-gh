import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-TagFilter - Tag-Based Filtering
 * Filter content by tags/labels (similar to wb-filter but focused on tagging)
 */
@customElement('wb-tagfilter')
export class WBTagFilter extends EVAElement {
  static override styles = css`
    :host {
      display: block;
    }

    .filter-tags {
      display: flex;
      gap: var(--eva-spacing-xs, 0.25rem);
      flex-wrap: wrap;
      margin-bottom: var(--eva-spacing-md, 1rem);
    }

    .tag-button {
      padding: var(--eva-spacing-xs, 0.25rem) var(--eva-spacing-sm, 0.5rem);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      border-radius: var(--eva-border-radius-sm, 3px);
      background: var(--eva-colors-background-default, #ffffff);
      cursor: pointer;
      user-select: none;
      transition: all 0.2s;
    }

    .tag-button:hover {
      background: var(--eva-colors-background-hover, #f5f5f5);
    }

    .tag-button.active {
      background: var(--eva-colors-background-primary, #335075);
      color: #ffffff;
      border-color: var(--eva-colors-background-primary, #335075);
    }

    .tag-button:focus {
      outline: 2px solid var(--eva-colors-focus, #303fc1);
      outline-offset: 2px;
    }

    .clear-button {
      padding: var(--eva-spacing-xs, 0.25rem) var(--eva-spacing-sm, 0.5rem);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      border-radius: var(--eva-border-radius-sm, 3px);
      background: var(--eva-colors-background-default, #ffffff);
      cursor: pointer;
    }

    .clear-button:hover {
      background: var(--eva-colors-background-hover, #f5f5f5);
    }

    ::slotted([data-tags]) {
      display: block;
    }

    ::slotted([data-filtered="false"]) {
      display: none !important;
    }
  `;

  @property({ type: Array })
  tags: string[] = [];

  @property({ type: String })
  mode: 'AND' | 'OR' = 'OR';

  @state()
  private activeTags: Set<string> = new Set();

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-tagfilter', {
      'en-CA': {
        clearFilters: 'Clear filters',
        filtersApplied: 'Filters applied',
        filtersCleared: 'Filters cleared'
      },
      'fr-CA': {
        clearFilters: 'Effacer les filtres',
        filtersApplied: 'Filtres appliqués',
        filtersCleared: 'Filtres effacés'
      }
    });

    this.applyFilters();
  }

  private toggleTag(tag: string): void {
    if (this.activeTags.has(tag)) {
      this.activeTags.delete(tag);
    } else {
      this.activeTags.add(tag);
    }

    this.activeTags = new Set(this.activeTags);
    this.applyFilters();
    this.emitEvent('wb-tagfilter-change', { 
      activeTags: Array.from(this.activeTags),
      mode: this.mode
    });
    this.announce(this.getMessage('wb-tagfilter', 'filtersApplied'));
  }

  clearFilters(): void {
    this.activeTags.clear();
    this.activeTags = new Set();
    this.applyFilters();
    this.announce(this.getMessage('wb-tagfilter', 'filtersCleared'));
  }

  private applyFilters(): void {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return;

    const elements = slot.assignedElements();

    elements.forEach((element) => {
      const el = element as HTMLElement;
      const itemTags = (el.getAttribute('data-tags') || '').split(',').map(t => t.trim());
      
      let visible = true;

      if (this.activeTags.size > 0) {
        if (this.mode === 'AND') {
          visible = Array.from(this.activeTags).every(tag => itemTags.includes(tag));
        } else {
          visible = Array.from(this.activeTags).some(tag => itemTags.includes(tag));
        }
      }

      el.setAttribute('data-filtered', visible ? 'true' : 'false');
    });

    this.requestUpdate();
  }

  override render() {
    return html`
      <div class="filter-tags" role="group" aria-label="Tag filters">
        ${this.tags.map(tag => html`
          <button
            class="tag-button ${this.activeTags.has(tag) ? 'active' : ''}"
            @click="${() => this.toggleTag(tag)}"
            aria-pressed="${this.activeTags.has(tag)}"
            tabindex="0"
          >
            ${tag}
          </button>
        `)}
        ${this.activeTags.size > 0 ? html`
          <button class="clear-button" @click="${this.clearFilters}">
            ${this.getMessage('wb-tagfilter', 'clearFilters')}
          </button>
        ` : ''}
      </div>

      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-tagfilter': WBTagFilter;
  }
}
