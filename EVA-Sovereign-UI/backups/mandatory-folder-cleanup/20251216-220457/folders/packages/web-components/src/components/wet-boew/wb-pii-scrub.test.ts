import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach } from 'vitest';
import './wb-pii-scrub.js';
import type { WBPIIScrub } from './wb-pii-scrub.js';

describe('WBPIIScrub', () => {
  let scrubber: WBPIIScrub;

  beforeEach(async () => {
    scrubber = await fixture<WBPIIScrub>(html`
      <form>
        <wb-pii-scrub auto-detect></wb-pii-scrub>
        <input type="text" name="field1" value="123-456-789" />
        <input type="text" name="field2" value="test@example.com" />
        <button type="submit">Submit</button>
      </form>
    `);
  });

  it('renders', () => {
    expect(scrubber).to.exist;
  });

  it('detects SIN numbers', () => {
    const form = scrubber.closest('form')!;
    const input = form.querySelector('[name="field1"]') as HTMLInputElement;
    input.value = '123-456-789';
    scrubber.detectPII();
    const detected = (scrubber as any).detectedPII;
    expect(detected.length).to.be.greaterThan(0);
    expect(detected[0].type).to.equal('sin');
  });

  it('detects credit card numbers', () => {
    const form = scrubber.closest('form')!;
    const input = form.querySelector('[name="field1"]') as HTMLInputElement;
    input.value = '4111-1111-1111-1111';
    scrubber.detectPII();
    const detected = (scrubber as any).detectedPII;
    expect(detected.length).to.be.greaterThan(0);
    expect(detected[0].type).to.equal('creditCard');
  });

  it('detects email addresses', () => {
    const form = scrubber.closest('form')!;
    const input = form.querySelector('[name="field2"]') as HTMLInputElement;
    input.value = 'user@example.com';
    scrubber.detectPII();
    const detected = (scrubber as any).detectedPII;
    expect(detected.length).to.be.greaterThan(0);
    expect(detected[0].type).to.equal('email');
  });

  it('detects phone numbers', () => {
    const form = scrubber.closest('form')!;
    const input = form.querySelector('[name="field1"]') as HTMLInputElement;
    input.value = '(555) 123-4567';
    scrubber.detectPII();
    const detected = (scrubber as any).detectedPII;
    expect(detected.length).to.be.greaterThan(0);
    expect(detected[0].type).to.equal('phone');
  });

  it('detects multiple PII types', () => {
    const form = scrubber.closest('form')!;
    const input1 = form.querySelector('[name="field1"]') as HTMLInputElement;
    const input2 = form.querySelector('[name="field2"]') as HTMLInputElement;
    input1.value = '123-456-789';
    input2.value = 'test@example.com';
    scrubber.detectPII();
    const detected = (scrubber as any).detectedPII;
    expect(detected.length).to.equal(2);
  });

  it('scrubs SIN with [REDACTED]', () => {
    const form = scrubber.closest('form')!;
    const input = form.querySelector('[name="field1"]') as HTMLInputElement;
    input.value = '123-456-789';
    scrubber.scrubPII();
    expect(input.value).to.equal('[REDACTED]');
  });

  it('scrubs credit card with [REDACTED]', () => {
    const form = scrubber.closest('form')!;
    const input = form.querySelector('[name="field1"]') as HTMLInputElement;
    input.value = '4111-1111-1111-1111';
    scrubber.scrubPII();
    expect(input.value).to.equal('[REDACTED]');
  });

  it('scrubs email with [REDACTED]', () => {
    const form = scrubber.closest('form')!;
    const input = form.querySelector('[name="field2"]') as HTMLInputElement;
    input.value = 'user@example.com';
    scrubber.scrubPII();
    expect(input.value).to.equal('[REDACTED]');
  });

  it('scrubs phone with [REDACTED]', () => {
    const form = scrubber.closest('form')!;
    const input = form.querySelector('[name="field1"]') as HTMLInputElement;
    input.value = '(555) 123-4567';
    scrubber.scrubPII();
    expect(input.value).to.equal('[REDACTED]');
  });

  it('scrubs multiple fields', () => {
    const form = scrubber.closest('form')!;
    const input1 = form.querySelector('[name="field1"]') as HTMLInputElement;
    const input2 = form.querySelector('[name="field2"]') as HTMLInputElement;
    input1.value = '123-456-789';
    input2.value = 'test@example.com';
    scrubber.scrubPII();
    expect(input1.value).to.equal('[REDACTED]');
    expect(input2.value).to.equal('[REDACTED]');
  });

  it('preserves non-PII content', () => {
    const form = scrubber.closest('form')!;
    const input = form.querySelector('[name="field1"]') as HTMLInputElement;
    input.value = 'Just regular text';
    scrubber.scrubPII();
    expect(input.value).to.equal('Just regular text');
  });

  it('opens modal when PII detected on submit', async () => {
    const form = scrubber.closest('form')!;
    const input = form.querySelector('[name="field1"]') as HTMLInputElement;
    input.value = '123-456-789';
    
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await scrubber.updateComplete;
    
    const modal = scrubber.shadowRoot!.querySelector('.pii-modal');
    expect(modal?.classList.contains('open')).to.equal(true);
  });

  it('does not open modal when no PII detected', async () => {
    const form = scrubber.closest('form')!;
    const input1 = form.querySelector('[name="field1"]') as HTMLInputElement;
    const input2 = form.querySelector('[name="field2"]') as HTMLInputElement;
    input1.value = 'Safe text';
    input2.value = 'More safe text';
    
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await scrubber.updateComplete;
    
    const modal = scrubber.shadowRoot!.querySelector('.pii-modal');
    expect(modal?.classList.contains('open')).to.equal(false);
  });

  it('closes modal on cancel', async () => {
    const form = scrubber.closest('form')!;
    const input = form.querySelector('[name="field1"]') as HTMLInputElement;
    input.value = '123-456-789';
    
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await scrubber.updateComplete;
    
    const cancelBtn = scrubber.shadowRoot!.querySelector('.pii-btn-cancel') as HTMLButtonElement;
    cancelBtn.click();
    await scrubber.updateComplete;
    
    const modal = scrubber.shadowRoot!.querySelector('.pii-modal');
    expect(modal?.classList.contains('open')).to.equal(false);
  });

  it('emits wb-pii-scrubbed event', async () => {
    const form = scrubber.closest('form')!;
    const input = form.querySelector('[name="field1"]') as HTMLInputElement;
    input.value = '123-456-789';
    
    let eventFired = false;
    scrubber.addEventListener('wb-pii-scrubbed', () => { eventFired = true; });
    scrubber.scrubPII();
    await scrubber.updateComplete;
    
    expect(eventFired).to.equal(true);
  });

  it('emits wb-pii-cancel event', async () => {
    const form = scrubber.closest('form')!;
    const input = form.querySelector('[name="field1"]') as HTMLInputElement;
    input.value = '123-456-789';
    
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await scrubber.updateComplete;
    
    let eventFired = false;
    scrubber.addEventListener('wb-pii-cancel', () => { eventFired = true; });
    
    const cancelBtn = scrubber.shadowRoot!.querySelector('.pii-btn-cancel') as HTMLButtonElement;
    cancelBtn.click();
    await scrubber.updateComplete;
    
    expect(eventFired).to.equal(true);
  });

  it('has ARIA dialog attributes', async () => {
    const form = scrubber.closest('form')!;
    const input = form.querySelector('[name="field1"]') as HTMLInputElement;
    input.value = '123-456-789';
    
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await scrubber.updateComplete;
    
    const modal = scrubber.shadowRoot!.querySelector('.pii-modal');
    expect(modal?.getAttribute('role')).to.equal('dialog');
    expect(modal?.getAttribute('aria-modal')).to.equal('true');
    expect(modal?.getAttribute('aria-labelledby')).to.equal('pii-title');
  });

  it('displays detected PII in modal', async () => {
    const form = scrubber.closest('form')!;
    const input = form.querySelector('[name="field1"]') as HTMLInputElement;
    input.value = '123-456-789';
    
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await scrubber.updateComplete;
    
    const list = scrubber.shadowRoot!.querySelector('.pii-list');
    expect(list?.children.length).to.be.greaterThan(0);
  });

  it('works without auto-detect', async () => {
    const manual = await fixture<WBPIIScrub>(html`
      <form>
        <wb-pii-scrub></wb-pii-scrub>
        <input type="text" name="field1" value="123-456-789" />
      </form>
    `);
    
    expect(manual).to.exist;
    manual.detectPII();
    const detected = (manual as any).detectedPII;
    expect(detected.length).to.be.greaterThan(0);
  });

  it('can target specific form', async () => {
    const container = await fixture(html`
      <div>
        <wb-pii-scrub target="#target-form"></wb-pii-scrub>
        <form id="target-form">
          <input type="text" name="field1" value="123-456-789" />
        </form>
      </div>
    `);
    
    const scrubberEl = container.querySelector('wb-pii-scrub') as WBPIIScrub;
    expect(scrubberEl).to.exist;
  });
});
