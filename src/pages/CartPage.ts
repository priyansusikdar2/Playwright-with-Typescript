import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly title: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async assertOnCartPage(): Promise<void> {
    await this.assertPageUrl(/.*cart.html/);
    await expect(this.title).toHaveText('Your Cart');
  }

  getCartItem(productName: string): Locator {
    return this.page.locator('.cart_item', {
      has: this.page.locator('.inventory_item_name', { hasText: productName }),
    });
  }

  async assertProductInCart(productName: string, expectedPrice?: string): Promise<void> {
    const item = this.getCartItem(productName);
    await expect(item).toBeVisible();
    if (expectedPrice) {
      await expect(item.locator('.inventory_item_price')).toHaveText(expectedPrice);
    }
  }

  async removeItem(productName: string): Promise<void> {
    const item = this.getCartItem(productName);
    await item.locator('button[data-test^="remove"]').click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
    await this.assertPageUrl(/.*checkout-step-one.html/);
  }
}
