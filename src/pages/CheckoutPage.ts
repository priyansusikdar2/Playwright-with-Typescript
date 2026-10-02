import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ICheckoutInfo } from '../test-data/interfaces';

export class CheckoutPage extends BasePage {
  // Step One: Customer Information
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;

  // Step Two: Overview
  readonly summaryTotal: Locator;
  readonly finishButton: Locator;

  // Complete
  readonly completeHeader: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');

    this.summaryTotal = page.locator('.summary_total_label');
    this.finishButton = page.locator('[data-test="finish"]');

    this.completeHeader = page.locator('.complete-header');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async fillCustomerInformation(info: ICheckoutInfo): Promise<void> {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.postalCodeInput.fill(info.postalCode);
    await this.continueButton.click();
    await this.assertPageUrl(/.*checkout-step-two.html/);
  }

  async assertTotalSummary(): Promise<void> {
    await expect(this.summaryTotal).toBeVisible();
    await expect(this.summaryTotal).toContainText('Total: $');
  }

  async finishCheckout(): Promise<void> {
    await this.finishButton.click();
    await this.assertPageUrl(/.*checkout-complete.html/);
  }

  async assertOrderComplete(): Promise<void> {
    await expect(this.completeHeader).toBeVisible();
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}
