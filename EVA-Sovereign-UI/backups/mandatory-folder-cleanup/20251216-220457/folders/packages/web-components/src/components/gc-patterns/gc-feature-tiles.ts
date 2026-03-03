import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';

interface FeatureTile {
  image: string;
  alt: string;
  heading: string;
  description: string;
  href: string;
  ctaLabel: string;
}

@customElement('gc-feature-tiles')
export class GCFeatureTiles extends EVAElement {
  static override styles = css`
      :host {
        display: block;
        margin: var(--eva-spacing-xl, 2rem) 0;
      }

      .tiles-grid {
        display: grid;
        grid-template-columns: repeat(var(--gc-tiles-columns, 3), 1fr);
        gap: var(--eva-spacing-xl, 2rem);
      }

      .tile {
        display: flex;
        flex-direction: column;
        background: white;
        border: 1px solid var(--eva-colors-border, #ddd);
        border-radius: var(--eva-border-radius-md, 8px);
        overflow: hidden;
        transition: all 0.3s ease;
        height: 100%;
      }

      .tile:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      }

      .tile-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }

      .tile-content {
        padding: var(--eva-spacing-lg, 1.5rem);
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .tile-heading {
        font-size: var(--eva-font-size-lg, 1.25rem);
        font-weight: var(--eva-font-weight-bold, 700);
        margin: 0 0 var(--eva-spacing-md, 1rem);
        color: var(--eva-colors-text-primary, #333);
      }

      .tile-description {
        margin: 0 0 var(--eva-spacing-lg, 1.5rem);
        color: var(--eva-colors-text-secondary, #666);
        flex: 1;
        line-height: 1.6;
      }

      .tile-link {
        color: var(--eva-colors-link, #2572b4);
        text-decoration: none;
        font-weight: var(--eva-font-weight-medium, 500);
        display: inline-flex;
        align-items: center;
        gap: var(--eva-spacing-xs, 0.25rem);
      }

      .tile-link:hover {
        text-decoration: underline;
      }

      .tile-link:focus-visible {
        outline: 3px solid var(--eva-colors-focus, #4CAF50);
        outline-offset: 2px;
        border-radius: var(--eva-border-radius-sm, 4px);
      }

      @media (max-width: 992px) {
        .tiles-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 576px) {
        .tiles-grid {
          grid-template-columns: 1fr;
        }
      }
    `;

  @property({ type: Array })
  features: FeatureTile[] = [];

  @property({ type: Number })
  columns: 2 | 3 | 4 = 3;

  protected override firstUpdated(): void {
    this.style.setProperty('--gc-tiles-columns', this.columns.toString());
  }

  protected override updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('columns')) {
      this.style.setProperty('--gc-tiles-columns', this.columns.toString());
    }
  }

  private handleTileClick(feature: FeatureTile): void {
    this.emitEvent('gc-feature-tile-click', {
      heading: feature.heading,
      href: feature.href
    });
  }

  protected override render() {
    return html`
      <div class="tiles-grid">
        ${this.features.map(feature => html`
          <article class="tile">
            <img 
              src="${feature.image}" 
              alt="${feature.alt}"
              class="tile-image"
              loading="lazy"
            />
            <div class="tile-content">
              <h3 class="tile-heading">${feature.heading}</h3>
              <p class="tile-description">${feature.description}</p>
              <a 
                href="${feature.href}"
                class="tile-link"
                @click="${() => this.handleTileClick(feature)}"
              >
                ${feature.ctaLabel} →
              </a>
            </div>
          </article>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gc-feature-tiles': GCFeatureTiles;
  }
}
