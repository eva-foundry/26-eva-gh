import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Component Accessibility Tests', () => {
  test('Button components should be accessible', async ({ page }) => {
    await page.goto('/demo-button-enhanced.html');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
      
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Demo gallery should be accessible', async ({ page }) => {
    await page.goto('/packages/eva-sovereign-ui-wc/demo-gallery.html');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
      
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('ESDC demo should be accessible', async ({ page }) => {
    await page.goto('/apps/esdc-demo/index.html');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
      
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Dev kit demo should be accessible', async ({ page }) => {
    await page.goto('/apps/dev-kit-demo/index.html');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
      
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Buttons should have sufficient color contrast', async ({ page }) => {
    await page.goto('/demo-button-enhanced.html');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aaa'])
      .analyze();
      
    const contrastViolations = accessibilityScanResults.violations.filter(
      v => v.id === 'color-contrast'
    );
    
    expect(contrastViolations).toEqual([]);
  });

  test('Interactive elements should be keyboard accessible', async ({ page }) => {
    await page.goto('/demo-button-enhanced.html');
    
    // Tab through buttons
    await page.keyboard.press('Tab');
    const firstButton = await page.locator('eva-gc-button').first();
    await expect(firstButton).toBeFocused();
    
    // Activate with Enter
    await page.keyboard.press('Enter');
    
    // Activate with Space
    await page.keyboard.press('Space');
  });

  test('Focus indicators should be visible', async ({ page }) => {
    await page.goto('/demo-button-enhanced.html');
    
    // Tab to first button
    await page.keyboard.press('Tab');
    
    // Check for focus ring (outline)
    const button = page.locator('eva-gc-button').first();
    const shadowButton = button.locator('button');
    
    // Verify focus styles are applied
    const outlineWidth = await shadowButton.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.getPropertyValue('outline-width');
    });
    
    expect(outlineWidth).not.toBe('0px');
  });

  test('Screen readers should announce button states correctly', async ({ page }) => {
    await page.goto('/demo-button-enhanced.html');
    
    // Check disabled button
    const disabledButton = page.locator('eva-gc-button[disabled]').first();
    const ariaDisabled = await disabledButton.getAttribute('aria-disabled');
    expect(ariaDisabled).toBe('true');
    
    // Check loading button
    const loadingButton = page.locator('eva-gc-button[loading]').first();
    const ariaBusy = await loadingButton.getAttribute('aria-busy');
    expect(ariaBusy).toBe('true');
  });
});
