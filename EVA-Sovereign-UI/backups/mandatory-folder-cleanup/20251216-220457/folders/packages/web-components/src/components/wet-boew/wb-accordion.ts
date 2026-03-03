import { html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

// Register bilingual messages for wb-accordion
registerMessages('wb-accordion', {
  'en-CA': {
    expandAll: 'Expand All',
    collapseAll: 'Collapse All',
    expand: 'Expand',
    collapse: 'Collapse',
    panel: 'Panel'
  },
  'fr-CA': {
    expandAll: 'Tout développer',
    collapseAll: 'Tout réduire',
    expand: 'Développer',
    collapse: 'Réduire',
    panel: 'Panneau'
  }
});

/**
 * wb-accordion - Expand/Collapse Panels
 *
 * WET-BOEW 4.x plugin reimplemented as modern Lit 3.x Web Component.
 * Collapsible content panels with expand/collapse functionality.
 *
 * @element wb-accordion
 *
 * @fires wb-accordion-expand - Fired when panel expands
 * @fires wb-accordion-collapse - Fired when panel collapses
 *
 * @slot - Accordion panels (use wb-accordion-panel elements)
 *
 * @csspart controls - Expand/Collapse all controls
 * @csspart panel - Individual accordion panel
 * @csspart header - Panel header/button
 * @csspart content - Panel content
 *
 * @example
 * ```html
 * <wb-accordion multi-expand>
 *   <wb-accordion-panel heading="Panel 1" expanded>
 *     <p>Content for panel 1</p>
 *   </wb-accordion-panel>
 *   <wb-accordion-panel heading="Panel 2">
 *     <p>Content for panel 2</p>
 *   </wb-accordion-panel>
 * </wb-accordion>
 * ```
 *
 * @reference https://wet-boew.github.io/wet-boew/demos/details/details-en.html
 */
@customElement('wb-accordion')
export class WBAccordion extends EVAElement {
  /** Component name for i18n message lookup */
  protected override componentName = 'wb-accordion';

  /** Allow multiple panels to be expanded simultaneously */
  @property({ type: Boolean, attribute: 'multi-expand' })
  multiExpand = false;

  /** Expand all panels by default */
  @property({ type: Boolean, attribute: 'expand-all' })
  expandAllDefault = false;

  /** Show expand/collapse all controls */
  @property({ type: Boolean, attribute: 'show-controls' })
  showControls = true;

  /** Internal state: Expanded panel indices */
  @state()
  private expandedPanels: Set<number> = new Set();

  static override styles = css`
    :host {
      display: block;
      font-family: var(--eva-typography-font-family-body, 'Noto Sans', sans-serif);
    }

    .controls {
      display: flex;
      gap: var(--eva-spacing-spacing-3, 0.75rem);
      margin-bottom: var(--eva-spacing-spacing-4, 1rem);
    }

    .control-button {
      padding: var(--eva-spacing-spacing-2, 0.5rem) var(--eva-spacing-spacing-4, 1rem);
      background: var(--eva-colors-neutral-200, #e0e0e0);
      color: var(--eva-colors-neutral-800, #333);
      border: none;
      border-radius: var(--eva-border-radius-md, 8px);
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .control-button:hover {
      background: var(--eva-colors-neutral-300, #ccc);
    }

    .control-button:focus {
      outline: 3px solid var(--eva-colors-gc-link-blue, #284162);
      outline-offset: 2px;
    }

    ::slotted(wb-accordion-panel) {
      display: block;
      margin-bottom: var(--eva-spacing-spacing-2, 0.5rem);
    }
  `;

  override connectedCallback(): void {
    super.connectedCallback();

    // Setup keyboard navigation
    this.addEventListener('keydown', this.handleKeydown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.handleKeydown);
  }

  override firstUpdated(): void {
    // Initialize expanded state for all panels
    const panels = this.getPanels();
    panels.forEach((panel, index) => {
      if (this.expandAllDefault || panel.expanded) {
        this.expandedPanels.add(index);
        panel.expanded = true;
      }
    });

    // Listen to panel events
    panels.forEach((panel, index) => {
      panel.addEventListener('wb-accordion-panel-toggle', ((e: CustomEvent) => {
        this.handlePanelToggle(index, e.detail.expanded);
      }) as EventListener);
    });
  }

  /**
   * Get all accordion panels
   */
  private getPanels(): WBAccordionPanel[] {
    return Array.from(this.querySelectorAll('wb-accordion-panel'));
  }

  /**
   * Expand specific panel
   */
  expand(index: number): void {
    const panels = this.getPanels();
    if (index < 0 || index >= panels.length) return;

    // If not multi-expand, collapse all others
    if (!this.multiExpand) {
      panels.forEach((p, i) => {
        if (i !== index) p.expanded = false;
      });
      this.expandedPanels.clear();
    }

    panels[index].expanded = true;
    this.expandedPanels.add(index);

    this.emitEvent('wb-accordion-expand', { index });
  }

  /**
   * Collapse specific panel
   */
  collapse(index: number): void {
    const panels = this.getPanels();
    if (index < 0 || index >= panels.length) return;

    panels[index].expanded = false;
    this.expandedPanels.delete(index);

    this.emitEvent('wb-accordion-collapse', { index });
  }

  /**
   * Toggle specific panel
   */
  toggle(index: number): void {
    const panels = this.getPanels();
    if (index < 0 || index >= panels.length) return;

    if (panels[index].expanded) {
      this.collapse(index);
    } else {
      this.expand(index);
    }
  }

  /**
   * Expand all panels
   */
  expandAllPanels(): void {
    const panels = this.getPanels();
    panels.forEach((panel, index) => {
      panel.expanded = true;
      this.expandedPanels.add(index);
    });
    this.announce(this.getMessage('wb-accordion', 'expandAll'), 'polite');
  }

  /**
   * Collapse all panels
   */
  collapseAllPanels(): void {
    const panels = this.getPanels();
    panels.forEach(panel => {
      panel.expanded = false;
    });
    this.expandedPanels.clear();
    this.announce(this.getMessage('wb-accordion', 'collapseAll'), 'polite');
  }

  /**
   * Handle panel toggle event
   */
  private handlePanelToggle(index: number, expanded: boolean): void {
    if (expanded) {
      this.expand(index);
    } else {
      this.collapse(index);
    }
  }

  /**
   * Handle keyboard navigation
   */
  private handleKeydown = (e: KeyboardEvent): void => {
    const panels = this.getPanels();
    
    // Find the currently focused panel by checking document.activeElement
    let currentIndex = -1;
    for (let i = 0; i < panels.length; i++) {
      const panelButton = panels[i].shadowRoot?.querySelector('.panel-header');
      if (panelButton === document.activeElement || panels[i] === document.activeElement) {
        currentIndex = i;
        break;
      }
    }
    
    // If no panel is focused, look at the event target
    if (currentIndex === -1) {
      currentIndex = panels.findIndex(p => p.contains(e.target as Node));
    }
    
    if (currentIndex === -1) return;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        if (currentIndex > 0) {
          panels[currentIndex - 1].focus();
        }
        break;

      case 'ArrowDown':
        e.preventDefault();
        if (currentIndex < panels.length - 1) {
          panels[currentIndex + 1].focus();
        }
        break;

      case 'Home':
        e.preventDefault();
        panels[0].focus();
        break;

      case 'End':
        e.preventDefault();
        panels[panels.length - 1].focus();
        break;
    }
  };

  override render() {
    return html`
      ${this.showControls ? html`
        <div class="controls" part="controls">
          <button
            class="control-button"
            @click=${this.expandAllPanels}
            aria-label="${this.getMessage('wb-accordion', 'expandAll')}"
          >
            ${this.getMessage('wb-accordion', 'expandAll')}
          </button>
          <button
            class="control-button"
            @click=${this.collapseAllPanels}
            aria-label="${this.getMessage('wb-accordion', 'collapseAll')}"
          >
            ${this.getMessage('wb-accordion', 'collapseAll')}
          </button>
        </div>
      ` : ''}

      <slot></slot>
    `;
  }
}

