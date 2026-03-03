import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from './EVAElement.js';

/**
 * EVA Card Component
 * GC Design System compliant content container
 * WCAG 2.2 AAA compliant
 * 
 * @element eva-card
 * 
 * @slot - Card content
 * @slot header - Card header
 * @slot footer - Card footer
 * 
 * @example
 * ```html
 * <eva-card>
 *   <h3 slot="header">Card Title</h3>
 *   <p>Card content goes here.</p>
 *   <div slot="footer">Footer content</div>
 * </eva-card>
 * ```
 */
@customElement('eva-card')
export class EVACard extends EVAElement {
  protected override componentName = 'eva-card';

  /**
   * Card variant (styling)
   */
  @property({ type: String, reflect: true })
  variant: 'default' | 'bordered' | 'elevated' = 'default';

  /**
   * Padding size
   */
  @property({ type: String, reflect: true })
  padding: 'none' | 'small' | 'medium' | 'large' = 'medium';

  static override styles = css`
    :host {
      display: block;
      background-color: #ffffff;
      color: #333333;
    }

    /* Variant: Default */
    :host([variant='default']) {
      border: none;
    }

    /* Variant: Bordered */
    :host([variant='bordered']) {
      border: 1px solid #e1e4e7;
      border-radius: 0.25rem;
    }

    /* Variant: Elevated (with shadow) */
    :host([variant='elevated']) {
      border: 1px solid #e1e4e7;
      border-radius: 0.25rem;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    }

    /* Padding variants */
    .card-container {
      display: flex;
      flex-direction: column;
    }

    :host([padding='none']) .card-container {
      padding: 0;
    }

    :host([padding='small']) .card-container {
      padding: 0.5rem;
    }

    :host([padding='medium']) .card-container {
      padding: 1rem;
    }

    :host([padding='large']) .card-container {
      padding: 1.5rem;
    }

    /* Header slot */
    .card-header {
      border-bottom: 1px solid #e1e4e7;
      padding-bottom: 0.75rem;
      margin-bottom: 0.75rem;
    }

    .card-header:empty {
      display: none;
    }

    /* Footer slot */
    .card-footer {
      border-top: 1px solid #e1e4e7;
      padding-top: 0.75rem;
      margin-top: 0.75rem;
    }

    .card-footer:empty {
      display: none;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      :host {
        border: 2px solid currentColor;
      }
    }
  `;

  override render() {
    return html`
      <div class="card-container" role="region">
        <div class="card-header">
          <slot name="header"></slot>
        </div>
        <div class="card-body">
          <slot></slot>
        </div>
        <div class="card-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eva-card': EVACard;
  }
}
