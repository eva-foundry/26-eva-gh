import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-Footnotes - Accessible Footnotes
 * Inline footnotes with return links and proper ARIA semantics
 */
@customElement('wb-footnotes')
export class WBFootnotes extends EVAElement {
  static override styles = css`
    :host {
      display: block;
    }

    .footnote-ref {
      vertical-align: super;
      font-size: 0.8em;
      text-decoration: none;
      color: var(--eva-colors-link, #0000ff);
      padding: 0 0.2em;
    }

    .footnote-ref:hover {
      text-decoration: underline;
    }

    .footnote-ref:focus {
      outline: 2px solid var(--eva-colors-focus, #303fc1);
      outline-offset: 2px;
    }

    .footnotes-section {
      margin-top: var(--eva-spacing-lg, 2rem);
      padding-top: var(--eva-spacing-md, 1rem);
      border-top: 1px solid var(--eva-colors-border-default, #cccccc);
    }

    .footnotes-title {
      font-size: 1.2em;
      font-weight: bold;
      margin-bottom: var(--eva-spacing-md, 1rem);
    }

    .footnote-item {
      margin-bottom: var(--eva-spacing-sm, 0.5rem);
      display: flex;
      gap: var(--eva-spacing-xs, 0.25rem);
    }

    .footnote-number {
      font-weight: bold;
      min-width: 2em;
    }

    .footnote-text {
      flex: 1;
    }

    .footnote-return {
      text-decoration: none;
      color: var(--eva-colors-link, #0000ff);
      margin-left: var(--eva-spacing-xs, 0.25rem);
    }

    .footnote-return:hover {
      text-decoration: underline;
    }

    .footnote-return:focus {
      outline: 2px solid var(--eva-colors-focus, #303fc1);
      outline-offset: 2px;
    }
  `;

  @property({ type: Array })
  footnotes: Array<{ id: string; text: string }> = [];

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-footnotes', {
      'en-CA': {
        footnotes: 'Footnotes',
        footnote: 'Footnote',
        returnToReference: 'Return to reference',
        footnotePrefix: 'Footnote'
      },
      'fr-CA': {
        footnotes: 'Notes de bas de page',
        footnote: 'Note',
        returnToReference: 'Retourner à la référence',
        footnotePrefix: 'Note'
      }
    });
  }

  override firstUpdated(): void {
    this.processFootnotes();
  }

  private processFootnotes(): void {
    const refs = this.querySelectorAll('[data-footnote]');
    const notes: Array<{ id: string; text: string }> = [];

    refs.forEach((ref, index) => {
      const footnoteText = ref.getAttribute('data-footnote') || '';
      const footnoteId = `fn-${this.componentId}-${index + 1}`;
      const refId = `fnref-${this.componentId}-${index + 1}`;

      // Add ID to reference
      ref.setAttribute('id', refId);

      // Create footnote reference link
      const refLink = document.createElement('a');
      refLink.href = `#${footnoteId}`;
      refLink.className = 'footnote-ref';
      refLink.setAttribute('role', 'doc-noteref');
      refLink.setAttribute('aria-label', `${this.getMessage('wb-footnotes', 'footnotePrefix')} ${index + 1}`);
      refLink.textContent = `[${index + 1}]`;

      ref.appendChild(refLink);

      notes.push({ id: footnoteId, text: footnoteText });
    });

    this.footnotes = notes;
    this.emitEvent('wb-footnotes-processed', { count: notes.length });
  }

  override render() {
    if (this.footnotes.length === 0) {
      return html`<slot></slot>`;
    }

    return html`
      <div>
        <slot></slot>
        <aside 
          class="footnotes-section" 
          role="doc-endnotes"
          aria-label="${this.getMessage('wb-footnotes', 'footnotes')}"
        >
          <div class="footnotes-title">${this.getMessage('wb-footnotes', 'footnotes')}</div>
          ${this.footnotes.map((note, index) => html`
            <div class="footnote-item" id="${note.id}" role="doc-endnote">
              <span class="footnote-number">${index + 1}.</span>
              <span class="footnote-text">${note.text}</span>
              <a 
                href="#fnref-${this.componentId}-${index + 1}" 
                class="footnote-return"
                aria-label="${this.getMessage('wb-footnotes', 'returnToReference')} ${index + 1}"
              >↩</a>
            </div>
          `)}
        </aside>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-footnotes': WBFootnotes;
  }
}
