import { APIRequestContext, APIResponse } from '@playwright/test';

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface ProductPayload {
  title: string;
  price: number;
  description?: string;
  category?: string;
}

export interface ProductResponse extends ProductPayload {
  id: number;
  isDeleted?: boolean;
}

export interface TimedResponse<T> {
  status: number;
  headers: Record<string, string>;
  data: T;
  responseTimeMs: number;
  rawResponse: APIResponse;
}

/**
 * ApiClient: Encapsulates API calls, timing measurement, and token authentication
 */
export class ApiClient {
  private request: APIRequestContext;
  private baseUrl: string = 'https://dummyjson.com';
  private authToken: string = '';

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  setAuthToken(token: string): void {
    this.authToken = token;
  }

  private getHeaders(customHeaders: Record<string, string> = {}): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };
    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }
    return headers;
  }

  /**
   * Helper to execute request with automatic latency/response-time measurement
   */
  private async executeWithTiming<T>(apiCall: () => Promise<APIResponse>): Promise<TimedResponse<T>> {
    const startTime = Date.now();
    const rawResponse = await apiCall();
    const responseTimeMs = Date.now() - startTime;

    const status = rawResponse.status();
    const headers = rawResponse.headers();
    let data: T;

    try {
      data = (await rawResponse.json()) as T;
    } catch {
      data = {} as T;
    }

    return {
      status,
      headers,
      data,
      responseTimeMs,
      rawResponse,
    };
  }

  // --- Authentication API ---
  async login(username: string = 'emilys', password: string = 'emilyspass'): Promise<TimedResponse<LoginResponse>> {
    return this.executeWithTiming<LoginResponse>(() =>
      this.request.post(`${this.baseUrl}/auth/login`, {
        headers: this.getHeaders(),
        data: { username, password },
      })
    );
  }

  async getCurrentUser(): Promise<TimedResponse<LoginResponse>> {
    return this.executeWithTiming<LoginResponse>(() =>
      this.request.get(`${this.baseUrl}/auth/me`, {
        headers: this.getHeaders(),
      })
    );
  }

  // --- Product CRUD APIs ---
  async getProducts(limit: number = 10): Promise<TimedResponse<{ products: ProductResponse[]; total: number }>> {
    return this.executeWithTiming<{ products: ProductResponse[]; total: number }>(() =>
      this.request.get(`${this.baseUrl}/products?limit=${limit}`, {
        headers: this.getHeaders(),
      })
    );
  }

  async getProductById(id: number): Promise<TimedResponse<ProductResponse>> {
    return this.executeWithTiming<ProductResponse>(() =>
      this.request.get(`${this.baseUrl}/products/${id}`, {
        headers: this.getHeaders(),
      })
    );
  }

  async createProduct(payload: ProductPayload): Promise<TimedResponse<ProductResponse>> {
    return this.executeWithTiming<ProductResponse>(() =>
      this.request.post(`${this.baseUrl}/products/add`, {
        headers: this.getHeaders(),
        data: payload,
      })
    );
  }

  async updateProduct(id: number, payload: Partial<ProductPayload>): Promise<TimedResponse<ProductResponse>> {
    return this.executeWithTiming<ProductResponse>(() =>
      this.request.put(`${this.baseUrl}/products/${id}`, {
        headers: this.getHeaders(),
        data: payload,
      })
    );
  }

  async deleteProduct(id: number): Promise<TimedResponse<ProductResponse>> {
    return this.executeWithTiming<ProductResponse>(() =>
      this.request.delete(`${this.baseUrl}/products/${id}`, {
        headers: this.getHeaders(),
      })
    );
  }
}
