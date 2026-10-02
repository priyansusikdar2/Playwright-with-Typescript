# Day 2 Assessment: Locators, Assertions, and TypeScript Fundamentals

## 📋 Overview
This module covers the core automation concepts for **Day 2** and completes the **UI Automation Task** specified in the curriculum:
- **TypeScript Fundamentals**: Primitive types, Interfaces, Union Types, Typed Functions, and Classes with encapsulation.
- **Playwright Locators**: User-facing locators (`getByRole`, `getByPlaceholder`, `getByText`), CSS selectors, and XPath.
- **UI Element Interactions**: Text fields, dynamic buttons, `<select>` dropdowns, and checkboxes (`check()`, `uncheck()`).
- **Web-First Assertions**: Retrying assertions (`toBeVisible`, `toHaveText`, `toHaveValue`, `toHaveCount`, `toBeChecked`).
- **Auto-Waiting & Synchronization**: Playwright's built-in actionability checks.
- **UI Automation Task**: End-to-End Login, Product Search/Filter, Add-to-Cart, Checkout flow, and screenshot capture.

---

## 📁 Day 2 Files Created

1. [`tests/day2/typescript_fundamentals.ts`](file:///c:/Users/Priyansu%20Sikdar/Downloads/Playwright/tests/day2/typescript_fundamentals.ts)
   - Interfaces: `UserCredentials`, `ProductItem`, `CartSummary`
   - Union Types: `UserRole`, `ProductSortOption`
   - Encapsulated Class: `TestUserManager` with private user map and public accessors.
2. [`tests/day2/day2_locators_actions.spec.ts`](file:///c:/Users/Priyansu%20Sikdar/Downloads/Playwright/tests/day2/day2_locators_actions.spec.ts)
   - Demonstrates comparing Role vs CSS vs XPath locators.
   - Dropdown selection (`selectOption`) and sorting verification.
   - Assertions on dynamic button states (`Add to cart` -> `Remove`) and cart badge counts.
   - Checkbox interactions (`check()`, `uncheck()`, `toBeChecked()`).
3. [`tests/day2/day2_ui_assessment.spec.ts`](file:///c:/Users/Priyansu%20Sikdar/Downloads/Playwright/tests/day2/day2_ui_assessment.spec.ts)
   - Full implementation of the **Post-Training Assessment Task 1 (UI Automation Task)**.
   - Automates Login, locating target product, adding to cart, cart verification, checkout steps, order confirmation, and screenshot capture.
   - Includes negative test validation for locked-out users.

---

## 🎯 Playwright Locator Best Practices

Playwright recommends user-facing locators that reflect how users and assistive technologies perceive the page:

| Priority | Locator | Example | Why? |
|---|---|---|---|
| **1 (Best)** | `page.getByRole(...)` | `page.getByRole('button', { name: 'Submit' })` | Accessible, resilient to DOM structure changes |
| **2** | `page.getByPlaceholder(...)` | `page.getByPlaceholder('Username')` | Closely mirrors user interaction |
| **3** | `page.getByText(...)` | `page.getByText('Products')` | Easy to find non-interactive text |
| **4** | `page.getByTestId(...)` | `page.getByTestId('submit-btn')` | Explicit QA hooks when text/roles change |
| **5 (Fallback)** | CSS Selector | `page.locator('.inventory_item')` | Useful for component containers or styling classes |
| **6 (Avoid if possible)** | XPath | `page.locator('//button[@id="login"]')` | Fragile; breaks easily on layout/markup refactors |

---

## ⚡ Auto-Waiting & Actionability Checks

Before executing any action (e.g. `click()`, `fill()`), Playwright automatically ensures the target element passes **Actionability Checks**:
1. **Attached**: Element is attached to the DOM.
2. **Visible**: Element is visible on screen (non-zero size, no `display: none` or `visibility: hidden`).
3. **Stable**: Element is not animating or moving.
4. **Receives Events**: Element is not covered by another overlay or modal.
5. **Enabled**: Element is not disabled (`disabled` attribute).

> **Note**: Because Playwright performs these checks automatically, you almost never need `waitForTimeout()` or `Thread.sleep()`.

---

## 📊 Test Execution Summary

Run Day 2 tests with:
```bash
npm run test:day2
```

Results:
```text
Running 6 tests using 6 workers
  ✓ Locator Strategies: Compare Role, Placeholder, CSS, and XPath (4.7s)
  ✓ Form Controls: Dropdowns and Sorting options (4.7s)
  ✓ Assertions and Auto-waiting: Verify states and count (4.7s)
  ✓ Handling Checkboxes and Radio Buttons (5.1s)
  ✓ Complete End-to-End Workflow: Login, Select Product, Add-to-Cart & Checkout (5.1s)
  ✓ Negative Scenario: Locked Out User Login Validation (4.8s)

6 passed (7.7s)
```

Generated screenshots:
- `test-results/day2-1-login-success.png`
- `test-results/day2-2-item-added.png`
- `test-results/day2-3-order-complete.png`
