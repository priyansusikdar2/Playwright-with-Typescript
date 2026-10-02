# Day 1 Assessment: Introduction to Playwright & TypeScript Setup

## 📋 Overview
This assessment validates fundamental knowledge and hands-on skills for **Day 1** of the Playwright (TypeScript) Automation Training Plan:
- **Playwright Architecture & TypeScript Integration**
- **Project Structure & Configurations (`tsconfig.json`, `playwright.config.ts`)**
- **First Playwright Test Creation & Execution**
- **Browser Lifecycle, Navigation, URL & Title Assertions**

---

## 🏗️ Project Architecture & Setup Summary

The Day 1 environment has been configured in this workspace:
- **`package.json`**: Dependencies `@playwright/test`, `typescript`, `@types/node` and NPM scripts.
- **`tsconfig.json`**: TypeScript compiler options targeting `ESNext`, node module resolution, and Playwright type declarations.
- **`playwright.config.ts`**: Test directory (`./tests`), timeout rules, reporters (`html`, `list`), and Chromium project configuration.
- **`tests/day1/`**:
  - `day1_assessment.spec.ts`: Core Day 1 tasks (fixtures, manual context lifecycle, status checks).
  - `day1_practice_tasks.spec.ts`: Practical exercises for title and navigation validation.

---

## 🎯 Practical Assessment Tasks

### Task 1: Basic Test with Page Fixture (`day1_assessment.spec.ts`)
```typescript
import { test, expect } from '@playwright/test';

test('Task 1.1: Verify Page Title and URL using test fixture', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
  await expect(page).toHaveURL('https://playwright.dev/');
  await page.screenshot({ path: 'test-results/day1-task1.png' });
});
```
**Key Concepts Demonstrated:**
- Playwright's built-in `{ page }` fixture automatically manages browser context setup and teardown.
- `expect(page).toHaveTitle(...)` performs automatic web-first assertions with retry polling.
- `expect(page).toHaveURL(...)` ensures the destination URL is loaded.

---

### Task 2: Browser, Context, and Page Lifecycle (`day1_assessment.spec.ts`)
```typescript
import { test, expect, chromium } from '@playwright/test';

test('Task 1.2: Demonstrate Browser, Context, and Page Lifecycle', async () => {
  // 1. Launch Browser
  const browser = await chromium.launch({ headless: true });

  // 2. Create Isolated Browser Context (Incognito session)
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });

  // 3. Create Page inside Context
  const page = await context.newPage();

  // 4. Navigate & Validate
  await page.goto('https://example.com');
  const pageTitle = await page.title();
  expect(pageTitle).toContain('Example Domain');
  await expect(page.getByRole('link', { name: 'Learn more' })).toBeVisible();

  // 5. Clean up
  await context.close();
  await browser.close();
});
```
**Key Concepts Demonstrated:**
- Difference between `Browser` (heavyweight binary process), `BrowserContext` (isolated storage/cookies/session), and `Page` (single tab).
- Why Playwright tests run fast: Multiple contexts share one browser process without leaking state.

---

### Task 3: Navigation Options & HTTP Status Validation (`day1_assessment.spec.ts`)
```typescript
test('Task 1.3: Verify Response Status Code and Navigation Options', async ({ page }) => {
  const response = await page.goto('https://playwright.dev/', {
    waitUntil: 'domcontentloaded',
  });

  expect(response?.status()).toBe(200);
  expect(response?.ok()).toBeTruthy();
  await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toBeVisible();
});
```
**Key Concepts Demonstrated:**
- `page.goto` returns an `APIResponse` object representing the main resource navigation response.
- `waitUntil` options: `'load'`, `'domcontentloaded'`, `'networkidle'`, `'commit'`.

---

## 💡 Day 1 Conceptual Assessment & Knowledge Check

### Q1: What is the primary difference between a `BrowserContext` and a `Page`?
> **Answer:** 
> A **`Browser`** is the browser instance (Chromium/Firefox/WebKit). 
> A **`BrowserContext`** is an isolated incognito-like environment within that browser. It has its own cookies, localStorage, session storage, and cache, isolated from other contexts.
> A **`Page`** is a single tab or window inside a `BrowserContext`. Multiple pages can share cookies if they are created within the same `BrowserContext`.

### Q2: Why does Playwright not require explicit `Thread.sleep` or arbitrary waits?
> **Answer:**
> Playwright uses **Auto-Waiting** and **Web-First Assertions** (`expect(page).toHaveTitle()`, `locator.click()`, etc.). Before performing actions or assertions, Playwright automatically checks that the element is attached to DOM, visible, stable, enabled, and ready for input, waiting up to the configured timeout before failing.

### Q3: What is the purpose of `playwright.config.ts` vs `tsconfig.json`?
> **Answer:**
> - `tsconfig.json`: Tells the TypeScript compiler how to transpile TypeScript code into JavaScript, what target version to use (`ESNext`), module resolution, and type definitions (`node`, `@playwright/test`).
> - `playwright.config.ts`: Controls the Playwright test runner execution settings, such as `testDir`, parallel workers, timeouts, retries, reporting formats, browser projects, and base URLs.

---

## 🚀 Execution Commands

| Command | Purpose |
|---|---|
| `npm run test:day1` | Run all Day 1 assessment tests in headless mode |
| `npm run test:headed` | Run tests with browser window visible |
| `npm run test:ui` | Open the interactive Playwright UI Test Runner |
| `npm run test:report` | View the generated HTML test report |
