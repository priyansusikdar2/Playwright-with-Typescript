import { test, expect } from '../../src/fixtures/testFixtures';
import { IUserData, IProductItem } from '../../src/test-data/interfaces';
import users from '../../src/test-data/users.json';
import checkoutData from '../../src/test-data/checkoutData.json';

/**
 * ============================================================================
 * DAY 3 ASSESSMENT: DATA-DRIVEN TESTING (DDT)
 * ============================================================================
 * Demonstrating:
 * 1. Parameterized / Data-driven test execution iterating over JSON datasets
 * 2. Strongly-typed datasets with TypeScript interfaces
 * 3. Dynamic test generation and reporting per data item
 * ============================================================================
 */

test.describe('Day 3 Assessment: Data-Driven Testing Suite', () => {

  // 1. Data-Driven Login Authentication Tests
  for (const user of users as IUserData[]) {
    test(`Data-Driven Auth: ${user.description} (${user.username})`, async ({ loginPage, inventoryPage }) => {
      await loginPage.goto();
      await loginPage.login(user.username, user.password);

      if (user.expectedError) {
        // Assert error message for invalid/locked accounts
        await loginPage.assertErrorMessage(user.expectedError);
      } else {
        // Assert successful navigation for valid users
        await inventoryPage.assertOnInventoryPage();
      }
    });
  }

  // 2. Data-Driven Multi-Product Addition
  test('Data-Driven Cart: Add multiple products from dataset and verify badge', async ({
    loginPage,
    inventoryPage,
    cartPage,
  }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.assertOnInventoryPage();

    const productList = checkoutData.products as IProductItem[];

    // Add each product from the dataset
    for (let i = 0; i < productList.length; i++) {
      const product = productList[i];
      await inventoryPage.addProductToCart(product.name);
      await inventoryPage.assertCartBadgeCount(i + 1);
    }

    // Navigate to cart and assert all products are present
    await inventoryPage.navigateToCart();
    await cartPage.assertOnCartPage();

    for (const product of productList) {
      await cartPage.assertProductInCart(product.name, product.price);
    }
  });

});