/**
 * wb-accordion-panel - Individual Accordion Panel
 *
 * @element wb-accordion-panel
 *
 * @fires wb-accordion-panel-toggle - Fired when panel is toggled
 *
 * @slot - Panel content
 */
@customElement('wb-accordion-panel')
export class WBAccordionPanel extends EVAElement {
  /** Component name for i18n message lookup */
  protected override componentName = 'wb-accordion';

  /** Panel heading text */
  @property({ type: String })
  heading = '';

  /** Panel is expanded */
  @property({ type: Boolean, reflect: true })
  expanded = false;

  /** Panel heading level (h2-h6) */
  @property({ type: Number, attribute: 'heading-level' })
  headingLevel = 3;

  @query('.panel-content')
  private contentElement?: HTMLElement;

  static override styles = css`
    :host {
      display: block;
      border: 1px solid var(--eva-colors-neutral-300, #ccc);
      border-radius: var(--eva-border-radius-md, 8px);
      overflow: hidden;
      margin-bottom: var(--eva-spacing-spacing-2, 0.5rem);
    }

    .panel-header {
      width: 100%;
      padding: var(--eva-spacing-spacing-4, 1rem);
      background: var(--eva-colors-neutral-100, #f5f5f5);
      border: none;
      text-align: left;
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--eva-colors-gc-link-blue, #284162);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: background 0.3s ease;
    }

    .panel-header:hover {
      background: var(--eva-colors-neutral-200, #e0e0e0);
    }

    .panel-header:focus {
      outline: 3px solid var(--eva-colors-gc-link-blue, #284162);
      outline-offset: -3px;
    }

    .panel-icon {
      font-size: 1.5rem;
      line-height: 1;
      transition: transform 0.3s ease;
      color: var(--eva-colors-gc-link-blue, #284162);
    }

    :host([expanded]) .panel-icon {
      transform: rotate(180deg);
    }

    .panel-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }

    :host([expanded]) .panel-content {
      max-height: 2000px;
    }

    .panel-content-inner {
      padding: var(--eva-spacing-spacing-4, 1rem);
    }
  `;

