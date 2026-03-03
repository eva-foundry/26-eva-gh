import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

interface CarouselSlide {
  image: string;
  alt: string;
  heading: string;
  description: string;
  href?: string;
}

/**
 * gc-carousel - Content Carousel Pattern
 * 
 * Rotating content carousel for news highlights, features, etc.
 * Supports auto-play, keyboard navigation, touch swipe, and accessibility.
 * 
 * @element gc-carousel
 * 
 * @fires gc-carousel-slide-change - Fired when the current slide changes
 * 
 * @example
 * ```html
 * <gc-carousel
 *   .slides="${[
 *     {
 *       image: '/img/news1.jpg',
 *       alt: 'News headline',
 *       heading: 'Latest announcement',
 *       description: 'Description of the news item',
 *       href: '/news/1'
 *     }
 *   ]}"
 *   autoPlay
 *   interval="5000">
 * </gc-carousel>
 * ```
 */
@customElement('gc-carousel')
export class GCCarousel extends EVAElement {
  static override styles = css`
    :host {
      display: block;
      position: relative;
      margin: var(--eva-spacing-xl, 2rem) 0;
    }

    .carousel-container {
      position: relative;
      overflow: hidden;
      border-radius: var(--eva-border-radius-md, 8px);
    }

    .slides-wrapper {
      display: flex;
      transition: transform 0.5s ease-in-out;
    }

    .slide {
      min-width: 100%;
      position: relative;
      background: var(--eva-colors-background-default, #ffffff);
    }

    .slide img {
      width: 100%;
      height: 400px;
      object-fit: cover;
      display: block;
    }

    .slide-content {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: var(--eva-spacing-xl, 2rem);
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.8) 0%,
        rgba(0, 0, 0, 0.4) 50%,
        transparent 100%
      );
      color: var(--eva-colors-text-light, #ffffff);
    }

    .slide-heading {
      font-size: var(--eva-font-size-xl, 1.5rem);
      font-weight: var(--eva-font-weight-bold, 700);
      margin: 0 0 var(--eva-spacing-sm, 0.5rem);
      font-family: var(--gc-font-family, Lato, sans-serif);
    }

    .slide-description {
      font-size: var(--eva-font-size-base, 1rem);
      margin: 0;
      line-height: 1.5;
    }

    .slide-link {
      display: inline-block;
      margin-top: var(--eva-spacing-md, 1rem);
      color: var(--eva-colors-text-light, #ffffff);
      text-decoration: underline;
      font-weight: var(--eva-font-weight-semibold, 600);
    }

    .slide-link:hover,
    .slide-link:focus {
      text-decoration-thickness: 2px;
    }

    .controls {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
      display: flex;
      justify-content: space-between;
      padding: 0 var(--eva-spacing-md, 1rem);
      pointer-events: none;
    }

    .control-button {
      pointer-events: all;
      background: rgba(255, 255, 255, 0.9);
      border: none;
      border-radius: 50%;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1.5rem;
      color: var(--eva-colors-text-primary, #333);
      transition: background 0.2s ease, transform 0.2s ease;
    }

    .control-button:hover {
      background: rgba(255, 255, 255, 1);
      transform: scale(1.1);
    }

    .control-button:focus-visible {
      outline: 3px solid var(--eva-colors-focus, #4CAF50);
      outline-offset: 2px;
    }

    .control-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .bottom-controls {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: var(--eva-spacing-md, 1rem);
      margin-top: var(--eva-spacing-md, 1rem);
    }

    .play-pause-button {
      background: var(--eva-colors-background-secondary, #f5f5f5);
      border: 1px solid var(--eva-colors-border, #ddd);
      border-radius: var(--eva-border-radius-sm, 4px);
      padding: var(--eva-spacing-sm, 0.5rem) var(--eva-spacing-md, 1rem);
      cursor: pointer;
      font-size: var(--eva-font-size-sm, 0.875rem);
      font-weight: var(--eva-font-weight-semibold, 600);
      transition: background 0.2s ease;
    }

    .play-pause-button:hover {
      background: var(--eva-colors-background-hover, #e0e0e0);
    }

    .play-pause-button:focus-visible {
      outline: 3px solid var(--eva-colors-focus, #4CAF50);
      outline-offset: 2px;
    }

    .indicators {
      display: flex;
      gap: var(--eva-spacing-xs, 0.25rem);
    }

    .indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--eva-colors-border, #ddd);
      border: none;
      padding: 0;
      cursor: pointer;
      transition: background 0.2s ease, transform 0.2s ease;
    }

    .indicator.active {
      background: var(--eva-colors-primary, #2572b4);
      transform: scale(1.2);
    }

    .indicator:hover {
      background: var(--eva-colors-primary-hover, #0535d2);
    }

    .indicator:focus-visible {
      outline: 3px solid var(--eva-colors-focus, #4CAF50);
      outline-offset: 2px;
    }

    @media (max-width: 768px) {
      .slide img {
        height: 300px;
      }

      .slide-heading {
        font-size: var(--eva-font-size-lg, 1.25rem);
      }

      .slide-description {
        font-size: var(--eva-font-size-sm, 0.875rem);
      }

      .control-button {
        width: 40px;
        height: 40px;
        font-size: 1.25rem;
      }
    }
  `;

