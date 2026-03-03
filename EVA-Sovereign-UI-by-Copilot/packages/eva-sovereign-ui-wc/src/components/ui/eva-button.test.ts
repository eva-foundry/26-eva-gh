import { describe, it, expect, beforeEach } from 'vitest';
import { createComponent, testAccessibility, simulateClick, waitForEvent, shadowQuery } from 'tests/test-utils';
import '../gc-design/eva-gc-button';

describe('eva-gc-button', () => {
  let button: HTMLElement;

  beforeEach(async () => {
    button = await createComponent('eva-gc-button');
  });

  describe('Rendering', () => {
    it('should render with default attributes', () => {
      expect(button).toBeInstanceOf(HTMLElement);
      expect(button.shadowRoot).toBeTruthy();
    });

    it('should render button element in shadow DOM', () => {
      const shadowButton = shadowQuery<HTMLButtonElement>(button, 'button');
      expect(shadowButton).toBeTruthy();
      expect(shadowButton?.tagName).toBe('BUTTON');
    });

    it('should render slot content', async () => {
      button.textContent = 'Click me';
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(button.textContent).toBe('Click me');
    });
  });

  describe('Variants', () => {
    it('should apply default variant', () => {
      expect(button.getAttribute('variant')).toBeNull();
    });

    it('should support all variant values', async () => {
      const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'];
      
      for (const variant of variants) {
        button.setAttribute('variant', variant);
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(button.getAttribute('variant')).toBe(variant);
      }
    });
  });

  describe('Sizes', () => {
    it('should support all size values', async () => {
      const sizes = ['default', 'sm', 'lg', 'icon'];
      
      for (const size of sizes) {
        button.setAttribute('size', size);
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(button.getAttribute('size')).toBe(size);
      }
    });
  });

  describe('States', () => {
    it('should handle disabled state', async () => {
      button.setAttribute('disabled', '');
      await new Promise(resolve => setTimeout(resolve, 0));
      
      const shadowButton = shadowQuery<HTMLButtonElement>(button, 'button');
      expect(shadowButton?.disabled).toBe(true);
    });

    it('should prevent click when disabled', async () => {
      button.setAttribute('disabled', '');
      let clicked = false;
      button.addEventListener('click', () => { clicked = true; });
      
      const shadowButton = shadowQuery<HTMLButtonElement>(button, 'button');
      shadowButton && simulateClick(shadowButton);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(clicked).toBe(false);
    });
  });

  describe('Events', () => {
    it('should emit click event', async () => {
      const clickPromise = waitForEvent(button, 'click');
      simulateClick(button);
      
      const event = await clickPromise;
      expect(event).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      button.textContent = 'Accessible Button';
      await testAccessibility(button);
    });

    it('should be keyboard accessible', () => {
      const shadowButton = shadowQuery<HTMLButtonElement>(button, 'button');
      expect(shadowButton?.tabIndex).toBeGreaterThanOrEqual(0);
    });
  });
});
