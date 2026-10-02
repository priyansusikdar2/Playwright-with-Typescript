import { test, expect } from '@playwright/test';
import { BASE_URL, TestUserManager, ProductSortOption } from './typescript_fundamentals';

test.describe('Day 2: Locators, Actions, Assertions and Auto-waiting', () => {
  const userManager = new TestUserManager();
  const validUser = userManager.getUser('standard_user');

  test.beforeEach(async ({ page }) => {
    // Navigate to SauceDemo before each test
    await page.goto(BASE_URL);
  });

  /**
   * 1. Locator Strategies Comparison: Role, Placeholder, CSS, and XPath
   */
  test('Locator Strategies: Compare Role, Placeholder, CSS, and XPath', async ({ page }) => {
    // A. Recommended: Playwright User-facing Locators (getByRole, getByPlaceholder)
    const usernameInputByPlaceholder = page.getByPlaceholder('Username');
    await expect(usernameInputByPlaceholder).toBeVisible();

    // B. CSS Selector Locator
    const passwordInputByCss = page.locator('#password');
    await expect(passwordInputByCss).toBeVisible();

    // C. XPath Locator
    const loginButtonByXpath = page.locator('//input[@id="login-button"]');
    await expect(loginButtonByXpath).toBeVisible();

    // Fill inputs using different locators
    await usernameInputByPlaceholder.fill(validUser.username);
    await passwordInputByCss.fill(validUser.password);

    // Verify input values before submission
    await expect(usernameInputByPlaceholder).toHaveValue(validUser.username);
    await expect(passwordInputByCss).toHaveValue(validUser.password);

    // Click using XPath
    await loginButtonByXpath.click();

    // Validate navigation to inventory page
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  /**
   * 2. Form Controls: Handling Inputs, Dropdowns, and Dynamic Buttons
   */
  test('Form Controls: Dropdowns and Sorting options', async ({ page }) => {
    // Login first
    await page.getByPlaceholder('Username').fill(validUser.username);
    await page.getByPlaceholder('Password').fill(validUser.password);
    await page.locator('#login-button').click();

    // Locate the dropdown (Product Sort Container)
    const sortDropdown = page.locator('[data-test="product-sort-container"]');
    await expect(sortDropdown).toBeVisible();

    // Select by value: Price (low to high)
    const sortOption: ProductSortOption = 'lohi';
    await sortDropdown.selectOption(sortOption);

    // Validate dropdown selection value
    await expect(sortDropdown).toHaveValue(sortOption);

    // Validate that items are now sorted by price ascending
    const prices = page.locator('.inventory_item_price');
    const firstPriceText = await prices.first().innerText();
    expect(firstPriceText).toBe('$7.99');
  });

  /**
   * 3. Assertions: Web-First Assertions & Auto-waiting
   */
  test('Assertions and Auto-waiting: Verify states and count', async ({ page }) => {
    // Login
    await page.getByPlaceholder('Username').fill(validUser.username);
    await page.getByPlaceholder('Password').fill(validUser.password);
    await page.locator('#login-button').click();

    // Verify inventory container is visible
    const inventoryList = page.locator('.inventory_list');
    await expect(inventoryList).toBeVisible();

    // Verify count of products displayed (should be 6)
    const inventoryItems = page.locator('.inventory_item');
    await expect(inventoryItems).toHaveCount(6);

    // Verify button state changes when adding item
    const firstAddButton = page.locator('button[data-test^="add-to-cart"]').first();
    await expect(firstAddButton).toHaveText('Add to cart');

    // Click button to add item
    await firstAddButton.click();

    // Playwright auto-waits for DOM update and button text to change to 'Remove'
    const removeButton = page.locator('button[data-test^="remove"]').first();
    await expect(removeButton).toBeVisible();
    await expect(removeButton).toHaveText('Remove');

    // Verify cart badge count updated to 1
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
  });

  /**
   * 4. Checkbox and Radio Button Interaction Demo
   */
  test('Handling Checkboxes and Radio Buttons', async ({ page }) => {
    // Navigate to a standard HTML controls test page
    await page.goto('https://demo.playwright.dev/todomvc/');

    const newTodoInput = page.getByPlaceholder('What needs to be done?');
    await newTodoInput.fill('Learn Playwright Locators');
    await newTodoInput.press('Enter');

    await newTodoInput.fill('Master TypeScript Fundamentals');
    await newTodoInput.press('Enter');

    // Locate the first todo item's toggle checkbox
    const firstToggle = page.locator('.todo-list li .toggle').first();

    // Verify unchecked initially
    await expect(firstToggle).not.toBeChecked();

    // Check the checkbox
    await firstToggle.check();
    await expect(firstToggle).toBeChecked();

    // Uncheck the checkbox
    await firstToggle.uncheck();
    await expect(firstToggle).not.toBeChecked();
  });
});
