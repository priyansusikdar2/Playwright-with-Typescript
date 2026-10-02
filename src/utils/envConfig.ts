import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const envConfig = {
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
  apiBaseUrl: process.env.API_BASE_URL || 'https://dummyjson.com',
  defaultTimeout: parseInt(process.env.DEFAULT_TIMEOUT || '30000', 10),
  expectTimeout: parseInt(process.env.EXPECT_TIMEOUT || '5000', 10),
  isHeadless: process.env.HEADLESS !== 'false',
  traceMode: (process.env.TRACE_MODE as 'on' | 'off' | 'on-first-retry' | 'retain-on-failure') || 'retain-on-failure',
};
