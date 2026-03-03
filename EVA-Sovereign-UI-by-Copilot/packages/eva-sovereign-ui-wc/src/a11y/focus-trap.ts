/**
 * Focus Trap
 * 
 * Traps keyboard focus within a container element (typically a modal or dialog).
 * Ensures Tab/Shift+Tab cycle through focusable elements within the container
 * and do not escape to the main page.
 * 
 * @see https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_focus_trap
 */

export interface FocusTrapOptions {
  /**
   * Element to receive focus when trap is activated
   */
  initialFocus?: HTMLElement | string;
  
  /**
   * Element to receive focus when trap is deactivated
   */
  returnFocusOnDeactivate?: boolean;
  
  /**
   * Allow Escape key to deactivate the trap
   */
  escapeDeactivates?: boolean;
  
  /**
   * Callback when Escape key is pressed
   */
  onEscape?: () => void;
}

export class FocusTrap {
  private container: HTMLElement;
  private options: Required<FocusTrapOptions>;
  private previouslyFocusedElement: HTMLElement | null = null;
  private isActive: boolean = false;
  private boundKeydownHandler: (e: KeyboardEvent) => void;

  constructor(container: HTMLElement, options: FocusTrapOptions = {}) {
    this.container = container;
    this.options = {
      initialFocus: undefined,
      returnFocusOnDeactivate: true,
      escapeDeactivates: true,
      onEscape: () => {},
      ...options,
    };
    
    this.boundKeydownHandler = this.handleKeydown.bind(this);
  }

  /**
   * Activate the focus trap
   */
  public activate(): void {
    if (this.isActive) return;

    // Store currently focused element
    this.previouslyFocusedElement = document.activeElement as HTMLElement;

    // Add event listener
    this.container.addEventListener('keydown', this.boundKeydownHandler);

    // Set initial focus
    this.setInitialFocus();

    this.isActive = true;
  }

  /**
   * Deactivate the focus trap
   */
  public deactivate(): void {
    if (!this.isActive) return;

    // Remove event listener
    this.container.removeEventListener('keydown', this.boundKeydownHandler);

    // Return focus to previously focused element
    if (
      this.options.returnFocusOnDeactivate &&
      this.previouslyFocusedElement &&
      typeof this.previouslyFocusedElement.focus === 'function'
    ) {
      this.previouslyFocusedElement.focus();
    }

    this.isActive = false;
  }

  /**
   * Set initial focus
   */
  private setInitialFocus(): void {
    const { initialFocus } = this.options;
    
    let elementToFocus: HTMLElement | null = null;

    if (typeof initialFocus === 'string') {
      elementToFocus = this.container.querySelector(initialFocus);
    } else if (initialFocus instanceof HTMLElement) {
      elementToFocus = initialFocus;
    } else {
      // Focus first focusable element
      const focusableElements = this.getFocusableElements();
      elementToFocus = focusableElements[0] || null;
    }

    if (elementToFocus) {
      elementToFocus.focus();
    }
  }

  /**
   * Get all focusable elements within container
   */
  private getFocusableElements(): HTMLElement[] {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(', ');

    return Array.from(
      this.container.querySelectorAll<HTMLElement>(focusableSelectors)
    ).filter((el) => {
      return (
        el.offsetParent !== null && // Element is visible
        !el.hasAttribute('disabled') &&
        el.getAttribute('aria-hidden') !== 'true'
      );
    });
  }

  /**
   * Handle keyboard events
   */
  private handleKeydown(e: KeyboardEvent): void {
    // Handle Escape key
    if (e.key === 'Escape' && this.options.escapeDeactivates) {
      e.preventDefault();
      this.options.onEscape();
      return;
    }

    // Handle Tab key
    if (e.key === 'Tab') {
      this.handleTabKey(e);
    }
  }

  /**
   * Handle Tab/Shift+Tab cycling
   */
  private handleTabKey(e: KeyboardEvent): void {
    const focusableElements = this.getFocusableElements();
    
    if (focusableElements.length === 0) {
      e.preventDefault();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement as HTMLElement;

    // Shift+Tab on first element -> focus last
    if (e.shiftKey && activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
      return;
    }

    // Tab on last element -> focus first
    if (!e.shiftKey && activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
      return;
    }
  }

  /**
   * Check if trap is currently active
   */
  public isActivated(): boolean {
    return this.isActive;
  }

  /**
   * Update options
   */
  public updateOptions(options: Partial<FocusTrapOptions>): void {
    this.options = { ...this.options, ...options };
  }
}
