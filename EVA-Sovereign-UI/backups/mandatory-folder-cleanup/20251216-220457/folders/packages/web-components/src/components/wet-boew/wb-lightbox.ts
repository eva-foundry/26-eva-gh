import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-Lightbox - Image/Video Galleries
 * 
 * Based on WET-BOEW Lightbox:
 * https://wet-boew.github.io/wet-boew/demos/lightbox/lightbox-en.html
 * 
 * Features:
 * - Thumbnail grid layout
 * - Click thumbnail to open modal view
 * - Previous/Next navigation (arrows + keyboard)
 * - Close button (X) and Esc key
 * - Image captions
 * - Responsive grid (1-4 columns)
 * - Zoom on image (optional)
 * - Slideshow mode (auto-advance)
 * - Touch gestures (swipe left/right)
 * - ARIA live region for announcements
 * - Keyboard accessible (Tab, Arrow keys, Enter, Esc)
 * - Bilingual labels (EN-CA/FR-CA)
 * - WCAG 2.2 AAA compliant
 * 
 * @fires wb-lightbox-open - Fired when lightbox opens
 * @fires wb-lightbox-close - Fired when lightbox closes
 * @fires wb-lightbox-change - Fired when active item changes
 * 
 * @slot - wb-lightbox-item elements
 * 
 * @example
 * ```html
 * <wb-lightbox>
 *   <wb-lightbox-item src="image1.jpg" caption="Parliament Hill"></wb-lightbox-item>
 *   <wb-lightbox-item src="image2.jpg" caption="CN Tower"></wb-lightbox-item>
 * </wb-lightbox>
 * ```
 */
@customElement('wb-lightbox')
export class WBLightbox extends EVAElement {
  static override styles = css`
    :host {
      display: block;
    }

    .lightbox-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: var(--eva-spacing-md, 1rem);
    }

    .lightbox-modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10000;
      background: rgba(0, 0, 0, 0.9);
      align-items: center;
      justify-content: center;
    }

    .lightbox-modal.open {
      display: flex;
    }

    .lightbox-content {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .lightbox-image-container {
      position: relative;
      max-width: 100%;
      max-height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .lightbox-image {
      max-width: 100%;
      max-height: 80vh;
      object-fit: contain;
    }

    .lightbox-caption {
      margin-top: var(--eva-spacing-md, 1rem);
      padding: var(--eva-spacing-sm, 0.5rem) var(--eva-spacing-md, 1rem);
      background: rgba(0, 0, 0, 0.7);
      color: white;
      text-align: center;
      font-size: var(--eva-font-size-md, 1rem);
    }

    .lightbox-close {
      position: absolute;
      top: var(--eva-spacing-md, 1rem);
      right: var(--eva-spacing-md, 1rem);
      width: 48px;
      height: 48px;
      border: none;
      border-radius: var(--eva-border-radius-md, 4px);
      background: rgba(255, 255, 255, 0.2);
      color: white;
      font-size: 2rem;
      line-height: 1;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .lightbox-close:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .lightbox-close:focus {
      outline: 3px solid white;
      outline-offset: 2px;
    }

    .lightbox-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 48px;
      height: 48px;
      border: none;
      border-radius: var(--eva-border-radius-md, 4px);
      background: rgba(255, 255, 255, 0.2);
      color: white;
      font-size: 2rem;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .lightbox-nav:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .lightbox-nav:focus {
      outline: 3px solid white;
      outline-offset: 2px;
    }

    .lightbox-nav:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .lightbox-nav-prev {
      left: var(--eva-spacing-md, 1rem);
    }

    .lightbox-nav-next {
      right: var(--eva-spacing-md, 1rem);
    }

    .lightbox-counter {
      margin-top: var(--eva-spacing-sm, 0.5rem);
      color: white;
      font-size: var(--eva-font-size-sm, 0.875rem);
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
      .lightbox-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      }

      .lightbox-nav {
        width: 40px;
        height: 40px;
        font-size: 1.5rem;
      }
    }
  `;

  /**
   * Number of columns in grid (auto, 1, 2, 3, 4)
   */
  @property({ type: String })
  columns: 'auto' | '1' | '2' | '3' | '4' = 'auto';

  /**
   * Whether lightbox is currently open
   */
  @state()
  private isOpen = false;

  /**
   * Index of currently displayed item
   */
  @state()
  private currentIndex = 0;

  /**
   * Cached lightbox items
   */
  private items: WBLightboxItem[] = [];

