import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-EqualHeight - Equal Height Columns
 * Ensures columns have equal heights using CSS Grid + JS fallback
 */
@customElement('wb-equalheight')
export class WBEqualHeight extends EVAElement {
  static override styles = css`
    :host {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
      gap: var(--eva-spacing-md, 1rem);
    }

    :host([vertical]) {
      grid-auto-flow: row;
      grid-auto-rows: 1fr;
    }

    ::slotted(*) {
      min-height: 100%;
    }
  `;

  @property({ type: Number })
  columns = 0;

  @property({ type: Boolean })
  vertical = false;

  @property({ type: Boolean, attribute: 'use-js-fallback' })
  useJsFallback = false;

  @state()
  private maxHeight = 0;

  private resizeObserver?: ResizeObserver;

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-equalheight', {
      'en-CA': {
        heightEqualized: 'Column heights equalized'
      },
      'fr-CA': {
        heightEqualized: 'Hauteurs de colonnes égalisées'
      }
    });

    if (this.useJsFallback) {
      this.setupResizeObserver();
      this.equalizeHeights();
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
  }

  override updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('columns') && this.columns > 0) {
      this.style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;
    }

    if (this.useJsFallback && changedProperties.has('useJsFallback')) {
      this.equalizeHeights();
    }
  }

  private setupResizeObserver(): void {
    this.resizeObserver = new ResizeObserver(() => {
      this.equalizeHeights();
    });

    const slot = this.shadowRoot?.querySelector('slot');
    if (slot) {
      slot.assignedElements().forEach(el => {
        this.resizeObserver?.observe(el);
      });
    }
  }

  equalizeHeights(): void {
    if (!this.useJsFallback) return;

    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return;

    const elements = slot.assignedElements() as HTMLElement[];
    if (elements.length === 0) return;

    // Reset heights first
    elements.forEach(el => {
      el.style.minHeight = '';
    });

    // Calculate max height
    this.maxHeight = Math.max(...elements.map(el => el.offsetHeight));

    // Apply max height to all elements
    elements.forEach(el => {
      el.style.minHeight = `${this.maxHeight}px`;
    });

    this.emitEvent('wb-equalheight-applied', { maxHeight: this.maxHeight });
    this.announce(this.getMessage('wb-equalheight', 'heightEqualized'));
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-equalheight': WBEqualHeight;
  }
}
