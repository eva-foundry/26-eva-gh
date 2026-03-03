const { chromium } = require('playwright');
const fs = require('fs');

async function runBenchmarks() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('🚀 Running Performance Benchmarks...\n');
  
  const results = {
    timestamp: new Date().toISOString(),
    tests: [],
  };
  
  // Benchmark 1: Component initialization
  console.log('📊 Test 1: Component Initialization');
  await page.goto('http://localhost:5173/demo-button-enhanced.html');
  const initMetrics = await page.evaluate(() => {
    const navTiming = performance.getEntriesByType('navigation')[0];
    return {
      domContentLoaded: navTiming.domContentLoadedEventEnd - navTiming.domContentLoadedEventStart,
      loadComplete: navTiming.loadEventEnd - navTiming.loadEventStart,
      domInteractive: navTiming.domInteractive - navTiming.fetchStart,
    };
  });
  console.log(`  ✓ DOM Content Loaded: ${initMetrics.domContentLoaded.toFixed(2)}ms`);
  console.log(`  ✓ Load Complete: ${initMetrics.loadComplete.toFixed(2)}ms`);
  console.log(`  ✓ DOM Interactive: ${initMetrics.domInteractive.toFixed(2)}ms\n`);
  results.tests.push({ name: 'Component Initialization', metrics: initMetrics });
  
  // Benchmark 2: Render 100 buttons
  console.log('📊 Test 2: Render 100 Buttons');
  const renderTime = await page.evaluate(() => {
    const startTime = performance.now();
    const container = document.createElement('div');
    document.body.appendChild(container);
    
    for (let i = 0; i < 100; i++) {
      const button = document.createElement('eva-gc-button');
      button.textContent = `Button ${i}`;
      container.appendChild(button);
    }
    
    const endTime = performance.now();
    container.remove();
    return endTime - startTime;
  });
  console.log(`  ✓ 100 components rendered in: ${renderTime.toFixed(2)}ms\n`);
  results.tests.push({ name: '100 Buttons Render', time: renderTime });
  
  // Benchmark 3: Event handling performance
  console.log('📊 Test 3: Event Handling (1000 clicks)');
  const eventTime = await page.evaluate(() => {
    const button = document.querySelector('eva-gc-button');
    if (!button) return 0;
    
    let clickCount = 0;
    button.addEventListener('click', () => clickCount++);
    
    const startTime = performance.now();
    for (let i = 0; i < 1000; i++) {
      button.shadowRoot?.querySelector('button')?.click();
    }
    return performance.now() - startTime;
  });
  console.log(`  ✓ 1000 clicks handled in: ${eventTime.toFixed(2)}ms\n`);
  results.tests.push({ name: '1000 Clicks', time: eventTime });
  
  // Benchmark 4: Attribute reactivity
  console.log('📊 Test 4: Attribute Reactivity (1000 changes)');
  const reactivityTime = await page.evaluate(() => {
    const button = document.createElement('eva-gc-button');
    document.body.appendChild(button);
    
    const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'];
    const startTime = performance.now();
    
    for (let i = 0; i < 1000; i++) {
      button.setAttribute('variant', variants[i % variants.length]);
    }
    
    const endTime = performance.now();
    button.remove();
    return endTime - startTime;
  });
  console.log(`  ✓ 1000 attribute changes in: ${reactivityTime.toFixed(2)}ms\n`);
  results.tests.push({ name: '1000 Attribute Changes', time: reactivityTime });
  
  // Benchmark 5: Memory usage
  console.log('📊 Test 5: Memory Usage');
  const memoryStats = await page.evaluate(() => {
    // @ts-ignore
    if (!performance.memory) return null;
    
    // @ts-ignore
    const before = performance.memory.usedJSHeapSize / 1024 / 1024;
    
    const container = document.createElement('div');
    document.body.appendChild(container);
    
    for (let i = 0; i < 100; i++) {
      const button = document.createElement('eva-gc-button');
      button.textContent = `Button ${i}`;
      container.appendChild(button);
    }
    
    // @ts-ignore
    const after = performance.memory.usedJSHeapSize / 1024 / 1024;
    
    container.remove();
    
    return {
      before: before.toFixed(2),
      after: after.toFixed(2),
      increase: (after - before).toFixed(2),
    };
  });
  
  if (memoryStats) {
    console.log(`  ✓ Before: ${memoryStats.before} MB`);
    console.log(`  ✓ After: ${memoryStats.after} MB`);
    console.log(`  ✓ Increase: ${memoryStats.increase} MB\n`);
    results.tests.push({ name: 'Memory Usage (100 components)', metrics: memoryStats });
  }
  
  // Benchmark 6: Bundle size comparison
  console.log('📊 Test 6: Bundle Size Analysis');
  const bundleStats = {
    note: 'Bundle size should be measured after build',
    estimation: 'Run "npm run build" and check dist/ directory',
  };
  console.log(`  ℹ️  Bundle size analysis requires build artifacts\n`);
  results.tests.push({ name: 'Bundle Size', info: bundleStats });
  
  // Save results
  fs.writeFileSync(
    'performance-results.json',
    JSON.stringify(results, null, 2)
  );
  
  console.log('✅ Performance benchmarks complete!');
  console.log('📄 Results saved to performance-results.json\n');
  
  // Generate summary
  console.log('📈 Performance Summary:');
  console.log('========================');
  console.log(`✓ Initial Load: ${initMetrics.domInteractive.toFixed(0)}ms`);
  console.log(`✓ 100 Components: ${renderTime.toFixed(0)}ms (${(renderTime / 100).toFixed(2)}ms each)`);
  console.log(`✓ Event Performance: ${(eventTime / 1000).toFixed(2)}ms per event`);
  console.log(`✓ Reactivity: ${(reactivityTime / 1000).toFixed(2)}ms per change`);
  if (memoryStats) {
    console.log(`✓ Memory: ${memoryStats.increase}MB for 100 components`);
  }
  
  await browser.close();
}

runBenchmarks().catch(console.error);
