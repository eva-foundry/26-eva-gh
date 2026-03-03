import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

@customElement('gc-tooltip')
export class GCTooltip extends EVAElement {
  static override styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    .tooltip-trigger {
      display: inline-flex;
      align-items: center;
      gap: var(--eva-spacing-xs, 0.25rem);
      cursor: help;
    }

    .tooltip-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      background: var(--eva-colors-primary, #26374a);
      color: var(--eva-colors-white, #fff);
      border-radius: 50%;
      font-size: var(--eva-font-size-sm, 0.875rem);
      font-weight: 700;
      font-family: var(--eva-fonts-body);
    }

    .tooltip-content {
      position: absolute;
      z-index: 1000;
      padding: var(--eva-spacing-sm, 0.75rem) var(--eva-spacing-md, 1rem);
      background: var(--eva-colors-text, #333);
      color: var(--eva-colors-white, #fff);
      border-radius: 4px;
      font-family: var(--eva-fonts-body);
      font-size: var(--eva-font-size-sm, 0.875rem);
      line-height: 1.5;
      max-width: 300px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s, visibility 0.2s;
    }

    .tooltip-content.visible {
      opacity: 1;
      visibility: visible;
    }

    .tooltip-content.top {
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
    }

    .tooltip-content.bottom {
      top: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
    }

    .tooltip-content.left {
      right: calc(100% + 8px);
      top: 50%;
      transform: translateY(-50%);
    }

    .tooltip-content.right {
      left: calc(100% + 8px);
      top: 50%;
      transform: translateY(-50%);
    }

    .tooltip-arrow {
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
    }

    .tooltip-content.top .tooltip-arrow {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 6px 6px 0 6px;
      border-color: var(--eva-colors-text, #333) transparent transparent transparent;
    }

    .tooltip-content.bottom .tooltip-arrow {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 0 6px 6px 6px;
      border-color: transparent transparent var(--eva-colors-text, #333) transparent;
    }

    .tooltip-content.left .tooltip-arrow {
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-width: 6px 0 6px 6px;
      border-color: transparent transparent transparent var(--eva-colors-text, #333);
    }

    .tooltip-content.right .tooltip-arrow {
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-width: 6px 6px 6px 0;
      border-color: transparent var(--eva-colors-text, #333) transparent transparent;
    }

    @media (max-width: 768px) {
      .tooltip-content {
        max-width: 200px;
        font-size: 0.8rem;
      }
    }

    @media print {
      .tooltip-content {
        display: none !important;
      }
    }
  `;

  @property({ type: String })
  text = '';

  @property({ type: String })
  position: 'top' | 'bottom' | 'left' | 'right' = 'top';

  @property({ type: Boolean })
  showIcon = true;

  @property({ type: String })
  iconLabel = '?';

  private isVisible = false;

  private handleMouseEnter() {
    this.isVisible = true;
    this.requestUpdate();
  }

  private handleMouseLeave() {
    this.isVisible = false;
    this.requestUpdate();
  }

  private handleFocus() {
    this.isVisible = true;
    this.requestUpdate();
  }

  private handleBlur() {
    this.isVisible = false;
    this.requestUpdate();
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.isVisible = false;
      this.requestUpdate();
    }
  }

  protected override render() {
    const tooltipLabel = this.getMessage('tooltipLabel');

    return html`
      <span
        class="tooltip-trigger"
        @mouseenter="${this.handleMouseEnter}"
        @mouseleave="${this.handleMouseLeave}"
        @focus="${this.handleFocus}"
        @blur="${this.handleBlur}"
        @keydown="${this.handleKeyDown}"
        tabindex="0"
        role="button"
        aria-label="${tooltipLabel}: ${this.text}"
        aria-describedby="tooltip-content"
      >
        <slot></slot>
        ${this.showIcon
          ? html`
              <span class="tooltip-icon" aria-hidden="true">
                ${this.iconLabel}
              </span>
            `
          : null}
      </span>

      <div
        id="tooltip-content"
        class="tooltip-content ${this.position} ${this.isVisible ? 'visible' : ''}"
        role="tooltip"
        aria-hidden="${!this.isVisible}"
      >
        <div class="tooltip-arrow"></div>
        ${this.text}
      </div>
    `;
  }
}

registerMessages('gc-tooltip', {
  'en-CA': {
    tooltipLabel: 'More information'
  },
  'fr-CA': {
    tooltipLabel: 'Plus d\'informations'
  }
});
