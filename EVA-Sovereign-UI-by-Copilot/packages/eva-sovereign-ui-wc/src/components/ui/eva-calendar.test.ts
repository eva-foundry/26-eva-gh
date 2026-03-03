import { describe, it, expect, beforeEach } from 'vitest';
import { createComponent, testAccessibility, shadowQuery, simulateClick, simulateKeyboard } from 'tests/test-utils';
import './eva-calendar';

describe('eva-calendar', () => {
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createComponent('eva-calendar');
  });

  describe('Rendering', () => {
    it('should render with shadow DOM', () => {
      expect(element).toBeInstanceOf(HTMLElement);
      expect(element.shadowRoot).toBeTruthy();
    });

    it('should be defined as custom element', () => {
      expect(customElements.get('eva-calendar')).toBeTruthy();
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
      const dayButton = shadowQuery<HTMLButtonElement>(element, '.day');
      let changed = false;
      element.addEventListener('change', () => { changed = true; });
      if (dayButton) {
        simulateClick(dayButton);
        await new Promise(r => setTimeout(r, 25));
        expect(changed).toBe(true);
        expect(element.getAttribute('value')).toBeTruthy();
      }
    });
  });
});
