import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach, vi } from 'vitest';
import './wb-data-json.js';
import type { WBDataJSON } from './wb-data-json.js';

describe('WBDataJSON', () => {
  let datajson: WBDataJSON;

  beforeEach(async () => {
    global.fetch = vi.fn();
    datajson = await fixture<WBDataJSON>(html`
      <wb-data-json auto-load="false"></wb-data-json>
    `);
  });

  it('renders', () => {
    expect(datajson).to.exist;
  });

  it('has url property', async () => {
    datajson.url = '/data.json';
    await datajson.updateComplete;
    expect(datajson.url).to.equal('/data.json');
  });

  it('has template property', async () => {
    datajson.template = '<p>{{ name }}</p>';
    await datajson.updateComplete;
    expect(datajson.template).to.equal('<p>{{ name }}</p>');
  });

  it('has data property', async () => {
    datajson.data = { name: 'Test' };
    await datajson.updateComplete;
    expect(datajson.data).to.deep.equal({ name: 'Test' });
  });

  it('has autoLoad property', () => {
    expect(datajson.autoLoad).to.equal(false);
  });

  it('loadData method exists', () => {
    expect(datajson.loadData).to.be.a('function');
  });

  it('renders data with template', async () => {
    datajson.template = '<p>{{ name }}</p>';
    datajson.data = { name: 'Alice' };
    await datajson.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 50));
    const content = datajson.shadowRoot!.textContent;
    expect(content).to.include('Alice');
  });

  it('renders array of data', async () => {
    datajson.template = '<p>{{ name }}</p>';
    datajson.data = [{ name: 'Alice' }, { name: 'Bob' }];
    await datajson.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 50));
    const content = datajson.shadowRoot!.textContent;
    expect(content).to.include('Alice');
    expect(content).to.include('Bob');
  });

  it('handles missing template gracefully', async () => {
    datajson.data = { name: 'Test' };
    await datajson.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(datajson).to.exist;
  });

  it('emits wb-json-loaded event', async () => {
    let eventFired = false;
    datajson.addEventListener('wb-json-loaded', () => { eventFired = true; });
    datajson.url = '/data.json';
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ name: 'Test' })
    });
    await datajson.loadData();
    expect(eventFired).to.equal(true);
  });

  it('emits wb-json-error event on failure', async () => {
    let eventFired = false;
    datajson.addEventListener('wb-json-error', () => { eventFired = true; });
    datajson.url = '/invalid.json';
    (global.fetch as any).mockRejectedValue(new Error('Network error'));
    await datajson.loadData();
    expect(eventFired).to.equal(true);
  });

  it('emits wb-json-rendered event', async () => {
    let eventFired = false;
    datajson.addEventListener('wb-json-rendered', () => { eventFired = true; });
    datajson.data = { name: 'Test' };
    await datajson.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(eventFired).to.equal(true);
  });

  it('event includes count', async () => {
    let count = 0;
    datajson.addEventListener('wb-json-rendered', (e: Event) => {
      count = (e as CustomEvent).detail.count;
    });
    datajson.data = [{ name: 'A' }, { name: 'B' }];
    await datajson.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(count).to.equal(2);
  });

  it('displays error message', async () => {
    datajson.url = '/invalid.json';
    (global.fetch as any).mockRejectedValue(new Error('Network error'));
    await datajson.loadData();
    await datajson.updateComplete;
    const error = datajson.shadowRoot!.querySelector('.json-error');
    expect(error).to.exist;
  });

  it('error has role=alert', async () => {
    datajson.url = '/invalid.json';
    (global.fetch as any).mockRejectedValue(new Error('Network error'));
    await datajson.loadData();
    await datajson.updateComplete;
    const error = datajson.shadowRoot!.querySelector('.json-error');
    expect(error?.getAttribute('role')).to.equal('alert');
  });

  it('handles HTTP errors', async () => {
    datajson.url = '/data.json';
    (global.fetch as any).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    });
    await datajson.loadData();
    await datajson.updateComplete;
    const error = datajson.shadowRoot!.querySelector('.json-error');
    expect(error?.textContent).to.include('404');
  });

  it('auto-loads when autoLoad=true', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ name: 'Auto' })
    });
    const autoLoad = await fixture<WBDataJSON>(html`
      <wb-data-json url="/auto.json" auto-load="true"></wb-data-json>
    `);
    await new Promise(resolve => setTimeout(resolve, 100));
    expect((global.fetch as any).mock.calls.length).to.be.greaterThan(0);
  });

  it('does not auto-load when autoLoad=false', async () => {
    (global.fetch as any).mockClear();
    const noAutoLoad = await fixture<WBDataJSON>(html`
      <wb-data-json url="/test.json" auto-load="false"></wb-data-json>
    `);
    await new Promise(resolve => setTimeout(resolve, 50));
    expect((global.fetch as any).mock.calls.length).to.equal(0);
  });

  it('replaces single template variable', async () => {
    datajson.template = '<p>{{ title }}</p>';
    datajson.data = { title: 'Hello' };
    await datajson.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 50));
    const content = datajson.shadowRoot!.textContent;
    expect(content).to.include('Hello');
  });

  it('replaces multiple template variables', async () => {
    datajson.template = '<p>{{ first }} {{ last }}</p>';
    datajson.data = { first: 'John', last: 'Doe' };
    await datajson.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 50));
    const content = datajson.shadowRoot!.textContent;
    expect(content).to.include('John');
    expect(content).to.include('Doe');
  });

  it('handles whitespace in template variables', async () => {
    datajson.template = '<p>{{   name   }}</p>';
    datajson.data = { name: 'Test' };
    await datajson.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 50));
    const content = datajson.shadowRoot!.textContent;
    expect(content).to.include('Test');
  });

  it('handles missing data fields gracefully', async () => {
    datajson.template = '<p>{{ missing }}</p>';
    datajson.data = { name: 'Test' };
    await datajson.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(datajson).to.exist;
  });

  it('converts data values to strings', async () => {
    datajson.template = '<p>{{ count }}</p>';
    datajson.data = { count: 42 };
    await datajson.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 50));
    const content = datajson.shadowRoot!.textContent;
    expect(content).to.include('42');
  });

  it('handles null data gracefully', async () => {
    datajson.data = null;
    await datajson.updateComplete;
    expect(datajson).to.exist;
  });

  it('updates when data changes', async () => {
    datajson.template = '<p>{{ name }}</p>';
    datajson.data = { name: 'First' };
    await datajson.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 50));
    datajson.data = { name: 'Second' };
    await datajson.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 50));
    const content = datajson.shadowRoot!.textContent;
    expect(content).to.include('Second');
  });

  it('parses JSON from fetch', async () => {
    datajson.url = '/data.json';
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ name: 'Fetched' })
    });
    await datajson.loadData();
    expect(datajson.data).to.deep.equal({ name: 'Fetched' });
  });

  it('renders without errors when empty', async () => {
    const empty = await fixture<WBDataJSON>(html`
      <wb-data-json auto-load="false"></wb-data-json>
    `);
    expect(empty).to.exist;
  });
});
