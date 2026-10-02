import { test, expect, chromium } from '@playwright/test';

test.describe('Day 1 Assessment: Introduction to Playwright and TypeScript Setup', () => {

  /**
   * Task 1: Basic Browser Launch, Navigation, and Title Validation using Page Fixture
   */
  test('Task 1.1: Verify Page Title and URL using test fixture', async ({ page }) => {
    // 1. Navigate to target URL
    await page.goto('https://playwright.dev/');

    // 2. Validate Page Title (matches regex or exact string)
    await expect(page).toHaveTitle(/Playwright/);

    // 3. Validate Page URL
    await expect(page).toHaveURL('https://playwright.dev/');

    // 4. Capture screenshot artifact for verification
    await page.screenshot({ path: 'test-results/day1-task1.png' });
  });

  /**
   * Task 2: Manual Browser and Context Lifecycle Launch
   * Demonstrates understanding of Browser -> BrowserContext -> Page hierarchy
   */
  test('Task 1.2: Demonstrate Browser, Context, and Page Lifecycle', async () => {
    // 1. Launch a browser instance
    const browser = await chromium.launch({ headless: true });

    // 2. Create an isolated Browser Context (like an incognito session)
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
    });

    // 3. Create a new Page inside the context
    const page = await context.newPage();

    // 4. Navigate to example site
    await page.goto('https://example.com');

    // 5. Title & Header/Link validation
    const pageTitle = await page.title();
    expect(pageTitle).toContain('Example Domain');

    await expect(page.getByRole('link', { name: 'Learn more' })).toBeVisible();

    // 6. Clean up resources
    await context.close();
    await browser.close();
  });

  /**
   * Task 3: Navigation with Wait Conditions and HTTP Status Checks
   */
  test('Task 1.3: Verify Response Status Code and Navigation Options', async ({ page }) => {
    // Navigate and capture the main response
    const response = await page.goto('https://playwright.dev/', {
      waitUntil: 'domcontentloaded',
    });

    // Validate HTTP status
    expect(response?.status()).toBe(200);
    expect(response?.ok()).toBeTruthy();

    // Assert page content loaded
    await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toBeVisible();
  });

});
