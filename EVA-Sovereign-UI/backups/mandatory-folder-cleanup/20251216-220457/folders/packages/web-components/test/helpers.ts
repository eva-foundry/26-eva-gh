import { LitElement } from 'lit';

/**
 * Test Helper Utilities for Lit Web Components
 * Reusable patterns for EVA component testing
 */

/**
 * Wait for Lit element to complete rendering and update shadow DOM
 * Use this after every property change in tests
 */
export async function waitForUpdate(element: LitElement): Promise<void> {
  await element.updateComplete;
  // Double-check for nested updates
  await element.updateComplete;
}

/**
 * Query shadow DOM safely with type assertion
 */
export function queryShadow<T extends Element = Element>(
  element: LitElement,
  selector: string
): T | null {
  return element.shadowRoot?.querySelector<T>(selector) ?? null;
}

/**
 * Query all elements in shadow DOM
 */
export function queryShadowAll<T extends Element = Element>(
  element: LitElement,
  selector: string
): T[] {
  return Array.from(element.shadowRoot?.querySelectorAll<T>(selector) ?? []);
}

/**
 * Check if element has attribute with specific value
 */
export function hasAttribute(element: Element, attr: string, value?: string): boolean {
  if (value !== undefined) {
    return element.getAttribute(attr) === value;
  }
  return element.hasAttribute(attr);
}

/**
 * Get computed style of shadow DOM element
 */
export function getComputedStyle(element: LitElement, selector: string, property: string): string {
  const el = queryShadow(element, selector);
  if (!el) return '';
  return window.getComputedStyle(el).getPropertyValue(property);
}

/**
 * Simulate keyboard event on shadow DOM element
 */
export async function pressKey(
  element: LitElement,
  selector: string,
  key: string,
  options: Partial<KeyboardEventInit> = {}
): Promise<void> {
  const target = queryShadow(element, selector);
  if (!target) throw new Error(`Element not found: ${selector}`);
  
  const event = new KeyboardEvent('keydown', {
    key,
    bubbles: true,
    composed: true,
    cancelable: true,
    ...options
  });
  
  target.dispatchEvent(event);
  await waitForUpdate(element);
}

/**
 * Click element in shadow DOM
 */
export async function clickShadow(
  element: LitElement,
  selector: string
): Promise<void> {
  const target = queryShadow<HTMLElement>(element, selector);
  if (!target) throw new Error(`Element not found: ${selector}`);
  
  target.click();
  await waitForUpdate(element);
}

/**
 * Set input value in shadow DOM
 */
export async function setInputValue(
  element: LitElement,
  selector: string,
  value: string
): Promise<void> {
  const input = queryShadow<HTMLInputElement>(element, selector);
  if (!input) throw new Error(`Input not found: ${selector}`);
  
  input.value = value;
  input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  await waitForUpdate(element);
}

/**
 * Check if element is visible (not display:none or visibility:hidden)
 */
export function isVisible(element: LitElement, selector?: string): boolean {
  const target = selector ? queryShadow(element, selector) : element;
  if (!target) return false;
  
  const style = window.getComputedStyle(target);
  return style.display !== 'none' && style.visibility !== 'hidden';
}

/**
 * Get element dimensions
 */
export function getDimensions(element: Element): { width: number; height: number } {
  const rect = element.getBoundingClientRect();
  return { width: rect.width, height: rect.height };
}

/**
 * Wait for event to be emitted
 */
export function waitForEvent<T = CustomEvent>(
  element: Element,
  eventName: string,
  timeout = 1000
): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      element.removeEventListener(eventName, handler);
      reject(new Error(`Event '${eventName}' not emitted within ${timeout}ms`));
    }, timeout);
    
    const handler = (event: Event) => {
      clearTimeout(timer);
      resolve(event as T);
    };
    
    element.addEventListener(eventName, handler, { once: true });
  });
}

/**
 * Check ARIA attributes
 */
export function hasAriaAttribute(
  element: LitElement,
  selector: string,
  attr: string,
  value?: string
): boolean {
  const target = queryShadow(element, selector);
  if (!target) return false;
  
  const ariaAttr = `aria-${attr}`;
  if (value !== undefined) {
    return target.getAttribute(ariaAttr) === value;
  }
  return target.hasAttribute(ariaAttr);
}

/**
 * Test pattern: Verify component property updates shadow DOM
 */
export async function testPropertyUpdate<T extends LitElement>(
  element: T,
  property: keyof T,
  value: any,
  assertion: (el: T) => boolean | Promise<boolean>
): Promise<void> {
  (element[property] as any) = value;
  await waitForUpdate(element);
  const result = await assertion(element);
  if (!result) {
    throw new Error(`Assertion failed for property '${String(property)}' = ${value}`);
  }
}
