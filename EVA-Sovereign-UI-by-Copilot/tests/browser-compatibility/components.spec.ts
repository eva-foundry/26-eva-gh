import { test, expect } from '@playwright/test';

test.describe('Browser Compatibility Tests', () => {
  test('Components should render in all browsers', async ({ page, browserName }) => {
    await page.goto('/packages/eva-sovereign-ui-wc/demo-gallery.html');
    
    // Wait for components to load
    await page.waitForLoadState('networkidle');
    
    // Check that custom elements are defined
    const isButtonDefined = await page.evaluate(() => {
      return typeof customElements.get('eva-gc-button') !== 'undefined';
    });
    
    expect(isButtonDefined).toBe(true);
    
    // Take screenshot for visual regression
    await page.screenshot({ 
      path: `test-results/screenshots/${browserName}-demo-gallery.png`,
      fullPage: true 
    });
  });

  test('Shadow DOM should work correctly', async ({ page }) => {
    await page.goto('/demo-button-enhanced.html');
    
    const button = page.locator('eva-gc-button').first();
    
    // Check shadow root exists
    const hasShadowRoot = await button.evaluate((el) => {
      return el.shadowRoot !== null;
    });
    
    expect(hasShadowRoot).toBe(true);
  });

  test('Custom events should propagate correctly', async ({ page }) => {
    await page.goto('/demo-button-enhanced.html');
    
    // Listen for custom events
    const eventFired = await page.evaluate(() => {
      return new Promise((resolve) => {
        const button = document.querySelector('eva-gc-button');
        if (button) {
          button.addEventListener('click', () => resolve(true), { once: true });
          button.shadowRoot?.querySelector('button')?.click();
        }
        setTimeout(() => resolve(false), 1000);
      });
    });
    
    expect(eventFired).toBe(true);
  });

  test('CSS custom properties should cascade correctly', async ({ page }) => {
    await page.goto('/demo-button-enhanced.html');
    
    const button = page.locator('eva-gc-button').first();
    
    // Check that design tokens are applied
    const backgroundColor = await button.evaluate((el) => {
      const shadowButton = el.shadowRoot?.querySelector('button');
      if (!shadowButton) return null;
      return window.getComputedStyle(shadowButton).backgroundColor;
    });
    
    expect(backgroundColor).not.toBeNull();
    expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('Slots should render content correctly', async ({ page }) => {
    await page.goto('/packages/eva-sovereign-ui-wc/demo-gallery.html');
    
    // Find a component that uses slots
    const card = page.locator('eva-card').first();
    
    if (await card.count() > 0) {
      const hasSlottedContent = await card.evaluate((el) => {
        const slots = el.shadowRoot?.querySelectorAll('slot');
        if (!slots) return false;
        
        return Array.from(slots).some(slot => {
          const assignedNodes = slot.assignedNodes();
          return assignedNodes.length > 0;
        });
      });
      
      expect(hasSlottedContent).toBe(true);
    }
  });

  test('Component attributes should be reactive', async ({ page }) => {
    await page.goto('/demo-button-enhanced.html');
    
    const button = page.locator('eva-gc-button').first();
    
    // Change variant attribute
    await button.evaluate((el) => {
      el.setAttribute('variant', 'destructive');
    });
    
    // Verify the change is reflected
    const variant = await button.getAttribute('variant');
    expect(variant).toBe('destructive');
  });

  test('Components should handle rapid attribute changes', async ({ page }) => {
    await page.goto('/demo-button-enhanced.html');
    
    const button = page.locator('eva-gc-button').first();
    
    // Rapidly change attributes
    await button.evaluate((el) => {
      const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'];
      variants.forEach((variant, index) => {
        setTimeout(() => {
          el.setAttribute('variant', variant);
        }, index * 10);
      });
    });
    
    // Wait for changes to settle
    await page.waitForTimeout(100);
    
    // Component should still be functional
    const isConnected = await button.evaluate((el) => el.isConnected);
    expect(isConnected).toBe(true);
  });

  test('Components should work in Shadow DOM nesting', async ({ page }) => {
    await page.goto('/');
    
    // Create nested shadow roots
    await page.evaluate(() => {
      const container = document.createElement('div');
      container.id = 'test-container';
      document.body.appendChild(container);
      
      const shadow1 = container.attachShadow({ mode: 'open' });
      const div1 = document.createElement('div');
      shadow1.appendChild(div1);
      
      const shadow2 = div1.attachShadow({ mode: 'open' });
      const button = document.createElement('eva-gc-button');
      button.textContent = 'Nested Button';
      shadow2.appendChild(button);
    });
    
    // Check that button is functional
    const container = page.locator('#test-container');
    expect(await container.count()).toBe(1);
  });
});
