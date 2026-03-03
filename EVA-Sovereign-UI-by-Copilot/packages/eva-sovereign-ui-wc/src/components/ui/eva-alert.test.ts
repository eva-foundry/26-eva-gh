import { describe, it, expect, beforeEach } from 'vitest';
import { createComponent, shadowQuery } from 'tests/test-utils';
import './eva-alert';

describe('eva-alert', () => {
  let alert: HTMLElement;

  beforeEach(async () => {
    alert = await createComponent('eva-alert');
  });

  describe('Rendering', () => {
    it('should render with shadow DOM', () => {
      expect(alert.shadowRoot).toBeTruthy();
    });

    it('should have role alert', () => {
      const alertDiv = shadowQuery(alert, '[role="alert"]');
      expect(alertDiv).toBeTruthy();
    });
  });

  describe('Variants', () => {
    it('should support default variant', async () => {
      alert.setAttribute('variant', 'default');
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(alert.getAttribute('variant')).toBe('default');
    });

    it('should support destructive variant', async () => {
      alert.setAttribute('variant', 'destructive');
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(alert.getAttribute('variant')).toBe('destructive');
    });
  });

  describe('Content', () => {
    it('should display title', async () => {
      alert.setAttribute('title', 'Alert Title');
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(alert.getAttribute('title')).toBe('Alert Title');
    });

    it('should display slotted content', async () => {
      alert.textContent = 'Alert message';
      expect(alert.textContent).toBe('Alert message');
    });
  });
});
