import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html, expect as chaiExpect } from '@open-wc/testing';
import type { GCServicesInfo } from './gc-services-info';
import './gc-services-info';

describe('gc-services-info', () => {
  let element: GCServicesInfo;

  beforeEach(async () => {
    element = await fixture(html`<gc-services-info></gc-services-info>`);
  });

  describe('Rendering', () => {
    it('renders with default properties', async () => {
      expect(element).toBeDefined();
    
    // Provide content for accessibility testing
    element.services = [{ href: '/test', text: 'Test Service', description: 'Test description' }];
    await element.updateComplete;
    

    it('renders navigation landmark', async () => {
      const nav = element.shadowRoot!.querySelector('nav');
      expect(nav).toBeDefined();
      expect(nav?.getAttribute('role')).toBe('navigation');
      expect(nav?.getAttribute('aria-label')).toBeTruthy();
    });

    it('renders with slotted content', async () => {
      element = await fixture(html`
        <gc-services-info>
          <div class="custom">Custom content</div>
        </gc-services-info>
      `);
      
      const slot = element.shadowRoot!.querySelector('slot');
      expect(slot).toBeDefined();
    });
  });

  describe('Service Sections', () => {
    it('renders multiple sections', async () => {
      element.sections = [
        {
          heading: 'Jobs and workplace',
          links: [
            { label: 'Find a job', href: '/jobs/find' },
            { label: 'Training', href: '/jobs/training' }
          ]
        },
        {
          heading: 'Immigration and citizenship',
          links: [
            { label: 'Visit Canada', href: '/visit' },
            { label: 'Study permits', href: '/study' }
          ]
        }
      ];
      await element.updateComplete;

      const sections = element.shadowRoot!.querySelectorAll('.service-section');
      expect(sections.length).toBe(2);
    });

    it('renders section headings', async () => {
      element.sections = [
        {
          heading: 'Jobs and workplace',
          links: [{ label: 'Find a job', href: '/jobs' }]
        }
      ];
      await element.updateComplete;

      const heading = element.shadowRoot!.querySelector('.section-heading');
      expect(heading?.textContent?.trim()).toBe('Jobs and workplace');
    });

    it('renders links for each section', async () => {
      element.sections = [
        {
          heading: 'Jobs',
          links: [
            { label: 'Find a job', href: '/jobs/find' },
            { label: 'Training', href: '/jobs/training' },
            { label: 'Hiring programs', href: '/jobs/hiring' }
          ]
        }
      ];
      await element.updateComplete;

      const links = element.shadowRoot!.querySelectorAll('.service-link');
      expect(links.length).toBe(3);
    });

    it('renders link with correct href', async () => {
      element.sections = [
        {
          heading: 'Jobs',
          links: [{ label: 'Find a job', href: '/jobs/find' }]
        }
      ];
      await element.updateComplete;

      const link = element.shadowRoot!.querySelector('.service-link') as HTMLAnchorElement;
      expect(link.href).toContain('/jobs/find');
    });

    it('renders link icon when provided', async () => {
      element.sections = [
        {
          heading: 'Jobs',
          links: [{ label: 'Find a job', href: '/jobs', icon: '🔍' }]
        }
      ];
      await element.updateComplete;

      const icon = element.shadowRoot!.querySelector('.link-icon');
      expect(icon).toBeDefined();
      expect(icon?.textContent).toBe('🔍');
    });

    it('does not render icon when not provided', async () => {
      element.sections = [
        {
          heading: 'Jobs',
          links: [{ label: 'Find a job', href: '/jobs' }]
        }
      ];
      await element.updateComplete;

      const icon = element.shadowRoot!.querySelector('.link-icon');
      expect(icon).toBeNull();
    });
  });

  describe('Grid Layout', () => {
    it('defaults to 3 columns', () => {
      expect(element.columns).toBe(3);
    });

    it('applies 2 column layout', async () => {
      element.columns = 2;
      await element.updateComplete;

      const style = element.style.getPropertyValue('--gc-services-columns');
      expect(style).toBe('2');
    });

    it('applies 3 column layout', async () => {
      element.columns = 3;
      await element.updateComplete;

      const style = element.style.getPropertyValue('--gc-services-columns');
      expect(style).toBe('3');
    });

    it('renders grid container', async () => {
      const grid = element.shadowRoot!.querySelector('.services-grid');
      expect(grid).toBeDefined();
    });
  });

  describe('Link Interactions', () => {
    it('emits event on link click', async () => {
      const eventSpy = vi.fn();
      element.addEventListener('gc-services-link-click', eventSpy);

      element.sections = [
        {
          heading: 'Jobs',
          links: [{ label: 'Find a job', href: '/jobs' }]
        }
      ];
      await element.updateComplete;

      const link = element.shadowRoot!.querySelector('.service-link') as HTMLAnchorElement;
      link.click();

      expect(eventSpy).toHaveBeenCalled();
      const event = eventSpy.mock.calls[0][0] as CustomEvent;
      expect(event.detail.section).toBe('Jobs');
      expect(event.detail.link).toBe('Find a job');
      expect(event.detail.href).toContain('/jobs');
    });

    it('includes correct event details', async () => {
      const eventSpy = vi.fn();
      element.addEventListener('gc-services-link-click', eventSpy);

      element.sections = [
        {
          heading: 'Immigration',
          links: [{ label: 'Visit Canada', href: '/visit' }]
        }
      ];
      await element.updateComplete;

      const link = element.shadowRoot!.querySelector('.service-link') as HTMLAnchorElement;
      link.click();

      const event = eventSpy.mock.calls[0][0] as CustomEvent;
      expect(event.detail).toEqual({
        section: 'Immigration',
        link: 'Visit Canada',
        href: expect.stringContaining('/visit')
      });
    });
  });

  describe('Accessibility', () => {
    it('has navigation role', async () => {
      const nav = element.shadowRoot!.querySelector('[role="navigation"]');
      expect(nav).toBeDefined();
    });

    it('has aria-label', async () => {
      const nav = element.shadowRoot!.querySelector('nav');
      expect(nav?.hasAttribute('aria-label')).toBe(true);
    });

    it('uses semantic heading tags', async () => {
      element.sections = [
        {
          heading: 'Jobs',
          links: [{ label: 'Find a job', href: '/jobs' }]
        }
      ];
      await element.updateComplete;

      const heading = element.shadowRoot!.querySelector('h2');
      expect(heading).toBeDefined();
    });

    it('uses semantic list structure', async () => {
      element.sections = [
        {
          heading: 'Jobs',
          links: [{ label: 'Find a job', href: '/jobs' }]
        }
      ];
      await element.updateComplete;

      const list = element.shadowRoot!.querySelector('ul');
      expect(list).toBeDefined();
      
      const listItem = element.shadowRoot!.querySelector('li');
      expect(listItem).toBeDefined();
    });

    it('hides decorative icons from screen readers', async () => {
      element.sections = [
        {
          heading: 'Jobs',
          links: [{ label: 'Find a job', href: '/jobs', icon: '🔍' }]
        }
      ];
      await element.updateComplete;

      const icon = element.shadowRoot!.querySelector('.link-icon');
      expect(icon?.getAttribute('aria-hidden')).toBe('true');
    });

    it('passes accessibility audit', async () => {
      element.sections = [
        {
          heading: 'Jobs and workplace',
          links: [
            { label: 'Find a job', href: '/jobs/find' },
            { label: 'Training', href: '/jobs/training' }
          ]
        }
      ];
      await element.updateComplete;

      await chaiExpect(element).to.be.accessible();
    });
  });

  describe('Bilingual Support', () => {
    it('displays English aria-label by default', async () => {
      const nav = element.shadowRoot!.querySelector('nav');
      expect(nav?.getAttribute('aria-label')).toBe('Services and information');
    });

    it('displays French aria-label', async () => {
      element.locale = 'fr-CA';
      await element.updateComplete;

      const nav = element.shadowRoot!.querySelector('nav');
      expect(nav?.getAttribute('aria-label')).toBe('Services et renseignements');
    });
  });

  describe('Empty States', () => {
    it('renders empty grid when no sections provided', async () => {
      element.sections = [];
      await element.updateComplete;

      const sections = element.shadowRoot!.querySelectorAll('.service-section');
      expect(sections.length).toBe(0);
    });

    it('renders section with no links', async () => {
      element.sections = [
        {
          heading: 'Jobs',
          links: []
        }
      ];
      await element.updateComplete;

      const links = element.shadowRoot!.querySelectorAll('.service-link');
      expect(links.length).toBe(0);
    });
  });
});
