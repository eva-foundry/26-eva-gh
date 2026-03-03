import { test, expect } from '@playwright/test';

// Visual regression for pagination component rendered on index page

test.describe('Pagination component visual', () => {
  test('default pagination renders consistently', async ({ page }) => {
    await page.goto('/');
    const pagination = page.locator('eva-pagination');
    await expect(pagination).toBeVisible();
    await pagination.scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    expect(await pagination.screenshot({ animations: 'disabled' })).toMatchSnapshot('pagination-default.png');
  });
});
