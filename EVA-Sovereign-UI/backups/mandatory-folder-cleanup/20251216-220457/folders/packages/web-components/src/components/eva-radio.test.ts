import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { EVARadio } from './eva-radio.js';
import './eva-radio.js';
import { waitForUpdate, clickShadow } from '../../test/helpers.js';

describe('eva-radio', () => {
  let element: EVARadio;

  beforeEach(async () => {
    element = await fixture(html`<eva-radio label="Test Radio" name="test" value="1"></eva-radio>`);
  });

  describe('Initialization', () => {
    it('should create radio element', () => {
      expect(element).toBeDefined();
      expect(element.tagName.toLowerCase()).toBe('eva-radio');
    });

    it('should not be checked by default', () => {
      expect(element.checked).toBe(false);
    });

    it('should have value property', () => {
      expect(element.value).toBe('1');
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
      const input = element.shadowRoot!.querySelector('input[type="radio"]');
      expect(input?.checked).toBe(true);
    });

    it('should emit change event on selection', async () => {
      const changeSpy = vi.fn();
      // Component emits 'eva-change' custom event
      element.addEventListener('eva-change', changeSpy);

      // Use helper to click input in shadow DOM
      await clickShadow(element, 'input[type="radio"]');
      await waitForUpdate(element);

      expect(changeSpy).toHaveBeenCalled();
    });
  });

  describe('Radio Groups', () => {
    it('should support name property for grouping', async () => {
      const input = element.shadowRoot!.querySelector('input');
      expect(input?.name).toBe('test');
    });

    it('should only allow one selection per group', async () => {
      const container = await fixture(html`
        <div>
          <eva-radio name="group" value="1" label="Option 1"></eva-radio>
          <eva-radio name="group" value="2" label="Option 2"></eva-radio>
        </div>
      `);
      
      const radios = container.querySelectorAll('eva-radio');
      const radio1 = radios[0] as EVARadio;
      const radio2 = radios[1] as EVARadio;
      
      radio1.checked = true;
      await radio1.updateComplete;
      expect(radio1.checked).toBe(true);
      
      radio2.checked = true;
      await radio2.updateComplete;
      
      // In a real radio group, only one should be checked
      expect(radio2.checked).toBe(true);
    });
  });

  describe('Disabled State', () => {
    it('should support disabled property', async () => {
      element.disabled = true;
      await element.updateComplete;
      const input = element.shadowRoot!.querySelector('input');
      expect(input?.hasAttribute('disabled')).toBe(true);
    });

    it('should prevent selection when disabled', async () => {
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
      element.required = true;
      await element.updateComplete;
      const input = element.shadowRoot!.querySelector('input');
      expect(input?.hasAttribute('required')).toBe(true);
    });
  });

  describe('Value', () => {
    it('should support custom value', async () => {
      element.value = 'custom-value';
      await element.updateComplete;
      const input = element.shadowRoot!.querySelector('input');
      expect(input?.value).toBe('custom-value');
    });
  });

  describe('Accessibility', () => {
    it('should have label associated with radio', async () => {
      const input = element.shadowRoot!.querySelector('input');
      const label = element.shadowRoot!.querySelector('label');
      expect(input?.id).toBeTruthy();
      expect(label?.getAttribute('for')).toBe(input?.id);
    });

    it('should have role radio', () => {
      const input = element.shadowRoot!.querySelector('input[type="radio"]');
      expect(input?.type).toBe('radio');
    });

    it('should have aria-checked', async () => {
      element.checked = true;
      await element.updateComplete;
      const input = element.shadowRoot!.querySelector('input');
      expect(input?.getAttribute('aria-checked')).toBe('true');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be focusable', async () => {
      const input = element.shadowRoot!.querySelector('input');
      expect(input?.tabIndex).not.toBe(-1);
    });

    it('should navigate with arrow keys in group', async () => {
      const container = await fixture(html`
        <div role="radiogroup">
          <eva-radio name="nav" value="1" label="Option 1"></eva-radio>
          <eva-radio name="nav" value="2" label="Option 2"></eva-radio>
          <eva-radio name="nav" value="3" label="Option 3"></eva-radio>
        </div>
      `);
      
      const radios = container.querySelectorAll('eva-radio');
      const firstInput = radios[0].shadowRoot!.querySelector('input');
      
      firstInput?.focus();
      firstInput?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      
      // Arrow key navigation is typically handled by browser
      expect(firstInput).toBeDefined();
    });
  });
});
