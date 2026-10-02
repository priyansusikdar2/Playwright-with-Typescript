/**
 * ============================================================================
 * DAY 2: TYPESCRIPT FUNDAMENTALS FOR PLAYWRIGHT AUTOMATION
 * ============================================================================
 * Demonstrating:
 * 1. Variables and Primitive Data Types (string, number, boolean, array)
 * 2. TypeScript Interfaces and Custom Types
 * 3. Enums and Union Types
 * 4. Functions with Typed Parameters and Return Types
 * 5. TypeScript Classes with Access Modifiers (public, private, readonly)
 * ============================================================================
 */

// 1. Primitive Types and Variables
export const APP_TIMEOUT: number = 5000;
export const BASE_URL: string = 'https://www.saucedemo.com';
export const IS_HEADLESS: boolean = true;
export const BROWSERS: string[] = ['chromium', 'firefox', 'webkit'];

// 2. Custom Types & Union Types
export type UserRole = 'standard' | 'locked_out' | 'problem' | 'performance_glitch';

export type ProductSortOption = 'az' | 'za' | 'lohi' | 'hilo';

// 3. TypeScript Interfaces (Structuring Test Data)
export interface UserCredentials {
  username: string;
  password: string;
  role?: UserRole; // Optional property
}

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface CartSummary {
  itemCount: number;
  items: ProductItem[];
  totalPrice: number;
}

// 4. Strongly Typed Utility Functions
export function calculateTax(subtotal: number, taxRate: number = 0.08): number {
  return parseFloat((subtotal * taxRate).toFixed(2));
}

export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

// 5. TypeScript Class with encapsulation (precursor to Page Object Model)
export class TestUserManager {
  private users: Map<string, UserCredentials> = new Map();

  constructor() {
    this.initDefaultUsers();
  }

  private initDefaultUsers(): void {
    this.addUser({
      username: 'standard_user',
      password: 'secret_sauce',
      role: 'standard',
    });
    this.addUser({
      username: 'locked_out_user',
      password: 'secret_sauce',
      role: 'locked_out',
    });
  }

  public addUser(user: UserCredentials): void {
    this.users.set(user.username, user);
  }

  public getUser(username: string): UserCredentials {
    const user = this.users.get(username);
    if (!user) {
      throw new Error(`User '${username}' not found in TestUserManager`);
    }
    return user;
  }
}
