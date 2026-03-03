import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-Randomize - Random Child Element Selection
 * Randomly selects and displays one child element from a group
 */
@customElement('wb-randomize')
export class WBRandomize extends EVAElement {
  static override styles = css`
    :host {
      display: block;
    }

    ::slotted(*) {
      display: none;
    }

    ::slotted(.wb-randomize-selected) {
      display: block;
    }
  `;

  @property({ type: Number })
  seed = 0;

  @property({ type: Boolean })
  shuffle = false;

  private selectedIndex = -1;

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-randomize', {
      'en-CA': {
        selected: 'Random item selected',
        shuffled: 'Items shuffled',
        noItems: 'No items to randomize'
      },
      'fr-CA': {
        selected: 'Élément aléatoire sélectionné',
        shuffled: 'Éléments mélangés',
        noItems: 'Aucun élément à randomiser'
      }
    });
  }

  override firstUpdated(): void {
    this.randomizeContent();
  }

  private randomizeContent(): void {
    const slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement;
    if (!slot) return;

    const items = slot.assignedElements();
    if (items.length === 0) {
      this.announce(this.getMessage('wb-randomize', 'noItems'));
      return;
    }

    // Clear previous selection
    items.forEach(item => item.classList.remove('wb-randomize-selected'));

    if (this.shuffle) {
      // Shuffle all items
      const shuffled = this.shuffleArray([...items]);
      shuffled.forEach((item, index) => {
        (item as HTMLElement).style.order = index.toString();
      });
      this.selectedIndex = -1;
      this.emitEvent('wb-randomize-shuffled', { count: items.length });
      this.announce(this.getMessage('wb-randomize', 'shuffled'));
    } else {
      // Select one random item
      this.selectedIndex = this.seed > 0 
        ? this.seededRandom(items.length)
        : Math.floor(Math.random() * items.length);
      
      const selectedItem = items[this.selectedIndex];
      if (selectedItem) {
        selectedItem.classList.add('wb-randomize-selected');
        this.emitEvent('wb-randomize-selected', { 
          index: this.selectedIndex,
          element: selectedItem
        });
      }
      this.announce(this.getMessage('wb-randomize', 'selected'));
    }
  }

  private seededRandom(max: number): number {
    // Simple seeded random number generator
    const x = Math.sin(this.seed) * 10000;
    return Math.floor((x - Math.floor(x)) * max);
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = this.seed > 0
        ? this.seededRandom(i + 1)
        : Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i];
      if (temp !== undefined && shuffled[j] !== undefined) {
        shuffled[i] = shuffled[j]!;
        shuffled[j] = temp;
      }
    }
    return shuffled;
  }

  public rerandomize(): void {
    this.randomizeContent();
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-randomize': WBRandomize;
  }
}
