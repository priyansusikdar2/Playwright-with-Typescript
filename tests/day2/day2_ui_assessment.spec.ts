import { test, expect } from '@playwright/test';
import { BASE_URL, TestUserManager } from './typescript_fundamentals';

/**
 * ============================================================================
 * DAY 2 ASSESSMENT TASK: UI AUTOMATION WORKFLOW
 * ============================================================================
 * Syllabus Task:
 * "Automate Login, Search/Select Product, and Add-to-Cart functionality with
 *  assertions and screenshots."
 * ============================================================================
 */

test.describe('Day 2 UI Assessment: End-to-End E-Commerce Flow', () => {
  const userManager = new TestUserManager();
  const user = userManager.getUser('standard_user');

  test('Complete End-to-End Workflow: Login, Select Product, Add-to-Cart & Checkout', async ({ page }) => {
    // ------------------------------------------------------------------------
    // Step 1: Navigate to Application & Validate Landing Page
    // ------------------------------------------------------------------------
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle('Swag Labs');

    // ------------------------------------------------------------------------
    // Step 2: Login with Assertions
    // ------------------------------------------------------------------------
    const usernameInput = page.getByPlaceholder('Username');
    const passwordInput = page.getByPlaceholder('Password');
    const loginButton = page.locator('#login-button');

    await usernameInput.fill(user.username);
    await passwordInput.fill(user.password);
    await loginButton.click();

    // Assert successful login and navigation to inventory page
    await expect(page).toHaveURL(/.*inventory.html/);
    const headerTitle = page.locator('.title');
    await expect(headerTitle).toBeVisible();
    await expect(headerTitle).toHaveText('Products');

    // Screenshot after login
    await page.screenshot({ path: 'test-results/day2-1-login-success.png' });

    // ------------------------------------------------------------------------
    // Step 3: Product Search / Selection & Add-to-Cart
    // ------------------------------------------------------------------------
    const targetProductName = 'Sauce Labs Backpack';
    const targetProductCard = page.locator('.inventory_item', {
      has: page.locator('.inventory_item_name', { hasText: targetProductName }),
    });

    await expect(targetProductCard).toBeVisible();

    // Verify price of selected product
    const productPrice = targetProductCard.locator('.inventory_item_price');
    await expect(productPrice).toHaveText('$29.99');

    // Click Add to Cart for the target item
    const addToCartButton = targetProductCard.locator('button[data-test^="add-to-cart"]');
    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();

    // Assert cart badge updates to 1
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');

    // Screenshot after adding item
    await page.screenshot({ path: 'test-results/day2-2-item-added.png' });

    // ------------------------------------------------------------------------
    // Step 4: Navigate to Cart & Assert Cart Contents
    // ------------------------------------------------------------------------
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/.*cart.html/);
    await expect(page.locator('.title')).toHaveText('Your Cart');

    const cartItem = page.locator('.cart_item');
    await expect(cartItem).toHaveCount(1);
    await expect(cartItem.locator('.inventory_item_name')).toHaveText(targetProductName);
    await expect(cartItem.locator('.inventory_item_price')).toHaveText('$29.99');

    // ------------------------------------------------------------------------
    // Step 5: Checkout Process & Form Submission
    // ------------------------------------------------------------------------
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/.*checkout-step-one.html/);

    // Fill customer info
    await page.getByPlaceholder('First Name').fill('John');
    await page.getByPlaceholder('Last Name').fill('Doe');
    await page.getByPlaceholder('Zip/Postal Code').fill('10001');

    // Continue to Step Two
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    await expect(page.locator('.title')).toHaveText('Checkout: Overview');

    // Assert payment and price summary
    const summaryTotal = page.locator('.summary_total_label');
    await expect(summaryTotal).toContainText('$32.39');

    // Finish checkout
    await page.locator('[data-test="finish"]').click();

    // ------------------------------------------------------------------------
    // Step 6: Validate Confirmation & Capture Final Screenshot
    // ------------------------------------------------------------------------
    await expect(page).toHaveURL(/.*checkout-complete.html/);
    const completeHeader = page.locator('.complete-header');
    await expect(completeHeader).toBeVisible();
    await expect(completeHeader).toHaveText('Thank you for your order!');

    // Final completion screenshot
    await page.screenshot({ path: 'test-results/day2-3-order-complete.png', fullPage: true });
  });

  /**
   * Negative Test Case: Login Validation & Error Handling
   */
  test('Negative Scenario: Locked Out User Login Validation', async ({ page }) => {
    const lockedUser = userManager.getUser('locked_out_user');

    await page.goto(BASE_URL);
    await page.getByPlaceholder('Username').fill(lockedUser.username);
    await page.getByPlaceholder('Password').fill(lockedUser.password);
    await page.locator('#login-button').click();

    // Verify error banner is displayed
    const errorContainer = page.locator('[data-test="error"]');
    await expect(errorContainer).toBeVisible();
    await expect(errorContainer).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });
});
