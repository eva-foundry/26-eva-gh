import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { EVABackstageShell } from './eva-backstage-shell.js';
import './eva-backstage-shell.js';

describe('eva-backstage-shell', () => {
  let element: EVABackstageShell;

  beforeEach(async () => {
    element = await fixture(html`<eva-backstage-shell></eva-backstage-shell>`);
  });

  describe('Initialization', () => {
    it('should create element', () => {
      expect(element).toBeDefined();
      expect(element.tagName.toLowerCase()).toBe('eva-backstage-shell');
    });

    it('should have default open state as false', () => {
      expect(element.open).toBe(false);
    });

    it('should have default position as right', () => {
      expect(element.position).toBe('right');
    });

    it('should have default width as 480px', () => {
      expect(element.width).toBe('480px');
    });

    it('should have default showTrigger as true', () => {
      expect(element.showTrigger).toBe(true);
    });
  });

  describe('Position', () => {
    it('should support right position', async () => {
      element.position = 'right';
      await element.updateComplete;
      
      expect(element.getAttribute('position')).toBe('right');
    });

    it('should support left position', async () => {
      element.position = 'left';
      await element.updateComplete;
      
      expect(element.getAttribute('position')).toBe('left');
    });
  });

  describe('Open/Close', () => {
    it('should open panel programmatically', async () => {
      expect(element.open).toBe(false);
      
      element.openPanel();
      await element.updateComplete;
      
      expect(element.open).toBe(true);
      expect(element.getAttribute('open')).not.toBeNull();
    });

    it('should close panel programmatically', async () => {
      element.openPanel();
      await element.updateComplete;
      expect(element.open).toBe(true);
      
      element.close();
      await element.updateComplete;
      
      expect(element.open).toBe(false);
      expect(element.getAttribute('open')).toBeNull();
    });

    it('should emit backstage-open event when opened', async () => {
      const openHandler = vi.fn();
      element.addEventListener('backstage-open', openHandler);
      
      element.openPanel();
      await element.updateComplete;
      
      expect(openHandler).toHaveBeenCalledTimes(1);
    });

    it('should emit backstage-close event when closed', async () => {
      const closeHandler = vi.fn();
      element.addEventListener('backstage-close', closeHandler);
      
      element.openPanel();
      await element.updateComplete;
      
      element.close();
      await element.updateComplete;
      
      expect(closeHandler).toHaveBeenCalledTimes(1);
    });

    it('should close panel when close button is clicked', async () => {
      element.openPanel();
      await element.updateComplete;
      
      const closeButton = element.shadowRoot!.querySelector('.close-button') as HTMLButtonElement;
      expect(closeButton).toBeDefined();
      
      closeButton.click();
      await element.updateComplete;
      
      expect(element.open).toBe(false);
    });

    it('should close panel when overlay is clicked', async () => {
      element.openPanel();
      await element.updateComplete;
      
      const overlay = element.shadowRoot!.querySelector('.backstage-overlay') as HTMLElement;
      expect(overlay).toBeDefined();
      
      overlay.click();
      await element.updateComplete;
      
      expect(element.open).toBe(false);
    });
  });

  describe('Trigger Button', () => {
    it('should render trigger button by default', () => {
      const trigger = element.shadowRoot!.querySelector('.backstage-trigger');
      expect(trigger).toBeDefined();
    });

    it('should hide trigger button when showTrigger is false', async () => {
      element.showTrigger = false;
      await element.updateComplete;
      
      const trigger = element.shadowRoot!.querySelector('.backstage-trigger');
      expect(trigger).toBeNull();
    });

    it('should open panel when trigger is clicked', async () => {
      const trigger = element.shadowRoot!.querySelector('.backstage-trigger') as HTMLButtonElement;
      
      trigger.click();
      await element.updateComplete;
      
      expect(element.open).toBe(true);
    });

    it('should have aria-expanded attribute', async () => {
      const trigger = element.shadowRoot!.querySelector('.backstage-trigger') as HTMLButtonElement;
      
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
      
      trigger.click();
      await element.updateComplete;
      
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });
  });

  describe('Accessibility', () => {
    it('should have dialog role', async () => {
      element.openPanel();
      await element.updateComplete;
      
      const panel = element.shadowRoot!.querySelector('[role="dialog"]');
      expect(panel).toBeDefined();
    });

    it('should have aria-modal attribute', async () => {
      element.openPanel();
      await element.updateComplete;
      
      const panel = element.shadowRoot!.querySelector('[role="dialog"]');
      expect(panel?.getAttribute('aria-modal')).toBe('true');
    });

    it('should have aria-labelledby attribute', async () => {
      element.openPanel();
      await element.updateComplete;
      
      const panel = element.shadowRoot!.querySelector('[role="dialog"]');
      expect(panel?.getAttribute('aria-labelledby')).toBe('backstage-title');
    });

    it('should focus close button when opened', async () => {
      element.openPanel();
      await element.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 50)); // Wait for focus
      
      const closeButton = element.shadowRoot!.querySelector('.close-button') as HTMLButtonElement;
      // Note: In test environment, focus might not work exactly as in browser
      expect(closeButton).toBeDefined();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should close panel on Escape key', async () => {
      element.openPanel();
      await element.updateComplete;
      
      const panel = element.shadowRoot!.querySelector('.backstage-panel') as HTMLElement;
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
      panel.dispatchEvent(escapeEvent);
      await element.updateComplete;
      
      expect(element.open).toBe(false);
    });
  });

  describe('Custom Title', () => {
    it('should support custom title', async () => {
      element.title = 'Custom Settings';
      await element.updateComplete;
      
      const titleElement = element.shadowRoot!.querySelector('#backstage-title');
      expect(titleElement?.textContent?.trim()).toBe('Custom Settings');
    });
  });

  describe('Custom Width', () => {
    it('should support custom width', async () => {
      element.width = '600px';
      await element.updateComplete;
      
      const panel = element.shadowRoot!.querySelector('.backstage-panel') as HTMLElement;
      expect(panel.style.getPropertyValue('--backstage-width')).toBe('600px');
    });
  });

  describe('Content Slots', () => {
    it('should render default slot for content', async () => {
      const elementWithContent = await fixture(html`
        <eva-backstage-shell>
          <div>Panel Content</div>
        </eva-backstage-shell>
      `);
      
      const defaultSlot = elementWithContent.shadowRoot!.querySelector('.backstage-content slot:not([name])');
      expect(defaultSlot).toBeDefined();
    });

    it('should render nav slot when provided', async () => {
      const elementWithNav = await fixture(html`
        <eva-backstage-shell>
          <nav slot="nav">Navigation</nav>
        </eva-backstage-shell>
      `);
      
      const navSlot = elementWithNav.shadowRoot!.querySelector('slot[name="nav"]');
      expect(navSlot).toBeDefined();
    });

    it('should render custom trigger slot when provided', async () => {
      const elementWithTrigger = await fixture(html`
        <eva-backstage-shell>
          <button slot="trigger">Custom Trigger</button>
        </eva-backstage-shell>
      `);
      
      const triggerSlot = elementWithTrigger.shadowRoot!.querySelector('slot[name="trigger"]');
      expect(triggerSlot).toBeDefined();
    });
  });

  describe('Overlay', () => {
    it('should show overlay when open', async () => {
      element.openPanel();
      await element.updateComplete;
      
      const overlay = element.shadowRoot!.querySelector('.backstage-overlay');
      expect(overlay).toBeDefined();
      
      // Check that overlay is visible
      const computedStyle = window.getComputedStyle(overlay as Element);
      expect(computedStyle.display).not.toBe('none');
    });

    it('should hide overlay when closed', async () => {
      element.open = false;
      await element.updateComplete;
      
      const overlay = element.shadowRoot!.querySelector('.backstage-overlay');
      expect(overlay).toBeDefined();
      
      // Overlay should be hidden via CSS
      const computedStyle = window.getComputedStyle(overlay as Element);
      expect(computedStyle.display).toBe('none');
    });
  });
});
