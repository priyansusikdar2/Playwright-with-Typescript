# Day 3 Assessment: Page Object Model (POM) and Test Data Management

## 📋 Overview
Day 3 focuses on architecting a maintainable, enterprise-scale Playwright framework using:
- **Page Object Model (POM)**: Encapsulating page elements and operations into dedicated TypeScript classes.
- **Custom Playwright Fixtures**: Eliminating boilerplate (`new LoginPage(page)`) by injecting instantiated page objects directly into test functions.
- **Data-Driven Testing (DDT)**: Externalizing test datasets in JSON (`users.json`, `checkoutData.json`) and typing them with TypeScript interfaces.
- **Post-Training Assessment Task 2**: Complete Page Object Model implementation.

---

## 🏗️ Architecture Design

```
src/
├── pages/
│   ├── BasePage.ts         # Shared navigation, title/URL assertions, screenshot helpers
│   ├── LoginPage.ts        # Login elements, actions, and error message validation
│   ├── InventoryPage.ts    # Product listings, sorting, add-to-cart, cart badge count
│   ├── CartPage.ts         # Cart validation, item removal, proceed to checkout
│   └── CheckoutPage.ts     # Customer form, order overview, total summary, confirmation
├── test-data/
│   ├── interfaces.ts       # TypeScript interfaces (IUserData, ICheckoutInfo, IProductItem)
│   ├── users.json          # Dataset for positive and negative authentication
│   └── checkoutData.json   # Customer and product test data
└── fixtures/
    └── testFixtures.ts     # Custom fixture extending base test with POM dependency injection
```

---

## 💡 Key Architectural Concepts

### 1. Modern Playwright Fixtures vs. Manual Instantiation

**Traditional approach (verbose, error-prone):**
```typescript
test('Traditional POM', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  await loginPage.goto();
  await loginPage.login('user', 'pass');
});
```

**Playwright Custom Fixture approach (`src/fixtures/testFixtures.ts`):**
```typescript
import { test, expect } from '../../src/fixtures/testFixtures';

test('Modern POM', async ({ loginPage, inventoryPage }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.assertOnInventoryPage();
});
```
*Benefits:* Automatic lifecycle management, lazy initialization, cleaner test signatures, and modular reusability.

---

### 2. Data-Driven Testing (`tests/day3/day3_data_driven.spec.ts`)
Iterates over externalized JSON datasets with dynamic test generation:
```typescript
for (const user of users as IUserData[]) {
  test(`Data-Driven Auth: ${user.description} (${user.username})`, async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(user.username, user.password);
    if (user.expectedError) {
      await loginPage.assertErrorMessage(user.expectedError);
    } else {
      await inventoryPage.assertOnInventoryPage();
    }
  });
}
```

---

## 📊 Test Execution Summary

Run only Day 3 tests:
```bash
npm run test:day3
```

Execution results:
```text
Running 7 tests using 6 workers
  ✓ Data-Driven Auth: Locked Out Account (locked_out_user) (3.2s)
  ✓ POM Task 2: Negative Authentication Scenario via POM (3.2s)
  ✓ Data-Driven Auth: Valid Standard User (standard_user) (3.3s)
  ✓ Data-Driven Auth: Invalid Credentials (invalid_user) (3.2s)
  ✓ POM Task 1: Successful Login and Navigation using POM Fixtures (3.5s)
  ✓ Data-Driven Cart: Add multiple products from dataset and verify badge (3.6s)
  ✓ POM Task 3: Complete Purchase Journey with Page Objects and Fixtures (1.5s)

7 passed (7.1s)
```

Run entire training suite (Days 1, 2, 3):
```bash
npm test  # 18 passed (10.0s)
```
