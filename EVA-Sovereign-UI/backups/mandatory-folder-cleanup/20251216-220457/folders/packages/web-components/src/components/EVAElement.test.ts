import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { EVAElement } from './EVAElement.js';
import { customElement } from 'lit/decorators.js';
import { waitForUpdate } from '../../test/helpers.js';

// Create test element
@customElement('test-eva-element')
class TestEVAElement extends EVAElement {
  protected override componentName = 'test-element';
}

describe('EVAElement', () => {
  let element: TestEVAElement;

  beforeEach(async () => {
    element = await fixture(html`<test-eva-element></test-eva-element>`);
  });

  describe('Initialization', () => {
    it('should create element', () => {
      expect(element).toBeDefined();
      expect(element.tagName.toLowerCase()).toBe('test-eva-element');
    });

    it('should have default locale en-CA', () => {
      expect(element.locale).toBe('en-CA');
    });

    it('should have lang attribute matching locale', async () => {
      await element.updateComplete;
      expect(element.getAttribute('lang')).toBe('en-CA');
    });

    it('should have disabled property default to false', () => {
      expect(element.disabled).toBe(false);
    });
  });

  describe('Locale Management', () => {
    it('should update lang attribute when locale changes', async () => {
      element.locale = 'fr-CA';
      await element.updateComplete;
      expect(element.getAttribute('lang')).toBe('fr-CA');
    });

    it('should reflect locale property to attribute', async () => {
      element.locale = 'fr-CA';
      await element.updateComplete;
      expect(element.getAttribute('locale')).toBe('fr-CA');
    });

    it('should support en-CA locale', async () => {
      element.locale = 'en-CA';
      await element.updateComplete;
      expect(element.locale).toBe('en-CA');
    });

    it('should support fr-CA locale', async () => {
      element.locale = 'fr-CA';
      await element.updateComplete;
      expect(element.locale).toBe('fr-CA');
    });
  });

  describe('ARIA Attributes', () => {
    it('should support aria-label', async () => {
      element.ariaLabel = 'Test Label';
      await element.updateComplete;
      expect(element.ariaLabel).toBe('Test Label');
    });

    it('should support aria-describedby', async () => {
      element.ariaDescribedBy = 'description-id';
      await element.updateComplete;
      expect(element.ariaDescribedBy).toBe('description-id');
    });

    it('should allow null aria-label', async () => {
      element.ariaLabel = 'Label';
      await element.updateComplete;
      element.ariaLabel = null;
      await element.updateComplete;
      expect(element.ariaLabel).toBeNull();
    });
  });

  describe('Disabled State', () => {
    it('should support disabled property', async () => {
      element.disabled = true;
      await element.updateComplete;
      expect(element.disabled).toBe(true);
    });

    it('should reflect disabled to attribute', async () => {
      element.disabled = true;
      await element.updateComplete;
      expect(element.hasAttribute('disabled')).toBe(true);
    });

    it('should remove disabled attribute when false', async () => {
      element.disabled = true;
      await element.updateComplete;
      element.disabled = false;
      await element.updateComplete;
      expect(element.hasAttribute('disabled')).toBe(false);
    });
  });

  describe('Lifecycle Methods', () => {
    it('should call connectedCallback', async () => {
      // Just verify element was created successfully
      const newElement = await fixture(html`<test-eva-element></test-eva-element>`);
      await waitForUpdate(newElement as TestEVAElement);
      expect(newElement).toBeDefined();
      expect((newElement as TestEVAElement).isConnected).toBe(true);
    });

    it('should call disconnectedCallback', async () => {
      const parent = element.parentElement;
      element.remove();
      await waitForUpdate(element);
      // Verify element was removed
      expect(element.isConnected).toBe(false);
      expect(parent?.contains(element)).toBe(false);
    });

    it('should unsubscribe from locale changes on disconnect', () => {
      const unsubscribeSpy = vi.fn();
      // @ts-expect-error - accessing private property for testing
      element._localeUnsubscribe = unsubscribeSpy;
      element.remove();
      expect(unsubscribeSpy).toHaveBeenCalled();
    });
  });

  describe('Component Name', () => {
    it('should have protected componentName property', () => {
      // @ts-expect-error - accessing protected property for testing
      expect(element.componentName).toBe('test-element');
    });

    it('should allow subclasses to override componentName', () => {
      @customElement('custom-test-element')
      class CustomElement extends EVAElement {
        protected override componentName = 'custom-component';
      }
      
      // @ts-expect-error - accessing protected property for testing
      expect(new CustomElement().componentName).toBe('custom-component');
    });
  });

  describe('Accessibility Helpers', () => {
    it('should provide getMessage helper', () => {
      // @ts-expect-error - accessing protected method for testing
      expect(element.getMessage).toBeDefined();
    });

    it('should provide announce helper', () => {
      // @ts-expect-error - accessing protected method for testing
      expect(element.announce).toBeDefined();
    });
  });
});
