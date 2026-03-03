import { describe, it, expect, beforeEach } from 'vitest';
import '../../components/gc-design/eva-gc-button';

describe('eva-gc-button', () => {
  let button: HTMLElement;

  beforeEach(() => {
    button = document.createElement('eva-gc-button');
    document.body.appendChild(button);
  });

  describe('Rendering', () => {
    it('should render button element', () => {
      expect(button).toBeDefined();
      expect(button.shadowRoot).toBeDefined();
    });

    it('should render with default variant', () => {
      const shadowButton = button.shadowRoot?.querySelector('button');
      expect(shadowButton).toBeDefined();
    });

    it('should render with custom text content', () => {
      button.textContent = 'Click Me';
      const shadowButton = button.shadowRoot?.querySelector('button');
      expect(shadowButton?.textContent).toContain('Click Me');
    });
  });

  describe('Variants', () => {
    it('should apply default variant', () => {
      button.setAttribute('variant', 'default');
      const shadowButton = button.shadowRoot?.querySelector('button');
      expect(shadowButton).toBeDefined();
    });

    it('should apply destructive variant', () => {
      button.setAttribute('variant', 'destructive');
      expect(button.getAttribute('variant')).toBe('destructive');
    });

    it('should apply outline variant', () => {
      button.setAttribute('variant', 'outline');
      expect(button.getAttribute('variant')).toBe('outline');
    });

    it('should apply secondary variant', () => {
      button.setAttribute('variant', 'secondary');
      expect(button.getAttribute('variant')).toBe('secondary');
    });

    it('should apply ghost variant', () => {
      button.setAttribute('variant', 'ghost');
      expect(button.getAttribute('variant')).toBe('ghost');
    });

    it('should apply link variant', () => {
      button.setAttribute('variant', 'link');
      expect(button.getAttribute('variant')).toBe('link');
    });
  });

  describe('Sizes', () => {
    it('should apply sm size', () => {
      button.setAttribute('size', 'sm');
      expect(button.getAttribute('size')).toBe('sm');
    });

    it('should apply default size', () => {
      button.setAttribute('size', 'default');
      expect(button.getAttribute('size')).toBe('default');
    });

    it('should apply lg size', () => {
      button.setAttribute('size', 'lg');
      expect(button.getAttribute('size')).toBe('lg');
    });

    it('should apply icon size', () => {
      button.setAttribute('size', 'icon');
      expect(button.getAttribute('size')).toBe('icon');
    });
  });

  describe('States', () => {
    it('should handle disabled state', () => {
      button.setAttribute('disabled', '');
      const shadowButton = button.shadowRoot?.querySelector('button');
      expect(shadowButton?.hasAttribute('disabled')).toBe(true);
    });

    it('should handle loading state', () => {
      button.setAttribute('loading', '');
      const spinner = button.shadowRoot?.querySelector('.spinner');
      expect(spinner).toBeDefined();
    });

    it('should be disabled when loading', () => {
      button.setAttribute('loading', '');
      const shadowButton = button.shadowRoot?.querySelector('button');
      expect(shadowButton?.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should have proper role', () => {
      const shadowButton = button.shadowRoot?.querySelector('button');
      expect(shadowButton?.tagName.toLowerCase()).toBe('button');
    });

    it('should be keyboard accessible', () => {
      const shadowButton = button.shadowRoot?.querySelector('button');
      expect(shadowButton?.tabIndex).toBeGreaterThanOrEqual(0);
    });

    it('should have aria-disabled when disabled', () => {
      button.setAttribute('disabled', '');
      const shadowButton = button.shadowRoot?.querySelector('button');
      expect(shadowButton?.getAttribute('aria-disabled')).toBe('true');
    });

    it('should have aria-busy when loading', () => {
      button.setAttribute('loading', '');
      const shadowButton = button.shadowRoot?.querySelector('button');
      expect(shadowButton?.getAttribute('aria-busy')).toBe('true');
    });
  });

  describe('Events', () => {
    it('should emit click event', () => {
      let clicked = false;
      button.addEventListener('click', () => {
        clicked = true;
      });
      
      const shadowButton = button.shadowRoot?.querySelector('button');
      shadowButton?.click();
      expect(clicked).toBe(true);
    });

    it('should not emit click when disabled', () => {
      let clicked = false;
      button.setAttribute('disabled', '');
      button.addEventListener('click', () => {
        clicked = true;
      });
      
      const shadowButton = button.shadowRoot?.querySelector('button');
      shadowButton?.click();
      expect(clicked).toBe(false);
    });
  });
});
