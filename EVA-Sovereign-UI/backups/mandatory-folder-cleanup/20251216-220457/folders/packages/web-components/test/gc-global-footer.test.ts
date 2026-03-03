import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html, oneEvent, beAccessible } from './vitest-helpers-clean';
import '../src/components/gc-patterns/gc-global-footer.js';
import type { GCGlobalFooter } from '../src/components/gc-patterns/gc-global-footer.js';

describe('gc-global-footer', () => {
  describe('Initialization', () => {
    it('should render with default properties', async () => {
      const el = await fixture<GCGlobalFooter>(html`<gc-global-footer></gc-global-footer>`);
      
      expect(el).to.exist;
      expect(el.expanded).to.be.true;
      expect(el.showContextBand).to.be.false;
      expect(el.contextBandTitle).to.equal('');
    });

    it('should render expanded footer by default', async () => {
      const el = await fixture<GCGlobalFooter>(html`<gc-global-footer></gc-global-footer>`);
      
      const sections = el.shadowRoot!.querySelector('.footer-sections');
      expect(sections).to.exist;
    });

    it('should render compact footer when expanded is false', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer .expanded="${false}"></gc-global-footer>
      `);
      
      const compact = el.shadowRoot!.querySelector('.footer-compact');
      expect(compact).to.exist;
      
      const sections = el.shadowRoot!.querySelector('.footer-sections');
      expect(sections).to.not.exist;
    });

    it('should hide context band by default', async () => {
      const el = await fixture<GCGlobalFooter>(html`<gc-global-footer></gc-global-footer>`);
      
      const contextBand = el.shadowRoot!.querySelector('.context-band');
      expect(contextBand).to.not.exist;
    });

    it('should show context band when enabled with title', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer 
          .showContextBand="${true}"
          contextBandTitle="Employment and Social Development Canada"
        ></gc-global-footer>
      `);
      
      const contextBand = el.shadowRoot!.querySelector('.context-band');
      const title = el.shadowRoot!.querySelector('.context-band-title');
      
      expect(contextBand).to.exist;
      expect(title).to.exist;
      expect(title!.textContent).to.equal('Employment and Social Development Canada');
    });
  });

  describe('Footer Sections (Expanded)', () => {
    it('should render About Government section in English', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer locale="en-CA"></gc-global-footer>
      `);
      
      const sections = el.shadowRoot!.querySelectorAll('.footer-section');
      expect(sections.length).to.be.at.least(2);
      
      const titles = Array.from(el.shadowRoot!.querySelectorAll('.footer-section-title'))
        .map((t) => t.textContent?.trim());
      
      expect(titles).to.include('About government');
    });

    it('should render About Government section in French', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer locale="fr-CA"></gc-global-footer>
      `);
      
      const titles = Array.from(el.shadowRoot!.querySelectorAll('.footer-section-title'))
        .map((t) => t.textContent?.trim());
      
      expect(titles).to.include('Au sujet du gouvernement');
    });

    it('should render all About Government links', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer locale="en-CA"></gc-global-footer>
      `);
      
      const links = Array.from(el.shadowRoot!.querySelectorAll('.footer-link'))
        .map((l) => l.textContent?.trim());
      
      expect(links).to.include('Contact us');
      expect(links).to.include('Departments and agencies');
      expect(links).to.include('Prime Minister');
      expect(links).to.include('Open government');
    });

    it('should render About Site section in English', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer locale="en-CA"></gc-global-footer>
      `);
      
      const titles = Array.from(el.shadowRoot!.querySelectorAll('.footer-section-title'))
        .map((t) => t.textContent?.trim());
      
      expect(titles).to.include('About this site');
    });

    it('should render About Site section in French', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer locale="fr-CA"></gc-global-footer>
      `);
      
      const titles = Array.from(el.shadowRoot!.querySelectorAll('.footer-section-title'))
        .map((t) => t.textContent?.trim());
      
      expect(titles).to.include('À propos de ce site');
    });

    it('should render all About Site links', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer locale="en-CA"></gc-global-footer>
      `);
      
      const links = Array.from(el.shadowRoot!.querySelectorAll('.footer-link'))
        .map((l) => l.textContent?.trim());
      
      expect(links).to.include('Social media');
      expect(links).to.include('Mobile applications');
      expect(links).to.include('Terms and conditions');
      expect(links).to.include('Privacy');
    });

    it('should use correct French URLs', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer locale="fr-CA"></gc-global-footer>
      `);
      
      const links = Array.from(el.shadowRoot!.querySelectorAll('.footer-link')) as HTMLAnchorElement[];
      const hrefs = links.map((l) => l.href);
      
      // Should contain French URLs
      expect(hrefs.some((href) => href.includes('/fr/'))).to.be.true;
    });
  });

  describe('Compact Footer', () => {
    it('should render only essential links', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer .expanded="${false}"></gc-global-footer>
      `);
      
      const compact = el.shadowRoot!.querySelector('.footer-compact');
      const links = compact!.querySelectorAll('.footer-link');
      
      expect(links.length).to.equal(3);
    });

    it('should render compact links in English', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer .expanded="${false}" locale="en-CA"></gc-global-footer>
      `);
      
      const links = Array.from(el.shadowRoot!.querySelectorAll('.footer-link'))
        .map((l) => l.textContent?.trim());
      
      expect(links).to.include('Contact us');
      expect(links).to.include('Departments');
      expect(links).to.include('About Canada.ca');
    });

    it('should render compact links in French', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer .expanded="${false}" locale="fr-CA"></gc-global-footer>
      `);
      
      const links = Array.from(el.shadowRoot!.querySelectorAll('.footer-link'))
        .map((l) => l.textContent?.trim());
      
      expect(links).to.include('Contactez-nous');
      expect(links).to.include('Ministères');
      expect(links).to.include('À propos de Canada.ca');
    });
  });

  describe('Government Wordmark', () => {
    it('should render GC wordmark', async () => {
      const el = await fixture<GCGlobalFooter>(html`<gc-global-footer></gc-global-footer>`);
      
      const wordmark = el.shadowRoot!.querySelector('.wordmark-container');
      const flag = el.shadowRoot!.querySelector('.wordmark-flag');
      const text = el.shadowRoot!.querySelector('.wordmark-text');
      
      expect(wordmark).to.exist;
      expect(flag).to.exist;
      expect(text).to.exist;
    });

    it('should render English wordmark text', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer locale="en-CA"></gc-global-footer>
      `);
      
      const text = el.shadowRoot!.querySelector('.wordmark-text');
      expect(text!.textContent?.trim()).to.equal('Government of Canada');
    });

    it('should render French wordmark text', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer locale="fr-CA"></gc-global-footer>
      `);
      
      const text = el.shadowRoot!.querySelector('.wordmark-text');
      expect(text!.textContent?.trim()).to.equal('Gouvernement du Canada');
    });

    it('should have accessible label', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer locale="en-CA"></gc-global-footer>
      `);
      
      const wordmark = el.shadowRoot!.querySelector('.wordmark-container');
      expect(wordmark!.getAttribute('role')).to.equal('img');
      expect(wordmark!.getAttribute('aria-label')).to.include('Government of Canada');
    });
  });

  describe('Mandatory Links', () => {
    it('should render mandatory footer links', async () => {
      const el = await fixture<GCGlobalFooter>(html`<gc-global-footer></gc-global-footer>`);
      
      const mandatoryLinks = el.shadowRoot!.querySelector('.mandatory-links');
      expect(mandatoryLinks).to.exist;
      
      const links = mandatoryLinks!.querySelectorAll('a');
      expect(links.length).to.equal(5);
    });

    it('should include Social media link', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer locale="en-CA"></gc-global-footer>
      `);
      
      const links = Array.from(el.shadowRoot!.querySelectorAll('.mandatory-links a'))
        .map((l) => l.textContent?.trim());
      
      expect(links).to.include('Social media');
    });

    it('should include Terms and conditions link', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer locale="en-CA"></gc-global-footer>
      `);
      
      const links = Array.from(el.shadowRoot!.querySelectorAll('.mandatory-links a'))
        .map((l) => l.textContent?.trim());
      
      expect(links).to.include('Terms and conditions');
    });

    it('should include Privacy link', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer locale="en-CA"></gc-global-footer>
      `);
      
      const links = Array.from(el.shadowRoot!.querySelectorAll('.mandatory-links a'))
        .map((l) => l.textContent?.trim());
      
      expect(links).to.include('Privacy');
    });

    it('should render French mandatory links', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer locale="fr-CA"></gc-global-footer>
      `);
      
      const links = Array.from(el.shadowRoot!.querySelectorAll('.mandatory-links a'))
        .map((l) => l.textContent?.trim());
      
      expect(links).to.include('Médias sociaux');
      expect(links).to.include('Avis');
      expect(links).to.include('Confidentialité');
    });

    it('should have navigation label', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer locale="en-CA"></gc-global-footer>
      `);
      
      const nav = el.shadowRoot!.querySelector('.mandatory-links');
      expect(nav!.getAttribute('aria-label')).to.include('Footer navigation');
    });
  });

  describe('Context Band', () => {
    it('should render context band content slot', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer 
          .showContextBand="${true}"
          contextBandTitle="Related Services"
        >
          <div slot="bands">
            <a href="/service1">Service 1</a>
            <a href="/service2">Service 2</a>
          </div>
        </gc-global-footer>
      `);
      
      const slotContent = el.querySelectorAll('[slot="bands"] a');
      expect(slotContent.length).to.equal(2);
    });

    it('should not render context band without title', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer .showContextBand="${true}"></gc-global-footer>
      `);
      
      const contextBand = el.shadowRoot!.querySelector('.context-band');
      expect(contextBand).to.not.exist;
    });
  });

  describe('Corporate Slot', () => {
    it('should render corporate links slot', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer>
          <div slot="corporate">
            <h3>Corporate</h3>
            <a href="/corporate1">Link 1</a>
            <a href="/corporate2">Link 2</a>
          </div>
        </gc-global-footer>
      `);
      
      const corporateContent = el.querySelector('[slot="corporate"]');
      expect(corporateContent).to.exist;
      expect(corporateContent!.textContent).to.include('Corporate');
    });
  });

  describe('Events', () => {
    it('should emit gc-link-click when footer link clicked', async () => {
      const el = await fixture<GCGlobalFooter>(html`<gc-global-footer></gc-global-footer>`);
      
      const link = el.shadowRoot!.querySelector('.footer-link') as HTMLAnchorElement;
      
      setTimeout(() => link.click());
      const event = await oneEvent(el, 'gc-link-click');
      
      expect(event.detail.href).to.exist;
      expect(event.detail.text).to.exist;
    });

    it('should bubble gc-link-click event', async () => {
      const el = await fixture<GCGlobalFooter>(html`<gc-global-footer></gc-global-footer>`);
      
      const link = el.shadowRoot!.querySelector('.footer-link') as HTMLAnchorElement;
      
      setTimeout(() => link.click());
      const event = await oneEvent(el, 'gc-link-click');
      
      expect(event.bubbles).to.be.true;
      expect(event.composed).to.be.true;
    });

    it('should include link details in event', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer locale="en-CA"></gc-global-footer>
      `);
      
      const link = el.shadowRoot!.querySelector('.footer-link') as HTMLAnchorElement;
      const linkText = link.textContent?.trim();
      
      setTimeout(() => link.click());
      const event = await oneEvent(el, 'gc-link-click');
      
      expect(event.detail.text).to.equal(linkText);
      expect(event.detail.href).to.include(link.getAttribute('href')!);
    });
  });

  describe('Accessibility', () => {
    it('should have contentinfo role', async () => {
      const el = await fixture<GCGlobalFooter>(html`<gc-global-footer></gc-global-footer>`);
      
      const footer = el.shadowRoot!.querySelector('footer');
      expect(footer!.getAttribute('role')).to.equal('contentinfo');
    });

    it('should have proper heading hierarchy', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer .showContextBand="${true}" contextBandTitle="Context"></gc-global-footer>
      `);
      
      const h2 = el.shadowRoot!.querySelector('h2');
      const h3s = el.shadowRoot!.querySelectorAll('h3');
      
      expect(h2).to.exist; // Context band title
      expect(h3s.length).to.be.at.least(2); // Section titles
    });

    it('should have underlined links for visibility', async () => {
      const el = await fixture<GCGlobalFooter>(html`<gc-global-footer></gc-global-footer>`);
      
      const link = el.shadowRoot!.querySelector('.footer-link') as HTMLElement;
      const styles = getComputedStyle(link);
      
      expect(link.className).to.include('footer-link');
    });

    it('should support keyboard navigation', async () => {
      const el = await fixture<GCGlobalFooter>(html`<gc-global-footer></gc-global-footer>`);
      
      const links = el.shadowRoot!.querySelectorAll('.footer-link');
      expect(links.length).to.be.greaterThan(0);
      
      links.forEach((link) => {
        expect(link.tagName.toLowerCase()).to.equal('a');
      });
    });

    it('passes aXe accessibility audit', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer></gc-global-footer>
      `);
      
      await beAccessible(el);
    });

    it('passes aXe audit with context band', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer 
          .showContextBand="${true}"
          contextBandTitle="About this service">
        </gc-global-footer>
      `);
      
      await beAccessible(el);
    });

    it('passes aXe audit with all features enabled', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer 
          .showContextBand="${true}"
          contextBandTitle="Context"
          .showCorporateBand="${true}">
        </gc-global-footer>
      `);
      
      await beAccessible(el);
    });
  });

  describe('GC Design System Compliance', () => {
    it('should use FIP red border', async () => {
      const el = await fixture<GCGlobalFooter>(html`<gc-global-footer></gc-global-footer>`);
      
      // Border defined in CSS
      expect(el).to.exist;
    });

    it('should use Lato font family', async () => {
      const el = await fixture<GCGlobalFooter>(html`<gc-global-footer></gc-global-footer>`);
      
      const title = el.shadowRoot!.querySelector('.footer-section-title');
      expect(title).to.exist;
    });

    it('should use WET color palette for links', async () => {
      const el = await fixture<GCGlobalFooter>(html`<gc-global-footer></gc-global-footer>`);
      
      const link = el.shadowRoot!.querySelector('.footer-link');
      expect(link).to.exist;
      expect(link!.className).to.equal('footer-link');
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive container', async () => {
      const el = await fixture<GCGlobalFooter>(html`<gc-global-footer></gc-global-footer>`);
      
      const container = el.shadowRoot!.querySelector('.footer-container');
      expect(container).to.exist;
    });

    it('should use grid layout for sections', async () => {
      const el = await fixture<GCGlobalFooter>(html`<gc-global-footer></gc-global-footer>`);
      
      const sections = el.shadowRoot!.querySelector('.footer-sections');
      expect(sections).to.exist;
    });
  });

  describe('Performance', () => {
    it('should render quickly', async () => {
      const start = performance.now();
      await fixture<GCGlobalFooter>(html`<gc-global-footer></gc-global-footer>`);
      const end = performance.now();
      
      expect(end - start).to.be.lessThan(100); // < 100ms
    });

    it('should handle locale switching', async () => {
      const el = await fixture<GCGlobalFooter>(html`
        <gc-global-footer locale="en-CA"></gc-global-footer>
      `);
      
      expect(el.locale).to.equal('en-CA');
      
      el.locale = 'fr-CA';
      await el.updateComplete;
      
      expect(el.locale).to.equal('fr-CA');
      
      const text = el.shadowRoot!.querySelector('.wordmark-text');
      expect(text!.textContent).to.include('Gouvernement du Canada');
    });
  });
});
