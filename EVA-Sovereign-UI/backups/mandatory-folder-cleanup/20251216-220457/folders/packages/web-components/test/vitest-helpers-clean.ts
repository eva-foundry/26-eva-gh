// Vitest-compatible test helpers to replace @open-wc/testing functionality
// This avoids @web/test-runner-commands dependency that causes "window is not defined" errors

import { expect as vitestExpect } from 'vitest';

// Performance optimization: Cache defined custom elements
const definedElements = new Set<string>();

// Performance optimization: Reuse axe-core instance
let axeInstance: any | null = null;

// Type definitions for compatibility
interface TemplateResult {
  strings: TemplateStringsArray;
  values: unknown[];
}

interface LitElement {
  updateComplete: Promise<boolean>;
}

/**
 * Custom fixture function optimized for vitest + jsdom environment.
 * 
 * Replaces @open-wc/testing fixture function with a browser-dependency-free approach
 * that supports Lit Web Components, property bindings, and slotted content.
 * 
 * Features:
 * - Zero browser dependencies (no @web/test-runner-commands)
 * - Full Lit property binding support (`.property="${value}"`)
 * - Automatic element cleanup between tests (prevents DOM conflicts)
 * - Custom element lifecycle management (waits for definitions and updates)
 * - HTML template parsing with slot content preservation
 * 
 * @template T - The type of element to create (extends Element)
 * @param template - Either a Lit html template result or plain HTML string
 * @returns Promise resolving to the created and fully initialized element
 * 
 * @example
 * ```typescript
 * // Lit template with property binding
 * const el = await fixture<MyComponent>(html`
 *   <my-component .items="${data}" title="Test">
 *     <div slot="content">Slotted content</div>
 *   </my-component>
 * `);
 * 
 * // Plain HTML string
 * const el = await fixture<HTMLDivElement>('<div>Plain HTML</div>');
 * ```
 */
