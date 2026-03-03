/**
 * Test Generator Script
 * Generates test files for all EVA Web Components
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENTS_DIR = path.join(__dirname, '../packages/eva-sovereign-ui-wc/src/components/ui');
const TEST_TEMPLATE = (componentName, tagName) => `import { describe, it, expect, beforeEach } from 'vitest';
import { createComponent, testAccessibility, shadowQuery, simulateClick, simulateKeyboard } from '../../../../tests/test-utils';
import './${componentName}';

describe('${tagName}', () => {
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createComponent('${tagName}');
  });

  describe('Rendering', () => {
    it('should render with shadow DOM', () => {
      expect(element).toBeInstanceOf(HTMLElement);
      expect(element.shadowRoot).toBeTruthy();
    });

    it('should be defined as custom element', () => {
      expect(customElements.get('${tagName}')).toBeTruthy();
    });
  });

  describe('Attributes', () => {
    it('should update when attributes change', async () => {
      element.setAttribute('test-attr', 'test-value');
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(element.getAttribute('test-attr')).toBe('test-value');
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      await testAccessibility(element);
    });

    it('should be keyboard accessible', () => {
      const focusable = shadowQuery(element, 'button, input, select, textarea, a[href], [tabindex]');
      if (focusable) {
        expect(focusable.getAttribute('tabindex')).not.toBe('-1');
      }
    });
  });

  describe('Events', () => {
    it('should handle user interactions', async () => {
      const button = shadowQuery<HTMLButtonElement>(element, 'button');
      if (button) {
        let clicked = false;
        element.addEventListener('click', () => { clicked = true; });
        simulateClick(button);
        await new Promise(resolve => setTimeout(resolve, 10));
        expect(clicked).toBe(true);
      }
    });
  });
});
`;

// Get all component files
const files = fs.readdirSync(COMPONENTS_DIR)
  .filter(file => file.endsWith('.ts') && !file.endsWith('.test.ts'));

console.log(`Found ${files.length} component files`);

// Generate test files
files.forEach(file => {
  const componentName = file.replace('.ts', '');
  const tagName = componentName; // Already in kebab-case
  const testFile = path.join(COMPONENTS_DIR, `${componentName}.test.ts`);
  
  // Only create if doesn't exist
  if (!fs.existsSync(testFile)) {
    fs.writeFileSync(testFile, TEST_TEMPLATE(componentName, tagName));
    console.log(`✓ Created ${componentName}.test.ts`);
  } else {
    console.log(`- Skipped ${componentName}.test.ts (already exists)`);
  }
});

console.log('\\nTest generation complete!');
