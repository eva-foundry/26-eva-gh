import { describe, it, expect, beforeEach } from 'vitest';
import { createComponent, simulateKeyboard } from 'tests/test-utils';
import './eva-accordion';

describe('eva-accordion', () => {
  let accordion: HTMLElement;

  beforeEach(async () => {
    accordion = await createComponent('eva-accordion');
    accordion.innerHTML = `
      <eva-accordion-item>
        <span slot="trigger">Item 1</span>
        <div>Content 1</div>
      </eva-accordion-item>
      <eva-accordion-item>
        <span slot="trigger">Item 2</span>
        <div>Content 2</div>
      </eva-accordion-item>
    `;
    await new Promise(r => setTimeout(r, 0));
  });

  describe('Rendering', () => {
    it('should render with shadow DOM', () => {
      expect(accordion.shadowRoot).toBeTruthy();
    });

    it('should support multiple items', async () => {
      const items = accordion.querySelectorAll('eva-accordion-item');
      expect(items.length).toBe(2);
    });
  });

  describe('Interaction', () => {
    it('should expand/collapse on click', async () => {
      const firstItem = accordion.querySelector('eva-accordion-item') as HTMLElement;
      const trigger = firstItem.shadowRoot?.querySelector('.trigger') as HTMLElement;
      trigger.click();
      await new Promise(r => setTimeout(r, 50));
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
      trigger.click();
      await new Promise(r => setTimeout(r, 50));
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });

    it('should support keyboard activation', async () => {
      const firstItem = accordion.querySelector('eva-accordion-item') as HTMLElement;
      const trigger = firstItem.shadowRoot?.querySelector('.trigger') as HTMLElement;
      simulateKeyboard(trigger, 'Enter');
      await new Promise(r => setTimeout(r, 50));
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', async () => {
      const firstItem = accordion.querySelector('eva-accordion-item') as HTMLElement;
      const trigger = firstItem.shadowRoot?.querySelector('.trigger') as HTMLElement;
      expect(trigger.getAttribute('aria-controls')).toBeTruthy();
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
      trigger.click();
      await new Promise(r => setTimeout(r, 50));
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });
  });
});
