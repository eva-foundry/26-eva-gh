import { test, expect } from '@playwright/test';

test.describe('Performance Benchmarks', () => {
  test('Component initialization should be fast', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/packages/eva-sovereign-ui-wc/demo-gallery.html');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    console.log(`Page load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(3000); // Should load in under 3 seconds
  });

  test('Component rendering should be performant', async ({ page }) => {
    await page.goto('/');
    
    // Measure time to create and render 100 buttons
    const renderTime = await page.evaluate(() => {
      const startTime = performance.now();
      const container = document.createElement('div');
      document.body.appendChild(container);
      
      for (let i = 0; i < 100; i++) {
        const button = document.createElement('eva-gc-button');
        button.textContent = `Button ${i}`;
        container.appendChild(button);
      }
      
      return performance.now() - startTime;
    });
    
    console.log(`100 buttons render time: ${renderTime}ms`);
    expect(renderTime).toBeLessThan(500); // Should render in under 500ms
  });

  test('Shadow DOM rendering should be efficient', async ({ page }) => {
    await page.goto('/');
    
    const shadowRenderTime = await page.evaluate(() => {
      const button = document.createElement('eva-gc-button');
      button.textContent = 'Test';
      document.body.appendChild(button);
      
      const startTime = performance.now();
      button.shadowRoot; // Access shadow root
      return performance.now() - startTime;
    });
    
    console.log(`Shadow DOM access time: ${shadowRenderTime}ms`);
    expect(shadowRenderTime).toBeLessThan(10);
  });

  test('Event handling should be fast', async ({ page }) => {
    await page.goto('/demo-button-enhanced.html');
    
    const eventTime = await page.evaluate(() => {
      const button = document.querySelector('eva-gc-button');
      if (!button) return 0;
      
      let clickCount = 0;
      const startTime = performance.now();
      
      button.addEventListener('click', () => {
        clickCount++;
      });
      
      // Trigger 1000 clicks
      for (let i = 0; i < 1000; i++) {
        button.shadowRoot?.querySelector('button')?.click();
      }
      
      const endTime = performance.now();
      return endTime - startTime;
    });
    
    console.log(`1000 clicks handled in: ${eventTime}ms`);
    expect(eventTime).toBeLessThan(1000); // Should handle 1000 clicks in under 1 second
  });

  test('Attribute changes should be reactive', async ({ page }) => {
    await page.goto('/');
    
    const reactivityTime = await page.evaluate(() => {
      const button = document.createElement('eva-gc-button');
      button.textContent = 'Test';
      document.body.appendChild(button);
      
      const startTime = performance.now();
      
      // Change variant 1000 times
      const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'];
      for (let i = 0; i < 1000; i++) {
        button.setAttribute('variant', variants[i % variants.length]);
      }
      
      return performance.now() - startTime;
    });
    
    console.log(`1000 attribute changes in: ${reactivityTime}ms`);
    expect(reactivityTime).toBeLessThan(2000);
  });

  test('Memory usage should be reasonable', async ({ page }) => {
    await page.goto('/');
    
    const memoryStats = await page.evaluate(async () => {
      // @ts-ignore
      if (!performance.memory) {
        return null;
      }
      
      // @ts-ignore
      const startMemory = performance.memory.usedJSHeapSize;
      
      const container = document.createElement('div');
      document.body.appendChild(container);
      
      // Create 100 components
      for (let i = 0; i < 100; i++) {
        const button = document.createElement('eva-gc-button');
        button.textContent = `Button ${i}`;
        container.appendChild(button);
      }
      
      // Force garbage collection if available
      // @ts-ignore
      if (typeof gc === 'function') {
        // @ts-ignore
        gc();
      }
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // @ts-ignore
      const endMemory = performance.memory.usedJSHeapSize;
      const memoryIncrease = (endMemory - startMemory) / 1024 / 1024; // MB
      
      // Clean up
      container.remove();
      
      return {
        startMB: startMemory / 1024 / 1024,
        endMB: endMemory / 1024 / 1024,
        increaseMB: memoryIncrease,
      };
    });
    
    if (memoryStats) {
      console.log(`Memory stats:`, memoryStats);
      expect(memoryStats.increaseMB).toBeLessThan(10); // Should use less than 10MB for 100 components
    }
  });

  test('Large list rendering should be performant', async ({ page }) => {
    await page.goto('/');
    
    const listRenderTime = await page.evaluate(() => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      
      const startTime = performance.now();
      
      // Create a large list of items
      for (let i = 0; i < 1000; i++) {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
          <eva-badge>Item ${i}</eva-badge>
          <eva-gc-button size="sm">Action</eva-gc-button>
        `;
        container.appendChild(item);
      }
      
      return performance.now() - startTime;
    });
    
    console.log(`1000 list items render time: ${listRenderTime}ms`);
    expect(listRenderTime).toBeLessThan(5000); // Should render in under 5 seconds
  });
});
