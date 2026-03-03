import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-TextHighlight - Keyword Highlighting
 * Highlight search terms or keywords in text content
 */
@customElement('wb-texthighlight')
export class WBTextHighlight extends EVAElement {
  static override styles = css`
    :host {
      display: contents;
    }

    mark {
      background: var(--eva-colors-highlight, #ffff00);
      color: var(--eva-colors-text-default, #000000);
      padding: 0 0.2em;
      border-radius: 2px;
    }

    mark.current {
      background: var(--eva-colors-highlight-active, #ff9632);
      font-weight: bold;
    }

    .controls {
      display: flex;
      gap: var(--eva-spacing-xs, 0.25rem);
      margin-bottom: var(--eva-spacing-sm, 0.5rem);
      flex-wrap: wrap;
    }

    .control-button {
      padding: var(--eva-spacing-xs, 0.25rem) var(--eva-spacing-sm, 0.5rem);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      border-radius: var(--eva-border-radius-sm, 3px);
      background: white;
      cursor: pointer;
      font-size: 0.9em;
    }

    .control-button:hover {
      background: var(--eva-colors-background-hover, #e5e5e5);
    }

    .control-button:focus {
      outline: 2px solid var(--eva-colors-focus, #303fc1);
    }

    .control-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .count {
      padding: var(--eva-spacing-xs, 0.25rem) var(--eva-spacing-sm, 0.5rem);
      background: var(--eva-colors-background-default, #f5f5f5);
      border-radius: var(--eva-border-radius-sm, 3px);
      font-size: 0.9em;
    }
  `;

  @property({ type: String })
  query = '';

  @property({ type: Boolean, attribute: 'case-sensitive' })
  caseSensitive = false;

  @property({ type: Boolean, attribute: 'whole-word' })
  wholeWord = false;

  @property({ type: Boolean, attribute: 'show-controls' })
  showControls = false;

  @property({ type: Number })
  private currentIndex = -1;

  @property({ type: Number })
  private matchCount = 0;

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-texthighlight', {
      'en-CA': {
        previous: 'Previous',
        next: 'Next',
        clear: 'Clear highlights',
        matchesFound: 'matches found',
        currentMatch: 'Current match',
        highlightsCleared: 'Highlights cleared'
      },
      'fr-CA': {
        previous: 'Précédent',
        next: 'Suivant',
        clear: 'Effacer les surlignages',
        matchesFound: 'correspondances trouvées',
        currentMatch: 'Correspondance actuelle',
        highlightsCleared: 'Surlignages effacés'
      }
    });
  }

  override firstUpdated(): void {
    this.highlight();
  }

  protected override updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);
    if (
      changedProperties.has('query') ||
      changedProperties.has('caseSensitive') ||
      changedProperties.has('wholeWord')
    ) {
      this.highlight();
    }
  }

  private highlight(): void {
    this.clearHighlights();
    if (!this.query) return;

    const walker = document.createTreeWalker(
      this,
      NodeFilter.SHOW_TEXT,
      null
    );

    const textNodes: Text[] = [];
    let node: Node | null;
    while ((node = walker.nextNode())) {
      textNodes.push(node as Text);
    }

    let matchIndex = 0;
    textNodes.forEach(textNode => {
      const parent = textNode.parentElement;
      if (!parent || parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE') {
        return;
      }

      const text = textNode.textContent || '';
      const flags = this.caseSensitive ? 'g' : 'gi';
      const pattern = this.wholeWord
        ? new RegExp(`\\b${this.escapeRegex(this.query)}\\b`, flags)
        : new RegExp(this.escapeRegex(this.query), flags);

      const matches = text.match(pattern);
      if (!matches) return;

      const fragment = document.createDocumentFragment();
      let lastIndex = 0;

      text.replace(pattern, (match, offset) => {
        // Add text before match
        if (offset > lastIndex) {
          fragment.appendChild(document.createTextNode(text.substring(lastIndex, offset)));
        }

        // Add highlighted match
        const mark = document.createElement('mark');
        mark.textContent = match;
        mark.setAttribute('data-match-index', String(matchIndex));
        fragment.appendChild(mark);

        matchIndex++;
        lastIndex = offset + match.length;
        return match;
      });

      // Add remaining text
      if (lastIndex < text.length) {
        fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
      }

      parent.replaceChild(fragment, textNode);
    });

    this.matchCount = matchIndex;
    this.currentIndex = matchIndex > 0 ? 0 : -1;
    this.updateCurrentMatch();

    this.emitEvent('wb-texthighlight-highlighted', {
      query: this.query,
      matchCount: this.matchCount
    });
  }

  private clearHighlights(): void {
    const marks = this.querySelectorAll('mark');
    marks.forEach(mark => {
      const text = document.createTextNode(mark.textContent || '');
      mark.parentNode?.replaceChild(text, mark);
    });
    this.matchCount = 0;
    this.currentIndex = -1;
  }

  private escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private updateCurrentMatch(): void {
    const marks = this.querySelectorAll('mark');
    marks.forEach((mark, index) => {
      mark.classList.toggle('current', index === this.currentIndex);
    });

    if (this.currentIndex >= 0 && this.currentIndex < marks.length) {
      marks[this.currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
      this.announce(
        `${this.getMessage('wb-texthighlight', 'currentMatch')} ${this.currentIndex + 1} ${this.getMessage('wb-texthighlight', 'matchesFound')}`
      );
    }
  }

  private nextMatch(): void {
    if (this.matchCount === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.matchCount;
    this.updateCurrentMatch();
    this.emitEvent('wb-texthighlight-navigate', { index: this.currentIndex });
  }

  private previousMatch(): void {
    if (this.matchCount === 0) return;
    this.currentIndex = (this.currentIndex - 1 + this.matchCount) % this.matchCount;
    this.updateCurrentMatch();
    this.emitEvent('wb-texthighlight-navigate', { index: this.currentIndex });
  }

  public clearAll(): void {
    this.clearHighlights();
    this.query = '';
    this.emitEvent('wb-texthighlight-cleared');
    this.announce(this.getMessage('wb-texthighlight', 'highlightsCleared'));
  }

  override render() {
    return html`
      ${this.showControls && this.matchCount > 0 ? html`
        <div class="controls">
          <span class="count">
            ${this.currentIndex + 1} / ${this.matchCount} ${this.getMessage('wb-texthighlight', 'matchesFound')}
          </span>
          <button 
            class="control-button" 
            @click="${this.previousMatch}"
            ?disabled="${this.matchCount === 0}"
            aria-label="${this.getMessage('wb-texthighlight', 'previous')}"
          >
            ${this.getMessage('wb-texthighlight', 'previous')}
          </button>
          <button 
            class="control-button" 
            @click="${this.nextMatch}"
            ?disabled="${this.matchCount === 0}"
            aria-label="${this.getMessage('wb-texthighlight', 'next')}"
          >
            ${this.getMessage('wb-texthighlight', 'next')}
          </button>
          <button 
            class="control-button" 
            @click="${this.clearAll}"
            aria-label="${this.getMessage('wb-texthighlight', 'clear')}"
          >
            ${this.getMessage('wb-texthighlight', 'clear')}
          </button>
        </div>
      ` : ''}
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-texthighlight': WBTextHighlight;
  }
}