export async function fixture<T extends Element>(template: TemplateResult | string): Promise<T> {
  let element: T;
  
  if (typeof template === 'string') {
    // Handle string templates by parsing HTML directly
    const container = document.createElement('div');
    container.innerHTML = template;
    element = container.firstElementChild as T;
  } else {
    // Build complete HTML string from template literals
    let htmlString = template.strings[0];
    
    template.values.forEach((value, index) => {
      // Convert value to string, handling objects and arrays
      let valueStr: string;
      if (value && typeof value === 'object') {
        valueStr = JSON.stringify(value);
      } else {
        valueStr = String(value);
      }
      
      htmlString += valueStr + (template.strings[index + 1] || '');
    });
    
    // Create container and parse HTML
    const container = document.createElement('div');
    container.innerHTML = htmlString;
    element = container.firstElementChild as T;
    
    if (!element) {
      throw new Error(`Failed to create element from template: ${htmlString}`);
    }
    
    // Apply property bindings that were in the original template
    template.values.forEach((value, index) => {
      const beforeProperty = template.strings[index];
      
      // Look for property bindings like .items="${
      const propertyMatch = beforeProperty.match(/\.([a-zA-Z][a-zA-Z0-9]*)\s*=\s*['"${\s]*$/);
      if (propertyMatch) {
        const propertyName = propertyMatch[1];
        (element as Record<string, unknown>)[propertyName] = value;
      }
    });
  }
  
  if (!element) {
    throw new Error('fixture: No element created from template');
  }
  
  // Clean up any existing elements of the same type to avoid conflicts
  const existingElements = document.querySelectorAll(element.tagName.toLowerCase());
  existingElements.forEach(el => el.remove());
  
  // Add to DOM for proper web component lifecycle
  document.body.appendChild(element);
  
  // Wait for custom element to be defined and updated (with caching)
  if (element.tagName.includes('-')) {
    const tagName = element.tagName.toLowerCase();
    if (!definedElements.has(tagName)) {
      await customElements.whenDefined(tagName);
      definedElements.add(tagName);
    }
    if ('updateComplete' in element) {
      await (element as unknown as LitElement).updateComplete;
    }
  }
  
  return element;
}

/**
 * Lit-compatible HTML template function for test fixtures.
 * 
 * Provides the same API as Lit's html template function for creating
 * template results that work with the fixture function.
 * 
 * @param strings - Template string array from tagged template literal
 * @param values - Interpolated values from the template
 * @returns TemplateResult compatible with fixture function
 * 
 * @example
 * ```typescript
 * const template = html`<my-component .data="${myData}">Content</my-component>`;
 * const el = await fixture<MyComponent>(template);
 * ```
 */
export function html(strings: TemplateStringsArray, ...values: unknown[]): TemplateResult {
  return {
    strings,
    values
  };
}

/**
 * Internal accessibility testing function using axe-core engine.
 * 
 * Performs comprehensive WCAG 2.1 AA compliance checking on the provided element.
 * This is the core implementation used by beAccessible().
 * 
 * @param element - The element to test for accessibility violations
 * @throws Error with detailed violation information if issues found
 */
export async function expectToBeAccessible(element: Element): Promise<void> {
  // Performance: Cache axe-core instance
  if (!axeInstance) {
    const axe = await import('axe-core');
    axeInstance = axe.default;
  }
  const results = await axeInstance.run(element);
  
  if (results.violations.length > 0) {
    const violations = results.violations.map(v => 
      `${v.id}: ${v.description}\n  ${v.nodes.map(n => n.target).join(', ')}`
    ).join('\n');
    
    throw new Error(`Expected element to be accessible, but found violations:\n${violations}`);
  }
}

/**
 * Main accessibility testing function with detailed error reporting.
 * 
 * Provides a clean API for accessibility testing that integrates seamlessly
 * with vitest assertions while offering detailed violation information.
 * 
 * @param element - The DOM element to test for accessibility compliance
 * @throws Error with formatted violation details if accessibility issues found
 */
export async function beAccessible(element: Element): Promise<void> {
  await expectToBeAccessible(element);
}

// Legacy compatibility export
export const wcExpected = vitestExpect;

/**
 * Utility to wait for a single event with configurable timeout.
 * 
 * Enhanced version of @open-wc/testing oneEvent with better error handling
 * and timeout management for reliable async testing.
 * 
 * @param element - The element to listen for events on
 * @param eventType - The event type to wait for (e.g., 'click', 'input')
 * @param timeout - Maximum wait time in milliseconds (default: 5000ms)
 * @returns Promise resolving with the Event object when fired
 * @throws Error if event is not fired within timeout period
 */
export function oneEvent(element: EventTarget, eventType: string, timeout = 5000): Promise<Event> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      element.removeEventListener(eventType, handler);
      reject(new Error(`oneEvent: Timeout waiting for ${eventType} event`));
    }, timeout);
    
    const handler = (event: Event) => {
      clearTimeout(timeoutId);
      element.removeEventListener(eventType, handler);
      resolve(event);
    };
    
    element.addEventListener(eventType, handler, { once: true });
  });
}

/**
 * Wait until a condition function returns true with configurable polling.
 * 
 * Enhanced replacement for @open-wc/testing waitUntil with better error handling,
 * support for both sync and async conditions, and configurable timing.
 * 
 * @param condition - Function returning boolean or Promise<boolean> to check
 * @param timeout - Maximum wait time in milliseconds (default: 5000ms)
 * @param interval - Polling interval in milliseconds (default: 50ms)
 * @returns Promise that resolves when condition becomes true
 * @throws Error if condition is not met within timeout
 */
export function waitUntil(condition: () => boolean | Promise<boolean>, timeout = 5000, interval = 50): Promise<void> {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const check = (): void => {
      Promise.resolve(condition()).then(result => {
        if (result) {
          resolve();
          return;
        }
        
        if (Date.now() - startTime > timeout) {
          reject(new Error(`waitUntil: Timeout after ${timeout}ms`));
          return;
        }
        
        setTimeout(check, interval);
      }).catch(() => {
        // Condition threw an error, continue checking
        if (Date.now() - startTime > timeout) {
          reject(new Error(`waitUntil: Timeout after ${timeout}ms`));
          return;
        }
        
        setTimeout(check, interval);
      });
    };
    
    check();
  });
}

// Re-export expect for convenience
export { expect } from 'vitest';