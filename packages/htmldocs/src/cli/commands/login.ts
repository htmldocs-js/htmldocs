import chalk from "chalk";
import open from "open";
import os from 'os';
import { URL } from 'url';
import { storeToken } from "../utils/token";
import crypto from 'crypto';
import logger from "~/lib/logger";

const apiUrl = process.env.API_URL || "http://localhost:3000";
const TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes timeout
const POLLING_INTERVAL_MS = 1000; // 1 second between polls

interface LoginOptions {
  headless?: boolean;
}

export const login = async (options: LoginOptions = {}) => {
  // Generate a unique session ID
  const sessionId = crypto.randomBytes(16).toString('hex');
  const fullHostname = os.hostname();
  const cleanHostname = fullHostname.split('.')[0];

  try {
    // Create the CLI auth session first
    const sessionResponse = await fetch(`${apiUrl}/api/auth/create-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId,
        hostname: cleanHostname
      })
    });

    if (!sessionResponse.ok) {
      const error = await sessionResponse.json();
      console.log(chalk.red("Failed to initialize authentication:", error.message));
      process.exit(1);
    }
    
    const callbackData = {
      session_id: sessionId,
      hostname: cleanHostname
    };
    
    const encodedData = Buffer.from(JSON.stringify(callbackData)).toString('base64');
    
    // Construct and open the authorization URL
    const url = new URL(`${apiUrl}/authorize`);
    url.searchParams.set('callback', encodedData);
    
    if (options.headless) {
      console.log(url.toString());
      return;
    } else {
      await open(url.toString());
      console.log(
        chalk.blue("Please select a team and complete the authentication in your browser.")
      );
    }

    logger.debug("Starting CLI auth request with session ID:", sessionId);

    // Start polling for the token
    const startTime = Date.now();
    
    while (true) {
      if (Date.now() - startTime > TIMEOUT_MS) {
        console.log(chalk.red("Authentication timed out. Please try again."));
        process.exit(1);
      }

      try {
        const response = await fetch(`${apiUrl}/api/auth/check-status?session_id=${sessionId}`);
        const data = await response.json();

        if (data.status === 'completed' && data.team_id && data.api_key) {
          await storeToken(data.team_id, data.api_key);
          console.log(chalk.green("Login successful and API key stored."));
          process.exit(0);
        } else if (data.status === 'error') {
          console.log(chalk.red("Authentication failed:", data.message));
          process.exit(1);
        }
        
        // Wait before next poll
        await new Promise(resolve => setTimeout(resolve, POLLING_INTERVAL_MS));
      } catch (error) {
        console.log(chalk.red("Error checking authentication status. Please try again."));
        process.exit(1);
      }
    }
  } catch (error) {
    console.log(chalk.red("Failed to start authentication process:", error));
    process.exit(1);
  }
};
