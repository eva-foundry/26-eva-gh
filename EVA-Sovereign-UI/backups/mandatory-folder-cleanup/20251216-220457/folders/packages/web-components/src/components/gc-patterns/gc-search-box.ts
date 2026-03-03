import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

@customElement('gc-search-box')
export class GCSearchBox extends EVAElement {
  static override styles = css`
    :host {
      display: block;
    }

    .search-box {
      display: flex;
      align-items: stretch;
      border: 2px solid var(--eva-colors-border, #ccc);
      border-radius: 4px;
      overflow: hidden;
    }

    .search-input {
      flex: 1;
      padding: var(--eva-spacing-sm, 0.75rem) var(--eva-spacing-md, 1rem);
      border: none;
      font-family: var(--eva-fonts-body);
      font-size: var(--eva-font-size-md, 1rem);
      color: var(--eva-colors-text, #333);
    }

    .search-input:focus {
      outline: none;
    }

    .search-box:focus-within {
      outline: 3px solid var(--eva-colors-focus, #269abc);
      outline-offset: 2px;
    }

    .search-button {
      padding: var(--eva-spacing-sm, 0.75rem) var(--eva-spacing-lg, 1.5rem);
      background: var(--eva-colors-primary, #26374a);
      border: none;
      color: var(--eva-colors-white, #fff);
      font-family: var(--eva-fonts-body);
      font-size: var(--eva-font-size-md, 1rem);
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }

    .search-button:hover {
      background: var(--eva-colors-primary-dark, #1a2533);
    }

    .search-button:disabled {
      background: var(--eva-colors-background-light, #e8e8e8);
      color: var(--eva-colors-text-light, #999);
      cursor: not-allowed;
    }

    .search-icon {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }

    @media (max-width: 768px) {
      .search-input {
        font-size: var(--eva-font-size-sm, 0.875rem);
      }

      .search-button {
        padding: var(--eva-spacing-sm, 0.75rem) var(--eva-spacing-md, 1rem);
      }
    }

    @media print {
      :host {
        display: none !important;
      }
    }
  `;

  @property({ type: String })
  value = '';

  @property({ type: String })
  placeholder = '';

  @property({ type: String })
  buttonText = '';

  @property({ type: Boolean })
  showButtonText = false;

  private handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;

    this.emitEvent('gc-search-input', {
      value: this.value,
      timestamp: new Date().toISOString()
    });
  }

  private handleSubmit(e: Event) {
    e.preventDefault();

    this.emitEvent('gc-search-submit', {
      value: this.value,
      timestamp: new Date().toISOString()
    });
  }

  protected override render() {
    const placeholderText = this.placeholder || this.getMessage('searchPlaceholder');
    const buttonLabel = this.buttonText || this.getMessage('searchButton');
    const searchLabel = this.getMessage('searchLabel');

    return html`
      <form class="search-box" @submit="${this.handleSubmit}" role="search">
        <label for="search-input" class="sr-only">${searchLabel}</label>
        <input
          id="search-input"
          class="search-input"
          type="search"
          .value="${this.value}"
          placeholder="${placeholderText}"
          @input="${this.handleInput}"
          aria-label="${searchLabel}"
        />
        <button
          class="search-button"
          type="submit"
          aria-label="${buttonLabel}"
        >
          ${this.showButtonText
            ? buttonLabel
            : html`
                <svg class="search-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              `}
        </button>
      </form>
    `;
  }
}

registerMessages('gc-search-box', {
  'en-CA': {
    searchPlaceholder: 'Search',
    searchButton: 'Search',
    searchLabel: 'Search'
  },
  'fr-CA': {
    searchPlaceholder: 'Recherche',
    searchButton: 'Recherche',
    searchLabel: 'Recherche'
  }
});