  /**
   * Toggle panel expanded state
   */
  toggle(): void {
    this.expanded = !this.expanded;
    this.emitEvent('wb-accordion-panel-toggle', { expanded: this.expanded });

    // Announce to screen readers
    const message = this.expanded 
      ? `${this.heading} expanded`
      : `${this.heading} collapsed`;
    this.announce(message, 'polite');
  }

  /**
   * Focus the panel header button
   */
  override focus(): void {
    const button = this.shadowRoot?.querySelector<HTMLButtonElement>('.panel-header');
    button?.focus();
  }

  override render() {
    // Use a template based approach rather than dynamic tag names
    const renderHeading = (content: any) => {
      switch (this.headingLevel) {
        case 2: return html`<h2 style="margin: 0;">${content}</h2>`;
        case 3: return html`<h3 style="margin: 0;">${content}</h3>`;
        case 4: return html`<h4 style="margin: 0;">${content}</h4>`;
        case 5: return html`<h5 style="margin: 0;">${content}</h5>`;
        case 6: return html`<h6 style="margin: 0;">${content}</h6>`;
        default: return html`<h3 style="margin: 0;">${content}</h3>`;
      }
    };

    return html`
      ${renderHeading(html`
        <button
          class="panel-header"
          part="header"
          @click=${this.toggle}
          aria-expanded="${this.expanded}"
          aria-controls="panel-content-${this.componentId}"
        >
          <span>${this.heading}</span>
          <span class="panel-icon" aria-hidden="true">
            ${this.expanded ? '▲' : '▼'}
          </span>
        </button>
      `)}

      <div
        class="panel-content"
        part="content"
        id="panel-content-${this.componentId}"
        role="region"
        aria-labelledby="panel-header-${this.componentId}"
      >
        <div class="panel-content-inner">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-accordion': WBAccordion;
    'wb-accordion-panel': WBAccordionPanel;
  }
}
