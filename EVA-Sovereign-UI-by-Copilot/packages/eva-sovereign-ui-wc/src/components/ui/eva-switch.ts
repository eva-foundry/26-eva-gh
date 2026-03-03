/**
 * EVA Switch Component
 * Toggle switch with Spark styling
 * Features: checked/unchecked states, smooth thumb animation
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
  shadows,
  transitions,
} from '../../tokens';

export class EVASwitch extends EVABaseComponent {
  private checked = false;
  private inputEl?: HTMLInputElement;

  static get observedAttributes() {
    return ['checked', 'disabled', 'value', 'name'];
  }

  attributeChangedCallback() {
    this.checked = this.getBoolAttr('checked');
    this.render();
    
    if (this.inputEl) {
      this.inputEl.checked = this.checked;
      this.inputEl.disabled = this.getBoolAttr('disabled');
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupInput();
  }

  private setupInput() {
    if (this.inputEl) {
      this.inputEl.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        this.checked = target.checked;
        if (this.checked) {
          this.setAttribute('checked', '');
        } else {
          this.removeAttribute('checked');
        }
        this.emit('change', { checked: this.checked });
        this.render();
      });
    }
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: inline-flex;
      }

      .switch-wrapper {
        position: relative;
        display: inline-flex;
      }

      .switch {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }

      .visual {
        display: inline-flex;
        height: 1.15rem;
        width: 2rem;
        flex-shrink: 0;
        align-items: center;
        border-radius: 9999px;
        border: 1px solid transparent;
        box-shadow: ${shadows.xs};
        transition: ${transitions.all};
        cursor: pointer;
        background: ${this.checked ? modernColors.primary : modernColors.input};
      }

      .switch:focus-visible + .visual {
        outline: none;
        border-color: ${modernColors.ring};
        box-shadow: 0 0 0 3px color-mix(in srgb, ${modernColors.ring} 50%, transparent);
      }

      .switch:disabled + .visual {
        cursor: not-allowed;
        opacity: 0.5;
      }

      .thumb {
        pointer-events: none;
        display: block;
        width: 1rem;
        height: 1rem;
        border-radius: 9999px;
        background: ${modernColors.background};
        box-shadow: ${shadows.sm};
        transition: transform 200ms;
        transform: ${this.checked ? 'translateX(calc(100% - 2px))' : 'translateX(0)'};
      }

      @media (prefers-reduced-motion: reduce) {
        .visual,
        .thumb {
          transition-duration: 0.01ms !important;
        }
      }
    `));

    const wrapper = document.createElement('div');
    wrapper.className = 'switch-wrapper';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'switch';
    input.checked = this.checked;
    input.disabled = this.getBoolAttr('disabled');
    input.setAttribute('role', 'switch');
    input.setAttribute('aria-checked', this.checked.toString());
    
    const name = this.getAttr('name', '');
    const value = this.getAttr('value', '');
    if (name) input.name = name;
    if (value) input.value = value;

    wrapper.appendChild(input);

    const visual = document.createElement('div');
    visual.className = 'visual';
    visual.setAttribute('tabindex', '0');

    visual.addEventListener('click', () => {
      if (!this.getBoolAttr('disabled')) {
        input.click();
      }
    });

    visual.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        input.click();
      }
    });

    const thumb = document.createElement('div');
    thumb.className = 'thumb';
    visual.appendChild(thumb);

    wrapper.appendChild(visual);

    this.shadow.appendChild(wrapper);
    this.inputEl = input;
    this.setupInput();
  }
}

customElements.define('eva-switch', EVASwitch);
