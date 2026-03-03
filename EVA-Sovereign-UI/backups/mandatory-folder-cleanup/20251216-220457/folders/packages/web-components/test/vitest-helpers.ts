// Vitest-compatible test helpers to replace @open-wc/testing functionality
// This avoids @web/test-runner-commands dependency that causes "window is not defined" errors

import { expect as vitestExpect } from 'vitest';

/**
 * Custom fixture function that works with vitest + jsdom
 * Replaces @open-wc/testing fixture function
 */
export async function fixture<T extends Element>(template: TemplateResult | string): Promise<T> {
  const container = document.createElement('div');
  document.body.appendChild(container);
  
  if (typeof template === 'string') {
    container.innerHTML = template;
  } else {
    // Handle Lit TemplateResult
    container.innerHTML = template.strings.join('');
  }
  
  const element = container.firstElementChild as T;
  if (!element) {
    throw new Error('fixture: No element created from template');
  }
  
  // Wait for custom element to be defined and updated
  if (element.tagName.includes('-')) {
    await customElements.whenDefined(element.tagName.toLowerCase());
    if ('updateComplete' in element) {
      await (element as any).updateComplete;
    }
  }
  
  return element;
}

/**
 * Simple HTML template function
 * Replaces @open-wc/testing html function for simple cases
 */
export function html(strings: TemplateStringsArray, ...values: any[]): TemplateResult {
  return {
    strings,
    values
  } as TemplateResult;
}

/**
 * Custom expect function that includes chai-a11y-axe functionality
 * Replaces @open-wc/testing expect as wcExpect
 */
export const wcExpect = vitestExpect.extend({
  async toBeAccessible(element: Element) {
    const axe = await import('axe-core');
    const results = await axe.run(element);
    
    if (results.violations.length > 0) {
      const violations = results.violations.map(v => 
        `${v.id}: ${v.description}\n  ${v.nodes.map(n => n.target).join(', ')}`
      ).join('\n');
      
      return {
        pass: false,
        message: () => `Expected element to be accessible, but found violations:\n${violations}`
      };
    }
    
    return {
      pass: true,
      message: () => 'Element passes accessibility checks'
    };
  }
});

// Make it available as .to.be.accessible() chain
wcExpect.extend({
  accessible: wcExpect.toBeAccessible
});

/**
 * Event helper - waits for a single event
 * Replaces @open-wc/testing oneEvent function
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
 * Condition waiter - waits until condition becomes true
 * Replaces @open-wc/testing waitUntil function
 */
export function waitUntil(condition: () => boolean | Promise<boolean>, timeout = 5000, interval = 50): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const startTime = Date.now();
    
    const check = async () => {
      try {
        const result = await condition();
        if (result) {
          resolve();
          return;
        }
      } catch (error) {
        // Condition threw an error, continue checking
      }
      
      if (Date.now() - startTime > timeout) {
        reject(new Error(`waitUntil: Timeout after ${timeout}ms`));
        return;
      }
      
      setTimeout(check, interval);
    };
    
    check();
  });
}

// Type definitions for compatibility
interface TemplateResult {
  strings: TemplateStringsArray;
  values: any[];
}

// Re-export expect for convenience
export { expect } from 'vitest';