/**
 * ARIA Utilities
 * 
 * Helper functions for managing ARIA attributes and screen reader announcements.
 * Simplifies common ARIA patterns and ensures consistent implementation.
 */

/**
 * Set aria-expanded attribute
 */
export function setAriaExpanded(element: HTMLElement, expanded: boolean): void {
  element.setAttribute('aria-expanded', String(expanded));
}

/**
 * Set aria-pressed attribute (for toggle buttons)
 */
export function setAriaPressed(element: HTMLElement, pressed: boolean): void {
  element.setAttribute('aria-pressed', String(pressed));
}

/**
 * Set aria-selected attribute (for tabs, options)
 */
export function setAriaSelected(element: HTMLElement, selected: boolean): void {
  element.setAttribute('aria-selected', String(selected));
}

/**
 * Set aria-checked attribute (for checkboxes, radio buttons)
 */
export function setAriaChecked(
  element: HTMLElement,
  checked: boolean | 'mixed'
): void {
  element.setAttribute('aria-checked', String(checked));
}

/**
 * Set aria-disabled attribute
 */
export function setAriaDisabled(element: HTMLElement, disabled: boolean): void {
  element.setAttribute('aria-disabled', String(disabled));
}

/**
 * Set aria-hidden attribute
 */
export function setAriaHidden(element: HTMLElement, hidden: boolean): void {
  element.setAttribute('aria-hidden', String(hidden));
}

/**
 * Set aria-invalid attribute (for form validation)
 */
export function setAriaInvalid(element: HTMLElement, invalid: boolean): void {
  element.setAttribute('aria-invalid', String(invalid));
}

/**
 * Set aria-current attribute (for navigation)
 */
export function setAriaCurrent(
  element: HTMLElement,
  current: boolean | 'page' | 'step' | 'location' | 'date' | 'time'
): void {
  if (current === false) {
    element.removeAttribute('aria-current');
  } else {
    element.setAttribute('aria-current', current === true ? 'page' : current);
  }
}

/**
 * Generate unique ID for aria-labelledby relationship
 */
export function generateAriaId(prefix: string = 'aria'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Link label to element using aria-labelledby
 */
export function linkLabelToElement(
  element: HTMLElement,
  label: HTMLElement
): void {
  // Ensure label has an ID
  if (!label.id) {
    label.id = generateAriaId('label');
  }

  element.setAttribute('aria-labelledby', label.id);
}

/**
 * Link description to element using aria-describedby
 */
export function linkDescriptionToElement(
  element: HTMLElement,
  description: HTMLElement
): void {
  // Ensure description has an ID
  if (!description.id) {
    description.id = generateAriaId('desc');
  }

  element.setAttribute('aria-describedby', description.id);
}

/**
 * Announce message to screen readers using live region
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void {
  // Find or create live region
  let liveRegion = document.querySelector(`[data-eva-live-region="${priority}"]`);

  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.setAttribute('role', priority === 'assertive' ? 'alert' : 'status');
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.setAttribute('data-eva-live-region', priority);
    liveRegion.className = 'eva-sr-only';
    
    // Add screen reader only styles
    Object.assign((liveRegion as HTMLElement).style, {
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: '0',
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      border: '0',
    });

    document.body.appendChild(liveRegion);
  }

  // Clear and set new message
  liveRegion.textContent = '';
  setTimeout(() => {
    liveRegion!.textContent = message;
  }, 100);
}

/**
 * Set multiple ARIA attributes at once
 */
export function setAriaAttributes(
  element: HTMLElement,
  attributes: Record<string, string | boolean | number>
): void {
  Object.entries(attributes).forEach(([key, value]) => {
    const attrName = key.startsWith('aria-') ? key : `aria-${key}`;
    element.setAttribute(attrName, String(value));
  });
}

/**
 * Remove ARIA attribute
 */
export function removeAriaAttribute(element: HTMLElement, attribute: string): void {
  const attrName = attribute.startsWith('aria-') ? attribute : `aria-${attribute}`;
  element.removeAttribute(attrName);
}

/**
 * Create ARIA-compliant accordion panel
 */
export function createAccordionRelationship(
  button: HTMLElement,
  panel: HTMLElement
): void {
  // Generate IDs if needed
  if (!button.id) button.id = generateAriaId('accordion-button');
  if (!panel.id) panel.id = generateAriaId('accordion-panel');

  // Set button attributes
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', panel.id);

  // Set panel attributes
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-labelledby', button.id);
  panel.setAttribute('hidden', '');
}

/**
 * Create ARIA-compliant tab/panel relationship
 */
export function createTabRelationship(
  tab: HTMLElement,
  panel: HTMLElement,
  tablist: HTMLElement
): void {
  // Generate IDs if needed
  if (!tab.id) tab.id = generateAriaId('tab');
  if (!panel.id) panel.id = generateAriaId('tabpanel');
  if (!tablist.id) tablist.id = generateAriaId('tablist');

  // Set tablist attributes
  tablist.setAttribute('role', 'tablist');

  // Set tab attributes
  tab.setAttribute('role', 'tab');
  tab.setAttribute('aria-selected', 'false');
  tab.setAttribute('aria-controls', panel.id);
  tab.setAttribute('tabindex', '-1');

  // Set panel attributes
  panel.setAttribute('role', 'tabpanel');
  panel.setAttribute('aria-labelledby', tab.id);
  panel.setAttribute('tabindex', '0');
  panel.setAttribute('hidden', '');
}

/**
 * Announce loading state
 */
export function announceLoadingState(loading: boolean, message?: string): void {
  const defaultMessage = loading ? 'Loading...' : 'Loading complete';
  announceToScreenReader(message || defaultMessage, 'polite');
}

/**
 * Announce error message
 */
export function announceError(message: string): void {
  announceToScreenReader(`Error: ${message}`, 'assertive');
}

/**
 * Announce success message
 */
export function announceSuccess(message: string): void {
  announceToScreenReader(message, 'polite');
}
