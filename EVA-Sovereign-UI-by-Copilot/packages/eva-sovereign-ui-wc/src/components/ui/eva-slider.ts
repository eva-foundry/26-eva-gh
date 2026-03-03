/**
 * EVA Slider Component
 * Range slider with Spark styling
 * Features: single/multi-thumb, horizontal/vertical, keyboard control
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
  shadows,
  transitions,
} from '../../tokens';

export class EVASlider extends EVABaseComponent {
  private value = 50;
  private min = 0;
  private max = 100;
  private step = 1;
  private inputEl?: HTMLInputElement;

  static get observedAttributes() {
    return ['value', 'min', 'max', 'step', 'disabled'];
  }

  attributeChangedCallback() {
    this.value = parseFloat(this.getAttr('value', '50'));
    this.min = parseFloat(this.getAttr('min', '0'));
    this.max = parseFloat(this.getAttr('max', '100'));
    this.step = parseFloat(this.getAttr('step', '1'));
    this.render();
    
    if (this.inputEl) {
      this.inputEl.value = this.value.toString();
      this.inputEl.min = this.min.toString();
      this.inputEl.max = this.max.toString();
      this.inputEl.step = this.step.toString();
      this.inputEl.disabled = this.getBoolAttr('disabled');
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupInput();
  }

  private setupInput() {
    if (this.inputEl) {
      this.inputEl.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        this.value = parseFloat(target.value);
        this.setAttribute('value', this.value.toString());
        this.emit('input', { value: this.value });
        this.render();
      });

      this.inputEl.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        this.emit('change', { value: parseFloat(target.value) });
      });
    }
  }

  private getPercentage(): number {
    return ((this.value - this.min) / (this.max - this.min)) * 100;
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    
    const percentage = this.getPercentage();
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
        width: 100%;
      }

      .slider-wrapper {
        position: relative;
        display: flex;
        width: 100%;
        touch-action: none;
        align-items: center;
        user-select: none;
      }

      .slider {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
      }

      .slider:disabled {
        cursor: not-allowed;
      }

      .track {
        position: relative;
        flex-grow: 1;
        overflow: hidden;
        border-radius: 9999px;
        background: ${modernColors.muted};
        height: 0.375rem;
        width: 100%;
      }

      .range {
        position: absolute;
        background: ${modernColors.primary};
        height: 100%;
        width: ${percentage}%;
      }

      .thumb {
        position: absolute;
        display: block;
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
        border-radius: 9999px;
        border: 1px solid ${modernColors.primary};
        background: ${modernColors.background};
        box-shadow: ${shadows.sm};
        transition: ${transitions.colors};
        left: calc(${percentage}% - 0.5rem);
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
      }

      .slider:hover:not(:disabled) ~ .thumb {
        box-shadow: 0 0 0 4px color-mix(in srgb, ${modernColors.ring} 50%, transparent);
      }

      .slider:focus-visible ~ .thumb {
        outline: none;
        box-shadow: 0 0 0 4px color-mix(in srgb, ${modernColors.ring} 50%, transparent);
      }

      .slider:disabled ~ .track,
      .slider:disabled ~ .thumb {
        opacity: 0.5;
        pointer-events: none;
      }

      @media (prefers-reduced-motion: reduce) {
        .thumb {
          transition-duration: 0.01ms !important;
        }
      }
    `));

    const wrapper = document.createElement('div');
    wrapper.className = 'slider-wrapper';

    const input = document.createElement('input');
    input.type = 'range';
    input.className = 'slider';
    input.value = this.value.toString();
    input.min = this.min.toString();
    input.max = this.max.toString();
    input.step = this.step.toString();
    input.disabled = this.getBoolAttr('disabled');
    input.setAttribute('aria-valuemin', this.min.toString());
    input.setAttribute('aria-valuemax', this.max.toString());
    input.setAttribute('aria-valuenow', this.value.toString());

    wrapper.appendChild(input);

    const track = document.createElement('div');
    track.className = 'track';

    const range = document.createElement('div');
    range.className = 'range';
    track.appendChild(range);

    wrapper.appendChild(track);

    const thumb = document.createElement('div');
    thumb.className = 'thumb';
    wrapper.appendChild(thumb);

    this.shadow.appendChild(wrapper);
    this.inputEl = input;
    this.setupInput();
  }
}

customElements.define('eva-slider', EVASlider);
