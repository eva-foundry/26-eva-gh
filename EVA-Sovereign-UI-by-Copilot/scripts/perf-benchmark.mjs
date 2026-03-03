/*
 Performance Benchmark: render key components and measure timings
 World Class Government-grade thresholds:
 - Initial render per component <= 16ms average (one frame)
 - Total benchmark suite <= 200ms
*/
import { performance } from 'node:perf_hooks';
import { JSDOM } from 'jsdom';

const components = [
  'eva-button',
  'eva-accordion',
  'eva-dropdown-menu',
  'eva-pagination',
  'eva-menubar',
  'eva-context-menu',
  'eva-carousel'
];

async function loadBundle(window) {
  const esModulePath = new URL('../dist/eva-sovereign-ui.es.js', import.meta.url);
  const mod = await import(esModulePath);
  // Import ensures customElements are defined
  return mod;
}

async function run() {
  const dom = new JSDOM('<!doctype html><html><body></body></html>', { pretendToBeVisual: true });
  global.window = dom.window;
  global.document = dom.window.document;
  global.customElements = dom.window.customElements;
  global.HTMLElement = dom.window.HTMLElement;
  global.Event = dom.window.Event;
  global.CustomEvent = dom.window.CustomEvent;

  await loadBundle(dom.window);

  const results = [];
  const startAll = performance.now();
  for (const tag of components) {
    const start = performance.now();
    const el = document.createElement(tag);
    document.body.appendChild(el);
    // microtask settle
    await new Promise(r => setTimeout(r, 0));
    const end = performance.now();
    results.push({ tag, duration: end - start });
  }
  const endAll = performance.now();

  const avg = results.reduce((s, r) => s + r.duration, 0) / results.length;
  const max = Math.max(...results.map(r => r.duration));
  const total = endAll - startAll;

  console.log('Benchmark results:', results);
  console.log(`Average per component: ${avg.toFixed(2)} ms, Max: ${max.toFixed(2)} ms, Total: ${total.toFixed(2)} ms`);

  // Thresholds
  const perAvgThreshold = 16.0;
  const totalThreshold = 200.0;

  if (avg > perAvgThreshold || total > totalThreshold) {
    console.error(`Performance thresholds exceeded. avg>${perAvgThreshold} or total>${totalThreshold}`);
    process.exit(1);
  } else {
    console.log('✔ Performance thresholds OK');
  }
}

run().catch(err => { console.error(err); process.exit(1); });