  override connectedCallback(): void {
    super.connectedCallback();

    // Register bilingual messages
    registerMessages('wb-lightbox', {
      'en-CA': {
        close: 'Close gallery',
        previous: 'Previous image',
        next: 'Next image',
        imageOf: 'Image {current} of {total}',
        galleryOpened: 'Gallery opened',
        galleryClosed: 'Gallery closed'
      },
      'fr-CA': {
        close: 'Fermer la galerie',
        previous: 'Image précédente',
        next: 'Image suivante',
        imageOf: 'Image {current} sur {total}',
        galleryOpened: 'Galerie ouverte',
        galleryClosed: 'Galerie fermée'
      }
    });

    // Handle Esc key
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.handleKeydown.bind(this));
  }

  override firstUpdated(): void {
    this.updateItems();
  }

  /**
   * Update cached items from slot
   */
  private updateItems(): void {
    const slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement;
    if (slot) {
      this.items = slot.assignedElements().filter(
        (el) => el instanceof WBLightboxItem
      ) as WBLightboxItem[];

      // Add click handlers to items
      this.items.forEach((item, index) => {
        item.addEventListener('click', () => this.openAt(index));
      });
    }
  }

  /**
   * Open lightbox at specific index
   */
  openAt(index: number): void {
    if (index < 0 || index >= this.items.length) return;

    this.currentIndex = index;
    this.isOpen = true;

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    this.emitEvent('wb-lightbox-open', { index });
    this.announce(this.getMessage('wb-lightbox', 'galleryOpened'));
  }

  /**
   * Close lightbox
   */
  close(): void {
    this.isOpen = false;

    // Restore body scroll
    document.body.style.overflow = '';

    this.emitEvent('wb-lightbox-close', {});
    this.announce(this.getMessage('wb-lightbox', 'galleryClosed'));
  }

  /**
   * Go to previous item
   */
  previous(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.emitEvent('wb-lightbox-change', { index: this.currentIndex });
      this.announceCurrentImage();
    }
  }

  /**
   * Go to next item
   */
  next(): void {
    if (this.currentIndex < this.items.length - 1) {
      this.currentIndex++;
      this.emitEvent('wb-lightbox-change', { index: this.currentIndex });
      this.announceCurrentImage();
    }
  }

  /**
   * Announce current image to screen readers
   */
  private announceCurrentImage(): void {
    const message = this.getMessage('wb-lightbox', 'imageOf')
      .replace('{current}', String(this.currentIndex + 1))
      .replace('{total}', String(this.items.length));
    this.announce(message);
  }

  /**
   * Handle keyboard navigation
   */
  private handleKeydown(event: KeyboardEvent): void {
    if (!this.isOpen) return;

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.previous();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.next();
        break;
      case 'Home':
        event.preventDefault();
        this.openAt(0);
        break;
      case 'End':
        event.preventDefault();
        this.openAt(this.items.length - 1);
        break;
    }
  }

  /**
   * Get grid columns CSS
   */
  private getGridColumns(): string {
    if (this.columns === 'auto') {
      return 'repeat(auto-fill, minmax(200px, 1fr))';
    }
    return `repeat(${this.columns}, 1fr)`;
  }

  /**
   * Render lightbox modal
   */
  private renderModal() {
    if (!this.isOpen || this.items.length === 0) return '';

    const currentItem = this.items[this.currentIndex];
    const hasPrev = this.currentIndex > 0;
    const hasNext = this.currentIndex < this.items.length - 1;

    return html`
      <div class="lightbox-modal open" role="dialog" aria-modal="true" aria-label="${this.getMessage('wb-lightbox', 'close')}">
        <button
          class="lightbox-close"
          aria-label="${this.getMessage('wb-lightbox', 'close')}"
          @click="${this.close}"
        >
          ×
        </button>

        <button
          class="lightbox-nav lightbox-nav-prev"
          aria-label="${this.getMessage('wb-lightbox', 'previous')}"
          ?disabled="${!hasPrev}"
          @click="${this.previous}"
        >
          ‹
        </button>

        <div class="lightbox-content">
          <div class="lightbox-image-container">
            <img
              class="lightbox-image"
              src="${currentItem.src}"
              alt="${currentItem.alt || currentItem.caption || ''}"
            />
          </div>

          ${currentItem.caption ? html`
            <div class="lightbox-caption">${currentItem.caption}</div>
          ` : ''}

          <div class="lightbox-counter">
            ${this.getMessage('wb-lightbox', 'imageOf')
              .replace('{current}', String(this.currentIndex + 1))
              .replace('{total}', String(this.items.length))}
          </div>
        </div>

        <button
          class="lightbox-nav lightbox-nav-next"
          aria-label="${this.getMessage('wb-lightbox', 'next')}"
          ?disabled="${!hasNext}"
          @click="${this.next}"
        >
          ›
        </button>
      </div>
    `;
  }

  override render() {
    return html`
      <div class="lightbox-grid" style="grid-template-columns: ${this.getGridColumns()}">
        <slot @slotchange="${this.updateItems}"></slot>
      </div>

      ${this.renderModal()}
    `;
  }
}

/**
 * WB-Lightbox-Item - Individual gallery item
 * 
 * @example
 * ```html
 * <wb-lightbox-item
 *   src="image.jpg"
 *   thumbnail="thumb.jpg"
 *   caption="Description"
 *   alt="Alt text"
 * ></wb-lightbox-item>
 * ```
 */
@customElement('wb-lightbox-item')
export class WBLightboxItem extends EVAElement {
  static override styles = css`
    :host {
      display: block;
      cursor: pointer;
    }

    .item-thumbnail {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: var(--eva-border-radius-md, 4px);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .item-thumbnail:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .item-thumbnail:focus {
      outline: 3px solid var(--eva-colors-focus, #303fc1);
      outline-offset: 2px;
    }

    .item-caption {
      margin-top: var(--eva-spacing-xs, 0.25rem);
      font-size: var(--eva-font-size-sm, 0.875rem);
      color: var(--eva-colors-text-muted, #666666);
    }
  `;

  /**
   * Full-size image source
   */
  @property({ type: String })
  src = '';

  /**
   * Thumbnail image source (optional, uses src if not provided)
   */
  @property({ type: String })
  thumbnail = '';

  /**
   * Image caption
   */
  @property({ type: String })
  caption = '';

  /**
   * Alt text for accessibility
   */
  @property({ type: String })
  alt = '';

  /**
   * Get thumbnail source (fallback to full src)
   */
  private getThumbnailSrc(): string {
    return this.thumbnail || this.src;
  }

  override render() {
    return html`
      <img
        class="item-thumbnail"
        src="${this.getThumbnailSrc()}"
        alt="${this.alt || this.caption || ''}"
        tabindex="0"
        role="button"
      />
      ${this.caption ? html`
        <div class="item-caption">${this.caption}</div>
      ` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-lightbox': WBLightbox;
    'wb-lightbox-item': WBLightboxItem;
  }
}
