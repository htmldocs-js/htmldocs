import { expect, type Page } from '@playwright/test';
import fetch from 'node-fetch';

export interface AuthSession {
  sessionId: string;
  apiKey?: string;
  teamId?: string;
}

export async function login(page: Page): Promise<void> {
  const email = process.env.TEST_USER_EMAIL;
  const password = process.env.TEST_USER_PASSWORD;

  if (!email || !password) {
    throw new Error('TEST_USER_EMAIL and TEST_USER_PASSWORD must be set in .env');
  }

  // Navigate to login page
  await page.goto('/auth/login');

  // Fill in login form
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/password/i).fill(password);
  await page.getByRole('button', { name: /sign in/i }).click();

  // Wait for navigation and verify we're logged in
  await page.waitForURL(/.*\/document/);
}

export const waitForAuthCompletion = async (sessionId: string, maxAttempts = 30): Promise<AuthSession> => {
  const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000';
  let attempts = 0;

  while (attempts < maxAttempts) {
    const response = await fetch(`${baseUrl}/api/auth/check-status?session_id=${sessionId}`);
    const data = await response.json();

    if (data.status === 'completed' && data.team_id && data.api_key) {
      return {
        sessionId,
        apiKey: data.api_key,
        teamId: data.team_id,
      };
    } else if (data.status === 'error') {
      throw new Error(`Authentication failed: ${data.message}`);
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    attempts++;
  }

  throw new Error('Authentication timed out');
};

export const validateApiKey = async (apiKey: string): Promise<boolean> => {
  // Add validation logic here based on your API requirements
  return apiKey.startsWith('tk_') && apiKey.length > 20;
}; 