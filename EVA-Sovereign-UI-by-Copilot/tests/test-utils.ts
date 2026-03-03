import { expect } from 'vitest';
import axe from 'axe-core';

/**
 * Wait for a custom element to be defined and upgraded
 */
export async function waitForElement(tagName: string): Promise<void> {
  await customElements.whenDefined(tagName);
  await new Promise(resolve => setTimeout(resolve, 0));
}

/**
 * Create a component and wait for it to be ready
 */
export async function createComponent<T extends HTMLElement>(
  tagName: string,
  attributes: Record<string, string> = {}
): Promise<T> {
  const element = document.createElement(tagName) as T;
  
  // Set attributes
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  
  // Append to document
  document.body.appendChild(element);
  
  // Wait for upgrade
  await waitForElement(tagName);
  
  // Wait for rendering
  await new Promise(resolve => setTimeout(resolve, 0));
  
  return element;
}

/**
 * Run axe accessibility tests on an element
 * Validates WCAG 2.2 Level AA compliance
 */
export async function testAccessibility(
  element: HTMLElement,
  options: {
    rules?: Record<string, { enabled: boolean }>;
    includedImpacts?: Array<'minor' | 'moderate' | 'serious' | 'critical'>;
  } = {}
): Promise<void> {
  const results = await axe.run(element, {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag22aa', 'best-practice'],
    },
    rules: options.rules || {},
  });

  // Filter violations by impact level
  const includedImpacts = options.includedImpacts || ['moderate', 'serious', 'critical'];
  const violations = results.violations.filter(violation =>
    includedImpacts.includes(violation.impact as any)
  );

  if (violations.length > 0) {
    const violationMessages = violations.map(violation => {
      const nodes = violation.nodes.map(node => {
        return `  - ${node.html}\n    ${node.failureSummary}`;
      }).join('\n');

      return `
${violation.id} (${violation.impact}): ${violation.description}
Help: ${violation.helpUrl}
Affected nodes:
${nodes}
`;
    }).join('\n');

    throw new Error(`Accessibility violations found:\n${violationMessages}`);
  }

  expect(violations).toHaveLength(0);
}

/**
 * Simulate keyboard event
 */
export function simulateKeyboard(
  element: HTMLElement,
  key: string,
  eventType: 'keydown' | 'keyup' | 'keypress' = 'keydown'
): void {
  const event = new KeyboardEvent(eventType, {
    key,
    bubbles: true,
    cancelable: true,
  });
  element.dispatchEvent(event);
}

/**
 * Simulate mouse click
 */
export function simulateClick(element: HTMLElement): void {
  const event = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  });
  element.dispatchEvent(event);
}

/**
 * Wait for event to be emitted
 */
export function waitForEvent<T = any>(
  element: HTMLElement,
  eventName: string,
  timeout = 1000
): Promise<CustomEvent<T>> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(`Event ${eventName} not emitted within ${timeout}ms`));
    }, timeout);

    element.addEventListener(
      eventName,
      (event: Event) => {
        clearTimeout(timeoutId);
        resolve(event as CustomEvent<T>);
      },
      { once: true }
    );
  });
}

/**
 * Get shadow root safely
 */
export function getShadowRoot(element: HTMLElement): ShadowRoot {
  const shadowRoot = element.shadowRoot;
  if (!shadowRoot) {
    throw new Error('Element does not have a shadow root');
  }
  return shadowRoot;
}

/**
 * Query selector within shadow root
 */
export function shadowQuery<T extends Element>(
  element: HTMLElement,
  selector: string
): T | null {
  const shadowRoot = getShadowRoot(element);
  return shadowRoot.querySelector<T>(selector);
}

/**
 * Query all selectors within shadow root
 */
export function shadowQueryAll<T extends Element>(
  element: HTMLElement,
  selector: string
): NodeListOf<T> {
  const shadowRoot = getShadowRoot(element);
  return shadowRoot.querySelectorAll<T>(selector);
}
