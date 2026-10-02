import { test, expect } from '@playwright/test';
import { envConfig } from '../../src/utils/envConfig';
import { Logger } from '../../src/utils/logger';

/**
 * ============================================================================
 * DAY 5 ASSESSMENT TASK 5: FRAMEWORK ENHANCEMENT & BEST PRACTICES
 * ============================================================================
 * Demonstrating:
 * 1. Environment variable consumption via .env
 * 2. Cross-browser and responsive viewport execution
 * 3. Structured logging throughout test lifecycles
 * ============================================================================
 */

test.describe('Day 5: Framework Enhancement and Environment Configuration', () => {

  test('Framework Task 1: Validate Environment Variables and Configuration', async () => {
    Logger.step(1, 'Verifying environment configuration values');

    expect(envConfig.baseUrl).toBeDefined();
    expect(envConfig.baseUrl).toContain('saucedemo.com');
    expect(envConfig.defaultTimeout).toBeGreaterThan(0);
    expect(envConfig.expectTimeout).toBeGreaterThan(0);

    Logger.info(`Base URL verified: ${envConfig.baseUrl}`);
    Logger.info(`Default Timeout: ${envConfig.defaultTimeout}ms`);
  });

  test('Framework Task 2: Cross-Browser & Viewport Responsiveness Verification', async ({ page }) => {
    Logger.step(1, `Navigating to ${envConfig.baseUrl}`);
    await page.goto(envConfig.baseUrl);

    Logger.step(2, 'Validating landing page elements under active viewport');
    await expect(page).toHaveTitle('Swag Labs');

    const loginForm = page.locator('#login_button_container');
    await expect(loginForm).toBeVisible();

    Logger.step(3, 'Capturing responsive layout screenshot');
    await page.screenshot({ path: 'test-results/day5-responsive-layout.png' });
    Logger.info('Screenshot captured successfully.');
  });

  test('Framework Task 3: Parallel Execution and Isolated State Verification', async ({ page, context }) => {
    Logger.step(1, 'Verify isolated cookies and clean session context');
    const cookies = await context.cookies();
    expect(cookies.length).toBe(0);

    Logger.step(2, 'Navigate and verify session creation');
    await page.goto(envConfig.baseUrl);
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/.*inventory.html/);
    Logger.info('Independent session verified.');
  });

});
