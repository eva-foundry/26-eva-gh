import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

interface Topic {
  icon: string;
  heading: string;
  description: string;
  href: string;
}

/**
 * gc-topic-menu - Topic Menu Pattern
 * 
 * Navigation grid for topics/themes (e.g., Jobs, Immigration, Taxes).
 * Displays topic cards with icons, headings, and descriptions.
 * 
 * @element gc-topic-menu
 * 
 * @fires gc-topic-click - Fired when a topic card is clicked
 * 
 * @example
 * ```html
 * <gc-topic-menu
 *   .topics="${[
 *     {
 *       icon: '💼',
 *       heading: 'Jobs and workplace',
 *       description: 'Find a job, training, hiring programs',
 *       href: '/jobs'
 *     }
 *   ]}"
 *   columns="3">
 * </gc-topic-menu>
 * ```
 */
@customElement('gc-topic-menu')
export class GCTopicMenu extends EVAElement {
  static override styles = css`
    :host {
      display: block;
      margin: var(--eva-spacing-xl, 2rem) 0;
    }

    .topics-grid {
      display: grid;
      grid-template-columns: repeat(var(--gc-topic-columns, 3), 1fr);
      gap: var(--eva-spacing-lg, 1.5rem);
    }

    .topic-card {
      display: block;
      padding: var(--eva-spacing-lg, 1.5rem);
      background: var(--eva-colors-background-default, #ffffff);
      border: 1px solid var(--eva-colors-border, #ddd);
      border-radius: var(--eva-border-radius-md, 8px);
      text-decoration: none;
      color: inherit;
      transition: all 0.2s ease;
    }

    .topic-card:hover,
    .topic-card:focus {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border-color: var(--eva-colors-primary, #2572b4);
    }

    .topic-card:focus-visible {
      outline: 3px solid var(--eva-colors-focus, #4CAF50);
      outline-offset: 2px;
    }

    .topic-icon {
      font-size: 3rem;
      margin-bottom: var(--eva-spacing-md, 1rem);
      display: block;
    }

    .topic-heading {
      font-size: var(--eva-font-size-lg, 1.25rem);
      font-weight: var(--eva-font-weight-bold, 700);
      margin: 0 0 var(--eva-spacing-sm, 0.5rem);
      color: var(--eva-colors-link, #2572b4);
      font-family: var(--gc-font-family, Lato, sans-serif);
    }

    .topic-description {
      font-size: var(--eva-font-size-sm, 0.875rem);
      margin: 0;
      line-height: 1.5;
      color: var(--eva-colors-text-secondary, #666);
    }

    @media (max-width: 992px) {
      .topics-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 576px) {
      .topics-grid {
        grid-template-columns: 1fr;
      }

      .topic-icon {
        font-size: 2.5rem;
      }

      .topic-heading {
        font-size: var(--eva-font-size-md, 1.125rem);
      }
    }
  `;

  @property({ type: Array })
  topics: Topic[] = [];

  @property({ type: Number })
  columns: 2 | 3 = 3;

  protected override firstUpdated(): void {
    this.style.setProperty('--gc-topic-columns', this.columns.toString());
  }

  protected override updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('columns')) {
      this.style.setProperty('--gc-topic-columns', this.columns.toString());
    }
  }

  private handleTopicClick(event: MouseEvent, topic: Topic): void {
    this.emitEvent('gc-topic-click', {
      heading: topic.heading,
      href: (event.currentTarget as HTMLAnchorElement).href
    });
  }

  protected override render() {
    return html`
      <nav aria-label="${this.getMessage('topicMenu')}" role="navigation">
        <div class="topics-grid">
          ${this.topics.map(topic => html`
            <a
              href="${topic.href}"
              class="topic-card"
              @click="${(e: MouseEvent) => this.handleTopicClick(e, topic)}"
            >
              <span class="topic-icon" aria-hidden="true">${topic.icon}</span>
              <h2 class="topic-heading">${topic.heading}</h2>
              <p class="topic-description">${topic.description}</p>
            </a>
          `)}
        </div>
      </nav>
    `;
  }
}

// Register i18n messages
registerMessages('gc-topic-menu', {
  'en-CA': {
    topicMenu: 'Topic menu'
  },
  'fr-CA': {
    topicMenu: 'Menu des sujets'
  }
});

declare global {
  interface HTMLElementTagNameMap {
    'gc-topic-menu': GCTopicMenu;
  }
}
