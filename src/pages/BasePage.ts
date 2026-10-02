import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage: Common base class providing shared navigation,
 * waiting, assertions, and screenshot helpers for all page objects.
 */
export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a path relative to or absolute URL
   */
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Assert page title matches expected string or pattern
   */
  async assertPageTitle(titlePattern: string | RegExp): Promise<void> {
    await expect(this.page).toHaveTitle(titlePattern);
  }

  /**
   * Assert current page URL matches pattern
   */
  async assertPageUrl(urlPattern: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(urlPattern);
  }

  /**
   * Capture screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `test-results/${name}.png` });
  }
}
