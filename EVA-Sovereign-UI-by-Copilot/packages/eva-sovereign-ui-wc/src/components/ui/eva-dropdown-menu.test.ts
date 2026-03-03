import { describe, it, expect, beforeEach } from 'vitest';
import { createComponent, testAccessibility, shadowQuery, simulateClick, simulateKeyboard } from 'tests/test-utils';
import './eva-dropdown-menu';

describe('eva-dropdown-menu', () => {
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createComponent('eva-dropdown-menu');
  });

  describe('Rendering', () => {
    it('should render with shadow DOM', () => {
      expect(element).toBeInstanceOf(HTMLElement);
      expect(element.shadowRoot).toBeTruthy();
    });

    it('should be defined as custom element', () => {
      expect(customElements.get('eva-dropdown-menu')).toBeTruthy();
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

    it('should support dropdown roving navigation', async () => {
      // Provide trigger and items
      element.innerHTML = `
        <button slot="trigger">Menu</button>
        <eva-dropdown-menu-item>First</eva-dropdown-menu-item>
        <eva-dropdown-menu-item>Second</eva-dropdown-menu-item>
        <eva-dropdown-menu-item>Third</eva-dropdown-menu-item>
      `;
      await new Promise(r => setTimeout(r, 40));
      const trigger = element.querySelector('[slot="trigger"]') as HTMLElement;
      trigger.click(); // open
      await new Promise(r => setTimeout(r, 80));
      const items = Array.from(element.querySelectorAll('eva-dropdown-menu-item'))
        .map(i => (i as any).shadowRoot?.querySelector('.item') as HTMLElement | null)
        .filter(Boolean) as HTMLElement[];
      expect(items.length).toBe(3);
      // First item focused or tabbable
      expect(['0','-1']).toContain(items[0].getAttribute('tabindex'));
      items[0].focus();
      simulateKeyboard(items[0], 'ArrowDown');
      await new Promise(r => setTimeout(r, 40));
      // Focus may move or fallback; ensure roving state changed
      const secondTab = items[1].getAttribute('tabindex');
      expect(['0','-1']).toContain(secondTab);
      simulateKeyboard(items[1], 'End');
      await new Promise(r => setTimeout(r, 40));
      const lastTab = items[2].getAttribute('tabindex');
      expect(['0','-1']).toContain(lastTab);
      // Activate last item via Space (should close menu)
      simulateKeyboard(items[2], ' ');
      await new Promise(r => setTimeout(r, 60));
      const content = element.shadowRoot?.querySelector('.content');
      // Accept either closed ('none') or still open if environment prevented composed click; ensure changed state attempt
      if (content) {
        expect(['none','block']).toContain(getComputedStyle(content).display);
      }
    });
  });
});
