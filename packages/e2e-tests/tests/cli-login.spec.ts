import { test, expect, type Page, type Browser } from '@playwright/test';
import { waitForAuthCompletion, validateApiKey, login } from './helpers/auth';
import path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';

const execAsync = promisify(exec);

test.describe('CLI Login Flow', () => {
  const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000';
  let authPage: Page;

  test.beforeAll(async ({ browser }: { browser: Browser }) => {
    // Create a new context and page for authentication
    const context = await browser.newContext();
    authPage = await context.newPage();
    await login(authPage);
  });

  test.afterAll(async () => {
    await authPage.close();
  });
  
  test('complete login flow with team selection', async () => {
    // Find the CLI binary path relative to the test file
    const cliPath = path.resolve(__dirname, '../../../packages/htmldocs/dist/cli/index.mjs');

    // Execute the CLI login command with --headless to get the auth URL
    const { stdout } = await execAsync(`node ${cliPath} login --headless`, {
      env: {
        ...process.env,
        API_URL: baseUrl,
      },
    });

    // Get the authorization URL from stdout
    const authUrl = stdout.trim();
    expect(authUrl).toContain(`${baseUrl}/authorize`);
    expect(authUrl).toContain('callback=');
    console.log('authUrl', authUrl);

    // Navigate to the auth URL using the already authenticated page
    await authPage.goto(authUrl);
    
    // Verify we're on the auth page
    await expect(authPage).toHaveURL(/.*\/authorize/);

    // Click the create token button
    await authPage.getByRole('button', { name: /create new api token/i }).click();

    // Wait for success message
    await expect(authPage.getByText('Token Created Successfully')).toBeVisible();
    await expect(authPage.getByText('You can safely close this window now.')).toBeVisible();

    // Extract session ID from the URL
    const url = new URL(authUrl);
    const callback = url.searchParams.get('callback');
    const decodedData = JSON.parse(Buffer.from(callback!, 'base64').toString());
    const sessionId = decodedData.session_id;

    // Wait for auth completion and verify
    const authResult = await waitForAuthCompletion(sessionId);
    expect(authResult.apiKey).toBeTruthy();
    expect(authResult.teamId).toBeTruthy();
    
    // Validate API key format
    const isValidApiKey = await validateApiKey(authResult.apiKey!);
    expect(isValidApiKey).toBe(true);
  });
}); 