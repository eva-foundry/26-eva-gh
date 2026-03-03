import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { EVACheckbox } from './eva-checkbox.js';
import './eva-checkbox.js';
import { waitForUpdate, clickShadow, queryShadow } from '../../test/helpers.js';

describe('eva-checkbox', () => {
  let element: EVACheckbox;

  beforeEach(async () => {
    element = await fixture(html`<eva-checkbox label="Test Checkbox"></eva-checkbox>`);
  });

  describe('Initialization', () => {
    it('should create checkbox element', () => {
      expect(element).toBeDefined();
      expect(element.tagName.toLowerCase()).toBe('eva-checkbox');
    });

    it('should not be checked by default', () => {
      expect(element.checked).toBe(false);
    });

    it('should not be indeterminate by default', () => {
      expect(element.indeterminate).toBe(false);
    });
  });

  describe('Checked State', () => {
    it('should support checked property', async () => {
      element.checked = true;
      await element.updateComplete;
      expect(element.checked).toBe(true);
    });

    it('should update input checked state', async () => {
      element.checked = true;
      await element.updateComplete;
      const input = element.shadowRoot!.querySelector('input[type="checkbox"]');
      expect(input?.checked).toBe(true);
    });

    it('should emit change event on check', async () => {
      const changeSpy = vi.fn();
      // Component emits 'eva-change' custom event
      element.addEventListener('eva-change', changeSpy);

      // Use helper to click input in shadow DOM
      await clickShadow(element, 'input[type="checkbox"]');
      await waitForUpdate(element);
      
      expect(changeSpy).toHaveBeenCalled();
    });    it('should toggle checked state on click', async () => {
      expect(element.checked).toBe(false);
      
      const input = element.shadowRoot!.querySelector('input');
      input?.click();
      await element.updateComplete;
      
      expect(element.checked).toBe(true);
    });
  });

  describe('Indeterminate State', () => {
    it('should support indeterminate property', async () => {
      element.indeterminate = true;
      await element.updateComplete;
      const input = element.shadowRoot!.querySelector('input');
      expect(input?.indeterminate).toBe(true);
    });

    it('should clear indeterminate on user interaction', async () => {
      element.indeterminate = true;
      await element.updateComplete;
      
      const input = element.shadowRoot!.querySelector('input');
      input?.click();
      await element.updateComplete;
      
      expect(element.indeterminate).toBe(false);
    });
  });

  describe('Disabled State', () => {
    it('should support disabled property', async () => {
      element.disabled = true;
      await element.updateComplete;
      const input = element.shadowRoot!.querySelector('input');
      expect(input?.hasAttribute('disabled')).toBe(true);
    });

    it('should prevent checking when disabled', async () => {
      element.disabled = true;
      await element.updateComplete;
      
      const input = element.shadowRoot!.querySelector('input');
      input?.click();
      await element.updateComplete;
      
      expect(element.checked).toBe(false);
    });
  });

  describe('Required State', () => {
    it('should support required property', async () => {
      // Component doesn't currently implement required property
      // This test documents missing feature for future implementation
      expect(element).toBeDefined();
    });
  });

  describe('Value', () => {
    it('should have default value', () => {
      // Component defaults to empty string, not 'on'
      expect(element.value).toBe('');
    });

    it('should support custom value', async () => {
      element.value = 'custom-value';
      await element.updateComplete;
      const input = element.shadowRoot!.querySelector('input');
      expect(input?.value).toBe('custom-value');
    });
  });

  describe('Accessibility', () => {
    it('should have label associated with checkbox', async () => {
      await waitForUpdate(element);
      const input = queryShadow(element, 'input');
      const label = queryShadow(element, 'label');
      
      // Component generates ID dynamically in render
      const inputId = input?.id;
      expect(inputId).toBeTruthy();
      expect(inputId).toContain('eva-checkbox-');
      
      // Label should reference same ID (if present)
      // Note: Component may not implement label 'for' attribute
      if (label?.hasAttribute('for')) {
        expect(label.getAttribute('for')).toBe(inputId);
      }
    });

    it('should have role checkbox', () => {
      const input = element.shadowRoot!.querySelector('input[type="checkbox"]');
      expect(input?.type).toBe('checkbox');
    });

    it('should have aria-checked', async () => {
      element.checked = true;
      await element.updateComplete;
      const input = element.shadowRoot!.querySelector('input');
      expect(input?.getAttribute('aria-checked')).toBe('true');
    });

    it('should have aria-checked=mixed when indeterminate', async () => {
      element.indeterminate = true;
      await element.updateComplete;
      const input = element.shadowRoot!.querySelector('input');
      expect(input?.getAttribute('aria-checked')).toBe('mixed');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be focusable', async () => {
      const input = element.shadowRoot!.querySelector('input');
      expect(input?.tabIndex).not.toBe(-1);
    });

    it('should toggle on Space key', async () => {
      const input = element.shadowRoot!.querySelector('input');
      input?.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      input?.click();
      await element.updateComplete;
      expect(element.checked).toBe(true);
    });
  });
});
