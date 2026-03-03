/**
 * Accessibility Utilities
 * WCAG 2.2 AAA compliance helpers
 * - Focus trap for modals
 * - Live region manager for screen readers
 * - Keyboard navigation helpers
 */

/**
 * Focus Trap
 * Traps keyboard focus within a container (used for modals)
 */
export class FocusTrap {
  private container: HTMLElement;
  private firstFocusable?: HTMLElement;
  private lastFocusable?: HTMLElement;
  private previouslyFocused?: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  /**
   * Activate focus trap
   */
  activate(): void {
    // Remember currently focused element
    this.previouslyFocused = document.activeElement as HTMLElement;

    // Get all focusable elements in container
    const focusableElements = this.getFocusableElements();
    
    if (focusableElements.length === 0) {
      return;
    }

    this.firstFocusable = focusableElements[0];
    this.lastFocusable = focusableElements[focusableElements.length - 1];

    // Focus first element
    this.firstFocusable?.focus();

    // Add event listener for Tab key
    this.container.addEventListener('keydown', this.handleKeydown);
  }

  /**
   * Deactivate focus trap
   */
  deactivate(): void {
    // Remove event listener
    this.container.removeEventListener('keydown', this.handleKeydown);

    // Restore focus to previously focused element
    this.previouslyFocused?.focus();
  }

  /**
   * Get all focusable elements in container
   */
  private getFocusableElements(): HTMLElement[] {
    const selector =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    
    return Array.from(this.container.querySelectorAll<HTMLElement>(selector)).filter(
      (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
    );
  }

  /**
   * Handle Tab key navigation
   */
  private handleKeydown = (event: KeyboardEvent): void => {
    if (event.key !== 'Tab') {
      return;
    }

    // Shift+Tab (backwards)
    if (event.shiftKey) {
      if (document.activeElement === this.firstFocusable) {
        event.preventDefault();
        this.lastFocusable?.focus();
      }
    }
    // Tab (forwards)
    else {
      if (document.activeElement === this.lastFocusable) {
        event.preventDefault();
        this.firstFocusable?.focus();
      }
    }
  };
}

/**
 * Live Region Manager
 * Announces dynamic content changes to screen readers
 */
export class LiveRegionManager {
  private liveRegion?: HTMLDivElement;

  constructor() {
    this.createLiveRegion();
  }

  /**
   * Create hidden live region in DOM
   */
  private createLiveRegion(): void {
    if (this.liveRegion) {
      return;
    }

    this.liveRegion = document.createElement('div');
    this.liveRegion.setAttribute('role', 'status');
    this.liveRegion.setAttribute('aria-live', 'polite');
    this.liveRegion.setAttribute('aria-atomic', 'true');
    this.liveRegion.style.position = 'absolute';
    this.liveRegion.style.left = '-10000px';
    this.liveRegion.style.width = '1px';
    this.liveRegion.style.height = '1px';
    this.liveRegion.style.overflow = 'hidden';
    
    document.body.appendChild(this.liveRegion);
  }

  /**
   * Announce message to screen readers
   * @param message Message to announce
   * @param priority 'polite' or 'assertive'
   */
  announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    if (!this.liveRegion) {
      return;
    }

    // Update aria-live priority
    this.liveRegion.setAttribute('aria-live', priority);

    // Clear previous message
    this.liveRegion.textContent = '';

    // Announce new message (slight delay ensures screen reader picks it up)
    setTimeout(() => {
      if (this.liveRegion) {
        this.liveRegion.textContent = message;
      }
    }, 100);
  }

  /**
   * Clean up live region
   */
  destroy(): void {
    if (this.liveRegion) {
      document.body.removeChild(this.liveRegion);
      this.liveRegion = undefined;
    }
  }
}

/**
 * Global live region manager instance
 */
let globalLiveRegion: LiveRegionManager | undefined;

/**
 * Get global live region manager (singleton)
 */
export function getLiveRegionManager(): LiveRegionManager {
  if (!globalLiveRegion) {
    globalLiveRegion = new LiveRegionManager();
  }
  return globalLiveRegion;
}

/**
 * Keyboard Navigation Helpers
 */

/**
 * Check if element is focusable
 */
export function isFocusable(element: HTMLElement): boolean {
  if (element.hasAttribute('disabled') || element.getAttribute('tabindex') === '-1') {
    return false;
  }

  const tagName = element.tagName.toLowerCase();
  const focusableTags = ['a', 'button', 'input', 'select', 'textarea'];
  
  if (focusableTags.includes(tagName)) {
    return true;
  }

  return element.hasAttribute('tabindex') && element.getAttribute('tabindex') !== '-1';
}

/**
 * Get next focusable element
 */
export function getNextFocusable(current: HTMLElement, container: HTMLElement): HTMLElement | null {
  const focusables = Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);

  const currentIndex = focusables.indexOf(current);
  
  if (currentIndex === -1 || currentIndex === focusables.length - 1) {
    return null;
  }

  return focusables[currentIndex + 1] ?? null;
}

/**
 * Get previous focusable element
 */
export function getPreviousFocusable(
  current: HTMLElement,
  container: HTMLElement
): HTMLElement | null {
  const focusables = Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);

  const currentIndex = focusables.indexOf(current);
  
  if (currentIndex <= 0) {
    return null;
  }

  return focusables[currentIndex - 1] ?? null;
}

/**
 * Handle arrow key navigation in a list
 */
export function handleArrowKeyNavigation(
  event: KeyboardEvent,
  container: HTMLElement,
  options: {
    vertical?: boolean;
    horizontal?: boolean;
    loop?: boolean;
  } = {}
): void {
  const { vertical = true, horizontal = false, loop = true } = options;

  const focusables = Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [role="button"], [role="menuitem"], [role="option"]'
    )
  ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);

  if (focusables.length === 0) {
    return;
  }

  const currentIndex = focusables.indexOf(document.activeElement as HTMLElement);
  let nextIndex = currentIndex;

  // Arrow Down or Arrow Right
  if ((vertical && event.key === 'ArrowDown') || (horizontal && event.key === 'ArrowRight')) {
    event.preventDefault();
    nextIndex = currentIndex + 1;
    if (nextIndex >= focusables.length) {
      nextIndex = loop ? 0 : focusables.length - 1;
    }
  }
  // Arrow Up or Arrow Left
  else if ((vertical && event.key === 'ArrowUp') || (horizontal && event.key === 'ArrowLeft')) {
    event.preventDefault();
    nextIndex = currentIndex - 1;
    if (nextIndex < 0) {
      nextIndex = loop ? focusables.length - 1 : 0;
    }
  }
  // Home
  else if (event.key === 'Home') {
    event.preventDefault();
    nextIndex = 0;
  }
  // End
  else if (event.key === 'End') {
    event.preventDefault();
    nextIndex = focusables.length - 1;
  }

  focusables[nextIndex]?.focus();
}
