import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

export interface Tag {
  id: string;
  label: string;
  count?: number;
}

@customElement('gc-tag-filter')
export class GCTagFilter extends EVAElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--eva-fonts-family-base, 'Lato', sans-serif);
    }

    .tag-filter {
      padding: var(--eva-spacing-md, 12px) 0;
    }

    .tag-filter-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--eva-spacing-md, 12px);
    }

    .tag-filter-title {
      font-size: var(--eva-fonts-size-base, 1rem);
      font-weight: var(--eva-fonts-weight-bold, 700);
      margin: 0;
    }

    .clear-tags-btn {
      background: none;
      border: none;
      color: var(--eva-colors-primary, #26374a);
      cursor: pointer;
      font-size: var(--eva-fonts-size-sm, 0.875rem);
      text-decoration: underline;
      padding: var(--eva-spacing-xs, 4px);
    }

    .clear-tags-btn:hover {
      color: var(--eva-colors-primary-dark, #1a2633);
    }

    .clear-tags-btn:focus-visible {
      outline: 3px solid var(--eva-colors-focus, #0535d2);
      outline-offset: 2px;
    }

    .tag-cloud {
      display: flex;
      flex-wrap: wrap;
      gap: var(--eva-spacing-sm, 8px);
    }

    .tag {
      display: inline-flex;
      align-items: center;
      gap: var(--eva-spacing-xs, 4px);
      padding: var(--eva-spacing-xs, 4px) var(--eva-spacing-sm, 8px);
      border: 1px solid var(--eva-colors-border-primary, #e1e4e7);
      border-radius: 16px;
      background: var(--eva-colors-surface-primary, #fff);
      cursor: pointer;
      font-size: var(--eva-fonts-size-sm, 0.875rem);
      transition: all 0.2s ease;
    }

    .tag:hover {
      background: var(--eva-colors-surface-hover, #e8e8e8);
      border-color: var(--eva-colors-primary, #26374a);
    }

    .tag:focus-visible {
      outline: 3px solid var(--eva-colors-focus, #0535d2);
      outline-offset: 2px;
    }

    .tag.active {
      background: var(--eva-colors-primary, #26374a);
      border-color: var(--eva-colors-primary, #26374a);
      color: var(--eva-colors-text-on-primary, #fff);
    }

    .tag.active:hover {
      background: var(--eva-colors-primary-dark, #1a2633);
      border-color: var(--eva-colors-primary-dark, #1a2633);
    }

    .tag-label {
      display: inline;
    }

    .tag-count {
      display: inline;
      font-weight: var(--eva-fonts-weight-bold, 700);
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      .tag {
        font-size: var(--eva-fonts-size-xs, 0.75rem);
      }
    }
  `;

  @property({ type: Array })
  tags: Tag[] = [];

  @state()
  private activeTags: string[] = [];

  /**
   * Toggle a tag on/off
   */
  public toggleTag(tagId: string): void {
    const isActive = this.activeTags.includes(tagId);
    
    if (isActive) {
      this.activeTags = this.activeTags.filter(id => id !== tagId);
    } else {
      this.activeTags = [...this.activeTags, tagId];
    }

    this.requestUpdate();
    this.emitEvent('gc-tag-change', { activeTags: this.activeTags });
    
    const tag = this.tags.find(t => t.id === tagId);
    if (tag) {
      const message = isActive
        ? this.getMessage('tagRemoved').replace('{tag}', tag.label)
        : this.getMessage('tagAdded').replace('{tag}', tag.label);
      this.announce(message);
    }
  }

  /**
   * Clear all tags
   */
  public clearTags(): void {
    this.activeTags = [];
    this.requestUpdate();
    this.emitEvent('gc-tag-change', { activeTags: [] });
    this.announce(this.getMessage('tagsCleared'));
  }

  /**
   * Handle keyboard interaction
   */
  private handleKeyDown(event: KeyboardEvent, tagId: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleTag(tagId);
    }
  }

  protected override render() {
    const hasActiveTags = this.activeTags.length > 0;

    return html`
      <div class="tag-filter">
        ${this.tags.length > 0 ? html`
          <div class="tag-filter-header">
            <h2 class="tag-filter-title">${this.getMessage('filterByTag')}</h2>
            ${hasActiveTags ? html`
              <button class="clear-tags-btn" @click="${this.clearTags}">
                ${this.getMessage('clearAll')}
              </button>
            ` : ''}
          </div>

          <div class="tag-cloud" role="group" aria-label="${this.getMessage('tagFilter')}">
            ${this.tags.map(tag => {
              const isActive = this.activeTags.includes(tag.id);
              return html`
                <button
                  class="tag ${isActive ? 'active' : ''}"
                  role="button"
                  aria-pressed="${isActive}"
                  @click="${() => this.toggleTag(tag.id)}"
                  @keydown="${(e: KeyboardEvent) => this.handleKeyDown(e, tag.id)}"
                >
                  <span class="tag-label">${tag.label}</span>
                  ${tag.count !== undefined ? html`
                    <span class="tag-count">(${tag.count})</span>
                  ` : ''}
                </button>
              `;
            })}
          </div>

          <div role="status" aria-live="polite" aria-atomic="true" class="sr-only">
            ${hasActiveTags 
              ? this.getMessage('activeTagsCount').replace('{count}', this.activeTags.length.toString())
              : ''
            }
          </div>
        ` : ''}
      </div>
    `;
  }
}

registerMessages('gc-tag-filter', {
  'en-CA': {
    filterByTag: 'Filter by tag',
    clearAll: 'Clear all',
    tagFilter: 'Tag filter',
    tagAdded: '{tag} tag added',
    tagRemoved: '{tag} tag removed',
    tagsCleared: 'All tags cleared',
    activeTagsCount: '{count} active tags'
  },
  'fr-CA': {
    filterByTag: 'Filtrer par étiquette',
    clearAll: 'Tout effacer',
    tagFilter: 'Filtre par étiquette',
    tagAdded: 'Étiquette {tag} ajoutée',
    tagRemoved: 'Étiquette {tag} retirée',
    tagsCleared: 'Toutes les étiquettes effacées',
    activeTagsCount: '{count} étiquettes actives'
  }
});
