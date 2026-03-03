/**
 * EVA Carousel Component
 * Image/content carousel with navigation
 * Features: Previous/next buttons, indicator dots, auto-advance
 */

import { EVABaseComponent } from '../../utils/base-component';
import {
  modernColors,
  gcSpacing,
  shadows,
  transitions,
} from '../../tokens';

export class EVACarousel extends EVABaseComponent {
  private currentIndex = 0;
  private totalItems = 0;
  private autoAdvanceInterval?: number;
  private liveRegion?: HTMLElement;
  private mutationObserver?: MutationObserver;

  static get observedAttributes() {
    return ['auto-advance', 'label'];
  }

  connectedCallback() {
    super.connectedCallback();

    // Observe light DOM changes (adding/removing slides)
    this.mutationObserver = new MutationObserver(() => {
      this.updateItems();
      this.updateIndicators();
      this.updateLiveRegion();
    });
    this.mutationObserver.observe(this, { childList: true });

    const autoAdvance = parseInt(this.getAttr('auto-advance', '0'), 10);
    if (autoAdvance > 0) {
      this.autoAdvanceInterval = window.setInterval(() => {
        this.next();
      }, autoAdvance);
    }

    // Initial sync
    this.updateItems();
    this.updateIndicators();
    this.updateLiveRegion();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.autoAdvanceInterval) {
      clearInterval(this.autoAdvanceInterval);
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  private updateItems() {
    const items = this.querySelectorAll('eva-carousel-item');
    this.totalItems = items.length;
    if (this.totalItems === 0) {
      return;
    }
    // Clamp current index in case items removed
    if (this.currentIndex >= this.totalItems) {
      this.currentIndex = this.totalItems - 1;
    }
    items.forEach((item, index) => {
      if (index === this.currentIndex) {
        item.setAttribute('active', '');
      } else {
        item.removeAttribute('active');
      }
    });
  }

  private previous() {
    if (this.totalItems === 0) return;
    this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
    this.updateItems();
    this.updateIndicators();
    this.updateLiveRegion();
    this.emit('change', { index: this.currentIndex });
  }

  private next() {
    if (this.totalItems === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.totalItems;
    this.updateItems();
    this.updateIndicators();
    this.updateLiveRegion();
    this.emit('change', { index: this.currentIndex });
  }

  private goTo(index: number) {
    if (index < 0 || index >= this.totalItems) return;
    this.currentIndex = index;
    this.updateItems();
    this.updateIndicators();
    this.updateLiveRegion();
    this.emit('change', { index: this.currentIndex });
  }

  private updateIndicators() {
    const indicatorsContainer = this.shadow.querySelector('.indicators');
    if (!indicatorsContainer) return;
    const existing = indicatorsContainer.querySelectorAll('.indicator');
    // Rebuild if count mismatch
    if (existing.length !== this.totalItems) {
      indicatorsContainer.innerHTML = '';
      for (let i = 0; i < this.totalItems; i++) {
        const indicator = document.createElement('button');
        indicator.className = 'indicator';
        indicator.setAttribute('type', 'button');
        indicator.setAttribute('aria-label', `Go to slide ${i + 1}`);
        indicator.setAttribute('data-active', (i === this.currentIndex).toString());
        indicator.setAttribute('tabindex', i === this.currentIndex ? '0' : '-1');
        indicator.addEventListener('keydown', (e) => this.handleIndicatorKey(e as KeyboardEvent, i));
        indicator.addEventListener('click', () => this.goTo(i));
        indicatorsContainer.appendChild(indicator);
      }
      return;
    }
    existing.forEach((el, i) => {
      el.setAttribute('data-active', (i === this.currentIndex).toString());
      el.setAttribute('aria-current', i === this.currentIndex ? 'true' : 'false');
      el.setAttribute('tabindex', i === this.currentIndex ? '0' : '-1');
    });
  }

  private moveIndicatorFocus(targetIndex: number) {
    const indicatorsContainer = this.shadow.querySelector('.indicators');
    if (!indicatorsContainer) return;
    const buttons = Array.from(indicatorsContainer.querySelectorAll<HTMLButtonElement>('.indicator'));
    if (targetIndex < 0 || targetIndex >= buttons.length) return;
    buttons.forEach((btn, i) => btn.setAttribute('tabindex', i === targetIndex ? '0' : '-1'));
    buttons[targetIndex].focus();
  }

  private handleIndicatorKey(e: KeyboardEvent, index: number) {
    switch (e.key) {
      case 'ArrowRight':
      case 'Right':
        e.preventDefault();
        this.moveIndicatorFocus((index + 1) % this.totalItems);
        break;
      case 'ArrowLeft':
      case 'Left':
        e.preventDefault();
        this.moveIndicatorFocus((index - 1 + this.totalItems) % this.totalItems);
        break;
      case 'Home':
        e.preventDefault();
        this.moveIndicatorFocus(0);
        break;
      case 'End':
        e.preventDefault();
        this.moveIndicatorFocus(this.totalItems - 1);
        break;
      case 'Enter':
      case ' ': // Space
        e.preventDefault();
        this.goTo(index);
        break;
    }
  }

  private updateLiveRegion() {
    if (!this.liveRegion) return;
    if (this.totalItems === 0) {
      this.liveRegion.textContent = '';
      return;
    }
    this.liveRegion.textContent = `Slide ${this.currentIndex + 1} of ${this.totalItems}`;
  }

  protected render(): void {
    this.shadow.innerHTML = '';

    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
        position: relative;
      }

      .carousel {
        position: relative;
        overflow: hidden;
        border-radius: ${gcSpacing[3]};
      }

      .items {
        display: flex;
        transition: transform 300ms ease-out;
      }

      .nav-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: color-mix(in srgb, ${modernColors.background} 80%, transparent);
        border: 1px solid ${modernColors.border};
        border-radius: 50%;
        cursor: pointer;
        transition: ${transitions.colors};
        box-shadow: ${shadows.md};
        color: ${modernColors.foreground};
        font-size: 1.25rem;
        line-height: 1;
      }

      .nav-button:hover {
        background: ${modernColors.background};
      }

      .nav-button.prev {
        left: ${gcSpacing[4]};
      }

      .nav-button.next {
        right: ${gcSpacing[4]};
      }

      .indicators {
        position: absolute;
        bottom: ${gcSpacing[4]};
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: ${gcSpacing[2]};
        z-index: 10;
      }

      .indicator {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: color-mix(in srgb, ${modernColors.background} 50%, transparent);
        border: 1px solid ${modernColors.border};
        cursor: pointer;
        transition: ${transitions.colors};
      }

      .indicator[data-active="true"] {
        background: ${modernColors.primary};
        border-color: ${modernColors.primary};
        width: 1.5rem;
        border-radius: 0.25rem;
      }
      .live-region {
        position: absolute;
        left: -9999px;
        width: 1px;
        height: 1px;
        overflow: hidden;
      }
    `));
    const carousel = document.createElement('div');
    carousel.className = 'carousel';
    carousel.setAttribute('aria-roledescription', 'carousel');
    carousel.setAttribute('aria-label', this.getAttr('label', 'Carousel'));

    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'items';
    const slot = document.createElement('slot');
    itemsContainer.appendChild(slot);

    const prevBtn = document.createElement('button');
    prevBtn.className = 'nav-button prev';
    prevBtn.type = 'button';
    prevBtn.setAttribute('aria-label', 'Previous slide');
    prevBtn.textContent = '‹';
    prevBtn.addEventListener('click', () => this.previous());

    const nextBtn = document.createElement('button');
    nextBtn.className = 'nav-button next';
    nextBtn.type = 'button';
    nextBtn.setAttribute('aria-label', 'Next slide');
    nextBtn.textContent = '›';
    nextBtn.addEventListener('click', () => this.next());

    const indicators = document.createElement('div');
    indicators.className = 'indicators';

    // Indicators initially empty; will be built after mutation observer runs

    this.liveRegion = document.createElement('div');
    this.liveRegion.className = 'live-region';
    this.liveRegion.setAttribute('aria-live', 'polite');

    carousel.appendChild(itemsContainer);
    carousel.appendChild(prevBtn);
    carousel.appendChild(nextBtn);
    carousel.appendChild(indicators);
    carousel.appendChild(this.liveRegion);

    this.shadow.appendChild(carousel);
  }
}

export class EVACarouselItem extends EVABaseComponent {
  private isActive = false;

  static get observedAttributes() {
    return ['active'];
  }

  attributeChangedCallback() {
    this.isActive = this.getBoolAttr('active');
    this.render();
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: ${this.isActive ? 'block' : 'none'};
        flex: 0 0 100%;
        width: 100%;
      }

      .item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .item ::slotted(*) {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    `));

    const item = document.createElement('div');
    item.className = 'item';
    
    const slot = document.createElement('slot');
    item.appendChild(slot);

    this.shadow.appendChild(item);
  }
}

customElements.define('eva-carousel', EVACarousel);
customElements.define('eva-carousel-item', EVACarouselItem);
