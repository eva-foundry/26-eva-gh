/**
 * Roving Tabindex Manager
 * 
 * Implements the roving tabindex pattern for composite widgets like
 * button groups, tabs, menus, and toolbars. Only one element in the
 * group has tabindex="0" at a time, making keyboard navigation efficient.
 * 
 * @see https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex
 */

export interface RovingTabindexOptions {
  /**
   * Selector for focusable items within the container
   */
  itemSelector: string;
  
  /**
   * Whether navigation should wrap around (first -> last, last -> first)
   */
  wrap?: boolean;
  
  /**
   * Orientation of the widget ('horizontal' | 'vertical' | 'both')
   */
  orientation?: 'horizontal' | 'vertical' | 'both';
  
  /**
   * Whether Home/End keys should navigate to first/last items
   */
  supportHomeEnd?: boolean;
}

export class RovingTabindexManager {
  private container: HTMLElement;
  private options: Required<RovingTabindexOptions>;
  private currentIndex: number = 0;
  private boundKeydownHandler: (e: KeyboardEvent) => void;

  constructor(container: HTMLElement, options: RovingTabindexOptions) {
    this.container = container;
    this.options = {
      wrap: true,
      orientation: 'horizontal',
      supportHomeEnd: true,
      ...options,
    };
    
    this.boundKeydownHandler = this.handleKeydown.bind(this);
    this.initialize();
  }

  private initialize(): void {
    const items = this.getItems();
    if (items.length === 0) return;

    // Set initial tabindex values
    items.forEach((item, index) => {
      item.setAttribute('tabindex', index === 0 ? '0' : '-1');
    });

    this.currentIndex = 0;
  }

  /**
   * Register event listeners
   */
  public register(): void {
    this.container.addEventListener('keydown', this.boundKeydownHandler);
  }

  /**
   * Unregister event listeners
   */
  public unregister(): void {
    this.container.removeEventListener('keydown', this.boundKeydownHandler);
  }

  /**
   * Get all focusable items in the container
   */
  private getItems(): HTMLElement[] {
    return Array.from(
      this.container.querySelectorAll(this.options.itemSelector)
    ).filter((el): el is HTMLElement => {
      return el instanceof HTMLElement && !this.isDisabled(el);
    });
  }

  /**
   * Check if element is disabled
   */
  private isDisabled(element: HTMLElement): boolean {
    return (
      element.hasAttribute('disabled') ||
      element.getAttribute('aria-disabled') === 'true'
    );
  }

  /**
   * Handle keyboard navigation
   */
  private handleKeydown(e: KeyboardEvent): void {
    const items = this.getItems();
    if (items.length === 0) return;

    const { orientation, wrap, supportHomeEnd } = this.options;
    let handled = false;

    switch (e.key) {
      case 'ArrowRight':
        if (orientation === 'horizontal' || orientation === 'both') {
          this.moveNext(items, wrap);
          handled = true;
        }
        break;

      case 'ArrowLeft':
        if (orientation === 'horizontal' || orientation === 'both') {
          this.movePrevious(items, wrap);
          handled = true;
        }
        break;

      case 'ArrowDown':
        if (orientation === 'vertical' || orientation === 'both') {
          this.moveNext(items, wrap);
          handled = true;
        }
        break;

      case 'ArrowUp':
        if (orientation === 'vertical' || orientation === 'both') {
          this.movePrevious(items, wrap);
          handled = true;
        }
        break;

      case 'Home':
        if (supportHomeEnd) {
          this.moveToIndex(items, 0);
          handled = true;
        }
        break;

      case 'End':
        if (supportHomeEnd) {
          this.moveToIndex(items, items.length - 1);
          handled = true;
        }
        break;
    }

    if (handled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  /**
   * Move to next item
   */
  private moveNext(items: HTMLElement[], wrap: boolean): void {
    let nextIndex = this.currentIndex + 1;
    
    if (nextIndex >= items.length) {
      nextIndex = wrap ? 0 : this.currentIndex;
    }
    
    this.moveToIndex(items, nextIndex);
  }

  /**
   * Move to previous item
   */
  private movePrevious(items: HTMLElement[], wrap: boolean): void {
    let prevIndex = this.currentIndex - 1;
    
    if (prevIndex < 0) {
      prevIndex = wrap ? items.length - 1 : 0;
    }
    
    this.moveToIndex(items, prevIndex);
  }

  /**
   * Move to specific index
   */
  private moveToIndex(items: HTMLElement[], index: number): void {
    if (index < 0 || index >= items.length) return;

    // Update tabindex attributes
    items[this.currentIndex]?.setAttribute('tabindex', '-1');
    items[index].setAttribute('tabindex', '0');
    items[index].focus();

    this.currentIndex = index;
  }

  /**
   * Programmatically set active element
   */
  public setActiveElement(element: HTMLElement): void {
    const items = this.getItems();
    const index = items.indexOf(element);
    
    if (index !== -1) {
      this.moveToIndex(items, index);
    }
  }

  /**
   * Get currently active element
   */
  public getActiveElement(): HTMLElement | null {
    const items = this.getItems();
    return items[this.currentIndex] || null;
  }

  /**
   * Update options
   */
  public updateOptions(options: Partial<RovingTabindexOptions>): void {
    this.options = { ...this.options, ...options };
  }
}
