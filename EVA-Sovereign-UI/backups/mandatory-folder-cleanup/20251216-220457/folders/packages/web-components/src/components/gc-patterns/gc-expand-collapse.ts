import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

interface AccordionPanel {
  id: string;
  heading: string;
  content: string;
  expanded: boolean;
}

/**
 * gc-expand-collapse - Accordion Pattern
 * 
 * Expandable/collapsible panels for FAQs, help content, and grouped information.
 * Supports single or multiple panel expansion with smooth animations.
 * 
 * @element gc-expand-collapse
 * 
 * @fires gc-panel-expand - Fired when a panel is expanded
 * @fires gc-panel-collapse - Fired when a panel is collapsed
 * 
 * @example
 * ```html
 * <gc-expand-collapse
 *   .panels="${[
 *     {
 *       id: 'faq-1',
 *       heading: 'How do I apply?',
 *       content: 'You can apply online...',
 *       expanded: false
 *     }
 *   ]}"
 *   allowMultiple>
 * </gc-expand-collapse>
 * ```
 */
@customElement('gc-expand-collapse')
export class GCExpandCollapse extends EVAElement {
  static override styles = css`
    :host {
      display: block;
      margin: var(--eva-spacing-xl, 2rem) 0;
    }

    .accordion {
      border: 1px solid var(--eva-colors-border, #ddd);
      border-radius: var(--eva-border-radius-md, 8px);
      overflow: hidden;
    }

    .panel {
      border-bottom: 1px solid var(--eva-colors-border, #ddd);
    }

    .panel:last-child {
      border-bottom: none;
    }

    .panel-header {
      width: 100%;
      padding: var(--eva-spacing-lg, 1.5rem);
      background: var(--eva-colors-background-default, #ffffff);
      border: none;
      text-align: left;
      font-size: var(--eva-font-size-base, 1rem);
      font-weight: var(--eva-font-weight-semibold, 600);
      color: var(--eva-colors-text-primary, #333);
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background 0.2s ease;
      font-family: var(--gc-font-family, Lato, sans-serif);
    }

    .panel-header:hover {
      background: var(--eva-colors-background-hover, #f5f5f5);
    }

    .panel-header:focus-visible {
      outline: 3px solid var(--eva-colors-focus, #4CAF50);
      outline-offset: -3px;
    }

    .panel-header[aria-expanded="true"] {
      background: var(--eva-colors-background-secondary, #f5f5f5);
    }

    .panel-heading {
      flex: 1;
      margin: 0;
    }

    .panel-icon {
      width: 24px;
      height: 24px;
      transition: transform 0.3s ease;
      flex-shrink: 0;
      margin-left: var(--eva-spacing-md, 1rem);
    }

    .panel-header[aria-expanded="true"] .panel-icon {
      transform: rotate(180deg);
    }

    .panel-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-out;
    }

    .panel-content.expanded {
      max-height: 2000px;
      transition: max-height 0.5s ease-in;
    }

    .panel-content-inner {
      padding: var(--eva-spacing-lg, 1.5rem);
      line-height: 1.6;
      color: var(--eva-colors-text-secondary, #666);
    }

    @media (max-width: 576px) {
      .panel-header {
        padding: var(--eva-spacing-md, 1rem);
        font-size: var(--eva-font-size-sm, 0.875rem);
      }

      .panel-content-inner {
        padding: var(--eva-spacing-md, 1rem);
      }
    }
  `;

  @property({ type: Array })
  panels: AccordionPanel[] = [];

  @property({ type: Boolean })
  allowMultiple: boolean = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.checkForDeepLink();
  }

  /**
   * Expand a specific panel
   */
  public expandPanel(id: string): void {
    const panelIndex = this.panels.findIndex(p => p.id === id);
    if (panelIndex === -1) return;

    const panel = this.panels[panelIndex];
    if (!panel) return;

    if (!this.allowMultiple) {
      this.panels = this.panels.map(p => ({ ...p, expanded: p.id === id }));
    } else {
      this.panels = this.panels.map(p => 
        p.id === id ? { ...p, expanded: true } : p
      );
    }

    this.emitEvent('gc-panel-expand', { id, heading: panel.heading });
    this.announce(this.getMessage('panelExpanded').replace('{heading}', panel.heading));
    this.requestUpdate();
  }

  /**
   * Collapse a specific panel
   */
  public collapsePanel(id: string): void {
    const panel = this.panels.find(p => p.id === id);
    if (!panel) return;

    this.panels = this.panels.map(p =>
      p.id === id ? { ...p, expanded: false } : p
    );

    this.emitEvent('gc-panel-collapse', { id });
    this.announce(this.getMessage('panelCollapsed').replace('{heading}', panel.heading));
    this.requestUpdate();
  }

  /**
   * Toggle a panel's expanded state
   */
  public togglePanel(id: string): void {
    const panel = this.panels.find(p => p.id === id);
    if (!panel) return;

    if (panel.expanded) {
      this.collapsePanel(id);
    } else {
      this.expandPanel(id);
    }
  }

  private checkForDeepLink(): void {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const panel = this.panels.find(p => p.id === hash);
      if (panel && !panel.expanded) {
        this.expandPanel(hash);
        setTimeout(() => {
          const element = this.shadowRoot?.getElementById(`panel-${hash}`);
          element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }

  private handleHeaderClick(id: string): void {
    this.togglePanel(id);
  }

  private handleKeyDown(event: KeyboardEvent, id: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.togglePanel(id);
    }
  }

  protected override render() {
    return html`
      <div class="accordion" role="region" aria-label="${this.getMessage('accordion')}">
        ${this.panels.map(panel => html`
          <div class="panel" id="panel-${panel.id}">
            <h3>
              <button
                class="panel-header"
                aria-expanded="${panel.expanded}"
                aria-controls="content-${panel.id}"
                @click="${() => this.handleHeaderClick(panel.id)}"
                @keydown="${(e: KeyboardEvent) => this.handleKeyDown(e, panel.id)}"
              >
                <span class="panel-heading">${panel.heading}</span>
                <svg
                  class="panel-icon"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </button>
            </h3>
            <div
              id="content-${panel.id}"
              class="panel-content ${panel.expanded ? 'expanded' : ''}"
              role="region"
              aria-labelledby="header-${panel.id}"
              ?hidden="${!panel.expanded}"
            >
              <div class="panel-content-inner">
                ${panel.content}
              </div>
            </div>
          </div>
        `)}
      </div>
    `;
  }
}

// Register i18n messages
registerMessages('gc-expand-collapse', {
  'en-CA': {
    accordion: 'Accordion',
    panelExpanded: '{heading} expanded',
    panelCollapsed: '{heading} collapsed'
  },
  'fr-CA': {
    accordion: 'Accordéon',
    panelExpanded: '{heading} développé',
    panelCollapsed: '{heading} réduit'
  }
});

declare global {
  interface HTMLElementTagNameMap {
    'gc-expand-collapse': GCExpandCollapse;
  }
}
