import { test, expect } from '@playwright/test';

// Basic visual regression for demo button page
// Uses index/demo pages shipped in repo to render components

test.describe('Button component visual', () => {
  test('default button renders consistently', async ({ page }) => {
    await page.goto('/demo-button-enhanced.html');
    const button = page.locator('eva-button');
    await expect(button).toBeVisible();
    await button.scrollIntoViewIfNeeded();

    // Wait for any web component rendering to settle
    await page.waitForTimeout(150);

    // Screenshot the component host
    expect(await button.screenshot({ animations: 'disabled' })).toMatchSnapshot('button-default.png');
  });
});
