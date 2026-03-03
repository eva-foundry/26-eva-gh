/**
 * Keyboard Utilities
 * 
 * Helper functions and constants for keyboard event handling
 * and accessibility-focused keyboard navigation.
 */

/**
 * Key codes enum for common keys
 */
export enum KeyCode {
  ENTER = 'Enter',
  SPACE = ' ',
  ESCAPE = 'Escape',
  TAB = 'Tab',
  ARROW_UP = 'ArrowUp',
  ARROW_DOWN = 'ArrowDown',
  ARROW_LEFT = 'ArrowLeft',
  ARROW_RIGHT = 'ArrowRight',
  HOME = 'Home',
  END = 'End',
  PAGE_UP = 'PageUp',
  PAGE_DOWN = 'PageDown',
  DELETE = 'Delete',
  BACKSPACE = 'Backspace',
}

/**
 * Check if key is a navigation key (arrows, home, end, page up/down)
 */
export function isNavigationKey(key: string): boolean {
  return [
    KeyCode.ARROW_UP,
    KeyCode.ARROW_DOWN,
    KeyCode.ARROW_LEFT,
    KeyCode.ARROW_RIGHT,
    KeyCode.HOME,
    KeyCode.END,
    KeyCode.PAGE_UP,
    KeyCode.PAGE_DOWN,
  ].includes(key as KeyCode);
}

/**
 * Check if key is an activation key (Enter or Space)
 */
export function isActivationKey(key: string): boolean {
  return key === KeyCode.ENTER || key === KeyCode.SPACE;
}

/**
 * Check if event is a printable character
 */
export function isPrintableCharacter(e: KeyboardEvent): boolean {
  return (
    e.key.length === 1 &&
    !e.ctrlKey &&
    !e.metaKey &&
    !e.altKey
  );
}

/**
 * Get the purpose/action of a key press
 */
export function getKeyPurpose(key: string): 'navigation' | 'activation' | 'cancel' | 'other' {
  if (isNavigationKey(key)) return 'navigation';
  if (isActivationKey(key)) return 'activation';
  if (key === KeyCode.ESCAPE) return 'cancel';
  return 'other';
}

/**
 * Prevent default behavior for specific keys
 */
export function preventDefaultForKeys(e: KeyboardEvent, keys: string[]): boolean {
  if (keys.includes(e.key)) {
    e.preventDefault();
    return true;
  }
  return false;
}

/**
 * Simulate a click event (for keyboard activation)
 */
export function simulateClick(element: HTMLElement): void {
  const clickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  element.dispatchEvent(clickEvent);
}

/**
 * Handle Enter/Space activation pattern
 */
export function handleActivationKeys(
  e: KeyboardEvent,
  callback: () => void
): boolean {
  if (isActivationKey(e.key)) {
    e.preventDefault();
    callback();
    return true;
  }
  return false;
}

/**
 * Get next focusable element in DOM order
 */
export function getNextFocusableElement(
  currentElement: HTMLElement,
  container?: HTMLElement
): HTMLElement | null {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  const root = container || document.body;
  const focusableElements = Array.from(
    root.querySelectorAll<HTMLElement>(focusableSelectors)
  );

  const currentIndex = focusableElements.indexOf(currentElement);
  if (currentIndex === -1 || currentIndex === focusableElements.length - 1) {
    return null;
  }

  return focusableElements[currentIndex + 1];
}

/**
 * Get previous focusable element in DOM order
 */
export function getPreviousFocusableElement(
  currentElement: HTMLElement,
  container?: HTMLElement
): HTMLElement | null {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  const root = container || document.body;
  const focusableElements = Array.from(
    root.querySelectorAll<HTMLElement>(focusableSelectors)
  );

  const currentIndex = focusableElements.indexOf(currentElement);
  if (currentIndex <= 0) {
    return null;
  }

  return focusableElements[currentIndex - 1];
}

/**
 * Check if element is focusable
 */
export function isFocusable(element: HTMLElement): boolean {
  if (
    element.hasAttribute('disabled') ||
    element.getAttribute('aria-hidden') === 'true'
  ) {
    return false;
  }

  const tabindex = element.getAttribute('tabindex');
  if (tabindex === '-1') return false;

  // Check if element is visible
  if (element.offsetParent === null) return false;

  return true;
}

/**
 * Focus element with optional scroll prevention
 */
export function focusElement(
  element: HTMLElement,
  options: { preventScroll?: boolean } = {}
): void {
  element.focus({ preventScroll: options.preventScroll || false });
}

/**
 * Create typeahead search handler for list navigation
 */
export function createTypeaheadHandler(
  items: HTMLElement[],
  onMatch: (item: HTMLElement) => void,
  clearDelay: number = 1000
): (e: KeyboardEvent) => void {
  let searchString = '';
  let clearTimer: number | null = null;

  return (e: KeyboardEvent) => {
    if (!isPrintableCharacter(e)) return;

    // Clear previous timer
    if (clearTimer !== null) {
      window.clearTimeout(clearTimer);
    }

    // Add character to search string
    searchString += e.key.toLowerCase();

    // Find matching item
    const matchingItem = items.find((item) => {
      const text = item.textContent?.toLowerCase() || '';
      return text.startsWith(searchString);
    });

    if (matchingItem) {
      onMatch(matchingItem);
    }

    // Clear search string after delay
    clearTimer = window.setTimeout(() => {
      searchString = '';
      clearTimer = null;
    }, clearDelay);
  };
}
