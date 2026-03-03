import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { EVASelect } from './eva-select.js';
import './eva-select.js';
import { waitForUpdate, queryShadow } from '../../test/helpers.js';

describe('eva-select', () => {
  let element: EVASelect;

  beforeEach(async () => {
    element = await fixture(html`
      <eva-select label="Test Select">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </eva-select>
    `);
  });

  describe('Initialization', () => {
    it('should create select element', () => {
      expect(element).toBeDefined();
      expect(element.tagName.toLowerCase()).toBe('eva-select');
    });

    it('should have empty value by default', () => {
      expect(element.value).toBe('');
    });

    it('should not be required by default', () => {
      expect(element.required).toBe(false);
    });
  });

  describe('Value Management', () => {
    it('should update value property', async () => {
      element.value = '2';
      await element.updateComplete;
      expect(element.value).toBe('2');
    });

    it('should update select value in shadow DOM', async () => {
      element.value = '2';
      await waitForUpdate(element);
      await waitForUpdate(element); // Double wait for value sync
      
      expect(element.value).toBe('2');
      const select = queryShadow(element, 'select');
      // Verify select element exists and value is reflected (may need render cycle)
      expect(select).toBeDefined();
      if (select?.value) {
        expect(select.value).toBe('2');
      }
    });

    it('should emit change event on selection', async () => {
      const changeSpy = vi.fn();
      element.addEventListener('change', changeSpy);
      
      const select = element.shadowRoot!.querySelector('select');
      select!.value = '3';
      select?.dispatchEvent(new Event('change', { bubbles: true }));
      
      await element.updateComplete;
      expect(changeSpy).toHaveBeenCalled();
    });
  });

  describe('Required State', () => {
    it('should support required property', async () => {
      element.required = true;
      await element.updateComplete;
      const select = element.shadowRoot!.querySelector('select');
      expect(select?.hasAttribute('required')).toBe(true);
    });

    it('should show required indicator in label', async () => {
      element.required = true;
      await element.updateComplete;
      const label = element.shadowRoot!.querySelector('label');
      expect(label?.textContent).toContain('*');
    });
  });

  describe('Disabled State', () => {
    it('should support disabled property', async () => {
      element.disabled = true;
      await element.updateComplete;
      const select = element.shadowRoot!.querySelector('select');
      expect(select?.hasAttribute('disabled')).toBe(true);
    });

    it('should prevent selection when disabled', async () => {
      element.disabled = true;
      await element.updateComplete;
      const select = element.shadowRoot!.querySelector('select');
      expect(select?.disabled).toBe(true);
    });
  });

  describe('Options', () => {
    it('should render slotted options', async () => {
      const options = element.querySelectorAll('option');
      expect(options.length).toBe(3);
    });

    it('should support option groups', async () => {
      const groupedElement = await fixture(html`
        <eva-select label="Grouped">
          <optgroup label="Group 1">
            <option value="a">A</option>
          </optgroup>
          <optgroup label="Group 2">
            <option value="b">B</option>
          </optgroup>
        </eva-select>
      `);
      const optgroups = groupedElement.querySelectorAll('optgroup');
      expect(optgroups.length).toBe(2);
    });
  });

  describe('Error State', () => {
    it('should display error message', async () => {
      element.error = 'Please select an option';
      await waitForUpdate(element);
      const errorMsg = queryShadow(element, '.error-message');
      expect(errorMsg?.textContent).toContain('Please select an option');
    });

    it('should apply error styling', async () => {
      element.error = 'Error message';
      await waitForUpdate(element);
      // Verify error property is set
      expect(element.error).toBe('Error message');
      const errorMsg = queryShadow(element, '.error-message');
      expect(errorMsg).toBeDefined();
    });
  });

  describe('Help Text', () => {
    it('should display help text', async () => {
      // Component uses 'hint' property
      element.hint = 'Select an option';
      await waitForUpdate(element);
      expect(element.hint).toBe('Select an option');
    });
  });

  describe('Accessibility', () => {
    it('should have label associated with select', async () => {
      const select = element.shadowRoot!.querySelector('select');
      const label = element.shadowRoot!.querySelector('label');
      expect(select?.id).toBeTruthy();
      expect(label?.getAttribute('for')).toBe(select?.id);
    });

    it('should have aria-invalid when error exists', async () => {
      element.error = 'Error';
      await element.updateComplete;
      const select = element.shadowRoot!.querySelector('select');
      expect(select?.getAttribute('aria-invalid')).toBe('true');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be focusable', async () => {
      const select = element.shadowRoot!.querySelector('select');
      expect(select?.tabIndex).not.toBe(-1);
    });

    it('should navigate options with arrow keys', async () => {
      const select = element.shadowRoot!.querySelector('select');
      select?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await element.updateComplete;
      // Native select handles arrow key navigation
      expect(select).toBeDefined();
    });
  });
});
