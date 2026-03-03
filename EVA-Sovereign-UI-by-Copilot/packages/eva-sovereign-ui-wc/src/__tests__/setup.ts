import { beforeAll, afterEach } from 'vitest';

// Setup global test environment
beforeAll(() => {
  // Define custom elements if not already defined
  if (!customElements.get('eva-test-element')) {
    class TestElement extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
      }
    }
    customElements.define('eva-test-element', TestElement);
  }
});

// Clean up after each test
afterEach(() => {
  document.body.innerHTML = '';
});

// Add custom matchers
expect.extend({
  toHaveAttribute(received: Element, attribute: string, value?: string) {
    const hasAttribute = received.hasAttribute(attribute);
    const actualValue = received.getAttribute(attribute);
    
    if (value === undefined) {
      return {
        pass: hasAttribute,
        message: () => `Expected element to have attribute "${attribute}"`,
      };
    }
    
    return {
      pass: hasAttribute && actualValue === value,
      message: () => `Expected element to have attribute "${attribute}" with value "${value}", but got "${actualValue}"`,
    };
  },
  toBeAccessible(received: Element) {
    // Basic accessibility checks
    const hasRole = received.hasAttribute('role') || received.tagName.toLowerCase() === 'button' || received.tagName.toLowerCase() === 'a';
    const hasLabel = received.hasAttribute('aria-label') || received.hasAttribute('aria-labelledby') || received.textContent?.trim();
    
    return {
      pass: hasRole && hasLabel,
      message: () => `Expected element to have proper accessibility attributes`,
    };
  },
});

// Extend expect types
declare module 'vitest' {
  interface Assertion<T = any> {
    toHaveAttribute(attribute: string, value?: string): T;
    toBeAccessible(): T;
  }
}
