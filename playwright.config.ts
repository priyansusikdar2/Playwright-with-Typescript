import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Read from default .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Enterprise Playwright Configuration
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: parseInt(process.env.DEFAULT_TIMEOUT || '30000', 10),
  expect: {
    timeout: parseInt(process.env.EXPECT_TIMEOUT || '5000', 10),
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI if needed, or dynamically allocate */
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ['json', { outputFile: 'test-results/report.json' }],
  ],
  /* Shared settings for all the projects below */
  use: {
    /* Base URL from environment variables */
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    headless: process.env.HEADLESS !== 'false',

    /* Collect trace when retrying the failed test */
    trace: (process.env.TRACE_MODE as any) || 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers & viewports */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    /* Mobile Viewport Testing */
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
