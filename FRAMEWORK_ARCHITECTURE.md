# Enterprise Playwright TypeScript Automation Framework Architecture

## 🏛️ Executive Summary & Framework Goals
This automation framework is built on **Playwright** with **TypeScript**, engineered for scalable, robust, and lightning-fast end-to-end testing across web applications, REST APIs, and multi-browser platforms.

### Core Pillars
1. **Maintainability**: Clear separation of concerns with the Page Object Model (POM).
2. **Speed & Scalability**: Headless/headed multi-worker parallel execution with zero cross-test interference.
3. **Resilience**: Web-first auto-waiting assertions eliminating arbitrary sleep calls.
4. **Observability**: Rich diagnostic artifacts including HTML reports, DOM snapshots, network logs, and offline Trace Viewer recordings.
5. **CI/CD Integration**: Seamless pipelines for GitHub Actions and Jenkins with automated artifact uploads.

---

## 📂 High-Level Repository Structure

```
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions matrix CI/CD pipeline
├── Jenkinsfile                     # Declarative Jenkins CI/CD pipeline
├── .env                            # Active environment configuration
├── .env.example                    # Environment template
├── package.json                    # Scripts, dependencies, and metadata
├── playwright.config.ts            # Enterprise Playwright runner configuration
├── tsconfig.json                   # TypeScript compiler configuration
├── src/
│   ├── api/
│   │   └── apiClient.ts            # High-level REST API client (APIRequestContext)
│   ├── fixtures/
│   │   └── testFixtures.ts         # Custom dependency injection page fixtures
│   ├── pages/
│   │   ├── BasePage.ts             # Shared navigation, title/URL checks, screenshots
│   │   ├── LoginPage.ts            # Authentication locators and error handling
│   │   ├── InventoryPage.ts        # Product catalog, sorting, and cart actions
│   │   ├── CartPage.ts             # Cart item validation and checkout transitions
│   │   └── CheckoutPage.ts         # Form filling, totals calculation, confirmation
│   ├── test-data/
│   │   ├── interfaces.ts           # Strongly typed data models
│   │   ├── users.json              # Parameterized auth accounts
│   │   └── checkoutData.json       # Product and customer test datasets
│   └── utils/
│       ├── envConfig.ts            # Typed environment variable loader
│       └── logger.ts               # Structured test execution logger
├── tests/
│   ├── day1/                       # Setup, basic lifecycle, navigation, and fixtures
│   ├── day2/                       # Locators, form controls, assertions, and UI task
│   ├── day3/                       # Page Object Model and Data-Driven testing
│   ├── day4/                       # API automation (CRUD), Tracing, and Debugging
│   └── day5/                       # Environment config, cross-browser, and CI/CD
├── playwright-report/              # Per-day and consolidated HTML reports
│   ├── day1/
│   ├── day2/
│   ├── day3/
│   ├── day4/
│   └── day5/
└── test-results/                   # Screenshots, traces (.zip), and JSON output
```

---

## 🧩 Architectural Design Patterns

### 1. Page Object Model with Custom Fixtures
Instead of manual instantiations (`new LoginPage(page)`), custom fixtures in `src/fixtures/testFixtures.ts` extend Playwright's `test`:
```typescript
export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  // ...
});
```
**Benefits:**
- Lazy instantiation: Only pages requested in the test signature are constructed.
- Automatic teardown and scope isolation per test worker.
- Clean, readable test signatures.

### 2. Robust Locator Strategy
The framework adheres strictly to the accessibility-first locator hierarchy:
1. `page.getByRole(...)`
2. `page.getByPlaceholder(...)`
3. `page.getByText(...)`
4. `page.locator(...)` (CSS / ID) as component container fallback

### 3. API Automation Layer (`ApiClient`)
Encapsulates `APIRequestContext` with:
- Automatic response timing calculation (`responseTimeMs`).
- Bearer token lifecycle management.
- Complete CRUD operations (`GET`, `POST`, `PUT`, `DELETE`).

---

## 🌐 Cross-Browser & Viewport Matrix

Configured in `playwright.config.ts`:
- **Desktop Chromium** (`Desktop Chrome`)
- **Desktop Firefox** (`Desktop Firefox`)
- **Desktop Safari / WebKit** (`Desktop Safari`)
- **Mobile Device Simulation** (`Pixel 5` / Mobile Chrome)

---

## 🚀 CI/CD Pipelines

### 1. GitHub Actions Matrix (`.github/workflows/playwright.yml`)
- Runs on push / PR to `main` and `master`.
- Matrix strategy across `[chromium, firefox, webkit]`.
- Automatically publishes HTML reports (30-day retention) and failure traces (14-day retention).

### 2. Jenkins Pipeline (`Jenkinsfile`)
- Docker-based agent execution using official Microsoft Playwright images (`mcr.microsoft.com/playwright`).
- Publishes HTML reports directly into Jenkins dashboard via `publishHTML`.
- Archives artifacts on test completion.

---

## 📋 Complete Assessment Results Matrix

| Assessment Task | Curriculum Milestone | Status | Test File Reference |
|---|---|:---:|---|
| **Task 1: UI Automation** | Day 2 | ✅ Passed | [`day2_ui_assessment.spec.ts`](file:///c:/Users/Priyansu%20Sikdar/Downloads/Playwright/tests/day2/day2_ui_assessment.spec.ts) |
| **Task 2: Page Object Model** | Day 3 | ✅ Passed | [`day3_pom_assessment.spec.ts`](file:///c:/Users/Priyansu%20Sikdar/Downloads/Playwright/tests/day3/day3_pom_assessment.spec.ts) |
| **Task 3: API Automation** | Day 4 | ✅ Passed | [`day4_api_assessment.spec.ts`](file:///c:/Users/Priyansu%20Sikdar/Downloads/Playwright/tests/day4/day4_api_assessment.spec.ts) |
| **Task 4: Reporting & Debugging** | Day 4 | ✅ Passed | [`day4_debugging_tracing.spec.ts`](file:///c:/Users/Priyansu%20Sikdar/Downloads/Playwright/tests/day4/day4_debugging_tracing.spec.ts) |
| **Task 5: Framework Development** | Day 5 | ✅ Passed | Full workspace framework |
| **Task 6: Code Review & Submission** | Post-Training | ✅ Passed | [`FRAMEWORK_ARCHITECTURE.md`](file:///c:/Users/Priyansu%20Sikdar/Downloads/Playwright/FRAMEWORK_ARCHITECTURE.md) |
