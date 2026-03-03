import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html, expect as chaiExpect } from '@open-wc/testing';
import type { GCSubwayNav } from './gc-subway-nav';
import './gc-subway-nav';

describe('gc-subway-nav', () => {
  let element: GCSubwayNav;

  beforeEach(async () => {
    element = await fixture(html`<gc-subway-nav></gc-subway-nav>`);
  });

  describe('Rendering', () => {
    it('renders with default properties', async () => {
      expect(element).toBeDefined();
    
    // Provide content for accessibility testing
    element.steps = [{ label: 'Step 1', description: 'Test step', status: 'current' }];
    await element.updateComplete;
    
    chaiExpect(element).to.be.accessible();
    it('renders navigation element', async () => {
      const nav = element.shadowRoot!.querySelector('nav');
      expect(nav).toBeDefined();
      expect(nav?.getAttribute('role')).toBe('navigation');
    });

    it('renders ordered list', async () => {
      const list = element.shadowRoot!.querySelector('ol');
      expect(list).toBeDefined();
    });
  });

  describe('Steps', () => {
    it('renders multiple steps', async () => {
      element.steps = [
        { label: 'Step 1', status: 'completed' },
        { label: 'Step 2', status: 'current' },
        { label: 'Step 3', status: 'future' }
      ];
      await element.updateComplete;

      const steps = element.shadowRoot!.querySelectorAll('.subway-step');
      expect(steps.length).toBe(3);
    });

    it('renders step labels', async () => {
      element.steps = [
        { label: 'Gather documents', status: 'current' }
      ];
      await element.updateComplete;

      const label = element.shadowRoot!.querySelector('.step-label');
      expect(label?.textContent).toContain('Gather documents');
    });

    it('renders step numbers for future steps', async () => {
      element.steps = [
        { label: 'Step 1', status: 'future' },
        { label: 'Step 2', status: 'future' }
      ];
      await element.updateComplete;

      const markers = element.shadowRoot!.querySelectorAll('.step-marker');
      expect(markers[0].textContent?.trim()).toBe('1');
      expect(markers[1].textContent?.trim()).toBe('2');
    });

    it('renders checkmark for completed steps', async () => {
      element.steps = [
        { label: 'Step 1', status: 'completed' }
      ];
      await element.updateComplete;

      const checkmark = element.shadowRoot!.querySelector('.checkmark');
      expect(checkmark).toBeDefined();
      expect(checkmark?.textContent).toBe('✓');
    });

    it('renders step number for current step', async () => {
      element.steps = [
        { label: 'Step 1', status: 'completed' },
        { label: 'Step 2', status: 'current' }
      ];
      await element.updateComplete;

      const markers = element.shadowRoot!.querySelectorAll('.step-marker');
      expect(markers[1].textContent?.trim()).toBe('2');
    });
  });

  describe('Step Status', () => {
    it('applies completed class', async () => {
      element.steps = [
        { label: 'Step 1', status: 'completed' }
      ];
      await element.updateComplete;

      const marker = element.shadowRoot!.querySelector('.step-marker');
      expect(marker?.classList.contains('completed')).toBe(true);
    });

    it('applies current class', async () => {
      element.steps = [
        { label: 'Step 1', status: 'current' }
      ];
      await element.updateComplete;

      const marker = element.shadowRoot!.querySelector('.step-marker');
      expect(marker?.classList.contains('current')).toBe(true);
    });

    it('applies future class', async () => {
      element.steps = [
        { label: 'Step 1', status: 'future' }
      ];
      await element.updateComplete;

      const marker = element.shadowRoot!.querySelector('.step-marker');
      expect(marker?.classList.contains('future')).toBe(true);
    });

    it('shows progress text for current step', async () => {
      element.steps = [
        { label: 'Step 1', status: 'completed' },
        { label: 'Step 2', status: 'current' },
        { label: 'Step 3', status: 'future' }
      ];
      await element.updateComplete;

      const progressText = element.shadowRoot!.querySelector('.progress-text');
      expect(progressText?.textContent).toContain('Step 2 of 3');
    });

    it('does not show progress text for non-current steps', async () => {
      element.steps = [
        { label: 'Step 1', status: 'completed' },
        { label: 'Step 2', status: 'future' }
      ];
      await element.updateComplete;

      const steps = element.shadowRoot!.querySelectorAll('.subway-step');
      expect(steps[0].querySelector('.progress-text')).toBeNull();
      expect(steps[1].querySelector('.progress-text')).toBeNull();
    });
  });

  describe('Navigation', () => {
    it('does not render links when allowNavigation is false', async () => {
      element.allowNavigation = false;
      element.steps = [
        { label: 'Step 1', href: '/step1', status: 'current' }
      ];
      await element.updateComplete;

      const link = element.shadowRoot!.querySelector('.step-link');
      expect(link).toBeNull();
    });

    it('renders links when allowNavigation is true', async () => {
      element.allowNavigation = true;
      element.steps = [
        { label: 'Step 1', href: '/step1', status: 'current' }
      ];
      await element.updateComplete;

      const link = element.shadowRoot!.querySelector('.step-link');
      expect(link).toBeDefined();
    });

    it('renders link with correct href', async () => {
      element.allowNavigation = true;
      element.steps = [
        { label: 'Step 1', href: '/step1', status: 'current' }
      ];
      await element.updateComplete;

      const link = element.shadowRoot!.querySelector('.step-link') as HTMLAnchorElement;
      expect(link.href).toContain('/step1');
    });

    it('emits event on step click', async () => {
      const eventSpy = vi.fn();
      element.addEventListener('gc-subway-step-click', eventSpy);

      element.allowNavigation = true;
      element.steps = [
        { label: 'Step 1', href: '/step1', status: 'current' }
      ];
      await element.updateComplete;

      const link = element.shadowRoot!.querySelector('.step-link') as HTMLAnchorElement;
      link.click();

      expect(eventSpy).toHaveBeenCalled();
    });

    it('includes correct event details', async () => {
      const eventSpy = vi.fn();
      element.addEventListener('gc-subway-step-click', eventSpy);

      element.allowNavigation = true;
      element.steps = [
        { label: 'Gather documents', href: '/step1', status: 'completed' },
        { label: 'Fill form', href: '/step2', status: 'current' }
      ];
      await element.updateComplete;

      const links = element.shadowRoot!.querySelectorAll('.step-link');
      (links[1] as HTMLAnchorElement).click();

      const event = eventSpy.mock.calls[0][0] as CustomEvent;
      expect(event.detail.step).toBe(2);
      expect(event.detail.label).toBe('Fill form');
      expect(event.detail.status).toBe('current');
    });
  });

  describe('ARIA', () => {
    it('has navigation landmark', async () => {
      const nav = element.shadowRoot!.querySelector('[role="navigation"]');
      expect(nav).toBeDefined();
    });

    it('has aria-label on nav', async () => {
      const nav = element.shadowRoot!.querySelector('nav');
      expect(nav?.hasAttribute('aria-label')).toBe(true);
    });

    it('sets aria-current on current step', async () => {
      element.steps = [
        { label: 'Step 1', status: 'completed' },
        { label: 'Step 2', status: 'current' },
        { label: 'Step 3', status: 'future' }
      ];
      await element.updateComplete;

      const labels = element.shadowRoot!.querySelectorAll('.step-label');
      expect(labels[1].getAttribute('aria-current')).toBe('step');
    });

    it('sets aria-current false on non-current steps', async () => {
      element.allowNavigation = true;
      element.steps = [
        { label: 'Step 1', href: '/step1', status: 'completed' },
        { label: 'Step 2', href: '/step2', status: 'current' }
      ];
      await element.updateComplete;

      const links = element.shadowRoot!.querySelectorAll('.step-link');
      expect(links[0].getAttribute('aria-current')).toBe('false');
    });

    it('has aria-live region for progress', async () => {
      element.steps = [
        { label: 'Step 1', status: 'current' }
      ];
      await element.updateComplete;

      const liveRegion = element.shadowRoot!.querySelector('[aria-live="polite"]');
      expect(liveRegion).toBeDefined();
    });

    it('hides decorative checkmark from screen readers', async () => {
      element.steps = [
        { label: 'Step 1', status: 'completed' }
      ];
      await element.updateComplete;

      const checkmark = element.shadowRoot!.querySelector('.checkmark');
      expect(checkmark?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('Accessibility', () => {
    it('passes accessibility audit', async () => {
      element.steps = [
        { label: 'Gather documents', status: 'completed' },
        { label: 'Fill out form', status: 'current' },
        { label: 'Submit', status: 'future' }
      ];
      await element.updateComplete;

      await chaiExpect(element).to.be.accessible();
    });

    it('uses semantic ordered list', async () => {
      const list = element.shadowRoot!.querySelector('ol');
      expect(list).toBeDefined();
    });

    it('uses semantic list items', async () => {
      element.steps = [
        { label: 'Step 1', status: 'current' }
      ];
      await element.updateComplete;

      const listItem = element.shadowRoot!.querySelector('li');
      expect(listItem).toBeDefined();
    });
  });

  describe('Bilingual Support', () => {
    it('displays English labels by default', async () => {
      element.steps = [
        { label: 'Step 1', status: 'current' }
      ];
      await element.updateComplete;

      const nav = element.shadowRoot!.querySelector('nav');
      expect(nav?.getAttribute('aria-label')).toBe('Steps navigation');
    });

    it('displays French labels', async () => {
      element.locale = 'fr-CA';
      element.steps = [
        { label: 'Étape 1', status: 'current' }
      ];
      await element.updateComplete;

      const nav = element.shadowRoot!.querySelector('nav');
      expect(nav?.getAttribute('aria-label')).toBe('Navigation par étapes');
    });

    it('displays French progress text', async () => {
      element.locale = 'fr-CA';
      element.steps = [
        { label: 'Étape 1', status: 'completed' },
        { label: 'Étape 2', status: 'current' }
      ];
      await element.updateComplete;

      const progressText = element.shadowRoot!.querySelector('.progress-text');
      expect(progressText?.textContent).toContain('Étape 2 de 2');
    });
  });

  describe('Visual Indicators', () => {
    it('renders connecting lines between steps', async () => {
      element.steps = [
        { label: 'Step 1', status: 'completed' },
        { label: 'Step 2', status: 'current' }
      ];
      await element.updateComplete;

      const steps = element.shadowRoot!.querySelectorAll('.subway-step');
      expect(steps[0].matches('.subway-step:not(:last-child)')).toBe(true);
    });

    it('does not render line after last step', async () => {
      element.steps = [
        { label: 'Step 1', status: 'completed' },
        { label: 'Step 2', status: 'current' }
      ];
      await element.updateComplete;

      const lastStep = element.shadowRoot!.querySelector('.subway-step:last-child');
      expect(lastStep?.matches(':not(:last-child)')).toBe(false);
    });
  });

  describe('Empty States', () => {
    it('renders empty list when no steps', async () => {
      element.steps = [];
      await element.updateComplete;

      const steps = element.shadowRoot!.querySelectorAll('.subway-step');
      expect(steps.length).toBe(0);
    });
  });
});