  @property({ type: Array })
  slides: CarouselSlide[] = [];

  @property({ type: Boolean })
  autoPlay: boolean = false;

  @property({ type: Number })
  interval: number = 5000;

  @state()
  currentSlide: number = 0;

  @state()
  private isPlaying: boolean = false;

  private autoPlayTimer: number | null = null;
  private touchStartX: number = 0;
  private touchEndX: number = 0;

  override connectedCallback(): void {
    super.connectedCallback();
    if (this.autoPlay) {
      this.play();
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.pause();
  }

  /**
   * Start auto-play
   */
  public play(): void {
    if (this.slides.length <= 1) return;
    
    this.isPlaying = true;
    this.startAutoPlay();
  }

  /**
   * Pause auto-play
   */
  public pause(): void {
    this.isPlaying = false;
    this.stopAutoPlay();
  }

  /**
   * Go to next slide
   */
  public next(): void {
    if (this.slides.length === 0) return;
    
    const nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(nextIndex);
  }

  /**
   * Go to previous slide
   */
  public prev(): void {
    if (this.slides.length === 0) return;
    
    const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prevIndex);
  }

  /**
   * Go to specific slide
   */
  public goToSlide(index: number): void {
    if (index < 0 || index >= this.slides.length) return;
    
    this.currentSlide = index;
    this.emitEvent('gc-carousel-slide-change', { currentSlide: index });
    
    const slideMsg = this.getMessage('slideOf')
      .replace('{current}', String(index + 1))
      .replace('{total}', String(this.slides.length));
    this.announce(slideMsg);

    // Restart auto-play timer if playing
    if (this.isPlaying) {
      this.startAutoPlay();
    }
  }

  private startAutoPlay(): void {
    this.stopAutoPlay();
    this.autoPlayTimer = window.setInterval(() => {
      this.next();
    }, this.interval);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayTimer !== null) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  private handleMouseEnter(): void {
    if (this.isPlaying) {
      this.stopAutoPlay();
    }
  }

  private handleMouseLeave(): void {
    if (this.isPlaying) {
      this.startAutoPlay();
    }
  }

  private handleTouchStart(event: TouchEvent): void {
    const touch = event.changedTouches[0];
    if (touch) {
      this.touchStartX = touch.screenX;
    }
  }

  private handleTouchEnd(event: TouchEvent): void {
    const touch = event.changedTouches[0];
    if (touch) {
      this.touchEndX = touch.screenX;
      this.handleSwipe();
    }
  }

