import { test, expect } from '@playwright/test';

/**
 * ============================================================================
 * DAY 4 ASSESSMENT TASK 4: REPORTING, TRACING & DEBUGGING
 * ============================================================================
 * Demonstrating:
 * 1. Playwright Trace Viewer generation (tracing.start & tracing.stop)
 * 2. Visual inspection artifacts (snapshots, console logs, network calls)
 * 3. Debugging failed states and root cause analysis
 * ============================================================================
 */

test.describe('Day 4: Debugging and Trace Viewer Task', () => {

  test('Trace Viewer Task: Record Complete Trace with Snapshots and Actions', async ({ page, context }) => {
    // 1. Perform UI actions (tracing is enabled via playwright.config.ts or context)
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle('Swag Labs');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // 2. Inventory interactions
    await expect(page).toHaveURL(/.*inventory.html/);
    const firstProduct = page.locator('.inventory_item').first();
    await expect(firstProduct).toBeVisible();

    const addToCartBtn = firstProduct.locator('button[data-test^="add-to-cart"]');
    await addToCartBtn.click();

    // 3. Assert cart badge
    const badge = page.locator('.shopping_cart_badge');
    await expect(badge).toHaveText('1');

    // 4. Export trace archive
    const tracePath = 'test-results/day4-trace.zip';
    await context.tracing.stop({ path: tracePath });

    // 5. Screenshot artifact
    await page.screenshot({ path: 'test-results/day4-trace-success.png' });
  });

  test('Error Inspection: Demonstrate Failure Diagnostics and Error Context', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Assert an expected visible element on login page
    const loginBtn = page.locator('#login-button');
    await expect(loginBtn).toBeVisible();
    await expect(loginBtn).toBeEnabled();

    // Demonstrate soft assertions for non-fatal checks
    expect.soft(await page.title()).toBe('Swag Labs');
  });

});
