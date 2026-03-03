// Vitest setup for Web Components testing
import '@testing-library/dom';
import { expect, afterEach, vi, beforeAll, afterAll } from 'vitest';

// Cleanup is handled by vitest automatically, no need to import from @testing-library

// Mock window.scrollTo (not implemented in JSDOM)
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
  configurable: true
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() { return []; }
  unobserve() {}
} as any;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;

// Mock navigation (JSDOM limitation)
const originalLocation = window.location;
delete (window as any).location;
window.location = {
  ...originalLocation,
  assign: vi.fn(),
  reload: vi.fn(),
  replace: vi.fn(),
} as any;

// Mock window.open (used by some components)
window.open = vi.fn();

// Mock HTMLElement.prototype.scrollIntoView
HTMLElement.prototype.scrollIntoView = vi.fn();

// Mock document.elementsFromPoint (used for hit testing)
if (!document.elementsFromPoint) {
  document.elementsFromPoint = vi.fn().mockReturnValue([]);
}

// Suppress console errors in tests (optional)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Not implemented: HTMLFormElement.prototype.submit') ||
       args[0].includes('Not implemented: navigation'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
