# 🎭 Playwright TypeScript Enterprise Automation Framework

[![Playwright Tests](https://github.com/actions/workflows/playwright.yml/badge.svg)](https://playwright.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.49+-green.svg)](https://playwright.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-v20+-brightgreen.svg)](https://nodejs.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

> An end-to-end, production-ready test automation framework engineered with **Playwright**, **TypeScript**, and **Page Object Model (POM)** architecture. Features cross-browser parallel testing, REST API automation, data-driven tests, isolated HTML reports, Trace Viewer diagnostics, and multi-platform CI/CD pipelines (GitHub Actions & Jenkins).

---

## 📋 Training & Assessment Milestone Mapping

This repository covers the complete 5-day curriculum and post-training assessment tasks:

| Day | Topics & Milestones | Assessment Compliance | Status |
|:---:|---|---|:---:|
| **Day 1** | Setup, TypeScript Configuration, Playwright Lifecycle (`Browser` $\rightarrow$ `Context` $\rightarrow$ `Page`), Navigation & Title Assertions | Environment & Base Verification | ✅ Passed |
| **Day 2** | Locators (`Role`, `Placeholder`, `CSS`, `XPath`), Form Controls, Auto-waiting, Web-first Assertions | **Task 1: UI Automation** (Login, Product Select, Add-to-Cart & Checkout) | ✅ Passed |
| **Day 3** | Scalable Page Object Model (POM), Custom Test Fixtures, Strongly-typed Data-Driven Testing (JSON) | **Task 2: Page Object Model** (Page classes, methods, fixtures) | ✅ Passed |
| **Day 4** | API Automation (`APIRequestContext`), Full CRUD, Bearer Auth, Latency Assertions, Trace Viewer | **Tasks 3 & 4: API Automation & Debugging/Reporting** | ✅ Passed |
| **Day 5** | `.env` Configuration, Cross-Browser (Chromium, Firefox, WebKit, Mobile), CI/CD, Framework Architecture | **Tasks 5 & 6: Framework Development & Submission** | ✅ Passed |

---

## 🏛️ Framework Architecture

```
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions multi-browser CI/CD matrix
├── Jenkinsfile                     # Declarative Jenkins CI/CD pipeline
├── .env                            # Active environment variables
├── .env.example                    # Environment template
├── package.json                    # Scripts and dependencies
├── playwright.config.ts            # Enterprise Playwright runner config
├── tsconfig.json                   # TypeScript compiler configuration
├── src/
│   ├── api/
│   │   └── apiClient.ts            # High-level REST API client with latency timing
│   ├── fixtures/
│   │   └── testFixtures.ts         # Custom dependency injection page fixtures
│   ├── pages/
│   │   ├── BasePage.ts             # Shared navigation, title/URL checks, screenshots
│   │   ├── LoginPage.ts            # Authentication locators and error handling
│   │   ├── InventoryPage.ts        # Product catalog, sorting, and cart actions
│   │   ├── CartPage.ts             # Cart item validation and checkout transitions
│   │   └── CheckoutPage.ts         # Form filling, totals calculation, confirmation
│   ├── test-data/
│   │   ├── interfaces.ts           # Strongly typed data models (TypeScript)
│   │   ├── users.json              # Parameterized auth accounts (DDT)
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

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher
- **Git**

### 2. Installation
Clone the repository and install all dependencies:
```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd Playwright
npm install
```

### 3. Install Playwright Browsers
Download the required browser binaries (Chromium, Firefox, WebKit):
```bash
npx playwright install --with-deps
```

---

## ⚡ Running Tests

### Execute Full Regression Suite (All 30 Tests)
```bash
npm test
```

### Run by Specific Day (with Isolated HTML Reports)
```bash
npm run test:day1     # Day 1: Setup & Lifecycle
npm run test:day2     # Day 2: Locators, Form Controls & UI Task
npm run test:day3     # Day 3: POM & Data-Driven Testing
npm run test:day4     # Day 4: API Automation & Tracing
npm run test:day5     # Day 5: Framework Enhancement & Config
```

### Cross-Browser & Responsive Device Execution
```bash
npm run test:all-browsers   # Runs across Chromium, Firefox, WebKit
npm run test:firefox        # Desktop Firefox
npm run test:webkit         # Desktop WebKit / Safari
npm run test:mobile         # Mobile Viewport (Google Pixel 5 emulation)
```

### Interactive Modes
```bash
npm run test:headed         # Run tests in headed browser mode
npm run test:ui             # Launch Playwright Interactive UI Runner
```

---

## 📊 Viewing Test Reports & Traces

### Individual Day Reports
Each day's test run preserves its own isolated HTML report:
```bash
npm run report:day1
npm run report:day2
npm run report:day3
npm run report:day4
npm run report:day5
```

### View Consolidated Report
```bash
npm run report:all
```

### Inspect Trace Viewer
Analyze timeline, DOM snapshots, network traffic, and console logs:
```bash
npm run trace:day4
```
*(Or `npx playwright show-trace test-results/day4-trace.zip`)*

---

## 🔧 Environment Configuration

The framework loads environment settings dynamically via `dotenv`. Configure variables in `.env`:

```env
# Application Base URL
BASE_URL=https://www.saucedemo.com

# REST API Base URL
API_BASE_URL=https://dummyjson.com

# Timeouts (in ms)
DEFAULT_TIMEOUT=30000
EXPECT_TIMEOUT=5000

# Execution Flags
HEADLESS=true
TRACE_MODE=retain-on-failure
```

---

## 🔄 CI/CD Pipelines

### GitHub Actions Matrix Workflow
Defined in [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml):
- Triggers on `push` and `pull_request` to `main`/`master`.
- Executes test matrices in parallel across `[chromium, firefox, webkit]`.
- Uploads test reports as artifacts retained for 30 days.
- Automatically captures and uploads failure traces and screenshots.

### Jenkins Pipeline
Defined in [`Jenkinsfile`](Jenkinsfile):
- Containerized execution using Microsoft's official Docker image `mcr.microsoft.com/playwright`.
- Automated test reporting via the `publishHTML` plugin.
- Artifact archiving for failure investigation.

---

## 📑 Detailed Architecture Documentation

For complete framework design rationale, design patterns, and code review criteria, see:
- 📖 [Framework Architecture Document](FRAMEWORK_ARCHITECTURE.md)
- 📝 [Day 1 Assessment](DAY1_ASSESSMENT.md)
- 📝 [Day 2 Assessment](DAY2_ASSESSMENT.md)
- 📝 [Day 3 Assessment](DAY3_ASSESSMENT.md)
- 📝 [Day 4 Assessment](DAY4_ASSESSMENT.md)
- 📝 [Day 5 Assessment](DAY5_ASSESSMENT.md)

---

## 📄 License
This project is licensed under the ISC License.
