import { describe, it, expect, beforeEach } from 'vitest';
import '../../components/ui/eva-accordion';

describe('eva-accordion', () => {
  let accordion: HTMLElement;

  beforeEach(() => {
    accordion = document.createElement('eva-accordion');
    accordion.innerHTML = `
      <eva-accordion-item>
        <span slot="trigger">Section 1</span>
        <div>Content 1</div>
      </eva-accordion-item>
    `;
    document.body.appendChild(accordion);
  });

  describe('Rendering', () => {
    it('should render accordion element', () => {
      expect(accordion).toBeDefined();
      expect(accordion.shadowRoot).toBeDefined();
    });

    it('should start collapsed', () => {
      const item = accordion.querySelector('eva-accordion-item');
      expect(item?.hasAttribute('open')).toBe(false);
    });
  });

  describe('Interaction', () => {
    it('should toggle open state', () => {
      const item = accordion.querySelector('eva-accordion-item') as HTMLElement;
      const trigger = item.shadowRoot?.querySelector('.trigger') as HTMLElement;
      trigger.click();
      expect(item.hasAttribute('open')).toBe(true);
      trigger.click();
      expect(item.hasAttribute('open')).toBe(false);
    });

    it('should emit toggle event', () => {
      let toggled = false;
      accordion.addEventListener('accordion-toggle', () => {
        toggled = true;
      });
      const item = accordion.querySelector('eva-accordion-item') as HTMLElement;
      const trigger = item.shadowRoot?.querySelector('.trigger') as HTMLElement;
      trigger.click();
      expect(toggled).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const item = accordion.querySelector('eva-accordion-item') as HTMLElement;
      const trigger = item.shadowRoot?.querySelector('.trigger') as HTMLElement;
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
      expect(trigger.getAttribute('aria-controls')).toBeTruthy();
    });

    it('should update aria-expanded on toggle', () => {
      const item = accordion.querySelector('eva-accordion-item') as HTMLElement;
      const trigger = item.shadowRoot?.querySelector('.trigger') as HTMLElement;
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
      trigger.click();
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });

    it('should support keyboard activation', () => {
      const item = accordion.querySelector('eva-accordion-item') as HTMLElement;
      const trigger = item.shadowRoot?.querySelector('.trigger') as HTMLElement;
      trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      expect(item.hasAttribute('open')).toBe(true);
    });
  });
});
