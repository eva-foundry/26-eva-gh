import { beforeAll, afterEach } from 'vitest';

// Setup custom elements registry
beforeAll(() => {
  // Ensure clean state for custom elements
  if (!customElements.get('eva-test-element')) {
    class TestElement extends HTMLElement {}
    customElements.define('eva-test-element', TestElement);
  }
});

// Clean up after each test
afterEach(() => {
  document.body.innerHTML = '';
});

// Mock matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
  }),
});

// Mock IntersectionObserver
if (typeof IntersectionObserver === 'undefined') {
  (globalThis as any).IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    takeRecords() {
      return [];
    }
    unobserve() {}
  };
}

// Mock ResizeObserver
if (typeof ResizeObserver === 'undefined') {
  (globalThis as any).ResizeObserver = class ResizeObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  };
}
