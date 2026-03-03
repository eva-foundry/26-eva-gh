import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

interface TemplateData {
  [key: string]: unknown;
}

/**
 * WB-Data-JSON - JSON Data Templating
 * Render JSON data using HTML templates
 */
@customElement('wb-data-json')
export class WBDataJSON extends EVAElement {
  static override styles = css`
    :host {
      display: block;
    }

    .json-error {
      padding: var(--eva-spacing-md, 1rem);
      background: var(--eva-colors-error-light, #fee);
      border: 1px solid var(--eva-colors-error, #c00);
      border-radius: var(--eva-border-radius-sm, 3px);
      color: var(--eva-colors-error, #c00);
    }
  `;

  @property({ type: String })
  url = '';

  @property({ type: String })
  template = '';

  @property({ type: Object })
  data: TemplateData | TemplateData[] | null = null;

  @property({ type: Boolean, attribute: 'auto-load' })
  autoLoad = true;

  @state()
  private error = '';

  @state()
  private renderedContent: unknown[] = [];

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-data-json', {
      'en-CA': {
        loadError: 'Error loading JSON data',
        parseError: 'Error parsing JSON',
        rendered: 'Data rendered successfully'
      },
      'fr-CA': {
        loadError: 'Erreur lors du chargement des données JSON',
        parseError: 'Erreur lors de l\'analyse JSON',
        rendered: 'Données rendues avec succès'
      }
    });

    if (this.autoLoad && this.url) {
      this.loadData();
    } else if (this.data) {
      this.renderData();
    }
  }

  override updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('data') && this.data) {
      this.renderData();
    }
  }

  async loadData(): Promise<void> {
    if (!this.url) return;

    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      this.data = await response.json();
      this.renderData();
      this.emitEvent('wb-json-loaded', { url: this.url });
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Unknown error';
      this.emitEvent('wb-json-error', { url: this.url, error: this.error });
    }
  }

  private renderData(): void {
    if (!this.data) return;

    try {
      const dataArray = Array.isArray(this.data) ? this.data : [this.data];
      this.renderedContent = dataArray.map(item => this.applyTemplate(item));
      this.announce(this.getMessage('wb-data-json', 'rendered'));
      this.emitEvent('wb-json-rendered', { count: dataArray.length });
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Render error';
    }
  }

  private applyTemplate(item: TemplateData): unknown {
    if (!this.template) {
      return JSON.stringify(item);
    }

    let output = this.template;
    Object.entries(item).forEach(([key, value]) => {
      const pattern = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      output = output.replace(pattern, String(value));
    });

    return output;
  }

  override render() {
    if (this.error) {
      return html`
        <div class="json-error" role="alert">
          ${this.getMessage('wb-data-json', 'loadError')}: ${this.error}
        </div>
      `;
    }

    return html`
      <div>
        ${this.renderedContent.map(content => html`
          <div .innerHTML="${String(content)}"></div>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-data-json': WBDataJSON;
  }
}
