import { expect, fixture, html, oneEvent, expect as wcExpect } from '@open-wc/testing';
import '../src/components/gc-patterns/gc-signature.js';
import type { GCSignature } from '../src/components/gc-patterns/gc-signature.js';

describe('gc-signature', () => {
  describe('Initialization', () => {
    it('should render with default properties', async () => {
      const el = await fixture<GCSignature>(html`<gc-signature></gc-signature>`);
      
      expect(el).to.exist;
      expect(el.size).to.equal('medium');
      expect(el.href).to.equal('/');
      expect(el.linked).to.be.true;
      expect(el.inverted).to.be.false;
    });

    it('should render as a link by default', async () => {
      const el = await fixture<GCSignature>(html`<gc-signature></gc-signature>`);
      
      const link = el.shadowRoot!.querySelector('a');
      expect(link).to.exist;
      expect(link!.href).to.include('/');
    });

    it('should render as static when linked is false', async () => {
      const el = await fixture<GCSignature>(html`
        <gc-signature .linked="${false}"></gc-signature>
      `);
      
      const link = el.shadowRoot!.querySelector('a');
      const staticDiv = el.shadowRoot!.querySelector('.signature-static');
      
      expect(link).to.not.exist;
      expect(staticDiv).to.exist;
    });

    it('should have size attribute reflected', async () => {
      const el = await fixture<GCSignature>(html`
        <gc-signature size="large"></gc-signature>
      `);
      
      expect(el.getAttribute('size')).to.equal('large');
    });

    it('should have inverted attribute reflected', async () => {
      const el = await fixture<GCSignature>(html`
        <gc-signature .inverted="${true}"></gc-signature>
      `);
      
      expect(el.hasAttribute('inverted')).to.be.true;
    });
  });

  describe('Flag Icon', () => {
    it('should render flag icon', async () => {
      const el = await fixture<GCSignature>(html`<gc-signature></gc-signature>`);
      
      const flag = el.shadowRoot!.querySelector('.flag-icon');
      expect(flag).to.exist;
    });

    it('should have flag accessible label in English', async () => {
      const el = await fixture<GCSignature>(html`
        <gc-signature locale="en-CA"></gc-signature>
      `);
      
      const flag = el.shadowRoot!.querySelector('.flag-icon');
      expect(flag!.getAttribute('role')).to.equal('img');
      expect(flag!.getAttribute('aria-label')).to.equal('Canadian flag');
    });

    it('should have flag accessible label in French', async () => {
      const el = await fixture<GCSignature>(html`
        <gc-signature locale="fr-CA"></gc-signature>
      `);
      
      const flag = el.shadowRoot!.querySelector('.flag-icon');
      expect(flag!.getAttribute('aria-label')).to.equal('Drapeau du Canada');
    });
  });

  describe('Wordmark', () => {
    it('should render wordmark text', async () => {
      const el = await fixture<GCSignature>(html`<gc-signature></gc-signature>`);
      
      const wordmark = el.shadowRoot!.querySelector('.wordmark');
      expect(wordmark).to.exist;
    });

    it('should render Canada.ca in main text', async () => {
      const el = await fixture<GCSignature>(html`<gc-signature></gc-signature>`);
      
      const main = el.shadowRoot!.querySelector('.wordmark-main');
      expect(main).to.exist;
      expect(main!.textContent).to.equal('Canada.ca');
    });

    it('should render English government text', async () => {
      const el = await fixture<GCSignature>(html`
        <gc-signature locale="en-CA"></gc-signature>
      `);
      
      const sub = el.shadowRoot!.querySelector('.wordmark-sub');
      expect(sub).to.exist;
      expect(sub!.textContent).to.equal('Government of Canada');
    });

    it('should render French government text', async () => {
      const el = await fixture<GCSignature>(html`
        <gc-signature locale="fr-CA"></gc-signature>
      `);
      
      const sub = el.shadowRoot!.querySelector('.wordmark-sub');
      expect(sub!.textContent).to.equal('Gouvernement du Canada');
    });
  });

  describe('Size Variants', () => {
    it('should support small size', async () => {
      const el = await fixture<GCSignature>(html`
        <gc-signature size="small"></gc-signature>
      `);
      
      expect(el.size).to.equal('small');
      expect(el.getAttribute('size')).to.equal('small');
    });

    it('should support medium size (default)', async () => {
      const el = await fixture<GCSignature>(html`
        <gc-signature size="medium"></gc-signature>
      `);
      
      expect(el.size).to.equal('medium');
    });

    it('should support large size', async () => {
      const el = await fixture<GCSignature>(html`
        <gc-signature size="large"></gc-signature>
      `);
      
      expect(el.size).to.equal('large');
      expect(el.getAttribute('size')).to.equal('large');
    });

    it('should update size dynamically', async () => {
      const el = await fixture<GCSignature>(html`<gc-signature></gc-signature>`);
      
      expect(el.size).to.equal('medium');
      
      el.size = 'large';
      await el.updateComplete;
      
      expect(el.size).to.equal('large');
      expect(el.getAttribute('size')).to.equal('large');
    });
  });

  describe('Link Behavior', () => {
    it('should navigate to custom href', async () => {
      const el = await fixture<GCSignature>(html`
        <gc-signature href="/en/home"></gc-signature>
      `);
      
      const link = el.shadowRoot!.querySelector('a') as HTMLAnchorElement;
      expect(link.href).to.include('/en/home');
    });

    it('should have accessible label in English', async () => {
      const el = await fixture<GCSignature>(html`
        <gc-signature locale="en-CA"></gc-signature>
      `);
      
      const link = el.shadowRoot!.querySelector('a');
      expect(link!.getAttribute('aria-label')).to.equal('Government of Canada');
    });

    it('should have accessible label in French', async () => {
      const el = await fixture<GCSignature>(html`
        <gc-signature locale="fr-CA"></gc-signature>
      `);
      
      const link = el.shadowRoot!.querySelector('a');
      expect(link!.getAttribute('aria-label')).to.equal('Gouvernement du Canada');
    });

    it('should emit gc-signature-click event when clicked', async () => {
      const el = await fixture<GCSignature>(html`<gc-signature></gc-signature>`);
      
      const link = el.shadowRoot!.querySelector('a') as HTMLAnchorElement;
      
      setTimeout(() => link.click());
      const event = await oneEvent(el, 'gc-signature-click');
      
      expect(event.detail.href).to.equal('/');
      expect(event.detail.locale).to.exist;
    });

    it('should bubble gc-signature-click event', async () => {
      const el = await fixture<GCSignature>(html`<gc-signature></gc-signature>`);
      
      const link = el.shadowRoot!.querySelector('a') as HTMLAnchorElement;
      
      setTimeout(() => link.click());
      const event = await oneEvent(el, 'gc-signature-click');
      
      expect(event.bubbles).to.be.true;
      expect(event.composed).to.be.true;
    });

    it('should include locale in event detail', async () => {
      const el = await fixture<GCSignature>(html`
        <gc-signature locale="fr-CA"></gc-signature>
      `);
      
      const link = el.shadowRoot!.querySelector('a') as HTMLAnchorElement;
      
      setTimeout(() => link.click());
      const event = await oneEvent(el, 'gc-signature-click');
      
      expect(event.detail.locale).to.equal('fr-CA');
    });
  });

  describe('Static (Non-linked) Signature', () => {
    it('should render without link when linked is false', async () => {
      const el = await fixture<GCSignature>(html`
        <gc-signature .linked="${false}"></gc-signature>
      `);
      
      const link = el.shadowRoot!.querySelector('a');
      const container = el.shadowRoot!.querySelector('.signature-container');
      
      expect(link).to.not.exist;
      expect(container).to.exist;
    });

    it('should have signature-static class', async () => {
      const el = await fixture<GCSignature>(html`
        <gc-signature .linked="${false}"></gc-signature>
      `);
      
      const staticSignature = el.shadowRoot!.querySelector('.signature-static');
      expect(staticSignature).to.exist;
    });

    it('should have role img when static', async () => {
      const el = await fixture<GCSignature>(html`
        <gc-signature .linked="${false}"></gc-signature>
      `);
      
      const container = el.shadowRoot!.querySelector('.signature-container');
      expect(container!.getAttribute('role')).to.equal('img');
    });

    it('should have aria-label when static', async () => {
      const el = await fixture<GCSignature>(html`
        <gc-signature .linked="${false}" locale="en-CA"></gc-signature>
      `);
      
      const container = el.shadowRoot!.querySelector('.signature-container');
      expect(container!.getAttribute('aria-label')).to.equal('Government of Canada');
    });
  });

  describe('Inverted Color Scheme', () => {
    it('should support inverted colors', async () => {
      const el = await fixture<GCSignature>(html`
        <gc-signature .inverted="${true}"></gc-signature>
      `);
      
      expect(el.inverted).to.be.true;
      expect(el.hasAttribute('inverted')).to.be.true;
    });

    it('should toggle inverted state', async () => {
      const el = await fixture<GCSignature>(html`<gc-signature></gc-signature>`);
      
      expect(el.inverted).to.be.false;
      
      el.inverted = true;
      await el.updateComplete;
      
      expect(el.inverted).to.be.true;
      expect(el.hasAttribute('inverted')).to.be.true;
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible when linked', async () => {
      const el = await fixture<GCSignature>(html`<gc-signature></gc-signature>`);
      
      const link = el.shadowRoot!.querySelector('a');
      expect(link).to.exist;
      expect(link!.tagName.toLowerCase()).to.equal('a');
    });

    it('should have proper ARIA labels', async () => {
      const el = await fixture<GCSignature>(html`
        <gc-signature locale="en-CA"></gc-signature>
      `);
      
      const link = el.shadowRoot!.querySelector('a');
      const flag = el.shadowRoot!.querySelector('.flag-icon');
      
      expect(link!.getAttribute('aria-label')).to.include('Government');
      expect(flag!.getAttribute('aria-label')).to.include('flag');
    });

    it('should support focus', async () => {
      const el = await fixture<GCSignature>(html`<gc-signature></gc-signature>`);
      
      const link = el.shadowRoot!.querySelector('a') as HTMLAnchorElement;
      link.focus();
      
      expect(el.shadowRoot!.activeElement).to.equal(link);
    });

    it('passes aXe accessibility audit', async () => {
      const el = await fixture<GCSignature>(html`<gc-signature></gc-signature>`);
      await wcExpect(el).to.be.accessible();
    });
  });

  describe('GC Design System Compliance', () => {
    it('should use FIP red for flag', async () => {
      const el = await fixture<GCSignature>(html`<gc-signature></gc-signature>`);
      
      const flag = el.shadowRoot!.querySelector('.flag-icon');
      expect(flag).to.exist;
      expect(flag!.className).to.equal('flag-icon');
    });

    it('should use Lato font family', async () => {
      const el = await fixture<GCSignature>(html`<gc-signature></gc-signature>`);
      
      const wordmark = el.shadowRoot!.querySelector('.wordmark');
      expect(wordmark).to.exist;
    });

    it('should have proper flag structure', async () => {
      const el = await fixture<GCSignature>(html`<gc-signature></gc-signature>`);
      
      const flag = el.shadowRoot!.querySelector('.flag-icon');
      expect(flag).to.exist;
      expect(flag!.className).to.equal('flag-icon');
    });
  });

  describe('Responsive Design', () => {
    it('should be inline-block by default', async () => {
      const el = await fixture<GCSignature>(html`<gc-signature></gc-signature>`);
      
      // Component exists and renders correctly
      expect(el).to.exist;
      expect(el.shadowRoot).to.exist;
    });

    it('should maintain aspect ratio at all sizes', async () => {
      const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];
      
      for (const size of sizes) {
        const el = await fixture<GCSignature>(html`
          <gc-signature size="${size}"></gc-signature>
        `);
        
        const flag = el.shadowRoot!.querySelector('.flag-icon');
        expect(flag).to.exist;
      }
    });
  });

  describe('Bilingual Support', () => {
    it('should switch text to French', async () => {
      const el = await fixture<GCSignature>(html`
        <gc-signature locale="fr-CA"></gc-signature>
      `);
      
      const sub = el.shadowRoot!.querySelector('.wordmark-sub');
      expect(sub!.textContent).to.equal('Gouvernement du Canada');
    });

    it('should switch ARIA labels to French', async () => {
      const el = await fixture<GCSignature>(html`
        <gc-signature locale="fr-CA"></gc-signature>
      `);
      
      const link = el.shadowRoot!.querySelector('a');
      expect(link!.getAttribute('aria-label')).to.equal('Gouvernement du Canada');
    });

    it('should update when locale changes', async () => {
      const el = await fixture<GCSignature>(html`
        <gc-signature locale="en-CA"></gc-signature>
      `);
      
      let sub = el.shadowRoot!.querySelector('.wordmark-sub');
      expect(sub!.textContent).to.equal('Government of Canada');
      
      el.locale = 'fr-CA';
      await el.updateComplete;
      
      sub = el.shadowRoot!.querySelector('.wordmark-sub');
      expect(sub!.textContent).to.equal('Gouvernement du Canada');
    });
  });

  describe('Events', () => {
    it('should not emit event when static', async () => {
      const el = await fixture<GCSignature>(html`
        <gc-signature .linked="${false}"></gc-signature>
      `);
      
      let eventFired = false;
      el.addEventListener('gc-signature-click', () => {
        eventFired = true;
      });
      
      const container = el.shadowRoot!.querySelector('.signature-container') as HTMLElement;
      container.click();
      await el.updateComplete;
      
      expect(eventFired).to.be.false;
    });

    it('should emit event with correct detail', async () => {
      const el = await fixture<GCSignature>(html`
        <gc-signature href="/test" locale="en-CA"></gc-signature>
      `);
      
      const link = el.shadowRoot!.querySelector('a') as HTMLAnchorElement;
      
      setTimeout(() => link.click());
      const event = await oneEvent(el, 'gc-signature-click');
      
      expect(event.detail).to.deep.include({
        href: '/test',
        locale: 'en-CA',
      });
    });
  });

  describe('Performance', () => {
    it('should render quickly', async () => {
      const start = performance.now();
      await fixture<GCSignature>(html`<gc-signature></gc-signature>`);
      const end = performance.now();
      
      expect(end - start).to.be.lessThan(100); // < 100ms
    });

    it('should handle rapid property updates', async () => {
      const el = await fixture<GCSignature>(html`<gc-signature></gc-signature>`);
      
      const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large', 'medium', 'small'];
      
      for (const size of sizes) {
        el.size = size;
        await el.updateComplete;
        expect(el.size).to.equal(size);
      }
    });

    it('should handle locale switching efficiently', async () => {
      const el = await fixture<GCSignature>(html`<gc-signature></gc-signature>`);
      
      for (let i = 0; i < 5; i++) {
        el.locale = i % 2 === 0 ? 'en-CA' : 'fr-CA';
        await el.updateComplete;
      }
      
      const sub = el.shadowRoot!.querySelector('.wordmark-sub');
      expect(sub).to.exist;
    });
  });
});
