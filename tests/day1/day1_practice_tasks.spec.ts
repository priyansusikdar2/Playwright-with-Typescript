import { test, expect } from '@playwright/test';

/**
 * ============================================================================
 * DAY 1 HANDS-ON ASSESSMENT TASKS
 * ============================================================================
 * Instructions:
 * Complete the tasks below to demonstrate mastery of Day 1 concepts:
 * 1. Test runner syntax and fixtures (`test`, `expect`, `{ page }`)
 * 2. Navigation (`page.goto`) with timeouts or waitUntil options
 * 3. Title validation (`expect(page).toHaveTitle(...)`)
 * 4. URL validation (`expect(page).toHaveURL(...)`)
 * 5. Visual artifact capture (`page.screenshot`)
 * ============================================================================
 */

test.describe('Day 1 Practice Assessment Suite', () => {

  /**
   * Exercise 1: Navigate to TodoMVC and Validate Core Properties
   */
  test('Exercise 1: TodoMVC Navigation & Title Assertion', async ({ page }) => {
    // Step 1: Navigate to https://demo.playwright.dev/todomvc/
    await page.goto('https://demo.playwright.dev/todomvc/');

    // Step 2: Assert that the title contains 'TodoMVC'
    await expect(page).toHaveTitle(/TodoMVC/);

    // Step 3: Assert that the URL matches
    await expect(page).toHaveURL('https://demo.playwright.dev/todomvc/#/');

    // Step 4: Take a full-page screenshot
    await page.screenshot({ path: 'test-results/todomvc-landing.png', fullPage: true });
  });

  /**
   * Exercise 2: SauceDemo Login Page Navigation and Title Check
   */
  test('Exercise 2: SauceDemo Title and Heading Verification', async ({ page }) => {
    // Step 1: Navigate to SauceDemo
    await page.goto('https://www.saucedemo.com/');

    // Step 2: Validate page title
    await expect(page).toHaveTitle('Swag Labs');

    // Step 3: Validate presence of the login logo/heading
    const logo = page.locator('.login_logo');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveText('Swag Labs');
  });

});
