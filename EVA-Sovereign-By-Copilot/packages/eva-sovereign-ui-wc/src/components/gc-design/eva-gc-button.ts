/**
 * EVA GC Button Component
 * Government of Canada button with 6 official variants
 */

import { EVABaseComponent } from '../../utils/base-component';
import { gcColors, gcTypography, gcSpacing } from '../../tokens';

export type ButtonVariant = 'supertask' | 'primary' | 'secondary' | 'danger' | 'link' | 'contextual-signin';

export class EVAGCButton extends EVABaseComponent {
  static get observedAttributes() {
    return ['variant', 'disabled', 'loading'];
  }

  attributeChangedCallback() {
    this.render();
  }

  protected render(): void {
    const variant = this.getAttr('variant', 'primary') as ButtonVariant;
    const disabled = this.getBoolAttr('disabled');
    const loading = this.getBoolAttr('loading');

    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: inline-block;
      }

      button {
        font-family: ${gcTypography.fontBody};
        font-size: ${gcTypography.sizeBody};
        font-weight: ${gcTypography.weightBold};
        padding: ${gcSpacing.buttonPadding};
        border: 2px solid transparent;
        border-radius: ${gcSpacing.unit / 2}px;
        cursor: pointer;
        min-height: ${gcSpacing.touchTarget};
        transition: all 0.2s ease;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: ${gcSpacing.xs};
      }

      button:focus {
        outline: 3px solid ${gcColors.focusOutline};
        outline-offset: 2px;
      }

      button:disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }

      /* Supertask variant */
      button.supertask {
        background: ${gcColors.linkBlue};
        color: ${gcColors.textWhite};
        border-color: ${gcColors.linkBlue};
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }

      button.supertask:hover:not(:disabled) {
        background: ${gcColors.linkHover};
        border-color: ${gcColors.linkHover};
      }

      /* Primary variant */
      button.primary {
        background: ${gcColors.accent};
        color: ${gcColors.textWhite};
        border-color: ${gcColors.accent};
      }

      button.primary:hover:not(:disabled) {
        background: ${gcColors.accentLight};
        border-color: ${gcColors.accentLight};
      }

      /* Secondary variant */
      button.secondary {
        background: ${gcColors.background};
        color: ${gcColors.accent};
        border-color: ${gcColors.accent};
      }

      button.secondary:hover:not(:disabled) {
        background: ${gcColors.backgroundGrey};
      }

      /* Danger variant */
      button.danger {
        background: ${gcColors.errorRed};
        color: ${gcColors.textWhite};
        border-color: ${gcColors.errorRed};
      }

      button.danger:hover:not(:disabled) {
        background: #b50000;
        border-color: #b50000;
      }

      /* Link variant */
      button.link {
        background: transparent;
        color: ${gcColors.linkBlue};
        border-color: transparent;
        text-decoration: underline;
        padding: ${gcSpacing.xs} ${gcSpacing.sm};
      }

      button.link:hover:not(:disabled) {
        color: ${gcColors.linkHover};
        text-decoration: none;
      }

      /* Contextual signin variant */
      button.contextual-signin {
        background: ${gcColors.successGreen};
        color: ${gcColors.textWhite};
        border-color: ${gcColors.successGreen};
      }

      button.contextual-signin:hover:not(:disabled) {
        background: #1e6600;
        border-color: #1e6600;
      }

      .spinner {
        width: 16px;
        height: 16px;
        border: 2px solid currentColor;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `));

    const button = document.createElement('button');
    button.className = variant;
    button.disabled = disabled || loading;
    button.setAttribute('type', 'button');

    if (loading) {
      const spinner = document.createElement('span');
      spinner.className = 'spinner';
      spinner.setAttribute('role', 'status');
      spinner.setAttribute('aria-label', this.t('accessibility.loading'));
      button.appendChild(spinner);
    }

    const slot = document.createElement('slot');
    button.appendChild(slot);

    this.shadow.appendChild(button);
  }
}

customElements.define('eva-gc-button', EVAGCButton);