  private handleSwipe(): void {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.next();
      } else {
        this.prev();
      }
    }
  }

  private handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.prev();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.next();
        break;
      case 'Home':
        event.preventDefault();
        this.goToSlide(0);
        break;
      case 'End':
        event.preventDefault();
        this.goToSlide(this.slides.length - 1);
        break;
    }
  }

  private togglePlayPause(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  protected override render() {
    if (this.slides.length === 0) {
      return html`<div class="carousel-container"></div>`;
    }

    return html`
      <div
        class="carousel-container"
        @mouseenter="${this.handleMouseEnter}"
        @mouseleave="${this.handleMouseLeave}"
        @touchstart="${this.handleTouchStart}"
        @touchend="${this.handleTouchEnd}"
        @keydown="${this.handleKeyDown}"
        role="region"
        aria-roledescription="${this.getMessage('carousel')}"
        aria-label="${this.getMessage('carouselLabel')}"
      >
        <div
          class="slides-wrapper"
          style="transform: translateX(-${this.currentSlide * 100}%)"
          aria-live="polite"
          aria-atomic="true"
        >
          ${this.slides.map((slide, index) => html`
            <div
              class="slide"
              role="group"
              aria-roledescription="${this.getMessage('slide')}"
              aria-label="${this.getMessage('slideOf')
                .replace('{current}', String(index + 1))
                .replace('{total}', String(this.slides.length))}"
              ?hidden="${index !== this.currentSlide}"
            >
              <img
                src="${slide.image}"
                alt="${slide.alt}"
                loading="${index === 0 ? 'eager' : 'lazy'}"
              />
              <div class="slide-content">
                <h2 class="slide-heading">${slide.heading}</h2>
                <p class="slide-description">${slide.description}</p>
                ${slide.href ? html`
                  <a href="${slide.href}" class="slide-link">
                    ${this.getMessage('readMore')}
                  </a>
                ` : ''}
              </div>
            </div>
          `)}
        </div>

        ${this.slides.length > 1 ? html`
          <div class="controls">
            <button
              class="control-button"
              @click="${this.prev}"
              aria-label="${this.getMessage('previousSlide')}"
              tabindex="0"
            >
              ◀
            </button>
            <button
              class="control-button"
              @click="${this.next}"
              aria-label="${this.getMessage('nextSlide')}"
              tabindex="0"
            >
              ▶
            </button>
          </div>
        ` : ''}
      </div>

      ${this.slides.length > 1 ? html`
        <div class="bottom-controls">
          <button
            class="play-pause-button"
            @click="${this.togglePlayPause}"
            aria-label="${this.isPlaying ? this.getMessage('pauseCarousel') : this.getMessage('playCarousel')}"
          >
            ${this.isPlaying ? this.getMessage('pause') : this.getMessage('play')}
          </button>
          
          <div class="indicators" role="tablist">
            ${this.slides.map((_, index) => html`
              <button
                class="indicator ${index === this.currentSlide ? 'active' : ''}"
                @click="${() => this.goToSlide(index)}"
                role="tab"
                aria-label="${this.getMessage('goToSlide').replace('{index}', String(index + 1))}"
                aria-selected="${index === this.currentSlide}"
                tabindex="${index === this.currentSlide ? '0' : '-1'}"
              ></button>
            `)}
          </div>
        </div>
      ` : ''}
    `;
  }
}

// Register i18n messages
registerMessages('gc-carousel', {
  'en-CA': {
    carousel: 'Carousel',
    carouselLabel: 'Content carousel',
    slide: 'Slide',
    slideOf: 'Slide {current} of {total}',
    previousSlide: 'Previous slide',
    nextSlide: 'Next slide',
    goToSlide: 'Go to slide {index}',
    play: 'Play',
    pause: 'Pause',
    playCarousel: 'Play carousel',
    pauseCarousel: 'Pause carousel',
    readMore: 'Read more'
  },
  'fr-CA': {
    carousel: 'Carrousel',
    carouselLabel: 'Carrousel de contenu',
    slide: 'Diapositive',
    slideOf: 'Diapositive {current} de {total}',
    previousSlide: 'Diapositive précédente',
    nextSlide: 'Diapositive suivante',
    goToSlide: 'Aller à la diapositive {index}',
    play: 'Lecture',
    pause: 'Pause',
    playCarousel: 'Lecture du carrousel',
    pauseCarousel: 'Mettre le carrousel en pause',
    readMore: 'En savoir plus'
  }
});

declare global {
  interface HTMLElementTagNameMap {
    'gc-carousel': GCCarousel;
  }
}
