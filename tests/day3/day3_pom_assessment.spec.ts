import { test, expect } from '../../src/fixtures/testFixtures';
import checkoutData from '../../src/test-data/checkoutData.json';

/**
 * ============================================================================
 * DAY 3 ASSESSMENT: PAGE OBJECT MODEL & FIXTURES
 * ============================================================================
 * Demonstrating:
 * 1. Clean test suites using POM abstraction
 * 2. Dependency injection with custom Playwright fixtures
 * 3. End-to-end checkout with Page classes
 * ============================================================================
 */

test.describe('Day 3 Assessment: Page Object Model Implementation', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('POM Task 1: Successful Login and Navigation using POM Fixtures', async ({ loginPage, inventoryPage }) => {
    // Perform login through page object method
    await loginPage.login('standard_user', 'secret_sauce');

    // Assert using page object assertion
    await inventoryPage.assertOnInventoryPage();
  });

  test('POM Task 2: Negative Authentication Scenario via POM', async ({ loginPage }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.assertErrorMessage('Epic sadface: Sorry, this user has been locked out.');
  });

  test('POM Task 3: Complete Purchase Journey with Page Objects and Fixtures', async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    // 1. Login
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.assertOnInventoryPage();

    // 2. Select & Add Product
    const targetProduct = checkoutData.products[0];
    await inventoryPage.addProductToCart(targetProduct.name);
    await inventoryPage.assertCartBadgeCount(1);

    // 3. Navigate to Cart & Assert item
    await inventoryPage.navigateToCart();
    await cartPage.assertOnCartPage();
    await cartPage.assertProductInCart(targetProduct.name, targetProduct.price);

    // 4. Proceed to Checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCustomerInformation(checkoutData.customer);

    // 5. Total Verification & Completion
    await checkoutPage.assertTotalSummary();
    await checkoutPage.finishCheckout();
    await checkoutPage.assertOrderComplete();

    // 6. Capture artifact
    await checkoutPage.takeScreenshot('day3-pom-order-complete');
  });

});
