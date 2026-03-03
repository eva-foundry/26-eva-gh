import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach } from 'vitest';
import './wb-charts.js';
import type { WBCharts, ChartData } from './wb-charts.js';

describe('WBCharts', () => {
  let chart: WBCharts;
  const sampleData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      { label: 'Sales', data: [10, 20, 15, 25], backgroundColor: '#335075' },
      { label: 'Revenue', data: [15, 25, 20, 30], backgroundColor: '#26374a' }
    ]
  };

  beforeEach(async () => {
    chart = await fixture<WBCharts>(html`<wb-charts></wb-charts>`);
    chart.data = sampleData;
    await chart.updateComplete;
  });

  it('renders', () => {
    expect(chart).to.exist;
  });

  it('renders canvas element', () => {
    const canvas = chart.shadowRoot!.querySelector('canvas');
    expect(canvas).to.exist;
  });

  it('defaults to bar chart', () => {
    expect(chart.type).to.equal('bar');
  });

  it('supports line chart type', async () => {
    chart.type = 'line';
    await chart.updateComplete;
    expect(chart.type).to.equal('line');
  });

  it('supports pie chart type', async () => {
    chart.type = 'pie';
    await chart.updateComplete;
    expect(chart.type).to.equal('pie');
  });

  it('supports donut chart type', async () => {
    chart.type = 'donut';
    await chart.updateComplete;
    expect(chart.type).to.equal('donut');
  });

  it('shows legend by default', () => {
    const legend = chart.shadowRoot!.querySelector('.chart-legend');
    expect(legend).to.exist;
  });

  it('hides legend when show-legend=false', async () => {
    chart.showLegend = false;
    await chart.updateComplete;
    const legend = chart.shadowRoot!.querySelector('.chart-legend');
    expect(legend).to.be.null;
  });

  it('renders legend items', () => {
    const legendItems = chart.shadowRoot!.querySelectorAll('.legend-item');
    expect(legendItems.length).to.equal(2);
  });

  it('legend items have correct labels', () => {
    const legendItems = chart.shadowRoot!.querySelectorAll('.legend-item');
    expect(legendItems[0]?.textContent).to.include('Sales');
    expect(legendItems[1]?.textContent).to.include('Revenue');
  });

  it('toggles dataset visibility', async () => {
    const legendItem = chart.shadowRoot!.querySelector('.legend-item') as HTMLElement;
    legendItem.click();
    await chart.updateComplete;
    expect(legendItem.classList.contains('disabled')).to.equal(true);
  });

  it('toggles dataset with Enter key', async () => {
    const legendItem = chart.shadowRoot!.querySelector('.legend-item') as HTMLElement;
    legendItem.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await chart.updateComplete;
    expect(legendItem.classList.contains('disabled')).to.equal(true);
  });

  it('toggles dataset with Space key', async () => {
    const legendItem = chart.shadowRoot!.querySelector('.legend-item') as HTMLElement;
    legendItem.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    await chart.updateComplete;
    expect(legendItem.classList.contains('disabled')).to.equal(true);
  });

  it('shows data table when show-table=true', async () => {
    chart.showTable = true;
    await chart.updateComplete;
    const table = chart.shadowRoot!.querySelector('.chart-table');
    expect(table).to.exist;
  });

  it('hides data table by default', () => {
    const table = chart.shadowRoot!.querySelector('.chart-table');
    expect(table).to.be.null;
  });

  it('data table has correct headers', async () => {
    chart.showTable = true;
    await chart.updateComplete;
    const headers = chart.shadowRoot!.querySelectorAll('.chart-table thead th');
    expect(headers.length).to.equal(5); // Empty + 4 labels
  });

  it('data table has correct rows', async () => {
    chart.showTable = true;
    await chart.updateComplete;
    const rows = chart.shadowRoot!.querySelectorAll('.chart-table tbody tr');
    expect(rows.length).to.equal(2); // 2 datasets
  });

  it('emits wb-chart-toggle event', async () => {
    let eventFired = false;
    chart.addEventListener('wb-chart-toggle', () => { eventFired = true; });
    const legendItem = chart.shadowRoot!.querySelector('.legend-item') as HTMLElement;
    legendItem.click();
    await chart.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('has role="img" on chart container', () => {
    const container = chart.shadowRoot!.querySelector('.chart-container');
    expect(container?.getAttribute('role')).to.equal('img');
  });

  it('has aria-label on chart container', () => {
    const container = chart.shadowRoot!.querySelector('.chart-container');
    expect(container?.getAttribute('aria-label')).to.exist;
  });

  it('uses custom title in aria-label', async () => {
    chart.title = 'Sales Chart';
    await chart.updateComplete;
    const container = chart.shadowRoot!.querySelector('.chart-container');
    expect(container?.getAttribute('aria-label')).to.equal('Sales Chart');
  });

  it('legend items have tabindex', () => {
    const legendItem = chart.shadowRoot!.querySelector('.legend-item');
    expect(legendItem?.getAttribute('tabindex')).to.equal('0');
  });

  it('legend items have aria-label', () => {
    const legendItem = chart.shadowRoot!.querySelector('.legend-item');
    expect(legendItem?.getAttribute('aria-label')).to.include('Sales');
  });

  it('has visually-hidden description', () => {
    const hidden = chart.shadowRoot!.querySelector('.visually-hidden');
    expect(hidden).to.exist;
  });

  it('data table has caption', async () => {
    chart.showTable = true;
    await chart.updateComplete;
    const caption = chart.shadowRoot!.querySelector('.chart-table caption');
    expect(caption).to.exist;
  });

  it('handles empty data', async () => {
    chart.data = { labels: [], datasets: [] };
    await chart.updateComplete;
    const legendItems = chart.shadowRoot!.querySelectorAll('.legend-item');
    expect(legendItems.length).to.equal(0);
  });

  it('renders legend colors', () => {
    const legendColor = chart.shadowRoot!.querySelector('.legend-color') as HTMLElement;
    expect(legendColor).to.exist;
    expect(legendColor.style.backgroundColor).to.include('335075');
  });
});
