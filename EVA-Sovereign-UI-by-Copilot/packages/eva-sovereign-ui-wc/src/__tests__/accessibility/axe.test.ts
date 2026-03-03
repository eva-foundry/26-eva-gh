import { describe, it, expect } from 'vitest';
import axe from 'axe-core';

// Import all components for accessibility testing
import '../../components/gc-design/eva-gc-button';
import '../../components/ui/eva-accordion';
import '../../components/ui/eva-alert';
import '../../components/ui/eva-badge';
import '../../components/ui/eva-card';
import '../../components/ui/eva-dialog';
import '../../components/ui/eva-input';
import '../../components/ui/eva-checkbox';
import '../../components/ui/eva-switch';

describe('Accessibility - axe-core validation', () => {
  async function runAxe(element: HTMLElement) {
    const results = await axe.run(element, {
      rules: {
        // Custom rules for Web Components
        'color-contrast': { enabled: true },
        'button-name': { enabled: true },
        'aria-allowed-attr': { enabled: true },
        'aria-required-attr': { enabled: true },
        'aria-valid-attr': { enabled: true },
        'aria-valid-attr-value': { enabled: true },
        'landmark-one-main': { enabled: false }, // Not applicable to components
        'page-has-heading-one': { enabled: false }, // Not applicable to components
        'region': { enabled: false }, // Not applicable to components
      },
    });
    return results;
  }

  describe('eva-gc-button', () => {
    it('should have no accessibility violations', async () => {
      const button = document.createElement('eva-gc-button');
      button.textContent = 'Click Me';
      document.body.appendChild(button);
      
      const results = await runAxe(document.body);
      expect(results.violations).toHaveLength(0);
      
      document.body.removeChild(button);
    });

    it('should be accessible when disabled', async () => {
      const button = document.createElement('eva-gc-button');
      button.textContent = 'Disabled';
      button.setAttribute('disabled', '');
      document.body.appendChild(button);
      
      const results = await runAxe(document.body);
      expect(results.violations).toHaveLength(0);
      
      document.body.removeChild(button);
    });

    it('should be accessible with icon only', async () => {
      const button = document.createElement('eva-gc-button');
      button.setAttribute('size', 'icon');
      button.setAttribute('aria-label', 'Close');
      button.innerHTML = '<svg><circle cx="10" cy="10" r="5"/></svg>';
      document.body.appendChild(button);
      
      const results = await runAxe(document.body);
      expect(results.violations).toHaveLength(0);
      
      document.body.removeChild(button);
    });
  });

  describe('eva-accordion', () => {
    it('should have no accessibility violations', async () => {
      const accordion = document.createElement('eva-accordion');
      accordion.innerHTML = `
        <div slot="trigger">Section 1</div>
        <div slot="content">Content here</div>
      `;
      document.body.appendChild(accordion);
      
      const results = await runAxe(document.body);
      expect(results.violations).toHaveLength(0);
      
      document.body.removeChild(accordion);
    });
  });

  describe('eva-input', () => {
    it('should have no accessibility violations', async () => {
      const input = document.createElement('eva-input');
      input.setAttribute('label', 'Email Address');
      input.setAttribute('placeholder', 'Enter your email');
      document.body.appendChild(input);
      
      const results = await runAxe(document.body);
      expect(results.violations).toHaveLength(0);
      
      document.body.removeChild(input);
    });

    it('should be accessible with error state', async () => {
      const input = document.createElement('eva-input');
      input.setAttribute('label', 'Email');
      input.setAttribute('error', 'Invalid email');
      document.body.appendChild(input);
      
      const results = await runAxe(document.body);
      expect(results.violations).toHaveLength(0);
      
      document.body.removeChild(input);
    });
  });

  describe('eva-checkbox', () => {
    it('should have no accessibility violations', async () => {
      const checkbox = document.createElement('eva-checkbox');
      checkbox.setAttribute('label', 'Accept terms');
      document.body.appendChild(checkbox);
      
      const results = await runAxe(document.body);
      expect(results.violations).toHaveLength(0);
      
      document.body.removeChild(checkbox);
    });
  });

  describe('eva-dialog', () => {
    it('should have no accessibility violations', async () => {
      const dialog = document.createElement('eva-dialog');
      dialog.setAttribute('open', '');
      dialog.innerHTML = `
        <div slot="title">Dialog Title</div>
        <div slot="content">Dialog content</div>
      `;
      document.body.appendChild(dialog);
      
      const results = await runAxe(document.body);
      expect(results.violations).toHaveLength(0);
      
      document.body.removeChild(dialog);
    });
  });
});
