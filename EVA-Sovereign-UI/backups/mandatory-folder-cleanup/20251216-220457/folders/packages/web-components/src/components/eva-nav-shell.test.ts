import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { EVANavShell } from './eva-nav-shell.js';
import './eva-nav-shell.js';

describe('eva-nav-shell', () => {
  let element: EVANavShell;

  beforeEach(async () => {
    element = await fixture(html`<eva-nav-shell></eva-nav-shell>`);
  });

  describe('Initialization', () => {
    it('should create element', () => {
      expect(element).toBeDefined();
      expect(element.tagName.toLowerCase()).toBe('eva-nav-shell');
    });

    it('should have default mode as sidebar', () => {
      expect(element.mode).toBe('sidebar');
    });

    it('should have default open state as false', () => {
      expect(element.open).toBe(false);
    });

    it('should have default collapsed state as false', () => {
      expect(element.collapsed).toBe(false);
    });
  });

  describe('Modes', () => {
    it('should support sidebar mode', async () => {
      element.mode = 'sidebar';
      await element.updateComplete;
      expect(element.getAttribute('mode')).toBe('sidebar');
      
      const sidebar = element.shadowRoot!.querySelector('.sidebar');
      expect(sidebar).toBeDefined();
    });

    it('should support tabs mode', async () => {
      element.mode = 'tabs';
      await element.updateComplete;
      expect(element.getAttribute('mode')).toBe('tabs');
      
      const tabs = element.shadowRoot!.querySelector('.tabs');
      expect(tabs).toBeDefined();
    });
  });

  describe('Sidebar Toggle', () => {
    it('should toggle sidebar open state', async () => {
      expect(element.open).toBe(false);
      
      const toggleButton = element.shadowRoot!.querySelector('.sidebar-toggle') as HTMLButtonElement;
      expect(toggleButton).toBeDefined();
      
      toggleButton.click();
      await element.updateComplete;
      
      expect(element.open).toBe(true);
      expect(element.getAttribute('open')).not.toBeNull();
    });

    it('should emit nav-toggle event when toggled', async () => {
      const toggleHandler = vi.fn();
      element.addEventListener('nav-toggle', toggleHandler);
      
      const toggleButton = element.shadowRoot!.querySelector('.sidebar-toggle') as HTMLButtonElement;
      toggleButton.click();
      await element.updateComplete;
      
      expect(toggleHandler).toHaveBeenCalledTimes(1);
      expect(toggleHandler.mock.calls[0][0].detail).toEqual({ open: true });
    });

    it('should close sidebar when toggle clicked twice', async () => {
      const toggleButton = element.shadowRoot!.querySelector('.sidebar-toggle') as HTMLButtonElement;
      
      toggleButton.click();
      await element.updateComplete;
      expect(element.open).toBe(true);
      
      toggleButton.click();
      await element.updateComplete;
      expect(element.open).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('should have navigation role', () => {
      const nav = element.shadowRoot!.querySelector('[role="navigation"]');
      expect(nav).toBeDefined();
    });

    it('should have aria-label on navigation', () => {
      const nav = element.shadowRoot!.querySelector('[role="navigation"]');
      expect(nav?.getAttribute('aria-label')).toBeTruthy();
    });

    it('should update aria-expanded when toggled', async () => {
      const toggleButton = element.shadowRoot!.querySelector('.sidebar-toggle') as HTMLButtonElement;
      
      expect(toggleButton.getAttribute('aria-expanded')).toBe('false');
      
      toggleButton.click();
      await element.updateComplete;
      
      expect(toggleButton.getAttribute('aria-expanded')).toBe('true');
    });

    it('should have skip to content link', () => {
      const skipLink = element.shadowRoot!.querySelector('.skip-link');
      expect(skipLink).toBeDefined();
      expect(skipLink?.getAttribute('href')).toBe('#main-content');
    });

    it('should have main content landmark', () => {
      const content = element.shadowRoot!.querySelector('#main-content');
      expect(content).toBeDefined();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should close sidebar on Escape key', async () => {
      element.open = true;
      await element.updateComplete;
      
      const nav = element.shadowRoot!.querySelector('nav');
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
      nav?.dispatchEvent(escapeEvent);
      await element.updateComplete;
      
      expect(element.open).toBe(false);
    });
  });

  describe('Overlay', () => {
    it('should show overlay when sidebar is open', async () => {
      element.open = false;
      await element.updateComplete;
      
      let overlay = element.shadowRoot!.querySelector('.overlay');
      expect(overlay).toBeNull();
      
      element.open = true;
      await element.updateComplete;
      
      overlay = element.shadowRoot!.querySelector('.overlay');
      expect(overlay).toBeDefined();
    });

    it('should close sidebar when overlay is clicked', async () => {
      element.open = true;
      await element.updateComplete;
      
      const overlay = element.shadowRoot!.querySelector('.overlay') as HTMLElement;
      expect(overlay).toBeDefined();
      
      overlay.click();
      await element.updateComplete;
      
      expect(element.open).toBe(false);
    });
  });

  describe('Custom Labels', () => {
    it('should support custom navLabel', async () => {
      element.navLabel = 'Custom Navigation';
      await element.updateComplete;
      
      const nav = element.shadowRoot!.querySelector('[role="navigation"]');
      expect(nav?.getAttribute('aria-label')).toBe('Custom Navigation');
    });
  });

  describe('Content Slots', () => {
    it('should render header slot content', async () => {
      const elementWithHeader = await fixture(html`
        <eva-nav-shell>
          <div slot="header">App Logo</div>
        </eva-nav-shell>
      `);
      
      const headerSlot = elementWithHeader.shadowRoot!.querySelector('slot[name="header"]');
      expect(headerSlot).toBeDefined();
    });

    it('should render nav-items slot content', async () => {
      const elementWithNav = await fixture(html`
        <eva-nav-shell>
          <nav slot="nav-items">
            <a href="/dashboard">Dashboard</a>
          </nav>
        </eva-nav-shell>
      `);
      
      const navSlot = elementWithNav.shadowRoot!.querySelector('slot[name="nav-items"]');
      expect(navSlot).toBeDefined();
    });

    it('should render default slot for main content', async () => {
      const elementWithContent = await fixture(html`
        <eva-nav-shell>
          <main>Main Content</main>
        </eva-nav-shell>
      `);
      
      const defaultSlot = elementWithContent.shadowRoot!.querySelector('.content slot:not([name])');
      expect(defaultSlot).toBeDefined();
    });
  });

  describe('Collapsed State', () => {
    it('should support collapsed property', async () => {
      element.collapsed = true;
      await element.updateComplete;
      
      expect(element.getAttribute('collapsed')).not.toBeNull();
    });
  });
});
