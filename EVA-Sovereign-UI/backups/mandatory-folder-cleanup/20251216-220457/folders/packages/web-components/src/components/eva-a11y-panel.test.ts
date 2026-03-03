import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { EVAA11yPanel } from './eva-a11y-panel.js';
import './eva-a11y-panel.js';

describe('eva-a11y-panel', () => {
  let element: EVAA11yPanel;

  beforeEach(async () => {
    // Clear localStorage before each test
    localStorage.clear();
    element = await fixture(html`<eva-a11y-panel></eva-a11y-panel>`);
  });

  afterEach(() => {
    // Clean up localStorage
    localStorage.clear();
  });

  describe('Initialization', () => {
    it('should create element', () => {
      expect(element).toBeDefined();
      expect(element.tagName.toLowerCase()).toBe('eva-a11y-panel');
    });

    it('should have default showActions as true', () => {
      expect(element.showActions).toBe(true);
    });

    it('should have default immediate as true', () => {
      expect(element.immediate).toBe(true);
    });

    it('should have default storageKey', () => {
      expect(element.storageKey).toBe('gc-a11y-settings');
    });
  });

  describe('Font Size Control', () => {
    it('should render font size slider', () => {
      const slider = element.shadowRoot!.querySelector('input[type="range"]') as HTMLInputElement;
      expect(slider).toBeDefined();
      expect(slider.min).toBe('75');
      expect(slider.max).toBe('200');
      expect(slider.step).toBe('25');
    });

    it('should emit a11y-change event when font size changes', async () => {
      const changeHandler = vi.fn();
      element.addEventListener('a11y-change', changeHandler);
      
      const slider = element.shadowRoot!.querySelector('input[type="range"]') as HTMLInputElement;
      slider.value = '125';
      slider.dispatchEvent(new Event('input', { bubbles: true }));
      await element.updateComplete;
      
      expect(changeHandler).toHaveBeenCalled();
      const event = changeHandler.mock.calls[0][0];
      expect(event.detail.changes.fontSize).toBe(125);
    });

    it('should update CSS custom property when immediate is true', async () => {
      element.immediate = true;
      await element.updateComplete;
      
      const slider = element.shadowRoot!.querySelector('input[type="range"]') as HTMLInputElement;
      slider.value = '150';
      slider.dispatchEvent(new Event('input', { bubbles: true }));
      await element.updateComplete;
      
      const fontScale = document.documentElement.style.getPropertyValue('--gc-a11y-font-scale');
      expect(fontScale).toBe('1.5');
    });
  });

  describe('Contrast Mode Control', () => {
    it('should render contrast radio buttons', () => {
      const radios = element.shadowRoot!.querySelectorAll('input[type="radio"][name="contrast"]');
      expect(radios.length).toBe(2);
    });

    it('should have AA selected by default', () => {
      const aaRadio = element.shadowRoot!.querySelector('input[value="aa"]') as HTMLInputElement;
      expect(aaRadio.checked).toBe(true);
    });

    it('should emit a11y-change event when contrast changes', async () => {
      const changeHandler = vi.fn();
      element.addEventListener('a11y-change', changeHandler);
      
      const aaaRadio = element.shadowRoot!.querySelector('input[value="aaa"]') as HTMLInputElement;
      aaaRadio.checked = true;
      aaaRadio.dispatchEvent(new Event('change', { bubbles: true }));
      await element.updateComplete;
      
      expect(changeHandler).toHaveBeenCalled();
      const event = changeHandler.mock.calls[0][0];
      expect(event.detail.changes.contrast).toBe('aaa');
    });

    it('should update data attribute when immediate is true', async () => {
      element.immediate = true;
      await element.updateComplete;
      
      const aaaRadio = element.shadowRoot!.querySelector('input[value="aaa"]') as HTMLInputElement;
      aaaRadio.checked = true;
      aaaRadio.dispatchEvent(new Event('change', { bubbles: true }));
      await element.updateComplete;
      
      const contrastMode = document.documentElement.getAttribute('data-contrast');
      expect(contrastMode).toBe('aaa');
    });
  });

  describe('Animations Control', () => {
    it('should render animations radio buttons', () => {
      const radios = element.shadowRoot!.querySelectorAll('input[type="radio"][name="animations"]');
      expect(radios.length).toBe(3);
    });

    it('should have "on" selected by default', () => {
      const onRadio = element.shadowRoot!.querySelector('input[value="on"]') as HTMLInputElement;
      expect(onRadio.checked).toBe(true);
    });

    it('should emit a11y-change event when animations changes', async () => {
      const changeHandler = vi.fn();
      element.addEventListener('a11y-change', changeHandler);
      
      const reducedRadio = element.shadowRoot!.querySelector('input[value="reduced"]') as HTMLInputElement;
      reducedRadio.checked = true;
      reducedRadio.dispatchEvent(new Event('change', { bubbles: true }));
      await element.updateComplete;
      
      expect(changeHandler).toHaveBeenCalled();
      const event = changeHandler.mock.calls[0][0];
      expect(event.detail.changes.animations).toBe('reduced');
    });

    it('should update data attribute when immediate is true', async () => {
      element.immediate = true;
      await element.updateComplete;
      
      const offRadio = element.shadowRoot!.querySelector('input[value="off"]') as HTMLInputElement;
      offRadio.checked = true;
      offRadio.dispatchEvent(new Event('change', { bubbles: true }));
      await element.updateComplete;
      
      const animationsMode = document.documentElement.getAttribute('data-animations');
      expect(animationsMode).toBe('off');
    });
  });

  describe('Text Spacing Controls', () => {
    it('should render line height slider', () => {
      const sliders = element.shadowRoot!.querySelectorAll('input[type="range"]');
      const lineHeightSlider = Array.from(sliders).find(
        slider => (slider as HTMLInputElement).min === '1.0'
      ) as HTMLInputElement;
      
      expect(lineHeightSlider).toBeDefined();
      expect(lineHeightSlider.max).toBe('2.0');
      expect(lineHeightSlider.step).toBe('0.1');
    });

    it('should render letter spacing slider', () => {
      const sliders = element.shadowRoot!.querySelectorAll('input[type="range"]');
      const letterSpacingSlider = Array.from(sliders).find(
        slider => (slider as HTMLInputElement).min === '0' && (slider as HTMLInputElement).max === '0.5'
      ) as HTMLInputElement;
      
      expect(letterSpacingSlider).toBeDefined();
      expect(letterSpacingSlider.step).toBe('0.05');
    });

    it('should emit a11y-change event when line height changes', async () => {
      const changeHandler = vi.fn();
      element.addEventListener('a11y-change', changeHandler);
      
      const sliders = element.shadowRoot!.querySelectorAll('input[type="range"]');
      const lineHeightSlider = Array.from(sliders).find(
        slider => (slider as HTMLInputElement).min === '1.0'
      ) as HTMLInputElement;
      
      lineHeightSlider.value = '1.8';
      lineHeightSlider.dispatchEvent(new Event('input', { bubbles: true }));
      await element.updateComplete;
      
      expect(changeHandler).toHaveBeenCalled();
      const event = changeHandler.mock.calls[0][0];
      expect(event.detail.changes.lineHeight).toBe(1.8);
    });
  });

  describe('Action Buttons', () => {
    it('should render action buttons when showActions is true', () => {
      const actions = element.shadowRoot!.querySelector('.panel-actions');
      expect(actions).toBeDefined();
      
      const applyButton = element.shadowRoot!.querySelector('.button-primary');
      const resetButton = element.shadowRoot!.querySelector('.button-secondary');
      
      expect(applyButton).toBeDefined();
      expect(resetButton).toBeDefined();
    });

    it('should hide action buttons when showActions is false', async () => {
      element.showActions = false;
      await element.updateComplete;
      
      const actions = element.shadowRoot!.querySelector('.panel-actions');
      expect(actions).toBeNull();
    });

    it('should emit a11y-apply event when Apply is clicked', async () => {
      const applyHandler = vi.fn();
      element.addEventListener('a11y-apply', applyHandler);
      
      // Make a change first
      const slider = element.shadowRoot!.querySelector('input[type="range"]') as HTMLInputElement;
      slider.value = '125';
      slider.dispatchEvent(new Event('input', { bubbles: true }));
      await element.updateComplete;
      
      const applyButton = element.shadowRoot!.querySelector('.button-primary') as HTMLButtonElement;
      applyButton.click();
      await element.updateComplete;
      
      expect(applyHandler).toHaveBeenCalled();
    });

    it('should emit a11y-reset event when Reset is clicked', async () => {
      const resetHandler = vi.fn();
      element.addEventListener('a11y-reset', resetHandler);
      
      const resetButton = element.shadowRoot!.querySelector('.button-secondary') as HTMLButtonElement;
      resetButton.click();
      await element.updateComplete;
      
      expect(resetHandler).toHaveBeenCalled();
      expect(resetHandler.mock.calls[0][0].detail.settings).toBeDefined();
    });

    it('should reset all settings to defaults when Reset is clicked', async () => {
      // Change some settings
      const slider = element.shadowRoot!.querySelector('input[type="range"]') as HTMLInputElement;
      slider.value = '150';
      slider.dispatchEvent(new Event('input', { bubbles: true }));
      await element.updateComplete;
      
      // Reset
      const resetButton = element.shadowRoot!.querySelector('.button-secondary') as HTMLButtonElement;
      resetButton.click();
      await element.updateComplete;
      
      // Check that slider is back to default
      expect(slider.value).toBe('100');
    });
  });

  describe('localStorage Persistence', () => {
    it('should save settings to localStorage when Apply is clicked', async () => {
      // Change settings
      const slider = element.shadowRoot!.querySelector('input[type="range"]') as HTMLInputElement;
      slider.value = '125';
      slider.dispatchEvent(new Event('input', { bubbles: true }));
      await element.updateComplete;
      
      // Apply
      const applyButton = element.shadowRoot!.querySelector('.button-primary') as HTMLButtonElement;
      applyButton.click();
      await element.updateComplete;
      
      // Check localStorage
      const stored = localStorage.getItem('gc-a11y-settings');
      expect(stored).not.toBeNull();
      
      const settings = JSON.parse(stored!);
      expect(settings.fontSize).toBe(125);
    });

    it('should load settings from localStorage on init', async () => {
      // Save settings
      const savedSettings = {
        fontSize: 150,
        contrast: 'aaa' as const,
        animations: 'reduced' as const,
        lineHeight: 1.8,
        letterSpacing: 0.1,
      };
      localStorage.setItem('gc-a11y-settings', JSON.stringify(savedSettings));
      
      // Create new element
      const newElement = await fixture(html`<eva-a11y-panel></eva-a11y-panel>`);
      await newElement.updateComplete;
      
      // Check that settings were loaded
      const slider = newElement.shadowRoot!.querySelector('input[type="range"]') as HTMLInputElement;
      expect(slider.value).toBe('150');
      
      const aaaRadio = newElement.shadowRoot!.querySelector('input[value="aaa"]') as HTMLInputElement;
      expect(aaaRadio.checked).toBe(true);
    });

    it('should clear localStorage when Reset is clicked', async () => {
      // Save some settings first
      localStorage.setItem('gc-a11y-settings', JSON.stringify({ fontSize: 125 }));
      
      // Reset
      const resetButton = element.shadowRoot!.querySelector('.button-secondary') as HTMLButtonElement;
      resetButton.click();
      await element.updateComplete;
      
      // Check that localStorage is cleared
      const stored = localStorage.getItem('gc-a11y-settings');
      expect(stored).toBeNull();
    });

    it('should support custom storageKey', async () => {
      element.storageKey = 'custom-a11y-key';
      await element.updateComplete;
      
      // Change and apply
      const slider = element.shadowRoot!.querySelector('input[type="range"]') as HTMLInputElement;
      slider.value = '125';
      slider.dispatchEvent(new Event('input', { bubbles: true }));
      await element.updateComplete;
      
      const applyButton = element.shadowRoot!.querySelector('.button-primary') as HTMLButtonElement;
      applyButton.click();
      await element.updateComplete;
      
      // Check custom key
      const stored = localStorage.getItem('custom-a11y-key');
      expect(stored).not.toBeNull();
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label on sliders', () => {
      const slider = element.shadowRoot!.querySelector('input[type="range"]') as HTMLInputElement;
      expect(slider.getAttribute('aria-label')).toBeTruthy();
    });

    it('should have aria-valuemin, aria-valuemax, aria-valuenow on font size slider', () => {
      const slider = element.shadowRoot!.querySelector('input[type="range"]') as HTMLInputElement;
      expect(slider.getAttribute('aria-valuemin')).toBe('75');
      expect(slider.getAttribute('aria-valuemax')).toBe('200');
      expect(slider.getAttribute('aria-valuenow')).toBeTruthy();
    });

    it('should have radiogroup role for contrast options', () => {
      const radiogroup = element.shadowRoot!.querySelector('[role="radiogroup"]');
      expect(radiogroup).toBeDefined();
      expect(radiogroup?.getAttribute('aria-label')).toBeTruthy();
    });
  });
});
