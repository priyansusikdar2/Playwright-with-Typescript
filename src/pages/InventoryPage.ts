import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly title: Locator;
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async assertOnInventoryPage(): Promise<void> {
    await this.assertPageUrl(/.*inventory.html/);
    await expect(this.title).toHaveText('Products');
  }

  getProductCard(productName: string): Locator {
    return this.page.locator('.inventory_item', {
      has: this.page.locator('.inventory_item_name', { hasText: productName }),
    });
  }

  async addProductToCart(productName: string): Promise<void> {
    const productCard = this.getProductCard(productName);
    await expect(productCard).toBeVisible();
    const addButton = productCard.locator('button[data-test^="add-to-cart"]');
    await addButton.click();
  }

  async getCartBadgeCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      const text = await this.cartBadge.innerText();
      return parseInt(text, 10);
    }
    return 0;
  }

  async assertCartBadgeCount(expectedCount: number): Promise<void> {
    if (expectedCount > 0) {
      await expect(this.cartBadge).toHaveText(expectedCount.toString());
    } else {
      await expect(this.cartBadge).toBeHidden();
    }
  }

  async sortProducts(optionValue: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectOption(optionValue);
  }

  async navigateToCart(): Promise<void> {
    await this.cartLink.click();
    await this.assertPageUrl(/.*cart.html/);
  }
}
