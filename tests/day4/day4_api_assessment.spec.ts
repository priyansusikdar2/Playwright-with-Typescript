import { test, expect } from '@playwright/test';
import { ApiClient } from '../../src/api/apiClient';

/**
 * ============================================================================
 * DAY 4 ASSESSMENT TASK 3: API AUTOMATION SUITE
 * ============================================================================
 * Syllabus Task:
 * "Automate Login API and Product APIs. Validate status code, body,
 *  headers, and response time."
 * ============================================================================
 */

test.describe('Day 4: API Automation Suite (APIRequestContext)', () => {
  let apiClient: ApiClient;
  const MAX_ACCEPTABLE_RESPONSE_TIME_MS = 5000;

  test.beforeEach(async ({ request }) => {
    apiClient = new ApiClient(request);
  });

  /**
   * 1. Login API Validation (Auth Token Generation)
   */
  test('API Task 1: Authenticate via Login API and Validate Response Contract', async () => {
    const res = await apiClient.login('emilys', 'emilyspass');

    // 1. Validate Status Code
    expect(res.status).toBe(200);

    // 2. Validate Response Headers
    expect(res.headers['content-type']).toContain('application/json');

    // 3. Validate Response Body
    expect(res.data).toHaveProperty('accessToken');
    expect(res.data.username).toBe('emilys');
    expect(res.data.id).toBeGreaterThan(0);
    expect(typeof res.data.accessToken).toBe('string');

    // 4. Validate Response Time
    expect(res.responseTimeMs).toBeLessThan(MAX_ACCEPTABLE_RESPONSE_TIME_MS);
  });

  /**
   * 2. Bearer Authentication Header Validation
   */
  test('API Task 2: Validate Protected Endpoint with Bearer Token', async () => {
    // Step 1: Login to get token
    const loginRes = await apiClient.login('emilys', 'emilyspass');
    expect(loginRes.status).toBe(200);

    // Step 2: Set token in ApiClient
    apiClient.setAuthToken(loginRes.data.accessToken);

    // Step 3: Fetch current user profile with token
    const meRes = await apiClient.getCurrentUser();
    expect(meRes.status).toBe(200);
    expect(meRes.data.username).toBe('emilys');
    expect(meRes.responseTimeMs).toBeLessThan(MAX_ACCEPTABLE_RESPONSE_TIME_MS);
  });

  /**
   * 3. GET Products API (List & Single Item)
   */
  test('API Task 3: GET Products - Validate Schema, Headers and Performance', async () => {
    const res = await apiClient.getProducts(5);

    // Status & Headers
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('application/json');

    // Body Validation
    expect(Array.isArray(res.data.products)).toBeTruthy();
    expect(res.data.products.length).toBe(5);

    const firstProduct = res.data.products[0];
    expect(firstProduct).toHaveProperty('id');
    expect(firstProduct).toHaveProperty('title');
    expect(firstProduct).toHaveProperty('price');
    expect(typeof firstProduct.price).toBe('number');

    // Latency
    expect(res.responseTimeMs).toBeLessThan(MAX_ACCEPTABLE_RESPONSE_TIME_MS);
  });

  /**
   * 4. POST Create Product API
   */
  test('API Task 4: POST Create Product - Validate Status Code 201/200 & Created Entity', async () => {
    const newProductPayload = {
      title: 'Playwright Automation Guide',
      price: 49.99,
      description: 'Comprehensive guide to TypeScript & Playwright test automation',
      category: 'books',
    };

    const res = await apiClient.createProduct(newProductPayload);

    // Validate Status (DummyJSON returns 201 or 200 on creation)
    expect([200, 201]).toContain(res.status);
    expect(res.headers['content-type']).toContain('application/json');

    // Validate Created Entity Body
    expect(res.data.id).toBeDefined();
    expect(res.data.title).toBe(newProductPayload.title);
    expect(res.data.price).toBe(newProductPayload.price);

    // Response time
    expect(res.responseTimeMs).toBeLessThan(MAX_ACCEPTABLE_RESPONSE_TIME_MS);
  });

  /**
   * 5. PUT Update Product API
   */
  test('API Task 5: PUT Update Product - Validate Status and Partial Updates', async () => {
    const updatedTitle = 'Playwright Automation Mastery v2';
    const res = await apiClient.updateProduct(1, { title: updatedTitle });

    expect(res.status).toBe(200);
    expect(res.data.title).toBe(updatedTitle);
    expect(res.responseTimeMs).toBeLessThan(MAX_ACCEPTABLE_RESPONSE_TIME_MS);
  });

  /**
   * 6. DELETE Product API
   */
  test('API Task 6: DELETE Product - Validate Soft/Hard Deletion Status and Body', async () => {
    const res = await apiClient.deleteProduct(1);

    expect(res.status).toBe(200);
    expect(res.data.isDeleted).toBe(true);
    expect(res.responseTimeMs).toBeLessThan(MAX_ACCEPTABLE_RESPONSE_TIME_MS);
  });

  /**
   * 7. Negative Test: Invalid Authentication Handling
   */
  test('API Task 7: Negative Auth - Validate 400 Bad Request with Invalid Credentials', async () => {
    const res = await apiClient.login('invalid_user_name', 'wrong_pass');

    expect(res.status).toBe(400);
    expect(res.headers['content-type']).toContain('application/json');
    expect(res.responseTimeMs).toBeLessThan(MAX_ACCEPTABLE_RESPONSE_TIME_MS);
  });

});
