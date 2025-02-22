import { test as base, type Page } from '@playwright/test';
import { login } from './helpers/auth';

// Declare the types of your fixtures
type AuthFixtures = {
  authedPage: Page;
};

// Extend the base test with authenticated page
export const test = base.extend<AuthFixtures>({
  authedPage: async ({ page }, use: (page: Page) => Promise<void>) => {
    // Login before running the test
    await login(page);
    
    // Use the authenticated page in the test
    await use(page);
  },
}); 